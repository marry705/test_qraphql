import * as React from 'react';
import { List, ListItem } from '@material-ui/core';

// import VideoRow from './VideoRow';

const VideoList: React.FC = () => {
  const videos = [{ id: '1', name: '123' }, { id: '2', name: '231' }];
  return (
    <>
      <div>
        <List>
          {videos.map((video) => (
            <ListItem key={video.id}>
              {/* <VideoRow video={video} /> */}
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};

export default VideoList;
