import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import BuyerDisplay from './BuyerDisplay';
import BuyerUpdate from './BuyerUpdate';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D1',
    },
  },
});

const BuyerProfile = (props) => {

  const [update, setUpdate] = useState("false");

  const setUpdateTrue = () => {
    setUpdate("true")
  }

  const setUpdateFalse = () => {
    setUpdate("false")
  }
 
  if(update === "false"){
    return (  

      <Container component="main" maxWidth="xs" align={"center"} sx={{ mt: 10 }}>

          <Grid id="BuyerDisplay" item xs={25}>
            <BuyerDisplay/>
          </Grid>

          <Grid sx={{ mt: 2, mb: 2 }}>
            <Button fullWidth variant="contained" color="primary" onClick={setUpdateTrue}>
              Update Details
            </Button>
          </Grid> 
  
      </Container>
    );
  }
  else{

    return (  
      <Container component="main" maxWidth="xs" align={"center"} sx={{ mt: 10 }}>

          <Grid id="BuyerUpdate" item xs={25}>
            <BuyerUpdate/>
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