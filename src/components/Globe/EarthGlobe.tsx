import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createEarthTexture, createCloudTexture, latLngToVector3 } from './earthTexture';
import { HotspotType, IncidentType } from '../../types';
import { MapPin, X, ExternalLink, ChevronDown, ChevronUp, Scale, Building2, Newspaper, Plus, Minus, RotateCcw } from 'lucide-react';

export type SelectedMarkerData = 
  | { type: 'hotspot'; item: HotspotType }
  | { type: 'incident'; item: IncidentType };

interface EarthGlobeProps {
  hotspots: HotspotType[];
  incidents: IncidentType[];
  className?: string;
  onNavigateToDetect?: () => void;
  onRotationChange?: (wallpaperIndex: number) => void;
  onNextWallpaper?: () => void;
}

interface ActivePopCardData {
  id: string;
  type: 'hotspot' | 'incident';
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  description: string;
  posX: number;
  posY: number;
  seizureQuantity?: string;
  sourceOrganization?: string;
  newsArticleTitle?: string;
  articleUrl?: string;
  isExpanded?: boolean;
}

// 3D Billboard label sprites right on the Earth (Dot/Mark placed right beside the place name)
function createLabelSprite(
  text: string,
  markerColor: string,
  borderColor: string,
  bgColor: string,
  shape: 'circle' | 'diamond' = 'circle'
): THREE.Sprite {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = 380;
  canvas.height = 80;
  ctx.font = 'bold 25px Manrope, sans-serif';
  const textWidth = ctx.measureText(text).width;
  
  const dotSize = 9;
  const paddingX = 18;
  const pillW = Math.min(360, textWidth + paddingX * 2 + dotSize + 14);
  const pillH = 46;
  const startX = (canvas.width - pillW) / 2;
  const startY = (canvas.height - pillH) / 2;

  // Background pill with subtle border
  ctx.fillStyle = bgColor;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(startX, startY, pillW, pillH, 23);
  ctx.fill();
  ctx.stroke();

  // Marker icon drawn directly inside the pill beside the location name
  const dotCenterX = startX + paddingX + dotSize / 2;
  const dotCenterY = canvas.height / 2;

  if (shape === 'circle') {
    // Hotspot dot
    ctx.fillStyle = markerColor;
    ctx.beginPath();
    ctx.arc(dotCenterX, dotCenterY, 6, 0, Math.PI * 2);
    ctx.fill();
    // Inner white gleam
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(dotCenterX, dotCenterY, 2.5, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Incident warning marker
    ctx.fillStyle = markerColor;
    ctx.beginPath();
    ctx.moveTo(dotCenterX, dotCenterY - 6.5);
    ctx.lineTo(dotCenterX + 6.5, dotCenterY);
    ctx.lineTo(dotCenterX, dotCenterY + 6.5);
    ctx.lineTo(dotCenterX - 6.5, dotCenterY);
    ctx.closePath();
    ctx.fill();
    // Inner white gleam
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(dotCenterX, dotCenterY, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Text directly beside the indicator mark
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, dotCenterX + 12, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const spriteMat = new THREE.SpriteMaterial({
    map: texture,
    depthTest: true,
    transparent: true
  });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(0.40, 0.086, 1);
  sprite.position.y = 0.062;
  return sprite;
}

export const EarthGlobe: React.FC<EarthGlobeProps> = ({
  hotspots,
  incidents,
  className = '',
  onRotationChange,
  onNextWallpaper
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const onRotationChangeRef = useRef(onRotationChange);
  onRotationChangeRef.current = onRotationChange;
  const onNextWallpaperRef = useRef(onNextWallpaper);
  onNextWallpaperRef.current = onNextWallpaper;
  const lastWpIndexRef = useRef<number>(0);

  // Dynamic pop card positioned near clicked marker (Opens on CLICK, not hover)
  const [activePopCard, setActivePopCard] = useState<ActivePopCardData | null>(null);

  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [showIncidents, setShowIncidents] = useState<boolean>(true);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const earthGroupRef = useRef<THREE.Group | null>(null);
  const cloudMeshRef = useRef<THREE.Mesh | null>(null);
  const hotspotMarkersRef = useRef<THREE.Group>(new THREE.Group());
  const incidentMarkersRef = useRef<THREE.Group>(new THREE.Group());
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(-999, -999));
  const rippleRingsRef = useRef<THREE.Mesh[]>([]);

  // Drag & Zoom State
  const isDraggingRef = useRef<boolean>(false);
  const dragDistanceRef = useRef<number>(0);
  const dragDeltaAccumulatorRef = useRef<number>(0);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // Safe Camera Distance & Balanced Earth Size so it fills the screen as much as possible but NEVER clips or cuts flat
  const MIN_CAMERA_DIST = 2.40;
  const MAX_CAMERA_DIST = 4.40;
  const DEFAULT_CAMERA_DIST = 3.65;

  const targetCameraDistanceRef = useRef<number>(DEFAULT_CAMERA_DIST);
  const currentCameraDistanceRef = useRef<number>(DEFAULT_CAMERA_DIST);
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.18, y: -0.6 });

  const GLOBE_RADIUS = 1.20;

  // Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.05, 100);
    // Centered vertically so top and bottom never clip
    camera.position.set(0, 0, currentCameraDistanceRef.current);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);
    earthGroupRef.current = earthGroup;
    earthGroup.rotation.x = targetRotationRef.current.x;
    earthGroup.rotation.y = targetRotationRef.current.y;
    // Balanced Earth position so it fills the screen without right/left edge clipping
    earthGroup.position.x = 0.04;
    earthGroup.position.y = 0;

    // Earth Sphere
    const earthGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const earthTexture = createEarthTexture();
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.65,
      metalness: 0.1,
      bumpScale: 0.02
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earthMesh);

    // Translucent Cloud Layer
    const cloudGeometry = new THREE.SphereGeometry(GLOBE_RADIUS + 0.015, 48, 48);
    const cloudTexture = createCloudTexture();
    const cloudMaterial = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.42,
      blending: THREE.NormalBlending,
      roughness: 0.9,
      depthWrite: false
    });
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    earthGroup.add(cloudMesh);
    cloudMeshRef.current = cloudMesh;

    // Atmospheric Cyan Halo
    const atmosphereGeometry = new THREE.SphereGeometry(GLOBE_RADIUS + 0.055, 48, 48);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      uniforms: {
        glowColor: { value: new THREE.Color(0x1FB6C9) },
        haloColor: { value: new THREE.Color(0x9BF0FB) }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        uniform vec3 haloColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.8);
          vec3 finalColor = mix(glowColor, haloColor, intensity * 0.5);
          gl_FragColor = vec4(finalColor, intensity * 0.7);
        }
      `
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    earthGroup.add(atmosphereMesh);

    earthGroup.add(hotspotMarkersRef.current);
    earthGroup.add(incidentMarkersRef.current);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xE4F4F5, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xFFFFFF, 1.9);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x9BF0FB, 0.9);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (cloudMeshRef.current) {
        cloudMeshRef.current.rotation.y += 0.0005;
      }

      if (earthGroupRef.current) {
        if (!isDraggingRef.current && isRotating) {
          earthGroupRef.current.rotation.y += 0.0014;
          earthGroupRef.current.rotation.x += (targetRotationRef.current.x - earthGroupRef.current.rotation.x) * 0.04;
        }

        // Synchronize nature wallpaper segment (7 distinct wallpapers)
        const rotY = earthGroupRef.current.rotation.y;
        const normalized = ((rotY % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const wpIndex = Math.floor(normalized / ((Math.PI * 2) / 7)) % 7;
        if (lastWpIndexRef.current !== wpIndex) {
          lastWpIndexRef.current = wpIndex;
          onRotationChangeRef.current?.(wpIndex);
        }
      }

      // Smooth Camera Zoom
      if (cameraRef.current) {
        currentCameraDistanceRef.current += (targetCameraDistanceRef.current - currentCameraDistanceRef.current) * 0.12;
        cameraRef.current.position.z = currentCameraDistanceRef.current;
      }

      rippleRingsRef.current.forEach((ring, idx) => {
        const ringTime = time * 2.2 + idx * 0.4;
        const scale = 1 + (ringTime % 1.7);
        ring.scale.set(scale, scale, 1);
        const material = ring.material as THREE.MeshBasicMaterial;
        if (material) {
          material.opacity = Math.max(0, 0.85 - (ringTime % 1.7) * 0.5);
        }
      });

      // Hover Raycasting: Changes cursor to pointer on pins, NO text/popup on hover per user request
      if (cameraRef.current && earthGroupRef.current) {
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const interactiveObjects = [
          ...hotspotMarkersRef.current.children,
          ...incidentMarkersRef.current.children
        ].filter(obj => obj.visible);

        const intersects = raycasterRef.current.intersectObjects(interactiveObjects, true);

        if (intersects.length > 0) {
          container.style.cursor = 'pointer';
        } else {
          container.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab';
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth > 0 && newHeight > 0) {
        cameraRef.current.aspect = newWidth / newHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(newWidth, newHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = newWidth / newHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    const onContainerWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.0025;
      targetCameraDistanceRef.current = Math.max(MIN_CAMERA_DIST, Math.min(MAX_CAMERA_DIST, targetCameraDistanceRef.current + zoomDelta));
    };
    container.addEventListener('wheel', onContainerWheel, { passive: false });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      container.removeEventListener('wheel', onContainerWheel);
      if (rendererRef.current && renderer.domElement) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  // Update Markers: Bold, High-Visibility, Multi-Layered Red & Turquoise Pins (User Request: "red and bule properly visble nahi hai marks")
  useEffect(() => {
    while (hotspotMarkersRef.current.children.length > 0) {
      hotspotMarkersRef.current.remove(hotspotMarkersRef.current.children[0]);
    }
    while (incidentMarkersRef.current.children.length > 0) {
      incidentMarkersRef.current.remove(incidentMarkersRef.current.children[0]);
    }
    rippleRingsRef.current = [];

    // Hotspot Markers (Clean, subtle turquoise surface pin + mark inside name label; NO ripple rings)
    if (showHotspots) {
      hotspots.forEach(hotspot => {
        const markerGroup = new THREE.Group();
        markerGroup.userData = { markerType: 'hotspot', data: hotspot, id: hotspot.id };

        const pos = latLngToVector3(hotspot.lat, hotspot.lng, GLOBE_RADIUS);
        markerGroup.position.copy(pos);

        const normal = pos.clone().normalize();
        markerGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

        // Sleek subtle surface dot (not overly highlighted)
        const outerPinGeo = new THREE.SphereGeometry(0.024, 16, 16);
        const outerPinMat = new THREE.MeshBasicMaterial({ color: 0x00E5FF });
        const outerPinMesh = new THREE.Mesh(outerPinGeo, outerPinMat);
        outerPinMesh.position.y = 0.022;
        markerGroup.add(outerPinMesh);

        // Inner white dot
        const innerCoreGeo = new THREE.SphereGeometry(0.012, 12, 12);
        const innerCoreMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
        const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
        innerCoreMesh.position.y = 0.022;
        markerGroup.add(innerCoreMesh);

        // NOTE: Blue hotspots do NOT have ripple rings per user request: "woh rigns just red mein blue mein nahi"

        // 3D Billboard label with indicator mark drawn right beside the location name
        const shortName = hotspot.name.replace(' Hotspot', '');
        const labelSprite = createLabelSprite(shortName, '#00E5FF', '#00E5FF', 'rgba(7, 44, 56, 0.92)', 'circle');
        markerGroup.add(labelSprite);

        hotspotMarkersRef.current.add(markerGroup);
      });
    }

    // Incident Markers (Warning Crimson Red + Pulsing Rings ONLY on Red per user request)
    if (showIncidents) {
      incidents.forEach(incident => {
        const markerGroup = new THREE.Group();
        markerGroup.userData = { markerType: 'incident', data: incident, id: incident.id };

        const pos = latLngToVector3(incident.lat, incident.lng, GLOBE_RADIUS);
        markerGroup.position.copy(pos);

        const normal = pos.clone().normalize();
        markerGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

        // Small Red Diamond Pin
        const diamondGeo = new THREE.OctahedronGeometry(0.028, 0);
        const diamondMat = new THREE.MeshBasicMaterial({ color: 0xFF2D55 });
        const diamondMesh = new THREE.Mesh(diamondGeo, diamondMat);
        diamondMesh.position.y = 0.026;
        markerGroup.add(diamondMesh);

        // Inner White Core
        const innerCoreGeo = new THREE.SphereGeometry(0.012, 12, 12);
        const innerCoreMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
        const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
        innerCoreMesh.position.y = 0.026;
        markerGroup.add(innerCoreMesh);

        // Warning Pulse Ring ONLY for red seizure incidents
        const ringGeo = new THREE.RingGeometry(0.032, 0.075, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xFF3B30,
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2;
        markerGroup.add(ringMesh);
        rippleRingsRef.current.push(ringMesh);

        // 3D Billboard label with diamond indicator mark drawn right beside the name
        const shortIncidentName = incident.country + ' Seizure';
        const labelSprite = createLabelSprite(shortIncidentName, '#FF3B30', '#FF3B30', 'rgba(58, 8, 8, 0.92)', 'diamond');
        markerGroup.add(labelSprite);

        incidentMarkersRef.current.add(markerGroup);
      });
    }

    hotspotMarkersRef.current.visible = showHotspots;
    incidentMarkersRef.current.visible = showIncidents;
  }, [hotspots, incidents, showHotspots, showIncidents]);

  // Pointer & Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    mouseRef.current.set(x, y);

    if (earthGroupRef.current && cameraRef.current) {
      const approxLng = ((-earthGroupRef.current.rotation.y * (180 / Math.PI)) % 360) - 90;
      const normalizedLng = ((approxLng + 180) % 360) - 180;
      const approxLat = (earthGroupRef.current.rotation.x * (180 / Math.PI));
      setCoords({
        lat: Math.round(approxLat * 10) / 10,
        lng: Math.round(normalizedLng * 10) / 10
      });
    }

    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;
    dragDistanceRef.current += Math.abs(deltaX) + Math.abs(deltaY);
    dragDeltaAccumulatorRef.current += Math.abs(deltaX);

    // Manual rotation wallpaper advance: when user rotates by ~75px, advance to next wallpaper!
    if (dragDeltaAccumulatorRef.current > 75) {
      dragDeltaAccumulatorRef.current = 0;
      onNextWallpaperRef.current?.();
    }

    if (earthGroupRef.current) {
      earthGroupRef.current.rotation.y += deltaX * 0.005;
      earthGroupRef.current.rotation.x += deltaY * 0.005;
      earthGroupRef.current.rotation.x = Math.max(-1.1, Math.min(1.1, earthGroupRef.current.rotation.x));
      targetRotationRef.current = {
        x: earthGroupRef.current.rotation.x,
        y: earthGroupRef.current.rotation.y
      };
    }

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    // When completing a distinct manual drag/swipe, trigger next wallpaper
    if (dragDistanceRef.current > 35) {
      dragDeltaAccumulatorRef.current = 0;
      onNextWallpaperRef.current?.();
    }
  };

  // Safe Zoom Handling: Sphere is never sliced or clipped (User Request: "eart ko zoom karne per aise eart cut ja rahi hai")
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * 0.0025;
    targetCameraDistanceRef.current = Math.max(MIN_CAMERA_DIST, Math.min(MAX_CAMERA_DIST, targetCameraDistanceRef.current + zoomDelta));
  };

  const handleZoomIn = () => {
    targetCameraDistanceRef.current = Math.max(MIN_CAMERA_DIST, targetCameraDistanceRef.current - 0.30);
  };

  const handleZoomOut = () => {
    targetCameraDistanceRef.current = Math.min(MAX_CAMERA_DIST, targetCameraDistanceRef.current + 0.30);
  };

  const handleReset = () => {
    targetCameraDistanceRef.current = DEFAULT_CAMERA_DIST;
    targetRotationRef.current = { x: 0.18, y: -0.6 };
    if (earthGroupRef.current) {
      earthGroupRef.current.rotation.x = 0.18;
      earthGroupRef.current.rotation.y = -0.6;
    }
    setIsRotating(true);
    setActivePopCard(null);
  };

  // Click Handler: ONLY on CLICK does the pop card appear (User Request: "pops cursor lejane per na aaye usper click karne per aaye")
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragDistanceRef.current > 6) return;
    if (!containerRef.current || !cameraRef.current || !earthGroupRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    mouseRef.current.set(x, y);

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const interactiveObjects = [
      ...hotspotMarkersRef.current.children,
      ...incidentMarkersRef.current.children
    ].filter(obj => obj.visible);

    const intersects = raycasterRef.current.intersectObjects(interactiveObjects, true);

    if (intersects.length > 0) {
      let hitObj: THREE.Object3D | null = intersects[0].object;
      while (hitObj && !hitObj.userData.markerType && hitObj.parent) {
        hitObj = hitObj.parent;
      }

      if (hitObj && hitObj.userData) {
        const screenPos = intersects[0].point.clone().project(cameraRef.current);
        const px = ((screenPos.x + 1) / 2) * container.clientWidth;
        const py = ((-screenPos.y + 1) / 2) * container.clientHeight;

        // Position pop card dynamically near the marker
        const cardWidth = 320;
        const cardHeight = 320;
        let targetX = px > container.clientWidth * 0.5 ? px - cardWidth - 20 : px + 24;
        let targetY = Math.max(20, Math.min(container.clientHeight - cardHeight - 20, py - 90));
        targetX = Math.max(16, Math.min(container.clientWidth - cardWidth - 16, targetX));

        if (hitObj.userData.markerType === 'hotspot') {
          const item = hitObj.userData.data as HotspotType;
          setActivePopCard({
            id: item.id,
            type: 'hotspot',
            title: item.name,
            subtitle: `${item.country} • ${item.region}`,
            image: item.image || item.species[0]?.image || 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17',
            badge: `Threat: ${item.threatLevel}`,
            description: item.description,
            posX: targetX,
            posY: targetY
          });
        } else if (hitObj.userData.markerType === 'incident') {
          const item = hitObj.userData.data as IncidentType;
          setActivePopCard({
            id: item.id,
            type: 'incident',
            title: item.title,
            subtitle: `${item.locationName}, ${item.country} • ${item.date}`,
            image: item.image || 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17',
            badge: item.category,
            description: item.description,
            seizureQuantity: item.seizureQuantity,
            sourceOrganization: item.sourceOrganization,
            newsArticleTitle: item.newsArticleTitle,
            articleUrl: item.articleUrl,
            posX: targetX,
            posY: targetY,
            isExpanded: false
          });
        }
      }
    } else {
      setActivePopCard(null);
    }
  };

  const jumpToRegion = (lat: number, lng: number) => {
    const targetY = -(lng + 90) * (Math.PI / 180);
    const targetX = (lat) * (Math.PI / 180) * 0.6;
    targetRotationRef.current = { x: targetX, y: targetY };
    targetCameraDistanceRef.current = 2.45;
    if (earthGroupRef.current) {
      earthGroupRef.current.rotation.x = targetX;
      earthGroupRef.current.rotation.y = targetY;
    }
    setIsRotating(false);
  };

  return (
    <div className={`relative select-none w-full h-full ${className}`}>
      {/* 3D Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
        onClick={handleClick}
        onDoubleClick={handleZoomIn}
      />


      {/* DYNAMIC POSITIONED POP CARD (Opens on CLICK, placed near clicked marker) */}
      {activePopCard && (
        <div
          className={`absolute z-30 transition-all duration-200 ease-out animate-in zoom-in-95 fade-in ${
            activePopCard.isExpanded ? 'w-80 sm:w-96' : 'w-72 sm:w-80'
          }`}
          style={{ left: activePopCard.posX, top: activePopCard.posY }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* A. GREEN/TURQUOISE HOTSPOT: Minimal & Focused (Pic, Name, 1-Line Description) */}
          {activePopCard.type === 'hotspot' && (
            <div className="bg-white/95 backdrop-blur-md rounded-[26px] p-3.5 shadow-2xl border border-[#00E5FF]/40 text-[#3A5A64]">
              <div className="relative h-36 w-full rounded-2xl overflow-hidden mb-2.5 bg-black/10">
                <img
                  src={activePopCard.image}
                  alt={activePopCard.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <button
                  onClick={() => setActivePopCard(null)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="absolute bottom-2 left-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-[#1FB6C9] shadow-sm">
                    Biodiversity Hotspot
                  </span>
                </div>
              </div>

              <h3 className="font-serif text-lg font-medium text-[#0B3A4A] leading-snug">
                {activePopCard.title}
              </h3>
              <p className="text-[11px] text-[#6E8890] mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#1FB6C9] shrink-0" />
                <span className="truncate">{activePopCard.subtitle}</span>
              </p>

              <p className="text-xs text-[#3A5A64] mt-2 leading-relaxed line-clamp-1 border-t border-gray-100 pt-2 font-medium">
                {activePopCard.description}
              </p>
            </div>
          )}

          {/* B. RED/CORAL INCIDENT: News & Seizure Intelligence with "Read More" Toggle */}
          {activePopCard.type === 'incident' && (
            <div className="bg-white/95 backdrop-blur-md rounded-[28px] p-4 shadow-2xl border border-[#FF3B30]/40 text-[#3A5A64] space-y-2.5">
              <div className="relative h-36 w-full rounded-2xl overflow-hidden bg-black/10">
                <img
                  src={activePopCard.image}
                  alt={activePopCard.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <button
                  onClick={() => setActivePopCard(null)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-[#FF3B30] shadow-sm">
                    Documented Seizure
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-lg font-medium text-[#0B3A4A] leading-snug">
                  {activePopCard.title}
                </h3>
                <p className="text-[11px] text-[#6E8890] mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#FF3B30] shrink-0" />
                  <span className="truncate">{activePopCard.subtitle}</span>
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#F7F2E7] border border-[#FF7E6B]/20 text-xs">
                <span className="text-[9px] uppercase font-bold tracking-wider text-[#E86350] flex items-center gap-1">
                  <Scale className="w-3 h-3" /> Confiscated Volume
                </span>
                <span className="font-serif text-sm font-semibold text-[#0B3A4A] block mt-0.5">
                  {activePopCard.seizureQuantity}
                </span>
              </div>

              {activePopCard.newsArticleTitle && (
                <div className="p-2 rounded-xl bg-[#0B3A4A]/5 border border-gray-100 text-[11px]">
                  <span className="text-[9px] uppercase font-bold text-[#6E8890] flex items-center gap-1">
                    <Newspaper className="w-3 h-3 text-[#1FB6C9]" /> Verified Media Dispatch
                  </span>
                  <p className="font-medium text-[#0B3A4A] line-clamp-1 mt-0.5">
                    "{activePopCard.newsArticleTitle}"
                  </p>
                </div>
              )}

              {activePopCard.isExpanded && (
                <div className="pt-2 border-t border-gray-100 space-y-2 text-xs animate-in fade-in duration-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#6E8890] block">
                      Case Dossier Summary
                    </span>
                    <p className="text-[#3A5A64] text-[11px] leading-relaxed mt-0.5">
                      {activePopCard.description}
                    </p>
                  </div>

                  {activePopCard.sourceOrganization && (
                    <div className="flex items-center gap-1 text-[11px] text-[#6E8890]">
                      <Building2 className="w-3.5 h-3.5 text-[#1FB6C9] shrink-0" />
                      <span className="truncate font-medium">{activePopCard.sourceOrganization}</span>
                    </div>
                  )}

                  {activePopCard.articleUrl && (
                    <div className="pt-1">
                      <a
                        href={activePopCard.articleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF3B30] text-white text-[11px] font-semibold hover:bg-[#E83131] shadow-sm transition-all"
                      >
                        Read Verified Source Report <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() =>
                  setActivePopCard(prev => (prev ? { ...prev, isExpanded: !prev.isExpanded } : null))
                }
                className="w-full py-1.5 rounded-xl bg-gray-100 hover:bg-[#E4F4F5] text-[#0B3A4A] text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <span>{activePopCard.isExpanded ? 'Show Less' : 'Read More Details'}</span>
                {activePopCard.isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Layer Visibility & Quick Region Jumpers (Top Right, text increased by 3px) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
        <div className="bg-white/85 backdrop-blur-md p-1.5 rounded-full border border-[#1FB6C9]/25 shadow-sm flex items-center gap-1.5 text-[14px]">
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
              showHotspots
                ? 'bg-[#E4F4F5] text-[#0B3A4A] border border-[#1FB6C9]/30 font-semibold'
                : 'text-gray-400'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF]" />
            <span>Hotspots</span>
          </button>
          <button
            onClick={() => setShowIncidents(!showIncidents)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
              showIncidents
                ? 'bg-[#FF7E6B]/15 text-[#E86350] border border-[#FF7E6B]/30 font-semibold'
                : 'text-gray-400'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF2D55]" />
            <span>Seizures</span>
          </button>
        </div>

        {/* Quick Continent Fly-To (Text increased by 3px) */}
        <div className="hidden sm:flex flex-wrap justify-end gap-1 max-w-xs">
          <button
            onClick={() => jumpToRegion(16.5, 101.0)}
            className="bg-white/80 hover:bg-white text-[#0B3A4A] text-[13px] font-semibold px-3 py-1 rounded-full shadow-sm border border-gray-100 cursor-pointer"
          >
            Indo-Burma
          </button>
          <button
            onClick={() => jumpToRegion(-18.7, 46.8)}
            className="bg-white/80 hover:bg-white text-[#0B3A4A] text-[13px] font-semibold px-3 py-1 rounded-full shadow-sm border border-gray-100 cursor-pointer"
          >
            Madagascar
          </button>
          <button
            onClick={() => jumpToRegion(-0.8, 113.9)}
            className="bg-white/80 hover:bg-white text-[#0B3A4A] text-[13px] font-semibold px-3 py-1 rounded-full shadow-sm border border-gray-100 cursor-pointer"
          >
            Sundaland
          </button>
          <button
            onClick={() => jumpToRegion(-9.2, -75.0)}
            className="bg-white/80 hover:bg-white text-[#0B3A4A] text-[13px] font-semibold px-3 py-1 rounded-full shadow-sm border border-gray-100 cursor-pointer"
          >
            Andes
          </button>
        </div>
      </div>

      {/* Prominent Zoom (+ / −) Controls on the Earth */}
      <div className="absolute right-2 sm:right-4 lg:right-3 bottom-8 z-30 flex flex-col items-center gap-1.5 bg-white/90 dark:bg-[#0B2533]/90 backdrop-blur-md p-1.5 rounded-full border border-gray-200/80 dark:border-[#1FB6C9]/30 shadow-lg hover:shadow-xl transition-all">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 rounded-full bg-white dark:bg-[#123648] hover:bg-[#E4F4F5] dark:hover:bg-[#1FB6C9]/20 text-[#0B3A4A] dark:text-[#E4F4F5] flex items-center justify-center font-bold text-base shadow-sm transition-transform hover:scale-105 cursor-pointer"
          title="Zoom In"
        >
          <Plus className="w-4 h-4 text-[#0B3A4A] dark:text-[#E4F4F5]" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 rounded-full bg-white dark:bg-[#123648] hover:bg-[#E4F4F5] dark:hover:bg-[#1FB6C9]/20 text-[#0B3A4A] dark:text-[#E4F4F5] flex items-center justify-center font-bold text-base shadow-sm transition-transform hover:scale-105 cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4 text-[#0B3A4A] dark:text-[#E4F4F5]" />
        </button>
        <button
          onClick={handleReset}
          className="w-8 h-8 rounded-full bg-white dark:bg-[#123648] hover:bg-[#E4F4F5] dark:hover:bg-[#1FB6C9]/20 text-[#0B3A4A] dark:text-[#E4F4F5] flex items-center justify-center shadow-sm transition-transform hover:scale-105 cursor-pointer"
          title="Reset Earth View"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#1FB6C9]" />
        </button>
      </div>

      {/* Telemetry & Auto-Rotate Toggle (Top-Left of Globe container, text increased by 3px) */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="bg-[#0B3A4A]/85 backdrop-blur-md text-[#E4F4F5] text-[13px] px-3.5 py-1.5 rounded-full border border-white/10 font-mono shadow-sm">
          {coords.lat >= 0 ? `${coords.lat}°N` : `${Math.abs(coords.lat)}°S`}, {coords.lng >= 0 ? `${coords.lng}°E` : `${Math.abs(coords.lng)}°W`}
        </div>
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="bg-white/85 dark:bg-[#0B2533]/85 hover:bg-white text-[#0B3A4A] dark:text-[#E4F4F5] text-[13px] font-semibold px-3 py-1.5 rounded-full border border-gray-200 dark:border-[#1FB6C9]/20 shadow-sm cursor-pointer"
        >
          {isRotating ? 'Pause' : 'Rotate'}
        </button>
      </div>
    </div>
  );
};
