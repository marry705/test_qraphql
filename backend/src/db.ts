import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const db = lowdb(new FileSync('db.json'));
db.defaults({ uploads: [] }).write();

export default db;
