import { createWriteStream } from 'fs';
import shortid from 'shortid';
import db from './db';
import dpp from './dir/initDirectoryPath';

const storeUpload = async (upload): Promise<{ 'success': boolean }> => {
  const { createReadStream, filename } = await upload;
  const stream = createReadStream();
  const path = `${dpp.getPath()}${filename}`;
  const id = shortid.generate();
  const file = { filename, id };

  await new Promise((resolve, reject) => {
    const writeStream = createWriteStream(path);
    writeStream.on('finish', resolve);
    writeStream.on('error', (error) => reject(error));
    stream.on('error', (error) => writeStream.destroy(error));
    stream.pipe(writeStream);
  });
  
  db.get('uploads').push(file).write();
  
  return { 'success': true };
}

export default storeUpload;
