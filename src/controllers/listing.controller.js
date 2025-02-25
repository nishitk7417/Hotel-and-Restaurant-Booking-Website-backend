import {asyncHandler} from "../utils/asyncHandler.js";
import { Listing } from "../models/listing.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createListing = asyncHandler(async (req, res) => {
    const { type, name, address, description, facilities, pricing } = req.body;

    // Ensure user is a Vendor
    if (req.user.role !== "Vendor") {
        throw new ApiError(403, "Only vendors can create listings");
    }

    // Handle image upload to Cloudinary
    let imageUrls = [];
    if (req.files) {
        for (const file of req.files) {
            const uploadedImage = await uploadOnCloudinary(file.path); // Upload each file
            if (uploadedImage) {
                imageUrls.push(uploadedImage.secure_url); // Store Cloudinary URLs
            }
        }
    }

    // Validate required fields
    if (!type || !name || !address || !description || !facilities || !pricing || imageUrls.length === 0) {
        throw new ApiError(400, "All fields are required, including at least one image.");
    }

    // Create listing
    const listing = await Listing.create({
        vendorId: req.user._id,
        type,
        name,
        address,
        description,
        facilities,
        pricing,
        images: imageUrls
    });

    res.status(201).json(new ApiResponse(201, listing, "Listing created successfully"));
});

const getAllListings = asyncHandler(async (req, res) => {
    const listings = await Listing.find().populate("vendorId", "name email");
    res.status(200).json(new ApiResponse(200, listings, "Listings fetched successfully"));
});

const getListingById = asyncHandler(async (req, res) => {
    const listing = await Listing.findById(req.params.id).populate("vendorId", "name email");

    if (!listing) {
        throw new ApiError(404, "Listing not found");
    }

    res.status(200).json(new ApiResponse(200, listing, "Listing fetched successfully"));
});

const updateListing = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { type, name, address, description, facilities, pricing } = req.body;
    
    let listing = await Listing.findById(id);
    if (!listing) throw new ApiError(404, "Listing not found");

    if (listing.vendorId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only update your own listings");
    }

    let imageUrls = listing.images;
    if (req.files) {
        imageUrls = [];
        for (const file of req.files) {
            const uploadedImage = await uploadOnCloudinary(file.path);
            if (uploadedImage) imageUrls.push(uploadedImage.secure_url);
        }
    }

    listing = await Listing.findByIdAndUpdate(
        id,
        { type, name, address, description, facilities, pricing, images: imageUrls },
        { new: true }
    );

    res.status(200).json(new ApiResponse(200, listing, "Listing updated successfully"));
});

const deleteListing = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    
    if (!listing) throw new ApiError(404, "Listing not found");

    if (listing.vendorId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only delete your own listings");
    }

    await listing.deleteOne();

    res.status(200).json(new ApiResponse(200, null, "Listing deleted successfully"));
});


export{
    createListing,
    getAllListings,
    getListingById,
    updateListing,
    deleteListing
}