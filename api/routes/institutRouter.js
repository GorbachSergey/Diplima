const express = require("express");
const institutController = require("../controllers/institutController");
const authMiddleware = require("../middleware/auth");
const institutRouter = express.Router();
institutRouter.get("/", institutController.getInstituts);
institutRouter.post("/create", authMiddleware, institutController.addInstitut);
institutRouter.post("/delete", authMiddleware, institutController.removeInstitut);
institutRouter.post("/update", authMiddleware, institutController.updateInstitut);
module.exports = institutRouter;