import React from "react";
import ReactDOM from "react-dom/client";
import CreateBook from "./pages/CreateBook.jsx";
import DeleteBook from "./pages/DeleteBook.jsx";
import Home from "./pages/Home.jsx";
import EditBook from "./pages/EditBook.jsx";
import ShowBook from "./pages/ShowBook.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/books/create/",
    element: <CreateBook />,
  },
  {
    path: "/books/details/:id",
    element: <ShowBook />,
  },
  {
    path: "/books/edit/:id",
    element: <EditBook />,
  },
  {
    path: "/books/delete/:id",
    element: <DeleteBook />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
