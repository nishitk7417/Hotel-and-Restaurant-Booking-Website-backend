import express from "express";
import { createReview, getAllReviews, getReviewsByBooking, updateReview, deleteReview } from "../controllers/review.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, createReview); // Only customers can review
router.get("/", getAllReviews);
router.get("/:bookingId", getReviewsByBooking);
router.put("/:id", verifyJWT, updateReview); // Only review author(customer) can edit
router.delete("/:id", verifyJWT, deleteReview); // Only review author(customer) can delete

export default router;
