import * as React from 'react';
import { Alert } from '@material-ui/lab';
import { InfoData } from '../../constants';

interface Props {
    info: InfoData,
}

const InfoAlert: React.FC<Props> = ({ info }: Props) => (
  <>
    {info
      ? (
        <Alert variant="outlined" severity={info.type}>
          {info.message}
        </Alert>
      )
      : null}
  </>
);

export default InfoAlert;
