const express = require("express");
const groupController = require("../controllers/groupController");
const authMiddleware = require("../middleware/auth");
const groupRouter = express.Router();
groupRouter.get("/", groupController.getGroupsBySpecialtyIdAndCourse);
groupRouter.post("/create", authMiddleware, groupController.addGroup);
groupRouter.post("/delete", authMiddleware, groupController.removeGroup);
groupRouter.post("/update", authMiddleware, groupController.updateGroup);
module.exports = groupRouter;