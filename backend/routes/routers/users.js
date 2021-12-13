const express = require("express");

const { createNewAccount, getUserData, editEmailAndPass } = require("./../controllers/users");

const usersRouter = express.Router();

usersRouter.post("/users", createNewAccount);
usersRouter.get("/users/:id", getUserData);
usersRouter.put("/user/:id/change_email", editEmailAndPass);

module.exports = usersRouter;
