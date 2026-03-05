import express from "express";
import Database from "better-sqlite3";

const app = express();
app.use(express.json());

const db = new Database("placestostay.db");

// Part A (Q1) - This will get all accomodations in the given location 
app.get("/accommodation/location/:location", (req, res) => {
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

// Part A (Q2) - This will get all accomodations in a given location and type
app.get("/accommodation/location/:location/type/:type", (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT * FROM accommodation WHERE location = ? AND type = ?"
    );
    const results = stmt.all(req.params.location, req.params.type);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});