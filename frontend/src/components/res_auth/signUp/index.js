import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Button, Image } from "react-bootstrap";
import axios from "axios";

const RestaurantSignUp = ({ id }) => {
    // const role = useParams().id;
    const history = useHistory();
    // let role_id;
    // role === "user" ? (role_id = 2) : role === "gym" ? (role_id = 4) : (role_id = 3);
    const [resturantName, setResturantName] = useState("");
    const [resturantImage, setResturantImage] = useState("");
    const [adress, setAdress] = useState("");
    const [plates, setPlates] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function addNewRestaurant() {
        try {
            const newRestaurant = {
                resturantImage,
                resturantName,
                adress,
                plates,
                phoneNumber,
                email,
                password,
            };
            //client validation
            if (!resturantName || !phoneNumber || !email || !password || !plates || !adress) {
                setMessage("Please fill all the info");
            } else {
                await axios
                    .post("http://localhost:5000/resturants", newRestaurant)
                    .then((response) => {
                        console.log("response", response);
                        if (response) {
                            setMessage("The user has been created successfully ");
                            setTimeout(function () {
                                history.push("/restaurant_login");
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
        addNewRestaurant();
    };

    return (
        <main className="login-body">
            <div className="login-box rr">
                <h2>Create Restaurant</h2>
                <form onSubmit={handleSubmit}>
                    <div className="user-box">
                        <input
                            type="text"
                            onChange={(e) => setResturantImage(e.target.value)}
                            required
                        />
                        <label>Restaurant Image Url</label>
                    </div>
                    <div className="user-box">
                        <input
                            type="text"
                            onChange={(e) => setResturantName(e.target.value)}
                            required
                        />
                        <label>Restaurant Name</label>
                    </div>
                    <div className="user-box">
                        <input type="text" onChange={(e) => setAdress(e.target.value)} required />
                        <label>Address</label>
                    </div>
                    <div className="user-box">
                        <input type="text" onChange={(e) => setPlates(e.target.value)} required />
                        <label>Restaurant Plates</label>
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
                        don't have an account?
                        <span
                            className="c-link"
                            onClick={() => {
                                history.push("/register");
                            }}
                        >
                            Create Account here
                        </span>
                    </p>
                </form>
            </div>
        </main>
    );
};

export default RestaurantSignUp;

{
    /* <div className="SignUp1">
    {
        <div className="container1S">
            <Form onSubmit={handelSubmit}>
                <h2 className="TextStyle"> SignUp </h2>
                <Form.Group size="lg" controlId="formFirstName">
                    <Form.Label>Restaurant Image</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Restaurant Image url"
                        onChange={(e) => setResturantImage(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group size="lg" controlId="formFirstName">
                    <Form.Label>Restaurant Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Restaurant Name"
                        onChange={(e) => setResturantName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="formCountry">
                    <Form.Label>Address </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Restaurant Location"
                        onChange={(e) => setAdress(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="formEmail">
                    <Form.Label>Restaurant Plates</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="(Burger,Zinger And Pizza etc..)"
                        onChange={(e) => setPlates(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="formEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        placeholder="Phone Number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
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
