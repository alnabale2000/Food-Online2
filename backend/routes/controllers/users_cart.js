const { query } = require("./../../db/db");
const connection = require("./../../db/db");

const addToCart = (req, res) => {
    const id = req.params.id;
    const { userId, mealName, Qty, price } = req.body;
    const query0 = `SELECT resturant_id FROM users_cart WHERE userId=?;`;
    const data0 = [userId];

    const addOrder = () => {
        const query = `INSERT INTO users_cart(userId,resturant_id,mealName,Qty,price)VALUES (?,?,?,?,?);`;
        const data = [userId, id, mealName, Qty, price];

        connection.query(query, data, (err, result) => {
            if (err) res.json(err);
            res.status(201).json("Order Added");
        });
    };

    connection.query(query0, data0, (err, result) => {
        if (!result[0]) {
            addOrder();
        } else if (result[0].resturant_id != id)
            res.json("Cant Add Order(clear the latest orders from your cart)");
        else {
            addOrder();
        }
    });
};

const getCartOrdersByUserId = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM users_cart WHERE userId =?`;
    const data = [id];

    connection.query(query, data, (err, result) => {
        if (err) console.log(err);
        res.status(200).json(result);
    });
};

const clearCartOrders = (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM users_cart WHERE userId=?;`;
    const data = [id];
    connection.query(query, data, (err, result) => {
        if (err) console.log(err);
        res.json("Cart Clear Successfully");
    });
};

const clearSingleCartOrder = (req, res) => {
    console.log("t");
    const id = req.params.id;
    console.log("id", id);
    const query = `DELETE FROM users_cart WHERE id =?;`;
    const data = [id];
    connection.query(query, data, (err, result) => {
        if (err) console.log(err);
        res.json(id);
    });
};

const editCount = (req, res) => {
    const id = req.params.id;
    const Qty = req.body.Qty;
    const query = `UPDATE users_cart SET Qty=? WHERE id=?;`;
    const data = [Qty, id];
    connection.query(query, data, (err, result) => {
        const query0 = `SELECT * FROM users_cart WHERE id=?`;
        const data0 = [id];
        connection.query(query0, data0, (err, result) => {
            if (err) res.status(404).json(err);
            console.log("result", result);
            res.status(201).json(result);
        });
    });
};

module.exports = {
    addToCart,
    getCartOrdersByUserId,
    clearCartOrders,
    clearSingleCartOrder,
    editCount,
};
