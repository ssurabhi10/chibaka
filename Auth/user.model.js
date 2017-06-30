const mongoose = require('mongoose');
const User = require('./User');

const UserSchema = new mongoose.Schema({
	userName: { type: String, unique: true },
	mobileNumber: { type: String, unique: true },
	email: { type: String, unique: true },
	password: { type: String, required: true },
	role: { type: String },
	isEmailVerified: { type: Boolean, default: false },
	isMobileVerfied: { type: Boolean, default: false }
});

const userModel = mongoose.model('User', UserSchema);
const user = new User(userModel);

module.exports = user;
