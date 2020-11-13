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
import Container from '@material-ui/core/Container';
import { Link, Redirect } from 'react-router-dom';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = () => {
    const classes = useStyles();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState({
        value: false,
        message: ""
    });
    const [acount, setAcount] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerm: false,
    });


    const handleChange = (event) => {
        const { target } = event;
        const { name } = target;
        const value = name === "agreeTerm" ? target.checked : target.value;
        setAcount({
            ...acount,
            [name]: value
        });

        if (error.value) {
            setError({
                value: false,
                message: ""
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (acount.firstName === "" ||
            acount.lastName === "" ||
            acount.email === "" ||
            acount.password === "" ||
            acount.confirmPassword === ""
        ) {
            setError({
                value: true,
                message: "You need to fill in all the details"
            });
            return;
        }

        if (acount.password.length < 8) {
            setError({
                value: true,
                message: "Your password should contain at least 8 chars"
            });
            return;
        }

        if (!acount.agreeTerm) {
            setError({
                value: true,
                message: "You must agree with our Term"
            });
            return;
        }

        if (acount.password !== acount.confirmPassword) {
            setError({
                value: true,
                message: "Password and confirm password are identical"
            });
            return;
        }

        callAPI('users', 'POST', {
            firstName: acount.firstName,
            lastName: acount.lastName,
            email: acount.email,
            password: acount.password
        }).then(res => {
            if (res.data.id === null) {
                setError({
                    value: true,
                    message: "Account already exists!"
                });
            }
            else
                setSuccess(true)
        });
    }

    if (success) return <Redirect to={{
        pathname: process.env.PUBLIC_URL + '/login',
        state: {
            type: 'success',
            message: "Successful registration, login now!",
            open: true
        }
    }} />
    return (
        <Container component="main" maxWidth="xs">
            {<CustomizedSnackbars open={error.value} type="error" message={error.message} />}
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={handleChange}
                                value={acount.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={handleChange}
                                value={acount.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                                value={acount.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                value={acount.password}
                            />
                            <p style={{ fontStyle: "italic", fontSize: "80%" }}> Should contain at least 8 chars!</p>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                value={acount.confirmPassword}
                            />
                            <p style={{ fontStyle: "italic", fontSize: "80%" }}> Should contain at least 8 chars!</p>
                        </Grid>


                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox name="agreeTerm" checked={acount.agreeTerm} onChange={handleChange} color="primary" />}
                                label="By signing up you agree to our Terms and Privacy Policy"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to={process.env.PUBLIC_URL + '/login'} style={{ margin: "24px 0px 0px 0px", color: "#3f51b5" }}>
                                Already have an account? Sign in
                             </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default SignUp;