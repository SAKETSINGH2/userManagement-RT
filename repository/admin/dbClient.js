const mongoose = require("mongoose");

const adminModelSchema = new mongoose.Schema(
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
    },
    { timestamps: true }
);

const adminModelSchemaDbClient = mongoose.model(
    "admin",
    adminModelSchema,
    "admin"
);

module.exports = adminModelSchemaDbClient;
