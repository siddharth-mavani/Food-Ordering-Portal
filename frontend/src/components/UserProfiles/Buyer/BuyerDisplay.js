import * as React from 'react';
import { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { Container } from '@mui/material';

const BuyerDisplay = () => {

    const [name, setBuyerName] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("BuyerEmail"));
    const [contact_num, setContact] = useState("");
    const [age, setAge] = useState("");
    const [batch, setBatch] = useState("");

    useEffect(()=>{
        const getBuyer = {
            email: email,
        };

        axios
        .post("http://localhost:4000/buyer/getbuyer", getBuyer)
        .then((response) => {
            setBuyerName(response.data.name);
            setContact(response.data.contact_num);
            setAge(response.data.age);
            setBatch(response.data.batch);
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
                <ListItemText primary="Name" secondary={name} />
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
                <ListItemText primary="Age" secondary={age} />
            </ListItem>
            <Divider component="li"/>

            <ListItem>
                <ListItemText primary="Batch" secondary={batch} />
            </ListItem>
            <Divider component="li"/>
            </List>
        </Container>

  );
};

export default BuyerDisplay;
