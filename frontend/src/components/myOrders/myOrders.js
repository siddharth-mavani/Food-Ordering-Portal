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


const MyOrders = () => {

  const [food_items, setFoodItems] = useState([]);
  const [showRating, setShowRating] = useState(false);
  const [newRating, setNewRating] = useState(0);

  const [shopName, setShopName] = useState("");
  const [itemName, setItemName] = useState("");

  useEffect(() => {

    console.log("Welcome to My Orders Page !");

    const email = localStorage.getItem('BuyerEmail');

    const getPlacedOrder = {
     buyer_email: email,
    };

    axios
      .post("http://localhost:4000/placedorder/getbyemail", getPlacedOrder)
      .then((response) =>{

        setFoodItems(prev => [...prev, response.data]);
        console.log(response.data);


      })
      .catch((error) => {
        console.log(error);
    });

  }, []);

  const handleRate = (food_item) => {
    setShowRating(true);

    setShopName(food_item.shop_name);
    setItemName(food_item.item_name);
  }

  const handleClose = () => {
    setShowRating(false);

    setShopName("");
    setItemName("");
  }

  const updateRating = (value) => {
    setNewRating(value);
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
                  <TableCell>Shop Name</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Placed Time</TableCell>
                  <TableCell>Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { food_items.length > 0 ? 

                    food_items[0].map((food_item, ind) => (
                    <TableRow key={ind}>
                        <TableCell>{ind+1}</TableCell>
                        <TableCell>{food_item.shop_name}</TableCell>
                        <TableCell>{food_item.item_name}</TableCell>
                        <TableCell>{food_item.total_price}</TableCell> 
                        <TableCell>{food_item.quantity}</TableCell>  
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
                        <TableCell>{(new Date(food_item.createdAt)).getHours()}:{(new Date(food_item.createdAt)).getMinutes()}</TableCell>            
                        <TableCell>

                            {food_item.status === "COMPLETED" ? 
                                <Button variant="contained" color="secondary" onClick={() => {handleRate(food_item)}}>
                                    Rate
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

      <Dialog
      sx={{ '& .MuiDialog-paper': { width: '90%', maxHeight: 500 } }}
      maxWidth="xs"
      open={showRating}
      onClose={handleClose}
      >
      <DialogTitle>Rate</DialogTitle>

      <DialogContent dividers>
      
        <Grid container spacing={4} xs={20}>

          <Grid item xs={6}>
            <Autocomplete
                id="combo-box-demo"
                options={[1, 2, 3, 4, 5]}
                getOptionLabel={(option) => option}
                fullWidth
                onChange={(event, value) => updateRating(value)}
                renderInput={(params) => (
                  <TextField sx={{mt:2}}
                    {...params}
                    label="Rating"
                    variant="outlined"
                  />
                )}
            />
          </Grid>

          <Grid item xs={6}>
            <Button  variant="contained" color="success" sx={{mt:3}} onClick={confirmRating}>
                Confirm
            </Button>
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        <Grid container spacing={4} xs={20}>

            <Grid item xs={6}>
                <Button  variant="contained" color="error" sx={{ml:'80%'}} onClick={handleClose}>
                    Cancel
                </Button> 
            </Grid>
        </Grid>
        
      </DialogActions> 
    </Dialog>
                  
    </div>
  );
};

export default MyOrders;
