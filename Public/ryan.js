function displaySearchResults(data) {
  const searchResultsSelect = document.getElementById('searchResults');
  searchResultsSelect.style.display = 'block';
  searchResultsSelect.innerHTML = '<option value="">Select an option</option>'; // Add a default option

  data.results.forEach(result => {
      const title = result.title || result.name; // Movie title or TV show name
      const releaseYear = result.release_date ? new Date(result.release_date).getFullYear() : '' || result.first_air_date ? new Date(result.first_air_date).getFullYear() : '';
      const overview  = result.overview;

      let option = document.createElement("option");
      option.value = title;
      option.overview = overview;
      option.text = `${title} (${releaseYear})`; 

      searchResultsSelect.appendChild(option);
  });

  searchResultsSelect.addEventListener('change', function() {
      const selectedOption = this.value;
      if (selectedOption) {
        const selectedIndex = this.selectedIndex;
        const selectedResult = searchResults[selectedIndex]; // Adjust index for default option
        const title = selectedResult.label || selectedResult.name;
        const releaseYear = selectedResult.release_date ? new Date(selectedResult.release_date).getFullYear() : '' || selectedResult.first_air_date ? new Date(selectedResult.first_air_date).getFullYear() : '';
        const overview = selectedResult.overview;
        addtoDatabase(title, overview);
      createCard(title, releaseYear, overview);
      this.style.display = 'none';
      this.innerHTML = '';
      document.getElementById('searchInput').value = ''; // Clear search input
      }
  });
}

function addtoDatabase(movieTitle, overview) {
  const movieData = {
    title: movieTitle,
    summary: overview,
    token: null,
  };
  fetch('/api/movies/ryan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movieData)
  })
  .then(response => {
    if (response.ok) {
      console.log('Movie added successfully');
      // Handle success
    } else {
      console.error('Error adding movie:', response.statusText);
      // Handle error
    }
  })
  .catch(error => {
    console.error('Error adding movie:', error);
    // Handle error
  });
}

async function fetchMovies() {
  try {
    const response = await fetch('/api/movies/ryan');
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

// Render movies on the page
async function renderMovies() {
  const moviesContainer = document.getElementById('cardContainer');
  const movies = await fetchMovies();
  movies.forEach(movie => {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "text-center", "bg-warning", "text-dark", "col-sm");
    cardDiv.innerHTML = `
    <div>
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">${movie.year}</p>
      <p class="card-text overview">${movie.summary}</p>
      <button class="delete-button" id="${movie.token}">x</button>
    </div>`;
    moviesContainer.appendChild(cardDiv);
  });
}


function createCard(title, releaseYear, overview) {
  const cardContainer = document.getElementById("cardContainer");

  let cardDiv = document.createElement("div");
  cardDiv.classList.add("card", "text-center", "bg-warning", "text-dark", "col-sm");

  cardDiv.innerHTML = `
    <div>
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${releaseYear}</p>
      <p class="card-text overview">${overview}</p>
      <button class="delete-button">x</button>
    </div>`;

  document.getElementById("cardContainer").appendChild(cardDiv);

  showNotification("New item added: " + title);

}

function debounce(func, wait) {
  let timeout;
  return function() {
      const context = this,
          args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
          func.apply(context, args);
      }, wait);
  };
}

document.getElementById('button-addon2').addEventListener('click', async function(event) {
  event.preventDefault();
  const query = document.getElementById('searchInput').value;
  try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      displaySearchResults(data);
  } catch (error) {
      console.error('Error:', error);
  }
});

function showNotification(message) {
  let notificationBar = document.getElementById("notificationBar");
  notificationBar.innerText = message;
  notificationBar.style.display = "block";


  setTimeout(function() {
      notificationBar.style.display = "none";
  }, 10000);
}

function searchAndAddContent(event) {

  event.preventDefault();

  let searchInput = document.getElementById("searchcontent").value;

  let cardDiv = document.createElement("div");
  cardDiv.classList.add("card", "text-center", "bg-warning", "text-dark", "col-sm");

  cardDiv.innerHTML = `
      <div>
          <h5 class="card-title">${searchInput}</h5>
          <p class="card-text">Additional information...</p>
          <button class="delete-button">x</button>
      </div>`;

  document.getElementById("cardContainer").appendChild(cardDiv);

  showNotification("New item added: " + searchInput);

}

function secretMessage() {
  const secrets = [
      "There's always another secret", 
      "Because I'm Batman", 
      "I will not lie by saying every day will be sunshine. But there will be sunshine again, and that is a very different thing to say. That is truth. I promise you, you will be warm again", 
      "Super Easy, Barely An Inconvenience" ,
      "The only way to do great work is to love what you do",
      "Success is not final, failure is not fatal: It is the courage to continue that counts",
      "Believe you can and you're halfway there",
      "Hardships often prepare ordinary people for an extraordinary destiny",
      "Success is not how high you have climbed, but how you make a positive difference to the world",
      "Keep your face always toward the sunshine—and shadows will fall behind you",
      "You must be the change you wish to see in the world",
      "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle" ,
      "Show me the code" ,
      "Storms may come, but they also pass. Hold on, for brighter days are ahead.",
      "In the midst of adversity, remember that strength grows in the moments when you think you can't go on but you keep going anyway.",
      "Just as the night gives way to dawn, every hardship will eventually give way to a new beginning.",
      "You are not defined by your challenges. You are defined by how you choose to overcome them.",
      "Embrace the storms of life, for they are the moments that shape and strengthen you.",
      "Every setback is a setup for a comeback. Keep pushing forward.",
      "When life knocks you down, remember that the ground is a great place to build a foundation for your next success.",
      "The darkest nights produce the brightest stars. Keep shining."
  ]

  const randomIndex = Math.floor(Math.random() * secrets.length);

  alert(secrets[randomIndex]);
}

async function deleteCardFromDatabase(movieId) {
  try {
    const response = await fetch(`/api/movies/ryan/${movieId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete movie');
    }
    console.log('Movie deleted successfully');
  } catch (error) {
    console.error('Error deleting movie:', error);
  }
}

function deleteCard(cardElement) {
  if (cardElement && cardElement.parentNode) {

    cardElement.parentNode.removeChild(cardElement);
  }
}

document.addEventListener("click", function(event) {
  if (event.target.classList.contains("delete-button")) {
      let cardElement = event.target.closest(".card");
      let movieId = event.target.getAttribute('id');

      // Call the deleteCard function to delete the card
      deleteCard(cardElement);
      deleteCardFromDatabase(movieId);
  }
});

const savedUsername = sessionStorage.getItem('username');

document.querySelectorAll(".yourusername").forEach(element => {
    element.textContent = "Welcome " + savedUsername;
});

window.addEventListener('load', renderMovies);