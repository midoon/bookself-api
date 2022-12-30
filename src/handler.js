const { nanoid } = require("nanoid");
const books = require("./books");

const addBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, finished = false, reading } = request.payload;

  const id = nanoid(16);

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    readPage,
    pageCount,
    finished,
    reading,
    id,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

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

const getBookById = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((book) => book.id === bookId)[0];

  if (book !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editBookById = (request, h) => {
  const { bookId } = request.params;

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const updatedAt = new Date().toISOString();

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  } else if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteBookById = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  editBookById,
  deleteBookById,
};
