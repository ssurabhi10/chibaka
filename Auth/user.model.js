const mongoose = require('mongoose');
const Users = require('./users');

// console.log(Users);

const UserSchema = new mongoose.Schema({
	userName: { type: String }
});

const userModel = mongoose.model('User', UserSchema);
const user = new Users(userModel);

module.exports = user;
