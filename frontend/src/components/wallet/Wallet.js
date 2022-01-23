import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D1',
    },
  },
});

const BuyerProfile = (props) => {

  const [update, setUpdate] = useState("false");
  const [money, setMoney] = useState(0);
  const [email, setEmail] = useState(localStorage.getItem("BuyerEmail"));

  const [new_money, setNewMoney] = useState(0);

  useEffect(()=>{
    const getBuyer = {
        email: email,
    };

    axios
    .post("http://localhost:4000/buyer/getbuyer", getBuyer)
    .then((response) => {
        setMoney(response.data.money);
    })
    .catch((response) => {
        alert("error connecting to databse");
    });

    }, [email]);

  const setUpdateTrue = () => {
    setUpdate("true")
  }

  const setUpdateFalse = () => {
    window.location.reload();
    setUpdate("false")
  }

  const onChangeNewAmount = (event) => {
      setNewMoney(event.target.value);
  }

  const resetInputs = () => {
    setMoney("");
  };

  const onSubmit = (event) => {

    event.preventDefault();

    const final = Number(new_money) + Number(money);

    const newBuyer = {
        email: email,
        money: final,
    };

    axios
    .post("http://localhost:4000/buyer/updatebuyermoney", newBuyer)
    .then((response) => {
        alert(response.data);
        console.log(response.data);
    })
    .catch((response) => {
        console.log("hey" + response.data);
    });
    
    resetInputs();
};

 
  if(update === "false"){
    return (  

      <Container component="main" maxWidth="xs" align={"center"} sx={{ mt: 10 }}>

          <Grid id="BuyerDisplay" item xs={25}>
            <Divider />
            <ListItem>
                <ListItemText primary="Amount" secondary={money} />
            </ListItem>
            <Divider />
          </Grid>

          <Grid sx={{ mt: 2, mb: 2 }}>
            <Button fullWidth variant="contained" color="primary" onClick={setUpdateTrue}>
              Add Money
            </Button>
          </Grid> 
  
      </Container>
    );
  }
  else{

    return (  
      <Container component="main" maxWidth="xs" align={"center"} sx={{ mt: 10 }}>

          <Grid id="AmountUpdate" item xs={25}>
            <Grid container spacing={1} align={"center"}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  id="Amount"
                  value={new_money}
                  label="Amount To Add"
                  name="Amount"
                  autoComplete="Amount"
                  onChange={onChangeNewAmount}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid sx={{ mt: 2, mb: 2 }}>
            <Button fullWidth variant="contained" color="primary" onClick={onSubmit}>
              Done
            </Button>
          </Grid> 

          <Grid sx={{ mt: 2, mb: 2 }}>
            <Button fullWidth variant="contained" color="primary" onClick={setUpdateFalse}>
              Back
            </Button>
          </Grid> 
  
      </Container>
    );
  }

  
};

export default BuyerProfile;