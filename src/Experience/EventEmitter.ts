export type EventCallback = (...args: any[]) => void;

export class EventEmitter {
  private callbacks: { [key: string]: EventCallback[] } = {};

  public on(name: string, callback: EventCallback): this {
    if (!this.callbacks[name]) {
      this.callbacks[name] = [];
    }
    this.callbacks[name].push(callback);
    return this;
  }

  public off(name: string, callback?: EventCallback): this {
    if (!this.callbacks[name]) return this;
    if (!callback) {
      delete this.callbacks[name];
    } else {
      this.callbacks[name] = this.callbacks[name].filter(cb => cb !== callback);
    }
    return this;
  }

  public trigger(name: string, ...args: any[]): void {
    if (!this.callbacks[name]) return;
    this.callbacks[name].forEach(cb => {
      try {
        cb(...args);
      } catch (err) {
        console.error(`Error in event callback for ${name}:`, err);
      }
    });
  }
}
