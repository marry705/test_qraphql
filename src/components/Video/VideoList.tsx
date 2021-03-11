import * as React from 'react';
import { List, ListItem } from '@material-ui/core';

import VideoRow from './VideoRow';

interface Props {
  videosList: [string],
}

const VideoList: React.FC<Props> = ({ videosList }: Props) => (
  <>
    <List>
      {videosList.map((video) => (
        <ListItem key={video}>
          <VideoRow video={video} />
        </ListItem>
      ))}
    </List>
  </>
);

export default VideoList;
