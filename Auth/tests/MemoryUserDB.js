class MemoryUserDB {
  constructor () {
    this.users = [];
    this.lastId = 0;
  }
  save (user) {
    if (user.hasOwnProperty('_id')) {
      const idx = this.users.findIndex(u => u._id === user._id);
      this.users[idx] = user;
      return user;
    } else {
      user._id = this.lastId;
      this.lastId ++;
      this.users.push(user);
      return user;
    }
  }

  getUsers () {
    return this.users;
  }
}

module.exports = MemoryUserDB;
