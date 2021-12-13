const express = require("express");

const {
    addCategory,
    getCategoriesByResturantId,
    getMealsByCategoryId,
    deleteCategory,
    getCategoriesByResturantId2,
} = require("./../controllers/categories");

const categoriesRouter = express.Router();

categoriesRouter.post("/addCategory/:id", addCategory);
categoriesRouter.get("/categories/:id", getCategoriesByResturantId2);
categoriesRouter.get("/categories/meals/:id", getMealsByCategoryId);
categoriesRouter.post("/delete_category", deleteCategory);

module.exports = categoriesRouter;
