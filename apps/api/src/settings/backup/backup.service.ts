import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { backup_database, projectPath, restore_database } from './sqlite-backup';

import Zip from 'adm-zip';
import { Observable, Observer } from '@iot/utility';

const restorePath = join(projectPath, 'backup/');

@Injectable()
export class BackupService implements Observable {
  private observers: Set<Observer>;

  constructor() {
    this.observers = new Set<Observer>();
  }
  notify(): void {
    this.observers.forEach((obs) => {
      obs.onUpdate();
    });
  }

  register(observer: Observer): void {
    this.observers.add(observer);
  }

  unregister(observer: Observer): void {
    this.observers.delete(observer);
  }

  async createBackup() {
    const backupPath = await backup_database();

    const zip = new Zip();
    zip.addLocalFile(backupPath);
    return zip.toBufferPromise();
  }

  async restore(file: Buffer) {
    const zip = new Zip(file);
    zip.extractEntryTo('db.bak', restorePath, false, true, false, 'restore.bak');
    await restore_database();
    this.notify();
  }
}
