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

PlacedOrderSchema.index({item_name: 1, shop_name: 1, buyer_email: 1}, {unique: true});
module.exports = PlacedOrder = mongoose.model("PlacedOrder", PlacedOrderSchema);
