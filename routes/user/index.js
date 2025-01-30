const express = require("express");
const UserRepository = require("../../repository/user/index");
const {
    userRegistrationApiValidator,
    userAvailablityApiValidator,
} = require("./validator");
const requestParamsValidator = require("../../utils/requestParamsValidator");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const generateToken = require("../../utils/generateToken");
const authenticatedUser = require("../../middlewares/authenticate");
const { loginApiValidator } = require("./validator");
const setApiResponse = require("../../utils/setApiResponse");

dotenv.config();

const router = express.Router();

const userRepository = new UserRepository();

router.post(
    "/register",
    userRegistrationApiValidator,
    requestParamsValidator,
    async (req, res, next) => {
        const { name, email, password, mobileNo, bio } = req.body;

        let responseDetails;

        try {
            isUserAlreadyRegistered = await userRepository.isUserResgistered(
                email
            );

            if (isUserAlreadyRegistered) {
                return setApiResponse(
                    400,
                    false,
                    true,
                    "user already registerd",
                    res
                );
            }
            //  if user not registered then registration process...
            let hashedPassword = await bcrypt.hash(password, 10);

            responseDetails = await userRepository.registerUser({
                name,
                email,
                password: hashedPassword,
                mobileNo,
                bio,
            });

            if (!responseDetails) {
                return setApiResponse(
                    400,
                    false,
                    true,
                    "facing some issue while register",
                    res
                );
            }

            let response = {
                name: responseDetails.name,
                email: responseDetails.email,
                mobileNo: responseDetails.mobileNo,
            };

            return setApiResponse(200, true, false, response, res);
        } catch (error) {
            return next(error);
        }
    }
);

router.post(
    "/login",
    loginApiValidator,
    requestParamsValidator,
    async (req, res, next) => {
        const { email, password } = req.body;

        let responseDetails;

        try {
            responseDetails = await userRepository.isUserResgistered(email);
            if (!responseDetails) {
                return setApiResponse(400, false, true, "user not found", res);
            }
            // if user extis then login process...
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
                bio: responseDetails.bio,
                availabilityStatus: responseDetails.availability,
            };

            return setApiResponse(200, true, false, response, res);
        } catch (error) {
            return next(error);
        }
    }
);

router.get("/profile", authenticatedUser, async (req, res, next) => {
    let responseDetails;

    try {
        responseDetails = await userRepository.getUserProfile(req.userId);

        if (!responseDetails) {
            return setApiResponse(
                400,
                false,
                true,
                "user profile not found",
                res
            );
        }

        let response = {
            userId: responseDetails._id,
            name: responseDetails.name,
            email: responseDetails.email,
            mobileNo: responseDetails.mobileNo,
            bio: responseDetails.bio,
            availabilityStatus: responseDetails.availability,
        };

        return setApiResponse(200, true, false, response, res);
    } catch (error) {
        return next(error);
    }
});

router.post("/update_profile", authenticatedUser, async (req, res, next) => {
    const { name, email, mobileNo, bio } = req.body;

    if (!name && !email && !mobileNo && !bio) {
        return setApiResponse(
            400,
            false,
            true,
            "nothing to update, please try again",
            res
        );
    }

    let responseDetails;

    try {
        responseDetails = await userRepository.updateUserProfile(req.userId, {
            name,
            email,
            mobileNo,
            bio,
        });

        if (!responseDetails) {
            return setApiResponse(
                400,
                false,
                true,
                "user profile not found",
                res
            );
        }

        return setApiResponse(
            200,
            true,
            false,
            "user profile updated successfully",
            res
        );
    } catch (error) {
        return next(error);
    }
});

router.post(
    "/update_availability",
    authenticatedUser,
    userAvailablityApiValidator,
    requestParamsValidator,
    async (req, res, next) => {
        const { availability } = req.body;
        let responseDetails;

        try {
            responseDetails = await userRepository.updateUserAvailability(
                req.userId,
                availability
            );

            if (!responseDetails) {
                return setApiResponse(
                    400,
                    false,
                    true,
                    "availability status update failed",
                    res
                );
            }

            return setApiResponse(
                200,
                true,
                false,
                "user availability status updated successfully",
                res
            );
        } catch (error) {
            return next(error);
        }
    }
);

module.exports = router;
