import { createTestClient } from 'apollo-server-testing';
import path from 'path';
import {
  existsSync, mkdirSync, rmdirSync, readdirSync, statSync, unlinkSync, createReadStream,
} from 'fs';

import server from './server';
import { GET_VID, ADD_VIDEOS } from '../src/constants/query';
import dpp from './initDirectoryPath';

const testPath = path.join(__dirname, '../backend/tests/testFiles/');
const errorTestPath = path.join(__dirname, '../backend/tests/errorFiles/');
const testFilePath = path.join(__dirname, '../backend/tests/testFilePath/');

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
  expect(res?.data).toEqual({ files: [] });
});

test('Test Queries with error', async () => {
  dpp.setPath(errorTestPath);
  const { query: tQuery } = createTestClient(server);
  const res = await tQuery({ query: GET_VID });
  expect(res?.data).toBeNull();
  expect(res?.errors).toEqual([{ message: 'Internal server error' }]);
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
