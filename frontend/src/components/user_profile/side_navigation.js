import React from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setToken } from "../../reducers/login";
import jwt from "jsonwebtoken";

const SideNavigation = () => {
    const user = jwt.decode(localStorage.getItem("token"));

    const dispatch = useDispatch();

    const loggedOut = () => {
        localStorage.clear();
        dispatch(setToken({ token: "", user }));
        history.push("/");
    };

    const history = useHistory();

    return (
        <section className="side-nav">
            <a href="#info" className="side-nav-link">
                Account {"   "}
            </a>
            <a href="#orders" className="side-nav-link">
                My Orders{" "}
            </a>
            <a href="#address" className="side-nav-link">
                Address
            </a>
            <a onClick={loggedOut} className="side-nav-link">
                LogOut
            </a>
        </section>
    );
};
export default SideNavigation;
