import { Review } from "../models/review.model.js";
import { Booking } from "../models/booking.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// create review
const createReview = asyncHandler(async (req, res) => {
    const { bookingId, rating, comments } = req.body;
    const customerId = req.user.id;

    // Check if booking exists and belongs to the user
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }
    if (booking.customerId.toString() !== customerId) {
        throw new ApiError(403, "You can only review your own bookings");
    }
    if (booking.status !== "Confirmed") {
        throw new ApiError(400, "Only completed bookings can be reviewed");
    }

    // Check if the user has already reviewed this booking
    const existingReview = await Review.findOne({ bookingId, customerId });
    if (existingReview) {
        throw new ApiError(400, "You have already reviewed this booking");
    }

    // Create the review
    const review = await Review.create({ bookingId, customerId, rating, comments });

    res.status(201).json(new ApiResponse(201, review, "Review added successfully"));
});

// get all reviews
const getAllReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find()
        .populate("customerId", "name email")
        .populate("bookingId", "listingId");

    res.status(200).json(new ApiResponse(200, reviews, "All reviews retrieved successfully"));
});

// get reviews by booking id
const getReviewsByBooking = asyncHandler(async (req, res) => {
    const { bookingId } = req.params;
    const reviews = await Review.find({ bookingId })
        .populate("customerId", "name email")
        .populate("bookingId", "listingId");

    if (!reviews.length) {
        throw new ApiError(404, "No reviews found for this booking");
    }

    res.status(200).json(new ApiResponse(200, reviews, "Reviews retrieved successfully"));
});

// update review (Only the author(customer) can update)
const updateReview = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rating, comments } = req.body;
    const customerId = req.user.id;

    const review = await Review.findById(id);
    if (!review) {
        throw new ApiError(404, "Review not found");
    }

    if (review.customerId.toString() !== customerId) {
        throw new ApiError(403, "You can only update your own review");
    }

    review.rating = rating || review.rating;
    review.comments = comments || review.comments;
    await review.save();

    res.status(200).json(new ApiResponse(200, review, "Review updated successfully"));
});

// delete review (Only the author(customer) can delete)
const deleteReview = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const customerId = req.user.id;

    const review = await Review.findById(id);
    if (!review) {
        throw new ApiError(404, "Review not found");
    }

    if (review.customerId.toString() !== customerId) {
        throw new ApiError(403, "You can only delete your own review");
    }

    await review.deleteOne();
    res.status(200).json(new ApiResponse(200, null, "Review deleted successfully"));
});

export {
    createReview,
    getAllReviews,
    getReviewsByBooking,
    updateReview,
    deleteReview
};
