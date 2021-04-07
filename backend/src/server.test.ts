import { createTestClient } from 'apollo-server-testing';
import path from 'path';
import {
  existsSync, mkdirSync, rmdirSync, readdirSync, statSync, unlinkSync, createReadStream,
} from 'fs';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import server from './server';
import { GET_VID, ADD_VIDEOS } from '../src/constants/query';
import dpp from './dir/initDirectoryPath';

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
  if (!existsSync(testPath)) {
    mkdirSync(testPath);
  }
  dpp.setPath(testPath);
});

afterEach(() => {
  removeDir(testPath);
  jest.clearAllMocks();
});

test('Test Queries without error', async () => {
  const { query: tQuery } = createTestClient(server);
  const res = await tQuery({ query: GET_VID });
  expect(res?.errors).toBeUndefined();
  console.log(res?.data?.files);
  expect(res?.data?.files?.filename).toEqual("pexels-nadezhda-moryak-6340529.mp4");
});

test('Test Mutation with data', async () => {
  const { mutate: tMutation } = createTestClient(server);
  const file = createReadStream(path.join(testFilePath, 'test.mp4'));
  const res = await tMutation({
    mutation: ADD_VIDEOS,
    variables: {
      file: new Promise((resolve) => resolve({
        createReadStream: () => file,
        stream: file,
        filename: 'test.mp4',
        mimetype: 'video/mp4',
      })),
    },
  });
  expect(res?.errors).toBeUndefined();
  expect(res?.data).toEqual({ uploadFile: { success: true } });
  expect(readdirSync(testPath).length).toEqual(1);
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
