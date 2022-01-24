const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddOnSchema = new Schema({ addon: { type: String, required: true, unique: true, }, price: { type: Number, required: true, }, }, { timestamps: true });
const TagSchema = new Schema({ tag: { type: String, required: true, unique:true, }, }, { timestamps: true });

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
		type: [AddOnSchema],
		required: true,
		unique: false,
		trim: true,
	},
	tags:{
		type: [TagSchema],
		required: true,
		unique: false,
		trim: false,
	},
},{
	timestamps: true,
});

module.exports = Food = mongoose.model("Food", FoodSchema);
