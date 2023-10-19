const express = require('express');
import { Request, Response } from 'express';
import * as booksController from '../controllers/booksController';

const router = express.Router();

router.post('/books', booksController.createBook);
router.get('/books/:id', booksController.getBookById);
router.get('/books', booksController.getAllBooks);
router.put('/books/:id', booksController.updateBook);
router.delete('/books/:id', booksController.deleteBook);
router.all('*', (req: Request, res: Response) => {
    res.status(404).send('Invalid endpoint please enter books or books/id');
  });

export default router;