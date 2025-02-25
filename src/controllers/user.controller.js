import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id).select("-password");
    
    if(!user){
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"))
})

const updateUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);
    
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Update fields
    user.name = req.body.name || user.name;
    user.contactDetails = req.body.contactDetails || user.contactDetails;

    await user.save();

    return res.status(200).json(new ApiResponse(200, user, "User profile updated successfully"));


})

export {
    updateUserProfile,
    getUserProfile
}