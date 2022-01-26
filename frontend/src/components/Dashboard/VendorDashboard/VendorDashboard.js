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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const VendorDashboard = (props) => {

  const navigate = useNavigate();

  const [food_items, setFoodItems] = useState([]);
  const [ShopName, setShopName] = useState();
  const [Tags, setTags] = useState([]);
  const [balance, setBalance] = useState(0);
  
  const [defPrice, setDefPrice] = useState("");

  const [curItemName, setCurItemName] = useState("");
  const [curPrice, setCurPrice] = useState("");
  const [dispPrice, setDispPrice] = useState("");
  const [curItemType, setCurItemType] = useState("");
  const [curAddOns, setCurAddOns] = useState([]);
  const [curTags, setCurTags] = useState([]);
  const [curRating, setCurRating] = useState("");
  const [selAddOnes, setSelAddOnes] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [createTime, setCreateTime] = useState("");

  const [newAddon, setNewAddon] = useState("");
  const [newAddonPrice, setNewAddonPrice] = useState("");

  const [newTag, setNewTag] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {

    const getFood = {
      vendor_email: localStorage.getItem("VendorEmail")
    }

    axios
      .post("http://localhost:4000/food/getfoodemail", getFood)
      .then((response) => {

        setFoodItems(response.data);
        
        const tags = [];
        response.data.map((food_item) =>{
          food_item.tags.map((tag) => {
            if(!tags.includes(tag)){
              tags.push(tag);
            }
          })
        })
        
        setTags(tags);
        setShopName(response.data[0].shop_name);

      })
      .catch((error) => {
        console.log(error);
    });

  }, []);

  const handleAddItem = () => {
    setShowAdd(true);
  }

  const handleDelete = (food_item) => {

    const deleteFood = {
      vendor_email: localStorage.getItem("VendorEmail"),
      item_name: food_item.item_name,
      shop_name: food_item.shop_name
    }

    axios
    .post("http://localhost:4000/food/deletefood", deleteFood)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });

    window.location.reload();

  }

  const setEdit = (food_item) => {
    setCurItemName(food_item.item_name);
    setCurPrice(food_item.price);
    setDispPrice(food_item.price);
    setDefPrice(food_item.price);
    setCurItemType(food_item.item_type);
    setCurAddOns(food_item.addons);
    setCurTags(food_item.tags);
    setCurRating(food_item.rating);
    setCreateTime(food_item.createdAt);

    setShowEdit(true);
  }

  const handleClose = () => {

    setShowEdit(false);
    setShowAdd(false);

    setCurItemName("");
    setCurPrice("");
    setDispPrice("");
    setDefPrice("");
    setCurItemType("");
    setCurAddOns([]);
    setSelAddOnes([]);
    setCurTags([]);
    setCurRating("");
    setQuantity(1);
    setCreateTime("");

  }

  const handleConfirmadd = () => {

    const final_email = localStorage.getItem("VendorEmail");
    const final_item_name = curItemName;
    const final_shop_name = ShopName;
    const final_item_type = curItemType;
    const final_addons = curAddOns;
    const final_total_price = curPrice;
    
    const final_tags = curTags;

    // Add Food Item
    const addFood = {
      vendor_email: final_email,
      item_name: final_item_name,
      shop_name: final_shop_name,
      item_type: final_item_type,
      price: final_total_price,
      addons: final_addons,
      tags: final_tags,
    };

    console.log(addFood);

    axios
      .post("http://localhost:4000/food/add", addFood)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    window.location.reload();
    setShowEdit(false);
    setShowAdd(false);

    setCurItemName("");
    setCurPrice("");
    setDispPrice("");
    setDefPrice("");
    setCurItemType("");
    setCurAddOns([]);
    setSelAddOnes([]);
    setCurTags([]);
    setCurRating("");
    setQuantity(1);
    setCreateTime("");
  }

  const handleConfirm = () => {

    const final_email = localStorage.getItem("VendorEmail");
    const final_item_name = curItemName;
    const final_shop_name = ShopName;
    const final_item_type = curItemType;
    const final_addons = curAddOns;
    const final_total_price = curPrice;
    
    const final_tags = curTags;

    // Update Food Item
    const updateFood = {
      vendor_email: final_email,
      item_name: final_item_name,
      shop_name: final_shop_name,
      item_type: final_item_type,
      price: final_total_price,
      addons: final_addons,
      tags: final_tags,
      createdAt: createTime,
    };

    console.log(updateFood);

    // Update Food Item
    axios
      .post("http://localhost:4000/food/updatefood", updateFood)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    window.location.reload();
    setShowEdit(false);
    setShowAdd(false);

    setCurItemName("");
    setCurPrice("");
    setDispPrice("");
    setDefPrice("");
    setCurItemType("");
    setCurAddOns([]);
    setSelAddOnes([]);
    setCurTags([]);
    setCurRating("");
    setQuantity(1);
    setCreateTime("");
  }

  const handleItemNameChange = (event) => {
    if(!(event.target.value === "" || event.target.value === null)){
      setCurItemName(event.target.value);
    }
  }

  const handlePriceChange = (event) => {
    setCurPrice(event.target.value);
  }

  const handleItemTypeChange = (value) => {
    if(!(value === "" || value === null)){
      setCurItemType(value);
      console.log(value);
    }
  }

  const delAddon = (addon) => {
    const newAddOns = curAddOns.filter((add) => {
      return add !== addon;
    });
    setCurAddOns(newAddOns);
  }

  const handleNewAddonNameChange = (event) => {
    if(!(event.target.value === "" || event.target.value === null)){
      setNewAddon(event.target.value);
    }
  }

  const handleNewTagChange = (event) => {
    if(!(event.target.value === "" || event.target.value === null)){
      setNewTag(event.target.value);
    }
  }

  const handleNewAddonPriceChange = (event) => {
    if(!(event.target.value === "" || event.target.value === null || event.target.value <= 0)){
      setNewAddonPrice(event.target.value);
    }
  }

  const handleNewAddon = () => {
    if(!(newAddon === "" || newAddon === null) && !(newAddonPrice === "" || newAddonPrice === null || newAddonPrice <= 0)){
      setCurAddOns(prev => [...prev,{name: newAddon, price: newAddonPrice}])
      setNewAddon("");

      console.log(curAddOns);

      setNewAddonPrice("");
    }
  }

  const handleNewTag = () => {
    if(!(newTag === "" || newTag === null)){
      setCurTags(prev => [...prev,newTag]);
      setNewTag("");
    }
  }

  const delNewTag = (tag) => {
    const newTags = curTags.filter((tag1) => {
      return tag1 !== tag;
    });
    setCurTags(newTags);
  }

  
  return (
    <div>
        
      <Grid item xs={12} md={3} lg={3}>
        <List component="nav" aria-label="mailbox folders">
          <ListItem text>
            <h1>Dashboard</h1>
          </ListItem>
        </List>
      </Grid>

      <Grid container align={"left"}>

        <Grid container item xs={12} md={3} lg={3}>
          <Button variant="contained" onClick={handleAddItem} color="secondary">Add Item</Button>
        </Grid>

        <Grid item xs={12} md={9} lg={12}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>{"Price"}</TableCell>
                  <TableCell>Item Type</TableCell>
                  <TableCell>Addons</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>{"Rating"}</TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {food_items.map((food_item, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind+1}</TableCell>
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
                      <Button variant = "contained" onClick={() => {setEdit(food_item)}}>
                        Edit
                      </Button> 
                    </TableCell>
                    <TableCell> 
                      <Button variant = "contained" onClick={() => {handleDelete(food_item)}} color="error">
                        Delete
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
      open={showEdit}
      onClose={handleClose}
      >
      <DialogTitle>Edit</DialogTitle>

      <DialogContent dividers>
      
        <Grid container spacing={4} xs={20}>

          <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="Item Name"
                value={curItemName}
                onChange={handleItemNameChange}
                fullWidth={true}
              /> 
          </Grid>

          <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="Price"
                value={curPrice}
                onChange={handlePriceChange}
                fullWidth={true}
              /> 
          </Grid>
          
          <Grid item xs={12}>
            <Autocomplete
                  id="combo-box-demo"
                  options={["Veg", "Non-Veg"]}
                  getOptionLabel={(option) => option}
                  fullWidth
                  onChange={(event, value) => handleItemTypeChange(value)}
                  value={curItemType}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Food Type"
                      variant="outlined"
                    />
                  )}
                />
          </Grid>
         
          
          {
            curAddOns.map((addon, ind) => {
              return (
                <Grid container xs={16} spacing={4}>

                  <Grid item xs={4} sx={{ml:4.5, mt:4}}>
                      <TextField
                        id="standard-basic"
                        label="Add On"
                        value={addon.name}
                        fullWidth={true}
                      /> 
                  </Grid>

                  <Grid item xs={4} sx={{ml:0.01, mt:4}}>
                      <TextField
                        id="standard-basic"
                        label="Price"
                        value={addon.price}
                        fullWidth={true}
                      /> 
                  </Grid>

                  <Grid item xs={2} sx={{ml:0, mt:5}}>
                    <Button  variant="contained" color="error" onClick={() => {delAddon(addon)}}>
                      Remove
                    </Button>
                  </Grid>
                    
                </Grid>
              )
            })
          }
          
          <Grid item xs={4.5}>
              <TextField
                id="standard-basic"
                label="Addon Name"
                value={newAddon}
                onChange={handleNewAddonNameChange}
                fullWidth={true}
              /> 
          </Grid>

          <Grid item xs={4.5}>
              <TextField
                id="standard-basic"
                label="Price"
                type="number"
                value={newAddonPrice}
                onChange={handleNewAddonPriceChange}
                fullWidth={true}
                
              /> 
          </Grid>

          <Grid item xs={3} sx={{mt:1}}>
            <Button  variant="contained" color="primary" onClick={handleNewAddon}>
              Add
            </Button>
          </Grid>

          {
            curTags.map((tag, ind) => {
              return (
                <Grid container xs={16} spacing={4}>

                  <Grid item xs={6} sx={{ml:4.5, mt:4}}>
                      <TextField
                        id="standard-basic"
                        label="Tag"
                        value={tag}
                        fullWidth={true}
                      /> 
                  </Grid>

                  <Grid item xs={5} sx={{ml:0, mt:5}}>
                    <Button  variant="contained" color="error" onClick={() => {delNewTag(tag)}}>
                      Remove
                    </Button>
                  </Grid>
                    
                </Grid>
              )
            })
          }

          <Grid item xs={6.5}>
            <TextField
                id="standard-basic"
                label="Tag"
                value={newTag}
                onChange={handleNewTagChange}
                fullWidth={true}
              /> 
          </Grid>
        
          <Grid item xs={5} sx={{mt:1}}>
            <Button  variant="contained" color="primary" onClick={handleNewTag}>
              Add Tag
            </Button>
          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button onClick={handleClose} variant="contained" color="error">
          Cancel
        </Button>
        
          
        <Button onClick={handleConfirm} variant="contained" color="success" sx={{ml:5}}>
          Save Changes
        </Button>

      </DialogActions>
    </Dialog>
    
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '90%', maxHeight: 500 } }}
      maxWidth="xs"
      open={showAdd}
      onClose={handleClose}
      >
      <DialogTitle>Add Item</DialogTitle>

      <DialogContent dividers>
      
        <Grid container spacing={4} xs={20}>

          <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="Item Name"
                value={curItemName}
                onChange={handleItemNameChange}
                fullWidth={true}
              /> 
          </Grid>

          <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="Price"
                value={curPrice}
                onChange={handlePriceChange}
                fullWidth={true}
              /> 
          </Grid>
          
          <Grid item xs={12}>
            <Autocomplete
                  id="combo-box-demo"
                  options={["Veg", "Non-Veg"]}
                  getOptionLabel={(option) => option}
                  fullWidth
                  onChange={(event, value) => handleItemTypeChange(value)}
                  value={curItemType}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Food Type"
                      variant="outlined"
                    />
                  )}
                />
          </Grid>
         
          
          {
            curAddOns.map((addon, ind) => {
              return (
                <Grid container xs={16} spacing={4}>

                  <Grid item xs={4} sx={{ml:4.5, mt:4}}>
                      <TextField
                        id="standard-basic"
                        label="Add On"
                        value={addon.name}
                        fullWidth={true}
                      /> 
                  </Grid>

                  <Grid item xs={4} sx={{ml:0.01, mt:4}}>
                      <TextField
                        id="standard-basic"
                        label="Price"
                        value={addon.price}
                        fullWidth={true}
                      /> 
                  </Grid>

                  <Grid item xs={2} sx={{ml:0, mt:5}}>
                    <Button  variant="contained" color="error" onClick={() => {delAddon(addon)}}>
                      Remove
                    </Button>
                  </Grid>
                    
                </Grid>
              )
            })
          }
          
          <Grid item xs={4.5}>
              <TextField
                id="standard-basic"
                label="Addon Name"
                value={newAddon}
                onChange={handleNewAddonNameChange}
                fullWidth={true}
              /> 
          </Grid>

          <Grid item xs={4.5}>
              <TextField
                id="standard-basic"
                label="Price"
                type="number"
                value={newAddonPrice}
                onChange={handleNewAddonPriceChange}
                fullWidth={true}
                
              /> 
          </Grid>

          <Grid item xs={3} sx={{mt:1}}>
            <Button  variant="contained" color="primary" onClick={handleNewAddon}>
              Add
            </Button>
          </Grid>

          {
            curTags.map((tag, ind) => {
              return (
                <Grid container xs={16} spacing={4}>

                  <Grid item xs={6} sx={{ml:4.5, mt:4}}>
                      <TextField
                        id="standard-basic"
                        label="Tag"
                        value={tag}
                        fullWidth={true}
                      /> 
                  </Grid>

                  <Grid item xs={5} sx={{ml:0, mt:5}}>
                    <Button  variant="contained" color="error" onClick={() => {delNewTag(tag)}}>
                      Remove
                    </Button>
                  </Grid>
                    
                </Grid>
              )
            })
          }

          <Grid item xs={6.5}>
            <TextField
                id="standard-basic"
                label="Tag"
                value={newTag}
                onChange={handleNewTagChange}
                fullWidth={true}
              /> 
          </Grid>
        
          <Grid item xs={5} sx={{mt:1}}>
            <Button  variant="contained" color="primary" onClick={handleNewTag}>
              Add Tag
            </Button>
          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button onClick={handleClose} variant="contained" color="error">
          Cancel
        </Button>
        
          
        <Button onClick={handleConfirmadd} variant="contained" color="success" sx={{ml:5}}>
          Confirm
        </Button>

      </DialogActions>
    </Dialog>

    </div>
  );
};

export default VendorDashboard;
