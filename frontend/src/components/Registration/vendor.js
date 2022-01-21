import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#1976D1',
      },
    },
});

const VendorRegister = (props) => {

    const [manager_name, setManagerName] = useState("");
    const [shop_name, setShopName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact_num, setContact] = useState("");
    const [open_time, setOpenTime] = useState("");
    const [close_time, setCloseTime] = useState("");
  
  
    const onChangeManagerName = (event) => {
      setManagerName(event.target.value);
    };

    const onChangeShopName = (event) => {
        setShopName(event.target.value);
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
  
    const onChangeOpenTime = (event) => {
      setOpenTime(event.target.value);
    };

    const onChangeCloseTime = (event) => {
        setCloseTime(event.target.value);
    };
  
    const resetInputs = () => {
      setManagerName("");
      setShopName("");
      setEmail("");
      setPassword("");
      setContact("");
      setOpenTime("");
      setCloseTime("");
    };
  
  const onSubmit = (event) => {
    event.preventDefault();

    const newVendor = {
      manager_name: manager_name,
      shop_name: shop_name,
      email: email,
      password: password,
      contact_num: contact_num,
      open_time: open_time,
      close_time: close_time,
    };

    axios
      .post("http://localhost:4000/vendor/register", newVendor)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });

    resetInputs();
  };

  return (
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" align={"center"}>
            <Grid container spacing={1} align={"center"}>

            <Grid item xs={12}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  id="Manager_Name"
                  label="Manager Name"
                  name="Manager_Name"
                  autoComplete="Manager_Name"
                  onChange={onChangeManagerName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  id="Shop_Name"
                  label="Shop Name"
                  name="Shop_Name"
                  autoComplete="Shop_Name"
                  onChange={onChangeShopName}
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
                  name="Contact_Num"
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
                  name="Open_Time"
                  label="Open Time (24 Hour Format)"
                  id="Open_Time"
                  autoComplete="Open_Time"
                  onChange={onChangeOpenTime}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Close_Time"
                  label="Close Time (24 Hour Format)"
                  id="Close_Time"
                  autoComplete="Close_Time"
                  onChange={onChangeCloseTime}
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

export default VendorRegister;