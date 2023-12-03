const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname)); // Untuk mengirim file statis seperti index.html

// Variabel untuk menyimpan catatan
const notes = [];

// Endpoint untuk mendapatkan catatan
app.get("/api/notes", (req, res) => {
    res.json(notes);
});

// Endpoint untuk menambah catatan
app.post("/api/notes", (req, res) => {
    const newNote = req.body.note;
    notes.push(newNote);
    res.sendStatus(201);
});

// Rute root untuk mengirim file index.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});

// to run this project : node server.js