const express = require("express");
const specialtyController = require("../controllers/specialtyController");
const authMiddleware = require("../middleware/auth");
const specialtyRouter = express.Router();
specialtyRouter.get("/", authMiddleware, specialtyController.getSpecialtiesByFacultyId);
module.exports = specialtyRouter;