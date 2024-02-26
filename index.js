function saveLoginInfo(event) {

    event.preventDefault(); // Prevent form submission

    let email = document.getElementById("useremail").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("userpassword").value;

    if (email === '' || username === '' || password === '') {
        // Show error alert
        alert("Please fill in all fields.");
    } else {
        // Continue with saving login information
        // You can add your logic here to save the login information
        window.location.href = "charles.html?username=" + encodeURIComponent(username);
    }
}

function secretMessage() {
    const secrets = [
        "There's always another secret", 
        "Because I'm Batman", 
        "I will not lie by saying every day will be sunshine. But there will be sunshine again, and that is a very different thing to say. That is truth. I promise you, you will be warm again", 
        "Super Easy, Barely An Inconvenience"
    ]

    const randomIndex = Math.floor(Math.random() * secrets.length);

    // Access the message at the random index and display it in an alert
    alert(secrets[randomIndex]);
}

// Event listeners for sign-in and sign-up buttons
document.querySelector("form").addEventListener("submit", saveLoginInfo);
