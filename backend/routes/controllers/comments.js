const { query } = require("./../../db/db");
const connection = require("./../../db/db");

const addComment = (req, res) => {
    const id = req.params.id;
    const { comment, commenter } = req.body;
    const query = `INSERT INTO comments (comment,commenter,resturant_id)VALUES (?,?,?);`;
    const data = [comment, commenter, id];
    connection.query(query, data, (err, result) => {
        if (err) res.status(404).json(err);
        res.status(201).json({
            comment: comment,
            commenter: commenter,
        });
    });
};
const getCommentsByResturantId = (req, res) => {
    const id = req.params.id;
    const query = `
    SELECT comment,commenter
    FROM comments
    WHERE resturant_id=?
    
    ;`;
    const data = [id];
    connection.query(query, data, (err, result) => {
        if (err) console.log(err);
        res.status(201).json(result);
    });
};

const checkComments = async (req, res) => {
    const rater_id = req.params.id;
    console.log("rater_id", rater_id);

    const query = `SELECT resturant_id FROM comments WHERE rater_id=? ;`;
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
    addComment,
    getCommentsByResturantId,
    checkComments,
};
