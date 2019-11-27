const express = require("express");
const markController = require("../controllers/markController");
const authMiddleware = require("../middleware/auth");
const markRouter = express.Router();
markRouter.post("/create", authMiddleware, markController.addMark);
module.exports = markRouter;