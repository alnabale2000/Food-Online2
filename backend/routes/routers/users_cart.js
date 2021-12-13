const express = require("express");

const {
    addToCart,
    getCartOrdersByUserId,
    clearCartOrders,
    clearSingleCartOrder,
    editCount,
} = require("./../controllers/users_cart");

const usersCartRouter = express.Router();

usersCartRouter.post("/resturant/addToCart/:id", addToCart);
usersCartRouter.get("/cart/:id", getCartOrdersByUserId);
usersCartRouter.delete("/cart/:id", clearCartOrders);
usersCartRouter.delete("/cart/order/:id", clearSingleCartOrder);
usersCartRouter.put("/cart/:id", editCount);

module.exports = usersCartRouter;
