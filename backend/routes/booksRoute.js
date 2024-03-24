import express, { Route } from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();
//Route to Save a new book - Post Request
router.post("/", async (request, response) => {
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
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (err) {
    console.log(err);
    response.status(500).send({ message: err.message });
  }
});

//Route for get all books from database - Get Request
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err);
    return response.status(500).send({
      message: err.message,
    });
  }
});

//Route for get 1 book from database - Get Request by Id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const books = await Book.findById(id);
    return response.status(200).json(books);
  } catch (err) {
    console.log(err);
    return response.status(500).send({
      message: err.message,
    });
  }
});

//Route for update a book from database - Put Request by Id
router.put("/:id", async (request, response) => {
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
      return response.status(404).json({ message: "Book Not Found" });
    }
    return response
      .status(200)
      .send({ message: "Book data updated successfully" });
  } catch (err) {
    console.log(err);
    return response.status(500).send({
      message: err.message,
    });
  }
});

//Route to delete a book from database - delete message
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({
        message: "Book Not Found",
      });
    }
    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (err) {
    console.log(err);
    return response.status(500).send({ message: err.message });
  }
});

export default router;
