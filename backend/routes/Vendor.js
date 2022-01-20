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
    const password = req.body.password;
    const contact_num = req.body.contact_num;
    const open_time = req.body.open_time;
    const close_time = req.body.close_time;

    const newUser = new Vendor({manager_name, shop_name, email, password, contact_num, open_time, close_time});

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
    const password = req.body.password;

	// Find Vendor by email
	Vendor.findOne({ email }).then(vendor => {
		// Check if user email exists
		if (!vendor) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            if(password.localeCompare(vendor.password) == 0){
                res.send("Vendor Found");
            }
            else{
                return res.status(404).json({
                    error: vendor.password + " ;" + password,
                });
            }
        }
	});
});

module.exports = router;

