import { spawn } from 'child_process';

import { join } from 'path';

export const projectPath = join(__dirname, '../../../');

const prismaPath = join(projectPath, 'prisma');
export const backupFilePath = join(projectPath, 'backup/db.bak');
export const restoreFilePath = join(projectPath, 'backup/restore.bak');

export async function backup_database() {
  const filename = process.env.SQLITE_FILE_NAME || 'dev.db';
  const backup = spawn('sqlite3', [`${prismaPath}/${filename}`, `.backup '${backupFilePath}'`]);

  backup.stderr.on('data', (data) => {
    const buffer = data as Buffer;
    console.log(buffer.toLocaleString());
  });

  const exitCode = await new Promise((resolve) => {
    backup.on('close', resolve);
  });

  if (exitCode) {
    console.log(exitCode);
    throw new Error('Backup databasee process erorr');
  }

  return backupFilePath;
}

export async function restore_database() {
  const filename = process.env.SQLITE_FILE_NAME || 'dev.db';
  const restore = spawn('sqlite3', [`${prismaPath}/${filename}`, `.restore '${restoreFilePath}'`]);

  const exitCode = await new Promise((resolve) => {
    restore.on('close', resolve);
  });

  if (exitCode) {
    throw new Error('Backup databasee process erorr');
  }

  return;
}
