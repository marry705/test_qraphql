import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, cleanup, fireEvent, waitFor,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import { GraphQLError } from 'graphql';

import { ADD_VIDEOS } from '../../constants/query';
import Upload from '.';

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

test('Checking the initial rendering of the component Upload', async () => {
  const mocks = {
    request: {
      query: ADD_VIDEOS,
      variables: { file: {} },
    },
    result: {
      data: {
        uploadFile: {
          success: true,
        },
      },
    },
  };
  act(() => {
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Upload />
      </MockedProvider>,
    );
  });

  const inputNode = await document.querySelector('input');
  expect(inputNode).toBeInTheDocument();
});

test('Checking the file input in the component Upload', async () => {
  let createMutationCalled = 0;
  const fileData: File = new File(['Pexels_Videos1722694'], 'Pexels_Videos1722694.mp4', { type: 'video/mp4' });

  const mocks = {
    request: {
      query: ADD_VIDEOS,
      variables: { file: fileData },
    },
    result: () => {
      createMutationCalled += 1;
      return {
        data: {
          uploadFile: {
            success: true,
          },
        },
      };
    },
  };

  await act(async () => {
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Upload />
      </MockedProvider>,
    );
  });

  const inputNode = document.querySelector('input');
  fireEvent.change(inputNode, { target: { files: [fileData] } });

  await waitFor(() => {
    expect(createMutationCalled).toBe(1);
    expect(screen.getByText('Video saved successfully')).toBeInTheDocument();
  });
});

test('Checking the upload function with error in the component Upload', async () => {
  let createMutationCalled = 0;
  const errorMessage = 'Server Error!';
  const fileData: File = new File(['Pexels_Videos1722694'], 'Pexels_Videos1722694.mp4', { type: 'video/mp4' });

  const mocks = {
    request: {
      query: ADD_VIDEOS,
      variables: { file: fileData },
    },
    result: () => {
      createMutationCalled += 1;
      return {
        errors: [new GraphQLError(errorMessage)],
      };
    },
  };

  await act(async () => {
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Upload />
      </MockedProvider>,
    );
  });

  const inputNode = document.querySelector('input');
  fireEvent.change(inputNode, { target: { files: [fileData] } });

  await waitFor(() => {
    expect(createMutationCalled).toBe(1);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});

test('Checking the rendering of the component Upload with network error', async () => {
  const fileData: File = new File(['Pexels_Videos1722694'], 'Pexels_Videos1722694.mp4', { type: 'video/mp4' });
  const errorMessage = 'Network Error!';

  const mocks = {
    request: {
      query: ADD_VIDEOS,
      variables: { file: fileData },
    },
    error: new Error(errorMessage),
  };

  await act(async () => {
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Upload />
      </MockedProvider>,
    );
  });

  const inputNode = document.querySelector('input');
  fireEvent.change(inputNode, { target: { files: [fileData] } });

  await waitFor(() => {
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
