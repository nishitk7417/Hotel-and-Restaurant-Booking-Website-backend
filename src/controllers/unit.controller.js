import {asyncHandler} from "../utils/asyncHandler.js";
import { Unit } from "../models/unit.model.js";
import { Listing } from "../models/listing.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

//Create a new Unit
const createUnit = asyncHandler(async (req, res) => {
    const { listingId, type, capacity, price } = req.body;

    // Check if the listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
        throw new ApiError(404, "Listing not found");
    }

    // Ensure type is valid
    if (!["Room", "Table"].includes(type)) {
        throw new ApiError(400, "Invalid unit type. Must be 'Room' or 'Table'");
    }

    const unit = await Unit.create({ listingId, type, capacity, price });

    res.status(201).json(new ApiResponse(201, unit, "Unit created successfully"));
});

//Get all Units
const getAllUnits = asyncHandler(async (req, res) => {
    const units = await Unit.find().populate("listingId", "name type");
    res.status(200).json(new ApiResponse(200, units, "Units retrieved successfully"));
});

// Get a single Unit by ID
const getUnitById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const unit = await Unit.findById(id).populate("listingId", "name type");

    if (!unit) {
        throw new ApiError(404, "Unit not found");
    }

    res.status(200).json(new ApiResponse(200, unit, "Unit retrieved successfully"));
});

//Update a Unit
const updateUnit = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    console.log(updates)

    const unit = await Unit.findById(id);
    if (!unit) {
        throw new ApiError(404, "Unit not found");
    }

    if (req.user.role !== "Vendor") {
        throw new ApiError(403, "Only vendors can update units");
    }

    // Restrict updating 'listingId'
    if (updates.listingId !== undefined) {
        throw new ApiError(400, "You cannot update listingId");
    }

    // Validate unit type if being updated
    if (updates.type && !["Room", "Table"].includes(updates.type)) {
        throw new ApiError(400, "Invalid unit type. Must be 'Room' or 'Table'");
    }

    // Update only allowed fields
    Object.assign(unit, updates);
    await unit.save();

    res.status(200).json(new ApiResponse(200, unit, "Unit updated successfully"));
});


//Delete a Unit
const deleteUnit = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const unit = await Unit.findByIdAndDelete(id);
    if (!unit) {
        throw new ApiError(404, "Unit not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Unit deleted successfully"));
});

export{
    createUnit,
    getAllUnits,
    getUnitById,
    updateUnit,
    deleteUnit
}