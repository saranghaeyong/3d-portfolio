import * as THREE from 'three';
import gsap from 'gsap';
import { Sizes } from './Sizes';
import { SectionId } from '../types';
import { SoundEngine } from './SoundEngine';

export interface CameraStation {
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov?: number;
}

export class Camera {
  public instance!: THREE.PerspectiveCamera;
  private sizes: Sizes;
  private scene: THREE.Scene;
  private canvas: HTMLCanvasElement;
  public target: THREE.Vector3 = new THREE.Vector3(0, 1.2, 0);
  public currentSection: SectionId = 'intro';
  public isTransitioning: boolean = false;

  // Mouse parallax
  private mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  private stations: Record<SectionId, CameraStation> = {
    intro: {
      position: new THREE.Vector3(0, 3.6, 7.8),
      target: new THREE.Vector3(0, 1.3, 0),
      fov: 52
    },
    about: {
      position: new THREE.Vector3(-2.6, 2.2, 4.2),
      target: new THREE.Vector3(-2.1, 1.7, 0.4),
      fov: 48
    },
    skills: {
      position: new THREE.Vector3(0, 2.6, 4.6),
      target: new THREE.Vector3(0, 1.8, 0.2),
      fov: 48
    },
    education: {
      position: new THREE.Vector3(-1.8, 2.8, 4.2),
      target: new THREE.Vector3(-1.4, 2.0, 0.2),
      fov: 46
    },
    certifications: {
      position: new THREE.Vector3(-0.9, 2.4, 3.8),
      target: new THREE.Vector3(-0.7, 1.8, 0.2),
      fov: 46
    },
    projects: {
      position: new THREE.Vector3(2.6, 2.2, 4.2),
      target: new THREE.Vector3(2.0, 1.6, 0.4),
      fov: 48
    },
    resume: {
      position: new THREE.Vector3(1.6, 2.6, 4.2),
      target: new THREE.Vector3(1.2, 1.9, 0.2),
      fov: 46
    },
    contact: {
      position: new THREE.Vector3(0, 1.9, 3.4),
      target: new THREE.Vector3(0, 1.3, 0.2),
      fov: 48
    }
  };

  constructor(sizes: Sizes, scene: THREE.Scene, canvas: HTMLCanvasElement) {
    this.sizes = sizes;
    this.scene = scene;
    this.canvas = canvas;

    this.initCamera();
    this.initMouseListener();
  }

  private initCamera(): void {
    const defaultStation = this.stations.intro;
    this.instance = new THREE.PerspectiveCamera(
      defaultStation.fov || 52,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.copy(defaultStation.position);
    this.target.copy(defaultStation.target);
    this.instance.lookAt(this.target);
    this.scene.add(this.instance);
  }

  private initMouseListener(): void {
    window.addEventListener('mousemove', (e: MouseEvent) => {
      this.mouse.targetX = (e.clientX / this.sizes.width - 0.5) * 2;
      this.mouse.targetY = -(e.clientY / this.sizes.height - 0.5) * 2;
    });

    // Touch support for mobile subtle tilt
    window.addEventListener('touchmove', (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        this.mouse.targetX = (touch.clientX / this.sizes.width - 0.5) * 1.5;
        this.mouse.targetY = -(touch.clientY / this.sizes.height - 0.5) * 1.5;
      }
    }, { passive: true });
  }

  public transitionTo(section: SectionId, duration: number = 1.6): Promise<void> {
    if (this.currentSection === section && !this.isTransitioning) {
      return Promise.resolve();
    }

    const station = this.stations[section] || this.stations.intro;
    this.currentSection = section;
    this.isTransitioning = true;

    SoundEngine.getInstance().playWhoosh();

    return new Promise((resolve) => {
      gsap.killTweensOf(this.instance.position);
      gsap.killTweensOf(this.target);
      gsap.killTweensOf(this.instance);

      const timeline = gsap.timeline({
        onComplete: () => {
          this.isTransitioning = false;
          SoundEngine.getInstance().playChime();
          resolve();
        }
      });

      timeline.to(this.instance.position, {
        x: station.position.x,
        y: station.position.y,
        z: station.position.z,
        duration,
        ease: "power2.inOut"
      }, 0);

      timeline.to(this.target, {
        x: station.target.x,
        y: station.target.y,
        z: station.target.z,
        duration,
        ease: "power2.inOut",
        onUpdate: () => {
          this.instance.lookAt(this.target);
        }
      }, 0);

      if (station.fov) {
        timeline.to(this.instance, {
          fov: station.fov,
          duration,
          ease: "power2.inOut",
          onUpdate: () => {
            this.instance.updateProjectionMatrix();
          }
        }, 0);
      }
    });
  }

  public resize(): void {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    // Responsive adjustment: wider fov on narrow screens (portrait mobile)
    if (this.sizes.width < 768) {
      this.instance.fov = 65;
    } else {
      const station = this.stations[this.currentSection];
      this.instance.fov = station?.fov || 52;
    }
    this.instance.updateProjectionMatrix();
  }

  public update(): void {
    // Smooth mouse parallax interpolation
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    if (!this.isTransitioning) {
      const parallaxFactor = 0.35;
      const currentStation = this.stations[this.currentSection] || this.stations.intro;

      this.instance.position.x = currentStation.position.x + this.mouse.x * parallaxFactor;
      this.instance.position.y = currentStation.position.y + this.mouse.y * (parallaxFactor * 0.5);

      const lookTarget = this.target.clone();
      lookTarget.x += this.mouse.x * (parallaxFactor * 0.3);
      lookTarget.y += this.mouse.y * (parallaxFactor * 0.2);
      this.instance.lookAt(lookTarget);
    }
  }
}
