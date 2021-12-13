const express = require("express");

const { login, resturantLogin } = require("./../controllers/auth");

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/resturantLogin", resturantLogin);

module.exports = authRouter;
