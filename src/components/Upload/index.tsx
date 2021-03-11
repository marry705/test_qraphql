import * as React from 'react';
import { Button } from '@material-ui/core';
import { useMutation } from '@apollo/client';

import { InfoData } from '../../constants';
import InfoAlert from '../InfoAlert';
import { ADD_VID } from '../../constants/query';

const Upload: React.FC = () => {
  const [UploadFile, { loading, error }] = useMutation(ADD_VID, {
    onCompleted: (data) => {
      if (data.uploadFile.success) {
        setInfo({ message: 'Video saved successfully', type: 'success' });
        setTimeout(() => setInfo(null), 5000);
        setFileData(null);
      } else {
        setInfo({ message: 'Video didn\'t save', type: 'error' });
        setTimeout(() => setInfo(null), 5000);
      }
    },
  });

  const [FileData, setFileData] = React.useState<File>(null);
  const [info, setInfo] = React.useState<InfoData>(null);

  React.useEffect(() => {
    if (error) {
      setInfo({ message: error.message, type: 'error' });
      setTimeout(() => setInfo(null), 5000);
    }
  }, [error]);

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setFileData(file);
  };

  const onClickHandle = () => {
    setInfo(null);
    UploadFile({ variables: { file: FileData } });
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
