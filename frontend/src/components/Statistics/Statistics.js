import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Chip from '@mui/material/Chip';
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

const Statistics = () => {

  const navigate = useNavigate();

  const [food_items, setFoodItems] = useState([]);
  const [shopName, setShopName] = useState("");
  const [superCount, setSuperCount] = useState(0);

  const [top5, setTop5] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [totalPlaced, setTotalPlaced] = useState(0);
  const [numPending, setNumPending] = useState(0);
  const [numCompleted, setNumCompleted] = useState(0);

  useEffect(() => {

    console.log("Welcome to Statistics Page !");

   // Get Vendor from email
    const email = localStorage.getItem("VendorEmail");

    const getVendor = {
        email: email,
    }

    axios
        .post("http://localhost:4000/vendor/getvendor", getVendor)
        .then((response) => {

            const getPlacedOrder = {
                shop_name: response.data.shop_name,
            }

            axios
                .post("http://localhost:4000/placedorder/getbyshopname", getPlacedOrder)
                .then((response1) => {

                    setTotalPlaced(response1.data.length);


                    let temp_pending = 0; 
                    let temp_completed = 0;
                    let temp = [];
                    response1.data.map((placedorder) => {
                        if (placedorder.status !== "REJECTED" && placedorder.status !== "COMPLETED") {
                            temp_pending += 1;
                        }
                        if (placedorder.status === "COMPLETED") {
                            temp_completed += 1;
                            temp.push(placedorder.item_name);
                        }
                        
                    })

                    let temp1 = [];

                    for (let i = 0; i < temp.length; i++) {
                        let count = 0;
                        for (let j = 0; j < temp.length; j++) {
                            if (temp[i] === temp[j]) {
                                count++;
                            }
                        }
                        temp1.push({ [temp[i]]: count });
                    }

                    let temp2 = [];
                    for (let i = 0; i < temp1.length; i++) {
                        let flag = true;
                        for (let j = 0; j < temp2.length; j++) {
                            if (Object.keys(temp1[i])[0] === Object.keys(temp2[j])[0]) {
                                flag = false;
                            }
                        }
                        if (flag) {
                            temp2.push(temp1[i]);
                        }
                    }

                    // sort temp2 based on count
                    temp2.sort((a, b) => {
                        return Object.values(b)[0] - Object.values(a)[0];
                    });

                    setNumPending(temp_pending);
                    setNumCompleted(temp_completed);
                    setTop5(temp2);
                    top5.splice(5);

                })


        })

  }, []);

  return (
    <div>

      <Grid container>
          <Grid item align={"center"} xs={12}>
            <Chip label="Statistics" size="large" color="primary"/>
          </Grid>

          <Grid item align={"center"} xs={3} sx={{mt:4}}>
              <Grid container>
                <Grid item align={"center"} xs={12}>
                    <Chip label="Top 5 Items Sold" size="large" color="secondary"/>
                </Grid>

                <Grid item align={"center"} xs={12}>

                    <Grid container>
                        {top5.map((item) => {
                            return (
                                <Grid item align={"center"} xs={12} sx={{mt:1}}>{Object.keys(item)[0]}</Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
          </Grid>

          <Grid item align={"center"} xs={3} sx={{mt:4}}>
            <Chip label="Total Orders Placed" size="large" color="secondary"/>
            <Grid>
                {totalPlaced}
            </Grid>
          </Grid>

          <Grid item align={"center"} xs={3} sx={{mt:4}}>
            <Chip label="Number of Pending Orders" size="large" color="secondary"/>
            <Grid>
                {numPending}
            </Grid>
          </Grid>

          <Grid item align={"center"} xs={3} sx={{mt:4}}>
            <Chip label="Number of Completed Orders" size="large" color="secondary"/>
            <Grid>
                {numCompleted}
            </Grid>
          </Grid>

      </Grid>
          
    </div>
  );
};

export default Statistics;
