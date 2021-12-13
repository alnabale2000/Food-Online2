const { query } = require("./../../db/db");
const connection = require("./../../db/db");

const addMeal = (req, res) => {
    const { categoryId, mealName, mealImage, price, details } = req.body;
    const query = `
    INSERT INTO meals (category_id,mealName,mealImage,price,details)
    VALUES (?,?,?,?,?);`;
    const data = [categoryId, mealName, mealImage, price, details];
    connection.query(query, data, (err, result) => {
        if (err) return res.status(404).json(err);
        res.status(201).json([categoryId, mealName, mealImage, price, details]);
    });
};

const deleteMeal = (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM meals WHERE id =?;`;
    const data = [id];
    connection.query(query, data, (err, result) => {
        if (err) res.status(404).json(err);
        console.log(result);
        res.json(id);
    });
};

module.exports = {
    addMeal,
    deleteMeal,
};
