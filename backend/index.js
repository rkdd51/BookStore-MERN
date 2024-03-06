import express, { request, response } from "express"
import { PORT, mongoURL } from "./config.js";
import mongoose from 'mongoose';
import bookRoute from './models/bookModel.js';
import cors from 'cors';

const app = express();

//Middleware for CORS policy
app.use(cors());

//Middleware for parsing request body
app.use(express.json());

app.use('/books',bookRoute)


app.get('/', (request,response) => {
    console.log(request);
    return response.status(234).send('Welcome to the Page')
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