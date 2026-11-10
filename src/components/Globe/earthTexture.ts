import * as THREE from 'three';

// Generates an exquisite, high-detail Earth texture harmonized with the Coralis palette
export function createEarthTexture(): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // 1. Deep Ocean Base with Bathymetric Gradients
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#06202B');     // Arctic deep marine
  oceanGrad.addColorStop(0.3, '#082D3D');   // Northern temperate ocean
  oceanGrad.addColorStop(0.5, '#0B3A4A');   // Coralis Marine (Equatorial)
  oceanGrad.addColorStop(0.7, '#082D3D');   // Southern temperate ocean
  oceanGrad.addColorStop(1, '#06202B');     // Antarctic deep marine
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Lat/Lng helper to pixel coordinate
  const toX = (lng: number) => ((lng + 180) / 360) * width;
  const toY = (lat: number) => ((90 - lat) / 180) * height;

  // Draw land polygon with coastal turquoise shelf
  const drawContinent = (
    coords: [number, number][],
    fillColor: string,
    shelfColor: string = 'rgba(31, 182, 201, 0.45)'
  ) => {
    // A. Coastal shallow shelf glow (Turquoise #1FB6C9)
    ctx.beginPath();
    coords.forEach(([lat, lng], idx) => {
      const px = toX(lng);
      const py = toY(lat);
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = shelfColor;
    ctx.stroke();

    // Secondary lighter aqua shelf
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(155, 240, 251, 0.55)';
    ctx.stroke();

    // B. Main Landmass Body
    ctx.fillStyle = fillColor;
    ctx.fill();

    // C. Crisp Shoreline
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = '#2F7D58';
    ctx.stroke();
  };

  // Geographic polygons approximating world landmasses
  // Africa
  const africa: [number, number][] = [
    [37, 10], [36, 1], [32, -5], [28, -13], [20, -17], [14, -17], [5, -9],
    [4, 7], [4, 9], [-4, 11], [-15, 12], [-22, 14], [-34, 18], [-34, 26],
    [-26, 33], [-11, 40], [0, 42], [11, 51], [12, 44], [15, 42], [22, 38],
    [31, 32], [32, 25], [36, 12]
  ];
  drawContinent(africa, '#2B6149'); // Rich Palm Green

  // Madagascar
  const madagascar: [number, number][] = [
    [-12, 49], [-16, 50], [-25, 47], [-25, 44], [-17, 44], [-12, 49]
  ];
  drawContinent(madagascar, '#2F7D58');

  // Eurasia (Europe + Asia)
  const eurasia: [number, number][] = [
    [71, 28], [60, 5], [44, -1], [36, -5], [37, 15], [38, 24], [41, 29],
    [36, 36], [31, 35], [22, 38], [13, 44], [13, 50], [25, 57], [25, 62],
    [8, 77], [13, 80], [22, 89], [21, 92], [10, 99], [1, 104], [6, 108],
    [21, 108], [22, 114], [31, 122], [38, 120], [40, 129], [43, 132],
    [60, 162], [66, 170], [70, -179], [72, 140], [75, 112], [76, 95],
    [72, 70], [68, 50], [70, 30]
  ];
  drawContinent(eurasia, '#26543F');

  // Indian Subcontinent
  const india: [number, number][] = [
    [24, 69], [21, 72], [15, 74], [8, 77], [10, 79], [13, 80],
    [17, 83], [22, 89], [26, 90], [28, 85], [30, 78], [28, 70]
  ];
  drawContinent(india, '#2E694E');

  // Sri Lanka
  const sriLanka: [number, number][] = [
    [9.5, 80.5], [6, 80.5], [6, 81.8], [9.5, 81]
  ];
  drawContinent(sriLanka, '#2F7D58');

  // Southeast Asian Archipelago & Sundaland
  const sumatra: [number, number][] = [
    [5, 96], [2, 99], [-3, 103], [-6, 105], [-4, 102], [0, 98], [5, 96]
  ];
  drawContinent(sumatra, '#1F6144');

  const borneo: [number, number][] = [
    [7, 117], [4, 119], [-3, 116], [-4, 112], [1, 109], [4, 114], [7, 117]
  ];
  drawContinent(borneo, '#1F6144');

  const java: [number, number][] = [
    [-6, 106], [-7, 114], [-8, 114], [-7, 106]
  ];
  drawContinent(java, '#1F6144');

  const philippines: [number, number][] = [
    [18, 121], [14, 124], [7, 126], [6, 122], [10, 123], [15, 120]
  ];
  drawContinent(philippines, '#226346');

  // North America
  const northAmerica: [number, number][] = [
    [71, -156], [60, -166], [55, -164], [58, -137], [49, -125], [34, -120],
    [23, -110], [19, -104], [15, -93], [8, -78], [10, -75], [19, -96],
    [29, -94], [25, -81], [35, -75], [44, -64], [52, -56], [60, -64],
    [65, -70], [70, -85], [74, -95], [72, -120], [71, -156]
  ];
  drawContinent(northAmerica, '#2E5E49');

  // South America
  const southAmerica: [number, number][] = [
    [12, -72], [9, -60], [5, -52], [-2, -44], [-6, -35], [-18, -39],
    [-23, -43], [-34, -53], [-42, -64], [-55, -67], [-52, -75], [-37, -74],
    [-18, -71], [-5, -81], [5, -77], [10, -75]
  ];
  drawContinent(southAmerica, '#27684B');

  // Australia
  const australia: [number, number][] = [
    [-11, 142], [-15, 145], [-24, 153], [-37, 150], [-38, 140], [-35, 136],
    [-32, 132], [-35, 116], [-22, 114], [-15, 124], [-12, 131], [-12, 136]
  ];
  drawContinent(australia, '#8A7A54'); // Warm golden sand / arid interior

  // Antarctica
  const antarctica: [number, number][] = [
    [-65, -180], [-68, -120], [-72, -60], [-65, -60], [-67, 0],
    [-66, 60], [-68, 120], [-65, 180], [-90, 180], [-90, -180]
  ];
  drawContinent(antarctica, '#E4F4F5', 'rgba(155, 240, 251, 0.4)'); // Pristine glacial aqua mist

  // 2. Add Topographic Shading & Mountain Ridges (Himalayas, Andes, Rockies)
  const drawRidge = (coords: [number, number][], widthPx: number, color: string) => {
    ctx.beginPath();
    coords.forEach(([lat, lng], idx) => {
      const px = toX(lng);
      const py = toY(lat);
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.lineWidth = widthPx;
    ctx.strokeStyle = color;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  // Himalayas
  drawRidge([[28, 75], [30, 82], [28, 90], [26, 96]], 6, 'rgba(235, 245, 240, 0.55)');
  // Andes
  drawRidge([[10, -73], [-2, -78], [-15, -73], [-32, -70], [-50, -72]], 5, 'rgba(235, 245, 240, 0.45)');
  // Rockies
  drawRidge([[55, -125], [45, -115], [35, -106]], 5, 'rgba(235, 245, 240, 0.45)');

  // 3. Subtle Latitude / Longitude Navigation Grid Lines (Fine Nautical Coralis Style)
  ctx.strokeStyle = 'rgba(155, 240, 251, 0.08)';
  ctx.lineWidth = 0.8;
  for (let lat = -60; lat <= 60; lat += 30) {
    const y = toY(lat);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  for (let lng = -150; lng <= 180; lng += 30) {
    const x = toX(lng);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Equator emphasis line (Turquoise subtle pulse)
  ctx.strokeStyle = 'rgba(31, 182, 201, 0.22)';
  ctx.lineWidth = 1.2;
  const eqY = toY(0);
  ctx.beginPath();
  ctx.moveTo(0, eqY);
  ctx.lineTo(width, eqY);
  ctx.stroke();

  // Return Three.js texture
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

// Procedural Clouds Texture
export function createCloudTexture(): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, width, height);

  // Draw soft cloud bands
  const bands = [
    { y: 0.15, h: 40, count: 12, alpha: 0.35 },
    { y: 0.35, h: 55, count: 18, alpha: 0.4 },
    { y: 0.50, h: 65, count: 22, alpha: 0.5 }, // ITCZ Equatorial clouds
    { y: 0.65, h: 50, count: 16, alpha: 0.38 },
    { y: 0.82, h: 35, count: 10, alpha: 0.32 },
  ];

  bands.forEach(band => {
    for (let i = 0; i < band.count; i++) {
      const cx = (i / band.count) * width + (Math.sin(i * 1.5) * 40);
      const cy = band.y * height + (Math.cos(i * 2.1) * 20);
      const rx = 50 + Math.sin(i * 3) * 30;
      const ry = band.h * 0.5 + Math.cos(i) * 10;

      const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, rx);
      grad.addColorStop(0, `rgba(255, 255, 255, ${band.alpha})`);
      grad.addColorStop(0.5, `rgba(228, 244, 245, ${band.alpha * 0.6})`);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, Math.sin(i) * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Convert spherical Lat/Lng to Vector3
export function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

