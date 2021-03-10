import * as React from 'react';
import { CardMedia } from '@material-ui/core';

interface Props {
  video: string,
}

const VideoRow: React.FC<Props> = ({ video }: Props) => (
  <>
    <CardMedia
      src={video}
      component="video"
      autoPlay
    />
  </>
);

export default VideoRow;
