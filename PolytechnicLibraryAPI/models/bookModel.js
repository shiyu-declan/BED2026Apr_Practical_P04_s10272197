const sql = require("mssql");
const dbConfig = require("../dbConfig");

// Get all books
async function getAllBooks() {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const query = "SELECT id, title, author, availability FROM Books";
    const result = await connection.request().query(query);
    return result.recordset;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}

// Update book availability
async function updateBookAvailability(id, availability) {
  let connection;

  try {
    connection = await sql.connect(dbConfig);

    const query = `
      UPDATE Books
      SET availability = @availability
      WHERE id = @id
    `;

    const request = connection.request();

    request.input("id", id);
    request.input("availability", availability);

    const result = await request.query(query);

    // rowsAffected[0] tells how many rows were updated
    if (result.rowsAffected[0] === 0) {
      return null;
    }

    return await getBookById(id);
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}


module.exports = {
  getAllBooks,
  updateBookAvailability,
};