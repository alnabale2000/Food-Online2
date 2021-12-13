import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setCategoryMeals, deleteMeal } from "../../../reducers/categories";
import { FaTrashAlt } from "react-icons/fa";
import { deleteCategory } from "../../../reducers/categories";

const DeleteSection = () => {
    const [categoryId, setCategoryId] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const state = useSelector((state) => {
        return {
            categories: state.categories.categories,
            categoryMeals: state.categories.categoryMeals,
        };
    });

    const categories = state.categories;
    const meals = state.categoryMeals;

    useEffect(() => {}, []);

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

    const deleteCate = () => {
        axios
            .post(`http://localhost:5000/delete_category`, {
                categoryId,
            })
            .then((res) => {
                if (res.data[1].affectedRows === 0) setMessage("Cant delete empty categories");
                else {
                    dispatch(deleteCategory(Number(res.data[0])));
                    setMessage("Category Deleted");
                }

                setTimeout(() => {
                    setMessage("");
                }, 3500);
            });
    };

    useEffect(() => {
        getMealsByCategoryId();
    }, [categoryId]);

    const getMealsByCategoryId = () => {
        axios.get(`http://localhost:5000/categories/meals/${categoryId}`).then((res) => {
            dispatch(setCategoryMeals(res.data));
        });
    };

    const deleteMeal2 = (id) => {
        axios.delete(`http://localhost:5000/delete_meal/${id}`).then((res) => {
            console.log("res", res.data);
            dispatch(deleteMeal(Number(res.data)));
        });
    };

    return (
        <section id="delete">
            <h3>Select A Category to delete it,or delete from it.</h3>
            <p className="warning-message">
                Warning :By deleting a category, you will delete all meals belong to it.
            </p>
            <div className="flex-box space-b">
                <label>
                    Category :
                    <select
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="select-delete-category"
                    >
                        {OptionsValues()}
                    </select>
                </label>
                <div className=" flex-box space-b" onClick={deleteCate}>
                    <h5 className="delete-category-text">Delete Category</h5>
                    <FaTrashAlt className="clear-cart" />
                </div>
            </div>
            <br />
            {message}
            {meals &&
                meals.map((meal) => (
                    <div className="delete-choice-meal flex-box space-b baseline" key={meal.id}>
                        <h2>
                            meal:{meal.mealName}
                            {"    "}
                        </h2>
                        <h3> {meal.price}JD</h3>
                        <FaTrashAlt
                            className="clear-cart"
                            onClick={() => {
                                deleteMeal2(meal.id);
                            }}
                        />
                    </div>
                ))}
        </section>
    );
};

export default DeleteSection;
