const express = require("express");
const routes = express.Router();

const product = require('../controllers/product');

routes.get('/',product.viewPage);

routes.get('/product',product.product);

routes.post('/insertproduct',product.insertproduct);

routes.get('/product/:category',product.getByCategory);

module.exports = routes;
