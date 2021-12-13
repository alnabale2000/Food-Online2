import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setCategories } from "../../reducers/categories";
import Counter from "../counter";
import { AiFillPlusCircle } from "react-icons/ai";

const CategoriesAndMeals = () => {
    const isLoggedIn = localStorage.getItem("token") ? true : false;
    const id = useParams();
    const dispatch = useDispatch();

    const [Qty, setQty] = useState(1);
    const [isPressed, setIsPressed] = useState(false);
    const [pressedIndex, setPressedIndex] = useState(0);
    const [message, setMessage] = useState("");
    const [isGreen, setIsGreen] = useState(true);

    const state = useSelector((state) => {
        return {
            categories: state.categories.categories,
        };
    });

    const categories = state.categories;

    useEffect(() => {
        axios.get(`http://localhost:5000/categories/${id.id}`).then((res) => {
            console.log("res.data", res.data);
            dispatch(setCategories(res.data));
        });
    }, []);

    const sameIdCheck = (index) => {
        if (index < 1 || index === categories.length - 1) return false;
        if (categories[index].id === categories[index - 1].id) return true;

        return false;
    };

    const addToCart = (mealName, price, index) => {
        const userId = localStorage.getItem("id");
        const order = {
            userId,
            mealName,
            Qty,
            price,
        };
        axios.post(`http://localhost:5000/resturant/addToCart/${id.id}`, order).then((res) => {
            console.log("res.data", res.data);
            setIsPressed(true);
            setPressedIndex(index);

            setTimeout(() => {
                setIsPressed(false);
                setPressedIndex(0);
            }, 2500);

            if (res.data === "Order Added") {
                setMessage("Added");
                setIsGreen(true);
            } else {
                setMessage("Clear the Cart");
                setIsGreen(false);
            }
            res.data === "Order Added" ? setMessage("Added") : setMessage("Clear the Cart");
            // setIsGreen(false);
        });
    };

    // const handleClick1 = () => {
    //     setQty(Qty + 1);
    // };

    // const handleClick2 = () => {
    //     if (Qty > 0) setQty(Qty - 1);
    // };
    return (
        <section className="meals-body">
            {categories &&
                categories.map((element, index) => (
                    <div key={element.id}>
                        {element.id !== undefined ? (
                            <div>
                                {sameIdCheck(index) ? null : (
                                    <div className="category-name">
                                        <h3>{element.categoryName}</h3>
                                    </div>
                                )}
                                <div className="meals-container">
                                    <div className="flex-box space-b baseline">
                                        <p className="meal-name">meal:{element.mealName}</p>
                                        <p>{element.price} JD</p>
                                    </div>
                                    <div className="flex-box space-b ">
                                        <p>More Details :{element.details}</p>
                                        {isLoggedIn ? (
                                            isPressed && pressedIndex === index ? (
                                                <div
                                                    className={
                                                        isGreen
                                                            ? "pressed-div green-b"
                                                            : "pressed-div red-b"
                                                    }
                                                >
                                                    <p>{message}</p>
                                                </div>
                                            ) : (
                                                <AiFillPlusCircle
                                                    className="plus-icon"
                                                    size="32px"
                                                    onClick={() => {
                                                        addToCart(
                                                            element.mealName,
                                                            element.price,
                                                            index
                                                        );
                                                    }}
                                                />
                                            )
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <h1></h1>
                        )}
                    </div>
                ))}
        </section>
    );
};

export default CategoriesAndMeals;
