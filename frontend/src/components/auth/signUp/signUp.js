import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CardDeck, Card, Button } from "react-bootstrap";
import axios from "axios";
import "./signUp.css";
import SignUp from "./index";

const BeforeSignUp = () => {
    const [state, setState] = useState("");
    const history = useHistory();
    localStorage.setItem("status", state);

    const stateForSignUp = async (e) => {
        await setState(e.target.value);
        history.push(`/register/${e.target.value}`);
    };

    const stateForSignUpImages = async (e) => {
        await setState(e.target.alt);
        history.push(`/register/${e.target.alt}`);
    };

    return (
        <div className="SignUpSelect">
            <h2 className="RegisterSelectSignUp"> Join us </h2>
            <CardDeck
                className=" CardDeckMarg row row-cols-1 row-cols-md-3"
                style={{ width: "65rem" }}
            >
                <div className="col mb-1 style">
                    <Card className="h-10 Shadow">
                        <Card.Img
                            variant="top"
                            className="imageCard pointer"
                            src="https://i.ibb.co/2SjTSgD/man-2.png"
                            alt="user"
                            rounded
                            onClick={stateForSignUpImages}
                        />
                        <Card.Body className="card-body">
                            <Card.Title className="card-title">User</Card.Title>
                            <Card.Text className="card-text">
                                register in our private subscriptions to get the best experience
                                with our professional coaches at Elite Gyms.
                            </Card.Text>
                            <Button
                                variant="outline-dark"
                                className="buttonStyleHome"
                                value="user"
                                onClick={stateForSignUp}
                            >
                                join{" "}
                            </Button>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted ">+900 Users</small>
                        </Card.Footer>
                    </Card>
                </div>
                <div className="col mb-1 style">
                    <Card className="h-10 Shadow">
                        <Card.Img
                            variant="top"
                            className="imageCard pointer c"
                            src="https://i.ibb.co/sKdMB2g/coach-1.png"
                            alt="coach"
                            rounded
                            onClick={stateForSignUpImages}
                        />
                        <Card.Body>
                            <Card.Title>Coach</Card.Title>
                            <Card.Text>
                                join our team of the top professional coaches and enjoy the
                                flexibility of working hours with many benefits more.
                            </Card.Text>
                            <Button
                                variant="outline-dark"
                                className="buttonStyleHome"
                                value="coach"
                                onClick={stateForSignUp}
                            >
                                join{" "}
                            </Button>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted ">+90 Coach</small>
                        </Card.Footer>
                    </Card>
                </div>
                <div className="col mb-1 style">
                    <Card className="h-10 Shadow">
                        <Card.Img
                            variant="top"
                            className="imageCard pointer c"
                            src="https://i.ibb.co/Bz92vLs/gym-3.png"
                            alt="gym"
                            rounded
                            onClick={stateForSignUpImages}
                        />
                        <Card.Body>
                            <Card.Title>Gym</Card.Title>
                            <Card.Text>
                                register with us as a gym to join the best group of top professional
                                Gyms. Beside that you can enjoy the marketing services.
                            </Card.Text>
                            <Button
                                variant="outline-dark"
                                className="buttonStyleHome"
                                value="gym"
                                onClick={stateForSignUp}
                            >
                                join{" "}
                            </Button>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted ">+10 Gyms</small>
                        </Card.Footer>
                    </Card>
                </div>
            </CardDeck>
        </div>
    );
};
export default BeforeSignUp;
