import { EventEmitter } from './EventEmitter';

export class Time extends EventEmitter {
  public start: number;
  public current: number;
  public elapsed: number;
  public delta: number;
  private animFrameId: number | null = null;
  private isRunning: boolean = false;

  constructor() {
    super();
    this.start = performance.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16.6;
    this.isRunning = true;

    this.tick = this.tick.bind(this);
    this.animFrameId = window.requestAnimationFrame(this.tick);
  }

  private tick(now: number): void {
    if (!this.isRunning) return;

    this.delta = now - this.current;
    this.current = now;
    this.elapsed = now - this.start;

    this.trigger('tick', this.delta, this.elapsed);

    this.animFrameId = window.requestAnimationFrame(this.tick);
  }

  public destroy(): void {
    this.isRunning = false;
    if (this.animFrameId !== null) {
      window.cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }
}
