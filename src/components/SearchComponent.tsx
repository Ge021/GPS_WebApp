import React, { ChangeEvent, useState} from "react";
import { Accommodation } from "../App";

interface SearchComponentProps {
    onResultsLoaded: (results: Accommodation[]) => void;
    onMessageUpdated: (message: string) => void;
}


export default function SearchComponent({
    onResultsLoaded,
    onMessageUpdated
}: SearchComponentProps) {
    const [location, setLocation] = useState("");

    return (
        <div>
            <h2>Search Accommodation by Location</h2>
            <fieldset>
                <input
                    type="text"
                    value={location}
                    onChange={locationChanged}
                    placeholder="Enter location"
                />
                <input type="button" value="Search" onClick={searchAccommodation} />
            </fieldset>
        </div>
    );

    function locationChanged(e: ChangeEvent<HTMLInputElement>) {
        setLocation(e.target.value);
    }

    async function searchAccommodation() {
        if (location.trim() === "") {
            onMessageUpdated("Please enter a location.");
            onResultsLoaded([]);
            return;
        }

        const response = await fetch(
            `/accommodation/location/${location}`
        );
        const json = await response.json();

        onResultsLoaded(json);
    }
}
