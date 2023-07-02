const express = require('express');
const app = express();

// Define the route for getting the list of books
app.get('/', function (req, res) {
  // Assuming you have an array of books called "books"
  const books = [
    { title: 'Book 1', author: 'Author 1' },
    { title: 'Book 2', author: 'Author 2' },
    { title: 'Book 3', author: 'Author 3' },
  ];

  // Return the list of books as JSON
  res.json(books);
});
app.get('/isbn/:isbn', function (req, res) {
    // Retrieve the ISBN from request parameters
    const isbn = req.params.isbn;
  
    // Find the book with the matching ISBN
    const book = books.find((book) => book.isbn === isbn);
  
    if (book) {
      // If the book is found, return its details as JSON
      res.json(book);
    } else {
      // If no book is found, return an error message
      res.status(404).json({ error: 'Book not found' });
    }
  });

  const books = [
    { isbn: '1234567890', title: 'Book 1', author: 'Author 1' },
    { isbn: '0987654321', title: 'Book 2', author: 'Author 2' },
    { isbn: '2468135790', title: 'Book 3', author: 'Author 1' },
  ];
  
  // Define the route for getting book details based on the author
  app.get('/author/:author', function (req, res) {
    // Retrieve the author from request parameters
    const author = req.params.author;
  
    // Find the books with the matching author
    const matchedBooks = books.filter((book) => book.author === author);
  
    if (matchedBooks.length > 0) {
      // If books are found, return their details as JSON
      res.json(matchedBooks);
    } else {
      // If no books are found, return an error message
      res.status(404).json({ error: 'No books found by this author' });
    }
  });

  const books = [
    { isbn: '1234567890', title: 'Book 1', author: 'Author 1' },
    { isbn: '0987654321', title: 'Book 2', author: 'Author 2' },
    { isbn: '2468135790', title: 'Book 3', author: 'Author 1' },
  ];
  
  // Define the route for getting book details based on the title
  app.get('/title/:title', function (req, res) {
    // Retrieve the title from request parameters
    const title = req.params.title;
  
    // Find the book with the matching title
    const book = books.find((book) => book.title === title);
  
    if (book) {
      // If the book is found, return its details as JSON
      res.json(book);
    } else {
      // If no book is found, return an error message
      res.status(404).json({ error: 'Book not found' });
    }
  });
  const books = [
    {
      isbn: '1234567890',
      title: 'Book 1',
      author: 'Author 1',
      reviews: ['Great book!', 'Loved the characters'],
    },
    {
      isbn: '0987654321',
      title: 'Book 2',
      author: 'Author 2',
      reviews: ['Excellent read', 'Highly recommended'],
    },
    {
      isbn: '2468135790',
      title: 'Book 3',
      author: 'Author 1',
      reviews: ['Couldn\'t put it down', 'Amazing plot'],
    },
  ];
  app.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books.find((book) => book.isbn === isbn);
  
    if (book) {
      res.json(book.reviews);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  });
  const users = [];
  app.post('/register', function (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json
      ({ error: 'Username and password are required' });
    }
    if (users.find((user) => user.username === username)) {
      return res.status(400).json
      ({ error: 'Username already exists' });
    }
    const newUser = { username, password };
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully' });
  });
  

  const users = [];

  const secretKey = 'your_secret_key';
  
  app.post('/login', function (req, res) {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    const user = users.find((user) => user.username === username && user.password === password);
  
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  
    const token = jwt.sign({ username: user.username }, secretKey);
  
    res.status(200).json({ token });
  });

  app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
  }));
  
  const bookReviews = [];
  
  app.post('/review/:isbn', function (req, res) {
    const { review } = req.query;
    const { isbn } = req.params;
    const { username } = req.session;
  
    if (!review || !isbn) {
      return res.status(400).json({ error: 'Review and ISBN are required' });
    }
  
    const existingReviewIndex = bookReviews.findIndex(
      (r) => r.isbn === isbn && r.username === username
    );
  
    if (existingReviewIndex !== -1) {
      bookReviews[existingReviewIndex].review = review;
    } else {
      bookReviews.push({ isbn, username, review });
    }
  
    res.status(200).json({ message: 'Review added/modified successfully' });
  });
  const bookReviews = [];

app.delete('/auth/review/:isbn', (req, res) => {
  const { isbn } = req.params;
  const { username } = req.session;

  const matchingReviews = bookReviews.filter(
    (review) => review.isbn === isbn && review.username === username
  );

  if (matchingReviews.length === 0) {
    return res.status(404).json({ error: 'Review not found' });
  }

  matchingReviews.forEach((review) => {
    const index = bookReviews.indexOf(review);
    if (index > -1) {
      bookReviews.splice(index, 1);
    }
  });

  res.status(200).json({ message: 'Review deleted successfully' });
});

app.listen(3000, function () {
  console.log('Server is running on port 3000');
});
// Start the server
app.listen(3000, function () {
  console.log('Server is running on port 3000');
});
