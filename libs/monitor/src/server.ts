import { CacheMonitorStats } from './common';

export enum CacheRecordType {
  CACHE_WRITE,
  DATABASE_WRITE,
}

export interface CacheRecord {
  type: CacheRecordType;
  timestamp: number;
}

const oneHourMs = 60 * 60 * 3600;

export class Monitor {
  private static _instance: Monitor;
  private records: CacheRecord[] = [];

  private constructor() {
    console.log('Creating monitor instance.');
    setInterval(() => {
      this.filterHourOldRecords();
    }, oneHourMs);
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public createRecord(type: CacheRecordType, timestamp: number = Date.now()) {
    this.records.push({ type, timestamp });
  }

  public getCacheStats(): CacheMonitorStats {
    const stats: CacheMonitorStats = { cacheWrites: 0, databaseWrites: 0 };
    const records = this.getHourOldRecords();

    for (const record of records) {
      switch (record.type) {
        case CacheRecordType.CACHE_WRITE:
          stats.cacheWrites++;
          break;
        case CacheRecordType.DATABASE_WRITE:
          stats.databaseWrites++;
          break;
      }
    }

    return stats;
  }

  private filterHourOldRecords() {
    this.records = this.getHourOldRecords();
    console.log('Monitor: removing old records');
  }

  private getHourOldRecords() {
    const thresholdDate = Date.now() - oneHourMs;
    return this.records.filter((record) => record.timestamp >= thresholdDate);
  }
}
