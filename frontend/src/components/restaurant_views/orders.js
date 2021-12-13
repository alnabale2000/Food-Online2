import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurantOrders, deleteRestaurantOrder } from "../../reducers/orders";
import { FaRegWindowClose, FaTrashAlt, FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";

const Orders = () => {
    const id = localStorage.getItem("id");
    const dispatch = useDispatch();
    let sum = 0;
    let totalSummation = 0;

    const state = useSelector((state) => {
        return {
            restaurantOrders: state.orders.restaurantOrders,
        };
    });
    const orders = state.restaurantOrders;

    useEffect(() => {
        axios.get(`http://localhost:5000/resturant/${id}/orders`).then((res) => {
            console.log(res.data);

            dispatch(setRestaurantOrders(res.data));
        });
    }, []);

    const remove = (id) => {
        console.log("id", id);
        axios.delete(`http://localhost:5000/resturant/${id}/orders`).then((res) => {
            dispatch(deleteRestaurantOrder(res.data));
        });
    };

    const totalPriceSum = (index) => {
        if (index === 0 || index === orders.length - 1) {
            sum += orders[index].totalPrice;
        } else if (
            orders[index].userId === orders[index + 1].userId ||
            orders[index].userId === orders[index - 1].userId
        ) {
            if (orders[index].userId !== orders[index - 1].userId) sum = 0;
            sum += orders[index].totalPrice;
        } else if (
            orders[index].userId !== orders[index + 1].userId &&
            orders[index].userId !== orders[index - 1].userId
        ) {
            sum = 0;
            sum += orders[index].totalPrice;
        } else {
            sum = 0;
        }
        totalSummation = sum;
    };

    const sameIdCheck = (index) => {
        if (index < 1 || index === orders.length - 1) return false;

        if (orders[index].userId === orders[index - 1].userId) return true;

        return false;
    };

    return (
        <main className="orders-body">
            <div>
                {orders &&
                    orders.map((order, index) => (
                        <div key={order.id}>
                            {console.log("order", order)}
                            {console.log(order.id ? true : false)}

                            {sameIdCheck(index) || index === 0 ? null : (
                                <div className="order-total-price">
                                    <p>Order Total Price : {totalSummation.toFixed(2)}JD </p>
                                </div>
                            )}
                            {console.log("order.userId", order.userId)}
                            {order.userId !== undefined ? (
                                <div className="order-box">
                                    {sameIdCheck(index) ? null : (
                                        <div>
                                            <div className="client-info start">
                                                <h1 className="top-meals-box-text start edit-padding">
                                                    Client Information And Location
                                                </h1>
                                                <div className="order-container">
                                                    <section className="contact-info">
                                                        <h3 className="cl-name">
                                                            Client Name:{order.username}
                                                        </h3>
                                                        <h6 className="cl-phone-number">
                                                            Phone Number:{order.phone_number}
                                                        </h6>
                                                    </section>
                                                    <br />
                                                    <section className="location-info">
                                                        <div className="location-main-info">
                                                            <h4>Client Location</h4>
                                                            <h6>City:{order.city}</h6>
                                                            <h6>
                                                                Neighborhood:{order.neighborhood}
                                                            </h6>
                                                            <h6>
                                                                House Number:{order.house_number}
                                                            </h6>
                                                        </div>
                                                        <div className="location-extras">
                                                            <p>
                                                                Extras :
                                                                {order.additional_descreption}
                                                            </p>
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>
                                            <header className="order-meals-header flex-box space-b ">
                                                <p className="cart-meal-name-h ">Meals</p>
                                                <p className="qty-h ">Qty</p>
                                                <p className="cart-price-text-h ">Price</p>
                                                <p className="clear-cart-h ">R </p>
                                            </header>
                                        </div>
                                    )}
                                    {totalPriceSum(index)}
                                    <div className="order-meals-box">
                                        <div className="cart-order flex-box space-b">
                                            <p className="cart-meal-name">{order.mealName}</p>
                                            <div className="qty res-orders">
                                                <p className="qty-text">{order.Qty}</p>
                                            </div>{" "}
                                            <p className="cart-price-text">{order.totalPrice}</p>
                                            <FaTrashAlt
                                                onClick={() => remove(order.id)}
                                                className="clear-cart"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p>---------------------------------------------------</p>
                                    <h1>End Of Orders</h1>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </main>
    );
};

export default Orders;
