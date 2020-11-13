import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';

import Profile from './Profile/index';
import ProfileDetails from './ProfileDetail/index';
import UpdateProfile from './UpdateProfile/index'
import ChangePassword from './ChangePassword/index'
import VerticalTabs from './Tags/index'
import Header from './../../components/header'
import Authorization from './../../until/callAuth'
import APICaller from './../../until/callAPI';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>{children}</div>
      )}
    </Box>
  );
}

const Account = () => {
  const [value, setValue] = useState(0);
  const [isLogin, setIsLogin] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    Authorization('profile', JSON.parse(localStorage.getItem('token')))
      .then(res => {
        APICaller('users/' + res.data.userId, 'GET', null).then(result => {
          setUser(result.data);
          setIsLogin(true);
          setIsAuth(true);
        })
      })
      .catch(err => { setIsLogin(false); setIsAuth(true) })
  }, [reset]);

  const handleChangeValue = (newValue) => {
    setValue(newValue);
  }

  const handleReset = () => {
    setReset(!reset);
  }

  if (!isAuth) return <></>;

  if (!isLogin) return <Redirect to={{
    pathname: process.env.PUBLIC_URL + '/login',
    state: {
      type: 'error',
      message: "You must login!",
      open: true
    }
  }} />

  return (
    <>
      <Header />
      <Container maxWidth="lg" style={{ marginTop: "48px" }}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile user={user} />
            <VerticalTabs onChangeValue={handleChangeValue} />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >

            <TabPanel value={value} index={0}>
              <ProfileDetails user={user} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <UpdateProfile user={user} onReset={handleReset} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ChangePassword user={user} />
            </TabPanel>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Account;
