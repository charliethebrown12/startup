const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const dbName = require("./database");

const app = express();
const authCookieName = 'token';

app.use(bodyParser.json());
app.use(express.static("Public"));

const tmdbApiUrl = 'https://api.themoviedb.org/3/search/multi';

app.post('/auth/create', async (req, res) => {
  if (await dbName.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await dbName.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
app.post('/auth/login', async (req, res) => {
  const user = await dbName.getUser(req.body.email);
  if (!user) {
    return res.status(401).send({ msg: 'User not found' });
  }

  const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!passwordMatch) {
    return res.status(401).send({ msg: 'Incorrect password' });
  }

  // Authentication successful, set authentication cookie
  setAuthCookie(res, user.token);
  res.send({ id: user._id });
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

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});