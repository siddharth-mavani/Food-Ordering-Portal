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
import { setRef } from "@mui/material";

const VendorOrders = () => {

  const navigate = useNavigate();

  const [food_items, setFoodItems] = useState([]);
  const [shopName, setShopName] = useState("");
  const [superCount, setSuperCount] = useState(0);

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

        const getPlacedOrder = {
            shop_name: response.data.shop_name,
        };
        
        axios
            .post("http://localhost:4000/placedorder/getbyshopname", getPlacedOrder)
            .then((response) =>{
    
                setFoodItems(prev => [...prev, response.data]);

                let temp_count = 0;
                response.data.map((food_item) => {
                  if(food_item.status == "ACCEPTED" || food_item.status == "COOKING"){
                    temp_count++;
                  }
                })
                setSuperCount(temp_count);

    
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

  const handleNextStage = (food_item) => {

    
      let status = "";

      if(food_item.status === "PLACED"){
        if(superCount <=9){
          status = "ACCEPTED";
        }
        else{
          alert("Max limit reached");
          return;
        }
      }
      if(food_item.status === "ACCEPTED"){
          status = "COOKING";
      }
      if(food_item.status === "COOKING"){
          
        status = "READY FOR PICKUP";
        setSuperCount(prev => prev - 1);
         
      }
      if(food_item.status === "READY FOR PICKUP"){
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

          if(!(status === "PLACED" || status === "ACCEDPTED")){
            setSuperCount(prev => prev + 1);
          }

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

          let temp_amount = 0;
          
          // Get Buyer from email
          const getBuyer = {
            email: food_item.buyer_email,
          };

          axios
            .post("http://localhost:4000/buyer/getbuyer", getBuyer)
            .then((response) => {
              console.log(response);
              temp_amount = response.data.money;
              
              const updateWallet = {
                email: food_item.buyer_email,
                money: Number(food_item.total_price) + Number(temp_amount),
              };

              console.log(updateWallet);

              axios
                .post("http://localhost:4000/buyer/updatebuyermoney", updateWallet)
                .then((response) => {
                  console.log(response);
                  alert("Money Updated Successfully !");
                })
                .catch((error) => {
                  console.log("in" + error);
                });

            })
            .catch((error) => {
              console.log("out"+ error);
            });

          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
  }

  const GoToDashboard = () => {
    useNavigate("/vendordashboard");
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
                        <TableCell>{(new Date(food_item.createdAt)).toTimeString().split(" ")[0]}</TableCell>
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
