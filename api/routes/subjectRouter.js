const express = require("express");
const subjectController = require("../controllers/subjectController");
const authMiddleware = require("../middleware/auth");
const subjectRouter = express.Router();
subjectRouter.get("/", subjectController.getSubjectsByGroup);
subjectRouter.post("/create", authMiddleware, subjectController.addSubject);
subjectRouter.post("/delete", authMiddleware, subjectController.removeSubject);
subjectRouter.post("/update", authMiddleware, subjectController.updateSubject);
module.exports = subjectRouter;