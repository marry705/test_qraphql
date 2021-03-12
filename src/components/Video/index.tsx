import * as React from 'react';
import { useQuery } from '@apollo/client';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

import { InfoData } from '../../constants';
import VideoList from './VideoList';
import InfoAlert from '../InfoAlert';
import { GET_VID } from '../../constants/query';

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
      width: '50%',
    },
    '& .MuiListItem-gutters': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

const Video: React.FC = () => {
  const classes = useStyles();

  const { error, loading, data } = useQuery(GET_VID);
  const [info, setInfo] = React.useState<InfoData>(null);

  React.useEffect(() => {
    if (!loading && !data.files.length) {
      setInfo({ message: 'No videos', type: 'info' });
    }
    if (error) {
      setInfo({ message: error.message, type: 'error' });
      setTimeout(() => setInfo(null), 5000);
    }
  }, [loading, error, data]);

  return (
    <div className={classes.root}>
      {loading
        ? (
          <CircularProgress color="secondary" />
        )
        : (data.files.length)
          ? (
            <VideoList videosList={data.files} />
          )
          : <InfoAlert info={info} />}
    </div>
  );
};

export default Video;
