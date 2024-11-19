import { Box, Button, CardActions, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup';
import Input from '../../components/input/Input';
import './login.scss'
import ButtonCustom from '../../components/button/Button';
import { Link, useNavigate } from 'react-router-dom';
// import AppLogo from "../../assets/icons/Biometric Attendance (1).png"
import AppLogo from "../../assets/icons/Biometric Attendance (2).png"
import { useDispatch } from 'react-redux';
import { login } from '../../store/builders/auth/auth.builder';


function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [initialValues, setInitialValues] = useState({
    email: "",
    password: ""
  })

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
  });


  const handleFormSubmit = (values: object) => {
    dispatch(login({ userEmail: values.email, userPassword: values.password, navigate }))
  }

  return (
    <Box className="login-container">

      <Box className="login-left">
        <Typography variant="h4">Login image</Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleFormSubmit(values)
          // dispatch(login({userEmail:values.email, userPassword:values.password, navigate}))
        }}
      >
        {({ handleSubmit }) => (
          <Form className='login-right'>

            <Box className="login-right-upper-box">
              {/* <Typography variant="body1">App LOGO</Typography> */}
              <img src={AppLogo} alt="App LOGO" className='appIcon' />
              <Box className="">
                <Typography variant="h4">Welcome Back</Typography>
              </Box>
            </Box>

            <Box className="login-input-fields">
              <Input
                label='Email'
                placeholder='Enter Email'
                name='email'
                // width={'32%'}
                width='50%'
                required={true}
              // onInput={handleName}
              />
              <Input
                label='Password'
                placeholder='Enter password'
                name='password'
                // width={'32%'}
                width='50%'
                type='password'
                required={true}
              // onInput={handleName}
              />

              {/* <ButtonCustom onClick={handleSubmit} disabled={false} customClassName="black-button">Submit</ButtonCustom> */}
              <ButtonCustom onClick={handleSubmit}> Submit</ButtonCustom>


              {/* <CardActions className="login-card-footer">
                <Typography variant="body2" className="footer-text">
                  Forget Password?{' '}
                  <Button>
                    <Link to={"/forgot-password"} style={{ color: "blue" }}>Click here</Link>
                  </Button>
                </Typography>
              </CardActions>


              <CardActions className="login-card-footer">
                <Typography variant="body2" className="footer-text">
                  Don't have account?{' '}
                  <Button>
                    <Link to={"/sign-up"} style={{ color: "blue" }}>sign up</Link>
                  </Button>
                </Typography>
              </CardActions> */}

            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default Login


