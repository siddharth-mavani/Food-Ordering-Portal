const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: false,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	contact_num:{
		type: Number,
		required: true,
		unique: false,
		trim: true,
	},
	age:{
		type: Number,
		required: true,
		unique: false,
		trim: true,
	},
},{
	timestamps: true,
});

module.exports = User = mongoose.model("Buyer", UserSchema);
