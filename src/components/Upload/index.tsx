import * as React from 'react';
import { Button, Input } from '@material-ui/core';

import { InfoData } from '../../constants';
import { getRequest } from '../../services/apiService';
import InfoAlert from '../InfoAlert';

const Upload: React.FC = () => {
  const [info, setInfo] = React.useState<InfoData>(null);
  const [FileData, setFileData] = React.useState<FormData>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append('file', files, files.name);
    setFileData(formData);
  };

  const onClickHandle = () => {
    setInfo(null);
    setLoading(true);
    getRequest('upload', 'POST', FileData)
      .then(() => {
        setInfo({ message: 'Video saved successfully', type: 'success' });
        setTimeout(() => setInfo(null), 5000);
      })
      .catch((error: Error) => {
        setInfo({ message: error.message, type: 'error' });
        setTimeout(() => setInfo(null), 5000);
      })
      .finally(() => {
        setLoading(false);
        setFileData(null);
      });
  };

  return (
    <>
      <form
        onSubmit={(e) => { e.preventDefault(); }}
      >
        <input
          onChange={onChangeHandle}
          type="file"
          // accept="video/mp4, video/x-m4v, video/*"
          accept="image/png, image/jpeg"
          disabled={loading}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={onClickHandle}
          disabled={loading || !FileData}
        >
          Upload
        </Button>
      </form>
      <InfoAlert info={info} />
    </>
  );
};

export default Upload;
