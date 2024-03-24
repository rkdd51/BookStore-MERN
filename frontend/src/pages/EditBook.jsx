import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setTitle(response?.data?.title);
        setAuthor(response?.data?.author);
        setPublishYear(response?.data?.publishYear);
      })
      .catch((data) => {
        console.log(data);
        alert("Data not edited");
      });
  }, []);
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        console.log("data: ", data);
        navigate("/");
      })
      .catch(() => alert("Data could not be sent."));
  };

  return (
    <div className="flex justify-center flex-col w-max items-center p-4 border border-red-300 m-4 gap-2">
      <input
        className="border border-black p-2"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border border-black p-2"
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        className="border border-black p-2"
        type="text"
        placeholder="Publish Year"
        value={publishYear}
        onChange={(e) => setPublishYear(e.target.value)}
      />
      <button className="bg-slate-400 p-2 rounded-md" onClick={handleEditBook}>
        Save
      </button>
    </div>
  );
};

export default EditBook;
