import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserOrders, deleteOrder, isRatedVal } from "../../reducers/orders";
import { FaRegWindowClose, FaTrashAlt } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";

const UserOrders = () => {
    const id = localStorage.getItem("id");
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const state = useSelector((state) => {
        return {
            orders: state.orders.userOrders,
            isRates: state.orders.isRated,
        };
    });
    const orders = state.orders;

    useEffect(() => {
        axios.get(`http://localhost:5000/orders/${id}`).then((res) => {
            dispatch(setUserOrders(res.data));
        });
        checkRatesRestaurant();
    }, []);

    const remove = (id) => {
        console.log("id", id);
        axios.delete(`http://localhost:5000/resturant/${id}/orders`).then((res) => {
            dispatch(deleteOrder(res.data));
        });
    };

    const checkRatesRestaurant = async () => {
        const result = await axios.post(`http://localhost:5000/check_rates/${id}`);
        setData(result.data);
    };

    const ratingChanged = async (rate, resturant_id, rater_id) => {
        await axios.post(`http://localhost:5000/rate`, {
            rater_id,
            resturant_id,
            rate,
        });
        checkRatesRestaurant();
    };

    return (
        <section id="orders">
            {orders &&
                orders.map((order) => (
                    <div className="order" key={order.id}>
                        <div className="order-header flex-box baseline space-b">
                            <h6 className="order-res-name">Restaurant : {order.resturantName}</h6>
                            {!data.includes(order.resturant_id) ? (
                                <div>
                                    <ReactStars
                                        classNames="stars"
                                        onChange={(value) => {
                                            ratingChanged(value, order.resturant_id, order.userId);
                                        }}
                                        count={5}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                </div>
                            ) : (
                                <p>You Rated this Restaurant</p>
                            )}
                        </div>
                        <div className="user-order flex-box space-b">
                            <div>
                                <h5>Meal : {order.mealName}</h5>
                                <h6>Qty :{order.Qty}</h6>
                            </div>
                            <div>
                                <h6>price :{order.mealPrice}JD</h6>
                                <h6>Total :{order.totalPrice}JD</h6>
                            </div>
                        </div>
                        <FaTrashAlt className="clear-cart" onClick={() => remove(order.id)} />
                    </div>
                ))}
        </section>
    );
};

export default UserOrders;
