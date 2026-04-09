import React, { useEffect, useRef } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Accommodation } from "../App";

interface MapComponentProps {
    accommodations: Accommodation[];
}

export default function MapComponent({ accommodations }: MapComponentProps) {
    const mapRef = useRef<L.Map | null>(null);
    const mapDivRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mapDivRef.current) return;


        if (!mapRef.current) {
            mapRef.current = L.map(mapDivRef.current).setView([51.5, -1.5], 8);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "Map data copyright OpenStreetMap contributors, Open Database Licence"
            }).addTo(mapRef.current);
        }


        mapRef.current.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                mapRef.current!.removeLayer(layer);
            }
        });

        accommodations.forEach(acc => {
            const marker = L.marker([acc.latitude, acc.longitude]).addTo(mapRef.current!);
            marker.bindPopup(`<strong>${acc.name}</strong><p>${acc.description}</p>`);
        });


        if (accommodations.length > 0) {
            const bounds = L.latLngBounds(accommodations.map(a => [a.latitude, a.longitude]));
            mapRef.current.fitBounds(bounds);
        }
    }, [accommodations]);

    return <div ref={mapDivRef} style={{ width: "100%", height: "500px" }} />;
}