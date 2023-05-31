const jwt = require("jsonwebtoken");
const { errCode } = require("../constants/errCode");
const logger = require("./logger");

const verifyToken = (event) => {
    const token = event.headers.Authorization;
    if (!token) return { error: true, message: errCode.TOKEN_MISSING };
    try {
        const tokenExtract = token.split(" ")[1];
        let secret = process.env.JWT_SECRET;
        var decoded = jwt.verify(tokenExtract, secret);
        return { error: false, message: "authorized.", user: decoded };
    } catch (err) {
        logger.error("Error in token verification", err);
        return { error: true, message: errCode.INVALID_TOKEN };
    }
};

const issueToken = (user) => {
    try {
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            {
                expiresIn: 86400, // expires in 24 hours
            }
        );
        return token;
    } catch (err) {
        logger.error("Error in creating token", err);
        throw err;
    }
};


module.exports = {
    verifyToken,
    issueToken,
};
