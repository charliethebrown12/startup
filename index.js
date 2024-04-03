const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const dbName = require("./database");
const config = require('./dbConfig.json');
const { peerProxy } = require('./peerProxy.js');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 5000;

app.use(bodyParser.json());
app.use(express.static("Public"));

const authCookieName = 'token';

const tmdbApiUrl = 'https://api.themoviedb.org/3/search/multi';

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

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
    Authorization: config.bearer
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
  const msg = await dbName.addMovieCharles(req, res);
  res.send(msg);
});

app.get('/api/movies/charles', async (req, res) => {
  movies = await dbName.retrieveMovieCharles(req, res);
  res.send(movies);
});

app.delete('/api/movies/charles/:id', async (req, res) => {
  const movieId = req.params.id;
  dbName.deleteMovieCharles(req, res, movieId);
});

app.post('/api/movies/ryan', async (req, res) => {
  const msg = await dbName.addMovieRyan(req, res);
  res.send(msg);
});

app.get('/api/movies/ryan', async (req, res) => {
  movies = await dbName.retrieveMovieRyan(req, res);
  res.send(movies);
});

app.delete('/api/movies/ryan/:id', async (req, res) => {
  const movieId = req.params.id;
  dbName.deleteMovieRyan(req, res, movieId);
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'Public' });
});

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);