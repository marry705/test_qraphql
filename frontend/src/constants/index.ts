export const ROUTES = {
  HOMEPAGE: '/homepage',
  UPLOAD: '/upload',
};

export const GRAPHQL_ENDPOINT = `http://localhost:5000/api`;
export const FILE_STREAM = `http://localhost:5000/files`;

export type InfoData = {
  message: string,
  type: 'error' | 'success' | 'info',
};
