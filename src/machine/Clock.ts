export class Clock {
  private expected: number;
  private timeout: any; // TODO
  private delay: number;

  constructor(private timeInterval: number, private callback: () => void) {
    this.delay = 10;
  }

  start(): void {
    stop();
    this.expected = Date.now();
    this.moveOn();
  }

  stop(): void {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
  }

  private moveOn(): void {
    if (Date.now() >= this.expected) {
      this.callback();
      this.expected += this.timeInterval;
    }

    this.timeout = setTimeout(() => {
      this.moveOn();
    }, this.delay);
  }
}
