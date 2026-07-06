const bookModel = require("../models/bookModel");

// Get all books
async function getAllBooks(req, res) {
  try {
    const books = await bookModel.getAllBooks();
    res.json(books);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving books" });
  }
}
  
// Update book availability
async function updateBookAvailability(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { availability } = req.body;

    const updatedBook = await bookModel.updateBookAvailability(id, availability);

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(updatedBook);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error updating book availability" });
  }
}

module.exports = {
  getAllBooks,
  updateBookAvailability,
};