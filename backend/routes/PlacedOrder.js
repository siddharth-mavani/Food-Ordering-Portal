var express = require("express");
var router = express.Router();

// Load User model
const PlacedOrder = require("../models/PlacedOrder");

// URL is of this format: ../placedorder/..

// GET request 
// Getting all the placedorders
router.get("/", function(req, res) {
    PlacedOrder.find(function(err, placedorder) {
		if (err) {
			console.log(err);
		} else {
			res.json(placedorder);
		}
	})
});



// POST request 
// Add a placedorder to the database
router.post("/add", (req, res) => {

    const shop_name = req.body.shop_name;
    const buyer_email = req.body.buyer_email;
    const item_name = req.body.item_name;
    const addons = req.body.addons;
    const total_price = req.body.total_price;
    const quantity = req.body.quantity;
    const rating = req.body.rating;
    const status = req.body.status;
    

    const newUser = new PlacedOrder({shop_name, item_name, buyer_email, addons, total_price, quantity, rating, status});

    newUser.save()
        .then(placedorder => {
            res.status(200).json(placedorder);
        })
        .catch(err => {
            res.status(400).send("Error: " + err);
        });
});

// POST request 
// Get based on email
router.post("/getbyemail", (req, res) => {

    const email = req.body.buyer_email;

    PlacedOrder.find({buyer_email: email}, function(err, placedorder) {
        if (err) {
            res.status(400).send("Error: " + err);
        } else {
            res.json(placedorder);
        }
    })
});


// POST request 
// Get based on shop_name
router.post("/getbyshopname", (req, res) => {

    const shop_name = req.body.shop_name;

    PlacedOrder.find({shop_name: shop_name}, function(err, placedorder) {
        if (err) {
            res.status(400).send("Error: " + err);
        } else {
            console.log(placedorder);
            res.json(placedorder);
        }
    })
}); 

// POST request
// update status of placedorder
router.post("/updatestatus", (req, res) => {

    const shop_name = req.body.shop_name;
    const time = req.body.time;
    const status = req.body.status;

    PlacedOrder.findOneAndUpdate({shop_name: shop_name, createdAt: time}, {status: status}, function(err, placedorder) {
        if (err) {
            res.status(400).send("Error: " + err);
        } else {
            res.json(placedorder);
        }
    })
});


module.exports = router;

