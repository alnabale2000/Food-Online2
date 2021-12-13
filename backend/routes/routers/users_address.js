const express = require("express");

const { addAddress, deleteAddress, getAddressByUserId } = require("./../controllers/users_address");

const usersAddressRouter = express.Router();

usersAddressRouter.post("/addAddress/:id", addAddress);
usersAddressRouter.delete("/deleteAddress/:id", deleteAddress);
usersAddressRouter.get("/getAddress/:id", getAddressByUserId);

module.exports = usersAddressRouter;
