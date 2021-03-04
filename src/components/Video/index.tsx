import * as React from 'react';
import { Input } from '@material-ui/core';

import VideoList from './VideoList';

const Video: React.FC = () => {
  const urlInput = React.useRef<HTMLInputElement>(null);

  const keyPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (urlInput.current.value) {
        console.log(urlInput.current.value);
      }
    }
  };

  return (
    <>
      <div>
        <Input
          onKeyPress={keyPressHandler}
          inputRef={urlInput}
          type="text"
          placeholder="Enter video"
        />
      </div>
      <VideoList />
    </>
  );
};

export default Video;
