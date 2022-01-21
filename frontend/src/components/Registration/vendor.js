import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import MenuItem from "@material-ui/core/MenuItem";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
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


                <FormControl sx={{ m: 1, minWidth: 350 }}>                  
                  <InputLabel>Open Time</InputLabel>
                    <Select
                    value={open_time}
                    onChange={onChangeOpenTime}
                    autosize={true}
                    label="Open Time">

                    <MenuItem value="00:00">00:00</MenuItem>
                    <MenuItem value="00:30">00:30</MenuItem>
                    <MenuItem value="01:00">01:00</MenuItem>
                    <MenuItem value="01:30">01:30</MenuItem>
                    <MenuItem value="02:00">02:00</MenuItem>
                    <MenuItem value="02:30">02:30</MenuItem>
                    <MenuItem value="03:00">03:00</MenuItem>
                    <MenuItem value="03:30">03:30</MenuItem>
                    <MenuItem value="04:00">04:00</MenuItem>
                    <MenuItem value="04:30">04:30</MenuItem>
                    <MenuItem value="05:00">05:00</MenuItem>
                    <MenuItem value="05:30">05:30</MenuItem>
                    <MenuItem value="06:00">06:00</MenuItem>
                    <MenuItem value="06:30">06:30</MenuItem>
                    <MenuItem value="07:00">07:00</MenuItem>
                    <MenuItem value="07:30">07:30</MenuItem>
                    <MenuItem value="08:00">08:00</MenuItem>
                    <MenuItem value="08:30">08:30</MenuItem>
                    <MenuItem value="09:00">09:00</MenuItem>
                    <MenuItem value="09:30">09:30</MenuItem>
                    <MenuItem value="10:00">10:00</MenuItem>
                    <MenuItem value="10:30">10:30</MenuItem>
                    <MenuItem value="11:00">11:00</MenuItem>
                    <MenuItem value="11:30">11:30</MenuItem>
                    <MenuItem value="12:00">12:00</MenuItem>
                    <MenuItem value="12:30">12:30</MenuItem>
                    <MenuItem value="13:00">13:00</MenuItem>
                    <MenuItem value="13:30">13:30</MenuItem>
                    <MenuItem value="14:00">14:00</MenuItem>
                    <MenuItem value="14:30">14:30</MenuItem>
                    <MenuItem value="15:00">15:00</MenuItem>
                    <MenuItem value="15:30">15:30</MenuItem>
                    <MenuItem value="16:00">16:00</MenuItem>
                    <MenuItem value="16:30">16:30</MenuItem>
                    <MenuItem value="17:00">17:00</MenuItem>
                    <MenuItem value="17:30">17:30</MenuItem>
                    <MenuItem value="18:00">18:00</MenuItem>
                    <MenuItem value="18:30">18:30</MenuItem>
                    <MenuItem value="19:00">19:00</MenuItem>
                    <MenuItem value="19:30">19:30</MenuItem>
                    <MenuItem value="20:00">20:00</MenuItem>
                    <MenuItem value="20:30">20:30</MenuItem>
                    <MenuItem value="21:00">21:00</MenuItem>
                    <MenuItem value="21:30">21:30</MenuItem>
                    <MenuItem value="22:00">22:00</MenuItem>
                    <MenuItem value="22:30">22:30</MenuItem>
                    <MenuItem value="23:00">23:00</MenuItem>
                    <MenuItem value="23:30">23:30</MenuItem>
                </Select>
              </FormControl>
    
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                  <InputLabel>Close Time</InputLabel>
                  <Select
                    value={close_time}
                    onChange={onChangeCloseTime}
                    autosize={true}
                    label="Close Time">

                    <MenuItem value="00:00">00:00</MenuItem>
                    <MenuItem value="00:30">00:30</MenuItem>
                    <MenuItem value="01:00">01:00</MenuItem>
                    <MenuItem value="01:30">01:30</MenuItem>
                    <MenuItem value="02:00">02:00</MenuItem>
                    <MenuItem value="02:30">02:30</MenuItem>
                    <MenuItem value="03:00">03:00</MenuItem>
                    <MenuItem value="03:30">03:30</MenuItem>
                    <MenuItem value="04:00">04:00</MenuItem>
                    <MenuItem value="04:30">04:30</MenuItem>
                    <MenuItem value="05:00">05:00</MenuItem>
                    <MenuItem value="05:30">05:30</MenuItem>
                    <MenuItem value="06:00">06:00</MenuItem>
                    <MenuItem value="06:30">06:30</MenuItem>
                    <MenuItem value="07:00">07:00</MenuItem>
                    <MenuItem value="07:30">07:30</MenuItem>
                    <MenuItem value="08:00">08:00</MenuItem>
                    <MenuItem value="08:30">08:30</MenuItem>
                    <MenuItem value="09:00">09:00</MenuItem>
                    <MenuItem value="09:30">09:30</MenuItem>
                    <MenuItem value="10:00">10:00</MenuItem>
                    <MenuItem value="10:30">10:30</MenuItem>
                    <MenuItem value="11:00">11:00</MenuItem>
                    <MenuItem value="11:30">11:30</MenuItem>
                    <MenuItem value="12:00">12:00</MenuItem>
                    <MenuItem value="12:30">12:30</MenuItem>
                    <MenuItem value="13:00">13:00</MenuItem>
                    <MenuItem value="13:30">13:30</MenuItem>
                    <MenuItem value="14:00">14:00</MenuItem>
                    <MenuItem value="14:30">14:30</MenuItem>
                    <MenuItem value="15:00">15:00</MenuItem>
                    <MenuItem value="15:30">15:30</MenuItem>
                    <MenuItem value="16:00">16:00</MenuItem>
                    <MenuItem value="16:30">16:30</MenuItem>
                    <MenuItem value="17:00">17:00</MenuItem>
                    <MenuItem value="17:30">17:30</MenuItem>
                    <MenuItem value="18:00">18:00</MenuItem>
                    <MenuItem value="18:30">18:30</MenuItem>
                    <MenuItem value="19:00">19:00</MenuItem>
                    <MenuItem value="19:30">19:30</MenuItem>
                    <MenuItem value="20:00">20:00</MenuItem>
                    <MenuItem value="20:30">20:30</MenuItem>
                    <MenuItem value="21:00">21:00</MenuItem>
                    <MenuItem value="21:30">21:30</MenuItem>
                    <MenuItem value="22:00">22:00</MenuItem>
                    <MenuItem value="22:30">22:30</MenuItem>
                    <MenuItem value="23:00">23:00</MenuItem>
                    <MenuItem value="23:30">23:30</MenuItem>
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

export default VendorRegister;