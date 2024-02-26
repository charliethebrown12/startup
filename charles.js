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
      </div>`;

  // Append the card to the container
  document.getElementById("cardContainer").appendChild(cardDiv);
}

// Event listener for the search button click
document.getElementById("button-addon2").addEventListener("click", searchAndAddContent);
