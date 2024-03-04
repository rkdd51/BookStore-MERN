import express, { request, response } from "express"
import { PORT, mongoURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js'
const app = express();

app.get('/', (request,response) => {
    console.log(request);
    return response.status(234).send('Welcome to the Page')
})

//Middleware for parsing request body
app.use(express.json());

//Route to Save a new book - Post Request
app.post('/books', async(request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields title,author and publishYear'
      })

    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear:request.body.publishYear
    }

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (err) {
    console.log(err);
    response.status(500).send({message:err.message})
  }
})

//Route for get all books from database - Get Request
app.get('/books', async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
    
  } catch (err) {
    console.log(err);
    return response.status(500).send({
      message: err.message
    });
  }
})

//Route for get 1 book from database - Get Request by Id
app.get('/books/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const books = await Book.findById(id);
    return response.status(200).json(
       books
    );
    
  } catch (err) {
    console.log(err);
    return response.status(500).send({
      message: err.message
    });
  }
})

//Route for update a book from database - Put Request by Id
app.put('/books/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
      ) {
        return response.status(400).send({
          message: "Send all required fields title,author and publishYear",
        });
      }  
      const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({message:'Book Not Found'})
    }
       return response.status(200).send({message:"Book data updated successfully"});
    
    
  } catch (err) {
    console.log(err);
    return response.status(500).send({
      message: err.message
    });
  }
})

//Route to delete a book from database - delete message 
app.delete('/books/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({
        message:"Book Not Found"
      })
    }
    return response.status(200).send({message:"Book deleted successfully"})
  } catch (err) {
    console.log(err);
    return response.status(500).send({ message: err.message })
  }
})


mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(`App is listing to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });