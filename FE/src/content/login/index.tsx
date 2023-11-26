import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/actions/user';

const defaultTheme = createTheme();

export default function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await dispatch(
        loginUser({
          email: inputEmail,
          password: inputPassword
        })
      );

      if (data && data.role === 'admin') {
        navigate('/');
      } else {
        navigate('/home-user');
      }
    } catch (err) {
      console.error('Login failed:', err);
      // Handle login failure/error here
    }
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
              'url(https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=740&t=st=1700981069~exp=1700981669~hmac=171e5300908679c88b13d2476ff8f5e9937335ecadc9e1041200799cc4553347)',
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
              Welcome Back!
            </Typography>
            <Typography component="h1" variant="h6">
              Please login before your access
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ my: 3 }}
              >
                Login
              </Button>
              <Grid container direction="row" alignItems="center">
                <Grid item mr={1}>
                  <Typography variant="body1">
                    Don't have an account?
                  </Typography>
                </Grid>
                <Grid item>
                  <RouterLink to="/register" style={{ textDecoration: 'none' }}>
                    Register
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
