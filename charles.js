const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

if (username === null) {
  //alert("Please Login")
  //window.location.href = "index.html";
}

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

  saveCardsToLocalStorage();

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

function saveCardsToLocalStorage() {
  let localStorageKey = "savedCards_" + window.location.pathname;

  let cards = document.querySelectorAll(".card");

  let cardContent = [];

  cards.forEach(function(card) {
      let title = card.querySelector(".card-title").innerText;
      let text = card.querySelector(".card-text").innerText;

      cardContent.push({ title: title, text: text });
  });

  localStorage.setItem(localStorageKey, JSON.stringify(cardContent));
}

function displayCardsFromLocalStorage() {
  let localStorageKey = "savedCards_" + window.location.pathname;

  let savedCards = JSON.parse(localStorage.getItem(localStorageKey));

  if (savedCards) {
      savedCards.forEach(function(cardData) {
          let cardDiv = document.createElement("div");
          cardDiv.classList.add("card", "text-center", "bg-warning", "text-dark", "col-sm");
          cardDiv.innerHTML = `
              <div>
                  <h5 class="card-title">${cardData.title}</h5>
                  <p class="card-text">${cardData.text}</p>
                  <button class="delete-button">x</button>
              </div>`;
          document.getElementById("cardContainer").appendChild(cardDiv);
      });
  }
}

function removeCardDataFromLocalStorage(cardElement) {
  let localStorageKey = "savedCards_" + window.location.pathname;

  let cardTitle = cardElement.querySelector(".card-title").innerText;

  let savedCards = JSON.parse(localStorage.getItem(localStorageKey));

  if (savedCards) {
    let cardTitle = cardElement.querySelector(".card-title").innerText;
      // Find the index of the card with the matching title
      let index = savedCards.findIndex(card => card.title === cardTitle);

      if (index !== -1) {
          // Remove the card data from the savedCards array
          savedCards.splice(index, 1);

          localStorage.setItem(localStorageKey, JSON.stringify(savedCards));
      }
  }
}

function deleteCard(cardElement) {
  if (cardElement && cardElement.parentNode) {

    cardElement.parentNode.removeChild(cardElement);

      removeCardDataFromLocalStorage(cardElement);
  }
}

document.addEventListener("click", function(event) {
  if (event.target.classList.contains("delete-button")) {
      let cardElement = event.target.closest(".card");

      // Call the deleteCard function to delete the card
      deleteCard(cardElement);
  }
});

document.querySelector(".yourusername").textContent = "Welcome " + username;

window.addEventListener("load", displayCardsFromLocalStorage);

