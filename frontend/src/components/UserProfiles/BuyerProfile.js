import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { dividerClasses } from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        main: '#1976D1',
      },
    },
});

const BuyerProfile = (props) => {

  const navigate = useNavigate();

  const email = localStorage.getItem("Email");
  // alert(email);

  const onSubmit = (event) => {

    event.preventDefault();

    const loginBuyer = {
      
    };

    axios
      .post("http://localhost:4000/buyer/login", loginBuyer)
      .then((response) => {
        alert("Login Successful");
        console.log(response.data);
        navigate("/register");
      });

  };


  return (  
    <Grid>
      {email}
    </Grid>
    
  );
};

export default BuyerProfile;