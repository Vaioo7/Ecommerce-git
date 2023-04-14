const express = require("express");
const routes = express.Router();

const order = require('../controllers/order');
const { isAuthenticatedUser } = require("../src/middleware/auth");


routes.get('/addproduct/:id',isAuthenticatedUser,order.addproduct);

routes.post('/Addtocart',isAuthenticatedUser,order.addtocart);

routes.get("/shopingcart",isAuthenticatedUser,order.vieworder);

routes.get('/address/:id',order.address);

routes.post('/addresspost',order.addresspost);

routes.get('/deleteRecord/:id',order.deleteRecord);

module.exports = routes;