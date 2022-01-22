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

const BuyerUpdate = () => {

    const [name, setBuyerName] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("BuyerEmail"));
    const [password, setPassword] = useState("");
    const [contact_num, setContact] = useState("");
    const [age, setAge] = useState("");
    const [batch, setBatch] = useState("");

    const [new_name, setNewBuyerName] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [new_contact_num, setNewContact] = useState("");
    const [new_age, setNewAge] = useState("");
    const [new_batch, setNewBatch] = useState("");

    useEffect(()=>{
        const getBuyer = {
            email: email,
        };

        axios
        .post("http://localhost:4000/buyer/getbuyer", getBuyer)
        .then((response) => {
            setBuyerName(response.data.name);
            setContact(response.data.contact_num);
            setAge(response.data.age);
            setBatch(response.data.batch);

            setNewBuyerName(response.data.name);
            setNewPassword(response.data.password);
            setNewContact(response.data.contact_num);
            setNewAge(response.data.age);
            setNewBatch(response.data.batch);
        })
        .catch((response) => {
            alert("error connecting to databse");
        });
    }, [email]);

    const onChangeBuyerName = (event) => {
        setNewBuyerName(event.target.value);
    };

    const onChangePassword = (event) => {
        setNewPassword(event.target.value);
    };

    const onChangeContact = (event) => {
        setNewContact(event.target.value);
    };

    const onChangeAge = (event) => {
        setNewAge(event.target.value);
    };

    const onChangeBatch = (event) => {
        setNewBatch(event.target.value);
    };

    const resetInputs = () => {
        setNewBuyerName("");
        setNewPassword("");
        setNewContact("");
        setNewAge("");
        setNewBatch("");
    };

    const onSubmit = (event) => {

        event.preventDefault();

        const newBuyer = {
            name: new_name,
            email: email,
            password: new_password,
            contact_num: new_contact_num,
            age: new_age,
            batch: new_batch,
        };

        axios
        .post("http://localhost:4000/buyer/updatebuyer", newBuyer)
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
        <Container>
            <Grid container spacing={1} align={"center"}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  id="Name"
                  value={new_name}
                  label="New Name"
                  name="Name"
                  autoComplete="Name"
                  onChange={onChangeBuyerName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={new_password}
                  label="New password"
                  type={"password"}
                  id="password"
                  autoComplete="password"
                  onChange={onChangePassword}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Contact_Numb"
                  value={new_contact_num}
                  label="New Contact Number"
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
                  value={new_age}
                  label="New Age"
                  id="Age"
                  autoComplete="Age"
                  onChange={onChangeAge}
                />
              </Grid>


              <FormControl sx={{ m: 1, minWidth: 350 }}>
                  
                <InputLabel>New Batch</InputLabel>

                <Select
                  value={new_batch}
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
                    Save Changes
                </Button>
            </Grid>

      </Container>

  );
};

export default BuyerUpdate;
