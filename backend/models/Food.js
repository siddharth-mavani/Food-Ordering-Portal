const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FoodSchema = new Schema({
	shop_name: {
		type: String,
		required: true,
		unique: false,
		trim: true,
	},
	vendor_email: {
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
	item_type: {
		type: String,
		required: true,
		unique: false,
		trim: true,
	},
	price:{
		type: Number,
		required: true,
		unique: false,
		trim: true,
	},
	rating:{
		type: Number,
		required: true,
		unique: false,
		trim: true,
	},
    num_ratings:{
		type: Number,
		required: true,
		unique: false,
		trim: true,
	},
	addons:{
		type: [{
			name:{
				type: String,
				required: true,
			},
			price:{
				type: Number,
				required: true,
			}
		}]
	},
	tags:{
		type: [String],
		required: true,
		trim: false,
	},
},{
	timestamps: true,
});

FoodSchema.index({item_name: 1, shop_name: 1}, {unique: true});
module.exports = Food = mongoose.model("Food", FoodSchema);
