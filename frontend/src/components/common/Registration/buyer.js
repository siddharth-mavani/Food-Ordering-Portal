import { useState } from "react";
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

const BuyerRegister = (props) => {

  const [name, setBuyerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact_num, setContact] = useState("");
  const [age, setAge] = useState("");


  const onChangeBuyerName = (event) => {
    setBuyerName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const resetInputs = () => {
    setBuyerName("");
    setEmail("");
    setPassword("");
    setContact("");
    setAge("");
  };

  const onSubmit = (event) => {

    event.preventDefault();

    const newBuyer = {
      name: name,
      email: email,
      password: password,
      contact_num: contact_num,
      age: age,
    };

    axios
      .post("http://localhost:4000/buyer/register", newBuyer)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });

    resetInputs();
  };


  return (  
    <ThemeProvider theme={theme}>  
        <Container>
            <Grid container spacing={1} align={"center"}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  name="Name"
                  autoComplete="Name"
                  onChange={onChangeBuyerName}
                />
              </Grid>

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

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Contact_Numb"
                  label="Contact Number"
                  id="Contact_Num"
                  autoComplete="Contact_Num"
                  onChange={onChangeContact}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Age"
                  label="Age"
                  id="Age"
                  autoComplete="Age"
                  onChange={onChangeAge}
                />
              </Grid>
            </Grid>

            <Grid sx={{ mt: 2, mb: 2 }}>
                <Button fullWidth variant="contained" color="primary" onClick={onSubmit}>
                    Sign Up
                </Button>
            </Grid>

      </Container>

    </ThemeProvider>  
  );
};

export default BuyerRegister;