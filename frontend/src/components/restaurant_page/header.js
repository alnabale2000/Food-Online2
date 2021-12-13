import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getRestaurantData } from "../../reducers/resturants";
import { MdDoneOutline } from "react-icons/md";

const Header = () => {
    const [rate, setRate] = useState(0);
    const id = useParams();
    const dispatch = useDispatch();
    const state = useSelector((state) => {
        return {
            restaurant: state.restaurants.restaurant,
        };
    });
    const res = state.restaurant;

    useEffect(() => {
        axios.get(`http://localhost:5000/resturant/${id.id}`).then((res) => {
            dispatch(getRestaurantData(res.data));
        });

        axios.get(`http://localhost:5000/resturant/${id.id}/rate`).then((res) => {
            setRate(res.data);
        });
    }, []);
    return (
        <>
            {res && res[0] && (
                <header className="res-header">
                    <div className="flex-box flex-end">
                        <img src={res[0].resturantImage} alt="OPse!" className="res-img" />
                        <div className="res-info">
                            <h3 className="res-name">{res[0].resturantName}</h3>
                            <p className="res-text">{res[0].plates}</p>
                            <p className="res-text">{res[0].adress}</p>
                        </div>
                    </div>
                    <div className="more-info">
                        <p className="res-text">{res[0].phoneNumber}</p>
                        <p className="res-text">Rate :{rate !== "NaN" ? rate : 0}</p>
                    </div>
                    <div></div>
                </header>
            )}
            <div className="secure-delivery flex-box  space-b">
                <h6>Secure Delivery</h6>
                <MdDoneOutline style={{ fontSize: 20 }} />
            </div>
        </>
    );
};

export default Header;
