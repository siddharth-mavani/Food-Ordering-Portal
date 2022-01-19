var express = require("express");
var router = express.Router();

// Load User model
const Buyer = require("../models/Buyer");

// URL is of this format: ../buyer/..

// GET request 
// Getting all the buyers
router.get("/", function(req, res) {
    Buyer.find(function(err, buyers) {
		if (err) {
			console.log(err);
		} else {
			res.json(buyers);
		}
	})
});

// POST request 
// Add a buyer to the database
router.post("/register", (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const contact_num = req.body.contact_num;
    const age = req.body.age;

    const newUser = new Buyer({name, email, contact_num, age});

    newUser.save()
        .then(buyer => {
            res.status(200).json(buyer);
        })
        .catch(err => {
            res.status(400).send("Error: " + err);
        });
});

// POST request 
// Buyer Login
router.post("/login", (req, res) => {
	const email = req.body.email;

	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            res.send("Email Found");
            return user;
        }
	});
});

module.exports = router;

