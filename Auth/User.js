const bcrypt = require('bcrypt');

class User {
	constructor (userModel) {
		this._userModel = userModel;
	}

	get model () {
		return this._userModel;
	}

	async createUser ({ userName, mobileNumber, email, password, role, isEmailVerified, isMobileVerified }) {
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
        const newUser = await new this.model({ userName, mobileNumber, email, password: hashedPassword, 
            role, isEmailVerified: false, isMobileVerified: false });
        return await newUser.save();
	}

	async findAllUser () {
        return await this.model.find();
	}

	async findUserById (_id) {
		const user = await this.model.findOne({ _id });
		if (user) return user;
        return new Error('Invalid id');
	}

	async findUserByName (userName) {
    	const user = await this.model.findOne({ userName });
    	if (user) return user;
        return new Error('Invalid name');
    }

    async findUserByEmail (email) {
        const user = await this.model.findOne({ email });
        if (user) return user;
        return new Error('Invalid email');
    }

    async findUserByMobileNumber (mobileNumber){
		const user = await this.model.findOne({ mobileNumber });
		if (user) return user;
        return new Error('Invalid mobile number');
    }

    async findUsersByRole (role){
    	return await this.model.find({ role });
    }
  
    async changeUserName (_id, userName){
    	const user = await this.model.findOne({ _id })
    	if (user) {
        	user.userName = userName
        	return await user.save();
        } else return new Error('Invalid user');
    }

    async changeMobileNumber (_id, mobileNumber){
		const user = await this.model.findOne({ _id })
		if (user) {
			user.mobileNumber = mobileNumber;
			user.isMobileVerified = false;
			return await user.save();
	    } else return new Error('Invalid user');
    }

    async changeEmail (_id, email) {
		const user = await this.model.findOne({ _id })
    	if (user) {
			user.email = email;
			user.isEmailVerified = false;
			return await user.save();
    	} else return new Error('Invalid user');
    }

    async changeRole (_id, role) {
		const user = await this.model.findOne({ _id })
    	if (user) {
    		user.role = role
    		return await user.save();
    	} else return new Error('Invalid user');
    }

    async changePassword (_id, password) {
		const user = await this.model.findOne({ _id })
		if (user) {
            user.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
            return await user.save();
        } else return new Error('Invalid user');
    }

    async verifyEmail (_id, email) {
		const user = await this.model.findOne({ _id })
		if (user) {
			if (user.email === email) {
                user.isEmailVerified = true;
                return await user.save();
            }
        } else return new Error('Invalid user');
    }

    async verifyMobile(_id, mobileNumber){
		const user = await this.model.findOne({ _id })
		if (user) {
	        if (user.mobileNumber === mobileNumber) {
                user.isMobileVerified = true;
                return await user.save();
            }
        } else return new Error('Invalid user');
    }

}

module.exports = User;
