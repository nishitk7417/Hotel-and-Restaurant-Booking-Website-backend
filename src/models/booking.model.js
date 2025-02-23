import mongoose, {Schema} from "mongoose";

const BookingSchema = new Schema(
  {
    customerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    listingId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Listing", 
        required: true 
    },
    unitId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Unit", 
        required: true 
    },
    bookingDates: {
        checkIn: { 
            type: Date, 
            required: true 
        },
        checkOut: { 
            type: Date, 
            required: true 
        },
    },
    status: { 
        type: String, 
        enum: ["Pending", "Confirmed", "Cancelled"], 
        default: "Pending" 
    },
    paymentDetails: {
        transactionId: { 
            type: String, 
            default: null 
        },
        amount: { 
            type: Number, 
            required: true 
        },
        paymentStatus: { 
            type: String, 
            enum: ["Pending", "Paid", "Failed"], 
            default: "Pending" 
        },
    },
  },{ timestamps: true });

export const Booking = mongoose.model("Booking", BookingSchema);
