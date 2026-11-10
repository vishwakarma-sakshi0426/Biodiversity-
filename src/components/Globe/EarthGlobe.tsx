import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { createEarthTexture, createCloudTexture, latLngToVector3 } from './earthTexture';
import { HotspotType, IncidentType } from '../../types';

export type SelectedMarkerData = 
  | { type: 'hotspot'; item: HotspotType }
  | { type: 'incident'; item: IncidentType };

interface EarthGlobeProps {
  hotspots: HotspotType[];
  incidents: IncidentType[];
  showHotspots?: boolean;
  showIncidents?: boolean;
  onSelectMarker: (data: SelectedMarkerData) => void;
  selectedMarkerId?: string | null;
  className?: string;
  isHeroMode?: boolean;
}

export const EarthGlobe: React.FC<EarthGlobeProps> = ({
  hotspots,
  incidents,
  showHotspots = true,
  showIncidents = true,
  onSelectMarker,
  selectedMarkerId,
  className = '',
  isHeroMode = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredInfo, setHoveredInfo] = useState<{
    x: number;
    y: number;
    title: string;
    type: 'hotspot' | 'incident';
    subtitle: string;
    badge: string;
  } | null>(null);

  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [isRotating, setIsRotating] = useState<boolean>(true);

  // References to Three.js elements
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

  // Drag interaction state
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationVelocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0.0015 });
  const targetCameraDistanceRef = useRef<number>(isHeroMode ? 3.6 : 3.4);
  const currentCameraDistanceRef = useRef<number>(isHeroMode ? 3.6 : 3.4);
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.25, y: -0.6 });

  const GLOBE_RADIUS = 1.45;

  // Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.4, currentCameraDistanceRef.current);
    cameraRef.current = camera;

    // 3. Renderer with high color fidelity
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

    // 4. Earth Master Group
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);
    earthGroupRef.current = earthGroup;
    earthGroup.rotation.x = targetRotationRef.current.x;
    earthGroup.rotation.y = targetRotationRef.current.y;

    // 5. Earth Sphere
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

    // 6. Translucent Cloud Layer
    const cloudGeometry = new THREE.SphereGeometry(GLOBE_RADIUS + 0.015, 48, 48);
    const cloudTexture = createCloudTexture();
    const cloudMaterial = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.45,
      blending: THREE.NormalBlending,
      roughness: 0.9,
      depthWrite: false
    });
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    earthGroup.add(cloudMesh);
    cloudMeshRef.current = cloudMesh;

    // 7. Atmospheric Glow (Custom inverted back-side cyan sphere)
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

    // 8. Marker Groups
    earthGroup.add(hotspotMarkersRef.current);
    earthGroup.add(incidentMarkersRef.current);

    // 9. Lighting Setup (Cinematic Sun + Aqua Ambient)
    const ambientLight = new THREE.AmbientLight(0xE4F4F5, 0.75); // Aqua Mist ambient
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xFFFFFF, 1.8);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x9BF0FB, 0.85); // Hero Cyan rim light
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // 10. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Clouds rotate slightly faster than earth
      if (cloudMeshRef.current) {
        cloudMeshRef.current.rotation.y += 0.0006;
      }

      // Smooth Inertial Rotation
      if (earthGroupRef.current) {
        if (!isDraggingRef.current && isRotating) {
          earthGroupRef.current.rotation.y += rotationVelocityRef.current.y;
          earthGroupRef.current.rotation.x += (targetRotationRef.current.x - earthGroupRef.current.rotation.x) * 0.05;
        }
      }

      // Smooth Camera Zoom
      if (cameraRef.current) {
        currentCameraDistanceRef.current += (targetCameraDistanceRef.current - currentCameraDistanceRef.current) * 0.1;
        cameraRef.current.position.z = currentCameraDistanceRef.current;
      }

      // Animate Ripple Rings on markers
      rippleRingsRef.current.forEach((ring, idx) => {
        const ringTime = time * 2.2 + idx * 0.4;
        const scale = 1 + (ringTime % 1.6);
        ring.scale.set(scale, scale, 1);
        const material = ring.material as THREE.MeshBasicMaterial;
        if (material) {
          material.opacity = Math.max(0, 0.8 - (ringTime % 1.6) * 0.5);
        }
      });

      // Raycasting for hover tooltip
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
              setHoveredInfo({
                x: px,
                y: py,
                title: item.name,
                type: 'hotspot',
                subtitle: item.country,
                badge: `Threat: ${item.threatLevel}`
              });
            } else if (hitObj.userData.markerType === 'incident') {
              const item = hitObj.userData.data as IncidentType;
              setHoveredInfo({
                x: px,
                y: py,
                title: item.title,
                type: 'incident',
                subtitle: `${item.country} • ${item.date}`,
                badge: item.category
              });
            }
          }
        } else {
          container.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab';
          setHoveredInfo(null);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
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
  }, [isHeroMode]);

  // Create Marker Meshes whenever hotspots, incidents or visibility change
  useEffect(() => {
    // Clear existing markers
    while (hotspotMarkersRef.current.children.length > 0) {
      hotspotMarkersRef.current.remove(hotspotMarkersRef.current.children[0]);
    }
    while (incidentMarkersRef.current.children.length > 0) {
      incidentMarkersRef.current.remove(incidentMarkersRef.current.children[0]);
    }
    rippleRingsRef.current = [];

    // Helper: Build a 3D Hotspot Beacon (Turquoise #1FB6C9 & Palm Green #2F7D58)
    if (showHotspots) {
      hotspots.forEach(hotspot => {
        const markerGroup = new THREE.Group();
        markerGroup.userData = { markerType: 'hotspot', data: hotspot, id: hotspot.id };

        const pos = latLngToVector3(hotspot.lat, hotspot.lng, GLOBE_RADIUS);
        markerGroup.position.copy(pos);

        // Align marker orientation tangent to globe surface
        const normal = pos.clone().normalize();
        markerGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

        // Core Pin Sphere
        const pinGeo = new THREE.SphereGeometry(0.024, 16, 16);
        const pinMat = new THREE.MeshBasicMaterial({ color: 0x1FB6C9 }); // Turquoise
        const pinMesh = new THREE.Mesh(pinGeo, pinMat);
        pinMesh.position.y = 0.04;
        markerGroup.add(pinMesh);

        // Inner glowing beacon stem
        const stemGeo = new THREE.CylinderGeometry(0.005, 0.008, 0.04, 8);
        const stemMat = new THREE.MeshBasicMaterial({ color: 0x2F7D58 }); // Palm Green
        const stemMesh = new THREE.Mesh(stemGeo, stemMat);
        stemMesh.position.y = 0.02;
        markerGroup.add(stemMesh);

        // Surface Ripple Ring
        const ringGeo = new THREE.RingGeometry(0.02, 0.038, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x52CFDF,
          transparent: true,
          opacity: 0.7,
          side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2;
        markerGroup.add(ringMesh);
        rippleRingsRef.current.push(ringMesh);

        hotspotMarkersRef.current.add(markerGroup);
      });
    }

    // Helper: Build an Incident Warning Pin (Coral #FF7E6B)
    if (showIncidents) {
      incidents.forEach(incident => {
        const markerGroup = new THREE.Group();
        markerGroup.userData = { markerType: 'incident', data: incident, id: incident.id };

        const pos = latLngToVector3(incident.lat, incident.lng, GLOBE_RADIUS);
        markerGroup.position.copy(pos);

        // Align marker orientation tangent to globe surface
        const normal = pos.clone().normalize();
        markerGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

        // Coral Diamond / Octahedron Pin
        const diamondGeo = new THREE.OctahedronGeometry(0.028, 0);
        const diamondMat = new THREE.MeshBasicMaterial({ color: 0xFF7E6B }); // Coral
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
        const ringGeo = new THREE.RingGeometry(0.022, 0.042, 24);
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

        incidentMarkersRef.current.add(markerGroup);
      });
    }

    hotspotMarkersRef.current.visible = showHotspots;
    incidentMarkersRef.current.visible = showIncidents;
  }, [hotspots, incidents, showHotspots, showIncidents]);

  // Smooth Focus to Selected Marker if passed from outside
  useEffect(() => {
    if (!selectedMarkerId || !earthGroupRef.current) return;

    let targetLat: number | null = null;
    let targetLng: number | null = null;

    const foundHotspot = hotspots.find(h => h.id === selectedMarkerId);
    if (foundHotspot) {
      targetLat = foundHotspot.lat;
      targetLng = foundHotspot.lng;
    } else {
      const foundIncident = incidents.find(i => i.id === selectedMarkerId);
      if (foundIncident) {
        targetLat = foundIncident.lat;
        targetLng = foundIncident.lng;
      }
    }

    if (targetLat !== null && targetLng !== null) {
      // Calculate rotation required to face camera (0, 0, Z)
      const targetY = -(targetLng + 90) * (Math.PI / 180);
      const targetX = (targetLat) * (Math.PI / 180) * 0.6;
      targetRotationRef.current = { x: targetX, y: targetY };
      targetCameraDistanceRef.current = 2.4; // Zoom in
      setIsRotating(false);
    }
  }, [selectedMarkerId, hotspots, incidents]);

  // Mouse & Touch Event Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Normalized Device Coordinates (-1 to +1) for raycasting
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    mouseRef.current.set(x, y);

    // Coordinate approximation under cursor
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
      // Clamp pitch to avoid gimbal flip
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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cameraRef.current || !earthGroupRef.current) return;

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
        if (hitObj.userData.markerType === 'hotspot') {
          onSelectMarker({ type: 'hotspot', item: hitObj.userData.data });
        } else if (hitObj.userData.markerType === 'incident') {
          onSelectMarker({ type: 'incident', item: hitObj.userData.data });
        }
      }
    }
  };

  // Helper controls
  const handleZoomIn = () => {
    targetCameraDistanceRef.current = Math.max(2.1, targetCameraDistanceRef.current - 0.4);
  };

  const handleZoomOut = () => {
    targetCameraDistanceRef.current = Math.min(4.8, targetCameraDistanceRef.current + 0.4);
  };

  const handleReset = () => {
    targetRotationRef.current = { x: 0.25, y: -0.6 };
    targetCameraDistanceRef.current = isHeroMode ? 3.6 : 3.4;
    if (earthGroupRef.current) {
      earthGroupRef.current.rotation.x = 0.25;
      earthGroupRef.current.rotation.y = -0.6;
    }
    setIsRotating(true);
    setHoveredInfo(null);
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
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
        onClick={handleClick}
      />

      {/* Hover Floating Tooltip (Coralis Refined Glass Style) */}
      {hoveredInfo && (
        <div
          className="absolute pointer-events-none z-30 transform -translate-x-1/2 -translate-y-full transition-all duration-150 ease-out pb-3"
          style={{ left: hoveredInfo.x, top: hoveredInfo.y }}
        >
          <div className="bg-[#0B3A4A]/92 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-xl border border-[#9BF0FB]/20 min-w-[210px] max-w-[280px]">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  hoveredInfo.type === 'hotspot' ? 'bg-[#1FB6C9] ring-2 ring-[#1FB6C9]/40' : 'bg-[#FF7E6B] ring-2 ring-[#FF7E6B]/40'
                }`}
              />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#9BF0FB]">
                {hoveredInfo.type === 'hotspot' ? 'Biodiversity Hotspot' : 'Documented Incident'}
              </span>
            </div>
            <div className="font-serif text-base font-medium text-white leading-tight">
              {hoveredInfo.title}
            </div>
            <div className="text-xs text-[#E4F4F5]/80 mt-0.5">
              {hoveredInfo.subtitle}
            </div>
            <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-[#9BF0FB] text-[10px] tracking-wide">{hoveredInfo.badge}</span>
              <span className="text-white/60 text-[10px]">Click to inspect →</span>
            </div>
          </div>
        </div>
      )}

      {/* On-Globe Navigation & Telemetry Overlay (Non-Hero Mode or Secondary) */}
      {!isHeroMode && (
        <>
          {/* Top Left: Quick Region Fly-To Jumpers */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1.5 max-w-md">
            <button
              onClick={() => jumpToRegion(16.5, 101.0)}
              className="bg-white/85 hover:bg-white text-[#0B3A4A] text-xs font-medium px-3 py-1.5 rounded-full shadow-sm border border-[#1FB6C9]/30 transition-all hover:scale-105"
            >
              Indo-Burma
            </button>
            <button
              onClick={() => jumpToRegion(-18.7, 46.8)}
              className="bg-white/85 hover:bg-white text-[#0B3A4A] text-xs font-medium px-3 py-1.5 rounded-full shadow-sm border border-[#1FB6C9]/30 transition-all hover:scale-105"
            >
              Madagascar
            </button>
            <button
              onClick={() => jumpToRegion(-0.8, 113.9)}
              className="bg-white/85 hover:bg-white text-[#0B3A4A] text-xs font-medium px-3 py-1.5 rounded-full shadow-sm border border-[#1FB6C9]/30 transition-all hover:scale-105"
            >
              Sundaland
            </button>
            <button
              onClick={() => jumpToRegion(-9.2, -75.0)}
              className="bg-white/85 hover:bg-white text-[#0B3A4A] text-xs font-medium px-3 py-1.5 rounded-full shadow-sm border border-[#1FB6C9]/30 transition-all hover:scale-105"
            >
              Tropical Andes
            </button>
            <button
              onClick={() => jumpToRegion(-0.2, 20.0)}
              className="bg-white/85 hover:bg-white text-[#0B3A4A] text-xs font-medium px-3 py-1.5 rounded-full shadow-sm border border-[#1FB6C9]/30 transition-all hover:scale-105"
            >
              Congo Basin
            </button>
          </div>

          {/* Bottom Left: Lat / Lng Coordinate Telemetry */}
          <div className="absolute bottom-4 left-4 z-20 bg-[#0B3A4A]/80 backdrop-blur-md text-[#E4F4F5] text-[11px] px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FB6C9] animate-pulse" />
              <span className="font-mono text-[#9BF0FB]">
                {coords.lat >= 0 ? `${coords.lat}°N` : `${Math.abs(coords.lat)}°S`},{' '}
                {coords.lng >= 0 ? `${coords.lng}°E` : `${Math.abs(coords.lng)}°W`}
              </span>
            </span>
            <span className="text-white/40">|</span>
            <span className="text-white/70">WGS84 Earth Grid</span>
          </div>

          {/* Bottom Right: Zoom & Rotation Controls */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border transition-all ${
                isRotating
                  ? 'bg-[#1FB6C9]/20 text-[#0B3A4A] border-[#1FB6C9] hover:bg-[#1FB6C9]/30'
                  : 'bg-white/80 text-[#3A5A64] border-gray-200 hover:bg-white'
              }`}
              title="Toggle Earth Auto-Rotation"
            >
              {isRotating ? 'Auto-Rotate: ON' : 'Auto-Rotate: PAUSED'}
            </button>

            <button
              onClick={handleZoomIn}
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#0B3A4A] shadow-md flex items-center justify-center font-bold text-base transition-all hover:scale-105"
              title="Zoom In"
            >
              +
            </button>

            <button
              onClick={handleZoomOut}
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#0B3A4A] shadow-md flex items-center justify-center font-bold text-base transition-all hover:scale-105"
              title="Zoom Out"
            >
              −
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#0B3A4A] text-xs font-medium shadow-md transition-all hover:scale-105"
              title="Reset View"
            >
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
};
