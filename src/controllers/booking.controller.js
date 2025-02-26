import { Booking } from "../models/booking.model.js";
import { Unit } from "../models/unit.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";

const createBooking = asyncHandler(async (req, res) => {
    const { listingId, unitId, checkIn, checkOut, amount, transactionId } = req.body;
    console.log(req.body)
    const customerId = req.user.id; // Retrieved from the JWT token

    // Check if the unit exists
    const unit = await Unit.findById(unitId);
    if (!unit) {
        throw new ApiError(404, "Unit not found");
    }

    // Check if the unit is available
    if (!unit.availability) {
        throw new ApiError(400, "Unit is not available for booking");
    }

    // Create a new booking
    const booking = await Booking.create({
        customerId,
        listingId,
        unitId,
        bookingDates: { checkIn, checkOut },
        paymentDetails: { transactionId, amount, paymentStatus: transactionId ? "Paid" : "Pending" },
    });

    // Update unit availability to false (assuming one unit can be booked at a time)
    unit.availability = false;
    await unit.save();

    res.status(201).json(new ApiResponse(201, booking, "Booking created successfully"));
});

const getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find().populate("customerId listingId unitId");
    res.status(200).json(new ApiResponse(200, bookings, "All bookings retrieved successfully"));
});

const getBookingById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate("customerId listingId unitId");

    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    // Restrict access to only Vendor, or the user who booked
    if (!req.user || (!["Admin", "Vendor"].includes(req.user.role) && booking.customerId._id.toString() !== req.user.id)) {
        throw new ApiError(403, "Unauthorized to access this booking");
    }
    
    res.status(200).json(new ApiResponse(200, booking, "Booking retrieved successfully"));
});

const cancelBooking = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    console.log(booking.customerId)
    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    // Ensure only the customer who booked can cancel it
    if (booking.customerId.toString() !== req.user.id) {
        throw new ApiError(403, "Unauthorized to cancel this booking");
    }

    // Update booking status
    booking.status = "Cancelled";
    booking.paymentDetails.paymentStatus = "Failed";
    await booking.save();

    // Make the unit available again
    const unit = await Unit.findById(booking.unitId);
    if (unit) {
        unit.availability = true;
        await unit.save();
    }

    res.status(200).json(new ApiResponse(200, booking, "Booking cancelled successfully"));
});

const updateBookingStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Ensure valid status
    if (!["Pending", "Confirmed", "Cancelled"].includes(status)) {
        throw new ApiError(400, "Invalid booking status");
    }

    const booking = await Booking.findById(id);
    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    // Update status
    booking.status = status;
    await booking.save();

    res.status(200).json(new ApiResponse(200, booking, "Booking status updated successfully"));
});

export{
    createBooking,
    getAllBookings,
    getBookingById,
    cancelBooking,
    updateBookingStatus
}