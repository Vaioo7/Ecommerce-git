const express = require("express");
const routes = express.Router();
const { authorizeRoles, isAuthenticatedUser } = require("../src/middleware/auth");

const adminController = require('../controllers/adminController');

routes.get('/home',isAuthenticatedUser,authorizeRoles("admin"),adminController.home);

routes.get('/create_product',isAuthenticatedUser,authorizeRoles("admin"),adminController.createproductpage);

routes.post('/createproduct',isAuthenticatedUser,authorizeRoles("admin"),adminController.createproduct);

routes.get('/All_product',isAuthenticatedUser,authorizeRoles("admin"),adminController.allproduct);

routes.get('/Edit_product/:id',isAuthenticatedUser,authorizeRoles("admin"),adminController.editproduct);

routes.post('/Shipping',isAuthenticatedUser,authorizeRoles("admin"),adminController.Shipping);

routes.get('/Edit_product_delivered/:id',isAuthenticatedUser,authorizeRoles("admin"),adminController.editproductDelivered);

routes.post('/Delivered',isAuthenticatedUser,authorizeRoles("admin"),adminController.Delivered);

module.exports = routes;
