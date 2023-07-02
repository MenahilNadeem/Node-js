const axios = require('axios');

async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`/books/isbn/${isbn}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`/books/author/${encodeURIComponent(author)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function fetchBookByISBN(isbn) {
  try {
    const book = await getBookByISBN(isbn);
    console.log(book);
  } catch (error) {
    console.error(error);
  }
}

async function fetchBooksByAuthor(author) {
  try {
    const books = await getBooksByAuthor(author);
    console.log(books);
  } catch (error) {
    console.error(error);
  }
}

const isbn = '1234567890';
const author = 'John Doe';
fetchBookByISBN(isbn);
fetchBooksByAuthor(author);
const axios = require('axios');

async function getBookByTitle(title) {
  try {
    const response = await axios.get(`/books?title=${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function fetchBookByTitle(title) {
  try {
    const book = await getBookByTitle(title);
    console.log(book);
  } catch (error) {
    console.error(error);
  }
}

const title = 'The Great Gatsby';
fetchBookByTitle(title);
const axios = require('axios');

async function getBooks() {
  try {
    const response = await axios.get('/books');
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function fetchBooks() {
  try {
    const books = await getBooks();
    console.log(books);
  } catch (error) {
    console.error(error);
  }
}

fetchBooks();
