const express = require('express');
import { Request, Response } from 'express';
import * as customersController from '../controllers/customerController';
import Customer from '../models/customer';
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', customersController.createCustomer);
router.post('/login', customersController.loginCustomer);
 require('../passport');
 router.get('/protected', passport.authenticate('jwt', { session: false }), (req:Request, res:Response) => {
    const user = req.user as typeof Customer;
    return res.status(200).send({
        success: true,
        user: {
            id:user.id,
            username: user.username,
        }
    })
})
 router.get('/customer' , customersController.getCustomer);


  
export default router;
