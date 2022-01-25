var express = require("express");
var router = express.Router();

// Load User model
const Fav = require("../models/Favourite");

// URL is of this format: ../fav/..

// GET request 
// Getting all the favs
router.get("/", function(req, res) {
    Fav.find(function(err, fav) {
		if (err) {
			console.log(err);
		} else {
			res.json(fav);
		}
	})
});



// POST request 
// Add a fav to the database
router.post("/add", (req, res) => {

    const shop_name = req.body.shop_name;
    const buyer_email = req.body.buyer_email;
    const item_name = req.body.item_name;
    

    const newUser = new Fav({shop_name, item_name, buyer_email});

    newUser.save()
        .then(fav => {
            res.status(200).json(fav);
        })
        .catch(err => {
            res.status(400).send("Error: " + err);
        });
});

// POST request 
// Get Favs from email
router.post("/getbyemail", (req, res) => {

    const buyer_email = req.body.buyer_email;
    
    Fav.find({buyer_email})
    .then(fav => {
		return res.status(200).json(fav);
	})
    .catch(err => {
        return res.status(400).send("Error: " + err);
    });
});

// POST request 
// Delete Favs 
router.post("/delfav", (req, res) =>{

    const buyer_email = req.body.buyer_email;
    const item_name = req.body.item_name;
    const shop_name = req.body.shop_name;

    Fav.deleteOne({buyer_email, item_name, shop_name})
    .then(fav => {
        return res.status(200).send("Deleted");
    })
    .catch(err => {
        return res.status(400).send("Error: " + err);
    });

});



module.exports = router;

