import * as React from 'react';
import { useQuery } from '@apollo/client';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

import VideoList from './VideoList';
import InfoAlert from '../InfoAlert';
import { GET_VID, VideosDataResponse } from '../../constants/query';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(2),
    height: '100vh',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto',
    '& .MuiList-padding': {
      width: '30%',
    },
    '& .MuiListItem-gutters': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

const Video: React.FC = () => {
  const classes = useStyles();

  const { error, loading, data } = useQuery<VideosDataResponse>(GET_VID);

  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.root}>
        <InfoAlert info={{ message: error.message, type: 'error' }} />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {(data?.files?.length)
        ? (
          <VideoList videos={data.files} />
        )
        : <InfoAlert info={{ message: 'No videos', type: 'info' }} />}
    </div>
  );
};

export default Video;
