const { body } = require("express-validator");

const adminLoginApiValidator = [
    body("email").isEmail().withMessage("email is required"),
    body("password").isString().withMessage("password is required"),
];

module.exports = {
    adminLoginApiValidator,
};
