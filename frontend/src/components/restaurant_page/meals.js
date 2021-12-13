import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMeals } from "../../reducers/meals";

const Meals = () => {
    useEffect(() => {}, []);
    const dispatch = useDispatch();

    const getMeals = (id) => {
        console.log(id);
        axios.get(`http://localhost:5000/resturants/categories/meals/${id}`).then((res) => {
            dispatch(setMeals(res.data));
        });
    };

    return <div></div>;
};

export default Meals;
