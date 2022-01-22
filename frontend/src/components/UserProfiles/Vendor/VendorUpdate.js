import * as React from 'react';
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from 'axios';
import { Container } from '@mui/material';
import TextField from "@mui/material/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const VendorUpdate = () => {

  const [manager_name, setVendorManagerName] = useState("");
  const [shop_name, setVendorShopName] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("VendorEmail"));
  const [password, setPassword] = useState("");
  const [contact_num, setContact] = useState("");
  const [open_time, setOpenTime] = useState("");
  const [close_time, setCloseTime] = useState("");

  const [new_manager_name, setNewManagerName] = useState("");
  const [new_shop_name, setNewShopName] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [new_contact_num, setNewContact] = useState("");
  const [new_open_time, setNewOpenTime] = useState("");
  const [new_close_time, setNewCloseTime] = useState("");
    
  useEffect(()=>{
      const getVendor = {
          email: email,
      };

      axios
      .post("http://localhost:4000/vendor/getvendor", getVendor)
      .then((response) => {
          setVendorManagerName(response.data.manager_name);
          setVendorShopName(response.data.shop_name);
          setPassword(response.data.password);
          setContact(response.data.contact_num);
          setOpenTime(response.data.open_time);
          setCloseTime(response.data.close_time);

          setNewManagerName(response.data.manager_name);
          setNewShopName(response.data.shop_name);
          setNewPassword(response.data.password);
          setNewContact(response.data.contact_num);
          setNewOpenTime(response.data.open_time);
          setNewCloseTime(response.data.close_time);
      })
      .catch((response) => {
          alert("error connecting to databse");
      });

  }, [email]);

  const onChangeManagerName = (event) => {
    setNewManagerName(event.target.value);
    };

    const onChangeShopName = (event) => {
      setNewShopName(event.target.value);
    };

    const onChangePassword = (event) => {
        setNewPassword(event.target.value);
    };

    const onChangeContact = (event) => {
        setNewContact(event.target.value);
    };

    const onChangeOpenTime = (event) => {
        setNewOpenTime(event.target.value);
    };

    const onChangeCloseTime = (event) => {
        setNewCloseTime(event.target.value);
    };

    const resetInputs = () => {
        setNewManagerName("");
        setNewShopName("");
        setNewPassword("");
        setNewContact("");
        setNewOpenTime("");
        setNewCloseTime("");
    };

    const onSubmit = (event) => {

        event.preventDefault();

        const newVendor = {
            manager_name: new_manager_name,
            shop_name: new_shop_name,
            email: email,
            password: new_password,
            contact_num: new_contact_num,
            open_time: new_open_time,
            close_time: new_close_time,
        };

        axios
        .post("http://localhost:4000/vendor/updatevendor", newVendor)
        .then((response) => {
            alert(response.data);
            console.log(response.data);
        })
        .catch((response) => {
            console.log("hey" + response.data);
        });
        
        resetInputs();
    };


    return (
      <Container component="main" maxWidth="xs" align={"center"}>
      <Grid container spacing={1} align={"center"}>

        <Grid item xs={12}>
          <TextField
            autoFocus
            required
            fullWidth
            id="Manager_Name"
            value={new_manager_name}
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
            value={new_shop_name}
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
            id="Password"
            label="Password"
            value={new_password}
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
            value={new_contact_num}
            label="Contact Number"
            id="Contact_Num"
            autoComplete="Contact_Num"
            onChange={onChangeContact}
          />
        </Grid>


          <FormControl sx={{ m: 1, minWidth: 350 }}>                  
            <InputLabel>Open Time</InputLabel>
              <Select
              value={new_open_time}
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
              value={new_close_time}
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
              Save Changes
          </Button>
      </Grid>

</Container>

  );
};

export default VendorUpdate;
