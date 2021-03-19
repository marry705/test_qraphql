import * as React from 'react';
import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import { InfoData } from '../../constants';

interface Props {
    info: InfoData,
}

const InfoAlert: React.FC<Props> = ({ info }: Props) => {
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setOpen(!!info);
  }, [info]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {info
        ? (
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} elevation={5} variant="outlined" severity={info.type}>
              {info.message}
            </Alert>
          </Snackbar>
        )
        : null}
    </>
  );
};

export default InfoAlert;
