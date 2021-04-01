import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { FILE_STREAM } from '../../constants';
import VideoCard from './VideoCard';

afterEach(() => {
  cleanup();
});

test('Checking the initial rendering of the component VideoCard', async () => {
  const fileUrl = 'Pexels_Videos1722694.mp4';
  act(() => {
    render(
      <VideoCard video={fileUrl} />,
    );
  });

  const video = await document.querySelector('video');
  expect(video).toBeInTheDocument();
  expect(video.src).toBe(`${FILE_STREAM}/${fileUrl}`);
});
