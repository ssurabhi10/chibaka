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
  static findOne (query) {
    const key = Object.keys(query)[0];
    let user;
    if (key) {
      user = db.users.find(u => u[key] === query[key]);
    }
    console.log(user.save);
    return Promise.resolve(user);
  }

  /*
    assume same rule for query as above
  */
  static find (query) {
    // similar function as above
    const key = Object.keys(query)[0];
    let user;
    if (key) {
      user = db.users.filter(u => u[key] === query[key]);  
    }
    return Promise.resolve(user);
  }

  static create ({ userName, email, mobileNumber, password, role, isEmailVerified, isMobileVerified }) { // and other fields as arguments
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = { userName, email, mobileNumber, password: hashPassword, role, isEmailVerified, isMobileVerified }; // add other fields, remember to hash the password before adding here
    db.save(user);
  }

  save () {
    const user = this;
    return db.save(user);
  }
}

module.exports = MemoryUserModel;
