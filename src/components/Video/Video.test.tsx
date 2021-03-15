import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, cleanup,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import { GET_VID } from '../../constants/query';
import Video from '.';

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

test('Checking the initial rendering of the component Video without error', async () => {
  const files: string[] = [
    'Pexels_Videos1722694.mp4',
    'Pexels_Videos1722689.mp4',
    'Pexels_Videos3732694.mp4',
  ];
  const mocks = {
    request: {
      query: GET_VID,
    },
    result: {
      data: {
        files,
      },
    },
  };

  await act(async () => {
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Video />
      </MockedProvider>,
    );
  });

  const loadingSvg = await document.querySelector('circle');
  expect(loadingSvg).toBeInTheDocument();

  await act(async () => {
    wait(0);
  });

  const videosContainer = await document.querySelector('ul');
  expect(videosContainer).toBeInTheDocument();

  const videos = await document.querySelectorAll('li');
  expect(videos.length).toBe(files.length);
});

test('Checking the initial rendering of the component Video without data', async () => {
  const files: string[] = [];
  const mocks = {
    request: {
      query: GET_VID,
    },
    result: {
      data: {
        files,
      },
    },
  };

  await act(async () => {
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Video />
      </MockedProvider>,
    );
  });

  const alert = await screen.getByText('No videos');
  expect(alert).toBeInTheDocument();
});

test('Checking the initial rendering of the component Video with error', async () => {
  const mocks = {
    request: {
      query: GET_VID,
    },
    error: new Error('An error occurred'),
  };

  await act(async () => {
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Video />
      </MockedProvider>,
    );
  });

  const alert = await screen.getByText('An error occurred');
  expect(alert).toBeInTheDocument();
});
