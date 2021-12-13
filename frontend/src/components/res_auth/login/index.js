import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import axios from "axios";
import { setToken, setStatus } from "../../../reducers/login";
import { Form, Button } from "react-bootstrap";

const RestaurantLogin = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const state = useSelector((state) => {
        return {
            token: state.loginReducer.token,
            user: state.loginReducer.user,
        };
    });

    useEffect(() => {}, []);

    //this function to handle the submitted form
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/resturantLogin", { email, password })
            .then((result) => {
                const user = jwt.decode(result.data["token"]);

                if (result) {
                    dispatch(setToken({ token: result.data["token"], user }));
                    localStorage.setItem("token", result.data["token"]);
                    localStorage.setItem("id", user.id);
                    localStorage.setItem("type", user.type);
                    setMessage("The user has been loggedIn successfully ");

                    if (user.type === "user") {
                        history.push("/");
                    } else {
                        history.push(`/categories_&_meals/${user.id}`);
                        dispatch(setStatus(true));
                    }
                } else {
                    setMessage("Error happened while login, please try again");
                }
            })
            .catch((err) => {
                setMessage("Password or Email is incorrect");
            });
    };
    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    };

    return (
        <main className="login-body">
            <div className="login-box">
                <h2>Login As Restaurant</h2>
                <form onSubmit={handleSubmit}>
                    <div className="user-box">
                        <input type="email" onChange={(e) => setEmail(e.target.value)} required />
                        <label>Email</label>
                    </div>
                    <div className="user-box">
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label>Password</label>
                    </div>
                    <a onClick={handleSubmit}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </a>
                    <p className="footer-login-text">{message} </p>
                    <p className="footer-login-text">
                        Want to start your career?
                        <span
                            className="c-link"
                            onClick={() => {
                                history.push("/restaurant_register");
                            }}
                        >
                            Create Restaurant
                        </span>
                    </p>
                </form>
            </div>
        </main>
    );
};

export default RestaurantLogin;
