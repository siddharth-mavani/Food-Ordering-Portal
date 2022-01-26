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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const BuyerDashboard = (props) => {

  const navigate = useNavigate();
  const [food_items, setFoodItems] = useState([]);
  const [filtered_food_items, setFilteredFoodItems] = useState([]);
  const [balance, setBalance] = useState(0);
  const [favs, setFavs] = useState([]);
  const [defPrice, setDefPrice] = useState("");

  const [curShopName, setCurShopName] = useState("");
  const [curItemName, setCurItemName] = useState("");
  const [curPrice, setCurPrice] = useState("");
  const [dispPrice, setDispPrice] = useState("");
  const [curItemType, setCurItemType] = useState("");
  const [curAddOns, setCurAddOns] = useState([]);
  const [curTags, setCurTags] = useState([]);
  const [curRating, setCurRating] = useState("");
  const [selAddOnes, setSelAddOnes] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [ShowAddToCart, setShowAddToCart] = useState(false);

  useEffect(() => {

    console.log("Welcome to the Buyer Dashboard!");

    const email = localStorage.getItem('BuyerEmail');

    const getBuyer = {
      email: email,
    };

    axios
      .post("http://localhost:4000/buyer/getbuyer", getBuyer)
      .then((response) =>{
        setBalance(response.data.money);
      })
      .catch((error) => {
        console.log(error);
      });

    const getFav = {
      buyer_email: email,
    };

    axios
      .post("http://localhost:4000/fav/getbyemail", getFav)
      .then((response) => {
        
        setFavs(response.data);

        response.data.map((fav) => {

          const getFood = {
            shop_name: fav.shop_name,
            item_name: fav.item_name,
          };

          axios
            .post("http://localhost:4000/food/getfood", getFood)
            .then((response1) => {
              setFilteredFoodItems(prev => [...prev,response1.data]);
              setFoodItems(prev => [...prev,response1.data]);
            })
            .catch((error) => {
              console.log(error);
            });

        });
        
      })
      .catch((error) => {
        console.log(error);
    });



  }, []);

  const GoToWallet = () => {
    navigate("/wallet");
  }

  const DelFav = (food_item) => {

    const email = localStorage.getItem("BuyerEmail");
    const shop_name = food_item.shop_name;
    const item_name = food_item.item_name;

    const delFav = {
      buyer_email: email,
      shop_name: shop_name,
      item_name: item_name,
    };

    axios
      .post("http://localhost:4000/fav/delfav", delFav)
      .then((response) => {
        console.log(response.data);
        alert("Deleted from Favourites");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      }
    );


  }

  const AddToCart = (food_item) => {
    setCurItemName(food_item.item_name);
    setCurShopName(food_item.shop_name);
    setCurPrice(food_item.price);
    setDispPrice(food_item.price);
    setDefPrice(food_item.price);
    setCurItemType(food_item.item_type);
    setCurAddOns(food_item.addons);
    setCurTags(food_item.tags);
    setCurRating(food_item.rating);

    setShowAddToCart(true);
  }

  const handleOpen = () => {

  }

  const handleClose = () => {
    setShowAddToCart(false);

    setCurItemName("");
    setCurShopName("");
    setCurPrice("");
    setDispPrice("");
    setDefPrice("");
    setCurItemType("");
    setCurAddOns([]);
    setSelAddOnes([]);
    setCurTags([]);
    setCurRating("");
    setQuantity(1);
  }

  const handleConfirm = () => {

    const final_email = localStorage.getItem("BuyerEmail");
    const final_shop_name = curShopName;
    const final_item_name = curItemName;
    const final_addons = selAddOnes;
    const final_total_price = dispPrice;
    const final_quantity = quantity;
    const final_rating = curRating;

    console.log(final_addons);
    // Add to PlacedOrder Database
    const addToPlacedOrder = {
      buyer_email: final_email,
      shop_name: final_shop_name,
      item_name: final_item_name,
      addons: final_addons,
      total_price: final_total_price,
      quantity: final_quantity,
      rating: final_rating,
      status: "PLACED",
    };

    axios
      .post("http://localhost:4000/placedorder/add", addToPlacedOrder)
      .then((response) =>{
        alert("Order Placed");
        console.log(response.data);

        const final_balance = balance - final_total_price;

        // Update Balance
        const updateBalance = {
          email: final_email,
          money: final_balance,
        };

        axios
          .post("http://localhost:4000/buyer/updatebuyermoney", updateBalance)
          .then((response) =>{
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
        });

      })
      .catch((error) => {
        console.log(error);
    });

    window.location.reload();
    setShowAddToCart(false);

    setCurItemName("");
    setCurShopName("");
    setCurPrice("");
    setDispPrice("");
    setDefPrice("");
    setCurItemType("");
    setCurAddOns([]);
    setSelAddOnes([]);
    setCurTags([]);
    setCurRating("");
    setQuantity(1);
  }
  
  const handleClose1 = () => {
    alert("Not Enough Money");
    setShowAddToCart(false);

    setCurItemName("");
    setCurShopName("");
    setCurPrice("");
    setDispPrice("");
    setDefPrice("");
    setCurItemType("");
    setCurAddOns([]);
    setSelAddOnes([]);
    setCurTags([]);
    setCurRating("");
    setQuantity(1);
  }

  const handleAddOns = (addon) => {
    let temp_price = curPrice;
    temp_price += addon.price;
    setCurPrice(temp_price);
    
    if(quantity > 1){
      temp_price = dispPrice;
      temp_price += addon.price * quantity;
      setDispPrice(temp_price);
    }
    else{
      setDispPrice(temp_price);
    }

    setSelAddOnes(prev => [...prev, addon.name]);
  }

  const remAddOns = (addon) => {
    let temp_price = curPrice;
    temp_price -= addon.price;
    setCurPrice(temp_price);

    if(quantity > 1){
      temp_price = dispPrice;
      temp_price -= addon.price * quantity;
      setDispPrice(temp_price);
    }
    else{
      setDispPrice(temp_price);
    }

    setSelAddOnes(prev => prev.filter(item => item !== addon.name));
  }

  const increment = () => {
    let temp = dispPrice;
    temp += curPrice;
    setDispPrice(temp);

    let temp_quantity = quantity;
    temp_quantity += 1;
    setQuantity(temp_quantity);
  }

  const decrement = () => {
    if(quantity > 1){
      let temp = dispPrice;
      temp -= curPrice;
      setDispPrice(temp);

      let temp_quantity = quantity;
      temp_quantity -= 1;
      setQuantity(temp_quantity);
    }
  }

  return (
    <div>
      <Grid container item xs={12} md={3} lg={3}>
        <Button variant="contained" onClick={GoToWallet} color="secondary">Current Balance = {balance}</Button>
      </Grid>
      
      <Grid item>
        
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Favourites</h1>
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
                  <TableCell>Item Type</TableCell>
                  <TableCell>Addons</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered_food_items.map((food_item, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind+1}</TableCell>
                    <TableCell>{food_item.shop_name}</TableCell>
                    <TableCell>{food_item.item_name}</TableCell>
                    <TableCell>{food_item.price}</TableCell> 
                    <TableCell>{food_item.item_type}</TableCell>  
                    <TableCell>
                      <ul class="unstyled">
                      {
                      food_item.addons.map((addon) => {
                        return <li>{addon.name}</li>
                      })
                      }
                      </ul>
                    </TableCell> 
                    <TableCell>
                    <ul class="unstyled">
                      {
                      food_item.tags.map((tag) => {
                        return <li>{tag}</li>
                      })
                      }
                      </ul>
                    </TableCell>                
                    <TableCell>{food_item.rating.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant = "contained" onClick={() => {DelFav(food_item)}}>
                        Remove Favourite
                      </Button> 
                    </TableCell>
                    <TableCell> 
                      <Button variant = "contained" onClick={() => {AddToCart(food_item)}} color="success">
                        Buy
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      <Dialog
      sx={{ '& .MuiDialog-paper': { width: '90%', maxHeight: 500 } }}
      maxWidth="xs"
      open={ShowAddToCart}
      onClose={handleClose}
      >
      <DialogTitle>{curShopName}</DialogTitle>

      <DialogContent dividers>
      
        <Grid container spacing={4} xs={20}>

          <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="Item Name"
                value={curItemName}
                fullWidth={true}
              /> 
          </Grid>

          <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="Price"
                value={defPrice}
                fullWidth={true}
              /> 
          </Grid>

          <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="Type"
                value={curItemType}
                fullWidth={true}
              /> 
          </Grid>

          <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="Rating"
                value={Number(curRating).toFixed(2)}
                fullWidth={true}
              /> 
          </Grid>
          
          {
            curAddOns.map((addon, ind) => {
              return (
                <Grid container xs={16} spacing={4}>

                  <Grid item xs={4} sx={{ml:5.5, mt:3}}>
                      <TextField
                        id="standard-basic"
                        label="Add On"
                        value={addon.name}
                        fullWidth={true}
                      /> 
                  </Grid>

                  <Grid item xs={4} sx={{ml:0.01, mt:3}}>
                      <TextField
                        id="standard-basic"
                        label="Price"
                        value={addon.price}
                        fullWidth={true}
                      /> 
                  </Grid>

                  {
                    (selAddOnes.includes(addon.name)) ? 
                    <Grid item xs={2} sx={{ml:0, mt:4}}>
                      <Button onClick={() => {remAddOns(addon)}} variant="contained" color="error">
                      Remove
                      </Button>
                    </Grid>

                      :
                      <Grid item xs={2} sx={{ml:0, mt:4}}>
                      <Button onClick={() => {handleAddOns(addon)}} variant="contained" color="primary">
                      Add
                      </Button>
                      </Grid>
                  }
                    
                </Grid>
              )
            })
          }

          <Grid item xs={4}>
              <TextField
                id="standard-basic"
                label="Quantity"
                value={quantity}
                fullWidth={true}
              /> 
          </Grid>

          <Grid item xs={3.5} sx={{ml:0, mt:1}}>
            <Button variant="contained" color="primary" onClick={increment}>
              Increment
            </Button> 
          </Grid>

          <Grid item xs={4} sx={{ml:0, mt:1}}>
            <Button variant="contained" color="primary" color="error" onClick={decrement}>
              Decrement
            </Button> 
          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button onClick={handleClose} variant="contained" color="error">
          Cancel
        </Button>

        {
          (balance >= dispPrice) ? 
          
            <Button onClick={handleConfirm} variant="contained" color="success" sx={{ml:5}}>
              Confirm Order
            </Button>

            :

            <Button onClick={handleClose1} variant="contained" color="error" sx={{ml:5}}>
              Confirm Order
            </Button>

        }

        <Grid item xs={3} sx={{ml:5}}>
          <TextField
            id="standard-basic"
            label="Total"
            value={dispPrice}
            width = {4}
          />
      </Grid>

      </DialogActions>
    </Dialog>
                  




    </div>
  );
};

export default BuyerDashboard;
