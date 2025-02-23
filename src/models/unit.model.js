import mongoose, {Schema} from "mongoose";

const unitSchema = new Schema({

    listingId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Listing", 
        required: true 
    },
    type: { 
        type: String, 
        enum: ["Room", "Table"], 
        required: true 
    },
    capacity: { 
        type: Number, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    availability: { 
        type: Boolean, 
        default: true 
    },
},{timestamps:true});

export const unit = mongoose.model("Unit", unitSchema);