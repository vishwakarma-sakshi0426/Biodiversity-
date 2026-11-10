import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createEarthTexture, createCloudTexture, latLngToVector3 } from './earthTexture';
import { HotspotType, IncidentType } from '../../types';
import { MapPin, X, ExternalLink } from 'lucide-react';

export type SelectedMarkerData = 
  | { type: 'hotspot'; item: HotspotType }
  | { type: 'incident'; item: IncidentType };

interface EarthGlobeProps {
  hotspots: HotspotType[];
  incidents: IncidentType[];
  className?: string;
  onNavigateToDetect?: () => void;
  onRotationChange?: (wallpaperIndex: number) => void;
}

// Helper to create high-resolution 3D label sprites right on the Earth
function createLabelSprite(text: string, color: string): THREE.Sprite {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = 320;
  canvas.height = 70;
  ctx.font = 'bold 24px Manrope, sans-serif';
  const textWidth = ctx.measureText(text).width;
  const pillW = Math.min(290, textWidth + 32);
  const pillH = 42;
  const startX = (canvas.width - pillW) / 2;
  const startY = (canvas.height - pillH) / 2;

  // Background pill
  ctx.fillStyle = 'rgba(11, 58, 74, 0.92)';
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(startX, startY, pillW, pillH, 20);
  ctx.fill();
  ctx.stroke();

  // Text
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const spriteMat = new THREE.SpriteMaterial({
    map: texture,
    depthTest: true,
    transparent: true
  });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(0.36, 0.08, 1);
  sprite.position.y = 0.08;
  return sprite;
}

export const EarthGlobe: React.FC<EarthGlobeProps> = ({
  hotspots,
  incidents,
  className = '',
  onNavigateToDetect,
  onRotationChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const onRotationChangeRef = useRef(onRotationChange);
  onRotationChangeRef.current = onRotationChange;
  const lastWpIndexRef = useRef<number>(0);

  // Side Pop Image Card (Initialized with first hotspot for instant visual presence)
  const [activeSideCard, setActiveSideCard] = useState<{
    id: string;
    title: string;
    type: 'hotspot' | 'incident';
    subtitle: string;
    image: string;
    badge: string;
    description: string;
    detailsLabel: string;
    detailsValue: string;
    articleUrl?: string;
  } | null>(() => {
    const first = hotspots[0];
    if (!first) return null;
    return {
      id: first.id,
      title: first.name,
      type: 'hotspot',
      subtitle: `${first.country} • ${first.region}`,
      image: first.image || first.species[0]?.image || '',
      badge: `Threat: ${first.threatLevel}`,
      description: first.description,
      detailsLabel: 'Endangered Wildlife',
      detailsValue: first.species.map(s => s.name).join(', ')
    };
  });

  // Direct hover indicator tag under cursor
  const [hoveredMarkerTitle, setHoveredMarkerTitle] = useState<{
    x: number;
    y: number;
    title: string;
    type: 'hotspot' | 'incident';
  } | null>(null);

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

  // Drag Interaction State
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetCameraDistanceRef = useRef<number>(3.3);
  const currentCameraDistanceRef = useRef<number>(3.3);
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.22, y: -0.6 });

  const GLOBE_RADIUS = 1.45;

  // Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.25, currentCameraDistanceRef.current);
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
    const atmosphereGeometry = new THREE.SphereGeometry(GLOBE_RADIUS + 0.065, 48, 48);
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
    const ambientLight = new THREE.AmbientLight(0xE4F4F5, 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xFFFFFF, 1.85);
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

        // Notify rotation segment for background nature wallpaper synchronization
        const rotY = earthGroupRef.current.rotation.y;
        const normalized = ((rotY % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const wpIndex = Math.floor(normalized / ((Math.PI * 2) / 5)) % 5;
        if (lastWpIndexRef.current !== wpIndex) {
          lastWpIndexRef.current = wpIndex;
          onRotationChangeRef.current?.(wpIndex);
        }
      }

      if (cameraRef.current) {
        currentCameraDistanceRef.current += (targetCameraDistanceRef.current - currentCameraDistanceRef.current) * 0.1;
        cameraRef.current.position.z = currentCameraDistanceRef.current;
      }

      rippleRingsRef.current.forEach((ring, idx) => {
        const ringTime = time * 2.2 + idx * 0.4;
        const scale = 1 + (ringTime % 1.6);
        ring.scale.set(scale, scale, 1);
        const material = ring.material as THREE.MeshBasicMaterial;
        if (material) {
          material.opacity = Math.max(0, 0.8 - (ringTime % 1.6) * 0.5);
        }
      });

      // Hover Raycasting
      if (cameraRef.current && earthGroupRef.current) {
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const interactiveObjects = [
          ...hotspotMarkersRef.current.children,
          ...incidentMarkersRef.current.children
        ].filter(obj => obj.visible);

        const intersects = raycasterRef.current.intersectObjects(interactiveObjects, true);

        if (intersects.length > 0) {
          container.style.cursor = 'pointer';
          let hitObj: THREE.Object3D | null = intersects[0].object;
          while (hitObj && !hitObj.userData.markerType && hitObj.parent) {
            hitObj = hitObj.parent;
          }

          if (hitObj && hitObj.userData) {
            const screenPos = intersects[0].point.clone().project(cameraRef.current);
            const px = ((screenPos.x + 1) / 2) * container.clientWidth;
            const py = ((-screenPos.y + 1) / 2) * container.clientHeight;

            if (hitObj.userData.markerType === 'hotspot') {
              const item = hitObj.userData.data as HotspotType;
              setHoveredMarkerTitle({
                x: px,
                y: py,
                title: item.name,
                type: 'hotspot'
              });

              // Automatically display Side Pop Image Card
              setActiveSideCard({
                id: item.id,
                title: item.name,
                type: 'hotspot',
                subtitle: `${item.country} • ${item.region}`,
                image: item.image || item.species[0]?.image || 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17',
                badge: `Threat: ${item.threatLevel}`,
                description: item.description,
                detailsLabel: 'Endangered Wildlife',
                detailsValue: item.species.map(s => s.name).join(', ')
              });
            } else if (hitObj.userData.markerType === 'incident') {
              const item = hitObj.userData.data as IncidentType;
              setHoveredMarkerTitle({
                x: px,
                y: py,
                title: item.title,
                type: 'incident'
              });

              // Automatically display Side Pop Image Card
              setActiveSideCard({
                id: item.id,
                title: item.title,
                type: 'incident',
                subtitle: `${item.locationName}, ${item.country} (${item.date})`,
                image: item.image || 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17',
                badge: item.category,
                description: item.description,
                detailsLabel: 'Seizure Volume',
                detailsValue: item.seizureQuantity,
                articleUrl: item.articleUrl
              });
            }
          }
        } else {
          container.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab';
          setHoveredMarkerTitle(null);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && renderer.domElement) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  // Update Markers and add 3D Label Sprites directly on Earth
  useEffect(() => {
    while (hotspotMarkersRef.current.children.length > 0) {
      hotspotMarkersRef.current.remove(hotspotMarkersRef.current.children[0]);
    }
    while (incidentMarkersRef.current.children.length > 0) {
      incidentMarkersRef.current.remove(incidentMarkersRef.current.children[0]);
    }
    rippleRingsRef.current = [];

    // Hotspot Markers (Turquoise #1FB6C9) with 3D Name Labels on the Earth
    if (showHotspots) {
      hotspots.forEach(hotspot => {
        const markerGroup = new THREE.Group();
        markerGroup.userData = { markerType: 'hotspot', data: hotspot, id: hotspot.id };

        const pos = latLngToVector3(hotspot.lat, hotspot.lng, GLOBE_RADIUS);
        markerGroup.position.copy(pos);

        const normal = pos.clone().normalize();
        markerGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

        // Core Pin
        const pinGeo = new THREE.SphereGeometry(0.026, 16, 16);
        const pinMat = new THREE.MeshBasicMaterial({ color: 0x1FB6C9 });
        const pinMesh = new THREE.Mesh(pinGeo, pinMat);
        pinMesh.position.y = 0.04;
        markerGroup.add(pinMesh);

        // Stem
        const stemGeo = new THREE.CylinderGeometry(0.005, 0.008, 0.04, 8);
        const stemMat = new THREE.MeshBasicMaterial({ color: 0x2F7D58 });
        const stemMesh = new THREE.Mesh(stemGeo, stemMat);
        stemMesh.position.y = 0.02;
        markerGroup.add(stemMesh);

        // Ripple Ring
        const ringGeo = new THREE.RingGeometry(0.02, 0.04, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x52CFDF,
          transparent: true,
          opacity: 0.75,
          side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2;
        markerGroup.add(ringMesh);
        rippleRingsRef.current.push(ringMesh);

        // 3D Name Label right at the mark on the Earth
        const shortName = hotspot.name.replace(' Hotspot', '');
        const labelSprite = createLabelSprite(shortName, '#1FB6C9');
        markerGroup.add(labelSprite);

        hotspotMarkersRef.current.add(markerGroup);
      });
    }

    // Incident Markers (Coral #FF7E6B) with 3D Name Labels on the Earth
    if (showIncidents) {
      incidents.forEach(incident => {
        const markerGroup = new THREE.Group();
        markerGroup.userData = { markerType: 'incident', data: incident, id: incident.id };

        const pos = latLngToVector3(incident.lat, incident.lng, GLOBE_RADIUS);
        markerGroup.position.copy(pos);

        const normal = pos.clone().normalize();
        markerGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

        // Coral Diamond Pin
        const diamondGeo = new THREE.OctahedronGeometry(0.028, 0);
        const diamondMat = new THREE.MeshBasicMaterial({ color: 0xFF7E6B });
        const diamondMesh = new THREE.Mesh(diamondGeo, diamondMat);
        diamondMesh.position.y = 0.045;
        markerGroup.add(diamondMesh);

        // Stem
        const stemGeo = new THREE.CylinderGeometry(0.005, 0.008, 0.04, 8);
        const stemMat = new THREE.MeshBasicMaterial({ color: 0xE86350 });
        const stemMesh = new THREE.Mesh(stemGeo, stemMat);
        stemMesh.position.y = 0.02;
        markerGroup.add(stemMesh);

        // Warning Pulse Ring
        const ringGeo = new THREE.RingGeometry(0.022, 0.044, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xFF7E6B,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2;
        markerGroup.add(ringMesh);
        rippleRingsRef.current.push(ringMesh);

        // 3D Name Label right at the mark on the Earth
        const shortIncidentName = incident.country + ' Seizure';
        const labelSprite = createLabelSprite(shortIncidentName, '#FF7E6B');
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
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * 0.0015;
    targetCameraDistanceRef.current = Math.max(2.1, Math.min(4.8, targetCameraDistanceRef.current + zoomDelta));
  };

  // Jump to region helper
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
      />

      {/* Direct pin title indicator under cursor */}
      {hoveredMarkerTitle && (
        <div
          className="absolute pointer-events-none z-30 transform -translate-x-1/2 -translate-y-full pb-2 transition-all duration-75"
          style={{ left: hoveredMarkerTitle.x, top: hoveredMarkerTitle.y }}
        >
          <div className="bg-[#0B3A4A]/95 text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-lg border border-white/20 whitespace-nowrap flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${hoveredMarkerTitle.type === 'hotspot' ? 'bg-[#1FB6C9]' : 'bg-[#FF7E6B]'}`} />
            <span>{hoveredMarkerTitle.title}</span>
          </div>
        </div>
      )}

      {/* POP IMAGE SIDE CARD (Side of the Earth, never blurring or covering the Earth) */}
      {activeSideCard && (
        <div className="absolute top-4 left-4 z-30 w-72 sm:w-80 bg-white/95 backdrop-blur-md rounded-[28px] p-4 shadow-2xl border border-[#1FB6C9]/25 text-[#3A5A64] animate-in slide-in-from-left duration-200">
          <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-3 bg-black/10">
            <img
              src={activeSideCard.image}
              alt={activeSideCard.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Top Close Button */}
            <button
              onClick={() => setActiveSideCard(null)}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close Preview"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Type Badge */}
            <div className="absolute bottom-2 left-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${
                  activeSideCard.type === 'hotspot' ? 'bg-[#1FB6C9]' : 'bg-[#FF7E6B]'
                }`}
              >
                {activeSideCard.type === 'hotspot' ? 'Biodiversity Hotspot' : 'Documented Seizure'}
              </span>
            </div>
          </div>

          <h3 className="font-serif text-xl font-medium text-[#0B3A4A] leading-snug">
            {activeSideCard.title}
          </h3>
          <p className="text-xs text-[#6E8890] mt-0.5 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#1FB6C9] shrink-0" />
            <span className="truncate">{activeSideCard.subtitle}</span>
          </p>

          <p className="text-xs text-[#3A5A64] mt-2 leading-relaxed line-clamp-2">
            {activeSideCard.description}
          </p>

          <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#6E8890] block">
                {activeSideCard.detailsLabel}
              </span>
              <span className="font-medium text-[#0B3A4A] truncate max-w-[170px] block">
                {activeSideCard.detailsValue}
              </span>
            </div>
            {activeSideCard.articleUrl ? (
              <a
                href={activeSideCard.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#FF7E6B] font-semibold hover:underline"
              >
                Source <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="text-[#1FB6C9] font-medium text-[10px]">
                {activeSideCard.badge}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Layer Visibility & Quick Region Jumpers (Placed Top Right) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
        <div className="bg-white/85 backdrop-blur-md p-1.5 rounded-full border border-[#1FB6C9]/25 shadow-sm flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
              showHotspots
                ? 'bg-[#E4F4F5] text-[#0B3A4A] border border-[#1FB6C9]/30'
                : 'text-gray-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#1FB6C9]" />
            <span>Hotspots</span>
          </button>
          <button
            onClick={() => setShowIncidents(!showIncidents)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
              showIncidents
                ? 'bg-[#FF7E6B]/15 text-[#E86350] border border-[#FF7E6B]/30'
                : 'text-gray-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#FF7E6B]" />
            <span>Seizures</span>
          </button>
        </div>

        {/* Quick Continent Fly-To */}
        <div className="hidden sm:flex flex-wrap justify-end gap-1 max-w-xs">
          <button
            onClick={() => jumpToRegion(16.5, 101.0)}
            className="bg-white/80 hover:bg-white text-[#0B3A4A] text-[10px] font-medium px-2.5 py-1 rounded-full shadow-sm border border-gray-100 cursor-pointer"
          >
            Indo-Burma
          </button>
          <button
            onClick={() => jumpToRegion(-18.7, 46.8)}
            className="bg-white/80 hover:bg-white text-[#0B3A4A] text-[10px] font-medium px-2.5 py-1 rounded-full shadow-sm border border-gray-100 cursor-pointer"
          >
            Madagascar
          </button>
          <button
            onClick={() => jumpToRegion(-0.8, 113.9)}
            className="bg-white/80 hover:bg-white text-[#0B3A4A] text-[10px] font-medium px-2.5 py-1 rounded-full shadow-sm border border-gray-100 cursor-pointer"
          >
            Sundaland
          </button>
          <button
            onClick={() => jumpToRegion(-9.2, -75.0)}
            className="bg-white/80 hover:bg-white text-[#0B3A4A] text-[10px] font-medium px-2.5 py-1 rounded-full shadow-sm border border-gray-100 cursor-pointer"
          >
            Andes
          </button>
        </div>
      </div>

      {/* Bottom Telemetry & Controls */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
        <div className="bg-[#0B3A4A]/80 backdrop-blur-md text-[#E4F4F5] text-[10px] px-3 py-1 rounded-full border border-white/10 font-mono">
          {coords.lat >= 0 ? `${coords.lat}°N` : `${Math.abs(coords.lat)}°S`}, {coords.lng >= 0 ? `${coords.lng}°E` : `${Math.abs(coords.lng)}°W`}
        </div>
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="bg-white/80 hover:bg-white text-[#0B3A4A] text-[10px] font-medium px-2.5 py-1 rounded-full border border-gray-200 cursor-pointer"
        >
          {isRotating ? 'Pause' : 'Rotate'}
        </button>
      </div>
    </div>
  );
};
