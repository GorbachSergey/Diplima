const express = require("express");
const institutController = require("../controllers/institutController");
const authMiddleware = require("../middleware/auth");
const institutRouter = express.Router();
institutRouter.get("/", authMiddleware, institutController.getInstituts);
module.exports = institutRouter;