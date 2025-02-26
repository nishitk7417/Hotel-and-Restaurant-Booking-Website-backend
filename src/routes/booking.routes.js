import { Router } from "express";
import { createBooking, getAllBookings, getBookingById, cancelBooking, updateBookingStatus } from "../controllers/booking.controller.js";
import { verifyJWT, verifyVendor } from "../middlewares/auth.middleware.js";

const router = Router();

// Create a new booking (Customer only)
router.post("/", verifyJWT, createBooking);

// Get all bookings (Vendor)
router.get("/", verifyJWT, verifyVendor, getAllBookings);

// Get a single booking by ID (Vendor, or Customer who booked)
router.get("/:id", verifyJWT, getBookingById);

// Cancel a booking (Customer only)
router.put("/:id/cancel", verifyJWT, cancelBooking);

// Update booking status (Vendor only)
router.put("/:id/status", verifyJWT, verifyVendor, updateBookingStatus);

export default router;
