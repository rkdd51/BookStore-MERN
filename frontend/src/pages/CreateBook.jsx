import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
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
      <button className="bg-slate-400 p-2 rounded-md" onClick={handleSaveBook}>
        Save
      </button>
    </div>
  );
};

export default CreateBook;
