const express = require("express");
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middleware/auth");
const studentRouter = express.Router();
studentRouter.get("/", studentController.getStudentsByGroup);
studentRouter.post("/create", authMiddleware, studentController.addStudent);
studentRouter.post("/delete", authMiddleware, studentController.removeStudent);
studentRouter.post("/update", authMiddleware, studentController.updateStudent);
module.exports = studentRouter;