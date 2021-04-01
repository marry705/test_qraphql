import * as React from 'react';
import { useMutation, ApolloError } from '@apollo/client';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import InfoAlert from '../InfoAlert';
import { ADD_VIDEOS, VideosDataUpload } from '../../constants/query';
import { InfoData } from '../../constants';

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
  const [infoData, setInfoData] = React.useState<InfoData>(null);

  const [uploadFile, { loading }] = useMutation<{ uploadFile: VideosDataUpload }, { file: File }>(ADD_VIDEOS, {
    onCompleted: (): void => {
      setInfoData({ message: 'Video saved successfully', type: 'success' });
    },
    onError: (error: ApolloError): void => {
      setInfoData({ message: error.message, type: 'error' });
    },
  });

  const onChangeHandle = ({ target: { validity, files } }: React.ChangeEvent<HTMLInputElement>): void => {
    setInfoData(null);
    if (validity.valid) {
      uploadFile({ variables: { file: files[0] } });
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
          onChange={onChangeHandle}
          type="file"
          accept="video/mp4, video/x-m4v, video/*"
          disabled={loading}
        />
      </form>
      <InfoAlert info={infoData} />
    </div>
  );
};

export default Upload;
