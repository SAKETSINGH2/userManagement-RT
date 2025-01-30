const dbClient = require("./dbClient");
const userAvailabilityStatus = require("./userAvailabilityStatus");

class userRepository {
    registerUser = async (userDetails) => {
        const result = await dbClient.create({
            name: userDetails.name,
            email: userDetails.email,
            mobileNo: userDetails.mobileNo,
            password: userDetails.password,
            bio: userDetails.bio,
        });

        return result;
    };

    isUserResgistered = async (email) => {
        const result = await dbClient.findOne({
            email: email,
        });

        if (!result) {
            return false;
        }
        return result;
    };

    getUserProfile = async (userId) => {
        const result = await dbClient.findById(userId);
        if (!result) {
            return false;
        }
        return result;
    };

    updateUserProfile = async (userId, updatedDetails) => {
        const result = await dbClient.findByIdAndUpdate(userId, {
            $set: {
                name: updatedDetails.name,
                email: updatedDetails.email,
                mobileNo: updatedDetails.mobileNo,
                bio: updatedDetails.bio,
            },
        });
        if (!result) {
            return false;
        }
        return result;
    };

    updateUserAvailability = async (userId, availabilityStatus) => {
        const result = await dbClient.findByIdAndUpdate(userId, {
            $set: {
                availability: availabilityStatus,
            },
        });
        if (!result) {
            return false;
        }
        return result;
    };
}

module.exports = userRepository;
