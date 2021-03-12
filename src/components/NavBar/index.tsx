import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { ROUTES } from '../../constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing(4),
    alignItems: 'center',
  },
  '& .MuiButton-contained': {
    marginRight: theme.spacing(2),
  },
  selected: {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
  },
  navItem: {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
  },
}));

const NavBar: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.headerBar} color="transparent" position="static">
      <Button
        variant="contained"
        color="secondary"
      >
        <NavLink
          to={ROUTES.HOMEPAGE}
          className={classes.navItem}
          activeClassName={classes.selected}
        >
          Home
        </NavLink>
      </Button>
      <Button
        variant="contained"
        color="secondary"
      >
        <NavLink
          to={ROUTES.UPLOAD}
          className={classes.navItem}
          activeClassName={classes.selected}
        >
          Upload
        </NavLink>
      </Button>
    </AppBar>
  );
};

export default NavBar;
