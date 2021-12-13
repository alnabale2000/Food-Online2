const express = require("express");

const {
    sendOrderToResturant,
    getOrdersByLoggedInUserId,
    rateRestaurant,
    getOrdersByResId,
    deleteOrder,
    CheckRate,
} = require("./../controllers/orders");

const ordersRouter = express.Router();

ordersRouter.post("/cart/:id/send_order", sendOrderToResturant);
ordersRouter.get("/orders/:id", getOrdersByLoggedInUserId);
ordersRouter.post("/rate", rateRestaurant);
ordersRouter.post("/check_rates/:id", CheckRate);
ordersRouter.get("/resturant/:id/orders", getOrdersByResId);
ordersRouter.delete("/resturant/:id/orders", deleteOrder);

module.exports = ordersRouter;
