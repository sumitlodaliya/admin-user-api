const express = require('express');

const routes = express.Router();

console.log("index routes start");

routes.use('/admin',require('./admin'));

module.exports = routes;