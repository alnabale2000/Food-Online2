const { query } = require("./../../db/db");
const connection = require("./../../db/db");

const sendOrderToResturant = async (req, res) => {
    const id = req.params.id;
    const date = new Date();

    console.log("sended");
    const {
        mealName,
        mealPrice,
        Qty,
        totalPrice,
        city,
        neighborhood,
        houseNumber,
        additionDescription,
        username,
        phoneNumber,
        resturant_id,
    } = req.body;

    const query = `INSERT INTO orders ( mealName,
        mealPrice,
        Qty,
        totalPrice,
        orderDateTime,
        city,
        neighborhood,
        house_number,
        additional_descreption,
        username,
        phone_number,
        resturant_id,
        userId)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);`;
    console.log(
        mealName,
        mealPrice,
        Qty,
        totalPrice,
        date,
        city,
        neighborhood,
        houseNumber,
        additionDescription,
        username,
        phoneNumber,
        resturant_id,
        id
    );
    const data = [
        mealName,
        mealPrice,
        Qty,
        totalPrice,
        date,
        city,
        neighborhood,
        houseNumber,
        additionDescription,
        username,
        phoneNumber,
        resturant_id,
        id,
    ];

    // const addOrder = await connection.promise().query(query, data);
    // if (!addOrder) return res.status(404).json(err);
    // res.status(201).json(addOrder[0]);
    connection.query(query, data, (err, result) => {
        console.log("result", result);
        if (err) return res.status(404).json(err);
        res.status(201).json("Order Sent");
    });
};

const getOrdersByLoggedInUserId = async (req, res) => {
    const id = req.params.id;
    const query = `
    SELECT orders.id,orders.mealName,
    orders.mealPrice,orders.totalPrice,orders.Qty,
    orders.additional_descreption,orders.userId,orders.resturant_id ,
    resturants.resturantName
    FROM orders INNER JOIN resturants ON orders.resturant_id = resturants.id WHERE userId=?`;
    const data = [id];

    const getOrders = await connection.promise().query(query, data);
    if (!getOrders) return res.status(404).json(err);
    res.status(201).json(getOrders[0]);
};

const rateRestaurant = async (req, res) => {
    const { rate, resturant_id, rater_id } = req.body;
    const query = `INSERT INTO rates(rater_id,rate,resturant_id)VALUES (?,?,?);`;
    const data = [rater_id, rate, resturant_id];
    connection.query(query, data, (err, result) => {
        if (err) return res.status(404).json(err);
        res.status(201).json(resturant_id);
    });
};

const getOrdersByResId = (req, res) => {
    const id = req.params.id;
    const query = `
    SELECT * FROM orders 
    WHERE resturant_id=? 
    ORDER BY orderDateTime ASC;`;
    const data = [id];
    connection.query(query, data, (err, result) => {
        if (err) return res.status(404).json(err);
        res.status(200).json(result);
    });
};

const deleteOrder = (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM orders WHERE id =?;`;
    const data = [id];
    connection.query(query, data, (err, result) => {
        if (err) return res.status(404).json(err);
        res.status(200).json(id);
    });
};

const CheckRate = async (req, res) => {
    const rater_id = req.params.id;
    console.log("rater_id", rater_id);

    const query = `SELECT resturant_id FROM rates WHERE rater_id=1 ;`;
    const data = [rater_id];
    const check = await connection.promise().query(query, data);
    if (!check) return res.status(404).json(err);
    const arr = [];
    check[0].map((element) => {
        arr.push(element.resturant_id);
    });
    console.log("arr", arr);
    res.status(200).json(arr);
};

module.exports = {
    sendOrderToResturant,
    getOrdersByLoggedInUserId,
    rateRestaurant,
    getOrdersByResId,
    deleteOrder,
    CheckRate,
};
