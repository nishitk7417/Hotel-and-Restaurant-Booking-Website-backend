import { Router } from "express";
import { createListing, deleteListing, getAllListings, getListingById, updateListing } from "../controllers/listing.controller.js";
import { verifyJWT, verifyVendor } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Create a new listing (Only Vendors can create)
router.post("/createListing", verifyJWT, verifyVendor, upload.array("images", 5), createListing); //max 5 iamges
router.get("/", getAllListings);
router.get("/:id", getListingById);
router.put("/:id", verifyJWT, verifyVendor, upload.array("images", 5), updateListing);
router.delete("/:id", verifyJWT, verifyVendor, deleteListing);

export default router;
