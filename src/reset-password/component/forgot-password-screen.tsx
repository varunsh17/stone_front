import * as React from 'react';
import { Grid, TextField, Button, Typography, Box, Link } from '@mui/material';
import { ReactComponent as BuildingSVG } from '../../login/components/building.svg';
import { ReactComponent as Logo } from '../../common-components/stonebridgecarras_logo.svg';

const ForgotPassword: React.FC = () => {
  return (
    <Grid container className="container">
      <Grid item xs={12} sm={6} className="imageContainer">
        <BuildingSVG className="imageContainer" />
        <Logo className="logoOverlay" style={{ width: '220px', height: '90px', paddingLeft: '24px' }} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box className="loginForm">
          <Typography variant="h4" gutterBottom className="loginTitle">
            Forgot Password?
          </Typography>
          <Typography variant="body1" gutterBottom>
            Reset your password
          </Typography>
          <Box sx={{ mt: 4, width: "500px" }}>
            <Typography variant="body1" align="center" gutterBottom>
              Please enter the email address you'd like your password reset information sent to
            </Typography>
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="admin@gmail.com"
              className="loginInput"
            />
            <Button variant="contained" fullWidth className="loginButton">
              Request reset link
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Link href="/" variant="body2" className="forgotPasswordLink">
                Back To Login
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
