export enum LogType {
  INFO = 'INFO',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

export interface Log {
  type: LogType;
  timestamp: number;
  message: string;
  error?: Error;
}

export class Logger {
  private static _instance: Logger;

  private logs: Log[] = [];

  private constructor() {}

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public info(message: string, timestamp: number = Date.now()) {
    const log: Log = {
      type: LogType.INFO,
      timestamp: timestamp,
      message: message,
    };

    this.logs.push(log);
    console.info(`${log.type} - ${new Date(log.timestamp).toISOString()}: ${log.message}`);
  }

  public error(message: string, error?: Error, timestamp: number = Date.now()) {
    const log: Log = {
      type: LogType.ERROR,
      timestamp: timestamp,
      message: message,
      error: error,
    };

    this.logs.push(log);
    console.error(`${log.type} - ${new Date(log.timestamp).toISOString()}: ${log.message}`, error);
  }

  public debug(message: string, timestamp: number = Date.now()) {
    const log: Log = {
      type: LogType.DEBUG,
      timestamp: timestamp,
      message: message,
    };

    this.logs.push(log);
    console.debug(`${log.type} - ${new Date(log.timestamp).toISOString()}: ${log.message}`);
  }

  public getLogs(debug = false): ReadonlyArray<Log> {
    if (debug) {
      return [...this.logs];
    }
    return this.logs.filter((log) => log.type !== LogType.DEBUG);
  }
}
