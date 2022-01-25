const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FavSchema = new Schema({
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
},{
	timestamps: true,
});

FavSchema.index({item_name: 1, shop_name: 1, buyer_email: 1}, {unique: true});
module.exports = Fav = mongoose.model("Fav", FavSchema);
