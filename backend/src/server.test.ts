import { createTestClient } from 'apollo-server-testing';
import path from 'path';
import {
  existsSync, mkdirSync, rmdirSync, readdirSync, statSync, unlinkSync, createReadStream,
} from 'fs';
import { Upload } from 'graphql-upload';

import server from './server';
import { GET_VID, ADD_VIDEOS } from '../src/constants/query';
import dpp from './dir/initDirectoryPath';
import db from './db/initDB';

const testPath = path.join(__dirname, '../src/testFiles/');
const testFilePath = path.join(__dirname, '../src/testFilePath/');

const removeDir = (folderPath: string): void => {
  if (existsSync(folderPath)) {
    const files = readdirSync(folderPath);

    if (files.length > 0) {
      files.forEach((filename) => {
        if (statSync(`${folderPath}/${filename}`).isDirectory()) {
          removeDir(`${folderPath}/${filename}`);
        } else {
          unlinkSync(`${folderPath}/${filename}`);
        }
      });
    }
    rmdirSync(folderPath);
  }
};

beforeEach(() => {
  db.createDB('db_ex');
  dpp.setPath(testPath);
  if (!existsSync(dpp.getPath())) {
    mkdirSync(dpp.getPath());
  }
});

afterEach(() => {
  removeDir(dpp.getPath());
  db.removeDB('db_ex');
  jest.clearAllMocks();
});

test('Test Queries without error', async () => {
  const { query: tQuery } = createTestClient(server);
  const res = await tQuery({ query: GET_VID });
  expect(res?.errors).toBeUndefined();
  expect(res?.data?.files).toEqual([]);
});

test('Test Mutation with data', async () => {
  const { mutate: tMutation } = createTestClient(server);
  const file = createReadStream(path.join(testFilePath, 'test.mp4'));
  const fileP = new Upload();
  fileP.promise = Promise.resolve({
    createReadStream: () => file,
    stream: file,
    filename: 'test.mp4',
    mimetype: `video/mpeg4`,
  });
  const res = await tMutation({
    mutation: ADD_VIDEOS,
    variables: { file: fileP },
  });
  expect(res?.errors).toBeUndefined();
  expect(res?.data).toEqual({ uploadFile: { success: true } });
  expect(db.getField().length).toEqual(1);
});

test('Test Mutation without variables', async () => {
  const { mutate: tMutation } = createTestClient(server);
  const res = await tMutation({
    mutation: ADD_VIDEOS,
    variables: { file: null },
  });
  expect(res?.data).toBeUndefined();
  expect(res?.errors).toEqual([{ message: 'Internal server error' }]);
});
