export class Clock {
  private worker: Worker;

  constructor(private callback: () => void) {
    this.worker = new Worker('./clock.worker', { type: 'module' });

    this.worker.onmessage = (event: MessageEvent) => {
      switch (event.data.type) {
        case 'tick':
          this.callback();
          break;
      }
    };
  }

  start(): void {
    this.worker.postMessage({
      type: 'start',
    });
  }

  stop(): void {
    this.worker.postMessage({
      type: 'stop',
    });
  }

  setInterval(value: number): void {
    this.worker.postMessage({
      type: 'interval',
      value,
    });
  }
}
