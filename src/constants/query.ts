import { gql } from '@apollo/client';

export const GET_VID = gql`
  query files {
    files
  }
`;

export const ADD_VID = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      success
    }
  }
`;
