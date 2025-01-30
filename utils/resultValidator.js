const { validationResult } = require("express-validator");

const resultValidator = (req) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        return null;
    }

    const errorMessage = result
        .formatWith((error) => error.msg.toString())
        .array();

    return errorMessage.join(" || ");
};

module.exports = resultValidator;
