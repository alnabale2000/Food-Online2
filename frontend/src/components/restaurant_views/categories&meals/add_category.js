import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../../reducers/categories";
import { Button } from "react-bootstrap";

const AddCategorySection = () => {
    const [categoryName, setCategoryName] = useState("");
    const [message, setMessage] = useState("");

    const id = localStorage.getItem("id");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios
                .post(`http://localhost:5000/addCategory/${id}`, {
                    categoryName,
                })
                .then((res) => {
                    console.log("res.data", res.data);
                    dispatch(createCategory(res.data));
                });
            setMessage("Category Added");
            setTimeout(() => {
                setMessage("");
            }, 3000);
        } catch (error) {
            console.log("error", error);
            setMessage("Cant Add Category");
            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
    };

    return (
        <section id="add_category">
            <h3 className="top-add-category-text">Add a new category to your restaurant.</h3>
            <br />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter CategoryName"
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="category-input"
                />

                <br />
                <br />

                <button className="btn btn-secondary add-category-button">
                    Add To Category List
                </button>
            </form>
            <h4 className="suc-message">{message}</h4>
        </section>
    );
};

export default AddCategorySection;
