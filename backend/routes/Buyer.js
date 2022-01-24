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
    const password = req.body.password;
    const contact_num = req.body.contact_num;
    const age = req.body.age;
    const batch = req.body.batch;
    const money = 0;

    const newUser = new Buyer({name, email, password, contact_num, age, batch, money});

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
    const password = req.body.password;

	// Find user by email
	Buyer.findOne({ email }).then(buyer => {
		// Check if user email exists
		if (!buyer) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            if(password.localeCompare(buyer.password) == 0){
                res.send({email});
            }
            else{
                return res.status(404).json({
                    error: buyer.password + " ;" + password,
                });
            }
        }
	});
});

// POST request
// Get Buyer from email
router.post("/getbuyer", (req, res) => {
    Buyer.findOne({'email': req.body.email}, function(err, buyer) {
		if (err) {
			console.log(err);
		} else {
			res.json(buyer);
		}
	})
});

// POST request
// Update buyer info
router.post("/updatebuyer", (req, res) => {
    Buyer.findOne({email: req.body.email}) 
		.then(buyer => {
            buyer.name = req.body.name;
            buyer.password = req.body.password;
            buyer.contact_num = req.body.contact_num;
            buyer.age = req.body.age;
            buyer.batch = req.body.batch;

            buyer.save()
            .then(() => res.json("Buyer Updated"))
            .catch(err => res.status(400).json(err))
        })
    .catch(err => res.status(400).json(err))
});

// Post request
// Update buyer wallet 
router.post("/updatebuyermoney", (req, res) => {
    Buyer.findOne({email: req.body.email}) 
		.then(buyer => {
            buyer.money = req.body.money;
            
            buyer.save()
            .then(() => res.json("Amount Updated"))
            .catch(err => res.status(400).json(err))
        })
    .catch(err => res.status(400).json(err))
});


module.exports = router;

