import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { FileType } from '../../constants/query';
import { FILE_STREAM } from '../../constants';
import VideoList from './VideoList';

afterEach(() => {
  cleanup();
});

test('Checking the initial rendering of the component VideoList', async () => {
  const files: FileType[] = [
    { filename: 'Pexels_Videos1722689.mp4', id: '786345786734' },
    { filename: 'Pexels_Videos1722689.mp4', id: '786345786736' },
    { filename: 'Pexels_Videos1722689.mp4', id: '786345786834' },
  ];
  act(() => {
    render(
      <VideoList videos={files} />,
    );
  });

  const videos = await document.querySelectorAll('video');
  expect(videos[0].src).toBe(`${FILE_STREAM}/${files[0].filename}`);
  expect(videos[1].src).toBe(`${FILE_STREAM}/${files[1].filename}`);
  expect(videos[2].src).toBe(`${FILE_STREAM}/${files[2].filename}`);
});
