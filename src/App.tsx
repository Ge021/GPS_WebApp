import React, { useState, useEffect } from "react";
import SearchComponent from "./components/SearchComponent"
import ResultsComponent from "./components/ResultsComponent"
import MapComponent from "./components/MapComponent";
import LoginComponent from "./components/LoginComponent";

export interface Accommodation {
    ID: number;
    name: string;
    type: string;
    location: string;
    longitude: number;
    latitude: number;
    description: string;
}

export default function App() {
    const [results, setResults] = useState<Accommodation[]>([]);
    const [message, setMessage] = useState<string>("");
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        fetch("/login")
            .then(r => r.json())
            .then(json => setUsername(json.username));
    }, []);

return (
        <div>
            <nav className="navbar">
                <h1>PlacesToStay</h1>
                <LoginComponent username={username} onLoginStatusChange={setUsername} />
            </nav>
            <div className="container">
                <SearchComponent onResultsLoaded={setResults} onMessageUpdated={setMessage} />
                {message && <p className="message">{message}</p>}
                <MapComponent accommodations={results} />
                <ResultsComponent accommodations={results} onMessage={setMessage} />
            </div>
        </div>
    );
}
