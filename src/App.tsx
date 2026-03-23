import React, { useState } from "react";
import SearchComponent from "./components/SearchComponent"
import ResultsComponent from "./components/ResultsComponent"

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

    return (
        <div>
            <h1>PlacesToStay</h1>
            <SearchComponent
                onResultsLoaded={setResults}
                onMessageUpdated={setMessage}
            />
            {message && <p>{message}</p>}
            <ResultsComponent
                accommodations={results}
                onMessage={setMessage}
            />
        </div>
    );
}