const express = require("express");
const teacherController = require("../controllers/teacherController");
const authMiddleware = require("../middleware/auth");
const teacherRouter = express.Router();
teacherRouter.get("/", teacherController.getTeachers);
teacherRouter.post("/login", teacherController.loginTeacher);
teacherRouter.post("/check", authMiddleware, teacherController.checkPermission);
module.exports = teacherRouter;