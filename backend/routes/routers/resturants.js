const express = require("express");

const {
    createNewResturant,
    getAllResturants,
    searchByName,
    getNewAddedResturant,
    getResturantDataById,
    getTotalRate,
} = require("./../controllers/resturants");

const ResturantsRouter = express.Router();

ResturantsRouter.post("/resturants", createNewResturant);
ResturantsRouter.get("/resturants/:timeSort/:rateFilter", getAllResturants);
ResturantsRouter.get("/resturants/:name", searchByName);
ResturantsRouter.get("/", getNewAddedResturant);
ResturantsRouter.get("/resturant/:id", getResturantDataById);
ResturantsRouter.get("/resturant/:id/rate", getTotalRate);

module.exports = ResturantsRouter;
