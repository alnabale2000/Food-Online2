import React from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setToken } from "../../../reducers/login";

const ResSideNavigation = () => {
    // const user = jwt.decode(localStorage.getItem("token"));

    const dispatch = useDispatch();

    const loggedOut = () => {
        localStorage.clear();
        dispatch(setToken({ token: "" }));
        history.push("/");
    };

    const history = useHistory();
    return (
        <section className="side-nav">
            <a href="#add_category" className="side-nav-link">
                Add Category
            </a>
            <a href="#add_meal" className="side-nav-link">
                Add Meal
            </a>
            <a href="#delete" className="side-nav-link">
                Delete Section
            </a>
            <a onClick={loggedOut} className="side-nav-link">
                LogOut
            </a>
        </section>
    );
};
export default ResSideNavigation;
