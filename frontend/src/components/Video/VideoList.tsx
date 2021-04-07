import * as React from 'react';
import { List, ListItem } from '@material-ui/core';

import VideoCard from './VideoCard';
import { FileType } from '../../constants/query';

interface Props {
  videos: FileType[],
}

const VideoList: React.FC<Props> = ({ videos }: Props) => (
  <List>
    {videos.map((video) => (
      <ListItem key={video.id}>
        <VideoCard video={video.filename} />
      </ListItem>
    ))}
  </List>
);

export default VideoList;
