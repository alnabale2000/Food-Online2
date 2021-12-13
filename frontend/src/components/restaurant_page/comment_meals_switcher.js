import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsCommentPage } from "../../reducers/switcher";
import { FaComments, FaListAlt } from "react-icons/fa";

const CommentMealsSwitcher = () => {
    const dispatch = useDispatch();

    const state = useSelector((state) => {
        return {
            isCommentPage: state.isCommentPage.isCommentPage,
        };
    });
    const isCommentPage = state.isCommentPage;

    const toComments = () => {
        dispatch(toggleIsCommentPage(true));
    };

    const toMeals = () => {
        dispatch(toggleIsCommentPage(false));
    };
    return (
        <div>
            {isCommentPage ? (
                <div className="switcher">
                    <div className="flex-box baseline black">
                        <FaListAlt className="fa-menu " />
                        <h5 onClick={toMeals} className="meals-sw">
                            Category And Meals
                        </h5>
                    </div>
                    <div className="flex-box baseline gray">
                        <FaComments className="fa-comments " />
                        <h3 onClick={toComments} className="comments-sw">
                            Comments
                        </h3>
                    </div>
                </div>
            ) : (
                <div className="switcher">
                    <div className="flex-box baseline gray">
                        <FaListAlt className="fa-menu" />
                        <h3 onClick={toMeals} className="meals-sw">
                            Category And Meals
                        </h3>
                    </div>
                    <div className="flex-box baseline black">
                        <FaComments className="fa-comments" />
                        <h5 onClick={toComments} className="comments-sw">
                            Comments
                        </h5>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentMealsSwitcher;
