const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');

async function verifyUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized Access"
        });
    }

    const isBlacklisted = await blacklistModel.findOne({ token });

    if (isBlacklisted) {
        return res.status(401).json({
            message: "Unauthorized Access"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized Access"
            });
        }
        req.user = user;

    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized Access",
            error: err.message
        });
    } finally {
        next();
    }
}

module.exports = { verifyUser };
