import React, { useState } from "react";
import { Accommodation } from "../App";

interface ResultsComponentProps {
    accommodations: Accommodation[];
    onMessage: (message: string) => void;
}

export default function ResultsComponent({
    accommodations,
    onMessage,
}: ResultsComponentProps) {
    const [people, setPeople] = useState<number>(1);
    const [date, setDate] = useState<string>("");

    
    if (accommodations.length === 0) return null;

    async function bookAccommodation(id: number, name: string) {
        try {
            const response = await fetch("/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    accommodationId: id,
                    people: people,
                    date: date.replace(/-/g,"").substring(2)
                }),
            });

            const json = await response.json();

        if (response.ok) {
            onMessage(`Your booking at "${name}" was successful!`);
        } else if (response.status === 401) {
            onMessage("You need to be logged in to make a booking. Please log in and try again.");
        } else if (response.status === 400) {
            onMessage(`Unable to complete your booking: ${json.error}`);
        } else if (response.status === 500) {
            onMessage("Something went wrong on our end. Please try again later.");
        } else {
            onMessage("An unexpected error occurred. Please try again.");
        }
        } catch {
            onMessage("A network error occurred while booking.");
        }
    }

    return (
        <div>
            <label>
                Number of People:
                <input
                    type = "number"
                    min = {1}
                    value = {people}
                    onChange = {(e) => setPeople(parseInt(e.target.value))}
                />
            </label>
            <label>
                Date:
                <input
                    type = "date"
                    value = {date}
                    onChange = {(e) => setDate(e.target.value)}
                />
            </label>
            <h2>Results ({accommodations.length} found)</h2>
            {accommodations.map((acc) => (
                <div key={acc.ID}>
                    <h3>{acc.name}</h3>
                    <p>Type: {acc.type}</p>
                    <p>Location: {acc.location}</p>
                    <p>Coordinates: {acc.latitude}, {acc.longitude}</p>
                    <button onClick={() => bookAccommodation(acc.ID, acc.name)}>
                        Book
                    </button>
                </div>
            ))}
        </div>
    );
}