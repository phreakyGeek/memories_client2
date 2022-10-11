import React, { useState, useEffect } from 'react'
import { Container, Grid, Paper, Avatar, Button, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { GoogleLogin } from 'react-google-login'
import Input from './Input'
import Icon from './icon'
import { gapi } from 'gapi-script'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp } from '../../actiions/auth'

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
  useEffect(() => {
    function start(){
      gapi.auth2.init({
        clientId:clientId,
      })
    }
    gapi.load('client:auth2', start)
  }, [])
  const dispatch = useDispatch()
  const history = useNavigate()
  const clientId = '4328824512-5t004uo8a8pcro7sh7vnm89b0fjo5epg.apps.googleusercontent.com'
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false)
  const handleOnSubmit = (e) => {
    e.preventDefault()
    if(isSignUp){
      dispatch(signUp(formData, history))
    } else {
      dispatch(signIn(formData, history))

    }
    // console.log(formData)
  }
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    setShowPassword(false)
  }
  const googleSuccess = async (res) => {
    // console.log(res)
    const result = res?.profileObj
    const token = res?.tokenId
    try {
      dispatch({ type: 'AUTH', data: { result, token} })
      history('/')
    } catch (error) {
      console.log(error)
    }
  }
  const googleFailure = (error) => {
    console.log(error)
  }
  const renderGoogleButton = (renderProps) => {
    // console.log(renderProps)
    return (
      <Button style={style.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained" >Google Sign In</Button>
    )
  }
  return (
    <Container component="main" maxWidth="xs" >
      <Paper style={style.paper} elevation={3}>
        <Avatar style={style.avatar} >
          <LockOutlinedIcon/>
        </Avatar>
        <Typography variant="h6">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form style={style.form} onSubmit={handleOnSubmit} >
          <Grid container spacing={2}>
            {
              isSignUp && (
                <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
            <Input name="password" label="password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {
              isSignUp && (
                <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />
              )
            }
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={style.submit} fullWidth >
            {
              isSignUp ? "Sign Up" : "Sign In"
            }
          </Button>
          <GoogleLogin
            clientId={clientId}
            render={renderGoogleButton}
            buttonText='Login'
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode} >
                {
                  isSignUp ? "Already have an account? Sign In" : "Don't have an account Sign Up"
                }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth

const style={
  paper: {
    marginTop: "8px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "2px",
  },
  root: {
    '& .MuiTextField-root': {
      margin: "1px",
    },
  },
  avatar: {
    margin: "1px",
    backgroundColor: "skyblue",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: "3px",
  },
  submit: {
    margin: "3px, 0, 2px",
  },
  googleButton: {
    marginBottom: "2px",
  },
}