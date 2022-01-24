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
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Fuse from 'fuse.js';
import Chip from '@mui/material/Chip';

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const BuyerDashboard = (props) => {

  const navigate = useNavigate();

  const [food_items, setFoodItems] = useState([]);
  const [filtered_food_items, setFilteredFoodItems] = useState([]);
  const [sortedfood_items, setSortedFoodItems] = useState([]);
  const [sortFoodName, setSortFoodName] = useState(true);
  const [ShopNames, setShopNames] = useState([]);
  const [Tags, setTags] = useState([]);
  const [balance, setBalance] = useState(0);
  
  const [FilterShopName, setFilterShopName] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [DisplayTag, setDisplayTag] = useState("");
  const [veg_nveg, setVegNveg] = useState("");
  const [min_price, setMinPrice] = useState("");
  const [max_price, setMaxPrice] = useState("");


  useEffect(() => {
    axios
      .get("http://localhost:4000/food")
      .then((response) => {
        setFoodItems(response.data);
        setSortedFoodItems(response.data);
        setFilteredFoodItems(response.data);
        setSearchText("");

        const tags = [];
        response.data.map((food_item) =>{
          food_item.tags.map((tag) => {
            if(!tags.includes(tag)){
              tags.push(tag);
            }
          })
        })
        
        setTags(tags);

        const shops = [];
        response.data.map((food_item) =>{
         
            if(!shops.includes(food_item.shop_name)){
              shops.push(food_item.shop_name);
            }
          
        })
        
        setShopNames(shops);
      })
      .catch((error) => {
        console.log(error);
    });
    
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

  }, []);
  
  useEffect(() => {
    let result = food_items;

    // Filter by min price
    if(min_price){
      const temp = [];
      result.map((food_item) =>{
        if(food_item.price >= min_price){
          temp.push(food_item);
        }
      })

      result = temp;
    }
    
    // Filter by max price
    if(max_price){
      const temp = [];
      result.map((food_item) =>{
        if(food_item.price <= max_price){
          temp.push(food_item);
        }
      })

      result = temp;
    }

    // Filter by Shop Name
    if(FilterShopName !== '' && FilterShopName !== null){
      const temp = [];
      result.map((food_item) =>{
        if(food_item.shop_name === FilterShopName){
          temp.push(food_item);
        }
      })

      result = temp;
    }

    // Tags
    if(DisplayTag !== '' && DisplayTag !== null){

      const temp = [];
      result.map((food_item) => {
        food_item.tags.map((tag) => {
          if(tag == DisplayTag){
            temp.push(food_item);
          }
        })
      })

      result = temp;
    }

    // Veg/Non-Veg
    if(veg_nveg !== '' && veg_nveg !== null){

      const temp = [];
      result.map((food_item) =>{
        if(food_item.item_type === veg_nveg){
          temp.push(food_item);
        }
      })

      result = temp;
    }
    
    // Fuzzy Search
    const fuse = new Fuse(result, {
      keys: ["item_name"],
      threshold: 0.1,
    });

    const search_result = fuse.search(searchText);

    const temp = [];

    search_result.map((food_item) =>{
      temp.push(food_item.item);
    })

    if(!(temp.length === 0 || searchText === "")){
      result = temp;
    }

    setFilteredFoodItems(result);

  }, [searchText, FilterShopName, DisplayTag, veg_nveg, min_price, max_price]);

  const onChangeFilterShopName = (value) => {
    setFilterShopName(value);
  }

  const sortChange = (event) => {
    let usersTemp = food_items;
    const flag = sortFoodName;
    usersTemp.sort((a, b) => {
      if (a.date != undefined && b.date != undefined) {
        return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
      } else {
        return 1;
      }
    });
    setFoodItems(usersTemp);
    setSortFoodName(!sortFoodName);
  };

  const onChangeDisplayTag = (value) => {

    setDisplayTag(value);    

  }

  const onChangeVegNveg = (value) => {
    
    setVegNveg(value);

  }

  const onChangeSearch = (event) => {
    
    setSearchText(event.target.value);
   
  };

  const onChangeMinPrice = (value) => {
    setMinPrice(value);
  };

  const onChangeMaxPrice = (value) => {
    setMaxPrice(value);
  };

  const GoToWallet = () => {
    navigate("/wallet");
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
              <h1>Filters</h1>
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={24} md={9} lg={9} aligncontent={"left"}>
          <List component="nav" aria-label="mailbox folders" columnspacing={2}>
            <ListItem xs={24}>

              <Grid container spacing={2} md={3} lg={3}>

                <Grid item xs={12}>
                  Price
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Min"
                    type="number"
                    fullWidth={true}
                    onChange={(event) => onChangeMinPrice(event.target.value)}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Max"
                    type="number"
                    fullWidth={true}
                    onChange={(event) => onChangeMaxPrice(event.target.value)}
                  />
                </Grid> 
              </Grid>

              <Grid container spacing={2} md={3} lg={3} sx={{ml: 2}}>
                <Grid item xs={12}>
                  Shop Names
                </Grid>
                
                <Autocomplete
                  xs={12}
                  id="combo-box-demo"
                  options={ShopNames}
                  onChange={(event, value) => onChangeFilterShopName(value)}
                  getOptionLabel={(option) => option}
                  fullWidth
                  renderInput={(params) => (
                    <TextField sx={{mt:2}}
                      {...params}
                      label="Select Shop Name"
                      variant="outlined"
                    />
                  )}
                />

              </Grid>

              <Grid container spacing={2} md={3} lg={3} sx={{ml: 2}}>
                <Grid item xs={12}>
                  Food Tags
                </Grid>

                <Autocomplete
                  id="combo-box-demo"
                  options={Tags}
                  // value={DisplayTag}
                  getOptionLabel={(option) => option}
                  fullWidth
                  onChange={(event, value) => onChangeDisplayTag(value)}
                  renderInput={(params) => (
                    <TextField sx={{mt:2}}
                      {...params}
                      label="Select Food Tags"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

              <Grid container spacing={2} md={3} lg={3} sx={{ml: 2}}>
                <Grid item xs={12}>
                  Veg/Non-Veg
                </Grid>

                <Autocomplete
                  id="combo-box-demo"
                  options={["Veg", "Non-Veg"]}
                  getOptionLabel={(option) => option}
                  fullWidth
                  onChange={(event, value) => onChangeVegNveg(value)}
                  renderInput={(params) => (
                    <TextField sx={{mt:2}}
                      {...params}
                      label="Select Food Type"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} md={9} lg={12}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={onChangeSearch}
            />
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
                  <TableCell>
                    {"Price"}
                    <Button onClick={sortChange}>
                      {sortFoodName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                  </TableCell>
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
                      <Button onClick={sortChange}>
                        {sortFoodName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                      </Button> 
                    </TableCell>
                    <TableCell> 
                      <Button onClick={sortChange}>
                        {sortFoodName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
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
