const assert = require('assert');
const bcrypt = require('bcrypt');
const UserClass = require('./../User');

// to connect MemoryUserModel class
const User = require('./MemoryUserModel')

// to connect User class
//const MemoryUserModel = require('./MemoryUserModel')
//const User = new UserClass(MemoryUserModel);

describe('User', function () {
	let user;

	beforeEach(function () {
		// for MemoryUserModel class, use User here...
		// for User class, use MemoryUserModel here...
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
		it ('Should create new user', async function () {
			User.createUser({
				userName: 'chi',
				email: 'bozo@baka.com',
				mobileNumber: '9999988888',
				password: 'password',
				role: 'manager',
				isEmailVerified: true,
				isMobileVerified: true
			});
			const users = await User.findAllUser({});
			assert.equal(users.length, 1);
			assert.equal(users[0].userName, 'chi');
		});
	});

	describe('findUserById', function () {
		it ('Should return user by id', async function () {
			const user = await User.findUserById(_id = 0);
			assert.equal(user._id, 0);
			assert.equal(user.userName, 'chi');
		});
	});

	describe('findUserByName', function () {
		it ('Should return user by name', async function () {
			const user = await User.findUserByName(userName = 'chi');
			assert.equal(user._id, 0);
			assert.equal(user.userName, 'chi');
		});
	});

	describe('findUserByEmail', function () {
		it ('Should return user by email', async function () {
			const user = await User.findUserByEmail(email = 'bozo@baka.com');
			assert.equal(user._id, 0);
			assert.equal(user.userName, 'chi');
			assert.equal(user.email, 'bozo@baka.com');
		});
	});

	describe('findUserByMobileNumber', function () {
		it ('Should return user by mobileNumber', async function () {
			const user = await User.findUserByMobileNumber(mobileNumber = '9999988888');
			assert.equal(user._id, 0);
			assert.equal(user.userName, 'chi');
			assert.equal(user.mobileNumber, '9999988888');
		});
	});

	describe('findUsersByRole', function () {
		it ('Should return users by role', async function () {
			const users = await User.findUsersByRole(role = 'manager');
			assert.equal(users.length, 1);
			assert.equal(users[0].role, 'manager');
		});
	});

	describe('changeUserName', function () {
		it ('Should change userName', async function () {
			const user = await User.changeUserName(_id = 0, userName = 'bozo');
			assert.equal(user._id, 0);
			assert.equal(user.userName, 'bozo');
			const usersWithNameBozo = await User.findAllUser({});
			assert.equal(usersWithNameBozo.length, 1);
			assert.equal(usersWithNameBozo[0].userName, 'bozo');
		});
	});

	describe('changeMobileNumber', function () {
		it ('Should change mobileNumber', async function () {
			const user = await User.changeMobileNumber(_id = 0, mobileNumber = '9898989898');
			assert.equal(user._id, 0);
			assert.equal(user.mobileNumber, '9898989898');
			assert.equal(user.isMobileVerified, false);
			const usersWithNewMobileNumber = await User.findAllUser({});
			assert.equal(usersWithNewMobileNumber.length, 1);
			assert.equal(usersWithNewMobileNumber[0].mobileNumber, '9898989898');
			assert.equal(usersWithNewMobileNumber[0].isMobileVerified, false);
		});
	});

	describe('changeEmail', function () {
		it ('Should change email', async function () {
			const user = await User.changeEmail(_id = 0, email = 'chi@baka.com');
			assert.equal(user._id, 0);
			assert.equal(user.email, 'chi@baka.com');
			assert.equal(user.isEmailVerified, false);
			const usersWithNewEmail = await User.findAllUser({});
			assert.equal(usersWithNewEmail.length, 1);
			assert.equal(usersWithNewEmail[0].email, 'chi@baka.com');
			assert.equal(usersWithNewEmail[0].isEmailVerified, false);
		});
	});

	describe('changeRole', function () {
		it ('Should change role', async function () {
			const user = await User.changeRole(_id = 0, role = 'admin');
			assert.equal(user._id, 0);
			assert.equal(user.role, 'admin');
			const usersWithNewRole = await User.findAllUser({});
			assert.equal(usersWithNewRole.length, 1);
			assert.equal(usersWithNewRole[0].role, 'admin');
		});
	});

	describe('changePassword', function () {
		it ('Should change password', async function () {
			const user = await User.changePassword(_id = 0, password = 'password123');
			assert.equal(user._id, 0);
			assert.equal(bcrypt.compareSync(password, user.password), true);
		});
	});

	describe('verifyEmail', function () {
		it ('Should verify email', async function () {
			const user = await User.verifyEmail(_id = 0, email = 'chi@baka.com');
			assert.equal(user._id, 0);
			assert.equal(user.isEmailVerified, true);
		});
	});

	describe('verifyMobile', function () {
		it ('Should verify mobile number', async function () {
			const user = await User.verifyMobile(_id = 0, mobileNumber = '9898989898');
			assert.equal(user._id, 0);
			assert.equal(user.isMobileVerified, true);
		});
	});

});
