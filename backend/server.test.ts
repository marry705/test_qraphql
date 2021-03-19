import { createTestClient } from 'apollo-server-testing';

import server from './server';
import { GET_VID } from '../src/constants/query';

let tQuery = null;
let tMutation = null;

beforeEach(() => {
  const { query: tQuery, mutate: tMutation } = createTestClient(server);
});

afterEach(() => {
  jest.clearAllMocks();
});

test('Test Queries', async () => {
  // const res = await tQuery({ query: GET_VID });
  // expect(res.errors).toBe(undefined);
  // expect(res?.data?.files).toEqual([]);
});

test('Test Mutation', async () => {
  // const res = await tMutation({ query: GET_MOVIES });
  // expect(res.errors).toBe(undefined);
  // expect(moviesAPI.get).toHaveBeenCalledWith('movies');
  // expect(res?.data?.movies).toEqual(moviesSample());
});
