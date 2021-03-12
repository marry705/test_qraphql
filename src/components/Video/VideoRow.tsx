import * as React from 'react';
import { CardMedia } from '@material-ui/core';
import { FILE_STREAM } from '../../constants';

interface Props {
  video: string,
}

const VideoRow: React.FC<Props> = ({ video }: Props) => (
  <>
    <CardMedia
      src={`${FILE_STREAM}/${video}`}
      component="video"
      controls
    />
  </>
);

export default VideoRow;
