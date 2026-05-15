const Joi = require("joi");

// Student schema
const studentSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  address: Joi.string().min(1).max(100).required(),
});

// Validate student body
function validateStudent(req, res, next) {
  const { error } = studentSchema.validate(
    req.body,
    { abortEarly: false }
  );

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");

    return res.status(400).json({
      error: errorMessage,
    });
  }

  next();
}

// Validate student ID
function validateStudentId(req, res, next) {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      error:
        "Invalid student ID. ID must be a positive number",
    });
  }

  next();
}

module.exports = {
  validateStudent,
  validateStudentId,
};