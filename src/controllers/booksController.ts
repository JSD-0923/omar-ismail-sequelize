import { Request, Response } from 'express';
import Book from '../models/books';

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, description, published } = req.body;
    const book = await Book.create({ title, description, published });
    const response = `Book created successfully\n${JSON.stringify({ book }, null, 2)}`;
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send('Failed to create a book');
  }
};

// Get a book by id
export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    res.status(400).send('Invalid book ID');
    return;
  }
  const book = await Book.findByPk(id);

  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
};

// Get all books
export const getAllBooks = async (req: Request, res: Response) => {
  const books = await Book.findAll();
  res.json(books);
};

// Update a book
export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    res.status(400).send('Invalid book ID');
    return;
  }
  const { title, description, published } = req.body;
  const book = await Book.findByPk(id);

  if (book) {
    book.title = title;
    book.description = description;
    book.published = published;
    await book.save();
    const response = `Book updated successfully\n${JSON.stringify({ book }, null, 2)}`;
    res.status(200).send(response);
  } else {
    res.status(404).send('Book not found');
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    res.status(400).send('Invalid book ID');
    return;
  }
  const book = await Book.findByPk(id);

  if (book) {
    const title:string = book.title;
    await book.destroy();
    res.status(200).send('book with id:' + id +  ' and name:' + title + ' deleted successfully');
  } else {
    res.status(404).send('Book not found');
  }
};
