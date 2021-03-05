import * as React from 'react';

import { InfoData } from '../../constants';
import { getRequest } from '../../services/apiService';
import VideoList from './VideoList';
import InfoAlert from '../InfoAlert';

const Video: React.FC = () => {
  const [info, setInfo] = React.useState<InfoData>(null);
  const [videos, setVideos] = React.useState<[]>([]);

  React.useEffect(() => {
    getRequest('get', 'GET', null)
      .then((res) => {
        if (res.length) {
          setVideos(res);
        } else {
          setInfo({ message: '', type: 'success' });
        }
      })
      .catch((error: Error) => {
        setInfo({ message: error.message, type: 'error' });
        setTimeout(() => setInfo(null), 5000);
      });
  }, []);

  return (
    <>
      {videos.length
        ? (
          <VideoList videosList={videos} />
        )
        : <InfoAlert info={info} />}
    </>
  );
};

export default Video;
