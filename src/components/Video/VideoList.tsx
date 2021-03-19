import * as React from 'react';
import { List, ListItem } from '@material-ui/core';

import VideoCard from './VideoCard';

interface Props {
  videos: string[],
}

const VideoList: React.FC<Props> = ({ videos }: Props) => (
  <List>
    {videos.map((video) => (
      <ListItem key={video}>
        <VideoCard video={video} />
      </ListItem>
    ))}
  </List>
);

export default VideoList;
