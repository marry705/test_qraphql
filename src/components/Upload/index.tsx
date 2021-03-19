import * as React from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import InfoAlert from '../InfoAlert';
import { ADD_VIDEOS, VideosDataUpload } from '../../constants/query';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    height: '100vh',
    width: '90%',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing(2),
  },
}));

const Upload: React.FC = () => {
  const classes = useStyles();

  const inputFile = React.useRef<HTMLInputElement>(null);
  const [uploadFile, { loading, error, data }] = useMutation<{ uploadFile: VideosDataUpload }, { file: File }>(ADD_VIDEOS);

  const onClickHandle = (): void => {
    if (inputFile.current.files[0]) {
      uploadFile({ variables: { file: inputFile.current.files[0] } });
      inputFile.current.value = '';
    }
  };

  return (
    <div className={classes.root}>
      <form
        className={classes.form}
        onSubmit={(e) => { e.preventDefault(); }}
      >
        <input
          ref={inputFile}
          type="file"
          accept="video/mp4, video/x-m4v, video/*"
          disabled={loading}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={onClickHandle}
          disabled={loading}
        >
          Upload
        </Button>
      </form>
      {(error)
        ? (
          <InfoAlert info={{ message: error.message, type: 'error' }} />
        )
        : (data?.uploadFile?.success)
          ? (
            <InfoAlert info={{ message: 'Video saved successfully', type: 'success' }} />
          )
          : null}
    </div>
  );
};

export default Upload;
