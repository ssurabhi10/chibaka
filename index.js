const mongoose = require('mongoose');

Promise = require('bluebird');

mongoose.Promise = Promise;

const reconnectTimeout = 5000; // ms.

//connect to mongo db
function connect() {
	mongoose.connect('localhost:27017/chibaka-db', { auto_reconnect: true, server: { socketOptions: { keepAlive: 1 } } })
		.catch(() => {});
}

const db = mongoose.connection;

db.on('connecting', () => {
	console.info('Conecting to MongoDB...');
});

db.on('error', (error) => {
	console.error(`MongoDB connection error: ${error}`);
	mongoose.disconnect();
});

db.on('connected', () => {
	console.info('connected to MongoDB!');
}); 

db.once('open', () => {
  console.info('MongoDB connection opened!');
});

db.on('reconnected', () => {
  console.info('MongoDB reconnected!');
});

db.on('disconnected', () => {
  console.error(`MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`);
  setTimeout(() => connect(), reconnectTimeout);
});

//connect();

module.exports = connect;