const express = require("express");
const sql = require("mssql");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const studentController = require(
  "./controllers/studentController"
);

const {
  validateStudent,
  validateStudentId,
} = require("./middlewares/studentValidation");

const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Ensure extended is true for urlencoded

// --- Serve static files from the 'public' directory ---
// When a request comes in for a static file (like /index.html, /styles.css, /script.js),
// Express will look for it in the 'public' folder relative to the project root.
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get(
  "/students",
  studentController.getAllStudents
);

app.get(
  "/students/:id",
  validateStudentId,
  studentController.getStudentById
);

app.post(
  "/students",
  validateStudent,
  studentController.createStudent
);

app.put(
  "/students/:id",
  validateStudentId,
  validateStudent,
  studentController.updateStudent
);

app.delete(
  "/students/:id",
  validateStudentId,
  studentController.deleteStudent
);

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: "Something went wrong!",
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");

  await sql.close();

  console.log("Database connections closed");

  process.exit(0);
});