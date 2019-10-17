const express = require("express");
const specialtyController = require("../controllers/specialtyController");
const authMiddleware = require("../middleware/auth");
const specialtyRouter = express.Router();
specialtyRouter.get("/", specialtyController.getSpecialtiesByFacultyId);
specialtyRouter.post("/create", authMiddleware, specialtyController.addSpecialty);
specialtyRouter.post("/delete", authMiddleware, specialtyController.removeSpecialty);
specialtyRouter.post("/update", authMiddleware, specialtyController.updateSpecialty);
module.exports = specialtyRouter;