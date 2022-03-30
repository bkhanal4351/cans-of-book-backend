'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Book = require('./models/book');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;


app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/books', getBooks);
app.post('/books', postBook);
app.delete('/books/:id', deleteBook);
app.put('/books/:id', putBook);

async function getBooks(req, res, next) {
  try {
    // let results = await Book.find({email: req.query.email})
    let queryObject = {};
    if (req.query.email) {
      queryObject.email = req.query.email;
    }
    let results = await Book.find(queryObject);
    res.status(200).send(results);
  } catch(error) {
    next(error)
  }
}

async function postBook(req, res, next) {
try{
  let createdBook = await Book.create(req.body);
  res.status(200).send(createdBook);
} catch(error){
  next(error);
}
}

async function deleteBook(req, res, next){
  let id = req.params.id;
  try {
    await Book.findByIdAndDelete(id);
    res.send('book deleted');
  } catch(error){
    next(error);
  }
}

async function putBook(req, res, next) {
  
  try {
    let id = req.params.id;
    let updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true, overwrite: true});
    res.status(200).send(updatedBook);
  } catch(error) {
    next(error);
  }
}


app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
})

// error
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
