import * as React from 'react';
import { Input } from '@material-ui/core';

import { getRequest } from '../../services/apiService';

const Upload: React.FC = () => {
  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files[0];
    console.log(files);
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
    </>
  );
};

export default Upload;
