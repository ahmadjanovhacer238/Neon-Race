import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Upgrades } from '../types';
import { audio } from '../utils/audio';

export const createAsphaltTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#222227';
    ctx.fillRect(0, 0, 512, 1024);

    // Fine gravel dust
    for (let i = 0; i < 110000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 1024;
      const size = Math.random() * 1.5 + 0.5;
      const gray = Math.floor(Math.random() * 60) + 180;
      ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, ${Math.random() * 0.11})`;
      ctx.fillRect(x, y, size, size);
    }

    for (let i = 0; i < 55000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 1024;
      const size = Math.random() * 2 + 0.5;
      ctx.fillStyle = `rgba(10, 10, 12, ${Math.random() * 0.22})`;
      ctx.fillRect(x, y, size, size);
    }

    const gradient = ctx.createLinearGradient(0, 0, 512, 0);
    gradient.addColorStop(0.0, 'rgba(12,12,15,0.4)');
    gradient.addColorStop(0.15, 'rgba(12,12,15,0.1)');
    gradient.addColorStop(0.25, 'rgba(28,28,32,0.0)');
    gradient.addColorStop(0.35, 'rgba(12,12,15,0.22)');
    gradient.addColorStop(0.45, 'rgba(12,12,15,0.22)');
    gradient.addColorStop(0.5, 'rgba(28,28,32,0.0)');
    gradient.addColorStop(0.55, 'rgba(12,12,15,0.22)');
    gradient.addColorStop(0.65, 'rgba(12,12,15,0.22)');
    gradient.addColorStop(0.75, 'rgba(28,28,32,0.0)');
    gradient.addColorStop(0.85, 'rgba(12,12,15,0.1)');
    gradient.addColorStop(1.0, 'rgba(12,12,15,0.4)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 1024);

    ctx.strokeStyle = 'rgba(8, 8, 12, 0.4)';
    ctx.lineWidth = 1.0;
    for (let j = 0; j < 5; j++) {
      ctx.beginPath();
      let startX = Math.random() * 512;
      let startY = Math.random() * 1024;
      ctx.moveTo(startX, startY);
      for (let k = 0; k < 5; k++) {
        startX += (Math.random() - 0.5) * 20;
        startY += Math.random() * 40 + 10;
        ctx.lineTo(startX, startY);
      }
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 12);
  return texture;
};

export const ROAD_THEMES = [
  {
    name: 'Bahorgi Sakuralar Bo‘stoni (Spring Blossoms)',
    isDay: true,
    fogColor: 0x93c5fd, // bright light sky blue
    gridLeft: 0x15803d, // grass fields left
    gridRight: 0x166534, // grass fields right
    sideBorder: 0xdddddd, // clean silver/white metallic guardrail reflectives
    dividers: 0xffffff, // classic highway white divider lane marks
    towersLeft: 0x1b4332, // Tree trunk brown
    towersRight: 0x2d6a4f, // Tree leaves green
    roadColor: 0x222227, // bright realistic asphalt grey
  },
  {
    name: 'Yozgi Shom Shombulvari (Summer Sunset)',
    isSunset: true,
    fogColor: 0x2a0d1d, // gorgeous warm amber-crimson shom
    gridLeft: 0xe65100, // warm orange sunset rays
    gridRight: 0xd84315,
    sideBorder: 0xfbae17, // warm amber reflector lanes
    dividers: 0xffea00, // traditional warm yellow highway lines
    towersLeft: 0x451a03,
    towersRight: 0x78350f,
    roadColor: 0x161215, // tinted warm dark asphalt
  },
  {
    name: 'Tungi Kiber Yo‘lak (Midnight Cyber Highway)',
    isNight: true,
    fogColor: 0x02020e, // ink slate midnight
    gridLeft: 0x00f3ff, // blue streetlights
    gridRight: 0xa855f7, // purple horizon glows
    sideBorder: 0x01f0ff,
    dividers: 0xffea00, // amber center hazard lines
    towersLeft: 0x475569,
    towersRight: 0x334155,
    roadColor: 0x06060c, // wet dark charcoal asphalt
  },
  {
    name: 'Yozgiyam Yam-Yashil Oromgoh (Lush Summer Woods)',
    fogColor: 0x010b03,
    gridLeft: 0x14532d,
    gridRight: 0x39ff14,
    sideBorder: 0x39ff14,
    dividers: 0x39ff14,
    towersLeft: 0x14532d,
    towersRight: 0x39ff14,
    roadColor: 0x030804,
  },
  {
    name: 'Muzlagan Arktika Dovoni (Winter Glacier Pass)',
    fogColor: 0x02071a,
    gridLeft: 0x1e3b8a,
    gridRight: 0x38bdf8,
    sideBorder: 0xa5f3fc,
    dividers: 0x1e3b8a,
    towersLeft: 0x1e3b8a,
    towersRight: 0x38bdf8,
    roadColor: 0x02030f,
  },
  {
    name: 'Kuzgi To‘q Sarq Zamin (Golden Autumn Valley)',
    fogColor: 0x100802,
    gridLeft: 0x78350f,
    gridRight: 0xfbcfe8,
    sideBorder: 0xfbae17,
    dividers: 0x78350f,
    towersLeft: 0x78350f,
    towersRight: 0xfbae17,
    roadColor: 0x090502,
  },
  {
    name: 'Plazma Toʻlqini Olov Yo‘li (Plasma Hyperdrive)',
    fogColor: 0x060112,
    gridLeft: 0x4a044e,
    gridRight: 0xd946ef,
    sideBorder: 0xd946ef,
    dividers: 0x4a044e,
    towersLeft: 0x4a044e,
    towersRight: 0xd946ef,
    roadColor: 0x03000b,
  },
  {
    name: 'Koinotning Cheksiz Matrixi (Digital Cosmos)',
    fogColor: 0x000105,
    gridLeft: 0x0c0f1d,
    gridRight: 0x00f3ff,
    sideBorder: 0x00f3ff,
    dividers: 0x0c0f1d,
    towersLeft: 0x0c0f1d,
    towersRight: 0x00f3ff,
    roadColor: 0x000103,
  }
];

export const getStageObstacleColors = (stage: number) => {
  switch (stage) {
    case 1: // Hububiy Neon (Cyan & Purple)
      return {
        bodies: [0x1e1b4b, 0x312e81, 0x0f172a, 0x09090b],
        glow: 0x00f3ff,
        accent: 0xa855f7,
        smoke: 0x00f3ff
      };
    case 2: // Zaharli Hudud (Acid Green - monochrome feel)
      return {
        bodies: [0x064e3b, 0x022c22, 0x0c0a09, 0x14532d],
        glow: 0x39ff14,
        accent: 0x10b981,
        smoke: 0x39ff14
      };
    case 3: // Alvon Quyosh Poygasi (Sunset Red/Gold)
      return {
        bodies: [0x7f1d1d, 0x450a0a, 0x111827, 0x220c0c],
        glow: 0xff4500,
        accent: 0xf97316,
        smoke: 0xff3c00
      };
    case 4: // Muzlagan Kiber Vadiy (Icy Blue / White)
      return {
        bodies: [0x0c4a6e, 0x1e3a8a, 0xe2e8f0, 0x0f172a],
        glow: 0x38bdf8,
        accent: 0xffffff,
        smoke: 0xa5f3fc
      };
    case 5: // Tilla Qum Sahrosi (Bronze / Golden luxury feel)
      return {
        bodies: [0x78350f, 0x451a03, 0x111116, 0x1e1b12],
        glow: 0xfbae17,
        accent: 0xfbbf24,
        smoke: 0xfbae17
      };
    case 6: // Plazma Toʻlqini (Vibrant Violet / Cyber rose feel)
      return {
        bodies: [0x581c87, 0x3b0764, 0x030712, 0x4a044e],
        glow: 0xd946ef,
        accent: 0xec4899,
        smoke: 0xd946ef
      };
    case 7: // Magma Vulqoni (Hot Volcanic red / Obsidian feel)
      return {
        bodies: [0x1c1917, 0x0c0a09, 0x111111, 0x240800],
        glow: 0xff4500,
        accent: 0xf97316,
        smoke: 0xff4500
      };
    case 8: // Cheksiz Koinot (Midnight Cosmic matrix)
      return {
        bodies: [0x030712, 0x0284c7, 0x0f172a, 0x1e1b4b],
        glow: 0x00f3ff,
        accent: 0xffffff,
        smoke: 0x00f3ff
      };
    default:
      return {
        bodies: [0x111111, 0x222222, 0x333333],
        glow: 0x00ffff,
        accent: 0xff00ff,
        smoke: 0xffffff
      };
  }
};

interface ThreeCanvasProps {
  isPlaying: boolean;
  selectedSkinColor: string;
  selectedSkinId: string;
  upgrades: Upgrades;
  onCoinCollected: (type: 'gold' | 'shield_powerup' | 'turbo_powerup') => void;
  onObstacleCrash: () => void;
  onScoreTick: (scoreIncrement: number, distanceIncrement: number, currentSpeed: number) => void;
  // Controls passed from keyboard or overlay buttons
  controlsRef: React.MutableRefObject<{
    left: boolean;
    right: boolean;
    brake: boolean;
    gas: boolean;
  }>;
  roadThemeIndex: number;
  stageLevel: number;
  shieldCount: number;
  cameraView: 'chase' | 'cockpit';
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  isPlaying,
  selectedSkinColor,
  selectedSkinId,
  upgrades,
  onCoinCollected,
  onObstacleCrash,
  onScoreTick,
  controlsRef,
  roadThemeIndex,
  stageLevel,
  shieldCount,
  cameraView
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Keep game parameters in refs to avoid React-render dependency cycles in the fast animation loop
  const isPlayingRef = useRef(isPlaying);
  const upgradesRef = useRef(upgrades);
  const selectedSkinColorRef = useRef(selectedSkinColor);
  const selectedSkinIdRef = useRef(selectedSkinId);
  const roadThemeIndexRef = useRef(roadThemeIndex);
  const stageLevelRef = useRef(stageLevel);
  const shieldCountRef = useRef(shieldCount);
  const cameraViewRef = useRef(cameraView);

  const onCoinCollectedRef = useRef(onCoinCollected);
  const onObstacleCrashRef = useRef(onObstacleCrash);
  const onScoreTickRef = useRef(onScoreTick);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    upgradesRef.current = upgrades;
  }, [upgrades]);

  useEffect(() => {
    selectedSkinColorRef.current = selectedSkinColor;
  }, [selectedSkinColor]);

  useEffect(() => {
    selectedSkinIdRef.current = selectedSkinId;
  }, [selectedSkinId]);

  useEffect(() => {
    roadThemeIndexRef.current = roadThemeIndex;
  }, [roadThemeIndex]);

  useEffect(() => {
    stageLevelRef.current = stageLevel;
  }, [stageLevel]);

  useEffect(() => {
    shieldCountRef.current = shieldCount;
  }, [shieldCount]);

  useEffect(() => {
    cameraViewRef.current = cameraView;
  }, [cameraView]);

  useEffect(() => {
    onCoinCollectedRef.current = onCoinCollected;
  }, [onCoinCollected]);

  useEffect(() => {
    onObstacleCrashRef.current = onObstacleCrash;
  }, [onObstacleCrash]);

  useEffect(() => {
    onScoreTickRef.current = onScoreTick;
  }, [onScoreTick]);

  useEffect(() => {
    if (!containerRef.current) return;

    // ----------------------------------------------------
    // 1. SETUP THREE.JS SCENE, CAMERA, RENDERER
    // ----------------------------------------------------
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    // Midnight cyber-fog density
    scene.fog = new THREE.FogExp2(0x02020e, 0.015);

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.set(0, 4, 10); // Elevated pursuit follow perspective

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x02020e);
    container.appendChild(renderer.domElement);

    // ----------------------------------------------------
    // 2. LIGHTING (Cyberpunk glowing accents with Camera Rim Highlight Beam)
    // ----------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0x222244, 1.15); // Slightly brighter, more colorful base fill
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xff00aa, 1.5);
    directionalLight.position.set(0, 20, 10);
    scene.add(directionalLight);

    const blueLight = new THREE.DirectionalLight(0x00f0ff, 1.3);
    blueLight.position.set(10, 5, -10);
    scene.add(blueLight);

    // Dynamic, high-fidelity headlamp fill light attached straight to the camera
    // This projects a headlight-like beam exactly in our line of sight, which makes
    // all shiny car bodies, metallic tires, and details gleam beautifully from any distance!
    const cameraHeadlamp = new THREE.DirectionalLight(0xffffff, 1.25);
    cameraHeadlamp.position.set(0, 0, 1); // point directly forward from the camera
    camera.add(cameraHeadlamp);
    scene.add(camera); // Must add parent camera to the scene for nested light to propagate

    // ----------------------------------------------------
    // X. ROAD CURVE GENERATOR DEFINITION
    // ----------------------------------------------------
    const getRoadCurveOffset = (absZ: number) => {
      // Create beautifully safe straight line for the first meters, then smooth curves that wave across space!
      if (absZ < 100) return 0;
      
      // Combinations of smooth wide curves that bend deep to one side and return back symmetrically
      const phase = (absZ - 100);
      const wave1 = Math.sin(phase * 0.0035) * 15.0; // Wide sweeping bend left and right
      const wave2 = Math.cos(phase * 0.007) * 5.0;    // Secondary weaver that returns the vehicle back
      const wave3 = Math.sin(phase * 0.0015) * 8.0;   // Massive long-range drift sweep
      
      return wave1 + wave2 + wave3;
    };

    // ----------------------------------------------------
    // 3. ROAD & GRID CREATION (Endless warp movement)
    // ----------------------------------------------------
    const roadWidth = 14;
    const roadLength = 660;
    
    // Core highway asphalt lane surface with realistic procedural textured look
    const asphaltTex = createAsphaltTexture();
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x222227,
      map: asphaltTex,
      bumpMap: asphaltTex,
      bumpScale: 0.015,
      roughness: 0.5, // Standard realistically rough asphalt grit
      metalness: 0.1, // True asphalt is non-metallic
    });

    const barrierMat = new THREE.MeshStandardMaterial({
      color: 0x88929c, // galvanized silver/grey steel
      metalness: 0.85,
      roughness: 0.25
    });

    const sideLineMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });

    // Segmented road with borders and guardrails that bend and curve!
    const roadSegments: THREE.Group[] = [];
    const segmentBordersLeft: THREE.Mesh[] = [];
    const segmentBordersRight: THREE.Mesh[] = [];
    const segmentDoubleDividers: THREE.Mesh[] = [];
    const segmentPlasmaWires: THREE.Mesh[] = [];
    const segmentMatrixGrids: THREE.Mesh[] = [];

    const segLength = 10;
    const numSegs = 66; // Covers the whole visible track length with some overlap - updated to 3x longer!

    const segmentAsphaltGeo = new THREE.PlaneGeometry(roadWidth, segLength);
    const segmentBorderGeo = new THREE.BoxGeometry(0.12, 0.02, segLength);
    const segmentGuardBeamGeo = new THREE.BoxGeometry(0.08, 0.22, segLength);
    const segmentPostGeo = new THREE.BoxGeometry(0.14, 0.65, 0.14);
    const segmentReflectorGeo = new THREE.BoxGeometry(0.04, 0.12, 0.12);

    const segmentDoubleDividersGeo = new THREE.BoxGeometry(0.12, 0.03, segLength);
    const segmentDoubleDividersMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });

    const segmentWireGeo = new THREE.BoxGeometry(0.04, 0.03, segLength);
    const segmentWireMat = new THREE.MeshBasicMaterial({ color: 0xd946ef });

    const segmentGridPlaneGeo = new THREE.PlaneGeometry(roadWidth, segLength, 14, 2);
    const segmentGridPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });

    const reflectorMatLeft = new THREE.MeshBasicMaterial({ color: 0xff4500 }); // amber reflector
    const reflectorMatRight = new THREE.MeshBasicMaterial({ color: 0xffffff }); // white reflector

    const roadSegmentsGroup = new THREE.Group();
    scene.add(roadSegmentsGroup);

    for (let i = 0; i < numSegs; i++) {
      const segGroup = new THREE.Group();

      // 1. Asphalt pavement
      const plane = new THREE.Mesh(segmentAsphaltGeo, roadMat);
      plane.rotation.x = -Math.PI / 2;
      segGroup.add(plane);

      // 2. Left side border line
      const leftB = new THREE.Mesh(segmentBorderGeo, sideLineMat);
      leftB.position.set(-roadWidth / 2, 0.011, 0);
      segGroup.add(leftB);
      segmentBordersLeft.push(leftB);

      // 3. Right side border line
      const rightB = new THREE.Mesh(segmentBorderGeo, sideLineMat);
      rightB.position.set(roadWidth / 2, 0.011, 0);
      segGroup.add(rightB);
      segmentBordersRight.push(rightB);

      // 4. Double dividers (Stage 3 Centerline)
      const dGroup = new THREE.Group();
      dGroup.name = "dGroup";
      const d1 = new THREE.Mesh(segmentDoubleDividersGeo, segmentDoubleDividersMat);
      d1.position.set(-0.25, 0.015, 0);
      const d2 = new THREE.Mesh(segmentDoubleDividersGeo, segmentDoubleDividersMat);
      d2.position.set(0.25, 0.015, 0);
      dGroup.add(d1, d2);
      dGroup.visible = false;
      segGroup.add(dGroup);
      segmentDoubleDividers.push(d1, d2);

      // 5. Plasma wires (Stage 6 Speed Lanes)
      const wGroup = new THREE.Group();
      wGroup.name = "wGroup";
      [-4.6, -2.3, 0, 2.3, 4.6].forEach((xVal) => {
        const wire = new THREE.Mesh(segmentWireGeo, segmentWireMat);
        wire.position.set(xVal, 0.015, 0);
        wGroup.add(wire);
        segmentPlasmaWires.push(wire);
      });
      wGroup.visible = false;
      segGroup.add(wGroup);

      // 6. Matrix grid (Stage 8 cyberspace overlay)
      const rGrid = new THREE.Mesh(segmentGridPlaneGeo, segmentGridPlaneMat);
      rGrid.rotation.x = -Math.PI / 2;
      rGrid.position.set(0, 0.012, 0);
      rGrid.visible = false;
      segGroup.add(rGrid);
      segmentMatrixGrids.push(rGrid);

      // 7. Left barrier guard beam
      const leftBeam = new THREE.Mesh(segmentGuardBeamGeo, barrierMat);
      leftBeam.position.set(-roadWidth / 2 - 0.15, 0.35, 0);
      segGroup.add(leftBeam);

      // 8. Right barrier guard beam
      const rightBeam = new THREE.Mesh(segmentGuardBeamGeo, barrierMat);
      rightBeam.position.set(roadWidth / 2 + 0.15, 0.35, 0);
      segGroup.add(rightBeam);

      // 9. Support posts and reflectors (1 per segment on both sides)
      const pLeft = new THREE.Mesh(segmentPostGeo, barrierMat);
      pLeft.position.set(-roadWidth / 2 - 0.15, 0.2, 0);
      segGroup.add(pLeft);

      const rLeft = new THREE.Mesh(segmentReflectorGeo, reflectorMatLeft);
      rLeft.position.set(-roadWidth / 2 - 0.1, 0.42, 0);
      segGroup.add(rLeft);

      const pRight = new THREE.Mesh(segmentPostGeo, barrierMat);
      pRight.position.set(roadWidth / 2 + 0.15, 0.2, 0);
      segGroup.add(pRight);

      const rRight = new THREE.Mesh(segmentReflectorGeo, reflectorMatRight);
      rRight.position.set(roadWidth / 2 + 0.1, 0.42, 0);
      segGroup.add(rRight);

      // Distribute segments along the road length
      const initialZ = 20 - (i * segLength);
      segGroup.position.set(0, 0, initialZ);

      roadSegmentsGroup.add(segGroup);
      roadSegments.push(segGroup);
    }

    // Solid natural ground planes for realistic scenery
    const groundGeo = new THREE.PlaneGeometry(1000, 1600);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x15803d, // classic lush forest grass green
      roughness: 0.95,
      metalness: 0.05
    });

    const leftGround = new THREE.Mesh(groundGeo, groundMat);
    leftGround.rotation.x = -Math.PI / 2;
    leftGround.position.set(-510, -0.06, -300);
    scene.add(leftGround);

    const rightGround = new THREE.Mesh(groundGeo, groundMat);
    rightGround.rotation.x = -Math.PI / 2;
    rightGround.position.set(510, -0.06, -300);
    scene.add(rightGround);

    // Outer moving grids (Two pairs of grid helpers for smooth infinite scrolling)
    let gridHelperLeft1 = new THREE.GridHelper(400, 40, 0xff007f, 0x120722);
    gridHelperLeft1.position.set(-206, -0.01, -100);
    scene.add(gridHelperLeft1);

    let gridHelperRight1 = new THREE.GridHelper(400, 40, 0x00ffff, 0x120722);
    gridHelperRight1.position.set(206, -0.01, -100);
    scene.add(gridHelperRight1);

    let gridHelperLeft2 = new THREE.GridHelper(400, 40, 0xff007f, 0x120722);
    gridHelperLeft2.position.set(-206, -0.01, -500);
    scene.add(gridHelperLeft2);

    let gridHelperRight2 = new THREE.GridHelper(400, 40, 0x00ffff, 0x120722);
    gridHelperRight2.position.set(206, -0.01, -500);
    scene.add(gridHelperRight2);

    // Dynamic Road Lines (sliding backwards for movement speed illusion)
    const laneLines: THREE.Mesh[] = [];
    const numLines = 45;
    const lineLength = 5;
    const lineGap = 12;
    
    // Two boundary lines (left, right) and centered dotted line mesh
    const roadLinesGroup = new THREE.Group();
    scene.add(roadLinesGroup);

    // Moving dotted dividing lines
    const lineGeo = new THREE.BoxGeometry(0.15, 0.015, lineLength);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xff00ff });

    // 3 lanes, so 2 division lines: left-division (X = -2.3), right-division (X = 2.3)
    const dividingLines: THREE.Mesh[] = [];
    for (let l = 0; l < 2; l++) {
      const laneX = l === 0 ? -roadWidth / 6 : roadWidth / 6;
      for (let i = 0; i < numLines; i++) {
        const line = new THREE.Mesh(lineGeo, lineMat);
        line.position.set(laneX, 0.012, -i * (lineLength + lineGap) + 10);
        line.userData.baseX = laneX;
        roadLinesGroup.add(line);
        dividingLines.push(line);
      }
    }

    // Custom Decorative Road Layers for Each Level Theme
    const iceRails = new THREE.Group();
    iceRails.visible = false;
    roadLinesGroup.add(iceRails);
    
    const iceGeo = new THREE.BoxGeometry(0.4, 0.8, 6);
    const iceMat = new THREE.MeshBasicMaterial({ color: 0xa5f3fc, transparent: true, opacity: 0.65 });
    for (let i = 0; i < 45; i++) {
      const zPos = -i * 15 + 20;
      const leftRailPoint = new THREE.Mesh(iceGeo, iceMat);
      leftRailPoint.position.set(-6.8, 0.4, zPos);
      leftRailPoint.userData.baseX = -6.8;
      
      const rightRailPoint = new THREE.Mesh(iceGeo, iceMat);
      rightRailPoint.position.set(6.8, 0.4, zPos);
      rightRailPoint.userData.baseX = 6.8;
      
      iceRails.add(leftRailPoint, rightRailPoint);
    }

    const goldStuds = new THREE.Group();
    goldStuds.visible = false;
    roadLinesGroup.add(goldStuds);
    
    const studGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.04, 8);
    const studMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
    for (let i = 0; i < 85; i++) {
      const zPos = -i * 8 + 20;
      [-4.6, 4.6].forEach((xPos) => {
        const stud = new THREE.Mesh(studGeo, studMat);
        stud.position.set(xPos, 0.02, zPos);
        stud.userData.baseX = xPos;
        goldStuds.add(stud);
      });
    }

    const lavaVents = new THREE.Group();
    lavaVents.visible = false;
    roadLinesGroup.add(lavaVents);
    
    const ventGeo = new THREE.BoxGeometry(0.35, 0.02, 10);
    const ventMat = new THREE.MeshBasicMaterial({ color: 0xff4500, transparent: true, opacity: 0.85 });
    for (let i = 0; i < 40; i++) {
      const zPos = -i * 18 + 20;
      const vleft = new THREE.Mesh(ventGeo, ventMat);
      vleft.position.set(-2.3, 0.015, zPos);
      vleft.userData.baseX = -2.3;
      
      const vright = new THREE.Mesh(ventGeo, ventMat);
      vright.position.set(2.3, 0.015, zPos);
      vright.userData.baseX = 2.3;
      
      lavaVents.add(vleft, vright);
    }

    // ----------------------------------------------------
    // 4. ROAD-SIDE NEON LIGHTS & ACCENTS (Retro towers / trees)
    // ----------------------------------------------------
    const roadsideAccents: THREE.Group[] = [];
    const accentCount = 36;
    const accentSpacing = 30;

    const accentMatLeft = new THREE.MeshBasicMaterial({ color: 0xff00aa, wireframe: true });
    const accentMatRight = new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true });

    const topMatLeft = new THREE.MeshBasicMaterial({ color: 0xff00aa });
    const topMatRight = new THREE.MeshBasicMaterial({ color: 0x00ffcc });

    // Floating micro-energy rings to detail our side poles
    const colTorusGeo1 = new THREE.TorusGeometry(0.85, 0.04, 4, 16);
    colTorusGeo1.rotateX(Math.PI / 2);
    const colTorusGeo2 = new THREE.TorusGeometry(0.55, 0.03, 4, 12);
    colTorusGeo2.rotateX(Math.PI / 2);

    // ----------------------------------------------------
    // ORGANIC HIGH-FIDELITY NATURE SCENERY GENERATOR HELPERS
    // ----------------------------------------------------
    const barkMatShared = new THREE.MeshStandardMaterial({
      color: 0x3d2314,
      roughness: 0.94,
      metalness: 0.03
    });

    const createOrganicTrunk = () => {
      const trunkGrp = new THREE.Group();
      
      // Root flares at bottom of tree to look natural
      const rootBase = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.52, 0.5, 8), barkMatShared);
      rootBase.position.y = 0.25;
      trunkGrp.add(rootBase);

      // Main curved tapered trunk
      const mainTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.38, 3.2, 8), barkMatShared);
      mainTrunk.position.y = 1.6;
      mainTrunk.rotation.z = -0.06;
      trunkGrp.add(mainTrunk);

      // Outward supporting branches
      const branchL = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 1.5, 6), barkMatShared);
      branchL.position.set(-0.35, 2.5, 0.05);
      branchL.rotation.z = 0.45;
      trunkGrp.add(branchL);

      const branchR = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.15, 1.3, 6), barkMatShared);
      branchR.position.set(0.3, 2.6, -0.08);
      branchR.rotation.z = -0.42;
      branchR.rotation.y = 0.15;
      trunkGrp.add(branchR);

      return trunkGrp;
    };

    const createOrganicCanopy = (colors: number[]) => {
      const canopyGrp = new THREE.Group();
      
      // Multi-layered cloud-clump foliage spheres to simulate beautiful organic leaves
      const sphereDetails = [
        { x: 0.0, y: 3.2, z: 0.0, size: 1.25 },
        { x: -0.65, y: 2.9, z: 0.25, size: 0.96 },
        { x: 0.62, y: 2.8, z: -0.32, size: 0.92 },
        { x: 0.25, y: 3.4, z: 0.45, size: 0.78 },
        { x: -0.48, y: 2.6, z: -0.42, size: 0.85 },
        { x: 0.35, y: 2.4, z: 0.35, size: 0.70 },
        { x: -0.28, y: 3.5, z: -0.25, size: 0.82 }
      ];

      sphereDetails.forEach((info, idx) => {
        const leafMat = new THREE.MeshStandardMaterial({
          color: colors[idx % colors.length],
          roughness: 0.84,
          metalness: 0.02,
          flatShading: true
        });
        const leafSp = new THREE.Mesh(new THREE.DodecahedronGeometry(info.size, 1), leafMat);
        leafSp.position.set(info.x, info.y, info.z);
        canopyGrp.add(leafSp);
      });

      return canopyGrp;
    };

    const createWildShrubsAndFlora = (stageType: 'spring' | 'summer' | 'autumn' | 'winter') => {
      const floraGrp = new THREE.Group();
      
      // Little ground granite pebbles/rocks
      const pebbleMat = new THREE.MeshStandardMaterial({ color: 0x5a5a60, roughness: 0.95 });
      const pebbleGeo = new THREE.DodecahedronGeometry(0.15, 0);
      for (let p = 0; p < 3; p++) {
        const pebble = new THREE.Mesh(pebbleGeo, pebbleMat);
        pebble.position.set(
          (Math.random() - 0.5) * 1.6,
          0.06,
          (Math.random() - 0.5) * 1.6
        );
        pebble.rotation.set(Math.random(), Math.random(), Math.random());
        floraGrp.add(pebble);
      }

      // High-end secondary vegetation clumps (bush shrubs)
      let bushColors = [0x15803d, 0x166534];
      if (stageType === 'spring') {
        bushColors = [0xff8da1, 0xffa3b6];
      } else if (stageType === 'autumn') {
        bushColors = [0xd97706, 0xea580c];
      } else if (stageType === 'winter') {
        bushColors = [0xfafafa, 0x115e59];
      }

      const bushMat = new THREE.MeshStandardMaterial({
        color: bushColors[0],
        roughness: 0.88,
        flatShading: true
      });
      const bush1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.42, 1), bushMat);
      bush1.position.set(-0.7, 0.24, -0.2);
      
      const bushMat2 = new THREE.MeshStandardMaterial({
        color: bushColors[1],
        roughness: 0.88,
        flatShading: true
      });
      const bush2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 1), bushMat2);
      bush2.position.set(0.68, 0.18, 0.3);
      floraGrp.add(bush1, bush2);

      // Organic wild red-capped forest mushrooms (For Summer Woods)
      if (stageType === 'summer') {
        const capMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 }); // iconic red cap with white stalk
        const stalkMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.9 });
        
        for (let m = 0; m < 2; m++) {
          const mushroom = new THREE.Group();
          const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.24, 6), stalkMat);
          stalk.position.y = 0.12;
          
          const cap = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), capMat);
          cap.position.y = 0.22;
          cap.scale.y = 0.72;

          mushroom.add(stalk, cap);
          mushroom.position.set(-0.35 + m * 0.7, 0.01, 0.5 - m * 0.3);
          floraGrp.add(mushroom);
        }
      }

      // Wooden decorative logs / chopped woods on forest floor (For Autumn Valley)
      if (stageType === 'autumn') {
        const logMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.95 });
        const log = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.75, 6), logMat);
        log.rotation.z = Math.PI / 2;
        log.rotation.x = 0.4;
        log.position.set(-0.2, 0.09, 0.6);
        floraGrp.add(log);
      }

      // Beautiful fluffy snowy bank mounds (For Winter Pines)
      if (stageType === 'winter') {
        const snowMoundMat = new THREE.MeshBasicMaterial({ color: 0xfafafa });
        const snow1 = new THREE.Mesh(new THREE.SphereGeometry(0.28, 6, 6), snowMoundMat);
        snow1.scale.set(1.5, 0.36, 1.2);
        snow1.position.set(0.3, 0.02, -0.4);
        floraGrp.add(snow1);
      }

      return floraGrp;
    };

    for (let i = 0; i < accentCount; i++) {
      const isLeft = i % 2 === 0;
      const sideX = isLeft ? -9 : 9;
      const sideZ = -i * accentSpacing;

      const group = new THREE.Group();
      
      // Cyber column
      const colGeo = new THREE.CylinderGeometry(0.08, 0.24, 8, 4);
      const col = new THREE.Mesh(colGeo, isLeft ? accentMatLeft : accentMatRight);
      col.position.y = 4;
      col.name = "cyber_col";
      group.add(col);

      // Sci-fi floating cyber electric rings around towers
      const ring1 = new THREE.Mesh(colTorusGeo1, isLeft ? accentMatLeft : accentMatRight);
      ring1.position.y = 5.2;
      ring1.name = "cyber_ring1";
      group.add(ring1);

      const ring2 = new THREE.Mesh(colTorusGeo2, isLeft ? accentMatLeft : accentMatRight);
      ring2.position.y = 6.8;
      ring2.name = "cyber_ring2";
      group.add(ring2);

      // Neon emitter sphere on top
      const topGeo = new THREE.SphereGeometry(0.35, 6, 6);
      const top = new THREE.Mesh(topGeo, isLeft ? topMatLeft : topMatRight);
      top.position.y = 8;
      top.name = "cyber_top";
      group.add(top);

      // --- NATURE ACCENTS (SEASONS CHANGER CHASSIS) ---
      // Base boulders
      const bouldersGrp = new THREE.Group();
      bouldersGrp.name = "boulders";
      const rockMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.95 });
      const rockGeo1 = new THREE.DodecahedronGeometry(0.5, 0);
      const rockGeo2 = new THREE.DodecahedronGeometry(0.35, 0);
      
      const rock1 = new THREE.Mesh(rockGeo1, rockMat);
      rock1.position.set(-0.4, 0.2, 0);
      bouldersGrp.add(rock1);
      
      const rock2 = new THREE.Mesh(rockGeo2, rockMat);
      rock2.position.set(0.4, 0.15, -0.2);
      bouldersGrp.add(rock2);
      
      group.add(bouldersGrp);

      // Build spring blossom (Sakura - gnarled trunk with leafy clouds and shrubs)
      const springGrp = new THREE.Group();
      springGrp.name = "tree_spring";
      springGrp.add(createOrganicTrunk());
      springGrp.add(createOrganicCanopy([0xff9bb0, 0xffb7c5, 0xffcbd5, 0xff708e]));
      springGrp.add(createWildShrubsAndFlora('spring'));
      group.add(springGrp);

      // Build summer lush green (Evergreen forest canopies)
      const summerGrp = new THREE.Group();
      summerGrp.name = "tree_summer";
      summerGrp.add(createOrganicTrunk());
      summerGrp.add(createOrganicCanopy([0x14532d, 0x15803d, 0x166534, 0x22c55e, 0x4ade80]));
      summerGrp.add(createWildShrubsAndFlora('summer'));
      group.add(summerGrp);

      // Build autumn gold/orange (Harvest woods)
      const autumnGrp = new THREE.Group();
      autumnGrp.name = "tree_autumn";
      autumnGrp.add(createOrganicTrunk());
      autumnGrp.add(createOrganicCanopy([0xea580c, 0xd97706, 0xf59e0b, 0xc2410c, 0xb45309]));
      autumnGrp.add(createWildShrubsAndFlora('autumn'));
      group.add(autumnGrp);

      // Build winter snowy white pine
      const winterGrp = new THREE.Group();
      winterGrp.name = "tree_winter";
      
      // Conifer winter pine trunk and nested drooping snow branches
      const coniferTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.3, 3.2, 8), barkMatShared);
      coniferTrunk.position.y = 1.6;
      winterGrp.add(coniferTrunk);

      const winterCones = [
        { y: 1.8, r: 1.8, h: 1.8, color: 0x064e40, snow: true },
        { y: 2.8, r: 1.4, h: 1.5, color: 0x115e59, snow: true },
        { y: 3.7, r: 1.0, h: 1.2, color: 0x134e4a, snow: true },
        { y: 4.4, r: 0.65, h: 0.8, color: 0x0f766e, snow: true }
      ];

      winterCones.forEach((cone) => {
        const pinePl = new THREE.Mesh(new THREE.ConeGeometry(cone.r, cone.h, 12), new THREE.MeshStandardMaterial({ color: cone.color, roughness: 0.92, flatShading: true }));
        pinePl.position.y = cone.y;
        winterGrp.add(pinePl);

        if (cone.snow) {
          const snowPl = new THREE.Mesh(new THREE.ConeGeometry(cone.r * 1.04, cone.h * 0.38, 12), new THREE.MeshBasicMaterial({ color: 0xfafafa }));
          snowPl.position.set(0, cone.y + cone.h * 0.32, 0);
          winterGrp.add(snowPl);
        }
      });
      winterGrp.add(createWildShrubsAndFlora('winter'));
      group.add(winterGrp);

      group.position.set(sideX, 0, sideZ);
      group.userData.baseX = sideX;
      scene.add(group);
      roadsideAccents.push(group);
    }

    // ----------------------------------------------------
    // Scenery Nature Clouds (Procedural floating cotton clusters)
    // ----------------------------------------------------
    const cloudsGroup = new THREE.Group();
    scene.add(cloudsGroup);
    const cloudMeshes: THREE.Group[] = [];
    const cloudMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.28
    });
    const cloudSphereGeo = new THREE.SphereGeometry(4, 8, 8);
    for (let c = 0; c < 12; c++) {
      const singleCloud = new THREE.Group();
      const numSpheres = 3 + Math.floor(Math.random() * 3);
      for (let s = 0; s < numSpheres; s++) {
        const sphere = new THREE.Mesh(cloudSphereGeo, cloudMat);
        const scaleRadius = 2 + Math.random() * 3.5;
        sphere.scale.setScalar(scaleRadius / 4);
        sphere.position.set(
          (s * 2.6) - (numSpheres * 1.3),
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 3
        );
        singleCloud.add(sphere);
      }
      const startX = (Math.random() - 0.5) * 180;
      const startY = 16 + Math.random() * 15;
      const startZ = -100 - Math.random() * 350;
      singleCloud.position.set(startX, startY, startZ);
      cloudsGroup.add(singleCloud);
      cloudMeshes.push(singleCloud);
    }

    // ----------------------------------------------------
    // Scenery Flying Birds (Dynamic wing flapping lowpoly birds)
    // ----------------------------------------------------
    const birdsGroup = new THREE.Group();
    scene.add(birdsGroup);

    const birdWingsLeft: THREE.Mesh[] = [];
    const birdWingsRight: THREE.Mesh[] = [];
    const birdMeshes: THREE.Group[] = [];

    const numBirds = 8;
    const wingMat = new THREE.MeshBasicMaterial({ color: 0x05040a });
    
    const wingLGeo = new THREE.BoxGeometry(0.7, 0.02, 0.25);
    wingLGeo.translate(0.35, 0, 0); // shift pivot
    const wingRGeo = new THREE.BoxGeometry(0.7, 0.02, 0.25);
    wingRGeo.translate(-0.35, 0, 0);

    const bodyGeo = new THREE.BoxGeometry(0.18, 0.14, 0.65);
    const bodyMat = new THREE.MeshBasicMaterial({ color: 0x111116 });

    for (let b = 0; b < numBirds; b++) {
      const singleBirdGroup = new THREE.Group();
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      
      const leftWing = new THREE.Mesh(wingLGeo, wingMat);
      leftWing.position.set(-0.09, 0, 0);
      
      const rightWing = new THREE.Mesh(wingRGeo, wingMat);
      rightWing.position.set(0.09, 0, 0);
      
      singleBirdGroup.add(body, leftWing, rightWing);
      
      // Position birds wide and high in the horizon skyway
      const startX = (Math.random() - 0.5) * 55;
      const startY = 12 + Math.random() * 8;
      const startZ = -100 - Math.random() * 180;
      singleBirdGroup.position.set(startX, startY, startZ);
      
      birdWingsLeft.push(leftWing);
      birdWingsRight.push(rightWing);
      birdMeshes.push(singleBirdGroup);
      
      birdsGroup.add(singleBirdGroup);
    }

    // ----------------------------------------------------
    // Starfield Background (Parallax deep cyberspace stars)
    // ----------------------------------------------------
    const starGeo = new THREE.BufferGeometry();
    const starCount = 500;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const presetStarColors = [
      [1.0, 0.25, 0.7],  // Cyber Pink/Magenta
      [0.0, 0.95, 1.0],  // Neon Cyan
      [1.0, 0.85, 0.1],  // Cyber gold/yellow
      [1.0, 1.0, 1.0]    // Pure white stars
    ];

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 1] = Math.random() * 85 + 3;
      starPositions[i * 3 + 2] = -Math.random() * 210 - 10;

      const col = presetStarColors[Math.floor(Math.random() * presetStarColors.length)];
      starColors[i * 3] = col[0];
      starColors[i * 3 + 1] = col[1];
      starColors[i * 3 + 2] = col[2];
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true
    });

    const starParticles = new THREE.Points(starGeo, starMat);
    scene.add(starParticles);

    // ----------------------------------------------------
    // Distant Cyber Background (Mountains & Skyscrapers Landscape)
    // ----------------------------------------------------
    const distantBackgroundGroup = new THREE.Group();
    distantBackgroundGroup.position.set(0, -6, -210);
    scene.add(distantBackgroundGroup);

    // ----------------------------------------------------
    // Magnificent Ultra-HD Procedural Gradient Sky Dome Backplate
    // ----------------------------------------------------
    const skyCanvas = document.createElement('canvas');
    skyCanvas.width = 512;
    skyCanvas.height = 512;
    const skyCtx = skyCanvas.getContext('2d')!;
    const skyTexture = new THREE.CanvasTexture(skyCanvas);
    skyTexture.colorSpace = THREE.SRGBColorSpace;

    const skyGeo = new THREE.PlaneGeometry(750, 380);
    const skyBackplateMat = new THREE.MeshBasicMaterial({
      map: skyTexture,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const skyBackplate = new THREE.Mesh(skyGeo, skyBackplateMat);
    skyBackplate.position.set(0, 110, -35); // positioned right at the rear
    distantBackgroundGroup.add(skyBackplate);

    const drawSkyGradient = (index: number) => {
      skyCtx.clearRect(0, 0, 512, 512);
      const grad = skyCtx.createLinearGradient(0, 0, 0, 512);
      
      if (index === 0) {
        // Spring Sakura
        grad.addColorStop(0, '#100a30');
        grad.addColorStop(0.35, '#5b6cf2');
        grad.addColorStop(0.65, '#f472b6');
        grad.addColorStop(1.0, '#ffe4e6');
      } else if (index === 1) {
        // Summer Sunset
        grad.addColorStop(0, '#06001a');
        grad.addColorStop(0.35, '#2e1065');
        grad.addColorStop(0.65, '#db2777');
        grad.addColorStop(0.85, '#ea580c');
        grad.addColorStop(1.0, '#facc15');
      } else if (index === 2) {
        // Midnight Cyber
        grad.addColorStop(0, '#010006');
        grad.addColorStop(0.35, '#0a021c');
        grad.addColorStop(0.7, '#1e1b4b');
        grad.addColorStop(0.9, '#4a044e');
        grad.addColorStop(1.0, '#00f3ff');
      } else if (index === 3) {
        // Lush Summer Woods
        grad.addColorStop(0, '#010402');
        grad.addColorStop(0.4, '#022c22');
        grad.addColorStop(0.8, '#065f46');
        grad.addColorStop(1.0, '#10b981');
      } else if (index === 4) {
        // Winter Glacier Pass
        grad.addColorStop(0, '#02040b');
        grad.addColorStop(0.4, '#0f172a');
        grad.addColorStop(0.75, '#0d9488');
        grad.addColorStop(0.95, '#06b6d4');
        grad.addColorStop(1.0, '#c0f5ff');
      } else if (index === 5) {
        // Golden Autumn Valley
        grad.addColorStop(0, '#0e0400');
        grad.addColorStop(0.4, '#311005');
        grad.addColorStop(0.75, '#9a3412');
        grad.addColorStop(0.92, '#ea580c');
        grad.addColorStop(1.0, '#fef08a');
      } else if (index === 6) {
        // Plasma Hyperdrive
        grad.addColorStop(0, '#03000a');
        grad.addColorStop(0.35, '#1e1b4b');
        grad.addColorStop(0.68, '#581c87');
        grad.addColorStop(0.9, '#a21caf');
        grad.addColorStop(1.0, '#ff00ff');
      } else {
        // Digital Cosmos
        grad.addColorStop(0, '#000000');
        grad.addColorStop(0.4, '#090514');
        grad.addColorStop(0.75, '#1e1b4b');
        grad.addColorStop(0.94, '#0891b2');
        grad.addColorStop(1.0, '#00f3ff');
      }
      
      skyCtx.fillStyle = grad;
      skyCtx.fillRect(0, 0, 512, 512);

      // Add gentle glowing stardust circles for sci-fi/space themes
      if (index === 2 || index === 6 || index === 7) {
        for (let d = 0; d < 12; d++) {
          const cx = Math.random() * 512;
          const cy = Math.random() * 320;
          const r = 25 + Math.random() * 65;
          const radialGrad = skyCtx.createRadialGradient(cx, cy, 0, cx, cy, r);
          const colorChoice = index === 2 
            ? 'rgba(0, 243, 255, 0.15)' 
            : (index === 6 ? 'rgba(217, 70, 239, 0.14)' : 'rgba(14, 116, 144, 0.16)');
          radialGrad.addColorStop(0, colorChoice);
          radialGrad.addColorStop(1, 'rgba(0,0,0,0)');
          skyCtx.fillStyle = radialGrad;
          skyCtx.beginPath();
          skyCtx.arc(cx, cy, r, 0, Math.PI * 2);
          skyCtx.fill();
        }
      }
      
      skyTexture.needsUpdate = true;
    };

    // Create rugged hyper-realistic scenic mountains with procedural organic cliffs and ridges
    const mountainGeom = new THREE.ConeGeometry(38, 28, 20, 4);
    
    // Perturb the vertices of the mountain cone to give it complex ridges, slopes, and a completely organic shape
    const mountainPosAttr = mountainGeom.attributes.position;
    for (let j = 0; j < mountainPosAttr.count; j++) {
      const vx = mountainPosAttr.getX(j);
      const vy = mountainPosAttr.getY(j);
      const vz = mountainPosAttr.getZ(j);
      
      // Do not deform the absolute base edge to prevent gaps with the horizon ground plane
      if (vy > -11) {
        // High fidelity alpine ridges using sine/cosine harmonics
        const ripple = Math.sin(vx * 0.14) * Math.cos(vz * 0.14) * 3.6;
        const jagged = Math.sin(vy * 0.4) * 2.0;
        mountainPosAttr.setX(j, vx + ripple + jagged);
        mountainPosAttr.setY(j, vy + ripple * 0.4);
        mountainPosAttr.setZ(j, vz + ripple - jagged);
      }
    }
    mountainGeom.computeVertexNormals();
    
    // Highly textured dark rocky mountain base material in tune with nature scenery
    const mountainMat = new THREE.MeshStandardMaterial({
      color: 0x0a0c14,
      roughness: 0.95,
      metalness: 0.05,
      flatShading: true
    });
    const mountainWireLMat = new THREE.MeshBasicMaterial({
      color: 0xff00aa,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const mountainWireRMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });

    // Spawn 6 majestic mountains across the horizon
    const mountainPositions = [
      { x: -80, y: 5, z: -10, scale: 1.0, isLeft: true },
      { x: -50, y: 2, z: -5, scale: 0.75, isLeft: true },
      { x: 50, y: 2, z: -5, scale: 0.72, isLeft: false },
      { x: 80, y: 5, z: -10, scale: 1.0, isLeft: false },
      { x: -115, y: 8, z: -20, scale: 1.4, isLeft: true },
      { x: 115, y: 8, z: -20, scale: 1.4, isLeft: false }
    ];

    mountainPositions.forEach((mount) => {
      const mountGroup = new THREE.Group();
      
      const meshBase = new THREE.Mesh(mountainGeom, mountainMat);
      const meshWire = new THREE.Mesh(mountainGeom, mount.isLeft ? mountainWireLMat : mountainWireRMat);
      
      meshBase.castShadow = false;
      meshBase.receiveShadow = false;

      mountGroup.add(meshBase, meshWire);
      mountGroup.scale.set(mount.scale, mount.scale, mount.scale * 0.5);
      mountGroup.position.set(mount.x, mount.y, mount.z);
      distantBackgroundGroup.add(mountGroup);
    });

    // Create Futuristic digital skyscrapers
    const buildingPositions = [
      { x: -32, y: 8, z: 2, w: 6, h: 22, d: 6, color: 0xff00aa },
      { x: -24, y: 6, z: 4, w: 4, h: 16, d: 4, color: 0x00ffff },
      { x: -16, y: 4, z: 6, w: 5, h: 12, d: 5, color: 0xffea00 },
      { x: 16, y: 4, z: 6, w: 5, h: 12, d: 5, color: 0xffea00 },
      { x: 24, y: 6, z: 4, w: 4, h: 16, d: 4, color: 0x00ffff },
      { x: 32, y: 8, z: 2, w: 6, h: 22, d: 6, color: 0xff00aa },
      // Extreme left/right sky towers
      { x: -64, y: 10, z: -2, w: 8, h: 30, d: 8, color: 0xff0055 },
      { x: 64, y: 10, z: -2, w: 8, h: 30, d: 8, color: 0x00ffcc }
    ];

    const skyWireMats: {[key: number]: THREE.MeshBasicMaterial} = {};
    const getSkyWireMat = (colorHex: number) => {
      if (!skyWireMats[colorHex]) {
        skyWireMats[colorHex] = new THREE.MeshBasicMaterial({
          color: colorHex,
          wireframe: true,
          transparent: true,
          opacity: 0.25
        });
      }
      return skyWireMats[colorHex];
    };

    const buildingMat = new THREE.MeshStandardMaterial({
      color: 0x030307,
      roughness: 0.9,
      metalness: 0.1
    });

    buildingPositions.forEach((bld) => {
      const bldGroup = new THREE.Group();
      const bldGeo = new THREE.BoxGeometry(bld.w, bld.h, bld.d);
      
      const baseMesh = new THREE.Mesh(bldGeo, buildingMat);
      const wireMesh = new THREE.Mesh(bldGeo, getSkyWireMat(bld.color));
      
      bldGroup.add(baseMesh, wireMesh);
      // Windows / vertical glowing stripes
      const stripeGeo = new THREE.BoxGeometry(0.12, bld.h * 0.85, bld.d * 1.02);
      const stripeMat = new THREE.MeshBasicMaterial({ color: bld.color });
      const stripeL = new THREE.Mesh(stripeGeo, stripeMat);
      stripeL.position.set(-bld.w / 2, 0, 0);
      const stripeR = new THREE.Mesh(stripeGeo, stripeMat);
      stripeR.position.set(bld.w / 2, 0, 0);
      bldGroup.add(stripeL, stripeR);

      bldGroup.position.set(bld.x, bld.y, bld.z);
      distantBackgroundGroup.add(bldGroup);
    });

    // ----------------------------------------------------
    // Retro Segmented Banded Synthwave Sun (With High-Definition Glowing Halo & Cosmic Moon Core)
    // ----------------------------------------------------
    const sunGroup = new THREE.Group();
    sunGroup.position.set(0, -2.5, -205);
    scene.add(sunGroup);

    // Dynamic high-end circular halo mesh for celestial glow/corona
    const sunHaloGeo = new THREE.RingGeometry(0.1, 28, 32);
    const sunHaloMat = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const sunHalo = new THREE.Mesh(sunHaloGeo, sunHaloMat);
    sunHalo.position.set(0, 8, -0.4); // Centered vertically corresponding to bands spanning Y: [0, 16]
    sunGroup.add(sunHalo);

    // Inner core star/moon sphere for rich cosmic density
    const sunCoreGeo = new THREE.CircleGeometry(23.6, 32);
    const sunCoreMat = new THREE.MeshBasicMaterial({
      color: 0xff0088,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const sunCore = new THREE.Mesh(sunCoreGeo, sunCoreMat);
    sunCore.position.set(0, 8, -0.2);
    sunGroup.add(sunCore);

    const numSunBands = 10;
    const sunBands: THREE.Mesh[] = [];

    for (let i = 0; i < numSunBands; i++) {
      const bandY = (i / numSunBands) * 16; 
      const radius = 24;
      const dy = bandY - 8;
      const widthFactor = Math.sqrt(Math.max(0.1, radius * radius - dy * dy * 1.6));
      const bandWidth = widthFactor * 1.8;
      const bandHeight = 1.1 - (i * 0.05);

      const bandGeo = new THREE.BoxGeometry(bandWidth, bandHeight, 0.2);
      const bandMat = new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        transparent: true,
        opacity: 0.95 - (i * 0.03)
      });

      const band = new THREE.Mesh(bandGeo, bandMat);
      band.position.set(0, bandY, 0);
      sunGroup.add(band);
      sunBands.push(band);
    }

    // ----------------------------------------------------
    // Atmospheric Volumetric "God Rays" sun shafts for highly realistic scenery
    // ----------------------------------------------------
    const volumetricRaysGroup = new THREE.Group();
    scene.add(volumetricRaysGroup);

    const rayConeGeo = new THREE.ConeGeometry(8, 110, 16);
    rayConeGeo.rotateX(Math.PI / 4.5); // slant downwards nicely for a dramatic cinematic look

    const rayMat1 = new THREE.MeshBasicMaterial({
      color: 0xfffad9,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    const rayMat2 = new THREE.MeshBasicMaterial({
      color: 0xfff0c2,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    const sunRay1 = new THREE.Mesh(rayConeGeo, rayMat1);
    sunRay1.position.set(-35, 50, -160);
    sunRay1.scale.set(1.4, 1, 1);
    
    const sunRay2 = new THREE.Mesh(rayConeGeo, rayMat2);
    sunRay2.position.set(38, 45, -200);
    sunRay2.scale.set(1.1, 0.85, 1.1);

    volumetricRaysGroup.add(sunRay1, sunRay2);

    // ----------------------------------------------------
    // Professional High-Realistic Weather Precipitation & Ambient FX Engine
    // ----------------------------------------------------
    const weatherCount = 200;
    const weatherGroup = new THREE.Group();
    scene.add(weatherGroup);

    const weatherGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    const weatherParticles: Array<{
      mesh: THREE.Mesh;
      material: THREE.MeshBasicMaterial;
      baseX: number;
      baseY: number;
      baseZ: number;
      vx: number;
      vy: number;
      vz: number;
      rotX: number;
      rotY: number;
      rotZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      swayFreq: number;
      swayAmp: number;
      speedFactor: number;
    }> = [];

    for (let j = 0; j < weatherCount; j++) {
      const wMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      const wMesh = new THREE.Mesh(weatherGeo, wMat);
      
      const px = (Math.random() - 0.5) * 45;
      const py = Math.random() * 26 + 0.2;
      const pz = -Math.random() * 180 + 15;
      wMesh.position.set(px, py, pz);
      
      weatherGroup.add(wMesh);
      
      weatherParticles.push({
        mesh: wMesh,
        material: wMat,
        baseX: px,
        baseY: py,
        baseZ: pz,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -1.0 - Math.random() * 4.0,
        vz: (Math.random() - 0.5) * 1.5,
        rotX: Math.random() * 3,
        rotY: Math.random() * 3,
        rotZ: Math.random() * 3,
        rotSpeedX: (Math.random() - 0.5) * 2.5,
        rotSpeedY: (Math.random() - 0.5) * 2.5,
        rotSpeedZ: (Math.random() - 0.5) * 2.5,
        swayFreq: 0.5 + Math.random() * 2.0,
        swayAmp: 0.1 + Math.random() * 0.4,
        speedFactor: 0.8 + Math.random() * 0.6
      });
    }

    const updateWeatherTheme = (themeIndex: number) => {
      weatherParticles.forEach((wp) => {
        const mesh = wp.mesh;
        const mat = wp.material;
        
        mesh.scale.set(1, 1, 1);
        
        if (themeIndex === 0) {
          // Spring Sakura petals
          mat.color.setHex(0xffb7c5);
          mat.opacity = 0.55 + Math.random() * 0.3;
          wp.vy = -1.2 * wp.speedFactor;
          wp.vx = -1.8 * wp.speedFactor;
          wp.vz = (Math.random() - 0.5) * 1.0;
          mesh.scale.set(1.4, 0.4, 1.0);
        } else if (themeIndex === 1) {
          // Summer Sunset warm fireflies / embers
          mat.color.setHex(0xfacc15);
          mat.opacity = 0.42 + Math.random() * 0.35;
          wp.vy = 0.45 * wp.speedFactor;
          wp.vx = (Math.random() - 0.5) * 0.6;
          wp.vz = (Math.random() - 0.5) * 0.6;
          mesh.scale.set(0.6, 0.6, 0.6);
        } else if (themeIndex === 2) {
          // Midnight Cyber Neon rain drizzle
          mat.color.setHex(0x00f3ff);
          mat.opacity = 0.48 + Math.random() * 0.3;
          wp.vy = -14.0 * wp.speedFactor;
          wp.vx = -0.6 * wp.speedFactor;
          wp.vz = -1.0;
          mesh.scale.set(0.2, 4.5, 0.2);
        } else if (themeIndex === 3) {
          // Lush Summer Woods forest pollen
          mat.color.setHex(0x4ade80);
          mat.opacity = 0.38 + Math.random() * 0.35;
          wp.vy = (Math.random() - 0.5) * 0.8;
          wp.vx = (Math.random() - 0.5) * 1.2;
          wp.vz = (Math.random() - 0.5) * 1.2;
          mesh.scale.set(0.7, 0.7, 0.7);
        } else if (themeIndex === 4) {
          // Winter Glacier Pass soft snowy blizzard
          mat.color.setHex(0xfafafa);
          mat.opacity = 0.65 + Math.random() * 0.35;
          wp.vy = -3.2 * wp.speedFactor;
          wp.vx = -1.5 * wp.speedFactor;
          wp.vz = -0.5;
          mesh.scale.set(0.95, 0.95, 0.95);
        } else if (themeIndex === 5) {
          // Golden Autumn Valley amber maple leaves
          mat.color.setHex(0xea580c);
          if (Math.random() > 0.5) mat.color.setHex(0xd97706);
          mat.opacity = 0.58 + Math.random() * 0.3;
          wp.vy = -1.8 * wp.speedFactor;
          wp.vx = -1.4 * wp.speedFactor;
          wp.vz = (Math.random() - 0.5) * 0.5;
          mesh.scale.set(1.5, 0.6, 1.1);
        } else if (themeIndex === 6) {
          // Plasma Hyperdrive electric plasma hyper sparks
          mat.color.setHex(0xd946ef);
          mat.opacity = 0.55 + Math.random() * 0.35;
          wp.vy = (Math.random() - 0.5) * 2.0;
          wp.vx = (Math.random() - 0.5) * 2.0;
          wp.vz = -15.0 * wp.speedFactor;
          mesh.scale.set(0.4, 0.4, 3.5);
        } else {
          // Digital Cosmos spark particles
          mat.color.setHex(0x38bdf8);
          mat.opacity = 0.45 + Math.random() * 0.35;
          wp.vy = (Math.random() - 0.5) * 0.5;
          wp.vx = (Math.random() - 0.5) * 0.5;
          wp.vz = (Math.random() - 0.5) * 0.5;
          mesh.scale.set(0.5, 0.5, 0.5);
        }
        
        mat.needsUpdate = true;
      });
    };

    // Interactive custom vehicle lights declared beforehand to close over applyTheme context
    let carUnderglowLight: THREE.PointLight | null = null;
    let carHeadlightSpot: THREE.SpotLight | null = null;

    // Dynamic Theme Swapping Function!
    const applyTheme = (themeIndex: number) => {
      const theme = ROAD_THEMES[themeIndex];
      if (!theme) return;

      // Draw the beautiful procedurally-rendered high-definition background sky gradient
      drawSkyGradient(themeIndex);

      // Update atmospheric volumetric rays
      if (theme.isDay) {
        sunRay1.visible = true;
        sunRay2.visible = true;
        rayMat1.color.setHex(0xfffad9);
        rayMat2.color.setHex(0xffe2a0);
        rayMat1.opacity = 0.12;
        rayMat2.opacity = 0.07;
      } else if (theme.isSunset) {
        sunRay1.visible = true;
        sunRay2.visible = true;
        rayMat1.color.setHex(0xf97316); 
        rayMat2.color.setHex(0xdb2777); 
        rayMat1.opacity = 0.15;
        rayMat2.opacity = 0.09;
      } else if (themeIndex === 4) {
        // Winter Glacier: Aurora poles
        sunRay1.visible = true;
        sunRay2.visible = true;
        rayMat1.color.setHex(0xa5f3fc);
        rayMat2.color.setHex(0x1e3b8a);
        rayMat1.opacity = 0.10;
        rayMat2.opacity = 0.06;
      } else if (themeIndex === 5) {
        // Autumn: Harvest gold rays
        sunRay1.visible = true;
        sunRay2.visible = true;
        rayMat1.color.setHex(0xf59e0b);
        rayMat2.color.setHex(0xd97706);
        rayMat1.opacity = 0.14;
        rayMat2.opacity = 0.07;
      } else {
        // Cyber: Cyan/Magenta scanned rays
        sunRay1.visible = true;
        sunRay2.visible = true;
        rayMat1.color.setHex(theme.gridLeft);
        rayMat2.color.setHex(theme.gridRight);
        rayMat1.opacity = 0.09;
        rayMat2.opacity = 0.04;
      }

      // Update fog & clear color
      scene.fog = new THREE.FogExp2(theme.fogColor, 0.015);
      renderer.setClearColor(theme.fogColor);

      // Adjust dynamic environmental lighting based on theme!
      if (theme.isDay) {
        // High intensity bright overhead sunlight conditions
        ambientLight.color.setHex(0xe0f2fe);
        ambientLight.intensity = 1.6;

        directionalLight.color.setHex(0xfffad9);
        directionalLight.intensity = 3.5;
        directionalLight.position.set(20, 50, -40);

        blueLight.color.setHex(0xbfefff);
        blueLight.intensity = 1.0;

        // Hide star system
        starParticles.visible = false;

        // Realistic matte dry grey road asphalt
        roadMat.roughness = 0.55;
        roadMat.metalness = 0.05;

        // Dim headlights for daylight
        if (carUnderglowLight) carUnderglowLight.intensity = 0.3;
        if (carHeadlightSpot) carHeadlightSpot.intensity = 0.5;

        // Position midday sun nicely in the background
        sunGroup.position.set(0, 10, -205);
      } else if (theme.isSunset) {
        // Golden hour crimson twilight conditions
        ambientLight.color.setHex(0x3c223c);
        ambientLight.intensity = 1.1;

        directionalLight.color.setHex(0xf97316); // Amber setting sun
        directionalLight.intensity = 2.8;
        directionalLight.position.set(0, 8, -120); // low sun directly down the highway!

        blueLight.color.setHex(0xec4899);
        blueLight.intensity = 1.2;

        starParticles.visible = false;

        // Semi-rough glowing asphalt and bright headlights
        roadMat.roughness = 0.4;
        roadMat.metalness = 0.15;

        if (carUnderglowLight) carUnderglowLight.intensity = 1.5;
        if (carHeadlightSpot) carHeadlightSpot.intensity = 3.0;

        sunGroup.position.set(0, -1, -205);
      } else {
        // High fidelity Midnight/Cyber night poygalari
        ambientLight.color.setHex(0x1e1e44);
        ambientLight.intensity = 0.95;

        directionalLight.color.setHex(theme.gridLeft);
        directionalLight.intensity = 1.2;
        directionalLight.position.set(0, 20, 10);

        blueLight.color.setHex(theme.gridRight);
        blueLight.intensity = 1.0;

        // Starfield shines bright in the cosmos!
        starParticles.visible = true;

        // Slick wet asphalt mirroring specular headlights reflection
        roadMat.roughness = 0.15;
        roadMat.metalness = 0.92;

        if (carUnderglowLight) carUnderglowLight.intensity = 3.2;
        if (carHeadlightSpot) carHeadlightSpot.intensity = 5.2;

        sunGroup.position.set(0, -3.5, -205);
      }

      roadMat.color.setHex(theme.roadColor);
      roadMat.needsUpdate = true;

      // Update natural surrounding ground colors
      if (groundMat) {
        groundMat.color.setHex(theme.gridLeft);
        groundMat.needsUpdate = true;
      }

      // Color-match guardrails: galvanized silver on real roads, neon on cyber roads!
      if (barrierMat) {
        barrierMat.color.setHex(theme.isDay ? 0x88929c : theme.sideBorder);
        barrierMat.needsUpdate = true;
      }

      // Update materials properties of road markings
      sideLineMat.color.setHex(theme.sideBorder);
      lineMat.color.setHex(theme.dividers);

      // Accent towers mats
      accentMatLeft.color.setHex(theme.towersLeft);
      accentMatRight.color.setHex(theme.towersRight);

      // Accent spheres mats
      topMatLeft.color.setHex(theme.towersLeft);
      topMatRight.color.setHex(theme.towersRight);

      // Rebuild cosmic celestial colors (Halo and main Core) nicely based on theme colors and indices
      if (theme.isDay) {
        sunHaloMat.color.setHex(0xfffad9);
        sunHaloMat.opacity = 0.35;
        sunCoreMat.color.setHex(0xffea00);
        sunCoreMat.opacity = 0.15;
      } else if (theme.isSunset) {
        sunHaloMat.color.setHex(0xef4444);
        sunHaloMat.opacity = 0.32;
        sunCoreMat.color.setHex(0xf97316);
        sunCoreMat.opacity = 0.16;
      } else if (themeIndex === 4) {
        // Winter aurora moon/sun
        sunHaloMat.color.setHex(0x22d3ee);
        sunHaloMat.opacity = 0.28;
        sunCoreMat.color.setHex(0xa5f3fc);
        sunCoreMat.opacity = 0.14;
      } else if (themeIndex === 5) {
        // Autumn Bronze
        sunHaloMat.color.setHex(0xf59e0b);
        sunHaloMat.opacity = 0.32;
        sunCoreMat.color.setHex(0xd97706);
        sunCoreMat.opacity = 0.15;
      } else {
        // Cyber and cosmic maps
        sunHaloMat.color.setHex(theme.gridLeft);
        sunHaloMat.opacity = 0.25;
        sunCoreMat.color.setHex(theme.gridRight);
        sunCoreMat.opacity = 0.15;
      }

      // Rebuild sun gradient colors nicely based on theme colors
      sunBands.forEach((band, idx) => {
        const bandMat = band.material as THREE.MeshBasicMaterial;
        if (theme.isDay) {
          bandMat.color.setHex(0xffea00); // golden sun
          bandMat.opacity = 1.0 - (idx * 0.05);
        } else if (theme.isSunset) {
          bandMat.color.setHex(0xf97316); // glowing orange sunset sun
          bandMat.opacity = 0.95 - (idx * 0.04);
        } else {
          const colorBottom = new THREE.Color(theme.gridLeft);
          const colorTop = new THREE.Color(theme.gridRight);
          const ratio = idx / (numSunBands - 1);
          bandMat.color.copy(colorBottom).lerp(colorTop, ratio);
          bandMat.opacity = 0.95 - (idx * 0.03);
        }
      });

      // Update user player lights to match active theme glow
      if (carUnderglowLight) {
        carUnderglowLight.color.setHex(theme.sideBorder);
      }
      if (carHeadlightSpot) {
        carHeadlightSpot.color.setHex(theme.sideBorder);
      }

      // Dynamic skinning of roadside accents (Trees Seasons vs Cyber Poles)
      roadsideAccents.forEach((accent) => {
        const cyberCol = accent.getObjectByName("cyber_col");
        const cyberRing1 = accent.getObjectByName("cyber_ring1");
        const cyberRing2 = accent.getObjectByName("cyber_ring2");
        const cyberTop = accent.getObjectByName("cyber_top");
        
        const treeSummer = accent.getObjectByName("tree_summer");
        const treeSpring = accent.getObjectByName("tree_spring");
        const treeAutumn = accent.getObjectByName("tree_autumn");
        const treeWinter = accent.getObjectByName("tree_winter");
        const boulders = accent.getObjectByName("boulders");

        // Hide everything first
        if (cyberCol) cyberCol.visible = false;
        if (cyberRing1) cyberRing1.visible = false;
        if (cyberRing2) cyberRing2.visible = false;
        if (cyberTop) cyberTop.visible = false;
        
        if (treeSummer) treeSummer.visible = false;
        if (treeSpring) treeSpring.visible = false;
        if (treeAutumn) treeAutumn.visible = false;
        if (treeWinter) treeWinter.visible = false;
        if (boulders) boulders.visible = false;

        // Toggle active seasonal model based on themeIndex
        if (themeIndex === 0) {
          // Bahor (Spring Sakura blossoms)
          if (treeSpring) treeSpring.visible = true;
          if (boulders) boulders.visible = true;
        } else if (themeIndex === 1 || themeIndex === 3) {
          // Yoz (Lush fresh summer greens)
          if (treeSummer) treeSummer.visible = true;
          if (boulders) boulders.visible = true;
        } else if (themeIndex === 4) {
          // Qish (Snowy pine woods)
          if (treeWinter) treeWinter.visible = true;
          if (boulders) boulders.visible = true;
        } else if (themeIndex === 5) {
          // Kuz (Harvest gold autumn trees)
          if (treeAutumn) treeAutumn.visible = true;
          if (boulders) boulders.visible = true;
        } else {
          // Cyber sci-fi styles
          if (cyberCol) cyberCol.visible = true;
          if (cyberRing1) cyberRing1.visible = true;
          if (cyberRing2) cyberRing2.visible = true;
          if (cyberTop) cyberTop.visible = true;
        }
      });

      // Maintain star system visible always, so it renders seasonal petals/snow/leaves drifting!
      starParticles.visible = true;

      // Update particle colors dynamically to suit the season
      const cArr = starGeo.attributes.color.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        if (themeIndex === 0) {
          // Cherry Blossom Pink/Lilac
          cArr[i * 3] = 1.0;
          cArr[i * 3 + 1] = 0.55 + Math.random() * 0.3;
          cArr[i * 3 + 2] = 0.65 + Math.random() * 0.25;
        } else if (themeIndex === 5) {
          // Saturated Amber, Gold and Rust leaves
          cArr[i * 3] = 0.9 + Math.random() * 0.1;
          cArr[i * 3 + 1] = 0.35 + Math.random() * 0.45;
          cArr[i * 3 + 2] = 0.0 + Math.random() * 0.15;
        } else if (themeIndex === 4) {
          // Pure winter white snow
          cArr[i * 3] = 0.96;
          cArr[i * 3 + 1] = 0.98;
          cArr[i * 3 + 2] = 1.0;
        } else {
          // Colorful futuristic cyan/pink stars
          const cols = [
            [1.0, 0.1, 0.75],
            [0.1, 0.95, 1.0],
            [0.9, 0.8, 0.1],
            [1.0, 1.0, 1.0]
          ];
          const col = cols[i % cols.length];
          cArr[i * 3] = col[0];
          cArr[i * 3 + 1] = col[1];
          cArr[i * 3 + 2] = col[2];
        }
      }
      starGeo.attributes.color.needsUpdate = true;

      // Rebuild grids with theme colors spanning 400 wide
      scene.remove(gridHelperLeft1);
      scene.remove(gridHelperRight1);
      scene.remove(gridHelperLeft2);
      scene.remove(gridHelperRight2);

      const z1 = gridHelperLeft1 ? gridHelperLeft1.position.z : -100;
      const z2 = gridHelperLeft2 ? gridHelperLeft2.position.z : -500;

      gridHelperLeft1 = new THREE.GridHelper(400, 40, theme.gridLeft, 0x120722);
      gridHelperLeft1.position.set(-206, -0.01, z1);
      scene.add(gridHelperLeft1);

      gridHelperRight1 = new THREE.GridHelper(400, 40, theme.gridRight, 0x120722);
      gridHelperRight1.position.set(206, -0.01, z1);
      scene.add(gridHelperRight1);

      gridHelperLeft2 = new THREE.GridHelper(400, 40, theme.gridLeft, 0x120722);
      gridHelperLeft2.position.set(-206, -0.01, z2);
      scene.add(gridHelperLeft2);

      gridHelperRight2 = new THREE.GridHelper(400, 40, theme.gridRight, 0x120722);
      gridHelperRight2.position.set(206, -0.01, z2);
      scene.add(gridHelperRight2);

      // Toggle decorative segment elements based on level theme index
      segmentDoubleDividers.forEach(d => d.parent ? d.parent.visible = (themeIndex === 2) : null);
      segmentPlasmaWires.forEach(w => w.parent ? w.parent.visible = (themeIndex === 5) : null);
      segmentMatrixGrids.forEach(g => g.visible = (themeIndex === 7));

      segmentBordersLeft.forEach(b => b.visible = (themeIndex !== 3)); // Hide standard borders when ice blocks are there
      segmentBordersRight.forEach(b => b.visible = (themeIndex !== 3));

      iceRails.visible = (themeIndex === 3);      // Stage 4: Frosted ice borders
      goldStuds.visible = (themeIndex === 4);     // Stage 5: Gold airport rivets
      lavaVents.visible = (themeIndex === 6);     // Stage 7: Inner glowing lava channels
      
      // Standard dividing lines visibility toggle
      dividingLines.forEach(line => {
        // Hide standard center indicators when there's already a heavy overlay layout
        line.visible = (themeIndex !== 2 && themeIndex !== 5 && themeIndex !== 7);
      });

      // Update mountains & buildings wireframe colors to blend seamlessly with current map theme
      if (theme.isDay) {
        mountainWireLMat.color.setHex(0xbfefff);
        mountainWireRMat.color.setHex(0xe0f2fe);
        mountainWireLMat.opacity = 0.05;
        mountainWireRMat.opacity = 0.05;
      } else if (theme.isSunset) {
        mountainWireLMat.color.setHex(0xf97316);
        mountainWireRMat.color.setHex(0xec4899);
        mountainWireLMat.opacity = 0.16;
        mountainWireRMat.opacity = 0.16;
      } else {
        mountainWireLMat.color.setHex(theme.gridLeft);
        mountainWireRMat.color.setHex(theme.gridRight);
        mountainWireLMat.opacity = 0.22;
        mountainWireRMat.opacity = 0.22;
      }

      // Update the realistic weather precipitation style based on theme choice
      updateWeatherTheme(themeIndex);
    };

    // ----------------------------------------------------
    // ----------------------------------------------------
    // 5. PLAYER VEHICLE GENERATION (Cyberpunk Supercar)
    // ----------------------------------------------------
    const playerGroup = new THREE.Group();
    scene.add(playerGroup);
    playerGroup.position.set(0, 0, 5); // Start on central portion

    // Real wet underglow lighting source casting onto road
    carUnderglowLight = new THREE.PointLight(0x00f3ff, 2.8, 12, 1.5);
    carUnderglowLight.position.set(0, 0.3, 0);
    playerGroup.add(carUnderglowLight);

    // High fidelity Twin Headlights spotlight projection
    carHeadlightSpot = new THREE.SpotLight(0x00f3ff, 5.0, 35, Math.PI / 4, 0.6, 1.2);
    carHeadlightSpot.position.set(0, 0.45, -1.62);
    const headlightTargetObj = new THREE.Object3D();
    headlightTargetObj.position.set(0, 0, -22);
    playerGroup.add(headlightTargetObj);
    carHeadlightSpot.target = headlightTargetObj;
    playerGroup.add(carHeadlightSpot);

    const wheels: THREE.Mesh[] = [];
    const carVisualGroup = new THREE.Group();
    playerGroup.add(carVisualGroup);

    const rebuildPlayerCar = (skinId: string, colorHex: string) => {
      // Clear visual group
      while (carVisualGroup.children.length > 0) {
        carVisualGroup.remove(carVisualGroup.children[0]);
      }
      
      // Empty the wheels array so we can repopulate it
      wheels.length = 0;

      // Define ultra-premium paint layer shaders for high-end realistic 4K automotive reflections
      const carColor = new THREE.Color(colorHex);
      const carBodyMat = new THREE.MeshPhysicalMaterial({
        color: carColor,
        roughness: 0.12,
        metalness: 0.88,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        reflectivity: 1.0,
      });

      const chromeMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1.0,
        roughness: 0.02,
        clearcoat: 1.0,
        clearcoatRoughness: 0.01,
      });

      const tireMat = new THREE.MeshStandardMaterial({
        color: 0x111114,
        roughness: 0.85,
        metalness: 0.08
      });

      const darkMat = new THREE.MeshPhysicalMaterial({
        color: 0x050508,
        roughness: 0.22,
        metalness: 0.85,
        clearcoat: 0.4,
      });

      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x04040a,
        roughness: 0.02,
        metalness: 0.98,
        transparent: true,
        opacity: 0.75,
        transmission: 0.7, // gives realistic glass refraction
        ior: 1.5,
      });

      const brakeDiscMat = new THREE.MeshPhysicalMaterial({
        color: 0x999999,
        metalness: 0.95,
        roughness: 0.12,
      });

      const redCaliperMat = new THREE.MeshPhysicalMaterial({
        color: 0xcc0000,
        metalness: 0.6,
        roughness: 0.15,
      });

      const goldCaliperMat = new THREE.MeshPhysicalMaterial({
        color: 0xffaa00,
        metalness: 0.7,
        roughness: 0.1,
      });

      const lightsGlowingMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const taillightMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
      const greenGlowMat = new THREE.MeshBasicMaterial({ color: 0x39ff14 });
      const pinkGlowMat = new THREE.MeshBasicMaterial({ color: 0xff007f });
      const goldGlowMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
      const violetGlowMat = new THREE.MeshBasicMaterial({ color: 0xb000ff });

      // Neon Underglow Plate (glowing plane beneath chassis)
      const underglowGeo = new THREE.PlaneGeometry(1.4, 3.0);
      underglowGeo.rotateX(-Math.PI / 2);
      const underglowColor = skinId === 'toxic_green' ? 0x39ff14 : (skinId === 'hot_pink' ? 0xff007f : (skinId === 'laser_violet' ? 0xb000ff : (skinId === 'sun_gold' ? 0xffd700 : 0x00f0ff)));
      const underglowMat = new THREE.MeshBasicMaterial({
        color: underglowColor,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
      const underglow = new THREE.Mesh(underglowGeo, underglowMat);
      underglow.position.y = 0.08;
      underglow.name = "underglow";
      carVisualGroup.add(underglow);

      if (skinId === 'toxic_green') {
        // ----------------------------------------------------
        // TOXIC CYBERTRUCK EV (High-fidelity futuristic 4K pickup)
        // ----------------------------------------------------
        // Brushed steel panels
        const cybertruckMat = new THREE.MeshPhysicalMaterial({
          color: 0x666668,
          roughness: 0.22,
          metalness: 0.98,
          clearcoat: 0.2
        });

        const frame = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 3.4), cybertruckMat);
        frame.position.y = 0.42;
        carVisualGroup.add(frame);

        // Angled side cabin pillars
        const cabinL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 2.8), cybertruckMat);
        cabinL.position.set(-0.74, 0.72, 0);
        cabinL.rotation.y = 0.02;
        cabinL.rotation.z = -0.05;
        const cabinR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 2.8), cybertruckMat);
        cabinR.position.set(0.74, 0.72, 0);
        cabinR.rotation.y = -0.02;
        cabinR.rotation.z = 0.05;
        carVisualGroup.add(cabinL, cabinR);

        // Linear angular hyper roof
        const roof = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.35, 1.8), glassMat);
        roof.position.set(0, 0.96, -0.1);
        carVisualGroup.add(roof);

        // Front bumper shield and skid plate
        const frontGuard = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.25, 0.25), darkMat);
        frontGuard.position.set(0, 0.32, -1.72);
        carVisualGroup.add(frontGuard);

        // Lightbar running fully across front body
        const lightbar = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.06, 0.06), greenGlowMat);
        lightbar.position.set(0, 0.75, -1.68);
        carVisualGroup.add(lightbar);

        // Windshield roof visor LEDs
        const visorLightInfo = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.04, 0.04), greenGlowMat);
        visorLightInfo.position.set(0, 1.15, -0.9);
        carVisualGroup.add(visorLightInfo);

        // Covered truck bed panels at the rear
        const vaultCover = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.2, 1.3), darkMat);
        vaultCover.position.set(0, 0.65, 0.95);
        vaultCover.rotation.x = 0.12; // sloped vault
        carVisualGroup.add(vaultCover);

        // ----------------------------------------------------
        // CYBERTRUCK EV PRESTIGE CABIN INTERIOR
        // ----------------------------------------------------
        // Cyberpunk seat cushions with Toxic Green status indicators/stitching
        const seatMat = new THREE.MeshPhysicalMaterial({
          color: 0x141416,
          roughness: 0.45,
          metalness: 0.15,
          clearcoat: 0.1
        });
        [-1, 1].forEach((side) => {
          const seatX = side * 0.28;
          const base = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.08, 0.36), seatMat);
          base.position.set(seatX, 0.52, -0.1);
          
          const back = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.52, 0.1), seatMat);
          back.position.set(seatX, 0.76, 0.08);
          back.rotation.x = 0.12;

          const head = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.08), seatMat);
          head.position.set(seatX, 1.02, 0.12);
          head.rotation.x = 0.12;
          
          const backRestStripe = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.42, 0.01), greenGlowMat);
          backRestStripe.position.set(seatX, 0.76, 0.135);
          backRestStripe.rotation.x = 0.12;

          carVisualGroup.add(base, back, head, backRestStripe);
        });

        // Minimalist straight dashboard console
        const cyberDash = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.18, 0.28), darkMat);
        cyberDash.position.set(0, 0.74, -0.44);
        carVisualGroup.add(cyberDash);

        // Heavy central console navigation display tablet
        const tabletArm = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.08, 0.04), chromeMat);
        tabletArm.position.set(0, 0.78, -0.28);
        const centralTablet = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.16, 0.02), greenGlowMat);
        centralTablet.position.set(0, 0.84, -0.27);
        centralTablet.rotation.x = -0.06;
        carVisualGroup.add(tabletArm, centralTablet);

        // Steer yoke column line
        const cyberSteerCol = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.36, 8), darkMat);
        cyberSteerCol.rotation.x = -Math.PI / 6;
        cyberSteerCol.position.set(-0.28, 0.68, -0.26);
        carVisualGroup.add(cyberSteerCol);

        // Interactive Cybertruck hexagonal steering yoke
        const yokeGroup = new THREE.Group();
        yokeGroup.name = "steering_wheel";
        yokeGroup.position.set(-0.28, 0.74, -0.16);
        yokeGroup.rotation.x = -Math.PI / 6;

        const mainYokeBar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.03), darkMat);
        yokeGroup.add(mainYokeBar);
        const yokeGripL = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.11, 0.032), darkMat);
        yokeGripL.position.set(-0.11, 0, 0.01);
        const yokeGripR = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.11, 0.032), darkMat);
        yokeGripR.position.set(0.11, 0, 0.01);
        yokeGroup.add(yokeGripL, yokeGripR);

        const badgeLight = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.024, 0.01), greenGlowMat);
        badgeLight.position.set(0, 0, 0.015);
        yokeGroup.add(badgeLight);

        carVisualGroup.add(yokeGroup);

        // Boost and tail flame
        const thruster = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.5, 16), darkMat);
        thruster.rotation.x = Math.PI / 2;
        thruster.position.set(0, 0.35, 1.55);
        carVisualGroup.add(thruster);

        const flame = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.6, 16), greenGlowMat);
        flame.rotation.x = -Math.PI / 2;
        flame.position.set(0, 0.35, 2.1);
        flame.name = "thrusterFlame";
        carVisualGroup.add(flame);

        // High resolution 32-segment rounded offroad tires (4 total)
        const wheelGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.46, 32); 
        wheelGeo.rotateZ(Math.PI / 2);
        const rimCapGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.48, 32);
        rimCapGeo.rotateZ(Math.PI / 2);

        const wheelPositions = [
          { x: -0.96, y: 0.45, z: -1.0 },
          { x: 0.96, y: 0.45, z: -1.0 },
          { x: -0.96, y: 0.45, z: 1.0 },
          { x: 0.96, y: 0.45, z: 1.0 }
        ];

        wheelPositions.forEach((pos) => {
          const w = new THREE.Mesh(wheelGeo, tireMat);
          w.position.set(pos.x, pos.y, pos.z);
          
          const rim = new THREE.Mesh(rimCapGeo, darkMat);
          w.add(rim);

          // 3D spokes inside
          const spokesGroup = new THREE.Group();
          for (let sp = 0; sp < 6; sp++) {
            const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.28, 0.1), greenGlowMat);
            spoke.rotation.x = (sp * Math.PI) / 3;
            spokesGroup.add(spoke);
          }
          w.add(spokesGroup);

          carVisualGroup.add(w);
          wheels.push(w);

          // Stationary Neon Brake Calipers
          const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 0.14), redCaliperMat);
          caliper.position.set(pos.x + 0.02 * Math.sign(pos.x), pos.y + 0.16, pos.z + 0.12);
          carVisualGroup.add(caliper);
        });

      } else if (skinId === 'hot_pink') {
        // ----------------------------------------------------
        // FERRARI CYBER F1 (Aerodynamic high-speed racecar)
        // ----------------------------------------------------
        // Main flat floor chassis
        const mainFloor = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.12, 3.2), darkMat);
        mainFloor.position.y = 0.22;
        carVisualGroup.add(mainFloor);

        // Pointy sharp F1 needle nose
        const noseCone = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.4, 1.8, 24), carBodyMat);
        noseCone.rotation.x = Math.PI / 2;
        noseCone.scale.set(1.4, 0.6, 1);
        noseCone.position.set(0, 0.32, -1.0);
        carVisualGroup.add(noseCone);

        // Elaborate F1 front splitters
        const fWingL = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.05, 0.4), carBodyMat);
        fWingL.position.set(-0.7, 0.24, -1.8);
        fWingL.rotation.y = -0.1;
        const fWingR = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.05, 0.4), carBodyMat);
        fWingR.position.set(0.7, 0.24, -1.8);
        fWingR.rotation.y = 0.1;
        carVisualGroup.add(fWingL, fWingR);

        // Side aerodynamic pods with air intakes
        const sidePodL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 1.6), carBodyMat);
        sidePodL.position.set(-0.72, 0.38, 0.3);
        const sidePodR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 1.6), carBodyMat);
        sidePodR.position.set(0.72, 0.38, 0.3);
        carVisualGroup.add(sidePodL, sidePodR);

        // Halo cockpit safety frame
        const halo = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.035, 8, 24), darkMat);
        halo.rotation.x = Math.PI / 2.2;
        halo.position.set(0, 0.75, -0.15);
        carVisualGroup.add(halo);

        // Translucent bubble visor dome
        const dome = new THREE.Mesh(new THREE.SphereGeometry(0.36, 32, 24), glassMat);
        dome.scale.set(1, 0.8, 1.8);
        dome.position.set(0, 0.65, 0.1);
        carVisualGroup.add(dome);

        // ----------------------------------------------------
        // FERRARI CYBER F1 SINGLE-SEATER RACING PILOT COCKPIT
        // ----------------------------------------------------
        // Center-aligned carbon-fiber single-seater bucket seats styled with pink accents
        const f1SeatMat = new THREE.MeshPhysicalMaterial({
          color: 0x0c0c0e,
          roughness: 0.35,
          metalness: 0.75,
          clearcoat: 0.2
        });
        const f1Seat = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.08, 0.38), f1SeatMat);
        f1Seat.position.set(0, 0.32, -0.05);
        const f1SeatBack = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.48, 0.1), f1SeatMat);
        f1SeatBack.position.set(0, 0.54, 0.15);
        f1SeatBack.rotation.x = 0.22; // low-slung reclined racer posture

        // High contrast safety harness belts
        const harnessA = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.46, 0.015), pinkGlowMat);
        harnessA.position.set(-0.08, 0.54, 0.19);
        harnessA.rotation.x = 0.22;
        harnessA.rotation.z = 0.04;
        const harnessB = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.46, 0.015), pinkGlowMat);
        harnessB.position.set(0.08, 0.54, 0.19);
        harnessB.rotation.x = 0.22;
        harnessB.rotation.z = -0.04;

        carVisualGroup.add(f1Seat, f1SeatBack, harnessA, harnessB);

        // Carbon steering connector column
        const f1SteerCol = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.32, 8), darkMat);
        f1SteerCol.rotation.x = -Math.PI / 5;
        f1SteerCol.position.set(0, 0.48, -0.2);
        carVisualGroup.add(f1SteerCol);

        // Steerable high-tech F1 Yoke with continuous digital pink telemetry readout
        const f1YokeGroup = new THREE.Group();
        f1YokeGroup.name = "steering_wheel";
        f1YokeGroup.position.set(0, 0.55, -0.12);
        f1YokeGroup.rotation.x = -Math.PI / 5;

        const f1YokeBody = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.07, 0.022), darkMat);
        f1YokeGroup.add(f1YokeBody);

        const f1GripL = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.08, 0.026), darkMat);
        f1GripL.position.set(-0.08, 0, 0.01);
        const f1GripR = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.08, 0.026), darkMat);
        f1GripR.position.set(0.08, 0, 0.01);
        f1YokeGroup.add(f1GripL, f1GripR);

        const f1MiniScreen = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.045, 0.01), pinkGlowMat);
        f1MiniScreen.position.set(0, 0, 0.014);
        f1YokeGroup.add(f1MiniScreen);

        carVisualGroup.add(f1YokeGroup);

        // Double elements rear F1 wing
        const f1WingDeck = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.05, 0.42), carBodyMat);
        f1WingDeck.position.set(0, 0.95, 1.35);
        const f1WingLower = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.04, 0.35), darkMat);
        f1WingLower.position.set(0, 0.72, 1.35);
        
        const endPlateL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.55, 0.5), darkMat);
        endPlateL.position.set(-0.9, 0.75, 1.35);
        const endPlateR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.55, 0.5), darkMat);
        endPlateR.position.set(0.9, 0.75, 1.35);
        carVisualGroup.add(f1WingDeck, f1WingLower, endPlateL, endPlateR);

        // Blade neon headlines
        const bladeLightsL = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 0.05), pinkGlowMat);
        bladeLightsL.position.set(-0.35, 0.32, -2.4);
        const bladeLightsR = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 0.05), pinkGlowMat);
        bladeLightsR.position.set(0.35, 0.32, -2.4);
        carVisualGroup.add(bladeLightsL, bladeLightsR);

        // Double exhaust and flame
        const thruster = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.13, 0.6, 16), darkMat);
        thruster.rotation.x = Math.PI / 2;
        thruster.position.set(0, 0.35, 1.38);
        carVisualGroup.add(thruster);

        const flame = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.8, 16), pinkGlowMat);
        flame.rotation.x = -Math.PI / 2;
        flame.position.set(0, 0.35, 1.95);
        flame.name = "thrusterFlame";
        carVisualGroup.add(flame);

        // F1 hyper slick wheels
        const wheelGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.4, 32);
        wheelGeo.rotateZ(Math.PI / 2);
        const rimCapGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.42, 32);
        rimCapGeo.rotateZ(Math.PI / 2);

        const wheelPositions = [
          { x: -0.92, y: 0.42, z: -1.0 },
          { x: 0.92, y: 0.42, z: -1.0 },
          { x: -0.92, y: 0.42, z: 1.0 },
          { x: 0.92, y: 0.42, z: 1.0 }
        ];

        wheelPositions.forEach((pos) => {
          const w = new THREE.Mesh(wheelGeo, tireMat);
          w.position.set(pos.x, pos.y, pos.z);
          
          const rim = new THREE.Mesh(rimCapGeo, darkMat);
          w.add(rim);

          // Add chrome multi spokes
          const spokesGroup = new THREE.Group();
          for (let sp = 0; sp < 10; sp++) {
            const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.22, 0.08), chromeMat);
            spoke.rotation.x = (sp * Math.PI) / 5;
            spokesGroup.add(spoke);
          }
          w.add(spokesGroup);

          carVisualGroup.add(w);
          wheels.push(w);

          // Stationary yellow Brembo caliper labels
          const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.18, 0.12), goldCaliperMat);
          caliper.position.set(pos.x + 0.02 * Math.sign(pos.x), pos.y + 0.16, pos.z + 0.12);
          carVisualGroup.add(caliper);
        });

      } else if (skinId === 'sun_gold') {
        // ----------------------------------------------------
        // BUGATTI CHIRON ROYALE (Luxurious hyper-cruise 6-wheeler)
        // ----------------------------------------------------
        // Broad Bugatti main body
        const mainBody = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.52, 4.2), carBodyMat);
        mainBody.position.y = 0.45;
        carVisualGroup.add(mainBody);

        // Sleek engine cover
        const engineDeck = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.22, 1.8), darkMat);
        engineDeck.position.set(0, 0.65, 0.95);
        carVisualGroup.add(engineDeck);

        // Horseshoe iconic radiator grill
        const grill = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.04, 12, 24), chromeMat);
        grill.position.set(0, 0.42, -2.12);
        grill.scale.set(1.2, 1.6, 1);
        carVisualGroup.add(grill);

        const innerGrill = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.6, 0.05), darkMat);
        innerGrill.position.set(0, 0.42, -2.1);
        carVisualGroup.add(innerGrill);

        // Outlined projector LED linear headlights
        const l1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.1), goldGlowMat);
        l1.position.set(-0.55, 0.52, -2.16);
        const l2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.1), goldGlowMat);
        l2.position.set(0.55, 0.52, -2.16);
        carVisualGroup.add(l1, l2);

        // Continuous hypercar taillight bar across the back
        const redLedBar = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.04, 0.06), taillightMat);
        redLedBar.position.set(0, 0.58, 2.12);
        carVisualGroup.add(redLedBar);

        // Luxury glass cabin
        const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.42, 2.5), glassMat);
        cabin.position.set(0, 0.95, 0.2);
        carVisualGroup.add(cabin);

        // ----------------------------------------------------
        // BUGATTI CHIRON ROYALE COUTURE LUXURY INTERIOR
        // ----------------------------------------------------
        // Exclusive double luxury high-back bucket seats with Ivory Cream leather
        const ivoryCreamMat = new THREE.MeshPhysicalMaterial({
          color: 0xfdfdf0,
          roughness: 0.18,
          metalness: 0.08,
          clearcoat: 0.45,
          clearcoatRoughness: 0.06
        });
        [-1, 1].forEach((side) => {
          const seatX = side * 0.28;
          const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.08, 0.35), ivoryCreamMat);
          cushion.position.set(seatX, 0.53, -0.05);

          const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.52, 0.1), ivoryCreamMat);
          backrest.position.set(seatX, 0.77, 0.12);
          backrest.rotation.x = 0.14;

          const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.13, 0.08), ivoryCreamMat);
          headrest.position.set(seatX, 1.03, 0.16);
          headrest.rotation.x = 0.14;

          const goldCentreStrip = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.42, 0.012), goldGlowMat);
          goldCentreStrip.position.set(seatX, 0.77, 0.174);
          goldCentreStrip.rotation.x = 0.14;

          carVisualGroup.add(cushion, backrest, headrest, goldCentreStrip);
        });

        // Flowing leather-wrapped Bugatti console and curve dashboard
        const bugattiDash = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.24, 0.32), darkMat);
        bugattiDash.position.set(0, 0.74, -0.42);
        carVisualGroup.add(bugattiDash);

        // Chiron iconic glowing golden central divider spine
        const goldMedianBar = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.38, 0.18), goldGlowMat);
        goldMedianBar.position.set(0, 0.65, -0.1);
        carVisualGroup.add(goldMedianBar);

        // Chromed heavy steering column
        const bugattiSteerCol = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.36, 16), chromeMat);
        bugattiSteerCol.rotation.x = -Math.PI / 6;
        bugattiSteerCol.position.set(-0.28, 0.66, -0.24);
        carVisualGroup.add(bugattiSteerCol);

        // Deluxe Bugatti Gold-spoke leather-trimmed steering wheel (turns with steer controls!)
        const bugattiWheelGroup = new THREE.Group();
        bugattiWheelGroup.name = "steering_wheel";
        bugattiWheelGroup.position.set(-0.28, 0.72, -0.14);
        bugattiWheelGroup.rotation.x = -Math.PI / 6;

        const bugattiWheelTorus = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.021, 12, 32), darkMat);
        bugattiWheelGroup.add(bugattiWheelTorus);

        for (let sp = 0; sp < 3; sp++) {
          const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.16, 0.01), goldGlowMat);
          spoke.rotation.z = (sp * Math.PI * 2) / 3;
          spoke.position.y = -0.04;
          bugattiWheelGroup.add(spoke);
        }
        carVisualGroup.add(bugattiWheelGroup);

        // Double massive chromed booster tips
        [-0.28, 0.28].forEach((xOff) => {
          const thrusterTip = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.5, 16), chromeMat);
          thrusterTip.rotation.x = Math.PI / 2;
          thrusterTip.position.set(xOff, 0.32, 2.15);
          carVisualGroup.add(thrusterTip);
        });

        const flame = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.8, 16), goldGlowMat);
        flame.rotation.x = -Math.PI / 2;
        flame.position.set(0, 0.48, 2.65);
        flame.name = "thrusterFlame";
        carVisualGroup.add(flame);

        // SIX SPOKED CHROME WHEELS
        const wheelGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.38, 32);
        wheelGeo.rotateZ(Math.PI / 2);
        const rimCapGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.4, 32);
        rimCapGeo.rotateZ(Math.PI / 2);

        const wheelPositions6 = [
          { x: -0.94, y: 0.44, z: -1.35 }, // Front Left
          { x: 0.94, y: 0.44, z: -1.35 },  // Front Right
          { x: -0.94, y: 0.44, z: 0.05 },  // Middle Left
          { x: 0.94, y: 0.44, z: 0.05 },   // Middle Right
          { x: -0.94, y: 0.44, z: 1.45 },  // Rear Left
          { x: 0.94, y: 0.44, z: 1.45 }    // Rear Right
        ];

        wheelPositions6.forEach((pos) => {
          const w = new THREE.Mesh(wheelGeo, tireMat);
          w.position.set(pos.x, pos.y, pos.z);
          
          const rim = new THREE.Mesh(rimCapGeo, chromeMat);
          w.add(rim);

          // Beautiful detailed spokes
          const spokesGroup = new THREE.Group();
          for (let sp = 0; sp < 8; sp++) {
            const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.24, 0.1), chromeMat);
            spoke.rotation.x = (sp * Math.PI) / 4;
            spokesGroup.add(spoke);
          }
          w.add(spokesGroup);

          // Inner brake rotor plate
          const rotor = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.02, 16), brakeDiscMat);
          rotor.rotateZ(Math.PI / 2);
          rotor.position.set(-0.06 * Math.sign(pos.x), 0, 0);
          w.add(rotor);

          carVisualGroup.add(w);
          wheels.push(w);

          // Stationary gold racing break calipers
          const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 0.14), goldCaliperMat);
          caliper.position.set(pos.x + 0.02 * Math.sign(pos.x), pos.y + 0.16, pos.z + 0.12);
          carVisualGroup.add(caliper);
        });

      } else if (skinId === 'laser_violet') {
        // ----------------------------------------------------
        // LAMBO TERZO MILLENNIO (Aggressive hyper-sculpted sports car)
        // ----------------------------------------------------
        // Low wedge body chassis
        const corePod = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.35, 3.2), carBodyMat);
        corePod.position.y = 0.35;
        carVisualGroup.add(corePod);

        // Sculpted front nose wings
        const podL = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.22, 1.4), carBodyMat);
        podL.position.set(-0.58, 0.32, -1.0);
        podL.rotation.y = -0.06;
        const podR = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.22, 1.4), carBodyMat);
        podR.position.set(0.58, 0.32, -1.0);
        podR.rotation.y = 0.06;
        carVisualGroup.add(podL, podR);

        // Famous Lambo Terzo Y-shaped laser headlight arrays
        [-1, 1].forEach((side) => {
          const yHeadGroup = new THREE.Group();
          yHeadGroup.position.set(side * 0.65, 0.34, -1.72);
          
          const stem = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.03, 0.03), violetGlowMat);
          stem.rotation.y = side * 0.15;
          const arm1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 0.03), violetGlowMat);
          arm1.position.set(-0.08, 0.05, 0);
          arm1.rotation.z = Math.PI / 4;
          const arm2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 0.03), violetGlowMat);
          arm2.position.set(-0.08, -0.05, 0);
          arm2.rotation.z = -Math.PI / 4;

          yHeadGroup.add(stem, arm1, arm2);
          carVisualGroup.add(yHeadGroup);
        });

        // Air channels feed through pilot canopy
        const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.48, 32, 24), glassMat);
        canopy.scale.set(1.1, 0.72, 2.5);
        canopy.position.set(0, 0.58, -0.2);
        carVisualGroup.add(canopy);

        // ----------------------------------------------------
        // LAMBO TERZO COCKPIT AVIONICS INTERIOR
        // ----------------------------------------------------
        // Aggressive racing shells in matte Alcantara-charcoal with Laser Violet stitching
        const alcantaraMat = new THREE.MeshPhysicalMaterial({
          color: 0x111112,
          roughness: 0.62,
          metalness: 0.1,
          clearcoat: 0.05
        });
        [-1, 1].forEach((side) => {
          const seatX = side * 0.28;
          const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.08, 0.35), alcantaraMat);
          cushion.position.set(seatX, 0.44, -0.05);

          const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.52, 0.1), alcantaraMat);
          backrest.position.set(seatX, 0.68, 0.11);
          backrest.rotation.x = 0.18;

          const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.13, 0.08), alcantaraMat);
          headrest.position.set(seatX, 0.94, 0.15);
          headrest.rotation.x = 0.18;

          const violetStitching = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.42, 0.01), violetGlowMat);
          violetStitching.position.set(seatX, 0.68, 0.164);
          violetStitching.rotation.x = 0.18;

          carVisualGroup.add(cushion, backrest, headrest, violetStitching);
        });

        // Stealth fighter jet style carbon dashboard
        const stealthDash = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.18, 0.28), darkMat);
        stealthDash.position.set(0, 0.64, -0.42);
        carVisualGroup.add(stealthDash);

        // Glowing center violet navigation map HUD
        const violetHudDisp = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.02), violetGlowMat);
        violetHudDisp.position.set(0, 0.68, -0.28);
        violetHudDisp.rotation.x = -0.25;
        carVisualGroup.add(violetHudDisp);

        // Steer column tube
        const lamboSteerCol = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8), darkMat);
        lamboSteerCol.rotation.x = -Math.PI / 6;
        lamboSteerCol.position.set(-0.28, 0.58, -0.26);
        carVisualGroup.add(lamboSteerCol);

        // Track-day custom flat-bottom steering wheel with laser core detailing (turns with input!)
        const lamboWheelGroup = new THREE.Group();
        lamboWheelGroup.name = "steering_wheel";
        lamboWheelGroup.position.set(-0.28, 0.64, -0.14);
        lamboWheelGroup.rotation.x = -Math.PI / 6;

        const flatTopGrip = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.02, 8, 24, Math.PI * 1.2), darkMat);
        flatTopGrip.position.y = 0.02;
        flatTopGrip.rotation.z = Math.PI * 0.4;
        lamboWheelGroup.add(flatTopGrip);

        const flatBottomBar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.03), darkMat);
        flatBottomBar.position.y = -0.12;
        lamboWheelGroup.add(flatBottomBar);

        const violetMedianSpoke = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.14, 0.01), violetGlowMat);
        violetMedianSpoke.position.y = -0.05;
        lamboWheelGroup.add(violetMedianSpoke);

        carVisualGroup.add(lamboWheelGroup);

        // Laser thrusters
        const thruster = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 0.6, 16), darkMat);
        thruster.rotation.x = Math.PI / 2;
        thruster.position.set(0, 0.36, 1.5);
        carVisualGroup.add(thruster);

        const flame = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.8, 16), violetGlowMat);
        flame.rotation.x = -Math.PI / 2;
        flame.position.set(0, 0.36, 2.05);
        flame.name = "thrusterFlame";
        carVisualGroup.add(flame);

        // Low profile high-end wheels with violet spokes
        const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.4, 32);
        wheelGeo.rotateZ(Math.PI / 2);
        const rimCapGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.42, 32);
        rimCapGeo.rotateZ(Math.PI / 2);

        const wheelPositions = [
          { x: -0.92, y: 0.4, z: -0.92 },
          { x: 0.92, y: 0.4, z: -0.92 },
          { x: -0.92, y: 0.4, z: 0.92 },
          { x: 0.92, y: 0.4, z: 0.92 }
        ];

        wheelPositions.forEach((pos) => {
          const w = new THREE.Mesh(wheelGeo, tireMat);
          w.position.set(pos.x, pos.y, pos.z);
          
          const rim = new THREE.Mesh(rimCapGeo, darkMat);
          w.add(rim);

          // Concave aerodynamic spokes
          const spokesGroup = new THREE.Group();
          for (let sp = 0; sp < 6; sp++) {
            const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.24, 0.08), violetGlowMat);
            spoke.rotation.x = (sp * Math.PI) / 3;
            spokesGroup.add(spoke);
          }
          w.add(spokesGroup);

          carVisualGroup.add(w);
          wheels.push(w);

          // Stationary neon brake calipers
          const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 0.14), violetGlowMat);
          caliper.position.set(pos.x + 0.02 * Math.sign(pos.x), pos.y + 0.16, pos.z + 0.12);
          carVisualGroup.add(caliper);
        });

      } else if (skinId === 'asphalt_fury') {
        // ----------------------------------------------------
        // BMW M8 GTR DEMOLITION (Racing GT3 widebody beast)
        // ----------------------------------------------------
        // Base widebody chassis
        const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.42, 3.42), carBodyMat);
        chassis.position.y = 0.42;
        carVisualGroup.add(chassis);

        // Slanted Hood Bonnet
        const hoodGeo = new THREE.BoxGeometry(1.56, 0.28, 1.25);
        const hood = new THREE.Mesh(hoodGeo, carBodyMat);
        hood.position.set(0, 0.54, -1.05);
        hood.rotation.x = 0.08;
        carVisualGroup.add(hood);

        // Classic Double-Kidney front grille frames
        [-0.14, 0.14].forEach((xOff) => {
          const kidneyFrame = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.02, 8, 24), chromeMat);
          kidneyFrame.position.set(xOff, 0.44, -1.72);
          kidneyFrame.scale.set(0.7, 1.2, 1);
          carVisualGroup.add(kidneyFrame);

          const innerGrille = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.26, 0.03), darkMat);
          innerGrille.position.set(xOff, 0.44, -1.71);
          carVisualGroup.add(innerGrille);
        });

        // Twin projector LED circular lenses (perfect roundness!)
        for (let side = -1; side <= 1; side += 2) {
          const led1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.03, 16), lightsGlowingMat);
          led1.rotation.x = Math.PI / 2;
          led1.position.set(side * 0.55, 0.48, -1.72);
          const led2 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.03, 16), lightsGlowingMat);
          led2.rotation.x = Math.PI / 2;
          led2.position.set(side * 0.42, 0.48, -1.72);
          carVisualGroup.add(led1, led2);
        }

        // Carbon side rearview mirrors
        const mirrorL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.12), darkMat);
        mirrorL.position.set(-0.9, 0.72, -0.4);
        const mirrorR = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.12), darkMat);
        mirrorR.position.set(0.9, 0.72, -0.4);
        carVisualGroup.add(mirrorL, mirrorR);

        // Large glass dome cabin
        const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.44, 1.58), glassMat);
        cabin.position.set(0, 0.84, 0.18);
        carVisualGroup.add(cabin);

        // ----------------------------------------------------
        // BMW M8 GTR RACING PIT & FULL COCKPIT
        // ----------------------------------------------------
        // High-back Recaro asymmetric carbon fiber bucket seat inside steering side
        const carbonSeatMat = new THREE.MeshPhysicalMaterial({
          color: 0x08080a,
          roughness: 0.3,
          metalness: 0.85,
          clearcoat: 0.35
        });
        const m8SeatBottom = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.08, 0.36), carbonSeatMat);
        m8SeatBottom.position.set(-0.28, 0.52, -0.05);

        const m8SeatBack = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.52, 0.1), carbonSeatMat);
        m8SeatBack.position.set(-0.28, 0.76, 0.12);
        m8SeatBack.rotation.x = 0.16;

        const m8SeatHead = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.13, 0.08), carbonSeatMat);
        m8SeatHead.position.set(-0.28, 1.02, 0.16);
        m8SeatHead.rotation.x = 0.16;

        const m8SeatBeltL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.44, 0.01), lightsGlowingMat);
        m8SeatBeltL.position.set(-0.36, 0.76, 0.17);
        m8SeatBeltL.rotation.x = 0.16;
        m8SeatBeltL.rotation.z = 0.02;
        const m8SeatBeltR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.44, 0.01), lightsGlowingMat);
        m8SeatBeltR.position.set(-0.20, 0.76, 0.17);
        m8SeatBeltR.rotation.x = 0.16;
        m8SeatBeltR.rotation.z = -0.02;

        carVisualGroup.add(m8SeatBottom, m8SeatBack, m8SeatHead, m8SeatBeltL, m8SeatBeltR);

        // Professional GT3 cross carbon roll cage (extremely realistic chassis bars)
        const rollbarMat = new THREE.MeshPhysicalMaterial({
          color: 0x334155,
          metalness: 0.95,
          roughness: 0.15
        });
        [-1, 1].forEach((side) => {
          const barFront = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.65, 8), rollbarMat);
          barFront.position.set(side * 0.48, 0.76, -0.2);
          barFront.rotation.x = Math.PI / 4;
          barFront.rotation.y = side * 0.04;

          const barRear = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.85, 8), rollbarMat);
          barRear.position.set(side * 0.48, 0.76, 0.4);
          barRear.rotation.x = -Math.PI / 6;

          carVisualGroup.add(barFront, barRear);
        });

        // Glowing digital M-telemetry dashboard display
        const m8RaceDash = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.22, 0.28), darkMat);
        m8RaceDash.position.set(0, 0.72, -0.42);
        carVisualGroup.add(m8RaceDash);

        const m8OledStrip = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.025, 0.01), lightsGlowingMat);
        m8OledStrip.position.set(-0.28, 0.82, -0.28);
        carVisualGroup.add(m8OledStrip);

        // Motorsport column connection
        const m8Column = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.36, 16), darkMat);
        m8Column.rotation.x = -Math.PI / 6;
        m8Column.position.set(-0.28, 0.65, -0.24);
        carVisualGroup.add(m8Column);

        // GT3 Racing thick alcantara steering wheel (turns with user key maneuvers!)
        const m8WheelGroup = new THREE.Group();
        m8WheelGroup.name = "steering_wheel";
        m8WheelGroup.position.set(-0.28, 0.7, -0.14);
        m8WheelGroup.rotation.x = -Math.PI / 6;

        const m8WheelTorus = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.02, 12, 32), darkMat);
        m8WheelGroup.add(m8WheelTorus);

        const metalSpokesMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.88, roughness: 0.2 });
        for (let sp = 0; sp < 3; sp++) {
          const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.16, 0.01), metalSpokesMat);
          spoke.rotation.z = (sp * Math.PI * 2) / 3;
          spoke.position.y = -0.04;
          m8WheelGroup.add(spoke);
        }

        const cyanCenterBadge = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.02, 16), lightsGlowingMat);
        cyanCenterBadge.rotation.x = Math.PI / 2;
        cyanCenterBadge.position.z = 0.012;
        m8WheelGroup.add(cyanCenterBadge);

        carVisualGroup.add(m8WheelGroup);

        // Huge Rear Aerodynamic GT Wing/Spoiler
        const spoilerDeck = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.05, 0.45), darkMat);
        spoilerDeck.position.set(0, 1.15, 1.4);
        
        const mountL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.42, 0.15), darkMat);
        mountL.position.set(-0.65, 0.94, 1.35);
        const mountR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.42, 0.15), darkMat);
        mountR.position.set(0.65, 0.94, 1.35);
        carVisualGroup.add(spoilerDeck, mountL, mountR);

        // Quad chrome exhausts
        [-0.38, 0.38].forEach((xOff) => {
          const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.28, 16), chromeMat);
          tip.rotation.x = Math.PI / 2;
          tip.position.set(xOff, 0.28, 1.68);
          carVisualGroup.add(tip);
        });

        const thruster = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 0.6, 16), darkMat);
        thruster.rotation.x = Math.PI / 2;
        thruster.position.set(0, 0.38, 1.68);
        carVisualGroup.add(thruster);

        const flame = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.8, 16), taillightMat);
        flame.rotation.x = -Math.PI / 2;
        flame.position.set(0, 0.38, 2.2);
        flame.name = "thrusterFlame";
        carVisualGroup.add(flame);

        // High-fidelity sport wheels + alloy details
        const wheelGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.42, 32);
        wheelGeo.rotateZ(Math.PI / 2);
        const rimCapGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.44, 32);
        rimCapGeo.rotateZ(Math.PI / 2);

        const wheelPositions = [
          { x: -0.92, y: 0.44, z: -1.02 },
          { x: 0.92, y: 0.44, z: -1.02 },
          { x: -0.92, y: 0.44, z: 1.02 },
          { x: 0.92, y: 0.44, z: 1.02 }
        ];

        wheelPositions.forEach((pos) => {
          const w = new THREE.Mesh(wheelGeo, tireMat);
          w.position.set(pos.x, pos.y, pos.z);
          
          const rim = new THREE.Mesh(rimCapGeo, darkMat);
          w.add(rim);

          // Beautiful detailed wheel spokes
          const spokesGroup = new THREE.Group();
          for (let sp = 0; sp < 8; sp++) {
            const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.24, 0.08), chromeMat);
            spoke.rotation.x = (sp * Math.PI) / 4;
            spokesGroup.add(spoke);
          }
          w.add(spokesGroup);

          // Inner brake rotor plate
          const rotor = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.02, 16), brakeDiscMat);
          rotor.rotateZ(Math.PI / 2);
          rotor.position.set(-0.06 * Math.sign(pos.x), 0, 0);
          w.add(rotor);

          carVisualGroup.add(w);
          wheels.push(w);

          // Stationary performance Brembo red brake calipers
          const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 0.14), redCaliperMat);
          caliper.position.set(pos.x + 0.02 * Math.sign(pos.x), pos.y + 0.16, pos.z + 0.12);
          carVisualGroup.add(caliper);
        });

      } else if (skinId === 'stellar_shadow') {
        // ----------------------------------------------------
        // STELLAR SHADOW (Anti-gravity floating spaceship yacht)
        // ----------------------------------------------------
        // Gorgeous organic curved hull shape
        const hullGeo = new THREE.CylinderGeometry(0.02, 1.0, 3.8, 32);
        hullGeo.rotateX(Math.PI / 2);
        hullGeo.scale(1.2, 0.38, 1);
        const bigShip = new THREE.Mesh(hullGeo, carBodyMat);
        bigShip.position.y = 0.52;
        carVisualGroup.add(bigShip);

        // Core pulsing glowing fusion orb
        const coreGeo = new THREE.SphereGeometry(0.35, 32, 24);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.95 });
        const core = new THREE.Mesh(coreGeo, coreMat);
        core.position.set(0, 0.52, 0.8);
        core.name = "starship_core_pulsing";
        carVisualGroup.add(core);

        // Sweeping pilot spaceship canopy
        const pilotCanopy = new THREE.Mesh(new THREE.SphereGeometry(0.48, 32, 24), glassMat);
        pilotCanopy.scale.set(1.15, 0.75, 2.6);
        pilotCanopy.position.set(0, 0.65, -0.4);
        carVisualGroup.add(pilotCanopy);

        // ----------------------------------------------------
        // STELLAR SHADOW SCI-FI HOVER COMMAND BRIDGE
        // ----------------------------------------------------
        // Metallic Titanium White spacecraft seats with pulsing neon core tubes
        const titaniumMat = new THREE.MeshPhysicalMaterial({
          color: 0xf8fafc,
          roughness: 0.1,
          metalness: 0.8,
          clearcoat: 1.0
        });
        [-1, 1].forEach((side) => {
          const seatX = side * 0.28;
          const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.08, 0.35), titaniumMat);
          cushion.position.set(seatX, 0.53, -0.05);

          const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.55, 0.11), titaniumMat);
          backrest.position.set(seatX, 0.78, 0.12);
          backrest.rotation.x = 0.14;

          const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.08), titaniumMat);
          headrest.position.set(seatX, 1.05, 0.16);
          headrest.rotation.x = 0.14;

          const centralNeonTube = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.46, 0.015), lightsGlowingMat);
          centralNeonTube.position.set(seatX, 0.78, 0.184);
          centralNeonTube.rotation.x = 0.14;

          carVisualGroup.add(cushion, backrest, headrest, centralNeonTube);
        });

        // Space Bridge main console
        const shipConsole = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.22, 0.34), titaniumMat);
        shipConsole.position.set(0, 0.72, -0.42);
        carVisualGroup.add(shipConsole);

        // Volumetric glowing navigation coordinate sphere
        const navSphereGeo = new THREE.SphereGeometry(0.09, 16, 12);
        const navSphereMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.7 });
        const navSphere = new THREE.Mesh(navSphereGeo, navSphereMat);
        navSphere.position.set(0, 0.82, -0.2);
        carVisualGroup.add(navSphere);

        // Starflight steering rod
        const shipSteerCol = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.34, 16), darkMat);
        shipSteerCol.rotation.x = -Math.PI / 6;
        shipSteerCol.position.set(-0.28, 0.65, -0.24);
        carVisualGroup.add(shipSteerCol);

        // Futuristic galactic flight bridge steering butterfly yoke (turns with steer controls!)
        const shipYokeGroup = new THREE.Group();
        shipYokeGroup.name = "steering_wheel";
        shipYokeGroup.position.set(-0.28, 0.7, -0.12);
        shipYokeGroup.rotation.x = -Math.PI / 6;

        const spaceWingL = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.024, 8, 16, Math.PI), lightsGlowingMat);
        spaceWingL.position.x = -0.06;
        spaceWingL.rotation.z = Math.PI / 2;
        const spaceWingR = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.024, 8, 16, Math.PI), lightsGlowingMat);
        spaceWingR.position.x = 0.06;
        spaceWingR.rotation.z = -Math.PI / 2;
        shipYokeGroup.add(spaceWingL, spaceWingR);

        const spaceHub = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 0.03), darkMat);
        shipYokeGroup.add(spaceHub);

        carVisualGroup.add(shipYokeGroup);

        // Double glowing laser headlights
        const l1 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.05, 0.05), lightsGlowingMat);
        l1.position.set(-0.4, 0.45, -1.82);
        const l2 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.05, 0.05), lightsGlowingMat);
        l2.position.set(0.4, 0.45, -1.82);
        carVisualGroup.add(l1, l2);

        // Continuous hypercar taillight bar across the back
        const redLedBar = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.04, 0.06), taillightMat);
        redLedBar.position.set(0, 0.58, 2.12);
        carVisualGroup.add(redLedBar);

        // Dual heavy rear ionic thruster nozzles
        const thruster = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.6, 24), darkMat);
        thruster.rotation.x = Math.PI / 2;
        thruster.position.set(0, 0.45, 1.5);
        carVisualGroup.add(thruster);

        const flame = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.8, 24), lightsGlowingMat);
        flame.rotation.x = -Math.PI / 2;
        flame.position.set(0, 0.45, 2.15);
        flame.name = "thrusterFlame";
        carVisualGroup.add(flame);

        // FLOATING MAGNETIC HOVER PADS (Horizontal levitation rings)
        const ringGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.12, 32);
        ringGeo.rotateX(Math.PI / 2);
        
        const hPadMat = new THREE.MeshPhysicalMaterial({
          color: 0x0b1122,
          roughness: 0.18,
          metalness: 0.95,
          clearcoat: 1.0,
        });

        const innerRimMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });

        const hoverPositions = [
          { x: -0.92, y: 0.28, z: -1.0 },
          { x: 0.92, y: 0.28, z: -1.0 },
          { x: -0.92, y: 0.28, z: 1.0 },
          { x: 0.92, y: 0.28, z: 1.0 }
        ];

        hoverPositions.forEach((pos) => {
          const hPad = new THREE.Mesh(ringGeo, hPadMat);
          hPad.position.set(pos.x, pos.y, pos.z);
          
          const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.15, 16), innerRimMat);
          ring.rotateX(Math.PI / 2);
          hPad.add(ring);

          carVisualGroup.add(hPad);
          wheels.push(hPad); // floating pads rotate under speed
        });

      } else {
        // ----------------------------------------------------
        // SHELBY MUSTANG GT500 V8 (Realistic 4K Muscle Car Coupe)
        // ----------------------------------------------------
        // Broad muscular lower chassis
        const baseChassis = new THREE.Mesh(new THREE.BoxGeometry(1.58, 0.42, 3.4), carBodyMat);
        baseChassis.position.y = 0.38;
        carVisualGroup.add(baseChassis);

        // Fender flares (Muscular bulging side skirts/fenders)
        const wheelArchL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.36, 1.2), carBodyMat);
        wheelArchL.position.set(-0.84, 0.38, -1.02);
        const wheelArchR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.36, 1.2), carBodyMat);
        wheelArchR.position.set(0.84, 0.38, -1.02);
        const wheelArchL2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.36, 1.2), carBodyMat);
        wheelArchL2.position.set(-0.84, 0.38, 1.02);
        const wheelArchR2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.36, 1.2), carBodyMat);
        wheelArchR2.position.set(0.84, 0.38, 1.02);
        carVisualGroup.add(wheelArchL, wheelArchR, wheelArchL2, wheelArchR2);

        // V8 Long aggressive hood (Bonnet with muscular dome scoops)
        const hood = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.22, 1.35), carBodyMat);
        hood.position.set(0, 0.52, -1.02);
        hood.rotation.x = 0.06; // slight slant forward
        carVisualGroup.add(hood);

        // Muscular central GT hood scoop
        const scoop = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.1, 0.65), carBodyMat);
        scoop.position.set(0, 0.64, -0.92);
        scoop.rotation.x = -0.05;
        carVisualGroup.add(scoop);

        // Front Nose / Grille Surround
        const nose = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.3, 0.18), carBodyMat);
        nose.position.set(0, 0.45, -1.68);
        carVisualGroup.add(nose);

        // Rear Fastback Cabin Structure (roof sloping rearward like a classic 1967 Mustang Fastback!)
        const cabinRoof = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.44, 1.45), glassMat);
        cabinRoof.position.set(0, 0.82, 0.15);
        carVisualGroup.add(cabinRoof);

        // Fastback sloped rear deck pillars
        const fastbackPillar = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.28, 0.95), carBodyMat);
        fastbackPillar.position.set(0, 0.66, 0.95);
        fastbackPillar.rotation.x = 0.38; // perfect slope downwards towards the trunk!
        carVisualGroup.add(fastbackPillar);

        // Rear Trunk Deck
        const trunk = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.25, 0.72), carBodyMat);
        trunk.position.set(0, 0.5, 1.35);
        carVisualGroup.add(trunk);

        // Integrated ducktail muscle spoiler
        const spoiler = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 0.2), carBodyMat);
        spoiler.position.set(0, 0.62, 1.6);
        spoiler.rotation.x = -0.15; // angled up
        carVisualGroup.add(spoiler);

        // Double Shelby Racing Stripes
        const isBodyVeryDark = carColor.r + carColor.g + carColor.b < 0.6;
        const stripeColor = isBodyVeryDark ? 0xffffff : 0x050510;
        const stripeMat = new THREE.MeshPhysicalMaterial({
          color: stripeColor,
          roughness: 0.15,
          metalness: 0.85
        });

        [-0.11, 0.11].forEach((xOff) => {
          const stripeHood = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.015, 1.34), stripeMat);
          stripeHood.position.set(xOff, 0.63, -1.02);
          stripeHood.rotation.x = 0.06;
          
          const stripeScoop = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.015, 0.64), stripeMat);
          stripeScoop.position.set(xOff, 0.69, -0.92);
          stripeScoop.rotation.x = -0.05;

          const stripeRoof = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.015, 1.44), stripeMat);
          stripeRoof.position.set(xOff, 1.04, 0.15);

          const stripeSlope = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.015, 0.94), stripeMat);
          stripeSlope.position.set(xOff, 0.8, 0.95);
          stripeSlope.rotation.x = 0.38;

          const stripeTrunk = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.015, 0.71), stripeMat);
          stripeTrunk.position.set(xOff, 0.61, 1.35);

          carVisualGroup.add(stripeHood, stripeScoop, stripeRoof, stripeSlope, stripeTrunk);
        });

        // ----------------------------------------------------
        // HIGH-FIDELITY ADDITIONS (Rocker Panel stripes, Side Scoops, Seats, Flares)
        // ----------------------------------------------------

        // Twin lateral stripes running along the bottom door rocker panel (G.T. 500 script styling)
        [-1, 1].forEach((side) => {
          // Broad lower stripe
          const broadStripe = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.04, 2.3), stripeMat);
          broadStripe.position.set(side * 0.81, 0.28, 0);
          
          // Thinner upper parallel line
          const thinStripe = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.01, 2.3), stripeMat);
          thinStripe.position.set(side * 0.81, 0.35, 0);

          // White or dark matching custom "G.T. 500" micro badge emblem
          const emblemColor = isBodyVeryDark ? 0xffffff : 0x050510;
          const emblemMat = new THREE.MeshBasicMaterial({ color: emblemColor });
          const badgeBox = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.024, 0.25), emblemMat);
          badgeBox.position.set(side * 0.812, 0.315, -0.4);

          carVisualGroup.add(broadStripe, thinStripe, badgeBox);
        });

        // Upper Rear-window side ventilation scoops (Sakura/Shelby fastback C-pillar louvers)
        [-1, 1].forEach((side) => {
          const upperScoop = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 0.35), carBodyMat);
          upperScoop.position.set(side * 0.59, 0.84, 0.7);
          upperScoop.rotation.y = side * 0.08;
          upperScoop.rotation.z = -side * 0.08;

          const louverVents = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.12, 0.34), darkMat);
          louverVents.position.set(side * 0.595, 0.84, 0.7);
          
          carVisualGroup.add(upperScoop, louverVents);
        });

        // Lower Rear-fender side intake ventilation scoops (in front of rear wheel arches)
        [-1, 1].forEach((side) => {
          const lowerScoop = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.24, 0.36), carBodyMat);
          lowerScoop.position.set(side * 0.82, 0.42, 0.45);
          lowerScoop.rotation.y = -side * 0.04;

          const scoopOpening = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.2, 0.02), darkMat);
          scoopOpening.position.set(side * 0.825, 0.42, 0.28);

          carVisualGroup.add(lowerScoop, scoopOpening);
        });

        // Ultra-precision luxury front bucket seats in deep charcoal leather (Visible inside canopy)
        const leatherUpholsteryMat = new THREE.MeshPhysicalMaterial({
          color: 0x141416,
          roughness: 0.45,
          metalness: 0.15,
          clearcoat: 0.1
        });

        [-1, 1].forEach((side) => {
          const xSeatOff = side * 0.25;

          // Seat Bottom Cushion
          const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.09, 0.38), leatherUpholsteryMat);
          cushion.position.set(xSeatOff, 0.55, -0.05);

          // Seat Backrest (Slightly tilted rearwards)
          const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.54, 0.11), leatherUpholsteryMat);
          backrest.position.set(xSeatOff, 0.78, 0.12);
          backrest.rotation.x = 0.14;

          // Seat Headrest
          const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.08), leatherUpholsteryMat);
          headrest.position.set(xSeatOff, 1.05, 0.16);
          headrest.rotation.x = 0.14;

          carVisualGroup.add(cushion, backrest, headrest);
        });

        // Retro Honeycomb Black Grille
        const grilleMesh = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.22, 0.04), darkMat);
        grilleMesh.position.set(0, 0.45, -1.74);
        carVisualGroup.add(grilleMesh);

        // Front Chrome Bumper bar
        const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.08, 0.12), chromeMat);
        frontBumper.position.set(0, 0.3, -1.74);
        carVisualGroup.add(frontBumper);

        // Classic Outer Round Headlights
        const head1 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 32), chromeMat);
        head1.rotation.x = Math.PI / 2;
        head1.position.set(-0.56, 0.45, -1.75);
        const head2 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 32), chromeMat);
        head2.rotation.x = Math.PI / 2;
        head2.position.set(0.56, 0.45, -1.75);
        carVisualGroup.add(head1, head2);

        // Volumetric Glow beam flare cones projecting from headlights (Additive blending!)
        const flareBeamGeom = new THREE.ConeGeometry(0.38, 1.6, 16);
        flareBeamGeom.rotateX(Math.PI / 2);
        flareBeamGeom.translate(0, 0, -0.8);
        
        const volumetricFlareMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.14,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        [-0.56, 0.56].forEach((xOff) => {
          const flareCone = new THREE.Mesh(flareBeamGeom, volumetricFlareMat);
          flareCone.position.set(xOff, 0.45, -1.76);
          carVisualGroup.add(flareCone);
        });

        // Middle Twin Fog/Driving lights (the classic Shelby look in 32-seg round circular detail!)
        const fog1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.04, 32), goldGlowMat);
        fog1.rotation.x = Math.PI / 2;
        fog1.position.set(-0.16, 0.45, -1.75);
        const fog2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.04, 32), goldGlowMat);
        fog2.rotation.x = Math.PI / 2;
        fog2.position.set(0.16, 0.45, -1.75);
        carVisualGroup.add(fog1, fog2);

        // Foglight high-intensity yellow volumetric beam projection flares!
        const fogFlareMat = new THREE.MeshBasicMaterial({
          color: 0xffea99,
          transparent: true,
          opacity: 0.18,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        
        [-0.16, 0.16].forEach((xOff) => {
          const fogCone = new THREE.Mesh(flareBeamGeom, fogFlareMat);
          fogCone.position.set(xOff, 0.45, -1.76);
          carVisualGroup.add(fogCone);
        });

        // Console/Dashboard block
        const dashboard = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.24, 0.3), darkMat);
        dashboard.position.set(0, 0.72, -0.38);
        carVisualGroup.add(dashboard);

        // Steer console tube
        const steerColumn = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.38, 16), darkMat);
        steerColumn.rotation.x = -Math.PI / 6;
        steerColumn.position.set(-0.28, 0.65, -0.22);
        carVisualGroup.add(steerColumn);

        // Shelby Wood-Rimmed retro Steering wheel!
        const steerWheelGroup = new THREE.Group();
        steerWheelGroup.name = "steering_wheel";
        steerWheelGroup.position.set(-0.28, 0.7, -0.12);
        steerWheelGroup.rotation.x = -Math.PI / 6;

        const woodMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.1 });
        const spokesMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9, roughness: 0.1 });
        
        const wheelTorus = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.02, 12, 32), woodMat);
        steerWheelGroup.add(wheelTorus);

        for (let sp = 0; sp < 3; sp++) {
          const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.16, 0.01), spokesMat);
          spoke.rotation.z = (sp * Math.PI * 2) / 3;
          spoke.position.y = -0.04;
          steerWheelGroup.add(spoke);
        }
        carVisualGroup.add(steerWheelGroup);

        // Rear Chrome bumper bar
        const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.08, 0.12), chromeMat);
        rearBumper.position.set(0, 0.32, 1.7);
        carVisualGroup.add(rearBumper);

        // Iconic vertical triple taillights (left and right)
        const bulbMat = new THREE.MeshBasicMaterial({ color: 0xff0022 });
        [-1, 1].forEach((side) => {
          const groupLight = new THREE.Group();
          [-0.08, 0, 0.08].forEach((xOff) => {
            const lensBar = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.12, 0.03), bulbMat);
            lensBar.position.set(xOff, 0, 0);
            groupLight.add(lensBar);
          });
          groupLight.position.set(side * 0.44, 0.52, 1.71);
          carVisualGroup.add(groupLight);
        });

        // Retro circular chrome gas cap in the middle
        const gasCap = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.02, 32), chromeMat);
        gasCap.rotation.x = Math.PI / 2;
        gasCap.position.set(0, 0.52, 1.71);
        carVisualGroup.add(gasCap);

        // Retro chrome side/rear exhaust tips
        [-0.45, 0.45].forEach((xOff) => {
          const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.35, 16), chromeMat);
          tip.rotation.x = Math.PI / 2;
          tip.position.set(xOff, 0.24, 1.62);
          carVisualGroup.add(tip);
        });

        // Booster and flame engines
        const thruster = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.12, 0.4, 16), darkMat);
        thruster.rotation.x = Math.PI / 2;
        thruster.position.set(0, 0.26, 1.6);
        thruster.name = "thruster";
        carVisualGroup.add(thruster);

        const flame = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.75, 16), lightsGlowingMat);
        flame.rotation.x = -Math.PI / 2;
        flame.position.set(0, 0.26, 2.15);
        flame.name = "thrusterFlame";
        carVisualGroup.add(flame);

        // 4K Ultra-detailed circular wheels (Rubber tyres, dynamic chrome alloy spokes & brake calipers)
        const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.38, 32);
        wheelGeo.rotateZ(Math.PI / 2);
        const rimCapGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.4, 32);
        rimCapGeo.rotateZ(Math.PI / 2);

        const wheelPositions = [
          { x: -0.92, y: 0.42, z: -1.02 },
          { x: 0.92, y: 0.42, z: -1.02 },
          { x: -0.92, y: 0.42, z: 1.02 },
          { x: 0.92, y: 0.42, z: 1.02 }
        ];

        wheelPositions.forEach((pos) => {
          const w = new THREE.Mesh(wheelGeo, tireMat);
          w.position.set(pos.x, pos.y, pos.z);
          
          const rim = new THREE.Mesh(rimCapGeo, chromeMat);
          w.add(rim);

          // Beautiful custom 3D alloy spokes spinning inside the tire
          const spokesGroup = new THREE.Group();
          for (let sp = 0; sp < 6; sp++) {
            const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.24, 0.08), chromeMat);
            spoke.rotation.x = (sp * Math.PI * 2) / 6;
            spokesGroup.add(spoke);
          }
          w.add(spokesGroup);

          // Inner brake rotor plate
          const rotor = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.02, 16), brakeDiscMat);
          rotor.rotateZ(Math.PI / 2);
          rotor.position.set(-0.06 * Math.sign(pos.x), 0, 0);
          w.add(rotor);

          carVisualGroup.add(w);
          wheels.push(w);

          // Stationary performance red caliber staying perfectly level
          const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.18, 0.12), redCaliperMat);
          caliper.position.set(pos.x + 0.02 * Math.sign(pos.x), pos.y + 0.16, pos.z + 0.12);
          carVisualGroup.add(caliper);
        });
      }
    };

    // Initial build of the default car shape
    rebuildPlayerCar(selectedSkinIdRef.current, selectedSkinColorRef.current);

    // ----------------------------------------------------
    // 6. ENTITIES & SPAWNERS (Traffic obstacles & collectibles)
    // ----------------------------------------------------
    const obstacleLanesX = [-4.6, 0, 4.6]; // 3 lanes
    let activeObstacles: any[] = [];
    let activeCoins: any[] = [];
    
    // Geometry templates
    const sedanChassisGeo = new THREE.BoxGeometry(1.5, 0.6, 3.1);
    const truckChassisGeo = new THREE.BoxGeometry(1.9, 1.8, 5.0);
    const sportChassisGeo = new THREE.BoxGeometry(1.6, 0.45, 3.3);

    // Spawn an Obstacle Mesh Group (Supports moving obstacles & rocks with spinning wheels)
    const spawnObstacle = (lane: number, zDistance: number) => {
      const obstacleGroup = new THREE.Group();
      
      const currentStage = stageLevelRef.current || 1;
      let type: 'sedan' | 'truck' | 'sport' | 'rock';
      
      if (currentStage === 1) {
        // Only standard commuter sedans in the entry level
        type = 'sedan';
      } else if (currentStage === 2) {
        // Toxic zone includes slow-moving massive cargo trucks
        type = Math.random() < 0.6 ? 'sedan' : 'truck';
      } else if (currentStage === 3) {
        // Sunset speedy highway includes fast racing sportscars
        const r = Math.random();
        type = r < 0.35 ? 'sedan' : (r < 0.65 ? 'truck' : 'sport');
      } else if (currentStage === 4) {
        // Frozen Glacier fields introduce frozen geometric obstacles
        type = Math.random() < 0.5 ? 'sedan' : 'rock';
      } else if (currentStage === 5) {
        // Golden Sands features heavy cargo trucks carrying valuables and desert rocks
        const r = Math.random();
        type = r < 0.3 ? 'sedan' : (r < 0.65 ? 'truck' : 'rock');
      } else if (currentStage === 6) {
        // Plasma tempest storms feature high velocity sports cars
        type = Math.random() < 0.3 ? 'sedan' : 'sport';
      } else if (currentStage === 7) {
        // Burning magma features heavy trucks and hot magma stones
        const r = Math.random();
        type = r < 0.4 ? 'rock' : (r < 0.75 ? 'truck' : 'sport');
      } else {
        // Void stage has random equal chance of everything
        const types: ('sedan' | 'truck' | 'sport' | 'rock')[] = ['sedan', 'truck', 'sport', 'rock'];
        type = types[Math.floor(Math.random() * types.length)];
      }
      
      let mainColor = 0xff3300;
      let heightOffset = 0.45;
      let length = 3.1;
      let meshObj: THREE.Mesh;
      const wheelsList: THREE.Mesh[] = [];

      const oWheelGeoEx = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 12);
      oWheelGeoEx.rotateZ(Math.PI / 2);
      const oWheelMatEx = new THREE.MeshStandardMaterial({ color: 0x111116, roughness: 0.85, metalness: 0.3 });

      const stageColors = getStageObstacleColors(currentStage);

      if (type === 'sedan') {
        const bodies = stageColors.bodies;
        mainColor = bodies[Math.floor(Math.random() * bodies.length)];
        const isTaxi = currentStage === 1 && Math.random() < 0.35;
        const isPolice = !isTaxi && Math.random() < 0.22;
        
        if (isTaxi) {
          mainColor = 0xf5b041;
        } else if (isPolice) {
          mainColor = 0x090d16;
        }

        const mat = new THREE.MeshPhysicalMaterial({
          color: mainColor,
          metalness: 0.9,
          roughness: 0.12,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          reflectivity: 1.0
        });
        meshObj = new THREE.Mesh(sedanChassisGeo, mat);
        heightOffset = 0.45;
        obstacleGroup.add(meshObj);
        
        // Glass windshield / cabin structure
        const cabinMat = new THREE.MeshPhysicalMaterial({ 
          color: isPolice ? 0xe2e8f0 : 0x070110,
          roughness: 0.05,
          metalness: 0.95,
          clearcoat: 1.0,
          transparent: true,
          opacity: 0.85
        });
        const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.42, 1.3), cabinMat);
        cabin.position.set(0, 0.5, 0.0);
        obstacleGroup.add(cabin);

        // Realistic front grill
        const frontGrill = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.15, 0.05), new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.6 }));
        frontGrill.position.set(0, 0.25, -length / 2 - 0.01);
        obstacleGroup.add(frontGrill);

        // Realistic side mirrors
        const mirrorL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.1), mat);
        mirrorL.position.set(-0.82, 0.38, -0.3);
        const mirrorR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.1), mat);
        mirrorR.position.set(0.82, 0.38, -0.3);
        obstacleGroup.add(mirrorL, mirrorR);

        const accentCol = isPolice ? stageColors.glow : stageColors.accent;
        const stripeL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 2.7), new THREE.MeshBasicMaterial({ color: accentCol }));
        stripeL.position.set(-0.76, 0.35, 0);
        const stripeR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 2.7), new THREE.MeshBasicMaterial({ color: accentCol }));
        stripeR.position.set(0.76, 0.35, 0);
        obstacleGroup.add(stripeL, stripeR);

        if (isTaxi) {
          const taxiSign = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.16, 0.16), new THREE.MeshBasicMaterial({ color: 0xffd700 }));
          taxiSign.position.set(0, 0.72, 0.0);
          obstacleGroup.add(taxiSign);
        } else if (isPolice) {
          const sirenGroup = new THREE.Group();
          sirenGroup.name = "policeSirenGroup";
          sirenGroup.position.set(0, 0.72, 0.0);
          
          const sirenL = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.08, 0.12), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
          sirenL.position.x = -0.16;
          const sirenR = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.08, 0.12), new THREE.MeshBasicMaterial({ color: 0x3b82f6 }));
          sirenR.position.x = 0.16;
          
          sirenGroup.add(sirenL, sirenR);
          obstacleGroup.add(sirenGroup);
        } else {
          const underglow = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.02, 2.8), new THREE.MeshBasicMaterial({
            color: stageColors.glow,
            transparent: true,
            opacity: 0.55
          }));
          underglow.position.set(0, 0.02, 0);
          obstacleGroup.add(underglow);
        }

        // Taillights (Matrix lightbar with glowing volumetric trail cones)
        const tlGroup = new THREE.Group();
        const tl = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.1, 0.08), new THREE.MeshBasicMaterial({ color: 0xff0044 }));
        tl.position.set(0, 0.35, length / 2 + 0.02);
        tlGroup.add(tl);

        const sedanFlareGeo = new THREE.ConeGeometry(0.35, 2.5, 8);
        sedanFlareGeo.rotateX(-Math.PI / 2); // point backward
        sedanFlareGeo.translate(0, 0, 1.25); // center pivot

        const sedanFlareMat = new THREE.MeshBasicMaterial({
          color: 0xff0022,
          transparent: true,
          opacity: 0.25,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        [-0.45, 0.45].forEach((xOff) => {
          const flare = new THREE.Mesh(sedanFlareGeo, sedanFlareMat);
          flare.position.set(xOff, 0.35, length / 2 + 0.03);
          tlGroup.add(flare);
        });
        obstacleGroup.add(tlGroup);

        // Headlights (glowing LED blocks)
        const headL = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.1, 0.08), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        headL.position.set(-0.54, 0.32, -length / 2 - 0.02);
        const headR = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.1, 0.08), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        headR.position.set(0.54, 0.32, -length / 2 - 0.02);
        obstacleGroup.add(headL, headR);

        const rimCapGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.32, 6);
        rimCapGeo.rotateZ(Math.PI / 2);
        const rimCapMat = new THREE.MeshBasicMaterial({ color: accentCol, wireframe: true });

        [-1.0, 1.0].forEach((wheelZ) => {
          [-0.85, 0.85].forEach((wheelX) => {
            const w = new THREE.Mesh(oWheelGeoEx, oWheelMatEx);
            w.position.set(wheelX, 0.35, wheelZ);

            const rim = new THREE.Mesh(rimCapGeo, rimCapMat);
            w.add(rim);

            obstacleGroup.add(w);
            wheelsList.push(w);
          });
        });

      } else if (type === 'truck') {
        const bodies = stageColors.bodies;
        mainColor = bodies[Math.floor(Math.random() * bodies.length)];
        const mat = new THREE.MeshPhysicalMaterial({
          color: mainColor,
          metalness: 0.82,
          roughness: 0.2,
          clearcoat: 0.8,
          clearcoatRoughness: 0.1
        });
        meshObj = new THREE.Mesh(truckChassisGeo, mat);
        heightOffset = 1.05;
        obstacleGroup.add(meshObj);

        // Realistic chrome engine front grill for Volvo/Peterbilt truck feel
        const truckGrill = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.0, 0.08), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 }));
        truckGrill.position.set(0, 0.5, -2.52);
        obstacleGroup.add(truckGrill);

        // Realistic truck cabin side mirrors
        const mirrorL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.42, 0.12), new THREE.MeshStandardMaterial({ color: 0x141416 }));
        mirrorL.position.set(-1.02, 1.1, -1.6);
        const mirrorR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.42, 0.12), new THREE.MeshStandardMaterial({ color: 0x141416 }));
        mirrorR.position.set(1.02, 1.1, -1.6);
        obstacleGroup.add(mirrorL, mirrorR);

        // Glowing orange safety roof marker lights
        [-0.52, 0, 0.52].forEach((xOff) => {
          const markerLight = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffaa00 }));
          markerLight.position.set(xOff, 1.84, -1.5);
          obstacleGroup.add(markerLight);
        });
        
        const pipeL = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.5, 4), new THREE.MeshStandardMaterial({ color: 0x9c9c9c, metalness: 0.9 }));
        pipeL.position.set(-0.8, 1.3, -1.8);
        const pipeR = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.5, 4), new THREE.MeshStandardMaterial({ color: 0x9c9c9c, metalness: 0.9 }));
        pipeR.position.set(0.8, 1.3, -1.8);
        
        const smokeColor = stageColors.smoke;
        const smokeL = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.4, 4), new THREE.MeshBasicMaterial({ color: smokeColor, transparent: true, opacity: 0.6 }));
        smokeL.name = "smokeCone";
        smokeL.position.set(-0.8, 2.15, -1.8);
        
        const smokeR = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.4, 4), new THREE.MeshBasicMaterial({ color: smokeColor, transparent: true, opacity: 0.6 }));
        smokeR.name = "smokeCone";
        smokeR.position.set(0.8, 2.15, -1.8);
        obstacleGroup.add(pipeL, pipeR, smokeL, smokeR);

        // Random cargo choice
        const isTanker = Math.random() < 0.5;
        if (isTanker) {
          const tankGeo = new THREE.CylinderGeometry(0.85, 0.85, 3.4, 12);
          tankGeo.rotateX(Math.PI / 2);
          const tankMat = new THREE.MeshStandardMaterial({ 
            color: 0x111116, 
            emissive: stageColors.glow,
            emissiveIntensity: 0.5,
            metalness: 0.95, 
            roughness: 0.08 
          });
          const tank = new THREE.Mesh(tankGeo, tankMat);
          tank.position.set(0, 0.35, 0.8);
          obstacleGroup.add(tank);
          
          const ringGeo = new THREE.TorusGeometry(0.88, 0.04, 4, 16);
          ringGeo.rotateX(Math.PI / 2);
          const ringMat = new THREE.MeshBasicMaterial({ color: stageColors.glow });

          [-1.1, 0, 1.1].forEach((offsetZ) => {
            const rx = new THREE.Mesh(ringGeo, ringMat);
            rx.name = "tankerBand";
            rx.position.set(0, 0.35, 0.8 + offsetZ);
            obstacleGroup.add(rx);
          });
          
          const tankAcc = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 3.5), new THREE.MeshBasicMaterial({ color: stageColors.accent }));
          tankAcc.position.set(0, 0.35, 0.8);
          obstacleGroup.add(tankAcc);
        } else {
          const cargo = new THREE.Mesh(new THREE.BoxGeometry(1.85, 1.35, 3.4), new THREE.MeshStandardMaterial({ color: 0x7c7c82, roughness: 0.5, metalness: 0.3 }));
          cargo.position.set(0, 0.3, 0.8);
          obstacleGroup.add(cargo);

          const chevronMat = new THREE.MeshBasicMaterial({ color: stageColors.glow, transparent: true, opacity: 0.82 });
          const indicatorL = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.48, 1.8), chevronMat);
          indicatorL.name = "hazardGlow";
          indicatorL.position.set(-0.94, 0.3, 0.8);

          const indicatorR = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.48, 1.8), chevronMat);
          indicatorR.name = "hazardGlow";
          indicatorR.position.set(0.94, 0.3, 0.8);
          
          obstacleGroup.add(indicatorL, indicatorR);
        }

        // Realistic giant dual vertical and horizontal back lights for massive truck presence
        const truckTlGroup = new THREE.Group();
        
        // Horizontal bumper lightbar
        const bottomBar = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 0.08), new THREE.MeshBasicMaterial({ color: 0xff0033 }));
        bottomBar.position.set(0, 0.2, length / 2 + 0.04);
        truckTlGroup.add(bottomBar);

        // Left/Right tall vertical safety brake lightbars
        [-0.85, 0.85].forEach((xOff) => {
          const verticalBar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.2, 0.08), new THREE.MeshBasicMaterial({ color: 0xff0044 }));
          verticalBar.position.set(xOff, 0.8, length / 2 + 0.04);
          truckTlGroup.add(verticalBar);
        });

        // Double massive truck exhaust trail flares (red indicators)
        const truckFlareGeo = new THREE.ConeGeometry(0.45, 3.5, 8);
        truckFlareGeo.rotateX(-Math.PI / 2);
        truckFlareGeo.translate(0, 0, 1.75);

        const truckFlareMat = new THREE.MeshBasicMaterial({
          color: 0xff0022,
          transparent: true,
          opacity: 0.28,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        [-0.6, 0.6].forEach((xOff) => {
          const flare = new THREE.Mesh(truckFlareGeo, truckFlareMat);
          flare.position.set(xOff, 0.2, length / 2 + 0.05);
          truckTlGroup.add(flare);
        });

        obstacleGroup.add(truckTlGroup);

        const truckUnderglow = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.02, 4.4), new THREE.MeshBasicMaterial({
          color: stageColors.glow,
          transparent: true,
          opacity: 0.4
        }));
        truckUnderglow.position.set(0, 0.02, 0);
        obstacleGroup.add(truckUnderglow);

        const rimCapGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.32, 6);
        rimCapGeo.rotateZ(Math.PI / 2);
        const rimCapMat = new THREE.MeshBasicMaterial({ color: stageColors.accent, wireframe: true });

        [-1.6, 0.1, 1.8].forEach((wheelZ) => {
          [-0.96, 0.96].forEach((wheelX) => {
            const w = new THREE.Mesh(oWheelGeoEx, oWheelMatEx);
            w.position.set(wheelX, 0.35, wheelZ);

            const rim = new THREE.Mesh(rimCapGeo, rimCapMat);
            w.add(rim);

            obstacleGroup.add(w);
            wheelsList.push(w);
          });
        });

      } else if (type === 'sport') {
        const bodies = stageColors.bodies;
        mainColor = bodies[Math.floor(Math.random() * bodies.length)];
        const mat = new THREE.MeshPhysicalMaterial({
          color: mainColor,
          metalness: 0.94,
          roughness: 0.08,
          clearcoat: 1.0,
          clearcoatRoughness: 0.02,
          reflectivity: 1.0
        });
        meshObj = new THREE.Mesh(sportChassisGeo, mat);
        heightOffset = 0.38;
        obstacleGroup.add(meshObj);

        // Low aerodynamic slanted front nose (Lamborghini supercar feel)
        const lowNose = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.18, 0.95), mat);
        lowNose.position.set(0, 0.22, -1.25);
        lowNose.rotation.x = 0.12;
        obstacleGroup.add(lowNose);

        // Sleek side mirror mirrors
        const mirrorL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.06, 0.12), new THREE.MeshBasicMaterial({ color: 0x111115 }));
        mirrorL.position.set(-0.85, 0.42, -0.4);
        const mirrorR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.06, 0.12), new THREE.MeshBasicMaterial({ color: 0x111115 }));
        mirrorR.position.set(0.85, 0.42, -0.4);
        obstacleGroup.add(mirrorL, mirrorR);

        const cabinMat = new THREE.MeshPhysicalMaterial({ 
          color: 0x07010f, 
          roughness: 0.02, 
          metalness: 0.98, 
          clearcoat: 1.0,
          transparent: true, 
          opacity: 0.9 
        });
        const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.38, 1.6), cabinMat);
        cabin.position.set(0, 0.42, -0.15);
        obstacleGroup.add(cabin);
        
        const spoilerStyle = Math.floor(Math.random() * 3);
        if (spoilerStyle === 0) {
          const wLine1 = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.06, 0.25), mat);
          wLine1.position.set(0, 0.58, 1.15);
          const wLine2 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.04, 0.2), new THREE.MeshBasicMaterial({ color: stageColors.glow }));
          wLine2.name = "flickerLight";
          wLine2.position.set(0, 0.72, 1.15);
          obstacleGroup.add(wLine1, wLine2);
        } else if (spoilerStyle === 1) {
          const wLine = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.06, 0.3), mat);
          wLine.position.set(0, 0.62, 1.15);
          const strut1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.15), mat);
          strut1.position.set(-0.65, 0.51, 1.15);
          const strut2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.15), mat);
          strut2.position.set(0.65, 0.51, 1.15);
          obstacleGroup.add(wLine, strut1, strut2);
        } else {
          const wLine = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.06, 0.22), new THREE.MeshBasicMaterial({ color: stageColors.accent }));
          wLine.name = "flickerLight";
          wLine.position.set(0, 0.56, 1.05);
          obstacleGroup.add(wLine);
        }

        // Realistic chrome dual active exhausts + twin fiery flames
        const ePipeL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.35), new THREE.MeshBasicMaterial({ color: 0xcbd5e1 }));
        ePipeL.rotateX(Math.PI / 2);
        ePipeL.position.set(-0.35, 0.18, 1.62);
        
        const ePipeR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.35), new THREE.MeshBasicMaterial({ color: 0xcbd5e1 }));
        ePipeR.rotateX(Math.PI / 2);
        ePipeR.position.set(0.35, 0.18, 1.62);

        const sportFireL = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.5, 8), new THREE.MeshBasicMaterial({ color: stageColors.glow, transparent: true, opacity: 0.82 }));
        sportFireL.name = "sportExhaustFlame";
        sportFireL.rotateX(-Math.PI / 2);
        sportFireL.position.set(-0.35, 0.18, 1.95);

        const sportFireR = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.5, 8), new THREE.MeshBasicMaterial({ color: stageColors.glow, transparent: true, opacity: 0.82 }));
        sportFireR.name = "sportExhaustFlame";
        sportFireR.rotateX(-Math.PI / 2);
        sportFireR.position.set(0.35, 0.18, 1.95);

        obstacleGroup.add(ePipeL, ePipeR, sportFireL, sportFireR);

        // Supercar active matrix taillights: Chevron/Winglet split shape with real trailing volumetric flares
        const sportTlGroup = new THREE.Group();
        
        // Centered glowing bar
        const centerBar = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.06, 0.06), new THREE.MeshBasicMaterial({ color: 0xff0066 }));
        centerBar.position.set(0, 0.28, length / 2 + 0.02);
        sportTlGroup.add(centerBar);

        // Angled side ribbon elements
        [-0.6, 0.6].forEach((side) => {
          const winglet = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.06, 0.08), new THREE.MeshBasicMaterial({ color: 0xff0033 }));
          winglet.position.set(side, 0.32, length / 2 + 0.02);
          winglet.rotation.z = side * 0.25; // Angled down wings like a Hypercar
          sportTlGroup.add(winglet);
        });

        // Fiery exhaust trail flares
        const sportFlareGeo = new THREE.ConeGeometry(0.32, 2.8, 8);
        sportFlareGeo.rotateX(-Math.PI / 2);
        sportFlareGeo.translate(0, 0, 1.4);

        const sportFlareMat = new THREE.MeshBasicMaterial({
          color: 0xff0066,
          transparent: true,
          opacity: 0.3,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        [-0.35, 0.35].forEach((xOff) => {
          const flare = new THREE.Mesh(sportFlareGeo, sportFlareMat);
          flare.position.set(xOff, 0.18, length / 2 + 0.03);
          sportTlGroup.add(flare);
        });

        obstacleGroup.add(sportTlGroup);

        const sportUnderglow = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.02, 3.0), new THREE.MeshBasicMaterial({
          color: stageColors.glow,
          transparent: true,
          opacity: 0.75
        }));
        sportUnderglow.position.set(0, 0.02, 0);
        obstacleGroup.add(sportUnderglow);

        const rimCapGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.32, 6);
        rimCapGeo.rotateZ(Math.PI / 2);
        const rimCapMat = new THREE.MeshBasicMaterial({ color: stageColors.glow, wireframe: true });

        [-1.0, 1.0].forEach((wheelZ) => {
          [-0.85, 0.85].forEach((wheelX) => {
            const w = new THREE.Mesh(oWheelGeoEx, oWheelMatEx);
            w.position.set(wheelX, 0.35, wheelZ);

            const rim = new THREE.Mesh(rimCapGeo, rimCapMat);
            w.add(rim);

            obstacleGroup.add(w);
            wheelsList.push(w);
          });
        });

      } else if (type === 'rock') {
        const currentStage = stageLevelRef.current || 1;
        let rockColor = 0x223344;
        let glowColor = 0xff00aa;
        let emissiveIntensity = 0.35;
        
        if (currentStage === 4) {
          // Glacier valley - Icy rocks!
          rockColor = 0xd0efff;
          glowColor = 0x88ccff;
          emissiveIntensity = 0.75;
        } else if (currentStage === 7) {
          // Magma volcano - Flaming lava stones!
          rockColor = 0x1a0500;
          glowColor = 0xff4500;
          emissiveIntensity = 1.3;
        } else if (currentStage === 5) {
          // Golden Desert - Sandy bronze pyramids/blocks!
          rockColor = 0x78350f;
          glowColor = 0xf59e0b;
          emissiveIntensity = 0.6;
        }

        // True holographic kiber-tosh obstacle which rotates and swings
        const rockGeo = new THREE.DodecahedronGeometry(1.1, 1);
        const rockMat = new THREE.MeshStandardMaterial({
          color: rockColor,
          emissive: glowColor,
          emissiveIntensity: emissiveIntensity,
          roughness: 0.82,
          metalness: 0.25
        });
        meshObj = new THREE.Mesh(rockGeo, rockMat);
        meshObj.position.y = 1.0;
        obstacleGroup.add(meshObj);

        // Neon outline/wireframe layer for cyber aesthetic pulsations
        const wireMat = new THREE.MeshBasicMaterial({
          color: glowColor,
          wireframe: true,
          transparent: true,
          opacity: 0.5
        });
        const wireframeMesh = new THREE.Mesh(rockGeo, wireMat);
        wireframeMesh.name = "wireframeOutline";
        wireframeMesh.position.y = 1.0;
        wireframeMesh.scale.multiplyScalar(1.05);
        obstacleGroup.add(wireframeMesh);

        // Spawning 4 active orbital crystal shards circling the core cyber anomaly
        const shardGeo = new THREE.TetrahedronGeometry(0.3, 0);
        const shardMat = new THREE.MeshStandardMaterial({
          color: rockColor,
          emissive: glowColor,
          emissiveIntensity: emissiveIntensity * 1.5,
          roughness: 0.2,
          metalness: 0.9
        });
        
        for (let idx = 0; idx < 4; idx++) {
          const shard = new THREE.Mesh(shardGeo, shardMat);
          shard.name = `shard_${idx}`;
          const angle = (idx * Math.PI) / 2;
          shard.position.set(Math.cos(angle) * 1.6, 1.0, Math.sin(angle) * 1.6);
          obstacleGroup.add(shard);
        }

        heightOffset = 1.0;
        length = 2.2;
      }

      obstacleGroup.position.set(obstacleLanesX[lane], -0.1, zDistance);
      scene.add(obstacleGroup);

      // Swing and movement variables: Cars are driving forward, rocks are stationary
      let speed = 0;
      if (type === 'sedan') {
        speed = 8.0 + Math.random() * 8.0; // Drives forward: moves 8-16 units per second
      } else if (type === 'truck') {
        speed = 4.0 + Math.random() * 6.0; // Drives forward: moves 4-10 units per second
      } else if (type === 'sport') {
        speed = 14.0 + Math.random() * 12.0; // Drives forward: moves 14-26 units per second
      } else if (type === 'rock') {
        speed = 0; // Stationary floating cyber rock obstacle
      }

      // Level-specific swing drift parameters to gradually shape difficulty
      let swingSpeed = 0;
      let swingRange = 0;

      if (type === 'rock') {
        // Rocks always float and swing slightly
        swingSpeed = 1.2 + Math.random() * 2.2;
        // High level rocks oscillate with greater frequency and sweep width
        swingRange = (currentStage >= 4) ? 1.4 + Math.random() * 1.4 : 0.7 + Math.random() * 0.7;
      } else {
        // Commuter and racing traffic vehicles
        if (currentStage >= 6) {
          // Storms & gravity fields in level 6, 7 and 8 force drifting/swerving across boundaries
          swingSpeed = 1.1 + Math.random() * 1.8;
          swingRange = 1.0 + Math.random() * 1.3;
        } else if (currentStage >= 3) {
          // Mild highway wind-drifts
          swingSpeed = 0.5 + Math.random() * 1.0;
          swingRange = 0.3 + Math.random() * 0.4;
        } else {
          // Basic levels: traffic stays dead-center in lanes to let users get accustomed to maneuvering
          swingSpeed = 0;
          swingRange = 0;
        }
      }

      activeObstacles.push({
        lane,
        group: obstacleGroup,
        type,
        speed,
        wheels: wheelsList,
        swingSpeed,
        swingRange,
        rotX: type === 'rock' ? (Math.random() - 0.5) * 2.5 : 0,
        rotY: type === 'rock' ? (Math.random() - 0.5) * 2.5 : 0,
        rotZ: type === 'rock' ? (Math.random() - 0.5) * 2.5 : 0,
        heightOffset,
        width: type === 'truck' ? 2.0 : (type === 'rock' ? 2.2 : 1.6),
        length: type === 'truck' ? 5.2 : (type === 'rock' ? 2.2 : 3.3),
        z: zDistance
      });
    };

    // Spawning target Gold coins or power-ups
    // A beautiful double-layered coin structure: an outer shiny gold Torus and a dense glowing copper Cylinder core!
    const coinOuterGeo = new THREE.TorusGeometry(0.44, 0.09, 10, 24);
    const coinOuterMat = new THREE.MeshStandardMaterial({
      color: 0xffd700, // Rich physical gold
      metalness: 1.0,
      roughness: 0.05,
      emissive: 0xb58900,
      emissiveIntensity: 0.35
    });

    const coinInnerGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.06, 16);
    coinInnerGeo.rotateX(Math.PI / 2);
    const coinInnerMat = new THREE.MeshStandardMaterial({
      color: 0xffaa00, // bronze/orange core
      metalness: 1.0,
      roughness: 0.08,
      emissive: 0xff3300,
      emissiveIntensity: 0.2
    });

    const shieldPowerupGeo = new THREE.OctahedronGeometry(0.5, 0);
    const shieldPowerupMat = new THREE.MeshStandardMaterial({
      color: 0x00ff88,
      metalness: 0.9,
      roughness: 0.1
    });

    const turboPowerupGeo = new THREE.ConeGeometry(0.35, 0.9, 4);
    turboPowerupGeo.rotateX(Math.PI);
    const turboPowerupMat = new THREE.MeshStandardMaterial({
      color: 0xffbb00,
      metalness: 0.9,
      roughness: 0.1
    });

    const spawnCoin = (lane: number, zDistance: number, type: 'gold' | 'shield_powerup' | 'turbo_powerup' = 'gold') => {
      let mesh: THREE.Object3D;
      if (type === 'shield_powerup') {
        mesh = new THREE.Mesh(shieldPowerupGeo, shieldPowerupMat);
      } else if (type === 'turbo_powerup') {
        mesh = new THREE.Mesh(turboPowerupGeo, turboPowerupMat);
      } else {
        // Compose high quality coin group
        const coinGroup = new THREE.Group();
        const outer = new THREE.Mesh(coinOuterGeo, coinOuterMat);
        const inner = new THREE.Mesh(coinInnerGeo, coinInnerMat);
        coinGroup.add(outer);
        coinGroup.add(inner);
        mesh = coinGroup;
      }

      mesh.position.set(obstacleLanesX[lane], 0.6, zDistance);
      scene.add(mesh);

      activeCoins.push({
        lane,
        mesh,
        type,
        collected: false,
        z: zDistance
      });
    };

    // ----------------------------------------------------
    // 7. SPARKS & EXPLOSION PARTICLE ENGINE
    // ----------------------------------------------------
    let activeParticles: any[] = [];
    const pGeo = new THREE.BoxGeometry(0.1, 0.1, 0.1);

    const createExplosion = (posX: number, posY: number, posZ: number, count = 25, color = 0xff5500) => {
      const pMat = new THREE.MeshBasicMaterial({ color });
      for (let i = 0; i < count; i++) {
        const mesh = new THREE.Mesh(pGeo, pMat);
        mesh.position.set(posX, posY, posZ);
        scene.add(mesh);

        activeParticles.push({
          mesh,
          vx: (Math.random() - 0.5) * 6,
          vy: Math.random() * 4 + 1,
          vz: (Math.random() - 0.5) * 6,
          life: 1.0,
          decay: 0.02 + Math.random() * 0.03
        });
      }
    };

    const createCoinSparkle = (posX: number, posY: number, posZ: number, count = 8, color = 0xffdd00) => {
      const pMat = new THREE.MeshBasicMaterial({ color: 0xffeb3b });
      for (let i = 0; i < count; i++) {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.06, 4, 4), pMat);
        mesh.position.set(posX, posY, posZ);
        scene.add(mesh);

        activeParticles.push({
          mesh,
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 2 + 0.5,
          vz: (Math.random() - 0.5) * 3,
          life: 1.0,
          decay: 0.04 + Math.random() * 0.04
        });
      }
    };

    // ----------------------------------------------------
    // 8. CORE REALTIME STATS AND CALCULATION STATE
    // ----------------------------------------------------
    let playerSpeed = 15;        // current driving speed
    let baseSpeed = 15;
    let maxRegularSpeed = 35;
    let speedStep = 0.003;       // speed growth step
    let laneChangeSpeed = 0.18;   // left-right slide velocity

    let targetX = 0;             // smooth lerp target for player car X
    let playerLane = 1;          // 0 = left, 1 = mid, 2 = right
    let doubleTapTimer = 0;
    
    let tickCounter = 0;
    let distanceTraveled = 0;
    let scoreAccumulator = 0;
    let scoreMultiplier = 1;

    let totalActiveDistance = 0; // game odometer

    let lastSpawnZ = -50;

    // Set initial audio speed
    audio.startEngine();

    // ----------------------------------------------------
    // 9. ANIMATION LOOP
    // ----------------------------------------------------
    const clock = new THREE.Clock();
    let frameId: number;
    let lastAppliedThemeIndex = -1;
    let lastAppliedSkinId = "";
    let lastAppliedSkinColor = "";
    let wasPlaying = false;

    const tick = () => {
      const delta = clock.getDelta();

      if (!isPlayingRef.current) {
        wasPlaying = false;
        // Just render background spinning slightly
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(tick);
        return;
      }

      // Transition to starting the game: clear any obstacles or coins left over from previous runs
      if (!wasPlaying) {
        wasPlaying = true;
        
        // Reset player state inside 3D simulation
        playerGroup.position.set(0, 0, 0);
        targetX = 0;
        playerLane = 1;
        playerSpeed = 15;
        baseSpeed = 15;
        
        // Remove ALL existing active obstacles from the scene and reset the array
        activeObstacles.forEach((obs) => {
          scene.remove(obs.group);
        });
        activeObstacles = [];
        
        // Remove ALL existing active coins from the scene and reset the array
        activeCoins.forEach((coin) => {
          scene.remove(coin.mesh);
        });
        activeCoins = [];
        
        // Remove ALL existing active particles
        activeParticles.forEach((p) => {
          scene.remove(p.mesh);
        });
        activeParticles = [];
        
        // Reset spawning distance tracking, timers, scores
        totalActiveDistance = 0;
        lastSpawnZ = -50;
        tickCounter = 0;
        distanceTraveled = 0;
        scoreAccumulator = 0;
      }

      tickCounter++;

      const relativeCurve = (z: number) => {
        return getRoadCurveOffset(totalActiveDistance - z) - getRoadCurveOffset(totalActiveDistance);
      };

      if (lastAppliedThemeIndex !== roadThemeIndexRef.current) {
        lastAppliedThemeIndex = roadThemeIndexRef.current;
        applyTheme(roadThemeIndexRef.current);
      }

      // a) Synchronize variables from upgraded statistics (ref updated dynamically)
      const currentUpgrades = upgradesRef.current;
      const engineBonus = currentUpgrades.engine * 4; // engine speed additions
      const steerBonus = 1 + (currentUpgrades.handling * 0.15); // steer performance
      const magnetRadius = 3.5 + (currentUpgrades.magnet * 3); // magnet radius expansion

      // b) Rebuild vehicle if skin or skinId changed, or if core starship needs pulsing
      if (lastAppliedSkinId !== selectedSkinIdRef.current || lastAppliedSkinColor !== selectedSkinColorRef.current) {
        lastAppliedSkinId = selectedSkinIdRef.current;
        lastAppliedSkinColor = selectedSkinColorRef.current;
        rebuildPlayerCar(lastAppliedSkinId, lastAppliedSkinColor);
      }

      if (lastAppliedSkinId === 'stellar_shadow') {
        const core = carVisualGroup.getObjectByName("starship_core_pulsing") as THREE.Mesh;
        if (core) {
          core.rotation.y += delta * 2;
          core.scale.setScalar(1 + Math.sin(tickCounter * 0.1) * 0.1);
        }
        playerGroup.position.y = 0.2 + Math.sin(tickCounter * 0.055) * 0.12;
      } else {
        playerGroup.position.y = 0.0;
      }

      // c) Read Active controls logic (supports parallel keyboard listener AND mobile overlay ref updates)
      const keys = controlsRef.current;

      // Handle Acceleration & Slower controls (Turbo Boost increases multiplier and speeds quickly)
      let targetDampingSpeed = baseSpeed + engineBonus;
      scoreMultiplier = 1;

      if (keys.gas) { // GAS or Space trigger
        targetDampingSpeed = (baseSpeed + engineBonus) * 1.5;
        scoreMultiplier = 2; // Double score when speeding
        
        // Exhale tiny sparks
        if (tickCounter % 3 === 0) {
          createCoinSparkle(playerGroup.position.x + (Math.random() - 0.5) * 0.5, 0.4, playerGroup.position.z + 1.6, 1, 0x00f0ff);
        }
      } else if (keys.brake) {
        targetDampingSpeed = 5; // slow down crawl
        scoreMultiplier = 0;
        
        // Friction white smoke puff
        if (tickCounter % 4 === 0) {
          createExplosion(playerGroup.position.x + (Math.random() - 0.5) * 1.2, 0.1, playerGroup.position.z + 1.0, 1, 0xffffff);
          audio.playBrake();
        }
      }

      // Smoothly slide speed ratio
      playerSpeed = THREE.MathUtils.lerp(playerSpeed, targetDampingSpeed, 0.05);
      audio.setEngineSpeed((playerSpeed - 5) / (maxRegularSpeed + 10));

      // Steer movement sliding
      const horizontalBound = roadWidth / 2 - 1.2;
      
      let targetRotY = 0; // Yaw heading
      let targetRotZ = 0; // Roll tilt

      if (keys.left) {
        targetX -= laneChangeSpeed * steerBonus;
        targetRotZ = 0.13; // Roll left
        targetRotY = 0.18; // Yaw left
      } else if (keys.right) {
        targetX += laneChangeSpeed * steerBonus;
        targetRotZ = -0.13; // Roll right
        targetRotY = -0.18; // Yaw right
      }

      // Sample curve 45 units ahead and apply subtle automatic cornering tilt and rotation
      const curveAhead = relativeCurve(-45);
      targetRotY += curveAhead * 0.012;
      targetRotZ -= curveAhead * 0.005;

      playerGroup.rotation.y = THREE.MathUtils.lerp(playerGroup.rotation.y, targetRotY, 0.15);
      playerGroup.rotation.z = THREE.MathUtils.lerp(playerGroup.rotation.z, targetRotZ, 0.15);

      // Lock boundaries to prevent driving out in outer grid
      targetX = Math.max(-horizontalBound, Math.min(horizontalBound, targetX));
      playerGroup.position.x = THREE.MathUtils.lerp(playerGroup.position.x, targetX, 0.15);

      // Spin front wheels according to current steering
      wheels[0].rotation.y = THREE.MathUtils.lerp(wheels[0].rotation.y, keys.left ? 0.35 : (keys.right ? -0.35 : 0), 0.1);
      wheels[1].rotation.y = THREE.MathUtils.lerp(wheels[1].rotation.y, keys.left ? 0.35 : (keys.right ? -0.35 : 0), 0.1);

      // Rotate all wheels perpetually depending on speed
      wheels.forEach(w => {
        w.rotation.x += (playerSpeed * delta * 0.5);
      });

      // Animate interior steering wheel if present
      const interiorSteeringWheel = carVisualGroup.getObjectByName("steering_wheel");
      if (interiorSteeringWheel) {
        const targetSteerRotation = keys.left ? 1.0 : (keys.right ? -1.0 : 0);
        interiorSteeringWheel.rotation.z = THREE.MathUtils.lerp(interiorSteeringWheel.rotation.z, targetSteerRotation, 0.15);
      }

      // Dynamic underglow pulsing glow effect
      const underglowMesh = playerGroup.getObjectByName("underglow") as THREE.Mesh;
      if (underglowMesh) {
        (underglowMesh.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(tickCounter * 0.15) * 0.3;
      }

      // Dynamic plasma thruster flames scaling
      const thrusterFlame = playerGroup.getObjectByName("thrusterFlame") as THREE.Mesh;
      if (thrusterFlame) {
        if (keys.gas) {
          // Fiery scale and red-neon glow color shift at fast pace
          thrusterFlame.scale.set(1.4, 1.4, 1.8 + Math.sin(tickCounter * 0.5) * 0.4);
          (thrusterFlame.material as THREE.MeshBasicMaterial).color.setHex(0xff0055);
        } else {
          // Standard low idle size and calm ionic cyan/blue hue
          thrusterFlame.scale.set(0.85, 0.85, 0.95 + Math.sin(tickCounter * 0.2) * 0.2);
          (thrusterFlame.material as THREE.MeshBasicMaterial).color.setHex(0x00f0ff);
        }
      }

      // Gradually increase difficulty / speed over distance
      baseSpeed += speedStep * delta;

      // d) Track scores and trigger up to React overlay (Accumulate as floats to prevent sub-integer frame deltas rounding to 0)
      distanceTraveled += playerSpeed * delta * 2.2;
      scoreAccumulator += playerSpeed * delta * scoreMultiplier * 5.0;
      
      // Update score tick every 8 frames for solid performance
      if (tickCounter % 8 === 0) {
        onScoreTickRef.current(Math.round(scoreAccumulator), Math.round(distanceTraveled), playerSpeed * 6);
        scoreAccumulator = 0; // reset buffer
        distanceTraveled = 0; // reset buffer
      }

      // e) Slide road segments, dotted divisions, and assets backwards
      roadSegments.forEach((segment) => {
        segment.position.z += playerSpeed * delta;
        if (segment.position.z > 20) {
          segment.position.z -= numSegs * segLength;
        }
        segment.position.x = relativeCurve(segment.position.z);
      });

      dividingLines.forEach((line) => {
        line.position.z += playerSpeed * delta;
        
        // Wrap back around once beyond view (updated to support 660 roadLength)
        if (line.position.z > 15) {
          line.position.z -= roadLength;
        }
        const baseX = line.userData.baseX || 0;
        line.position.x = baseX + relativeCurve(line.position.z);
      });

      // Scroll unique stage road ornamentation backwards for active movement
      if (iceRails.visible) {
        iceRails.children.forEach((child) => {
          child.position.z += playerSpeed * delta;
          if (child.position.z > 35) {
            child.position.z -= 675; // wrap backwards over extended road range
          }
          const baseX = child.userData.baseX || 0;
          child.position.x = baseX + relativeCurve(child.position.z);
        });
      }

      if (goldStuds.visible) {
        goldStuds.children.forEach((child) => {
          child.position.z += playerSpeed * delta;
          if (child.position.z > 35) {
            child.position.z -= 680; // wrap backwards over extended road range
          }
          const baseX = child.userData.baseX || 0;
          child.position.x = baseX + relativeCurve(child.position.z);
        });
      }

      if (lavaVents.visible) {
        lavaVents.children.forEach((child) => {
          child.position.z += playerSpeed * delta;
          if (child.position.z > 35) {
            child.position.z -= 720; // wrap backwards over extended road range
          }
          const baseX = child.userData.baseX || 0;
          child.position.x = baseX + relativeCurve(child.position.z);
        });
      }

      // Grid Helpers rolling / scrolling backwards
      gridHelperLeft1.position.z += playerSpeed * delta;
      gridHelperRight1.position.z += playerSpeed * delta;
      gridHelperLeft2.position.z += playerSpeed * delta;
      gridHelperRight2.position.z += playerSpeed * delta;

      // Wrap-around grids seamlessly when they get behind the player's view (extended for 660 length)
      if (gridHelperLeft1.position.z > 300) gridHelperLeft1.position.z -= 800;
      if (gridHelperRight1.position.z > 300) gridHelperRight1.position.z -= 800;
      if (gridHelperLeft2.position.z > 300) gridHelperLeft2.position.z -= 800;
      if (gridHelperRight2.position.z > 300) gridHelperRight2.position.z -= 800;

      // Slowly rotate all roadside cyber pole rings for futuristic vibe
      roadsideAccents.forEach((accent) => {
        accent.children.forEach((child) => {
          if (child instanceof THREE.Mesh && child.geometry instanceof THREE.TorusGeometry) {
            child.rotation.z += delta * 1.5;
          }
        });
      });

      // Ambient clouds movement (Parallax slow drift in outer sky)
      cloudMeshes.forEach((cloud) => {
        cloud.position.z += playerSpeed * delta * 0.15; // Slow relative speed for high-altitude layers
        if (cloud.position.z > 60) {
          cloud.position.z = -350 - Math.random() * 150;
          cloud.position.x = (Math.random() - 0.5) * 180;
        }
      });

      // Scenic flying birds updating
      birdMeshes.forEach((bird, bIdx) => {
        // Birds fly forward slightly faster than slow speeds, but eventually get overtaken at high speeds
        const birdRelativeZ = (playerSpeed - 11.5) * delta;
        bird.position.z += birdRelativeZ;
        bird.position.x += Math.sin(tickCounter * 0.03 + bIdx) * 0.05; // Gentle weaving flight pathway
        
        // Wing flaps animation (lowpoly wings moving up and down)
        const leftWing = birdWingsLeft[bIdx];
        const rightWing = birdWingsRight[bIdx];
        if (leftWing && rightWing) {
          const flapAngle = Math.sin(tickCounter * 0.32 + bIdx) * 0.44;
          leftWing.rotation.z = flapAngle;
          rightWing.rotation.z = -flapAngle;
        }

        if (bird.position.z > 35) {
          bird.position.z = -180 - Math.random() * 120;
          bird.position.x = (Math.random() - 0.5) * 55;
          bird.position.y = 11 + Math.random() * 9;
        }
      });

      // Twinkle & parallax drift stars group slightly (leaf blossoms, snow falling, etc.)
      const pArr = starGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        // Slowly move stars backwards relative to player speed to create deep celestial perspective depth
        pArr[i * 3 + 2] += playerSpeed * delta * 0.08;
        // Also simulate falling/drifting motion if user is in Spring/Winter/Autumn levels
        if (onScoreTickRef.current) {
          // If level has autumn leaves or snow falling, drift down!
          pArr[i * 3 + 1] -= delta * 1.5; 
        }
        
        if (pArr[i * 3 + 2] > 15 || pArr[i * 3 + 1] < -2) {
          pArr[i * 3 + 2] = -670 - Math.random() * 40;
          pArr[i * 3] = (Math.random() - 0.5) * 200;
          pArr[i * 3 + 1] = Math.random() * 85 + 3;
        }
      }
      starGeo.attributes.position.needsUpdate = true;
      starParticles.rotation.z += 0.0006; // Ambient celestial rotation

      // ----------------------------------------------------
      // Dynamic High-Realistic Weather Precipitation Physics Engine
      // ----------------------------------------------------
      const elapsedWeather = tickCounter * 0.012;
      weatherParticles.forEach((wp) => {
        const mesh = wp.mesh;
        
        // Dynamic horizontal sway based on sine wave harmonics to look highly organic (like fluttering leaves or swirling snow)
        const currentSway = Math.sin(elapsedWeather * wp.swayFreq) * wp.swayAmp;
        
        // Apply wind and velocity physics
        mesh.position.x += (wp.vx + currentSway) * delta * 5.5;
        mesh.position.y += wp.vy * delta * 5.5;
        
        // If the player is actively driving, we subtract/offset playerSpeed from the particle's Z trajectory to simulate moving past them!
        const forwardBackSpeedZ = isPlayingRef.current ? (wp.vz - playerSpeed * 0.43) : wp.vz;
        mesh.position.z += forwardBackSpeedZ * delta;
        
        // Fluttering rotations
        mesh.rotation.x += wp.rotSpeedX * delta;
        mesh.rotation.y += wp.rotSpeedY * delta;
        mesh.rotation.z += wp.rotSpeedZ * delta;
        
        // Reset/respawn boundaries to maintain infinite particle density
        if (mesh.position.y < -0.5 || mesh.position.y > 27 || mesh.position.z > 20 || mesh.position.z < -190 || Math.abs(mesh.position.x) > 40) {
          // Respawn at a fresh location up front
          mesh.position.x = (Math.random() - 0.5) * 45;
          mesh.position.y = wp.vy > 0 ? 0.2 : 26.0; // spawn at bottom if floating up, else at top
          mesh.position.z = -180 + Math.random() * 20; // spawn far in the distance and drift in
          
          // Re-scatter rotation
          mesh.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
        }
      });

      // Side towers sliding and curving
      roadsideAccents.forEach((accent) => {
        accent.position.z += playerSpeed * delta;
        if (accent.position.z > 20) {
          accent.position.z = -((roadsideAccents.length - 1) * accentSpacing) + 15;
        }
        const baseX = accent.userData.baseX || 0;
        accent.position.x = baseX + relativeCurve(accent.position.z);
      });

      // f) Spawn Management (Obstacles and Gold Coins)
      totalActiveDistance += playerSpeed * delta;
      
      const currentStage = stageLevelRef.current || 1;
      // Spawn spacing grows narrower (denser clusters) at higher levels:
      // Lvl 1 spacing is 45 units (easy dodge), Lvl 8 spacing is 18 units (extreme intensity)
      const adaptiveSpawnTimerPeriod = Math.max(18, 45 - (currentStage * 3.5));

      if (totalActiveDistance - lastSpawnZ > adaptiveSpawnTimerPeriod) {
        lastSpawnZ = totalActiveDistance;

        const decideSpawn = Math.random();
        const lanePick = Math.floor(Math.random() * 3);

        // Calculate dynamic obstacle spawn probability:
        // Lvl 1: 30% obstacles, Lvl 8: 62% obstacles
        const obstacleChance = Math.min(0.62, 0.28 + (currentStage * 0.052));
        const coinChance = 0.78; // reduced from 0.85 to slow down progression

        if (decideSpawn < obstacleChance) {
          // Spawn primary traffic obstacle
          spawnObstacle(lanePick, -120);

          // Double trouble multi-lane obstacles:
          // For level 5, 6, 7 and 8, occasionally spawn extra obstacle in an adjacent lane
          if (currentStage >= 5 && Math.random() < 0.32) {
            const extraLane = (lanePick + 1) % 3;
            // Spawned slightly further back to allow narrow sliding zigzag dodge
            spawnObstacle(extraLane, -135);
          }
        } else if (decideSpawn < coinChance) {
          // Spawn random coin sequence track
          spawnCoin(lanePick, -120, 'gold');
          // Add second stacked coin occasionally (making coin progression sparser and more rewarding)
          if (Math.random() < 0.45) {
            setTimeout(() => {
              if (isPlayingRef.current) spawnCoin(lanePick, -135, 'gold');
            }, 380);
          }
        } else {
          // Spawn a lightning speedup (shield boosters are deactivated / cannot be collected)
          const powerupType = 'turbo_powerup';
          spawnCoin(lanePick, -120, powerupType);
        }
      }

      // g) Update Traffic Obstacles
      for (let i = activeObstacles.length - 1; i >= 0; i--) {
        const obs = activeObstacles[i];
        
        // Obstacles move slower than flow, sliding past camera
        obs.group.position.z += (playerSpeed - obs.speed) * delta;
        obs.z = obs.group.position.z;

        // Spin other cars' wheels based on their forward speed
        if (obs.wheels && obs.wheels.length > 0) {
          obs.wheels.forEach((w: THREE.Mesh) => {
            w.rotation.x += obs.speed * delta * 1.8;
          });
        }

        const laneX = obstacleLanesX[obs.lane];
        let targetXOffset = laneX;
        if (obs.swingRange > 0) {
          targetXOffset += Math.sin(tickCounter * 0.02 * obs.swingSpeed) * obs.swingRange;
        }
        obs.group.position.x = targetXOffset + relativeCurve(obs.group.position.z);

        // If obstacle is rock, rotate it naturally in deep cyber space
        if (obs.type === 'rock') {
          obs.group.rotation.x += obs.rotX * delta;
          obs.group.rotation.y += obs.rotY * delta;
          obs.group.rotation.z += obs.rotZ * delta;

          // Animate floating orbital crystal shards and pulsing wireframe
          obs.group.children.forEach((child: any) => {
            if (child.name && child.name.startsWith("shard_")) {
              const shardId = parseInt(child.name.split("_")[1]);
              const angle = tickCounter * 0.05 + (shardId * Math.PI * 0.5);
              const radius = 1.3 + Math.sin(tickCounter * 0.03 + shardId) * 0.15;
              child.position.x = Math.cos(angle) * radius;
              child.position.z = Math.sin(angle) * radius;
              child.position.y = 1.0 + Math.sin(tickCounter * 0.04 + shardId) * 0.2;
              child.rotation.x += delta * 1.5;
              child.rotation.y += delta * 2.0;
            } else if (child.name === "wireframeOutline") {
              const scalePulse = 1.05 + Math.sin(tickCounter * 0.12) * 0.05;
              child.scale.set(scalePulse, scalePulse, scalePulse);
            }
          });
        } else if (obs.type === 'truck') {
          obs.group.children.forEach((child: any) => {
            if (child.name === "tankerBand") {
              child.rotation.y += delta * 1.5;
            } else if (child.name === "hazardGlow") {
              child.material.opacity = 0.5 + Math.sin(tickCounter * 0.15) * 0.32;
            } else if (child.name === "smokeCone") {
              child.scale.y = 0.85 + Math.sin(tickCounter * 0.25) * 0.25;
              child.scale.x = 0.95 + Math.cos(tickCounter * 0.25) * 0.1;
            }
          });
        } else if (obs.type === 'sport') {
          obs.group.children.forEach((child: any) => {
            if (child.name === "sportExhaustFlame") {
              child.scale.x = 0.85 + Math.random() * 0.25;
              child.scale.y = 0.85 + Math.random() * 0.25;
              child.scale.z = 0.8 + Math.sin(tickCounter * 0.35) * 0.25;
            } else if (child.name === "flickerLight") {
              child.material.opacity = 0.65 + Math.sin(tickCounter * 0.18) * 0.3;
            }
          });
        } else if (obs.type === 'sedan') {
          obs.group.children.forEach((child: any) => {
            if (child.name === "policeSirenGroup") {
              const isRed = Math.floor(tickCounter * 0.2) % 2 === 0;
              child.children[0].material.color.setHex(isRed ? 0xff0044 : 0x111122);
              child.children[1].material.color.setHex(isRed ? 0x111122 : 0x0099ff);
            }
          });
        }

        // Bounding calculation
        const playerZ = playerGroup.position.z;
        const playerX = playerGroup.position.x;
        
        const collisionZLength = (obs.length / 2) + (3.2 / 2); // Combined halves lengths
        const collisionXWidth = (obs.width / 2) + 0.7; // Combined halves widths

        // Collision Check (AABB Intersection)
        if (
          Math.abs(obs.group.position.z - playerZ) < collisionZLength &&
          Math.abs(obs.group.position.x - playerX) < collisionXWidth
        ) {
          // CRASH TRIGERRED!
          audio.playCrash();
          createExplosion(playerGroup.position.x, 0.5, playerZ, 35, 0xff2200);

          // Remove the obstacle from active draw
          scene.remove(obs.group);
          activeObstacles.splice(i, 1);

          // Camera impact punch shake
          camera.position.x += (Math.random() - 0.5) * 3;
          camera.position.y += (Math.random() - 0.5) * 3;

          onObstacleCrashRef.current();
          continue;
        }

        // De-allocate passed obstacles
        if (obs.group.position.z > 15) {
          scene.remove(obs.group);
          activeObstacles.splice(i, 1);
        }
      }

      // h) Update Coins / Collectibles (Attraction with Magnet upgrade!)
      for (let i = activeCoins.length - 1; i >= 0; i--) {
        const coin = activeCoins[i];
        
        // Spin coin mesh nicely
        if (coin.type === 'gold') {
          coin.mesh.rotation.z += 0.055;
          // Splendid floating wave motion on y axis
          coin.mesh.position.y = 0.65 + Math.sin(tickCounter * 0.05 + coin.mesh.position.z * 0.07) * 0.12;
        } else {
          coin.mesh.rotation.y += 0.04;
          coin.mesh.position.y = 0.7 + Math.sin(tickCounter * 0.07 + coin.mesh.position.z * 0.07) * 0.15;
        }

        // Slide past camera
        coin.mesh.position.z += playerSpeed * delta;
        coin.z = coin.mesh.position.z;

        // Magnetized behavior
        let beingMagnetized = false;
        const isShieldMaxed = coin.type === 'shield_powerup' && shieldCountRef.current >= 2;
        
        if (currentUpgrades.magnet > 0 && !isShieldMaxed) {
          const coinPos = coin.mesh.position;
          const playerPos = playerGroup.position;
          const distToPlayer = coinPos.distanceTo(playerPos);

          // Only pull magnet on coins in FRONT of the player (smaller Z means further forward)
          if (distToPlayer < magnetRadius && coinPos.z < playerPos.z + 0.5) {
            coin.mesh.position.lerp(playerPos, 0.15);
            beingMagnetized = true;
          }
        }

        if (!beingMagnetized) {
          const laneX = obstacleLanesX[coin.lane];
          coin.mesh.position.x = laneX + relativeCurve(coin.mesh.position.z);
        }

        // Check collection threshold
        const collThresholdZ = 1.3;
        const collThresholdX = 1.0;
        if (
          Math.abs(coin.mesh.position.z - playerGroup.position.z) < collThresholdZ &&
          Math.abs(coin.mesh.position.x - playerGroup.position.x) < collThresholdX
        ) {
          if (isShieldMaxed) {
            // Cannot collect shield if already at limit of 2 (let it slide past)
            continue;
          }

          // Spark sound and particle
          audio.playCoin();
          
          let color = 0xffd700;
          if (coin.type === 'shield_powerup') color = 0x00ff88;
          if (coin.type === 'turbo_powerup') color = 0xffaa00;

          createCoinSparkle(coin.mesh.position.x, coin.mesh.position.y, coin.mesh.position.z, 10, color);

          // Trigger React parent callback code
          onCoinCollectedRef.current(coin.type);

          // Clear entity
          scene.remove(coin.mesh);
          activeCoins.splice(i, 1);
          continue;
        }

        // Out of bounds cleanup
        if (coin.mesh.position.z > 15) {
          scene.remove(coin.mesh);
          activeCoins.splice(i, 1);
        }
      }

      // i) Process Sparks Particles physics
      for (let i = activeParticles.length - 1; i >= 0; i--) {
        const particle = activeParticles[i];
        
        particle.mesh.position.x += particle.vx * delta * 5;
        particle.mesh.position.y += particle.vy * delta * 5;
        particle.mesh.position.z += (particle.vz + playerSpeed) * delta; // move with camera coordinate system
        
        particle.vy -= 9.81 * delta; // gravity slide down
        particle.life -= particle.decay;

        if (particle.life <= 0) {
          scene.remove(particle.mesh);
          activeParticles.splice(i, 1);
        } else {
          particle.mesh.scale.set(particle.life, particle.life, particle.life);
        }
      }

      // j) Follow camera calculations with elastic spring damping / Cockpit Mode
      if (cameraViewRef.current === 'cockpit') {
        const targetFOV = 78; // wider field of view for inside cabin feel!
        if (Math.abs(camera.fov - targetFOV) > 0.5) {
          camera.fov = THREE.MathUtils.lerp(camera.fov, targetFOV, 0.1);
          camera.updateProjectionMatrix();
        }

        // Place inside the cabin of the player muscle car, driver seat (left side)
        const optimalCamX = playerGroup.position.x - 0.28;
        const optimalCamY = playerGroup.position.y + 0.82;
        const optimalCamZ = playerGroup.position.z - 0.05; // slightly forward inside cabin

        camera.position.x = THREE.MathUtils.lerp(camera.position.x, optimalCamX, 0.25);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, optimalCamY, 0.25);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, optimalCamZ, 0.25);

        // Point camera target forward into the distance with slight curves matching steering direction
        const camLookAt = new THREE.Vector3(playerGroup.position.x - 0.28, playerGroup.position.y + 0.8, playerGroup.position.z - 15);
        camera.lookAt(camLookAt);
      } else {
        // During high speeds (keys.gas = true), tilt FOV out and shift offset back for dynamic velocity warp feel!
        const targetFOV = keys.gas ? 74 : 65;
        if (Math.abs(camera.fov - targetFOV) > 0.5) {
          camera.fov = THREE.MathUtils.lerp(camera.fov, targetFOV, 0.05);
          camera.updateProjectionMatrix();
        }

        const optimalCamX = playerGroup.position.x * 0.7; // slight delay behind steering
        const optimalCamY = keys.gas ? 4.3 : 3.8;
        const optimalCamZ = keys.gas ? 11.2 : 9.8;

        camera.position.x = THREE.MathUtils.lerp(camera.position.x, optimalCamX, 0.1);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, optimalCamY, 0.1);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, optimalCamZ, 0.1);

        // Point camera focus slightly ahead of the car for high visibility
        const camLookAt = new THREE.Vector3(playerGroup.position.x * 0.5, 0.5, playerGroup.position.z - 10);
        camera.lookAt(camLookAt);
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    // Begin Animation Loop
    tick();

    // ----------------------------------------------------
    // 10. CLEANUP & RESIZING MANAGEMENT
    // ----------------------------------------------------
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    // Use ResizeObserver for perfect fluid sizes (Aesthetic & Sizing constraint compliance)
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Completely unmount on termination to prevent double renderer overlays
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      audio.stopEngine();

      // Clean up meshes logically
      activeObstacles.forEach(obs => {
        scene.remove(obs.group);
      });
      activeCoins.forEach(coin => {
        scene.remove(coin.mesh);
      });
      activeParticles.forEach(p => {
        scene.remove(p.mesh);
      });

      // Renderer element removal
      try {
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      } catch (e) {}
    };

    // Empty dependency array ensures this Three.js context survives throughout the active game lifespan
  }, [selectedSkinColor, selectedSkinId]); // Skin dynamic color rebuild guard

  return (
    <div
      id="3d-canvas-container"
      ref={containerRef}
      className="absolute inset-0 w-full h-full bg-slate-950 overflow-hidden"
    />
  );
};
