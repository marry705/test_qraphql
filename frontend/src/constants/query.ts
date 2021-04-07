import { gql } from '@apollo/client';

export const GET_VID = gql`
  query getFiles {
    files {
      filename
      id
    }
  }
`;

export const ADD_VIDEOS = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      success
    }
  }
`;

export interface VideosDataResponse {
  files: FileType[];
}

export interface FileType {
  filename: string;
  id: string;
}

export interface VideosDataUpload {
  success: boolean;
}
