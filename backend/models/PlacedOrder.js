const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PlacedOrderSchema = new Schema({
	shop_name: {
		type: String,
		required: true,
		unique: false,
		trim: true,
	},
	item_name: {
		type: String,
		required: true,
		unique: false,
		trim: true,
	},
	buyer_email: {
		type: String,
		required: true,
		unique: false,
		trim: true,
	},
    addons: {
        type: [String],
        required: false,
        unique: false,
        trim: true,
    },
    total_price: {
        type: Number,
        required: true,
        unique: false,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        unique: false,
        trim: true,
    },
    rating: {
        type: Number,
        required: true,
        unique: false,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
},{
	timestamps: true,
});

module.exports = PlacedOrder = mongoose.model("PlacedOrder", PlacedOrderSchema);
