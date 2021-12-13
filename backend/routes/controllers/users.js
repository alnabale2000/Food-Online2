const connection = require("./../../db/db");
const bcrypt = require("bcrypt");

const createNewAccount = async (req, res) => {
    const { username, email, password, phoneNumber } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO users(username,email,pass,phoneNumber) VALUES (?,?,?,?);`;
        const data = [username, email.toLowerCase(), hashedPassword, phoneNumber];

        connection.query(query, data, (err, result) => {
            if (err) res.status(404).json(err);
            res.status(201).json("User Added");
        });
    } catch (error) {
        console.log(error);
        res.status(404).json("Failed to create Account");
    }
};

const getUserData = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM users WHERE userId=?;`;
    const data = [id];
    connection.query(query, data, (err, result) => {
        if (err) res.status(404).json(err);
        res.status(200).json(result);
    });
};

const editEmailAndPass = async (req, res) => {
    const id = req.params.id;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;
    // const confirmedPass = req.body.confirmedPass;

    const hashedPassword = password.length > 40 ? password : await bcrypt.hash(password, 10);
    const query = `UPDATE users SET username=?, email=?,pass=?,phoneNumber=? WHERE userId =?`;
    const data = [username, email, hashedPassword, phoneNumber, id];
    connection.query(query, data, (err, result) => {
        if (err) res.status(404).json(err);
        res.status(200).json(result);
    });
};

module.exports = {
    createNewAccount,
    getUserData,
    editEmailAndPass,
};
