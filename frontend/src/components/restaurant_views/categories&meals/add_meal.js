import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMeal } from "../../../reducers/meals";
import { setCategories } from "../../../reducers/categories";

const AddMealSection = () => {
    const [mealName, setMealName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [price, setPrice] = useState("");
    const [details, setDetails] = useState("");
    const [mealImage, setmealImage] = useState("no image for now");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const id = localStorage.getItem("id");

    useEffect(() => {
        axios.get(`http://localhost:5000/categories/${id}`).then((res) => {
            dispatch(setCategories(res.data));
        });
    }, []);

    const state = useSelector((state) => {
        return {
            categories: state.categories.categories,
        };
    });
    const categories = state.categories;

    const options = [<option>Category</option>];
    const OptionsValues = () => {
        categories.forEach((category) => {
            options.push(
                <option key={category.id} value={category.id}>
                    {category.categoryName}
                </option>
            );
        });
        return options;
    };

    const handleSubmit = (e) => {
        console.log(mealName, categoryId, price, mealImage, details);
        e.preventDefault();
        try {
            axios
                .post(`http://localhost:5000/addMeal`, {
                    mealName,
                    categoryId,
                    price,
                    mealImage,
                    details,
                })
                .then((res) => {
                    console.log("res.data", res.data);
                    dispatch(createMeal(res.data));
                });
            setMessage("Meal Added");
            setTimeout(() => {
                setMessage("");
            }, 3000);
        } catch (error) {
            console.log("error", error);
            setMessage("Can't Add Meal");
            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
    };
    return (
        <section id="add_meal">
            <div className="add-meal-steps">
                <h5>1- Add Meal Information</h5>
                <h5>2- Select Category From Categoy List</h5>
                <h5>3- Add It To Menu</h5>
            </div>
            <br />{" "}
            <form onSubmit={handleSubmit} className="add-meal-inputs">
                {/* <input
                    type="text"
                    placeholder="Enter CategoryName"
                    onChange={(e) => setMealImage(e.target.value)}
                /> */}
                <label>
                    Meal Name
                    <br />
                    <input
                        type="text"
                        placeholder="Enter Meal Name"
                        onChange={(e) => setMealName(e.target.value)}
                        className="meal-input"
                    />
                </label>
                <br />
                <label>
                    Price
                    <br />
                    <input
                        type="text"
                        placeholder="Price (without JD,USD,etc..)"
                        onChange={(e) => setPrice(e.target.value)}
                        className="meal-input"
                    />
                </label>
                <br />
                <label>
                    Select Category
                    <br />
                    <select onChange={(e) => setCategoryId(e.target.value)} className="meal-input">
                        {OptionsValues()}
                    </select>
                </label>
                <br />
                <label>
                    Details
                    <br />
                    <input
                        type="text"
                        placeholder="Add More Details for the meal"
                        onChange={(e) => setDetails(e.target.value)}
                        className="meal-input details"
                    />
                </label>
                <br />
                <button className="btn btn-secondary add-meal-button">Add Meal</button>
                {/* <button>Add</button> */}
            </form>{" "}
            <h2>{message}</h2>
        </section>
    );
};

export default AddMealSection;
