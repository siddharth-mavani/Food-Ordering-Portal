const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	manager_name: {
		type: String,
		required: true,
		unique: false,
		trim: true,
	},
	shop_name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		unique: false,
		trim: true,
	},
	contact_num:{
		type: Number,
		required: true,
		unique: false,
		trim: true,
	},
	open_time:{
		type: String,
		required: true,
		unique: false,
		trim: true,
	},
	close_time:{
		type: String,
		required: true,
		unique: false,
		trim: true,
	},
},{
	timestamps: true,
});

module.exports = Vendor = mongoose.model("Vendor", UserSchema);
