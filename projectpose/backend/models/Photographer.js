const mongoose = require("mongoose");

const PhotographerSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        city: {
            type: String,
            max: 50,
        },
        yearsExperience: {
            type: String,
            max: 10,
        },
        description: {
            type: String,
            max: 100,
        },
        photos: {
            type: String
        },
        contactInfo: {
            type: String,
            max: 50,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Photographer", PhotographerSchema);
