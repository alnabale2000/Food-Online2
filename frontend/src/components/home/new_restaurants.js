import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getNewRestaurant } from "../../reducers/resturants";
import { Card, CardGroup } from "react-bootstrap";
import { useHistory } from "react-router";

const NewRestaurants = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector((state) => {
        return {
            restaurants: state.restaurants.restaurants,
        };
    });

    useEffect(() => {
        axios.get("http://localhost:5000").then((res) => {
            dispatch(getNewRestaurant(res.data));
        });
    }, []);

    return (
        <section className="new-restaurants">
            <h2 className="top-text">New Added Restaurants</h2>
            <CardGroup className="restaurants-card-group">
                {state.restaurants &&
                    state.restaurants.map((restaurant) => (
                        <Card
                            className="restaurant-card"
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
            <div className="footer">
                <p className="footer-text">Join Us Now To Get This free Promote!</p>
                <br />

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                        history.push("/restaurant_register");
                    }}
                >
                    Join Us Now!
                </button>
            </div>
        </section>
    );
};

export default NewRestaurants;

// return (
//     <section>
//         <div className="text">
//             <h1>Newest Restaurants Joined us</h1>
//         </div>
//         <div className="restaurants">
//             {state.restaurants &&
//                 state.restaurants.map((restaurant) => (
//                     <div class="shell">
//                         <div class="container">
//                             <div class="row">
//                                 <div class="col-md-3">
//                                     <div class="wsk-cp-product">
//                                         <div class="wsk-cp-img">
//                                             <img
//                                                 src={restaurant.resturantImage}
//                                                 alt="Product"
//                                                 class="img-responsive"
//                                             />
//                                         </div>
//                                         <div class="wsk-cp-text">
//                                             <div class="category">
//                                                 <span>{restaurant.plates}</span>
//                                             </div>
//                                             <div class="title-product">
//                                                 <h3>{restaurant.resturantName}</h3>
//                                             </div>

//                                             <div class="card-footer">
//                                                 <div class="wcf-left">
//                                                     <span class="price">
//                                                         {restaurant.rates}/5
//                                                     </span>
//                                                 </div>
//                                                 <div class="wcf-right">
//                                                     <a href="#" class="buy-btn">
//                                                         <i class="zmdi zmdi-shopping-basket"></i>
//                                                     </a>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//         </div>
//     </section>
// );
