import * as React from 'react';
import { useQuery } from '@apollo/client';

import { InfoData } from '../../constants';
import VideoList from './VideoList';
import InfoAlert from '../InfoAlert';
import { GET_VID } from '../../constants/query';

const Video: React.FC = () => {
  const { error, loading, data } = useQuery(GET_VID);
  const [info, setInfo] = React.useState<InfoData>(null);

  React.useEffect(() => {
    if (error) {
      setInfo({ message: error.message, type: 'error' });
      setTimeout(() => setInfo(null), 5000);
    }
  }, [error]);

  return (
    <>
      {loading
        ? (
          <h1>Loading</h1>
        )
        : (data.files.length)
          ? (
            <VideoList videosList={data.files} />
          )
          : <InfoAlert info={info} />}
    </>
  );
};

export default Video;
