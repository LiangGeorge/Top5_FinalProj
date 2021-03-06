import { useContext } from 'react';
import AuthContext from '../auth';
// import { GlobalStoreContext } from '../store';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          The Top 5 Lister
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const theme = createTheme();
  console.log(theme)
  export default function LoginScreen() {
    const { auth } = useContext(AuthContext);
    // const { store } = useContext(GlobalStoreContext)
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      auth.loginUser(
          {
              username: data.get('Username'),
              password: data.get('password')
          }
        )
    // eslint-disable-next-line no-console
    console.log("COMPLETED")
    
    };

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
  
    return (
      <ThemeProvider theme={theme}>
        <Grid id="loginContainer" container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />

          <Modal
                aria-describedby="modal-modal-description"
                open={auth.showModal}
                className={"modal " + ((auth.showModal)? "is-visible": "")}
                >
                    
                <Box sx = {style}>
                    <Alert severity="warning">An error has occurred!</Alert>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {auth.modalMSG}
                    </Typography>
                    <Button 
                    onClick={() => auth.hideModal()}
                    sx = {{ 
                        ml: 15,
                        mt: 2
                    }}
                    variant="contained">Close</Button>
                    
                </Box>
          </Modal>


         
          <Grid sx={{width:"100%"}} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  name="Username"
                  autoComplete="Username"
                  autoFocus
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
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    
                  </Grid>
                  <Grid item>
                    <Link href="/register/" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
