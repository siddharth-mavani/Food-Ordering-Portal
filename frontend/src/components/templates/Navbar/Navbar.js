import * as React from 'react';
import Grid from "@mui/material/Grid";
import BuyerNavbar from "./BuyerNavbar";
import VendorNavbar from "./VendorNavbar";
import GeneralNavbar from "./GeneralNavbar";

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {

  const BuyerEmail = localStorage.getItem("BuyerEmail");
  const VendorEmail = localStorage.getItem("VendorEmail");

  if(BuyerEmail !== ""){
    return(
      <Grid>       
        <Grid id="BuyerNavbar" item xs={25}>
          <BuyerNavbar />
        </Grid>
      </Grid>
    );      
  }
  else if(VendorEmail !== ""){
    return(
      <Grid>       
        <Grid id="VendorNavbar" item xs={25}>
          <VendorNavbar />
        </Grid>
      </Grid>
    );  
  }
  else{
    return(
      <Grid>       
        <Grid id="GeneralNavbar" item xs={25}>
          <GeneralNavbar />
        </Grid>
      </Grid>
    );  
  }
};
export default ResponsiveAppBar;
