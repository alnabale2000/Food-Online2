const { query } = require("../../db/db");
const connection = require("../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT userId,email,pass,username FROM users WHERE email =?;`;
    const data = [email];

    connection.query(query, data, async (err, result) => {
        try {
            const email = result[0].email;
        } catch (error) {
            res.status(403).json("The email doesn't exist");
        }

        const username = result[0].username;
        const pass = result[0].pass;
        const id = result[0].userId;

        const valid = await bcrypt.compare(password, pass);
        if (valid) {
            const payload = {
                userId: id,
                username: username,
                type: "user",
            };

            const options = {
                expiresIn: "60m",
            };

            return res.status(200).json({ token: jwt.sign(payload, process.env.SECRET, options) });
        }
        console.log("err", err);

        res.status(403).json("The password you’ve entered is incorrect");
    });
};

const resturantLogin = async (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT id,email,pass FROM resturants WHERE email =?;`;
    const data = [email];

    connection.query(query, data, async (err, result) => {
        try {
            const email = result[0].email;
        } catch (error) {
            res.status(403).json("The email doesn't exist");
        }
        const pass = result[0].pass;
        const id = result[0].id;
        const valid = await bcrypt.compare(password, pass);
        if (valid) {
            const payload = {
                id: id,
                type: "restaurant",
            };

            const options = {
                expiresIn: "60m",
            };

            return res.status(200).json({ token: jwt.sign(payload, process.env.SECRET, options) });
        }
        console.log("err", err);

        res.status(403).json("The password you’ve entered is incorrect");
    });
};

module.exports = {
    login,
    resturantLogin,
};
