import { Box, Button, CardActions, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import Input from '../../components/input/Input'
import ButtonCustom from '../../components/button/Button'
import { Link } from 'react-router-dom'
// import AppLogo from "../../assets/icons/Biometric Attendance (1).png"
import AppLogo from "../../assets/icons/Biometric Attendance (2).png"
// import AppLogo from "../../assets/icons/Biometric Attendance.png"

const ForgotPassword = () => {
  const [initialValues] = useState({
    newPassword: "",
    otp: ""
  })

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .min(4, 'Otp must be 4 digit')
      .required('otp is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('new Password is required'),
  });

  const handleFormSubmit = (values: object) => {
    console.log(values)
  }


  return (
    <Box className="login-container">

      <Box className="login-left">
        <Typography variant="h4">Forgot Password</Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleFormSubmit(values)
        }}
      >
        {({ handleSubmit }) => (
          <Form className='login-right'>

            <Box className="login-right-upper-box">
              {/* <Typography variant="body1">App LOGO</Typography> */}
              <img src={AppLogo} alt="App LOGO" className='appIcon' />
              <Box className="">
                <Typography variant="h4">Reset password</Typography>
              </Box>
            </Box>

            <Box className="login-input-fields">
              <Input
                label='New password'
                placeholder='Enter new password'
                name='newPassword'
                // width={'32%'}
                type='password'
                width='50%'
                required={true}
              // onInput={handleName}
              />
              <Input
                label='Enter OTP'
                placeholder='Enter OTP'
                name='otp'
                // width={'32%'}
                type='number'
                width='50%'
                required={true}
              // onInput={handleName}
              />

              <ButtonCustom onClick={handleSubmit} disabled={false} customClassName="black-button">Submit</ButtonCustom>

              <CardActions className="login-card-footer">
                <Typography variant="body2" className="footer-text">
                  {/* Don't have an account?{' '} */}
                  Back to Login?{' '}
                  {/* <ButtonCustom variant="outlined" onClick={() =>{}} className="sign-up-button">
                        <Link to={"/forgot-password"} style={{color:"blue"}}>Forget Password</Link>
                        </ButtonCustom> */}

                  <Button>
                    <Link to={"/login"} style={{ color: "blue" }}>Click here</Link>
                  </Button>
                </Typography>
              </CardActions>

            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default ForgotPassword

