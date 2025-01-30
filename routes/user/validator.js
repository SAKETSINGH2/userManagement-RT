const { body } = require("express-validator");
const userAvailabilityStatus = require("../../repository/user/userAvailabilityStatus");

const loginApiValidator = [
    body("email").isEmail().withMessage("email is required"),
    body("password").isString().withMessage("password is required"),
];

const userRegistrationApiValidator = [
    body("name").isString().withMessage("name is required"),
    body("mobileNo").isInt().withMessage("mobileNo is required"),
    body("password").isString().withMessage("password is required"),
    body("email").isEmail().withMessage("email is required"),
];

const userAvailablityApiValidator = [
    body("availability")
        .isIn(Object.values(userAvailabilityStatus))
        .withMessage("availability status is required"),
];

module.exports = {
    loginApiValidator,
    userRegistrationApiValidator,
    userAvailablityApiValidator,
};
