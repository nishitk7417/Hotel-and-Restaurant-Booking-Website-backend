import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema(
  {
    customerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
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
        type: new Schema({
            checkIn: { 
                type: Date, 
                required: [true, "Check-in date is required"] 
            },
            checkOut: { 
                type: Date, 
                required: [true, "Check-out date is required"] 
            }
        }),
        required: true
    },
    status: { 
        type: String, 
        enum: ["Pending", "Confirmed", "Cancelled"], 
        default: "Pending" 
    },
    paymentDetails: {
        type: new Schema({
            transactionId: { 
                type: String, 
                default: null 
            },
            amount: { 
                type: Number, 
                required: [true, "Payment amount is required"] 
            },
            paymentStatus: { 
                type: String, 
                enum: ["Pending", "Paid", "Failed"], 
                default: "Pending" 
            }
        }),
        required: true
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", BookingSchema);
