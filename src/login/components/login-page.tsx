import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Typography, Box, Link } from '@mui/material';
import { ReactComponent as BuildingSVG } from './building.svg';
import { ReactComponent as Logo } from '../../common-components/stonebridgecarras_logo.svg';
import './login-page.css';
import { SessionContextValue, SessionStateContext } from '../../sessionContext';
import { login } from '../business-logic/handle-login';
import { SessionData } from '../../session-manager';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { createSession, session } = useContext(SessionStateContext) as SessionContextValue;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  // const [passwordError, setPasswordError] = useState(''); // talk  about this

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    if (!emailValue.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    // figure out if this is required
    // if (passwordValue.length < 8) {
    //   setPasswordError('Password must be at least 8 characters long');
    // } else {
    //   setPasswordError('');
    // }
  };

  const handleLogin = async () => {
    if (emailError) {
      return;
    }
    try {
      const res = await login(email, password);
      if (res.type && res.email && res.password) {
        createSession(res as SessionData);
      } else {
        // show error modal
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session && session.type === 'Admin') {
      navigate('/admin');
    } else {
      // navigate to user view
    }
  }, [session, navigate]);

  return (
    <Grid container className="container">
      <Grid item xs={12} sm={6} className="imageContainer">
        <BuildingSVG className="imageContainer" />
        <Logo className="logoOverlay" style={{ width: '220px', height: '90px', paddingLeft: '24px' }} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box className="loginForm">
          <Typography variant="h4" gutterBottom className="loginTitle">
            Welcome Back!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Login to the account
          </Typography>
          <Box sx={{ mt: 4 }}>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="johnsmith@gmail.com"
              className="loginInput"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              className="loginInput"
              value={password}
              onChange={handlePasswordChange}
              // error={!!passwordError} // discussion
              // helperText={passwordError}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Link href="/forgot-password" variant="body2" className="forgotPasswordLink">
                Forgot password?
              </Link>
            </Box>
            <Button variant="contained" fullWidth className="loginButton" onClick={handleLogin}>
              Log in
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;