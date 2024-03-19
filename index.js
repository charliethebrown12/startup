const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const app = express();

app.use(bodyParser.json());
app.use(express.static("Public"));

const tmdbApiUrl = 'https://api.themoviedb.org/3/search/multi';

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/`;
const client = new MongoClient(url);
const dbName = 'startup';

app.get('/api/search', async (req, res) => {
const query = req.query.query;
const apiUrl = `${tmdbApiUrl}?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(query)}`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNmI3NTBhMzNlZGIxYzk4YTMyY2QwN2MzZjBiY2VlYSIsInN1YiI6IjY1ZTRhYmE2OWVlMGVmMDE2MjZmOTlhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YHuoKQKx58uyOuKVm6HQqtkwnDpdveBskk2GG2M9KwU'
  }
}

  try {
    const response = await fetch(apiUrl, options);
    const responseData = await response.json();
    res.json(responseData);
} catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}

});

(async function connectToDB() {
  try {
    const client = new MongoClient(url);
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();

app.post('/api/movies', async (req, res) => {
  try {
    const movieData = req.body;
    const collection = db.collection('charles');
    const result = await collection.insertOne(movieData);
    res.status(201).json({ message: 'Movie added successfully', id: result.insertedId });
  } catch (error) {
    console.error('Error adding movie to database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/movies', async (req, res) => {
  try {
    const collection = db.collection('charles');
    const movies = await collection.find({}).toArray();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies from database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/movies/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
    const collection = db.collection('charles');
    const result = await collection.deleteOne({ title: movieId });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Movie deleted successfully' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


const users = [
  { id: 1, email: 'cab03@gmail.com', username: 'butler', password: '1234' },
  { id: 2, email: 'ashley@gmail.com', username: 'ashley', password: 'cheese' }
];

app.post('/login', (req, res) => {
  const { email, username, password } = req.body;

  // Placeholder: Simulate user authentication
  const user = users.find(u => (u.email === email || u.username === username) && u.password === password);

  if (user) {
      // Placeholder: Generate and return authentication token (JWT token)
      const authToken = generateAuthToken(user);
      res.json({ success: true, authToken });
  } else {
      res.status(401).json({ success: false, message: 'Invalid email/username or password' });
  }
});

function generateAuthToken(user) {
  // This is just a placeholder, replace it with your actual token generation logic
  return 'placeholder-auth-token';
}

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'Public' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});