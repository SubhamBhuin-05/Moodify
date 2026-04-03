const { Router } = require('express');
const authController = require("../controllers/auth.controller");
const { verifyUser } = require('../middlewares/auth.middleware');

const authRouter = Router();

authRouter.post("/register", authController.registerUser);

authRouter.post("/login", authController.loginUser);

authRouter.get("/get-me", verifyUser, authController.getMe);

authRouter.get("/logout", verifyUser, authController.logoutUser);

module.exports = authRouter;