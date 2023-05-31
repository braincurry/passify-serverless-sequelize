const bcrypt = require("bcryptjs");
const responseBody = require("../libs/response");
const UserModel = require("../models/userModel");
const logger = require("../libs/logger");
const { issueToken } = require("../libs/jwt");
const {
    validateName,
    validateEmail,
    validatePassword,
} = require("../libs/validator");
const { errCode } = require("../constants/errCode");

class authService {
    async register(data) {
        try {
            const { first_name, last_name, email, password } = data;
            if (!first_name || !last_name || !email)
                return responseBody(
                    400,
                    errCode.MISSING_PARAMS,
                    "Please enter first_name, last_name, email"
                );
            if (!validateName(first_name) || !validateName(last_name))
                return responseBody(
                    400,
                    "Enter first_name and last_name in valid format"
                );
            if (!validateEmail(email))
                return responseBody(
                    400,
                    errCode.WRONG_FORMAT,
                    "Enter email in valid format"
                );
            if (!validatePassword(password))
                return responseBody(
                    400,
                    errCode.WRONG_FORMAT,
                    "Enter password in valid format"
                );

            let userObj = new UserModel();
            const foundUser = await userObj.getUser(email);
            if (foundUser)
                return responseBody(400, errCode.EXISTING_USER, "User already exists");
            const hashPass = await bcrypt.hashSync(password, 10);
            await userObj.createUser({
                first_name,
                last_name,
                email: email.toLowerCase(),
                password: hashPass,
            });
            return responseBody(201, "Success");
        } catch (err) {
            logger.error("Error in registering user", err);
            return responseBody(400, errCode.DB_ERROR, "Error in registering user");
        }
    }

    async login(data) {
        try {
            const { email, password } = data;
            if (!email || !password)
                return responseBody(
                    400,
                    errCode.MISSING_PARAMS,
                    "Please enter email and password"
                );
            let obj = new UserModel();
            const foundUser = await obj.getUser(email);
            if (!foundUser)
                return responseBody(
                    400,
                    errCode.MISSING_USER,
                    "User doesn't exist or is inactive"
                );
            const isMatch = await bcrypt.compareSync(password, foundUser.password);
            if (!isMatch)
                return responseBody(401, errCode.WRONG_PASSWORD, "Wrong password");
            const token = issueToken(foundUser);
            return responseBody(200, "Successfully logged in", { token });
        } catch (err) {
            logger.error("Error in login", err);
            return responseBody(400, errCode.DB_ERROR, err);
        }
    }
}

module.exports = authService;
