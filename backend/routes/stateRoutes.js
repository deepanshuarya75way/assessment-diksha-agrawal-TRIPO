import express from "express";

import {

  getAllStates,

  getStateById,

  createState,

  updateState,

  deleteState,

} from "../controllers/stateController.js";

const router = express.Router();

// Get All States
router.get("/", getAllStates);

// Get Single State
router.get("/:id", getStateById);

// Add State
router.post("/", createState);

// Update State
router.put("/:id", updateState);

// Delete State
router.delete("/:id", deleteState);

export default router;