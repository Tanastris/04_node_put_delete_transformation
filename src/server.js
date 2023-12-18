const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const PORT = 3000;

// DATA

const users = [
  { id: 1, name: "Serbentautas", town: "Vilnius", isDeleted: false },
  { id: 2, name: "Lenteja", town: "Kaunas", isDeleted: false },
  { id: 3, name: "James", town: "London", isDeleted: false },
];

// Middleware
app.use(morgan("dev"));

// routes
app.get("/", function (req, res) {
  res.send("Hello World");
});

// GET /api/users - grazina visus vartotojus
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:userId", (req, res) => {
  const userId = +req.params.userId;
  const found = users.find((obj) => obj.id === userId);
  if (found === undefined) {
    res.status(404).json({
      msg: `user not found with id ${userId}`,
    });
    return;
  }
  res.json(found);
});
// DELETE /api/users/1 = deletes user
app.delete("/api/users/1");

// Run the server
app.listen(PORT, () => {
  `Server running on http://localhost:${PORT}`;
});
