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

// Event listeners for sign-in and sign-up buttons
document.querySelector("form").addEventListener("submit", saveLoginInfo);
