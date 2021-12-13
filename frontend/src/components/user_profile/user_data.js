import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setUserData } from "../../reducers/users";
import { FaPen, FaRegWindowClose } from "react-icons/fa";

const UserData = () => {
    const id = localStorage.getItem("id");

    const history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state) => {
        return {
            user: state.user.user,
        };
    });
    const user = state.user[0];
    const [newEmail, setNewEmail] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    // const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const [input, setInput] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${id}`).then((res) => {
            dispatch(setUserData(res.data));
        });
    }, []);

    const edit = async (e) => {
        const email = newEmail ? newEmail : user.email;
        const username = newUsername ? newUsername : user.username;
        const password = newPassword ? newPassword : user.pass;
        const phoneNumber = newPhoneNumber ? newPhoneNumber : user.phoneNumber;

        console.log("password", password);

        axios
            .put(`http://localhost:5000/user/${id}/change_email`, {
                email,
                username,
                password,
                phoneNumber,
            })
            .then((res) => {
                dispatch(setUserData({ email, username, password, phoneNumber }));

                setTimeout(() => {
                    setInput(false);
                }, 3000);
            });
    };

    return (
        <>
            {user && (
                <section id="info">
                    <h2 className="welcome-text">Welcome {user.username}</h2>
                    {input ? (
                        <form>
                            <div className="user-info-inputs flex-box space-b">
                                <div>
                                    <div>
                                        <label>Username </label>
                                        <br />
                                        <input
                                            type="text"
                                            defaultValue={user.username}
                                            onChange={(e) => setNewUsername(e.target.value)}
                                            className="meal-input"
                                        />
                                    </div>
                                    <br />

                                    <div>
                                        <label>Email </label>
                                        <br />

                                        <input
                                            type="email"
                                            defaultValue={user.email}
                                            onChange={(e) => setNewEmail(e.target.value)}
                                            className="meal-input"
                                        />
                                    </div>
                                    <br />

                                    <div>
                                        <label>Phone Number </label>
                                        <br />

                                        <input
                                            type="text"
                                            defaultValue={user.phoneNumber}
                                            onChange={(e) =>
                                                setNewPhoneNumber(Number(e.target.value))
                                            }
                                            className="meal-input"
                                        />
                                    </div>
                                    <br />

                                    <div>
                                        {/* <label>Confirm Password : </label>
                                <input
                                    type="password"
                                    onChange={(e) => {
                                        setOldPassword(e.target.value);
                                    }}
                                /> */}
                                        <label>New Password </label>
                                        <br />

                                        <input
                                            type="password"
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="meal-input"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="user-info-buttons flex-box baseline space-b ">
                                <button type="submit" onClick={edit} className="btn btn-secondary">
                                    Confirm Edit
                                </button>
                                <div
                                    onClick={() => {
                                        setInput(false);
                                    }}
                                    className="cancel-b"
                                >
                                    <p>Cancel</p>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="user-info-box flex-box space-b baseline">
                            <div className="user-info">
                                <h5>Username : {user.username}</h5>
                                <h5>email : {user.email}</h5>
                                <h5>Phone Number : {user.phoneNumber}</h5>
                            </div>
                            <FaPen
                                className="edit-info-button"
                                onClick={() => {
                                    setInput(true);
                                }}
                            />
                        </div>
                    )}
                </section>
            )}
        </>
    );
};

export default UserData;
