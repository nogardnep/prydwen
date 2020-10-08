export enum LogType {
  Error,
  Info,
}

export class LogManager {
  static log(type: LogType, something: any): void {
    switch (type) {
      case LogType.Error:
        console.log(something);
        break;
      case LogType.Info:
        console.error(something);
        break;
    }
  }
}
