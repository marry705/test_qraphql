
import path from 'path';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { unlinkSync } from 'fs';

interface Database {
  uploads: Array<{ filename: string, id: string; }>;
}

export class DB {
    name = '';
    db: lowdb.LowdbSync<Database> = null;

    getField(): Array<{ filename: string, id: string; }> {
      return this.db.get('uploads').value();
    }

    addField(file: { filename: string, id: string; }): void {
      this.db.get('uploads').push(file).write();
    }

    createDB(fileName: string): void {
      if (this.name !== fileName) {
        this.name = fileName;
        this.db = lowdb(new FileSync<Database>(`${fileName}.json`));
        this.db.defaults({ uploads: [] }).write();
      }
    }

    removeDB(fileName: string): void {
      if (this.name === fileName) {
        unlinkSync(path.join(__dirname, `../../${fileName}.json`));
        this.db = null;
        this.name = '';
      }
    }
}
