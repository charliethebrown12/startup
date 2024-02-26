const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

if (username === null) {
  //alert("Please Login")
  //window.location.href = "index.html";
}
document.querySelector(".yourusername").textContent = "Welcome " + username;

function showNotification(message) {
  let notificationBar = document.getElementById("notificationBar");
  notificationBar.innerText = message;
  notificationBar.style.display = "block";

  // Hide the notification after 10 seconds
  setTimeout(function() {
      notificationBar.style.display = "none";
  }, 10000); // 10 seconds
}

// Function to create and add a card based on search input
function searchAndAddContent(event) {

  event.preventDefault();

  let searchInput = document.getElementById("searchcontent").value;

  // Create a new div element with Bootstrap card classes
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("card", "text-center", "bg-warning", "text-dark", "col-sm");

  // Set card content based on search input
  cardDiv.innerHTML = `
      <div>
          <h5 class="card-title">${searchInput}</h5>
          <p class="card-text">Additional information...</p>
          <button class="delete-button">x</button>
      </div>`;

  // Append the card to the container
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

  // Access the message at the random index and display it in an alert
  alert(secrets[randomIndex]);
}

function saveCardsToLocalStorage() {
  // Get all card elements
  let cards = document.querySelectorAll(".card");

  // Initialize an array to store card content
  let cardContent = [];

  // Loop through each card element and extract its content
  cards.forEach(function(card) {
      let title = card.querySelector(".card-title").innerText;
      let text = card.querySelector(".card-text").innerText;

      // Push the card content into the array
      cardContent.push({ title: title, text: text });
  });

  // Store the card content array in localStorage
  localStorage.setItem("savedCards", JSON.stringify(cardContent));
}

// Function to retrieve cards from localStorage and display them on the page
function displayCardsFromLocalStorage() {
  // Retrieve the card content array from localStorage
  let savedCards = JSON.parse(localStorage.getItem("savedCards"));

  if (savedCards) {
      // Loop through the saved cards and create card elements on the page
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

function deleteCard(cardElement) {
  // Check if the card element exists
  if (cardElement && cardElement.parentNode) {
      // Remove the card element from its parent node
      cardElement.parentNode.removeChild(cardElement);
  }
}

// Attach event listeners to all delete buttons
// Attach event listener to a parent element that exists when the page loads
document.addEventListener("click", function(event) {
  if (event.target.classList.contains("delete-button")) {
      // Get the card element associated with the delete button
      let cardElement = event.target.closest(".card");

      // Call the deleteCard function to delete the card
      deleteCard(cardElement);
  }
});

// Call the function to display saved cards when the page loads
window.addEventListener("load", displayCardsFromLocalStorage);

// Event listener for the search button click
