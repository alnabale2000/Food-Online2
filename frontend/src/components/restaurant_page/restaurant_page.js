import React from "react";
import Header from "./header";
import CategoriesAndMeals from "./categories&meals";
import LiveChat from "./livechat";
import CommentMealsSwitcher from "./comment_meals_switcher";
import { useSelector } from "react-redux";
import Comments from "./comments";

const RestaurantPage = () => {
    const state = useSelector((state) => {
        return {
            isCommentPage: state.isCommentPage.isCommentPage,
        };
    });
    const isCommentPage = state.isCommentPage;
    return (
        <main className="res-main">
            <section className="res-body">
                <Header />
                <CommentMealsSwitcher />
                {isCommentPage ? (
                    <div>
                        <Comments />
                    </div>
                ) : (
                    <div className="main-page-body">
                        <CategoriesAndMeals />
                    </div>
                )}
            </section>
            <LiveChat />
        </main>
    );
};

export default RestaurantPage;
