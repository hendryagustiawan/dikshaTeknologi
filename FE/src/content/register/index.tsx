import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { errorMsg } from 'src/components/Alert/ToasNotification';
import axios from 'axios';

const defaultTheme = createTheme();

export default function Register() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputUsername, setInputUsername] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email: inputEmail,
      password: inputPassword,
      username: inputUsername
    };

    axios({
      method: 'POST',
      url: 'http://localhost:3000/user/register',
      data
    })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);

        error.response.data.message.map((el: any) => {
          errorMsg(el);
        });
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://img.freepik.com/free-photo/3d-hand-hold-smartphone-with-authentication-form_107791-16570.jpg?w=740&t=st=1700983005~exp=1700983605~hmac=661177ea8567eadcb281bf4df3cebf0496a9a659be124e25c8254c75c241ece9)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'contain',
            backgroundPosition: 'center'
          }}
        />

        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          container
          component={Paper}
          elevation={6}
          alignItems="center"
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography component="h1" variant="h3">
              Please Input Your Data!
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ my: 3 }}
              >
                Register
              </Button>
              <Grid container direction="row" alignItems="center">
                <Grid item mr={1}>
                  <Typography variant="body1">
                    Already have an account?
                  </Typography>
                </Grid>
                <Grid item>
                  <RouterLink to={'/'} style={{ textDecoration: 'none' }}>
                    Login
                  </RouterLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
