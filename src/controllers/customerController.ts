import { Request, Response } from 'express';
import Customer from '../models/customer';
import Book from '../models/books';
import Rental from "../models/rental";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { where } from 'sequelize';

// register a new customer
export const createCustomer = async (req: Request, res: Response) => {    
  try {
    const { username, password} = req.body;
    const hashedPassword = hashSync(password, 10);
    console.log('Username:', username);
    console.log('Hashed Password:', hashedPassword);
    
    const customer = await Customer.create({ username, password:hashedPassword});
    const response = `customer created successfully\n${JSON.stringify({ customer }, null, 2)}`;
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send('Failed to create the customer');
  }
};

// login  customer
export const loginCustomer = async (req: Request, res: Response) => {
    try {
        // const username = req.body.username;        
        const customer = await Customer.findOne({
            where: { username: req.body.username },
          });

        if (!customer) {
            res.status(401).send("Could not find the customer");
            return
        }

        if (compareSync(req.body.password, customer.password)) {
            const payload = {
                username: customer.username,
                id: customer.id,
                sub: customer.id
            };

            const token = jwt.sign(payload, "Random Sting", { expiresIn: "1d" });

            res.status(200).send({
                message: "Logged in successfully",
                token: "Bearer " + token
            });
        } else {
            res.status(401).send("Incorrect password");
        }
    } catch (error){
       res.status(500).send('Failed to create a book');
    }
  };


  //  get all the customers that rented books
  export const getCustomer = async (req: Request, res: Response) => { 
    // const customer = await Customer.findByPk(Rental.customerId);
    const result = await Customer.findAll({
      include: [
        {
          model: Rental,
          include: [
            {
              model:Book,
            }            
        ],
        },
      ],
    });
    console.log(result);
    
    res.status(200).send(result);
  }