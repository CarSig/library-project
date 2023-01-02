// routes/book.routes.js

const router = require('express').Router();

const Book = require('../models/Book.model.js');
const Author = require('../models/Author.model.js');

// GET route to retrieve and display all the books
router.get('/books', (req, res, next) => {
    Book.find().populate('author')
        .then(books => {
            // -> allTheBooksFromDB is a placeholder, it can be any word
            console.log('Retrieved books from DB:', books);

            res.render('books/books-list.hbs', { books });
        })
        .catch(error => {
            console.log('Error while getting the books from the DB: ', error);

            // Call the error-middleware to display the error page to the user
            next(error);
        });
});

// route for book details
router.get('/books/:bookId', (req, res, next) => {
    const { bookId } = req.params;

    Book.findById
        (bookId)
        .populate('author')
        .then(book => {
            console.log('Retrieved book from DB:', book);

            res.render('books/book-details.hbs', { book });
        })
        .catch(error => {
            console.log('Error while getting the book from the DB: ', error);


            next();
        });
});

// update book

router.get('/books/:bookId/edit', (req, res, next) => {
    const { bookId } = req.params;
    Book.findById(bookId).populate('author')
        .then(book => {
            console.log('*************Retrieved book from DB:', book);

            res.render('books/book-edit.hbs', { book });

        })
        .catch(error => {
            console.log('Error while getting the book from the DB: ', error);
            next()
        });
});

router.post('/books/:bookId/edit', (req, res, next) => {
    const { bookId } = req.params;
    const { title, description, rating } = req.body;

    Book.findByIdAndUpdate(bookId, { title, description, rating }).then(book => {
        console.log('Updated book from DB:', book);
        res.redirect('/books');
    })
        .catch(error => {
            console.log('Error while updating the book from the DB: ', error);
            next()
        });
});




module.exports = router;
