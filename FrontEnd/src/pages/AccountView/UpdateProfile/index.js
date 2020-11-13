import React, { useState, useEffect } from 'react';

import APICaller from '../../../until/callAPI'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';

import ConfirmDialog from './../../../components/confirmDialog/index'
import CustomizedSnackbars from './../../../components/snackbar/index'

const UpdateProfile = ({ user, onReset }) => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValues({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone
    })
  }, [user]);

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
  }

  const handleChoose = (value) => {
    if (value) {
      APICaller('users/edit/' + user._id, 'POST', values)
        .then(res => {
          setIsSubmit(false);
          setSuccess(true);
          onReset()
        });
    }
    else {
      setIsSubmit(false);
    }
  }
  return (
    <>
      {isSubmit ? <ConfirmDialog title="Change Information" content="Do you want to change these informations?" onChoose={handleChoose} /> : <></>}
      {success ? <CustomizedSnackbars open={true} type="success" message="successful change" /> : <></>}
      <form
        autoComplete="off"
        noValidate
      >
        <Card>
          <CardHeader
            title="Update Information"
            subheader="The information can be edited"

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
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                  variant="outlined"
                  disabled={true}
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                  variant="outlined"
                />
              </Grid>
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
              Save details
          </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};

export default UpdateProfile;
