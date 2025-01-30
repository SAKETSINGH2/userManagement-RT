const dbClient = require("./dbClient");

class adminRepository {
    validateEmailPassword = async (email) => {
        const result = await dbClient.findOne({ email: email });
        console.log("result", result);
        return result;
    };
}

module.exports = adminRepository;
