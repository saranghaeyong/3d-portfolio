import * as THREE from 'three';
import { Sizes } from './Sizes';
import { Time } from './Time';
import { Camera } from './Camera';
import { DeveloperWorkspace } from './World/DeveloperWorkspace';
import { RayCaster } from './RayCaster';
import { SoundEngine } from './SoundEngine';
import { EventEmitter } from './EventEmitter';
import { QualityLevel, SectionId } from '../types';

export class Experience extends EventEmitter {
  private static instance: Experience | null = null;

  public canvas!: HTMLCanvasElement;
  public scene!: THREE.Scene;
  public sizes!: Sizes;
  public time!: Time;
  public camera!: Camera;
  public renderer!: THREE.WebGLRenderer;
  public workspace!: DeveloperWorkspace;
  public rayCaster!: RayCaster;
  public soundEngine!: SoundEngine;
  public quality: QualityLevel = 'high';

  constructor(canvas: HTMLCanvasElement, initialQuality: QualityLevel = 'high') {
    super();

    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;

    this.canvas = canvas;
    this.quality = initialQuality;

    this.init();
  }

  public static getInstance(): Experience | null {
    return Experience.instance;
  }

  private init(): void {
    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x04060a);
    this.scene.fog = new THREE.FogExp2(0x04060a, 0.04);

    // 2. Sizes & Time
    const dprLimit = this.quality === 'high' ? 1.5 : this.quality === 'medium' ? 1.25 : 1.0;
    this.sizes = new Sizes(dprLimit);
    this.time = new Time();

    // 3. Camera
    this.camera = new Camera(this.sizes, this.scene, this.canvas);

    // 4. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: this.quality !== 'low',
      powerPreference: 'high-performance',
      alpha: false
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.shadowMap.enabled = this.quality !== 'low';
    this.renderer.shadowMap.type = this.quality === 'high' ? THREE.PCFSoftShadowMap : THREE.BasicShadowMap;

    // 5. Sound Engine
    this.soundEngine = SoundEngine.getInstance();

    // 6. World (Developer Workspace)
    this.workspace = new DeveloperWorkspace(this.scene, this.quality);

    // 7. RayCaster
    this.rayCaster = new RayCaster(this.camera, this.sizes, this.canvas);
    this.rayCaster.setInteractiveObjects(this.workspace.interactiveObjects);

    // Raycaster event bridging
    this.rayCaster.on('hover', (data) => {
      this.trigger('hover', data);
    });
    this.rayCaster.on('select', (data) => {
      this.trigger('select', data);
    });

    // 8. Event Bindings
    this.sizes.on('resize', () => {
      this.resize();
    });

    this.time.on('tick', (delta: number, elapsed: number) => {
      this.update(delta, elapsed);
    });
  }

  public setQuality(level: QualityLevel): void {
    this.quality = level;
    const dprLimit = level === 'high' ? 1.5 : level === 'medium' ? 1.25 : 1.0;
    this.sizes.setDprLimit(dprLimit);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
    this.renderer.shadowMap.enabled = level !== 'low';

    // Rebuild workspace for particle count & shadow differences
    this.workspace.destroy();
    this.workspace = new DeveloperWorkspace(this.scene, this.quality);
    this.rayCaster.setInteractiveObjects(this.workspace.interactiveObjects);
    this.trigger('qualityChange', level);
  }

  public navigateTo(section: SectionId): Promise<void> {
    return this.camera.transitionTo(section);
  }

  private resize(): void {
    this.camera.resize();
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  private update(delta: number, elapsed: number): void {
    this.camera.update();
    this.workspace.update(delta, elapsed);
    this.rayCaster.update();
    this.renderer.render(this.scene, this.camera.instance);
  }

  public destroy(): void {
    this.time.destroy();
    this.workspace.destroy();
    this.renderer.dispose();
    Experience.instance = null;
  }
}
