import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Box,
    Button
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';

import APICaller from '../../../until/callAPI'
import ConfirmDialog from './../../../components/confirmDialog/index'
import CustomizedSnackbars from './../../../components/snackbar/index'

const ChangePassword = ({ user }) => {
    const [values, setValues] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [isSubmit, setIsSubmit] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState({
        value: false,
        message: ""
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess(false);
        setIsSubmit(true);
        setError({
            value: false,
            message: ""
        });
    }

    const handleChoose = (value) => {
        if (value) {
            if(values.oldPassword === ""||values.confirmPassword === ""||values.newPassword === "")
            {
                setError({
                    value: true,
                    message: "You need to fill in all the details"
                });
                setIsSubmit(false);
                return;
            }

            if(values.newPassword.length < 8){
                setError({
                    value: true,
                    message: "Your new password should contain at least 8 chars"
                });
                setIsSubmit(false);
                return;
            }
            if (values.newPassword !== values.confirmPassword) {
                setError({
                    value: true,
                    message: "Password and confirm password are identical"
                });
                setIsSubmit(false);
                return;
            }

            APICaller('users/change-password/' + user._id, 'POST', {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword
            }).then(res => {
                if (res.data) {
                    setSuccess(true);
                    setIsSubmit(false);
                } else {
                    setError({
                        value: true,
                        message: "Old password is invalid"
                    });
                }
            })

            setIsSubmit(false);
        }
        else {
            setIsSubmit(false);
        }

    }

    if (success) return <Redirect to={{
        pathname: process.env.PUBLIC_URL +'/login',
        state: {
            type: 'success',
            message: "Password changed successfully, please log in again!",
            open: true,
        }
    }} />


    return (
        <>
            {isSubmit ? <ConfirmDialog title="Change Information" content="Do you want to change these informations?" onChoose={handleChoose} /> : <></>}
            {error.value ? <CustomizedSnackbars open={true} type="error" message={error.message} /> : <></>}

            <form
                autoComplete="off"
                noValidate

            >
                <Card>
                    <CardHeader
                        title="Change Password"
                    />
                    <Divider />
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    helperText="Should contain at least 8 chars!"
                                    label="Old Password"
                                    name="oldPassword"
                                    type="password"
                                    onChange={handleChange}
                                    required
                                    value={values.oldPassword}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                            ></Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    helperText="Should contain at least 8 chars!"
                                    label="New Password"
                                    name="newPassword"
                                    type="password"
                                    onChange={handleChange}
                                    required
                                    value={values.newPassword}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                            ></Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    helperText="Should contain at least 8 chars!"
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    onChange={handleChange}
                                    required
                                    value={values.confirmPassword}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                            ></Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        p={2}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Save Password
                </Button>
                    </Box>
                </Card>
            </form>
        </>
    );
};


export default ChangePassword;
