import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, cleanup, fireEvent,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import { ADD_VIDEOS } from '../../constants/query';
import Upload from '.';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

const fileData: File = new File([''], 'Pexels_Videos1722694.mp4', { type: 'video/mp4' });

test('Checking the initial rendering of the component Upload', async () => {
  const mocks = {
    request: {
      query: ADD_VIDEOS,
      variables: { file: fileData },
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
  const button = await screen.getByRole('button', { name: 'Upload' });
  expect(button).toBeInTheDocument();
});

test('Checking the button and file input in the component Upload', async () => {
  let createMutationCalled = false;
  const mocks = {
    request: {
      query: ADD_VIDEOS,
      variables: { file: fileData },
    },
    result: () => {
      createMutationCalled = true;
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

  const inputNode = await document.querySelector('input');
  const button = await screen.getByRole('button', { name: 'Upload' });

  fireEvent.change(inputNode, { target: { files: [fileData] } });
  expect(button).not.toBeDisabled();
  fireEvent.click(button);

  await act(async () => {
    wait(0);
  });

  expect(button).toBeDisabled();
  expect(createMutationCalled).toBe(true);
});

test('Checking the upload function with success in the component Upload', async () => {
  const mocks = {
    request: {
      query: ADD_VIDEOS,
      variables: { file: fileData },
    },
    result: () => ({
      data: {
        uploadFile: {
          success: true,
        },
      },
    }),
  };

  await act(async () => {
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Upload />
      </MockedProvider>,
    );
  });

  const inputNode = await document.querySelector('input');
  const button = await screen.getByRole('button', { name: 'Upload' });

  fireEvent.change(inputNode, { target: { files: [fileData] } });
  fireEvent.click(button);

  await act(async () => {
    wait(0);
  });

  const alert = await screen.getByText('Video saved successfully');
  expect(alert).toBeInTheDocument();
});

test('Checking the upload function with no success in the component Upload', async () => {
  const mocks = {
    request: {
      query: ADD_VIDEOS,
      variables: { file: fileData },
    },
    result: () => ({
      data: {
        uploadFile: {
          success: false,
        },
      },
    }),
  };

  await act(async () => {
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Upload />
      </MockedProvider>,
    );
  });

  const inputNode = await document.querySelector('input');
  const button = await screen.getByRole('button', { name: 'Upload' });

  fireEvent.change(inputNode, { target: { files: [fileData] } });
  fireEvent.click(button);

  await act(async () => {
    wait(0);
  });

  const alert = await screen.getByText('Video didn\'t save');
  expect(alert).toBeInTheDocument();
});

test('Checking the upload function with success in the component Upload', async () => {
  const mocks = {
    request: {
      query: ADD_VIDEOS,
      variables: { file: fileData },
    },
    result: () => ({
      data: {
        uploadFile: {
          success: true,
        },
      },
    }),
  };

  await act(async () => {
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Upload />
      </MockedProvider>,
    );
  });

  const inputNode = await document.querySelector('input');
  const button = await screen.getByRole('button', { name: 'Upload' });

  fireEvent.change(inputNode, { target: { files: [fileData] } });
  fireEvent.click(button);

  await act(async () => {
    wait(0);
  });

  const alert = await screen.getByText('Video saved successfully');
  expect(alert).toBeInTheDocument();
});

test('Checking the upload function with no success in the component Upload', async () => {
  const mocks = {
    request: {
      query: ADD_VIDEOS,
      variables: { file: fileData },
    },
    error: new Error('An error occurred'),
  };

  await act(async () => {
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Upload />
      </MockedProvider>,
    );
  });

  const inputNode = await document.querySelector('input');
  const button = await screen.getByRole('button', { name: 'Upload' });

  fireEvent.change(inputNode, { target: { files: [fileData] } });
  fireEvent.click(button);

  await act(async () => {
    wait(0);
  });

  const alert = await screen.getByText('An error occurred');
  expect(alert).toBeInTheDocument();
});
