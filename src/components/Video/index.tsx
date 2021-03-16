import * as React from 'react';
import { useQuery } from '@apollo/client';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

import { InfoData } from '../../constants';
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
  const [info, setInfo] = React.useState<InfoData>(null);

  React.useEffect(() => {
    if (error) {
      setInfo({ message: error.message, type: 'error' });
      setTimeout(() => setInfo(null), 5000);
    }

    if (!loading && data && !data.files.length) {
      setInfo({ message: 'No videos', type: 'info' });
    }
  }, [loading, error, data]);

  return (
    <div className={classes.root}>
      {loading
        ? (
          <CircularProgress color="secondary" />
        )
        : (data && data.files.length)
          ? (
            <VideoList videos={data.files} />
          )
          : <InfoAlert info={info} />}
    </div>
  );
};

export default Video;
