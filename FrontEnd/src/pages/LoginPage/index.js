import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import { Link, Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import axios from 'axios';
import * as Config from './../../constants/config'
import callAPI from './../../until/callAPI'
import CustomizedSnackbars from './../../components/snackbar/index'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function SignIn(props) {
    const [isLogin, setisLogin] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(false);
    const classes = useStyles();



    const handleClick = (event) => {
        event.preventDefault();
        setError(false);
        callAPI('auth/login', 'POST', {
            email: user.email,
            password: user.password
        }).then(res => {
            localStorage.setItem('token', JSON.stringify(res.data.access_token));
            setisLogin(true);
        }).catch(err => {
            setError(true);
        })
    }

    const handleChange = (event) => {
        const { target } = event;
        const { name, value } = target;

        setUser({
            ...user,
            [name]: value
        })
    }

    const responseGoogle = (response) => {
        axios.get(Config.API_URL + '/google', {
            headers: {
                'Authorization': response.tokenId
            }
        }).then(res => {
            localStorage.setItem('token', JSON.stringify(res.data.access_token));
            setisLogin(true);
        }).catch(err => {
            setError(true);
        })
    }

    const responseFacebook = (response) => {
        if(response.status === "unknown")
            return;
        axios.get(Config.API_URL + '/facebook', {
            headers: {
                'accessToken': response.accessToken,
                'userID': response.userID
            }
        }).then(res => {
            localStorage.setItem('token', JSON.stringify(res.data.access_token));
            setisLogin(true);
        }).catch(err => {
            setError(true);
        })
    }



    if (isLogin) return <Redirect to={process.env.PUBLIC_URL + '/'}></Redirect>
    return (
        <Container component="main" maxWidth="xs"  >
            {props.location.state ? <CustomizedSnackbars open={props.location.state.open} type={props.location.state.type} message={props.location.state.message} /> : <></>}
            {<CustomizedSnackbars open={error} type="error" message="Wrong account or password" />}
            <CssBaseline />
            <div className={classes.paper} >
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={user.email}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                        </Grid>
                        <Grid item>
                            <Link to='#' variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleClick}
                    >
                        Sign In
                    </Button>


                </form>

                <Typography component="p" variant="h6">
                    Or login with
                </Typography>

                <Grid container justify="space-between">
                    <Grid item>

                        <FacebookLogin
                            appId="2654369511482506"
                            autoLoad={false}
                            callback={responseFacebook}
                            render={renderProps => (
                                <Button
                                    onClick={renderProps.onClick}
                                    variant="contained"
                                    className={classes.button}
                                    startIcon={<FacebookIcon style={{ color: "blue" }} />}
                                    style={{ color: "blue" }}
                                >
                                    Facebook
                                </Button>
                            )}
                        />

                    </Grid>

                    <Grid item>
                        <GoogleLogin
                            clientId="384818698512-6un3oj0o5bvhpah1qcrkhcjctv2a6djl.apps.googleusercontent.com"
                            buttonText="Google"
                            onSuccess={responseGoogle}
                            onFailure={(res) => console.log(res)}
                            cookiePolicy={'single_host_origin'}
                        />
                    </Grid>
                </Grid>

                <Link to={process.env.PUBLIC_URL + '/signup'} style={{ margin: "24px 0px 0px 0px", color: "#3f51b5" }}>
                    {"Don't have an account? Sign Up"}
                </Link>

            </div>
        </Container >

    );
}