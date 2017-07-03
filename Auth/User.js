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
				const newUser = new this.model({ userName, mobileNumber, email, password: hashedPassword, role, isEmailVerified: false, isMobileVerified: false });
				return Promise.resolve(newUser);
			})
			.then(newUser => {
				if (newUser) resolve (newUser.save());
				reject(null);	
			})
		});
	}

	findAllUser () {
		return new Promise((resolve, reject) => {
			const users = this.model.find({});
			resolve (users);
		});
	}

	findUserById (_id) {
		return new Promise((resolve, reject) => {
			const user = this.model.findOne({ _id });
			if (user) resolve (user);
			reject(null);
		});
	}

	findUserByName (userName) {
        return new Promise((resolve, reject) => {
        	const user = this.model.findOne({ userName });
        	if (user) resolve(user);
        	reject(null);
        });
    }

    findUserByEmail (email) {
        return new Promise((resolve, reject) => {
            const user = this.model.findone({ email });
            if (user) resolve(user);
            reject(null);
        });
    }

    findUserByMobileNumber (mobileNumber){
    	return new Promise((resolve, reject) => {
    		const user = this.model.findOne({ mobileNumber });
    		if (user) resolve(user);
    		reject(null);
    	});
    }

    findUsersByRole (role){
    	return new Promise((resolve, reject) => {
    		const user = this.model.find({ role });
    		if (user) resolve(user);
    		reject(null);
    	});
    }
  
     changeUserName (_id, userName){
        return new Promise((resolve, reject) => {
        	const user = this.model.findOne({ _id })
        	if (user) {
	        	user.userName = userName
	        	resolve (user.save());
            } else {
            	reject(null);
            }
        });        
    }

    changeMobileNumber (_id, mobileNumber){
    	return new Promise((resolve, reject) => {
    		const user = this.model.findOne({ _id })
    		if (user) {
    			user.mobileNumber = mobileNumber;
    			user.isMobileVerified = false;
    			resolve (user.save());
    	    } else {
    	    	reject(null);
    	    }
    	});  	
    }

    changeEmail (_id, email) {
    	return new Promise((resolve, reject) => {
    		const user = this.model.findOne({ _id })
	    	if (user) {
	    			user.email = email;
	    			user.isEmailVerified = false;
	    			resolve (user.save());
	    	    } else {
		    	reject(null);
		    }
		});   

    }

    changeRole (_id, role) {
    	return new Promise((resolve, reject) => {
    		const user = this.model.findOne({ _id })
	    	if (user) {
	    			user.role = role
	    			resolve (user.save());
	    	    } else {
		    	reject(null);
		    }
	    });
    }

    changePassword (_id, password) {
    	return new Promise((resolve, reject) => {
    		const user = this.model.findOne({ _id })
    		const saltRounds = 10;
			bcrypt.hash(password, saltRounds)
			.then(hash => {
			 	return Promise.resolve(hash); 
			})	      
	        .then(hashedPassword => {
	    		user.password = hashedPassword;
	    		resolve (user.save());
	        });
    	});
    }

    verifyEmail (_id, email) {
    	return new Promise((resolve, reject) => {
    		const user = this.model.findOne({ _id })
    		if(user){
    			if (user.email === email) {
             user.isEmailVerified = true;
             resolve(user.save());
          } else {
             reject(null);
          }
    	  } else {
    			reject(null);
    		}
    	});
    }

    verifyMobile(_id, mobileNumber){
    	return new Promise((resolve, reject) => {
    		const user = this.model.findOne({ _id })
    		if  ( user) {
    			if (user.mobileNumber === mobileNumber) {
             user.isMobileVerified = true;
             resolve(user.save());
           } else {
               reject(null);
           }
    		} else {
    			reject(null);
    		}
    	});
    }
}

module.exports = User;
