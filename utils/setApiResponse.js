const { Response } = require("express");

const setApiResponse = (status, responeFlag, errorFlag, details, resObj) => {
    let response = {
        result: responeFlag,
    };

    if (errorFlag) {
        response["msg"] = details;
    } else {
        response["data"] = details;
    }
    resObj.status(status).json(response);
    return;
};
module.exports = setApiResponse;
