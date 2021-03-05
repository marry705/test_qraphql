import * as React from 'react';
import { List, ListItem } from '@material-ui/core';

import VideoRow from './VideoRow';

interface Props {
  videosList: [],
}

const VideoList: React.FC<Props> = ({ videosList }: Props) => (
  <>
    <List>
      {videosList.map((video) => (
        <ListItem key={video.id}>
          <VideoRow video={video} />
        </ListItem>
      ))}
    </List>
  </>
);

export default VideoList;
