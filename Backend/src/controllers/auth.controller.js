const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');
const redis = require('../config/cache');

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    const isUserAlreadyPresent = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isUserAlreadyPresent) {
        return res.status(400).json({
            message: 'User already exists with the given username or email'
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
        username,
        email,
        password: hashedPassword
    });
    await userModel.create(user);

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '3d' }
    );
    res.cookie('token', token);

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

async function loginUser(req, res) {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    }).select('+password');

    if (!user) {
        return res.status(400).json({
            message: 'Invalid Credentials'
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: 'Invalid Credentials'
        })
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '3d' }
    );
    res.cookie('token', token);

    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

async function getMe(req, res) {
    const user = req.user;

    if (!user) {
        return res.status(404).json({
            message: 'Use not logged in.'
        })
    }
    res.status(200).json({
        message: 'User fetched successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function logoutUser(req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({
            message: 'Token not found in cookies'
        })
    }

    res.clearCookie('token');

    await redis.set(token, Date.now().toString(), 'EX', 3 * 24 * 60 * 60); // Set token in Redis with an expiration time of 3 days

    res.status(200).json({
        message: 'User logged out successfully'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser
};