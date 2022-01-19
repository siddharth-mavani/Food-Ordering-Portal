var express = require("express");
var router = express.Router();

// Load User model
const Vendor = require("../models/Vendor");

// URL is of this format: ../vendor/..

// GET request 
// Getting all the vendors
router.get("/", function(req, res) {
    Vendor.find(function(err, vendors) {
		if (err) {
			console.log(err);
		} else {
			res.json(vendors);
		}
	})
});


// POST request 
// Add a vendor to the database
router.post("/register", (req, res) => {

    const manager_name = req.body.manager_name;
    const shop_name = req.body.shop_name;
    const email = req.body.email;
    const contact_num = req.body.contact_num;
    const open_time = req.body.open_time;
    const close_time = req.body.close_time;

    const newUser = new Vendor({manager_name, shop_name, email, contact_num, open_time, close_time});

    newUser.save()
        .then(vendor => {
            res.status(200).json(vendor);
        })
        .catch(err => {
            res.status(400).send("Error: " + err);
        });
});

// POST request 
// Vendor Login
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

