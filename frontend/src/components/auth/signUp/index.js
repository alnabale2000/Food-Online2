import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Button, Image } from "react-bootstrap";
import axios from "axios";

const SignUp = ({ id }) => {
    // const role = useParams().id;
    const history = useHistory();
    // let role_id;
    // role === "user" ? (role_id = 2) : role === "gym" ? (role_id = 4) : (role_id = 3);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    async function addNewUser() {
        try {
            const newUser = {
                username,
                email,
                password,
                phoneNumber,
            };
            //client validation
            if (!username || !phoneNumber || !email || !password) {
                setMessage("Please fill all the info");
            } else {
                await axios.post("http://localhost:5000/users", newUser).then((response) => {
                    console.log("response", response);
                    if (response) {
                        setMessage("The user has been created successfully ");
                        setTimeout(function () {
                            history.push("/login");
                        }, 2000);
                    } else {
                        setMessage("Error happened while register, please try again");
                    }
                });
            }
        } catch (error) {
            setMessage("Error 5000 happened while register, please try again");
            throw error;
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addNewUser();
    };

    return (
        <main className="login-body">
            <div className="login-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="user-box">
                        <input type="text" onChange={(e) => setUsername(e.target.value)} required />
                        <label>Username</label>
                    </div>
                    <div className="user-box">
                        <input
                            type="text"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                        <label>Phone Number</label>
                    </div>
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
                        Already Have An Account?
                        <span
                            className="c-link"
                            onClick={() => {
                                history.push("/login");
                            }}
                        >
                            login
                        </span>
                    </p>
                </form>
            </div>
        </main>
    );
};

export default SignUp;

{
    /* <div className="SignUp1">
    {
        <div className="container1S">
            <Form onSubmit={handelSubmit}>
                <h2 className="TextStyle"> SignUp </h2>
                <Form.Group size="lg" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="formCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Phone Number"
                        name="phonenumber"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Button
                        className="marg styleButton1"
                        size="lg"
                        variant="outline-dark"
                        type="submit"
                    >
                        SignUp
                    </Button>
                </Form.Group>
                <div className="tostMassage">
                    <Form.Label>{message && <div>{message}</div>}</Form.Label>
                </div>
            </Form>
        </div>
    }
</div>; */
}
