import { EventEmitter } from './EventEmitter';

export class Sizes extends EventEmitter {
  public width: number;
  public height: number;
  public pixelRatio: number;

  constructor(customDprLimit: number = 1.5) {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, customDprLimit);

    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio || 1, customDprLimit);
      this.trigger('resize');
    });

    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio || 1, customDprLimit);
        this.trigger('resize');
      }, 100);
    });
  }

  public setDprLimit(limit: number): void {
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, limit);
    this.trigger('resize');
  }

  public resize(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.trigger('resize');
  }
}
