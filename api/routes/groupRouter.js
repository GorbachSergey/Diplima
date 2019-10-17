const express = require("express");
const groupController = require("../controllers/gorupController");
const authMiddleware = require("../middleware/auth");
const groupRouter = express.Router();
groupRouter.get("/", groupController.getGroups);
groupRouter.get("/course", groupController.getGroupsBySpecialtyIdAndCourse);
groupRouter.post("/create", authMiddleware, groupController.addGroup);
module.exports = groupRouter;