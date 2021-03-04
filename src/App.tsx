import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { ROUTES } from './constants';
import NavBar from './components/NavBar';
import Video from './components/Video';
import Upload from './components/Upload';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    textAlign: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <NavBar />
      <Switch>
        <Route path={ROUTES.HOMEPAGE} render={() => <Video />} />
        <Route path={ROUTES.UPLOAD} render={() => <Upload />} />
        <Redirect from="/" to={ROUTES.HOMEPAGE} />
      </Switch>
    </Box>
  );
};

export default App;
