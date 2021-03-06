import { useState } from "react";
import Grid from "@mui/material/Grid";
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from "@material-ui/core/MenuItem";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import BuyerRegister from "./buyer";
import VendorRegister from "./vendor";

const Register = (props) => {

  const [user_type, setType] = useState("");

  const onChangeuser = (event) => {
    setType(event.target.value);
  };

  return (

      <Container component="main" maxWidth="xs" align={"center"} sx={{ mt: 10 }}>

          <Typography component="h1" variant="h5">
            Register
          </Typography>
                      
            <Grid align={"center"}>

              <Grid item xs={25}>

                <FormControl sx={{ m: 1, minWidth: 350 }}>
                  
                  <InputLabel>User Type</InputLabel>

                  <Select
                    value={user_type}
                    onChange={onChangeuser}
                    autosize={true}
                    label="User Type">

                    <MenuItem value={"Buyer"}>Buyer</MenuItem>
                    <MenuItem value={"Vendor"}>Vendor</MenuItem>

                  </Select>

                </FormControl>

              </Grid>
            
              {user_type === "Buyer" && (
                <Grid id="BuyerRegister" item xs={25}>
                  <BuyerRegister />
                </Grid>
              )}

              {user_type === "Vendor" && (
                <Grid id="VendorRegister" item xs={25}>
                  <VendorRegister />
                </Grid>
              )}
            </Grid>
          
          
          <Link href="/login" variant="body2" sx={{ mt: 10 }}>
            Already have an account ? Sign in
          </Link>
          
          

      </Container>
  );
};

export default Register;