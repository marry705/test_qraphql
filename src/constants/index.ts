export const ROUTES = {
  HOMEPAGE: '/homepage',
  UPLOAD: '/upload',
};

export const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';
export const FILE_STREAM = 'http://localhost:4000/files';

export type InfoData = {
  message: string,
  type: 'error' | 'success',
};
