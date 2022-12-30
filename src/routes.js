const addBook = require("./handler/addBook");
const deleteBookById = require("./handler/deleteBookById");
const editBookById = require("./handler/editBookById");
const getAllBooks = require("./handler/getAllBooks");
const getBookById = require("./handler/getBookById");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookById,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookById,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookById,
  },
];

module.exports = routes;
