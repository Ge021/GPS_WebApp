import React, { ChangeEvent, useState } from "react";

interface LoginComponentProps {
    username: string | null;
    onLoginStatusChange: (username: string | null) => void;
}

export default function LoginComponent({ username, onLoginStatusChange }: LoginComponentProps) {
    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [message, setMessage] = useState("");

    async function login() {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: enteredUsername, password: enteredPassword })
        });
        const json = await response.json();
        if (response.ok) {
            onLoginStatusChange(json.username);
        } else {
            setMessage("Incorrect username or password. Please try again.");
        }
    }

    async function logout() {
        await fetch("/logout", { method: "POST" });
        onLoginStatusChange(null);
    }

    if (username) {
        return (
            <div>
                <p>Logged in as {username}</p>
                <button onClick={logout}>Logout</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={enteredUsername} onChange={(e: ChangeEvent<HTMLInputElement>) => setEnteredUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={enteredPassword} onChange={(e: ChangeEvent<HTMLInputElement>) => setEnteredPassword(e.target.value)} />
            <button onClick={login}>Login</button>
            {message && <p>{message}</p>}
        </div>
    );
}
