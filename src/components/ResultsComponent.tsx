import React from "react";
import { Accommodation } from "../App";

interface ResultsComponentProps {
    accommodations: Accommodation[];
    onMessage: (message: string) => void;
}

export default function ResultsComponent({
    accommodations,
    onMessage,
}: ResultsComponentProps) {
    if (accommodations.length === 0) return null;

    async function bookAccommodation(id: number, name: string) {
        try {
            const response = await fetch("/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    accommodationId: id,
                    people: 1,
                    date: "260601"
                }),
            });

            const json = await response.json();

            if (response.ok) {
                onMessage(`Successfully booked "${name}"`);
            } else {
                onMessage(`Booking failed: ${json.error}`);
            }
        } catch {
            onMessage("A network error occurred while booking.");
        }
    }

    return (
        <div>
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