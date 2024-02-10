const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const planController = require("../../controllers/plan/planController");

const planRouter = express.Router();

//-----Create plan----

planRouter.post("/create", isAuthenticated, planController.createPlan);

//----lists all plans----
planRouter.get("/", planController.lists);

//----update plan----
planRouter.put("/:planId", isAuthenticated, planController.update);

//--- get plan---
planRouter.get("/:planId", planController.getPlan);

//---delete plan---
planRouter.delete("/:planId", isAuthenticated, planController.delete);

module.exports = planRouter;
