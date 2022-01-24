import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#1976D1',
      },
    },
});

const BuyerLogin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
  };

  const onSubmit = (event) => {

    event.preventDefault();

    const loginBuyer = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:4000/buyer/login", loginBuyer)
      .then((response) => {
        alert("Login Successful");
        console.log(response.data);
        localStorage.setItem("BuyerEmail", email);
        navigate("/buyerdashboard");
        window.location.reload();
      })
      .catch((response) => {
        alert("incorrect password");
      });
      

    resetInputs();
  };


  return (  
    <ThemeProvider theme={theme}>  
        <Container component="main" maxWidth="xs" align={"center"} >
            <Grid container spacing={1} align={"center"}>

              <Grid item xs={12}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  id="Email"
                  label="Email"
                  name="Email"
                  autoComplete="Email"
                  onChange={onChangeEmail}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  id="Password"
                  label="Password"
                  name="Password"
                  autoComplete="Password"
                  type={"password"}
                  onChange={onChangePassword}
                />
              </Grid>

            </Grid>

            <Grid sx={{ mt: 2, mb: 2 }}>
                <Button fullWidth variant="contained" color="primary" onClick={onSubmit}>
                    Sign In
                </Button>
            </Grid>

      </Container>
    </ThemeProvider>  
  );
};

export default BuyerLogin;