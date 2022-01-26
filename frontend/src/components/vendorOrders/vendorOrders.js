import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Autocomplete from "@mui/material/Autocomplete";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const VendorOrders = () => {

  const [food_items, setFoodItems] = useState([]);
  const [showRating, setShowRating] = useState(false);
  const [newRating, setNewRating] = useState(0);

  const [shopName, setShopName] = useState("");
  const [itemName, setItemName] = useState("");

  useEffect(() => {

    console.log("Welcome to My Orders Page !");

    const email = localStorage.getItem('VendorEmail');

    const getVendor = {
     email: email,
    };

    axios
      .post("http://localhost:4000/vendor/getvendor", getVendor)
      .then((response) =>{

        setShopName(response.data.shop_name);
        console.log(response.data.shop_name);

        const getPlacedOrder = {
            shop_name: response.data.shop_name,
        };
        
        axios
            .post("http://localhost:4000/placedorder/getbyshopname", getPlacedOrder)
            .then((response) =>{
    
                console.log("hey1234");
                console.log(response.data);
                setFoodItems(prev => [...prev, response.data]);
    
            })
            .catch((error) => {
                console.log(error);
            }
        );

      })
      .catch((error) => {
        console.log(error);
    });

    


  }, []);

  const handleRate = (food_item) => {
    setShopName(food_item.shop_name);
    setItemName(food_item.item_name);
  }

  const handleClose = () => {
    setShowRating(false);

    setShopName("");
    setItemName("");
  }

  const handleNextStage = (food_item) => {

    let status = "";

    if(food_item.status === "PLACED"){
        status = "ACCEPTED";
    }
    else if(food_item.status === "ACCEPTED"){
        status = "COOKING";
    }
    else if(food_item.status === "COOKING"){
        status = "READY FOR PICKUP";
    }
    else if(food_item.status === "READY FOR PICKUP"){
        status = "COMPLETED";
    }
    
    const updatePlacedOrder = {
      shop_name: shopName,
      time: food_item.createdAt,
      status: status,
    };

    axios
      .post("http://localhost:4000/placedorder/updatestatus", updatePlacedOrder)
      .then((response) => {
        console.log(response);
        alert("Status Updated Successfully !");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });


  }

  const handleReject = (food_item) => {

    const updatePlacedOrder = {
        shop_name: shopName,
        time: food_item.createdAt,
        status: "REJECTED",
      };
  
      axios
        .post("http://localhost:4000/placedorder/updatestatus", updatePlacedOrder)
        .then((response) => {
          console.log(response);
          alert("Status Updated Successfully !");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
        
  }

  const GoToDashboard = () => {
    useNavigate("/vendordashboard");
    }

  const confirmRating = () => {
            
        const updateRating = {
            shop_name: shopName,
            item_name: itemName,
            rating: newRating,
        };
        
        axios
        .post("http://localhost:4000/food/updateRating", updateRating)
        .then((response) =>{
    
            console.log(response.data);
    
            setShowRating(false);
    
            setShopName("");
            setItemName("");
        })
        .catch((error) => {
            console.log(error);
        });
    
  }

  return (
    <div>

      <Grid container item xs={12} md={3} lg={3}>
        <Button variant="contained" onClick={GoToDashboard} color="secondary">{shopName}</Button>
      </Grid>
      
      <Grid container>
    
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>My Orders</h1>
            </ListItem>
          </List>
        </Grid>

      </Grid>
      <Grid container align={"left"}>
        
        <Grid item xs={12} md={9} lg={12}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Add Ons</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Placed Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
                { food_items.length > 0 ? 
                    food_items[0].map((food_item, ind) => (
                    <TableRow key={ind}>
                        <TableCell>{ind+1}</TableCell>                      
                        <TableCell>{food_item.item_name}</TableCell>
                        <TableCell>
                            {food_item.addons.map((add_on, ind) => (
                                <div key={ind}>
                                    {add_on}
                                </div>
                            ))}
                        </TableCell>
                        <TableCell>{food_item.total_price}</TableCell> 
                        <TableCell>{food_item.quantity}</TableCell>  
                        <TableCell>{(new Date(food_item.createdAt)).getHours()}:{(new Date(food_item.createdAt)).getMinutes()}</TableCell>
                        <TableCell>

                            {food_item.status === "REJECTED" ? 
                                <Button variant="contained" color="error">
                                    {food_item.status}
                                </Button>
                                :
                                <Button variant="contained" color="primary">
                                    {food_item.status}
                                </Button>
                            }
                            
                        </TableCell>                
                        <TableCell>

                            {!(food_item.status === "COMPLETED" || food_item.status === "REJECTED") ? 
                                <Button variant="contained" color="secondary" onClick={() => {handleNextStage(food_item)}}>
                                    Move to Next Stage
                                </Button>
                                :
                                <></>
                            }

                        </TableCell>
                        <TableCell>

                            {food_item.status === "PLACED" ? 
                                <Button variant="contained" color="error" onClick={() => {handleReject(food_item)}}>
                                    Reject
                                </Button>
                                :
                                <></>
                            }

                        </TableCell>
                    </TableRow> 
                    ))

                    : 
                    
                    (<></>) 
                }
               </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
                  
    </div>
  );
};

export default VendorOrders;
