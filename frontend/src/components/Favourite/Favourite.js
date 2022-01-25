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
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";


const BuyerDashboard = (props) => {

  const navigate = useNavigate();
  const [food_items, setFoodItems] = useState([]);
  const [filtered_food_items, setFilteredFoodItems] = useState([]);
  const [balance, setBalance] = useState(0);
  const [favs, setFavs] = useState([]);

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
            .post("http://localhost:4000/food/getfavfood", getFood)
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
    
  }

  return (
    <div>
      <Grid container item xs={12} md={3} lg={3}>
        <Button variant="contained" onClick={GoToWallet}>Current Balance = {balance}</Button>
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
                    <TableCell>{food_item.rating}</TableCell>
                    <TableCell>
                      <Button variant = "contained" onClick={() => {DelFav(food_item)}}>
                        Remove Favourite
                      </Button> 
                    </TableCell>
                    <TableCell> 
                      <Button variant = "contained" onClick={() => {AddToCart(food_item)}}>
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
    </div>
  );
};

export default BuyerDashboard;
