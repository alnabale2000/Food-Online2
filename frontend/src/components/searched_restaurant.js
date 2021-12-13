import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurants } from "./../reducers/resturants";
import { useHistory, useParams } from "react-router";
import { Card, CardGroup } from "react-bootstrap";



const SearchedRestaurant = () => {
    const [filterValue, setFilterValue] = useState(0);
    const [sortValue, setSortValue] = useState("ASC");
    const [bool, setBool] = useState(true);

    const name = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const state = useSelector((state) => {
        return {
            restaurants: state.restaurants.restaurants,
        };
    });

    useEffect(() => {
        console.log("name", name.name);
        axios
            .get(`http://localhost:5000/resturants/${name.name}`, {
                timeSort: sortValue,
            })
            .then((res) => {
                console.log("res.data", res.data);
                dispatch(setRestaurants(res.data));
            });
    }, []);

    const filter = (value) => {
        setFilterValue(value);
    };

    const sort = (value, bool) => {
        setBool(bool);
        setSortValue(value);
    };

    const getAllRestaurants = () => {
        axios
            .get(`http://localhost:5000/resturants/${sortValue}/${filterValue}`, {})
            .then((res) => {
                dispatch(setRestaurants(res.data));
            });
    };

    const goToRestaurant = (id) => {
        history.push(`/restaurant/${id}`);
    };

    return (
        <main className="restaurants-body">
            <section className="sort-and-filter">
                <div className="flex-div">
                    <div className="slider-section">
                        <p>Rate Above: {filterValue}</p>
                        <br />
                        <Slider
                            min={0}
                            max={5}
                            handleStyle={{
                                backgroundColor: "black",
                                border: 0,
                            }}
                            trackStyle={{ background: "black", height: 5 }}
                            railStyle={{ height: 2 }}
                            dotStyle={{ background: "gray" }}
                            activeDotStyle={{ background: "black", border: 0 }}
                            defaultValue={0}
                            onAfterChange={filter}
                            onChange={filter}
                            dots={true}
                        />
                    </div>
                    <div className="divider"></div>
                    <section className="sort-section">
                        <h2>Sort By</h2>
                        {bool ? (
                            <div className="sorts">
                                <p
                                    className="selected"
                                    onClick={() => {
                                        sort("DESC", true);
                                    }}
                                >
                                    Newest
                                </p>
                                <p
                                    className="un-selected"
                                    onClick={() => {
                                        sort("ASC", false);
                                    }}
                                >
                                    Oldest
                                </p>
                            </div>
                        ) : (
                            <div className="sorts">
                                <p
                                    className="un-selected"
                                    onClick={() => {
                                        sort("DESC", true);
                                    }}
                                >
                                    Newest
                                </p>
                                <p
                                    className="selected"
                                    onClick={() => {
                                        sort("ASC", false);
                                    }}
                                >
                                    Oldest
                                </p>
                            </div>
                        )}
                    </section>
                    <div className="divider hidden"></div>
                </div>

                <button type="button" className="btn btn-secondary" onClick={getAllRestaurants}>
                    Apply
                </button>
            </section>
            <CardGroup className="restaurants-card-group flex-wrap">
                {state.restaurants &&
                    state.restaurants.map((restaurant) => (
                        <Card
                            className="restaurant-card width-edit"
                            onClick={() => {
                                history.push(`/restaurant/${restaurant.id}`);
                            }}
                        >
                            <Card.Img variant="top" src={restaurant.resturantImage} />
                            <br />
                            <Card.Body>
                                <Card.Title>{restaurant.resturantName}</Card.Title>

                                <Card.Text>
                                    Restaurant Specialist in:
                                    <br />
                                    {restaurant.plates}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="footer-card-text">
                                <small>Rated :{restaurant.rates}/5</small>
                            </Card.Footer>
                        </Card>
                    ))}
            </CardGroup>

            {/* <section className="restaurants">

                {state.restaurants &&
                    state.restaurants.map((restaurant) => (
                        <div
                            className="restaurant"
                            key={restaurant.id}
                            style={{ backgroundImage: `url(${restaurant.resturantImage})` }}
                            onClick={() => {
                                goToRestaurant(restaurant.id);
                            }}
                        >
                            <div className="inner">
                                <image src={restaurant.resturantImage} alt="no pic" />
                                <h2> {restaurant.resturantName}</h2>
                                <p>plates : {restaurant.plates}</p>
                                <p>{restaurant.rates}/5</p>
                            </div>
                        </div>
                    ))}
            </section> */}
        </main>
    );
};

export default SearchedRestaurant;
