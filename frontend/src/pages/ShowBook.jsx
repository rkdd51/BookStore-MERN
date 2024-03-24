import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShowBook = () => {
  const { id } = useParams();
  const [state, setState] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setState(res);
      })
      .catch((err) => alert("Error from show book page"));
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Book Details</h1>
      <h2>{state?.data?.author}</h2>
      <h2>{state?.data?.publishYear}</h2>
      <h2>{state?.data?.createdAt}</h2>
    </div>
  );
};

export default ShowBook;
