const mongoose = require("mongoose");
const userAvailabilityStatus = require("./userAvailabilityStatus");

const userModelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        mobileNo: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
        },
        availability: {
            type: String,
            enum: userAvailabilityStatus,
            default: userAvailabilityStatus.AVAILABLE,
        },
        role: {
            type: String,
            default: "user",
        },
    },
    { timestamps: true }
);

const userModelSechmaDbClient = mongoose.model("user", userModelSchema);

module.exports = userModelSechmaDbClient;
