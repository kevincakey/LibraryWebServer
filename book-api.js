const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

let books = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/book", (req, res) => {
  const book = req.body;
  console.log(book);
  books.push(book);

  res.send("Book is added to the database");
});

app.listen(port, () => console.log("Hello world app listening on port"));

//loop through books to find the right book, send as response that book
app.get("/book/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  for (let i = 0; i < books.length; i++) {
    if (books[i].isbn === isbn) {
      res.json(book);
    }
  }
});


app.post("/book/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const newBook = req.body;

  for (let i = 0; i < books.length; i++) {
    let book = books[i];

    if (book.isbn === isbn) {
      books[i] = newBook;
    }
  }
  res.send("Book is edited");
});



app.delete("/book/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let bookIndex;
  
  for (let i = 0; i < books.length; i++) {
    let book = books[i];

    if (book.isbn === isbn) {
      bookIndex = i;
    }
  }
 
  if (bookIndex >= 0) {
    // Remove book from books
    books.splice(bookIndex, 1);
    res.status(200).send('Book deleted');
  }
  else {
    res.status(404).send('Book not found');
  }
});


app.get("/books", (req, res) => {
  res.json(books);
});