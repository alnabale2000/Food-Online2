const { query } = require("./../../db/db");
const connection = require("./../../db/db");

const addAddress = (req, res) => {
    const id = req.params.id;
    const { city, neighborhood, houseNumber, additionDescription } = req.body;
    const query = `
    INSERT INTO users_address (userId,city,neighborhood,house_number,additional_descreption)
    VALUES (?,?,?,?,?)`;
    const data = [id, city, neighborhood, houseNumber, additionDescription];
    connection.query(query, data, (err, result) => {
        if (err) res.json(err);
        if (!result) res.json("Delete The Old Address And Try Again");
        else {
            res.status(201).json({ city, neighborhood, houseNumber, additionDescription });
        }
    });
};

const deleteAddress = (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM users_address WHERE userId=?;`;
    const data = [id];
    connection.query(query, data, (err, result) => {
        if (err) res.json(err);
        res.json(id);
    });
};

const getAddressByUserId = async (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM users_address WHERE userId = ?;`;
    const data = [id];
    const getAddress = await connection.promise().query(query, data);
    if (!getAddress) return res.status(404).json(err);
    res.status(200).json(getAddress[0]);
};

module.exports = {
    addAddress,
    deleteAddress,
    getAddressByUserId,
};
