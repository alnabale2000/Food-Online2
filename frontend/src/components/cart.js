import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserCart, deleteSingleOrderCart, updateOrder } from "../reducers/user_cart";
import { addAddress, setAddress } from "./../reducers/address";
import { setUserData } from "./../reducers/users";
import { FaRegPlusSquare, FaArchive, FaRegMinusSquare, FaTrashAlt, FaPlus } from "react-icons/fa";
import Popup from "reactjs-popup";
import CustomPopup from "./popup";

import "reactjs-popup/dist/index.css";

const Cart = () => {
    const id = localStorage.getItem("id");
    const [city, setCity] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [additionDescription, setAdditionDescription] = useState("");
    const [message, setMessage] = useState("");

    const [visibility, setVisibility] = useState(false);

    const popupCloseHandler = (e) => {
        setVisibility(e);
    };

    const dispatch = useDispatch();
    const history = useHistory();

    let totalPrice = 0;

    const state = useSelector((state) => {
        return {
            userCartOrders: state.userCart.userCart,
            address: state.address.address,
            user: state.user.user,
        };
    });
    const orders = state.userCartOrders;
    const address = state.address[0];
    const user = state.user[0];

    useEffect(() => {
        axios.get(`http://localhost:5000/cart/${id}`).then((res) => {
            dispatch(setUserCart(res.data));
        });

        axios.get(`http://localhost:5000/getAddress/${id}`).then((res) => {
            dispatch(setAddress(res.data));
        });

        axios.get(`http://localhost:5000/users/${id}`).then((res) => {
            dispatch(setUserData(res.data));
        });
    }, []);

    const deleteAddress = () => {
        axios.delete(`http://localhost:5000/deleteAddress/${id}`);
        dispatch(setAddress([]));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`http://localhost:5000/addAddress/${id}`, {
                city,
                neighborhood,
                houseNumber,
                additionDescription,
            })
            .then((res) => {
                console.log("res.data", res.data);
                dispatch(addAddress(res.data));
            });
    };

    const sendOrder = () => {
        try {
            console.log("pressed");
            orders.map((order) => {
                const mealName = order.mealName;
                const Qty = order.Qty;
                const mealPrice = order.price;
                const totalPrice = mealPrice * Qty;
                const resturant_id = order.resturant_id;
                const username = user.username;
                const phoneNumber = user.phoneNumber;
                const city = address.city;
                const neighborhood = address.neighborhood;
                const houseNumber = address.house_number;
                const additionDescription = address.additional_descreption;

                axios
                    .post(`http://localhost:5000/cart/${id}/send_order`, {
                        mealName,
                        Qty,
                        mealPrice,
                        totalPrice,
                        city,
                        neighborhood,
                        houseNumber,
                        additionDescription,
                        username,
                        phoneNumber,
                        resturant_id,
                    })
                    .then((res) => {
                        console.log("res.data", res.data);
                        if (res.data) {
                        }
                    });
            });
            setMessage("order sent sucssefully");
            setTimeout(() => {
                history.push("/");
            }, 2500);
            axios.delete(`http://localhost:5000/cart/${id}`);
            console.log("after");
        } catch (error) {
            console.log("error", error);
            setMessage("pleas fill all the requierd data");
        }
    };

    const deleteOrder = (id) => {
        console.log("id", id);
        axios.delete(`http://localhost:5000/cart/order/${id}`).then((res) => {
            dispatch(deleteSingleOrderCart(Number(res.data)));
        });
    };

    const editCount = (id, Qty) => {
        if (Qty > 0) {
            axios
                .put(`http://localhost:5000/cart/${id}`, {
                    Qty,
                })
                .then((res) => {
                    dispatch(updateOrder(res.data));
                });
        }
    };

    const clear = () => {
        axios.delete(`http://localhost:5000/cart/${id}`).then((res) => {
            console.log("res.data", res.data);
            dispatch(setUserCart([]));
        });
    };

    const getTotalPrice = (price) => {
        totalPrice += price;
        console.log("price", totalPrice);
    };
    return (
        <main className="cart-body">
            <div className="cart-box">
                <div className="top-meals-box-text flex-box space-b">
                    <h3>Order Meals</h3>
                    <FaTrashAlt onClick={clear} className="clear-cart" />
                </div>
                <div className="order-meals">
                    {orders.length === 0 ? (
                        <h2>No Orders Yet.</h2>
                    ) : (
                        <div>
                            <header className="bla flex-box space-b">
                                <p className="cart-meal-name-h ">Meals</p>
                                <p className="qty-h ">Qty</p>
                                <p className="cart-price-text-h ">Price</p>
                                <p className="clear-cart-h ">R </p>
                            </header>
                            <div className="cart-meals-box">
                                {orders.map((order) => (
                                    <div key={order.id}>
                                        {getTotalPrice(order.price * order.Qty)}

                                        <div className="cart-order flex-box space-b">
                                            <p className="cart-meal-name">{order.mealName}</p>
                                            <div className="qty">
                                                <FaRegPlusSquare
                                                    className="modify-qty plus"
                                                    onClick={() => {
                                                        editCount(order.id, order.Qty + 1);
                                                    }}
                                                />
                                                <p className="qty-text">{order.Qty}</p>
                                                <FaRegMinusSquare
                                                    className="modify-qty minus"
                                                    onClick={() => {
                                                        editCount(order.id, order.Qty - 1);
                                                    }}
                                                />
                                            </div>
                                            <p className="cart-price-text">
                                                {(order.price * order.Qty).toFixed(2)}
                                            </p>
                                            <FaTrashAlt
                                                className="clear-cart"
                                                onClick={() => {
                                                    deleteOrder(order.id);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <br />
            <div className="cart-box">
                <div className="top-meals-box-text flex-box space-b baseline">
                    <h3>Address</h3>
                    {address ? (
                        <div onClick={deleteAddress}>
                            <FaTrashAlt className="clear-cart" />
                        </div>
                    ) : (
                        <div id="address">
                            <FaPlus
                                onClick={(e) => setVisibility(!visibility)}
                                className="add-address-button flex-box baseline space-b"
                            />

                            <CustomPopup
                                onClose={popupCloseHandler}
                                show={visibility}
                                title="Add Address"
                            >
                                <form>
                                    <div className="pop-up-content">
                                        <div className="user-info-inputs flex-box space-b">
                                            <div>
                                                <div>
                                                    <label>City </label>
                                                    <br />
                                                    <input
                                                        type="text"
                                                        placeholder="Amman,Zarqa,etc..."
                                                        onChange={(e) => setCity(e.target.value)}
                                                        className="meal-input"
                                                    />
                                                </div>
                                                <br />

                                                <div>
                                                    <label>Neighborhood </label>
                                                    <br />

                                                    <input
                                                        type="text"
                                                        placeholder="Marka-Masjed Alqouds"
                                                        onChange={(e) =>
                                                            setNeighborhood(e.target.value)
                                                        }
                                                        className="meal-input"
                                                    />
                                                </div>
                                                <br />

                                                <div>
                                                    <label>House Number </label>
                                                    <br />

                                                    <input
                                                        type="text"
                                                        placeholder="Your House Number"
                                                        onChange={(e) =>
                                                            setHouseNumber(Number(e.target.value))
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
                                                    <label>More Details</label>
                                                    <br />
                                                    <input
                                                        type="text"
                                                        placeholder="ex:After The mini-market go right"
                                                        onChange={(e) =>
                                                            setAdditionDescription(e.target.value)
                                                        }
                                                        className="meal-input"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="user-info-inputs">
                                            <label></label>
                                            <input
                                                placeholder="city"
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                            <input
                                                placeholder="neighborhood"
                                                onChange={(e) => setNeighborhood(e.target.value)}
                                            />
                                            <input
                                                placeholder="house_number"
                                                onChange={(e) =>
                                                    setHouseNumber(Number(e.target.value))
                                                }
                                            />
                                            <textarea
                                                placeholder="additional_description"
                                                onChange={(e) =>
                                                    setAdditionDescription(e.target.value)
                                                }
                                            />
                                            <button onClick={handleSubmit} type="submit">
                                                Add Address
                                            </button>
                                        </div> */}
                                    </div>
                                    <button
                                        onClick={handleSubmit}
                                        type="submit"
                                        className="btn btn-secondary"
                                    >
                                        Add Address
                                    </button>
                                </form>
                            </CustomPopup>

                            {/* <Popup
                                trigger={
                                    <div className="add-address-button flex-box baseline space-b">
                                        <FaPlus />
                                    </div>
                                }
                                {...{ contentStyle, overlayStyle, arrowStyle }}
                                position="left center"
                            >
                                <form>
                                    <div className="pop-up-a">
                                        <h3>Add Address</h3>
                                        <input
                                            placeholder="city"
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                        <input
                                            placeholder="neighborhood"
                                            onChange={(e) => setNeighborhood(e.target.value)}
                                        />
                                        <input
                                            placeholder="house_number"
                                            onChange={(e) => setHouseNumber(Number(e.target.value))}
                                        />
                                        <textarea
                                            placeholder="additional_description"
                                            onChange={(e) => setAdditionDescription(e.target.value)}
                                        />
                                        <button onClick={handleSubmit} type="submit">
                                            Add Address
                                        </button>
                                    </div>
                                </form>
                            </Popup> */}
                        </div>
                    )}
                </div>
                {address ? (
                    <section id="address" className="address-info">
                        <br />
                        <h5>City : {address.city}</h5>
                        <h6>Neighborhood : {address.neighborhood}</h6>
                        <h6>House Number : {address.houseNumber}</h6>
                        <div className="flex-box baseline">
                            <h6>More Details : </h6>
                            <p> {address.additionDescription}</p>
                        </div>
                        {/* <div onClick={deleteAddress}>
                            <h3>Delete Address</h3>
                            <FaArchive />
                        </div> */}
                    </section>
                ) : (
                    <div>
                        <br />
                        <h3>You didn't Add An Address.</h3>
                    </div>

                    // <div id="address">
                    //     <h3>You didn't Add An Address.</h3>
                    //     <Popup
                    //         trigger={
                    //             <button>
                    //                 <h3>Add New Address</h3>
                    //                 <FaPlus />
                    //             </button>
                    //         }
                    //         position="center"
                    //     >
                    //         <form>
                    //             <h3>Add Address</h3>
                    //             <input
                    //                 placeholder="city"
                    //                 onChange={(e) => setCity(e.target.value)}
                    //             />
                    //             <input
                    //                 placeholder="neighborhood"
                    //                 onChange={(e) => setNeighborhood(e.target.value)}
                    //             />
                    //             <input
                    //                 placeholder="house_number"
                    //                 onChange={(e) => setHouseNumber(Number(e.target.value))}
                    //             />
                    //             <textarea
                    //                 placeholder="additional_description"
                    //                 onChange={(e) => setAdditionDescription(e.target.value)}
                    //             />
                    //             <button onClick={handleSubmit}>add</button>
                    //         </form>
                    //     </Popup>
                    // </div>
                )}
            </div>
            <br />
            <div className="align-center">
                <h6>Total Price : {totalPrice.toFixed(2)} JD</h6>
                <div className="cart-divider"></div>
                <div>
                    <button onClick={sendOrder} className="send-order live-chat-button">
                        Confirm Order
                    </button>
                    <br />
                    {message}
                </div>
            </div>
            <br />
        </main>
    );
};

export default Cart;
