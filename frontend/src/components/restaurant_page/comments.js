import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setComments, addComment } from "../../reducers/comments";
import { MdOutlineSend } from "react-icons/md";

const Comments = () => {
    const id = useParams();
    const commenter = localStorage.getItem("username");
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");

    const state = useSelector((state) => {
        return {
            comments: state.comments.comments,
        };
    });
    const comments = state.comments;

    const sendComment = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:5000/comments/${id.id}`, {
                comment,
                commenter,
            })
            .then((res) => {
                dispatch(addComment(res.data));
            });
    };

    useEffect(() => {
        axios.get(`http://localhost:5000/comments/${id.id}`).then((res) => {
            dispatch(setComments(res.data));
        });
    }, []);
    return (
        <main className="comments-body">
            <div className="comments">
                {comments &&
                    comments.map((comment) => (
                        <div key={comment.id}>
                            <div className="comment">
                                <h4>By:{comment.commenter}</h4>
                                <h4>{comment.comment}</h4>
                            </div>
                        </div>
                    ))}
            </div>
            <br />
            {/* {isCommentCheck?():()} */}
            <section className="add-comment">
                <textarea
                    className="comment-text"
                    placeholder="Add A Comment"
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>

                <MdOutlineSend onClick={sendComment} className="send-comment-button" />
                {/* <button onClick={sendComment} className="send-comment-button">
                    
                </button> */}
            </section>
        </main>
    );
};

export default Comments;
