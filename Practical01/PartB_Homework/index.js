const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Homework API!");
});

// Define route for Introduction Page
app.get("/intro", (req, res) => {
  res.send("Introduction");
});

// Define route for Name Page
app.get("/name", (req, res) => {
  res.send("Hi, I'm Declan!");
});

// Define route for Hobby Page
app.get("/hobby", (req, res) => {
  const hobbyArray = ["Playing video games", "Watching movies", "Cooking"];
  res.json(hobbyArray);
});

app.get("/student", (req, res) => {
  const student = {
    name: "Alex",
    hobbies: ["coding", "reading", "cycling"],
    intro: "Hi, I'm Alex, a Year 2 student passionate about building APIs!"
  };

  res.json(student);
});

// Define route for Favourite Food Page
app.get("/food", (req, res) => {
  res.send("My favourite food is pizza.");
});

// Listen on the port after defining routes
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});