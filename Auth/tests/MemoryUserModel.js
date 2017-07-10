const MemoryUserDB = require('./MemoryUserDB');
const bcrypt = require('bcrypt');

const db = new MemoryUserDB();

class MemoryUserModel {
  constructor ({ userName = '', email = '', mobileNumber = '', password = '', role = '', isEmailVerified = false, isMobileVerified = false }) {
    this.userName = userName,
    this.email = email,
    this.mobileNumber = mobileNumber,
    this.password = password,
    this.role = role,
    this.isEmailVerified = isEmailVerified,
    this.isMobileVerified = isMobileVerified
  }
  /*
     assume query is an object with a single key and a value
     eg: query = { _id: 'udchallcndalcndlcadn' } OR query = { userName: 'chichi' } OR query = { email: baka@bozo.com }
  */
  static createUser ({ userName, email, mobileNumber, password, role, isEmailVerified, isMobileVerified }) { // and other fields as arguments
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = { userName, email, mobileNumber, password: hashPassword, role, isEmailVerified, isMobileVerified }; // add other fields, remember to hash the password before adding here
    return Promise.resolve(db.save(user));
  }

  static findOne (query) {
    const key = Object.keys(query)[0];
    let user;
    if (key) {
      user = db.users.find(u => u[key] === query[key]);
    }
    return user;
  }

  /*
    assume same rule for query as above
  */
  static find (query) {
    // similar function as above
    if (query) {
      const key = Object.keys(query)[0];
      let user;
      if (key) {
        user = db.users.filter(u => u[key] === query[key]);  
      }
      return user;
    } else {
      return db.getUsers();
    }
  }

  static findAllUser () {
    return Promise.resolve(db.getUsers());
  }

  static findUserById (_id) {
    return Promise.resolve(this.findOne({ _id }));
  }

  static findUserByName (userName) {
    return Promise.resolve(this.findOne({ userName }));
  }

  static findUserByEmail (email) {
    return Promise.resolve(this.findOne({ email }));
  }

  static findUserByMobileNumber (mobileNumber) {
    return Promise.resolve(this.findOne({ mobileNumber }));
  }

  static findUsersByRole (role) {
    return Promise.resolve(this.find({ role }));
  }

  static changeUserName (_id, userName) {
    const user = this.findOne({ _id });
    user.userName = userName;
    return Promise.resolve(db.save(user));
  }

  static changeMobileNumber (_id, mobileNumber) {
    const user = this.findOne({ _id });
    user.mobileNumber = mobileNumber;
    user.isMobileVerified = false;
    return Promise.resolve(db.save(user));
  }

  static changeEmail (_id, email) {
    const user = this.findOne({ _id });
    user.email = email;
    user.isEmailVerified = false;
    return Promise.resolve(db.save(user));
  }

  static changeRole (_id, role) {
    const user = this.findOne({ _id });
    user.role = role;
    return Promise.resolve(db.save(user));
  }

  static changePassword (_id, password) {
    const user = this.findOne({ _id });
    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
    return Promise.resolve(db.save(user));
  }

  static verifyEmail (_id, isEmailVerified) {
    const user = this.findOne({ _id });
    user.isEmailVerified = true;
    return Promise.resolve(db.save(user));
  }

  static verifyMobile (_id, isMobileVerified) {
    const user = this.findOne({ _id });
    user.isMobileVerified = true;
    return Promise.resolve(db.save(user));
  }

  save () {
    const user = this;
    return db.save(user);
  }
 
}

module.exports = MemoryUserModel;
