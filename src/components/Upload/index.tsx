import * as React from 'react';
import { Input } from '@material-ui/core';

import { InfoData } from '../../constants';
import { getRequest } from '../../services/apiService';
import InfoAlert from '../InfoAlert';

const Upload: React.FC = () => {
  const [info, setInfo] = React.useState<InfoData>(null);

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append('File', files);

    getRequest('upload', 'POST', formData)
      .then(() => {
        setInfo({ message: 'Video saved successfully', type: 'success' });
        setTimeout(() => setInfo(null), 5000);
      })
      .catch((error: Error) => {
        setInfo({ message: error.message, type: 'error' });
        setTimeout(() => setInfo(null), 5000);
      });
  };

  return (
    <>
      <div>
        <Input
          onChange={onChangeHandle}
          fullWidth
          type="file"
        />
      </div>
      <InfoAlert info={info} />
    </>
  );
};

export default Upload;
