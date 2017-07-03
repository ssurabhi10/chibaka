const express = require('express');
const app = express();
const User = require('./Auth/user.model.js');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dbConnect = require('./index.js');
//const morgan = require('morgan');

dbConnect();

app.use(bodyParser.json());

app.get('/health-check', function (req, res) {
  res.send('OK!')
});

app.post('/user', (req, res, next) => {
	if (req.body) {
		User.createUser(req.body)
		.then(result => res.json(result))
		.catch(err => next(err))
	} else {
		res.json('not found!');
	}
});

app.get('/user', (req, res, next) => {
	User.findAllUser()
	.then(result => res.json(result))
	.catch(err => next(err))
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
