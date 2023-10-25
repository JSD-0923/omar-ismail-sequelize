"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var customersController = require("../controllers/customerController");
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();
router.post('/register', customersController.createCustomer);
router.post('/login', customersController.loginCustomer);
require('../passport');
router.get('/protected', passport.authenticate('jwt', { session: false }), function (req, res) {
    var user = req.user;
    return res.status(200).send({
        success: true,
        user: {
            id: user.id,
            username: user.username,
        }
    });
});
router.all('*', function (req, res) {
    res.status(404).send('Invalid endpoint please enter /register if you are new customer \n if you have been registered enter /login');
});
exports.default = router;
