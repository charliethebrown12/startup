const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const url = 'https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNmI3NTBhMzNlZGIxYzk4YTMyY2QwN2MzZjBiY2VlYSIsInN1YiI6IjY1ZTRhYmE2OWVlMGVmMDE2MjZmOTlhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YHuoKQKx58uyOuKVm6HQqtkwnDpdveBskk2GG2M9KwU'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});