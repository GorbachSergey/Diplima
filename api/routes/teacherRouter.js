const express = require("express");
const teacherController = require("../controllers/teacherController");
const authMiddleware = require("../middleware/auth");
const teacherRouter = express.Router();
teacherRouter.get("/", authMiddleware, teacherController.getTeachers);
teacherRouter.post("/login", teacherController.loginTeacher);
module.exports = teacherRouter;