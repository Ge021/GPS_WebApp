import express from "express";
import Database from "better-sqlite3";

const app = express();
app.use(express.json());

const db = new Database("accommodation.db");

// Part A (Q1) - This will get all accomodations in the given location 
app.get("/accommodation/:location", (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT * FROM accommodation WHERE location = ?"
    );
    const results = stmt.all(req.params.location);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
});