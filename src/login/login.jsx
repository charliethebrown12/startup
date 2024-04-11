import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Login() {
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById("useremail").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("userpassword").value;

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                const authToken = data.authToken;
                localStorage.setItem('authToken', authToken); // Save authToken to localStorage
                alert('Login successful!');
                window.location.href = `/charles.html?username=${encodeURIComponent(username)}`; // Redirect to protected page
            } else {
                const data = await response.json();
                alert(data.message || 'Incorrect Login Information. Please Try Again.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleSignup = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById("useremail").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("userpassword").value;

        try {
            const response = await fetch('/auth/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                alert('Sign up successful! Please log in.');
                window.location.href = `/charles.html?username=${encodeURIComponent(username)}`; // Redirect to login page
            } else {
                const data = await response.json();
                alert(data.message || 'Error signing up. Please try again.');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            alert('An error occurred. Please try again.');
        }
    };
  return (
    <main className='container-fluid bg-secondary text-center'>
              <div className="bd-example body">
            <div>
              <form className="px-4 py-3">
                <div className="mb-3">
                  <label className="form-label text-white">Email address</label>
                  <input id="useremail" type="email" className="form-control" placeholder="email@example.com" />
                </div>
                <div className="mb-3">
                    <label className="form-label text-white">Username</label>
                    <input id="username" type="text" className="form-control" placeholder="Username" />
                  </div>
                <div className="mb-3">
                  <label className="form-label text-white">Password</label>
                  <input id="userpassword" type="password" className="form-control" placeholder="Password" />
                </div>
                <button onClick={handleSubmit} type="button" className="btn btn-outline-warning text-white">Sign In</button>
              </form>
              <div></div>
              <button onClick={handleSignup} type="button" className="btn btn-outline-success text-white">Sign Up</button>
            </div>
          </div>
    </main>
  );
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

async function login() {
    let email = document.getElementById("useremail").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("userpassword").value;
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            window.location.href = `charles.html?username=${encodeURIComponent(username)}`;
            const data = await response.json();
            const authToken = data.authToken;
            // Save authToken to localStorage or session storage
            localStorage.setItem('authToken', authToken);
            alert('Login successful!');
            // Optionally, redirect to protected page
            window.location.href = '/charles.html';
        } else {
            const data = await response.json();
            alert("Incorrect Login Information. Please Try Again.");
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred. Please try again.');
    }
}

async function signup() {
    let email = document.getElementById("useremail").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("userpassword").value;
    try {
        const response = await fetch('/auth/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            alert('Sign up successful! Please log in.');
            window.location.href = `charles.html?username=${encodeURIComponent(username)}`;
        } else {
            const data = await response.json();
            alert(data.message);
        }
    } catch (error) {
        console.error('Error signing up:', error);
        alert('An error occurred. Please try again.');
    }
}