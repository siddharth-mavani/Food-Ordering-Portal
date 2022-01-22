import * as React from 'react';
import { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { Container } from '@mui/material';

const VendorDisplay = () => {

    const [manager_name, setVendorManagerName] = useState("");
    const [shop_name, setVendorShopName] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("VendorEmail"));
    const [contact_num, setContact] = useState("");
    const [open_time, setOpenTime] = useState("");
    const [close_time, setCloseTime] = useState("");

    useEffect(()=>{
        const getVendor = {
            email: email,
        };

        axios
        .post("http://localhost:4000/vendor/getvendor", getVendor)
        .then((response) => {
            setVendorManagerName(response.data.manager_name);
            setVendorShopName(response.data.shop_name);
            setContact(response.data.contact_num);
            setOpenTime(response.data.open_time);
            setCloseTime(response.data.close_time);
        })
        .catch((response) => {
            alert("error connecting to databse");
        });
    }, [email]);

    return (
        <Container>
            <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
            }}
            >
            <Divider component="li"/>
            <ListItem>
                <ListItemText primary="Manager Name" secondary={manager_name} />
            </ListItem>
            <Divider component="li" />

            <ListItem>
                <ListItemText primary="Shop Name" secondary={shop_name} />
            </ListItem>
            <Divider component="li" />
            
            <ListItem>
                <ListItemText primary="Email" secondary={email} />
            </ListItem>
            <Divider component="li"/>

            <ListItem>
                <ListItemText primary="Contact Number" secondary={contact_num} />
            </ListItem>
            <Divider component="li"/>

            <ListItem>
                <ListItemText primary="Open Time" secondary={open_time} />
            </ListItem>
            <Divider component="li"/>

            <ListItem>
                <ListItemText primary="Close Time" secondary={close_time} />
            </ListItem>
            <Divider component="li"/>
            </List>
        </Container>

  );
};

export default VendorDisplay;
