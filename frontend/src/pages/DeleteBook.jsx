import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const DeleteBook = () => {
  const { id } = useParams();
  console.log("id: ", id);
  const navigate = useNavigate();
  const handleDelete = () => {
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Data not deleted");
      });
  };
  return (
    <div>
      <h2>
        Are you sure you want to delete this ?
        <button className="bg-red-500 rounded-sm p-3" onClick={handleDelete}>
          Delete Book Data
        </button>
      </h2>
    </div>
  );
};

export default DeleteBook;
