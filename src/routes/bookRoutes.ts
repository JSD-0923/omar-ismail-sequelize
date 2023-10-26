const express = require('express');
import { Request, Response } from 'express';
import * as booksController from '../controllers/booksController';
const passport = require('passport');
const router = express.Router();


require('../passport');
router.post('/books', booksController.createBook);
router.get('/books/:id', booksController.getBookById);
router.get('/books', booksController.getAllBooks);
router.put('/books/:id', booksController.updateBook);
router.delete('/books/:id', booksController.deleteBook);
router.post('/rent-book', passport.authenticate('jwt', { session: false }), booksController.rentBook);


  


export default router;
