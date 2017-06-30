const bcrypt = require('bcrypt');

class User {
	constructor (userModel) {
		this._userModel = userModel;
	}

	get model () {
		return this._userModel;
	}

	createUser ({ userName, mobileNumber, email, password, role, isEmailVerified, isMobileVerified }) {
		return new Promise((resolve, reject) => {
			const saltRounds = 10;
			bcrypt.hash(password, saltRounds)
			.then(hash => {
   			 	return Promise.resolve(hash); 
			})
			.then(hashedPassword => {
				this.model.create({ userName, mobileNumber, email, password: hashedPassword, role, isEmailVerified: false, isMobileVerified: false }, (err, result) => {
					if (err) reject(err);
					resolve(result);
				});
			});
		});
	}
}

module.exports = User;
