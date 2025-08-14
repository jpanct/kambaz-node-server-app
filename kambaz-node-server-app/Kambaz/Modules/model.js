// Kambaz/Modules/model.js
import mongoose from "mongoose";

// Define the schema for the modules collection.
const moduleSchema = new mongoose.Schema({
    // IMPORTANT: Do NOT define the _id field here.
    // Mongoose automatically adds an _id of type ObjectId, which is what we want.
    name: { type: String, required: true },
    description: String,
    course: {
        type: String, // Or mongoose.Schema.Types.ObjectId if you are using refs
        required: true
    }
    // You can add other fields for your module here.
}, { collection: "modules" });

// Create the Mongoose model from the schema.
const Module = mongoose.model("Module", moduleSchema);

export default Module;
