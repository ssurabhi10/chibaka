const assert = require('assert');
const User = require('./MemoryUserModel');
const bcrypt = require('bcrypt');

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

	describe('changeUserName', function () {
		it ('Should change userName', function () {
			const user = User.changeUserName(_id = 0, userName = 'bozo');
			assert.equal(user._id, 0);
			assert.equal(user.userName, 'bozo');
			const usersWithNameBozo = User.findAllUser({});
			assert.equal(usersWithNameBozo.length, 1);
			assert.equal(usersWithNameBozo[0].userName, 'bozo');
		});
	});

	describe('changeMobileNumber', function () {
		it ('Should change mobileNumber', function () {
			const user = User.changeMobileNumber(_id = 0, mobileNumber = '9898989898');
			assert.equal(user._id, 0);
			assert.equal(user.mobileNumber, '9898989898');
			assert.equal(user.isMobileVerified, false);
			const usersWithNewMobileNumber = User.findAllUser({});
			assert.equal(usersWithNewMobileNumber.length, 1);
			assert.equal(usersWithNewMobileNumber[0].mobileNumber, '9898989898');
			assert.equal(usersWithNewMobileNumber[0].isMobileVerified, false);
		});
	});

	describe('changeEmail', function () {
		it ('Should change email', function () {
			const user = User.changeEmail(_id = 0, email = 'chi@baka.com');
			assert.equal(user._id, 0);
			assert.equal(user.email, 'chi@baka.com');
			assert.equal(user.isEmailVerified, false);
			const usersWithNewEmail = User.findAllUser({});
			assert.equal(usersWithNewEmail.length, 1);
			assert.equal(usersWithNewEmail[0].email, 'chi@baka.com');
			assert.equal(usersWithNewEmail[0].isEmailVerified, false);
		});
	});

	describe('changeRole', function () {
		it ('Should change role', function () {
			const user = User.changeRole(_id = 0, role = 'admin');
			assert.equal(user._id, 0);
			assert.equal(user.role, 'admin');
			const usersWithNewRole = User.findAllUser({});
			assert.equal(usersWithNewRole.length, 1);
			assert.equal(usersWithNewRole[0].role, 'admin');
		});
	});

	describe('changePassword', function () {
		it ('Should change password', function () {
			const user = User.changePassword(_id = 0, password = 'password123');
			assert.equal(user._id, 0);
			assert.equal(bcrypt.compareSync(password, user.password), true);
		});
	});

	describe('verifyEmail', function () {
		it ('Should verify email', function () {
			const user = User.verifyEmail(_id = 0, isEmailVerified = true);
			assert.equal(user._id, 0);
			assert.equal(user.isEmailVerified, true);
		});
	});

	describe('verifyMobile', function () {
		it ('Should verify mobile number', function () {
			const user = User.verifyMobile(_id = 0, isMobileVerified = true);
			assert.equal(user._id, 0);
			assert.equal(user.isMobileVerified, true);
		});
	});

});
