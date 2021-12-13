const express = require("express");

const {
    addComment,
    getCommentsByResturantId,
    checkComments,
} = require("./../controllers/comments");

const commentsRouter = express.Router();

commentsRouter.post("/comments/:id", addComment);
commentsRouter.get("/comments/:id", getCommentsByResturantId);
commentsRouter.post("/check_comments/:id", checkComments);

module.exports = commentsRouter;
