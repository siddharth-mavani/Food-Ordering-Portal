import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


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
  const [batch, setBatch] = useState("");


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

  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };


  const resetInputs = () => {
    setBuyerName("");
    setEmail("");
    setPassword("");
    setContact("");
    setAge("");
    setBatch("");
  };

  const onSubmit = (event) => {

    event.preventDefault();

    const newBuyer = {
      name: name,
      email: email,
      password: password,
      contact_num: contact_num,
      age: age,
      batch: batch,
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


              <FormControl sx={{ m: 1, minWidth: 350 }}>
                  
                <InputLabel>Batch</InputLabel>

                <Select
                  value={batch}
                  onChange={onChangeBatch}
                  autosize={true}
                  label="Batch">

                  <MenuItem value={"UG1"}>UG1</MenuItem>
                  <MenuItem value={"UG2"}>UG2</MenuItem>
                  <MenuItem value={"UG3"}>UG3</MenuItem>
                  <MenuItem value={"UG4"}>UG4</MenuItem>
                  <MenuItem value={"UG5"}>UG5</MenuItem>

                </Select>

              </FormControl>


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