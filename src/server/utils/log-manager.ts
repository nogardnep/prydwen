export enum LogType {
  Error,
  Info,
}

export class LogManager {
  static log(type: LogType, message: string) {
    switch (type) {
      case LogType.Error:
        console.log(message);
        break;
      case LogType.Info:
        console.error(message);
        break;
    }
  }
}
