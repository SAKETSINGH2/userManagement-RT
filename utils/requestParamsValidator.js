const validationResult = require("./resultValidator");

const requestParamsValidator = (req, res, next) => {
    let reqValidationResult = validationResult(req);

    if (reqValidationResult) {
        return res.status(400).json({
            success: true,
            data: reqValidationResult,
        });
    }
    return next();
};
module.exports = requestParamsValidator;
