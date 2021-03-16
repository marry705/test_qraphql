import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { FILE_STREAM } from '../../constants';
import VideoList from './VideoList';

afterEach(() => {
  cleanup();
});

test('Checking the initial rendering of the component VideoList', async () => {
  const files: string[] = [
    'Pexels_Videos1722694.mp4',
    'Pexels_Videos1722689.mp4',
    'Pexels_Videos3732694.mp4',
  ];
  act(() => {
    render(
      <VideoList videos={files} />,
    );
  });

  const videos = await document.querySelectorAll('video');
  expect(videos.length).toBe(files.length);
  expect(videos[0].src).toBe(`${FILE_STREAM}/${files[0]}`);
  expect(videos[1].src).toBe(`${FILE_STREAM}/${files[1]}`);
  expect(videos[2].src).toBe(`${FILE_STREAM}/${files[2]}`);
});
