import React, { ChangeEvent, useState } from "react";
import { Accommodation } from "../App";

interface SearchComponentProps {
    onResultsLoaded: (results: Accommodation[]) => void;
    onMessageUpdated: (message: string) => void;
}

export default function SearchComponent({
    onResultsLoaded,
    onMessageUpdated,
}: SearchComponentProps) {
    const [location, setLocation] = useState("");

    function locationChanged(e: ChangeEvent<HTMLInputElement>) {
        setLocation(e.target.value);
    }

    async function searchAccommodation() {
        if (location.trim() === "") {
            onMessageUpdated("Please enter a location.");
            onResultsLoaded([]);
            return;
        }
        try {
            const response = await fetch(`/accommodation/location/${location}`);
            const json = await response.json();
            if (json.length === 0) {
                onMessageUpdated("No accommodation found for that location.");
            } else {
                onMessageUpdated("");
            }
            onResultsLoaded(json);
        } catch {
            onMessageUpdated("A network error occurred.");
        }
    }

    return (
        <div>
            <h2>Search Accommodation by Location</h2>
            <div>
                <input
                    type="text"
                    value={location}
                    onChange={locationChanged}
                    placeholder="Enter location"
                />
                <input
                    type="button"
                    value="Search"
                    onClick={searchAccommodation}
                />
            </div>
        </div>
    );
}

