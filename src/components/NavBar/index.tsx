import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { ROUTES } from '../../constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    alignItems: 'center',
  },
}));

const NavBar: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.headerBar} color="transparent" position="static">
      <NavLink to={ROUTES.HOMEPAGE}>
        Home
      </NavLink>
      <NavLink to={ROUTES.UPLOAD}>
        Upload
      </NavLink>
    </AppBar>
  );
};

export default NavBar;
