import mongoose, {Schema} from "mongoose";

const ReviewSchema = new Schema(
  {
    bookingId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Booking", 
        required: true 
    },
    customerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    rating: { 
        type: Number,
        min: 1, 
        max: 5, 
        required: true 
    },
    comments: { 
        type: String, 
        required: true 
    },
  },{ timestamps: true });

export const Review = mongoose.model("Review", ReviewSchema);
