class Users {
	constructor (userModel) {
		this._userModel = userModel;
	}

	get model () {
		return this._userModel;
	}

	createUser ({ userName }) {
		return new Promise((resolve, reject) => {
			this.model.create({ userName }, (err, result) => {
				if (err) reject(err);
				resolve(result);
			});
		});
	}
}

module.exports = Users;
