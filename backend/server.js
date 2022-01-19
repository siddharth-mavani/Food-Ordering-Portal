const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "Food-Delivery-WebApp";

// routes
var BuyerRouter = require("./routes/Buyer");
var VendorRouter = require("./routes/Vendor");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
const uri = "mongodb+srv://testuser:Test1234@food-delivery-webapp.sq1rm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(String(uri), { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/buyer", BuyerRouter);
app.use("/vendor", VendorRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
