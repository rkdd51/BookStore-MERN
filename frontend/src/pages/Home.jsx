import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Home = () => {
  const [state, setState] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        console.log("response: ", response);
        setState(response);
      })
      .catch((error) => {
        alert("Data not found");
        console.log(error);
      });
  }, []);
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Operations</th>
            <Link className="p-4" to={"/books/create"}>
              ADD BOOK
            </Link>
          </tr>
          {state?.data?.data?.map((value) => (
            <tr key={value.id}>
              <td className="p-4">{value?.title}</td>
              <td className="p-4">
                <Link className="p-4" to={`/books/details/${value._id}`}>
                  Details
                </Link>
                <Link className="p-4" to={`/books/edit/${value._id}`}>
                  Update
                </Link>
                <Link className="p-4" to={`/books/delete/${value._id}`}>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
