import * as THREE from 'three';
import { EventEmitter } from './EventEmitter';
import { Camera } from './Camera';
import { Sizes } from './Sizes';
import { SoundEngine } from './SoundEngine';
import { InteractiveObjectData } from './World/DeveloperWorkspace';

export class RayCaster extends EventEmitter {
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private camera: Camera;
  private sizes: Sizes;
  private canvas: HTMLCanvasElement;
  private interactiveObjects: THREE.Mesh[] = [];

  private currentHovered: THREE.Mesh | null = null;
  private originalScale: THREE.Vector3 = new THREE.Vector3(1, 1, 1);

  constructor(camera: Camera, sizes: Sizes, canvas: HTMLCanvasElement) {
    super();
    this.camera = camera;
    this.sizes = sizes;
    this.canvas = canvas;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);

    this.initListeners();
  }

  public setInteractiveObjects(objects: THREE.Mesh[]): void {
    this.interactiveObjects = objects;
  }

  private initListeners(): void {
    window.addEventListener('mousemove', (e: MouseEvent) => {
      this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1;
      this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1;
      this.checkHover(e.clientX, e.clientY);
    });

    window.addEventListener('click', (e: MouseEvent) => {
      // Ignore click if user clicked on UI overlays
      const target = e.target as HTMLElement;
      if (target && target.tagName !== 'CANVAS') {
        return;
      }

      this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1;
      this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1;
      this.checkClick();
    });

    // Mobile touch tap
    window.addEventListener('touchend', (e: TouchEvent) => {
      if (e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        const target = e.target as HTMLElement;
        if (target && target.tagName !== 'CANVAS') return;

        this.mouse.x = (touch.clientX / this.sizes.width) * 2 - 1;
        this.mouse.y = -(touch.clientY / this.sizes.height) * 2 + 1;
        this.checkHover(touch.clientX, touch.clientY);
        this.checkClick();
      }
    });
  }

  private checkHover(clientX: number, clientY: number): void {
    this.raycaster.setFromCamera(this.mouse, this.camera.instance);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects, true);

    if (intersects.length > 0) {
      let hitMesh: THREE.Mesh | null = null;
      let data: InteractiveObjectData | null = null;

      for (const hit of intersects) {
        let cur: THREE.Object3D | null = hit.object;
        while (cur) {
          if (cur.userData && cur.userData.label) {
            hitMesh = hit.object as THREE.Mesh;
            data = cur.userData as InteractiveObjectData;
            break;
          }
          cur = cur.parent;
        }
        if (data) break;
      }

      if (hitMesh && data) {
        if (this.currentHovered !== hitMesh) {
          this.resetHover();
          this.currentHovered = hitMesh;
          this.originalScale.copy(hitMesh.scale);
          hitMesh.scale.multiplyScalar(1.05);

          SoundEngine.getInstance().playHover();
          this.canvas.style.cursor = 'pointer';
        }

        this.trigger('hover', {
          data,
          x: clientX,
          y: clientY
        });
        return;
      }
    }

    if (this.currentHovered) {
      this.resetHover();
      this.trigger('hover', null);
      this.canvas.style.cursor = 'default';
    }
  }

  private resetHover(): void {
    if (this.currentHovered) {
      this.currentHovered.scale.copy(this.originalScale);
      this.currentHovered = null;
    }
  }

  private checkClick(): void {
    this.raycaster.setFromCamera(this.mouse, this.camera.instance);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects, true);

    if (intersects.length > 0) {
      for (const hit of intersects) {
        let cur: THREE.Object3D | null = hit.object;
        while (cur) {
          if (cur.userData && cur.userData.label) {
            const data = cur.userData as InteractiveObjectData;
            SoundEngine.getInstance().playClick();
            this.trigger('select', data);
            return;
          }
          cur = cur.parent;
        }
      }
    }
  }

  public update(): void {
    // Continuous raycaster updates if needed
  }
}
