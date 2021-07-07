import * as React from 'react';
import { CardMedia } from '@material-ui/core';

interface Props {
  video: string,
}

const VideoCard: React.FC<Props> = ({ video }: Props) => (
  <CardMedia
    src={`${process.env.FILE_STREAM}/${video}`}
    component="video"
    controls
  />
);

export default VideoCard;
