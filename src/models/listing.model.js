import mongoose, {Schema} from "mongoose";

const listingSchema = new Schema({

    vendorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        enum: ["Hotel","Restaurant"],
        required: true
    },
    name: {
        type: String,
        require: true
    },
    address:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    facilities:{
        type: String,
        required: true
    },
    pricing:{
        type: Number,
        required: true
    },
    images:{
        type: [String],
        required: true
    }
}, {timestamps: true});

export const Listing = mongoose.model("Listing", listingSchema)