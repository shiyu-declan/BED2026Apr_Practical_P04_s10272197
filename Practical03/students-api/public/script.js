// Get references to the HTML elements you'll interact with:
const studentsListDiv = document.getElementById("studentsList");
const fetchStudentsBtn = document.getElementById("fetchStudentsBtn");
const messageDiv = document.getElementById("message"); // Get reference to the message div
const apiBaseUrl = "http://localhost:3000";

// Function to fetch students from the API and display them
async function fetchStudents() {
  try {
    studentsListDiv.innerHTML = "Loading students..."; // Show loading state
    messageDiv.textContent = ""; // Clear any previous messages (assuming a message div exists or add one)

    // Make a GET request to your API endpoint
    const response = await fetch(`${apiBaseUrl}/students`);

    if (!response.ok) {
      // Handle HTTP errors (e.g., 404, 500)
      // Attempt to read error body if available, otherwise use status text
      const errorBody = response.headers
        .get("content-type")
        ?.includes("application/json")
        ? await response.json()
        : { message: response.statusText };
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorBody.message}`
      );
    }

    // Parse the JSON response
    const students = await response.json();

    // Clear previous content and display students
    studentsListDiv.innerHTML = ""; // Clear loading message
    if (students.length === 0) {
      studentsListDiv.innerHTML = "<p>No students found.</p>";
    } else {
      students.forEach((student) => {
        const studentElement = document.createElement("div");
        studentElement.classList.add("student-item");
        // Use data attributes or similar to store ID on the element if needed later
        studentElement.setAttribute("data-student-id", student.id);
        studentElement.innerHTML = `
                    <h3>${student.name}</h3>
                    <p>Address: ${student.address}</p>
                    <p>ID: ${student.id}</p>
                    <button onclick="viewStudentDetails(${student.id})">View Details</button>
                    <button onclick="editStudent(${student.id})">Edit</button>
                    <button class="delete-btn" data-id="${student.id}">Delete</button>
                `;
        studentsListDiv.appendChild(studentElement);
      });
      // Add event listeners for delete buttons after they are added to the DOM
      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", handleDeleteClick);
      });
    }
  } catch (error) {
    console.error("Error fetching students:", error);
    studentsListDiv.innerHTML = `<p style="color: red;">Failed to load students: ${error.message}</p>`;
  }
}

// Placeholder functions for other actions (to be implemented later or in other files)
function viewStudentDetails(studentId) {
  console.log("View details for student ID:", studentId);
  // In a real app, redirect to view.html or show a modal
  // window.location.href = `view.html?id=${studentId}`; // Assuming you create view.html
  alert(`View details for student ID: ${studentId} (Not implemented yet)`);
}

function editStudent(studentId) {
  console.log("Edit student with ID:", studentId);
  // In a real app, redirect to edit.html with the student ID
  window.location.href = `edit.html?id=${studentId}`; // Assuming you create edit.html
}

// Placeholder/Partial implementation for Delete (will be completed by learners)
function handleDeleteClick(event) {
  const studentId = event.target.getAttribute("data-id");
  console.log("Attempting to delete student with ID:", studentId);
  // --- Start of code for learners to complete ---
  alert(
    `Attempting to delete student with ID: ${studentId} (Not implemented yet)`
  );
  // TODO: Implement the fetch DELETE request here
  // TODO: Handle success (204) and error responses (404, 500)
  // TODO: On successful deletion, remove the student element from the DOM
  // --- End of code for learners to complete ---
}

// Fetch students when the button is clicked
fetchStudentsBtn.addEventListener("click", fetchStudents);

// Optionally, fetch students when the page loads
// window.addEventListener('load', fetchStudents); // Or call fetchStudents() directly