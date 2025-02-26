import { Router } from "express";
import { createUnit, getAllUnits, getUnitById, updateUnit, deleteUnit } from "../controllers/unit.controller.js";
import { verifyJWT, verifyVendor } from "../middlewares/auth.middleware.js";

const router = Router();

//Create a new Unit (Only Vendors can create)
router.post("/", verifyJWT, verifyVendor, createUnit);

//Get all Units
router.get("/", getAllUnits);

//Get a single Unit by ID
router.get("/:id", getUnitById);

//Update a Unit (Only Vendors can update)
router.put("/:id", verifyJWT, verifyVendor, updateUnit);

//Delete a Unit (Only Vendors can delete)
router.delete("/:id", verifyJWT, verifyVendor, deleteUnit);

export default router;
