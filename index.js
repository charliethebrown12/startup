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

app.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email or username is already registered
    const existingUser = await db.collection('users').findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }

    // Save user to the database
    await db.collection('users').insertOne({ email, username, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint for user sign-in
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate unique session token using UUID
    const authToken = uuid.v4();

    // Save session token in the database
    req.session.sessionId = sessionId;
    res.cookie('sessionId', sessionId, { httpOnly: true });

    res.json({ success: true, authToken });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Placeholder: Protect endpoints with authentication middleware

app.get('/check-auth', (req, res) => {
  // Check if session ID cookie exists
  if (req.cookies.sessionId && req.session.sessionId === req.cookies.sessionId) {
    // User is authenticated
    res.json({ authenticated: true, user: req.session.user });
  } else {
    // User is not authenticated
    res.json({ authenticated: false });
  }
});

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

app.post('/api/movies/charles', async (req, res) => {
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

app.get('/api/movies/charles', async (req, res) => {
  try {
    const collection = db.collection('charles');
    const movies = await collection.find({}).toArray();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies from database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/movies/charles/:id', async (req, res) => {
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

app.post('/api/movies/ryan', async (req, res) => {
  try {
    const movieData = req.body;
    const collection = db.collection('ryan');
    const result = await collection.insertOne(movieData);
    res.status(201).json({ message: 'Movie added successfully', id: result.insertedId });
  } catch (error) {
    console.error('Error adding movie to database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/movies/ryan', async (req, res) => {
  try {
    const collection = db.collection('ryan');
    const movies = await collection.find({}).toArray();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies from database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/movies/ryan/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
    const collection = db.collection('ryan');
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

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'Public' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});