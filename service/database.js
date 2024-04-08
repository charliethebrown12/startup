const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');
const { ObjectId } = require('mongodb');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

async function addMovieCharles(req, res) {
  try {
    const movieData = req.body;
    const collection = db.collection('charles');
    movieData.token = uuid.v4();
    const result = await collection.insertOne(movieData);
    return { message: 'Movie added successfully', id: result.insertedId };
  } catch (error) {
    console.error('Error adding movie to database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function addMovieRyan(req, res) {
  try {
    const movieData = req.body;
    const collection = db.collection('ryan');
    movieData.token = uuid.v4();
    const result = await collection.insertOne(movieData);
    return { message: 'Movie added successfully', id: result.insertedId };
  } catch (error) {
    console.error('Error adding movie to database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function retrieveMovieCharles(req, res, movieId) {
  try {
    const collection = db.collection('charles');
    const movies = await collection.find().toArray();
    return movies;
  } catch (error) {
    console.error('Error fetching movies from database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function retrieveMovieRyan(req, res, movieId) {
  try {
    const collection = db.collection('ryan');
    const movies = await collection.find().toArray();
    return movies;
  } catch (error) {
    console.error('Error fetching movies from database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteMovieCharles(req, res, movieId) {
  try {
    const collection = db.collection('charles');
    const result = await collection.deleteOne({token: movieId});
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Movie deleted successfully' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteMovieRyan(req, res, movieId) {
  try {
    const collection = db.collection('ryan');
    const result = await collection.deleteOne({token: movieId});
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Movie deleted successfully' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  deleteMovieCharles,
  deleteMovieRyan,
  retrieveMovieCharles,
  retrieveMovieRyan,
  addMovieCharles,
  addMovieRyan,
  getUser,
  getUserByToken,
  createUser,
};