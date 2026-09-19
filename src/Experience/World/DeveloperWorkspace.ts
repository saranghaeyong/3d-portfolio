import * as THREE from 'three';
import { QualityLevel, SectionId } from '../../types';
import { PERSONAL_DATA } from '../../data/portfolioData';

export interface InteractiveObjectData {
  sectionId?: SectionId;
  label: string;
  type: 'navigation' | 'prop' | 'project' | 'screen';
  detail?: string;
}

export class DeveloperWorkspace {
  public group: THREE.Group;
  private scene: THREE.Scene;
  public interactiveObjects: THREE.Mesh[] = [];

  // Canvas animated textures
  private mainScreenCanvas!: HTMLCanvasElement;
  private mainScreenCtx!: CanvasRenderingContext2D;
  private mainScreenTexture!: THREE.CanvasTexture;

  private sideScreenCanvas!: HTMLCanvasElement;
  private sideScreenCtx!: CanvasRenderingContext2D;
  private sideScreenTexture!: THREE.CanvasTexture;

  private idCardCanvas!: HTMLCanvasElement;
  private idCardCtx!: CanvasRenderingContext2D;
  private idCardTexture!: THREE.CanvasTexture;

  // Animation targets
  private animatedLEDs: THREE.MeshBasicMaterial[] = [];
  private particlesMesh!: THREE.Points;
  private floatingItems: { mesh: THREE.Object3D; baseY: number; speed: number; amp: number }[] = [];

  // Code stream state
  private epoch = 1;
  private codeLines: string[] = [
    'import numpy as np',
    'import pandas as pd',
    'from sklearn.model_selection import train_test_split',
    '# SARANG R N — MCA GRADUATE',
    'model = DeepClassifier(input_dim=128)',
    'optimizer = torch.optim.Adam(lr=0.001)',
    '>>> Database connected: MySQL @ localhost:3306',
    '>>> SELECT * FROM academic_projects WHERE status="OPTIMIZED";',
    'Training Epoch: 42/50 | Loss: 0.0124 | Precision: 0.982'
  ];

  constructor(scene: THREE.Scene, quality: QualityLevel = 'high') {
    this.scene = scene;
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.buildLighting(quality);
    this.buildRoomAndFloor();
    this.buildDeskSetup();
    this.buildMonitors();
    this.buildLaptop();
    this.buildProfileCard();
    this.buildServerRack();
    this.buildDeveloperProps();
    this.buildCertificationStation();
    this.buildProjectCards();
    this.buildNavigationBeacons();
    this.buildParticles(quality);
  }

  private buildLighting(quality: QualityLevel): void {
    // Ambient soft fill
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    this.group.add(ambientLight);

    // Main key light from top-right
    const keyLight = new THREE.DirectionalLight(0xe2e8f0, 2.2);
    keyLight.position.set(5, 8, 5);
    if (quality !== 'low') {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = quality === 'high' ? 1024 : 512;
      keyLight.shadow.mapSize.height = quality === 'high' ? 1024 : 512;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 25;
      keyLight.shadow.bias = -0.0005;
    }
    this.group.add(keyLight);

    // Subtle cyan rim light from behind desk
    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 1.4);
    cyanRim.position.set(-5, 4, -4);
    this.group.add(cyanRim);

    // Soft blue floor bounce
    const blueBounce = new THREE.PointLight(0x60a5fa, 1.0, 8);
    blueBounce.position.set(0, 1.5, 1);
    this.group.add(blueBounce);
  }

  private buildRoomAndFloor(): void {
    // Floor
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x07090e,
      roughness: 0.6,
      metalness: 0.3
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    this.group.add(floor);

    // Subtle grid overlay on floor
    const grid = new THREE.GridHelper(26, 26, 0x1e293b, 0x0f172a);
    grid.position.y = 0.002;
    this.group.add(grid);

    // Studio backdrop wall
    const wallGeo = new THREE.PlaneGeometry(30, 16);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x05070a,
      roughness: 0.9,
      metalness: 0.1
    });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.set(0, 8, -6);
    this.group.add(wall);
  }

  private buildDeskSetup(): void {
    // Desk Top (Matte Charcoal / Dark Obsidian)
    const deskTopGeo = new THREE.BoxGeometry(4.8, 0.1, 2.2);
    const deskTopMat = new THREE.MeshStandardMaterial({
      color: 0x11141a,
      roughness: 0.4,
      metalness: 0.2
    });
    const deskTop = new THREE.Mesh(deskTopGeo, deskTopMat);
    deskTop.position.set(0, 1.2, 0);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    this.group.add(deskTop);

    // Subtle LED lightstrip along the back of the desk
    const ledStripGeo = new THREE.BoxGeometry(4.6, 0.02, 0.02);
    const ledStripMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const ledStrip = new THREE.Mesh(ledStripGeo, ledStripMat);
    ledStrip.position.set(0, 1.25, -1.08);
    this.group.add(ledStrip);

    // Desk Legs (Matte Black Powder Coated Steel)
    const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 16);
    const legMat = new THREE.MeshStandardMaterial({
      color: 0x090b0e,
      roughness: 0.5,
      metalness: 0.8
    });

    const legPositions = [
      [-2.2, 0.6, -0.9],
      [2.2, 0.6, -0.9],
      [-2.2, 0.6, 0.9],
      [2.2, 0.6, 0.9]
    ];

    legPositions.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      this.group.add(leg);
    });

    // Desk Mat / Mousepad
    const padGeo = new THREE.BoxGeometry(3.0, 0.008, 1.1);
    const padMat = new THREE.MeshStandardMaterial({
      color: 0x1a202c,
      roughness: 0.85
    });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.set(0, 1.254, 0.15);
    pad.receiveShadow = true;
    this.group.add(pad);
  }

  private buildMonitors(): void {
    // 1. Ultra-wide Main Curved Monitor
    const monitorStandBase = new THREE.CylinderGeometry(0.25, 0.25, 0.02, 32);
    const standMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
    const standBase = new THREE.Mesh(monitorStandBase, standMat);
    standBase.position.set(0, 1.26, -0.4);
    this.group.add(standBase);

    const standPole = new THREE.CylinderGeometry(0.03, 0.03, 0.6, 16);
    const pole = new THREE.Mesh(standPole, standMat);
    pole.position.set(0, 1.55, -0.4);
    this.group.add(pole);

    // Main Monitor Bezel
    const bezelGeo = new THREE.BoxGeometry(2.4, 0.95, 0.06);
    const bezelMat = new THREE.MeshStandardMaterial({ color: 0x090b10, metalness: 0.7, roughness: 0.3 });
    const bezel = new THREE.Mesh(bezelGeo, bezelMat);
    bezel.position.set(0, 1.95, -0.35);
    this.group.add(bezel);

    // Main Screen Canvas
    this.mainScreenCanvas = document.createElement('canvas');
    this.mainScreenCanvas.width = 1024;
    this.mainScreenCanvas.height = 420;
    this.mainScreenCtx = this.mainScreenCanvas.getContext('2d')!;
    this.drawMainScreen();

    this.mainScreenTexture = new THREE.CanvasTexture(this.mainScreenCanvas);
    this.mainScreenTexture.minFilter = THREE.LinearFilter;

    const screenGeo = new THREE.PlaneGeometry(2.32, 0.88);
    const screenMat = new THREE.MeshBasicMaterial({
      map: this.mainScreenTexture,
      toneMapped: false
    });
    const mainScreen = new THREE.Mesh(screenGeo, screenMat);
    mainScreen.position.set(0, 1.95, -0.318);
    mainScreen.userData = {
      label: 'Main Terminal & ML Engine Monitor',
      sectionId: 'skills',
      type: 'screen'
    } as InteractiveObjectData;
    this.interactiveObjects.push(mainScreen);
    this.group.add(mainScreen);

    // 2. Vertical Secondary Monitor (Left side)
    const vertBezelGeo = new THREE.BoxGeometry(0.7, 1.15, 0.05);
    const vertBezel = new THREE.Mesh(vertBezelGeo, bezelMat);
    vertBezel.position.set(-1.65, 1.95, -0.15);
    vertBezel.rotation.y = 0.32;
    this.group.add(vertBezel);

    this.sideScreenCanvas = document.createElement('canvas');
    this.sideScreenCanvas.width = 512;
    this.sideScreenCanvas.height = 840;
    this.sideScreenCtx = this.sideScreenCanvas.getContext('2d')!;
    this.drawSideScreen();

    this.sideScreenTexture = new THREE.CanvasTexture(this.sideScreenCanvas);
    const vertScreenGeo = new THREE.PlaneGeometry(0.64, 1.08);
    const vertScreenMat = new THREE.MeshBasicMaterial({ map: this.sideScreenTexture });
    const vertScreen = new THREE.Mesh(vertScreenGeo, vertScreenMat);
    vertScreen.position.set(-1.64, 1.95, -0.12);
    vertScreen.rotation.y = 0.32;
    vertScreen.userData = {
      label: 'SQL / Database Architecture Monitor',
      sectionId: 'projects',
      type: 'screen'
    } as InteractiveObjectData;
    this.interactiveObjects.push(vertScreen);
    this.group.add(vertScreen);
  }

  private buildLaptop(): void {
    // Sleek modern laptop placed slightly to the right of the desk
    const laptopBaseGeo = new THREE.BoxGeometry(0.7, 0.02, 0.48);
    const laptopMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      metalness: 0.85,
      roughness: 0.25
    });
    const laptopBase = new THREE.Mesh(laptopBaseGeo, laptopMat);
    laptopBase.position.set(1.45, 1.265, 0.15);
    laptopBase.rotation.y = -0.25;
    this.group.add(laptopBase);

    // Keyboard & Trackpad
    const kbGeo = new THREE.PlaneGeometry(0.6, 0.24);
    const kbMat = new THREE.MeshBasicMaterial({ color: 0x111827 });
    const kb = new THREE.Mesh(kbGeo, kbMat);
    kb.rotation.x = -Math.PI / 2;
    kb.position.set(1.43, 1.276, 0.09);
    kb.rotation.z = 0.25;
    this.group.add(kb);

    // Laptop Screen Lid (Open at ~110 degrees)
    const lidGeo = new THREE.BoxGeometry(0.7, 0.46, 0.015);
    const lid = new THREE.Mesh(lidGeo, laptopMat);
    lid.position.set(1.48, 1.48, -0.06);
    lid.rotation.y = -0.25;
    lid.rotation.x = 0.18;
    this.group.add(lid);

    // Laptop Display Screen
    const screenGeo = new THREE.PlaneGeometry(0.66, 0.42);
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const laptopScreen = new THREE.Mesh(screenGeo, screenMat);
    laptopScreen.position.set(1.48, 1.48, -0.05);
    laptopScreen.rotation.y = -0.25;
    laptopScreen.rotation.x = 0.18;
    laptopScreen.userData = {
      label: 'Developer Notebook',
      sectionId: 'resume',
      type: 'screen'
    } as InteractiveObjectData;
    this.interactiveObjects.push(laptopScreen);
    this.group.add(laptopScreen);
  }

  private buildProfileCard(): void {
    // Futuristic Floating Developer ID / Profile Card
    const cardGroup = new THREE.Group();
    cardGroup.position.set(-2.1, 1.95, 0.4);
    cardGroup.rotation.y = 0.35;

    // Card Glass Frame
    const cardGeo = new THREE.BoxGeometry(1.05, 1.5, 0.03);
    const cardMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a101f,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.7,
      thickness: 0.4,
      transparent: true,
      opacity: 0.9
    });
    const cardMesh = new THREE.Mesh(cardGeo, cardMat);
    cardGroup.add(cardMesh);

    // Glowing cyan outline
    const edges = new THREE.EdgesGeometry(cardGeo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 });
    const wireframe = new THREE.LineSegments(edges, lineMat);
    cardGroup.add(wireframe);

    // Canvas texture with Sarang R N credentials
    this.idCardCanvas = document.createElement('canvas');
    this.idCardCanvas.width = 512;
    this.idCardCanvas.height = 720;
    this.idCardCtx = this.idCardCanvas.getContext('2d')!;
    this.drawIdCard();

    this.idCardTexture = new THREE.CanvasTexture(this.idCardCanvas);
    const frontGeo = new THREE.PlaneGeometry(1.0, 1.44);
    const frontMat = new THREE.MeshBasicMaterial({
      map: this.idCardTexture,
      transparent: true,
      opacity: 0.95
    });
    const frontMesh = new THREE.Mesh(frontGeo, frontMat);
    frontMesh.position.z = 0.018;
    frontMesh.userData = {
      label: '01 — SARANG R N (PROFILE)',
      sectionId: 'about',
      type: 'navigation'
    } as InteractiveObjectData;
    this.interactiveObjects.push(frontMesh);
    cardGroup.add(frontMesh);

    // Top clip badge
    const clipGeo = new THREE.BoxGeometry(0.24, 0.08, 0.06);
    const clipMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9 });
    const clip = new THREE.Mesh(clipGeo, clipMat);
    clip.position.set(0, 0.78, 0);
    cardGroup.add(clip);

    this.floatingItems.push({
      mesh: cardGroup,
      baseY: 1.95,
      speed: 1.4,
      amp: 0.04
    });

    this.group.add(cardGroup);
  }

  private buildServerRack(): void {
    // Minimalist server rack on the far right
    const rackGeo = new THREE.BoxGeometry(0.75, 2.2, 0.75);
    const rackMat = new THREE.MeshStandardMaterial({
      color: 0x090c12,
      metalness: 0.8,
      roughness: 0.4
    });
    const rack = new THREE.Mesh(rackGeo, rackMat);
    rack.position.set(3.2, 1.1, -1.0);
    this.group.add(rack);

    // Server units with pulsing LEDs
    for (let i = 0; i < 7; i++) {
      const slotGeo = new THREE.BoxGeometry(0.7, 0.16, 0.02);
      const slotMat = new THREE.MeshStandardMaterial({ color: 0x131924 });
      const slot = new THREE.Mesh(slotGeo, slotMat);
      slot.position.set(3.2, 0.35 + i * 0.24, -0.62);
      this.group.add(slot);

      // Blinking LEDs
      const ledColor = i % 2 === 0 ? 0x38bdf8 : 0x10b981;
      const ledMat = new THREE.MeshBasicMaterial({ color: ledColor });
      this.animatedLEDs.push(ledMat);

      const led1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.01), ledMat);
      led1.position.set(2.95, 0.35 + i * 0.24, -0.6);
      this.group.add(led1);

      const led2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.01), ledMat);
      led2.position.set(3.03, 0.35 + i * 0.24, -0.6);
      this.group.add(led2);
    }
  }

  private buildDeveloperProps(): void {
    // 1. Ceramic Coffee Mug ("DEV FUEL")
    const mugGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.16, 24);
    const mugMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.1
    });
    const mug = new THREE.Mesh(mugGeo, mugMat);
    mug.position.set(1.9, 1.34, 0.4);
    mug.castShadow = true;
    mug.userData = {
      label: 'Coffee Fuel (Easter Egg: Type "coffee" in terminal)',
      sectionId: 'intro',
      type: 'prop'
    } as InteractiveObjectData;
    this.interactiveObjects.push(mug);
    this.group.add(mug);

    // Coffee inside
    const liquidGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.01, 24);
    const liquidMat = new THREE.MeshBasicMaterial({ color: 0x382212 });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.position.set(1.9, 1.41, 0.4);
    this.group.add(liquid);

    // 2. Stack of Hardcover Technical Books (ML & Algorithms)
    const bookColors = [0x1e293b, 0x0284c7, 0x334155];
    bookColors.forEach((color, idx) => {
      const bGeo = new THREE.BoxGeometry(0.38, 0.05, 0.52);
      const bMat = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
      const book = new THREE.Mesh(bGeo, bMat);
      book.position.set(-1.8, 1.28 + idx * 0.052, 0.6);
      book.rotation.y = 0.15 * idx;
      this.group.add(book);
    });

    // 3. Modern Studio Headphones on Minimalist Stand
    const standBaseGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.015, 24);
    const standMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7 });
    const hStand = new THREE.Mesh(standBaseGeo, standMat);
    hStand.position.set(1.95, 1.26, -0.35);
    this.group.add(hStand);

    const hPoleGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.32, 16);
    const hPole = new THREE.Mesh(hPoleGeo, standMat);
    hPole.position.set(1.95, 1.42, -0.35);
    this.group.add(hPole);

    // Headphone headband arch
    const archGeo = new THREE.TorusGeometry(0.09, 0.014, 12, 24, Math.PI);
    const archMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });
    const arch = new THREE.Mesh(archGeo, archMat);
    arch.position.set(1.95, 1.58, -0.35);
    arch.rotation.z = Math.PI;
    this.group.add(arch);
  }

  private buildProjectCards(): void {
    // 3 Floating 3D Project Nodes on the Right
    const projectCardsData = [
      { id: 'proj-1', title: '01 ML PATTERN RECOGNITION', pos: [2.3, 2.0, 0.3] },
      { id: 'proj-2', title: '02 SQL / MYSQL RDBMS', pos: [2.5, 1.45, 0.7] },
      { id: 'proj-3', title: '03 OOP SYSTEMS UTILITY', pos: [2.2, 0.9, 0.2] }
    ];

    projectCardsData.forEach((item, idx) => {
      const cardGeo = new THREE.BoxGeometry(0.9, 0.38, 0.03);
      const cardMat = new THREE.MeshStandardMaterial({
        color: 0x0c121e,
        metalness: 0.4,
        roughness: 0.3
      });
      const card = new THREE.Mesh(cardGeo, cardMat);
      card.position.set(item.pos[0], item.pos[1], item.pos[2]);
      card.rotation.y = -0.4;

      // Glowing border
      const edgeGeo = new THREE.EdgesGeometry(cardGeo);
      const edgeMat = new THREE.LineBasicMaterial({ color: 0x0284c7 });
      const wire = new THREE.LineSegments(edgeGeo, edgeMat);
      card.add(wire);

      // Label on the card
      const labelCanvas = document.createElement('canvas');
      labelCanvas.width = 400;
      labelCanvas.height = 160;
      const ctx = labelCanvas.getContext('2d')!;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 400, 160);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.strokeRect(4, 4, 392, 152);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 24px monospace';
      ctx.fillText(item.title, 20, 60);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '18px monospace';
      ctx.fillText('CLICK TO INSPECT CASE STUDY', 20, 110);

      const labelTex = new THREE.CanvasTexture(labelCanvas);
      const labelMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(0.86, 0.34),
        new THREE.MeshBasicMaterial({ map: labelTex })
      );
      labelMesh.position.z = 0.02;
      card.add(labelMesh);

      card.userData = {
        label: `03 — ${item.title}`,
        sectionId: 'projects',
        type: 'project',
        detail: item.id
      } as InteractiveObjectData;

      this.interactiveObjects.push(card);
      this.floatingItems.push({
        mesh: card,
        baseY: item.pos[1],
        speed: 1.0 + idx * 0.3,
        amp: 0.03
      });

      this.group.add(card);
    });
  }

  private buildCertificationStation(): void {
    // 3D Floating Certificate Plaque
    const certGroup = new THREE.Group();
    certGroup.position.set(-0.85, 1.8, 0.1);
    certGroup.rotation.y = 0.22;

    const frameGeo = new THREE.BoxGeometry(0.85, 0.58, 0.03);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x0a101f,
      metalness: 0.8,
      roughness: 0.2
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    certGroup.add(frameMesh);

    const edgeGeo = new THREE.EdgesGeometry(frameGeo);
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x38bdf8 });
    const wire = new THREE.LineSegments(edgeGeo, edgeMat);
    certGroup.add(wire);

    // Canvas with certification credentials
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 340;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#060a14';
    ctx.fillRect(0, 0, 512, 340);

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, 500, 328);

    ctx.fillStyle = '#0284c7';
    ctx.fillRect(8, 8, 496, 45);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('COMPUTER TRAINING & CERTIFICATIONS', 20, 36);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px monospace';
    ctx.fillText('INSTITUTION: SOFTMEDIA COMPUTER TRAINING', 20, 85);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('• 2019 — DIPLOMA IN WEB DESIGNING', 20, 130);
    ctx.fillText('• 2018 — DESKTOP PUBLISHING (DTP)', 20, 175);
    ctx.fillText('• 2017 — DIPLOMA IN COMPUTER APPLICATIONS', 20, 220);

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 13px monospace';
    ctx.fillText('[ VERIFIED CREDENTIALS • CLICK TO INSPECT ]', 20, 290);

    const tex = new THREE.CanvasTexture(canvas);
    const plaqueMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.81, 0.54),
      new THREE.MeshBasicMaterial({ map: tex })
    );
    plaqueMesh.position.z = 0.018;

    plaqueMesh.userData = {
      label: '05 — COMPUTER TRAINING & CERTIFICATIONS',
      sectionId: 'certifications',
      type: 'navigation'
    } as InteractiveObjectData;

    this.interactiveObjects.push(plaqueMesh);
    certGroup.add(plaqueMesh);

    this.floatingItems.push({
      mesh: certGroup,
      baseY: 1.8,
      speed: 1.2,
      amp: 0.025
    });

    this.group.add(certGroup);
  }

  private buildNavigationBeacons(): void {
    // 3D Floating Beacons representing the primary navigation locations
    const stations: { id: SectionId; name: string; pos: [number, number, number] }[] = [
      { id: 'about', name: '02 ABOUT', pos: [-2.1, 2.8, 0.4] },
      { id: 'skills', name: '03 SKILLS', pos: [0, 2.65, -0.3] },
      { id: 'education', name: '04 EDUCATION', pos: [-1.4, 2.7, -0.2] },
      { id: 'certifications', name: '05 CERTS', pos: [-0.65, 2.45, -0.15] },
      { id: 'projects', name: '06 PROJECTS', pos: [2.2, 2.4, 0.4] },
      { id: 'resume', name: '07 RESUME', pos: [1.3, 2.4, -0.1] },
      { id: 'contact', name: '08 CONTACT', pos: [0, 1.45, 0.9] }
    ];

    stations.forEach((st, idx) => {
      const beaconGroup = new THREE.Group();
      beaconGroup.position.set(...st.pos);

      // Pill Mesh
      const pillGeo = new THREE.BoxGeometry(0.65, 0.16, 0.04);
      const pillMat = new THREE.MeshBasicMaterial({
        color: 0x0f172a,
        transparent: true,
        opacity: 0.88
      });
      const pill = new THREE.Mesh(pillGeo, pillMat);
      beaconGroup.add(pill);

      // Glowing edge
      const edge = new THREE.LineSegments(
        new THREE.EdgesGeometry(pillGeo),
        new THREE.LineBasicMaterial({ color: 0x38bdf8 })
      );
      beaconGroup.add(edge);

      // Text texture
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#0b1120';
      ctx.fillRect(0, 0, 256, 64);
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 22px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(st.name, 128, 32);

      const tex = new THREE.CanvasTexture(canvas);
      const textPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(0.62, 0.14),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true })
      );
      textPlane.position.z = 0.024;
      beaconGroup.add(textPlane);

      beaconGroup.userData = {
        label: st.name,
        sectionId: st.id,
        type: 'navigation'
      } as InteractiveObjectData;

      // Register pill as interactive click/hover target
      pill.userData = beaconGroup.userData;
      this.interactiveObjects.push(pill);

      this.floatingItems.push({
        mesh: beaconGroup,
        baseY: st.pos[1],
        speed: 1.2 + (idx % 3) * 0.2,
        amp: 0.025
      });

      this.group.add(beaconGroup);
    });
  }

  private buildParticles(quality: QualityLevel): void {
    const count = quality === 'high' ? 240 : quality === 'medium' ? 120 : 50;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = Math.random() * 6 + 0.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;

      // Subtle cyan and soft white particles
      const isCyan = Math.random() > 0.4;
      colors[i * 3] = isCyan ? 0.22 : 0.85;
      colors[i * 3 + 1] = isCyan ? 0.74 : 0.9;
      colors[i * 3 + 2] = isCyan ? 0.97 : 0.95;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    this.particlesMesh = new THREE.Points(geometry, material);
    this.group.add(this.particlesMesh);
  }

  private drawMainScreen(): void {
    const ctx = this.mainScreenCtx;
    const w = this.mainScreenCanvas.width;
    const h = this.mainScreenCanvas.height;

    // Background
    ctx.fillStyle = '#050811';
    ctx.fillRect(0, 0, w, h);

    // Header bar
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, 36);

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(20, 18, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(36, 18, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(52, 18, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px monospace';
    ctx.fillText('sarang@workspace: ~/projects/ml-engine', 72, 23);

    // Code lines
    ctx.fillStyle = '#38bdf8';
    ctx.font = '18px monospace';

    this.codeLines.forEach((line, idx) => {
      const y = 70 + idx * 28;
      if (line.startsWith('#') || line.startsWith('>>>')) {
        ctx.fillStyle = '#64748b';
      } else if (line.includes('loss:')) {
        ctx.fillStyle = '#4ade80';
      } else {
        ctx.fillStyle = '#cbd5e1';
      }
      ctx.fillText(line, 24, y);
    });

    // Neural Net Graphic Visualization on the right
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1.5;
    const startX = 700;
    const layers = [4, 6, 6, 2];
    layers.forEach((nodeCount, lIdx) => {
      const lx = startX + lIdx * 68;
      for (let n = 0; n < nodeCount; n++) {
        const ny = 120 + n * 40 - (nodeCount * 20);
        ctx.fillStyle = lIdx === 3 ? '#38bdf8' : '#64748b';
        ctx.beginPath();
        ctx.arc(lx, ny, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Scanline effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    for (let y = 0; y < h; y += 4) {
      ctx.fillRect(0, y, w, 1);
    }
  }

  private drawSideScreen(): void {
    const ctx = this.sideScreenCtx;
    const w = this.sideScreenCanvas.width;
    const h = this.sideScreenCanvas.height;

    ctx.fillStyle = '#060913';
    ctx.fillRect(0, 0, w, h);

    // Header
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, 32);
    ctx.fillStyle = '#38bdf8';
    ctx.font = '13px monospace';
    ctx.fillText('DATABASE_SCHEMA.sql [READONLY]', 16, 21);

    // Queries
    const sqlText = [
      '-- SARANG R N DATABASE ARCHITECTURE',
      'CREATE TABLE academic_portfolio (',
      '  id INT PRIMARY KEY AUTO_INCREMENT,',
      '  candidate_name VARCHAR(100) NOT NULL,',
      '  degree VARCHAR(50) DEFAULT "MCA",',
      '  university VARCHAR(100),',
      '  cgpa DECIMAL(3,2),',
      '  status ENUM("FIRST_CLASS")',
      ');',
      '',
      'INSERT INTO academic_portfolio VALUES (',
      '  1, "SARANG R N", "MCA",',
      '  "CUSAT", 7.66, "FIRST_CLASS"',
      ');',
      '',
      '-- ACTIVE SERVICES',
      '> PYTHON 3.12 [RUNNING]',
      '> MYSQL SERVER 8.0 [HEALTHY]',
      '> GIT WORKSPACE [SYNCED]'
    ];

    ctx.font = '14px monospace';
    sqlText.forEach((line, idx) => {
      if (line.startsWith('--')) {
        ctx.fillStyle = '#64748b';
      } else if (line.startsWith('>')) {
        ctx.fillStyle = '#38bdf8';
      } else if (line.includes('VARCHAR') || line.includes('INT') || line.includes('DECIMAL')) {
        ctx.fillStyle = '#818cf8';
      } else {
        ctx.fillStyle = '#cbd5e1';
      }
      ctx.fillText(line, 16, 65 + idx * 24);
    });
  }

  private drawIdCard(): void {
    const ctx = this.idCardCtx;
    const w = this.idCardCanvas.width;
    const h = this.idCardCanvas.height;

    // Dark sleek badge
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, w, h);

    // Subtle header gradient
    const grad = ctx.createLinearGradient(0, 0, w, 140);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(1, '#0284c7');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, 100);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px monospace';
    ctx.fillText('DEVELOPER CREDENTIAL ID', 24, 45);

    ctx.fillStyle = '#bae6fd';
    ctx.font = '14px monospace';
    ctx.fillText('AUTH: VERIFIED DIGITAL RESUME', 24, 75);

    // Profile photo placeholder / geometric avatar
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(24, 130, 120, 120);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 130, 120, 120);

    // Monogram 'S'
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 54px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SR', 84, 210);
    ctx.textAlign = 'left';

    // Candidate details
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(PERSONAL_DATA.name, 165, 160);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 15px monospace';
    ctx.fillText(PERSONAL_DATA.primaryTitle, 165, 190);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px monospace';
    ctx.fillText('SOFTWARE / PYTHON / ML', 165, 215);

    // Divider
    ctx.strokeStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(24, 275);
    ctx.lineTo(w - 24, 275);
    ctx.stroke();

    // Education box
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(24, 295, w - 48, 150);
    ctx.strokeStyle = '#1e293b';
    ctx.strokeRect(24, 295, w - 48, 150);

    ctx.fillStyle = '#64748b';
    ctx.font = '12px monospace';
    ctx.fillText('ACADEMIC QUALIFICATIONS & DEGREE', 40, 320);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('MCA — Cochin University (CUSAT)', 40, 345);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px sans-serif';
    ctx.fillText('BCA — Bharata Mata College (2019-22)', 40, 370);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('MCA CGPA: 7.66 / 10', 40, 405);

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 13px monospace';
    ctx.fillText('[ FIRST CLASS ]', 250, 405);

    ctx.fillStyle = '#64748b';
    ctx.font = '11px monospace';
    ctx.fillText('Certifications: Softmedia Computer Training (Web/DTP/DCA)', 40, 430);

    // Skills pill tags
    ctx.fillStyle = '#64748b';
    ctx.font = '12px monospace';
    ctx.fillText('CORE COMPETENCIES', 24, 480);

    const competencies = ['Python', 'Java', 'C', 'MySQL', 'Machine Learning', 'Git'];
    let cx = 24;
    let cy = 505;
    competencies.forEach((comp) => {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(cx, cy, 140, 32);
      ctx.strokeStyle = '#38bdf8';
      ctx.strokeRect(cx, cy, 140, 32);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '13px monospace';
      ctx.fillText(comp, cx + 12, cy + 21);

      cx += 155;
      if (cx > 320) {
        cx = 24;
        cy += 44;
      }
    });

    // Barcode at bottom
    ctx.fillStyle = '#64748b';
    for (let b = 24; b < w - 24; b += 6) {
      if (Math.random() > 0.3) {
        ctx.fillRect(b, 650, 3, 30);
      }
    }
  }

  public update(delta: number, elapsed: number): void {
    // 1. Oscillate floating items (ID badge, project cards, navigation pills)
    const timeSec = elapsed * 0.001;
    this.floatingItems.forEach(item => {
      item.mesh.position.y = item.baseY + Math.sin(timeSec * item.speed) * item.amp;
    });

    // 2. Pulse Server LEDs
    const blinkVal = Math.sin(timeSec * 8);
    this.animatedLEDs.forEach((mat, idx) => {
      mat.color.setHex((blinkVal + idx) % 2 > 0 ? 0x38bdf8 : 0x0284c7);
    });

    // 3. Drift ambient particles
    if (this.particlesMesh) {
      this.particlesMesh.rotation.y = timeSec * 0.02;
    }

    // 4. Periodically step the code monitor text
    if (Math.floor(elapsed / 2500) > this.epoch) {
      this.epoch = Math.floor(elapsed / 2500);
      const loss = (0.018 / (1 + (this.epoch % 20) * 0.1)).toFixed(4);
      this.codeLines[this.codeLines.length - 1] =
        `Training Epoch: ${(this.epoch % 50) + 1}/50 | Loss: ${loss} | Acc: 98.6%`;
      this.drawMainScreen();
      this.mainScreenTexture.needsUpdate = true;
    }
  }

  public destroy(): void {
    // Cleanup geometries, textures, materials
    this.group.clear();
    this.interactiveObjects = [];
  }
}
