import express from "express";
import Database from "better-sqlite3";
import ViteExpress from "vite-express";

const app = express();
app.use(express.json());

const db = new Database("placestostay.db");

// Part A (Q1) - This will get all accomodations in the given location 
app.get("/accommodation/location/:location", (req, res) => {
  try {
    const stmt = db.prepare(
      `SELECT * FROM accommodation 
       WHERE location = ?`
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
      `SELECT * FROM accommodation 
       WHERE location = ? AND type = ?`
    );
    const results = stmt.all(req.params.location, req.params.type);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Part A (Q3) - This will get add a booking to the acc_bookngs table and change the number of availabilities depending on the number of people in the booking 
app.post("/booking", (req, res) => {
  try {
    const { accommodationId, people, date} = req.body;
    if (
      typeof accommodationId !== "number" || accommodationId <= 0 ||
      typeof people !== "number" || people <= 0 ||
      typeof date !== "string" || date.trim() === ""
    ) {
      return res.status(400).json({
        error: "Missing or invalid booking details."
      });
    }

    const insertBooking = db.prepare(`
      INSERT INTO acc_bookngs (accID, thedate, npeople)
      VALUES (?, ?, ?)
    `);

    const updateAvailability = db.prepare(`
      UPDATE acc_dates
      SET availability = availability - ?
      WHERE accID = ? AND thedate = ?
    `);

    const bookingTransaction = db.transaction(() => {
      insertBooking.run(accommodationId, date, people);
      updateAvailability.run(people, accommodationId, date);
    });

    bookingTransaction();

    res.status(201).json({
      message: "Booking created successfully"
    });

  } catch (error) {
  console.error(error);
  res.status(500).json({ error: "Database error" });
  }
});

ViteExpress.listen(app, 3000, () => {
  console.log("Server running on http://localhost:3000");
});

