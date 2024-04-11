import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


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
    <main>
    <div className="bd-example body">
        <div>
            <div className="px-4 py-3">
                <div className="mb-3">
                    <label className="form-label text-white">Email address</label>
                    <input id="useremail" type="email" className="form-control" placeholder="email@example.com" required />
                </div>
                <div className="mb-3">
                    <label className="form-label text-white">Username</label>
                    <input id="username" type="text" className="form-control" placeholder="Username" required />
                </div>
                <div className="mb-3">
                    <label className="form-label text-white">Password</label>
                    <input id="userpassword" type="password" className="form-control" placeholder="Password" required />
                </div>
                <Button variant="btn btn-outline-warning text-white" onClick={login}> Sign In </Button>
            </div>
            <div></div>
            <Button variant="btn btn-outline-success text-white" onClick={signup}> Sign Up </Button>
        </div>
    </div>
</main>
);
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