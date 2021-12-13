const { query } = require("./../../db/db");
const connection = require("./../../db/db");

const addCategory = (req, res) => {
    const id = req.params.id;
    const categoryName = req.body.categoryName;
    const query = `INSERT INTO categories (categoryName,resturant_id)VALUES (?,?) ;`;
    const data = [categoryName, id];
    connection.query(query, data, (err, result) => {
        if (err) res.status(404).json(err);
        console.log("res", result);
        res.status(201).json([categoryName, id]);
    });
};

const getCategoriesByResturantId = (req, res) => {
    const id = req.params.id;
    const query = `
    SELECT * FROM categories 
    WHERE resturant_id =?;
    `;
    const data = [id];

    connection.query(query, data, (err, result) => {
        res.status(200).json(result);
    });
};

const getCategoriesByResturantId2 = async (req, res) => {
    const id = req.params.id;
    console.log("id", id);
    const query = `
    SELECT categories.id,categories.categoryName,
    categories.resturant_id,
    meals.mealName,meals.price,meals.mealImage,meals.details
    FROM categories INNER JOIN meals 
    ON categories.id = meals.category_id
    WHERE categories.resturant_id=?`;
    const data = [id];

    const getOrders = await connection.promise().query(query, data);
    if (!getOrders) return res.status(404).json(err);
    console.log("getOrders[0]", getOrders[0]);
    res.status(201).json(getOrders[0]);
};

const getMealsByCategoryId = (req, res) => {
    const id = req.params.id;
    const query = `
    SELECT * FROM meals 
    WHERE category_id=?
    ;
    `;
    const data = [id];

    connection.query(query, data, (err, result) => {
        res.status(200).json(result);
    });
};

const deleteCategory = (req, res) => {
    const id = req.body.categoryId;
    console.log("id ", id);

    const query = `DELETE categories , meals  FROM categories  INNER JOIN meals  
    WHERE categories.id = meals.category_id AND categories.id =? `;

    const data = [id];
    connection.query(query, data, (err, result) => {
        if (err) res.status(404).json(err);
        res.json([id, result]);
    });
};
module.exports = {
    addCategory,
    getCategoriesByResturantId,
    getMealsByCategoryId,
    deleteCategory,
    getCategoriesByResturantId2,
};
