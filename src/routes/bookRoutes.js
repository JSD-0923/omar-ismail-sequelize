"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var booksController = require("../controllers/booksController");
var passport = require('passport');
var router = express.Router();
require('../passport');
router.post('/books', booksController.createBook);
router.get('/books/:id', booksController.getBookById);
router.get('/books', booksController.getAllBooks);
router.put('/books/:id', booksController.updateBook);
router.delete('/books/:id', booksController.deleteBook);
router.post('/rent-book', passport.authenticate('jwt', { session: false }), booksController.rentBook);
router.all('*', function (req, res) {
    res.status(404).send('Invalid endpoint please enter books or books/id');
});
exports.default = router;
