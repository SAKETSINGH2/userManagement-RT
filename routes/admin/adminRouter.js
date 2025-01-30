const express = require("express");
const { adminLoginApiValidator } = require("./validator");
const requestParamsValidator = require("../../utils/requestParamsValidator");
const AdminRespository = require("../../repository/admin/index");
const setApiResponse = require("../../utils/setApiResponse");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generateToken");

const adminRepo = new AdminRespository();

const router = express.Router();

router.post(
    "/login",
    adminLoginApiValidator,
    requestParamsValidator,
    async (req, res, next) => {
        const { email, password } = req.body;

        let responseDetails;

        try {
            responseDetails = await adminRepo.validateEmailPassword(email);
            if (!responseDetails) {
                return setApiResponse(400, false, true, "invalid email", res);
            }

            let validatePassword = await bcrypt.compare(
                password,
                responseDetails.password
            );
            if (!validatePassword) {
                return setApiResponse(
                    400,
                    false,
                    true,
                    "Invalid password , please enter valid password",
                    res
                );
            }
            let token = await generateToken(responseDetails);

            let response = {
                name: responseDetails.name,
                email: responseDetails.email,
                mobileNo: responseDetails.mobileNo,
                token: token,
            };

            return setApiResponse(200, true, false, response, res);
        } catch (error) {
            return next(error);
        }
    }
);

module.exports = router;
