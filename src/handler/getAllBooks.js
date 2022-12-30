const books = require("../books");

const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name !== undefined) {
    const cariNama = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    const book = cariNama.map((b) => ({ id: b.id, name: b.name, publisher: b.publisher }));
    const response = h.response({
      status: "success",
      data: {
        books: book,
      },
    });
    response.code(200);
    return response;
  } else if (reading !== undefined) {
    const readingStatus = books.filter((book) => Number(book.reading) === Number(reading));
    const book = readingStatus.map((b) => ({ id: b.id, name: b.name, publisher: b.publisher }));
    const response = h.response({
      status: "success",
      data: {
        books: book,
      },
    });
    response.code(200);
    return response;
  } else if (finished !== undefined) {
    const finishedStatus = books.filter((book) => Number(book.finished) === Number(finished));
    const book = finishedStatus.map((b) => ({ id: b.id, name: b.name, publisher: b.publisher }));
    const response = h.response({
      status: "success",
      data: {
        books: book,
      },
    });
    response.code(200);
    return response;
  } else if (books !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "success",
    data: {
      books: [],
    },
  });
  return response;
};

module.exports = getAllBooks;
