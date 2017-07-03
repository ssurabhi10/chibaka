const assert = require('assert');
const User = require('./MemoryUserModel');

describe('User', function () {
	let user;

	beforeEach(function () {
		user = new User({
			userName: 'chi',
			email: 'bozo@baka.com',
			mobileNumber: '9999988888',
			password: 'password',
			role: 'manager',
			isEmailVerified: true,
			isMobileVerified: true
		});
	});

	describe('createUser', function () {
		it ('Should create new user', function () {
			User.createUser(user);
			const users = User.findAllUser({});
			assert.equal(users.length, 1);
			assert.equal(users[0].userName, 'chi');
		});
	});

	describe('findUserById', function () {
		it ('Should return user by id', function () {
			const user = User.findUserById(_id = 0);
			assert.equal(user._id, 0);
			assert.equal(user.userName, 'chi');
		});
	});

	describe('findUserByName', function () {
		it ('Should return user by name', function () {
			const user = User.findUserByName(userName = 'chi');
			assert.equal(user._id, 0);
			assert.equal(user.userName, 'chi');
		});
	});

	describe('findUserByEmail', function () {
		it ('Should return user by email', function () {
			const user = User.findUserByEmail(email = 'bozo@baka.com');
			assert.equal(user._id, 0);
			assert.equal(user.userName, 'chi');
			assert.equal(user.email, 'bozo@baka.com');
		});
	});

	describe('findUserByMobileNumber', function () {
		it ('Should return user by mobileNumber', function () {
			const user = User.findUserByMobileNumber(mobileNumber = '9999988888');
			assert.equal(user._id, 0);
			assert.equal(user.userName, 'chi');
			assert.equal(user.mobileNumber, '9999988888');
		});
	});

	describe('findUsersByRole', function () {
		it ('Should return users by role', function () {
			const users = User.findUsersByRole(role = 'manager');
			assert.equal(users.length, 1);
			assert.equal(users[0].role, 'manager');
		});
	});

});
