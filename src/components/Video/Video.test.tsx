import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, cleanup, waitFor,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import { GraphQLError } from 'graphql';

import { GET_VID } from '../../constants/query';
import Video from '.';

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

test('Checking the initial rendering of the component Video with data', async () => {
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

  await waitFor(() => {
    expect(document.querySelector('ul')).toBeInTheDocument();
    expect(document.querySelectorAll('li').length).toBe(files.length);
  });
});

test('Checking the rendering of the component Video with error', async () => {
  const mocks = {
    request: {
      query: GET_VID,
    },
    result: {
      errors: [new GraphQLError('New Error!')],
    },
  };

  await act(async () => {
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Video />
      </MockedProvider>,
    );
  });

  const alert = await screen.getByText('New Error!');
  expect(alert).toBeInTheDocument();
});

test('Checking the rendering of the component Video without data', async () => {
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

test('Checking the rendering of the component Video with network error', async () => {
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
