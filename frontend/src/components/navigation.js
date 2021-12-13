import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setStatus } from "./../reducers/login";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

const Navigation = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = jwt.decode(localStorage.getItem("token"));
    const id = localStorage.getItem("id");
    const type = localStorage.getItem("type");

    const state = useSelector((state) => {
        return {
            token: state.loginReducer.token,
            isLoggedIn: state.loginReducer.isLoggedIn,
        };
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        setStatus(token ? true : false);
        setToken({ token, user });
    }, []);

    const loggedOut = () => {
        localStorage.clear();
        dispatch(setToken({ token: "", user }));
        history.push("/");
    };
    const goTo = (endPoint) => {
        history.push(endPoint);
    };
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            {/* {state.isLoggedIn ? ( */}
            <Container>
                <Navbar.Brand href="/">Food House</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/restaurants">Restaurants </Nav.Link>
                    </Nav>
                    {/* {state.isLoggedIn ? ( */}

                    {state.isLoggedIn ? (
                        <Nav>
                            {type === "user" ? (
                                <Nav>
                                    <Nav.Link
                                        onClick={() => {
                                            goTo(`/cart/${id}`);
                                        }}
                                    >
                                        Cart
                                    </Nav.Link>

                                    <Nav.Link
                                        onClick={() => {
                                            goTo(`/my_profile/${id}`);
                                        }}
                                    >
                                        My Profile
                                    </Nav.Link>
                                </Nav>
                            ) : (
                                <Nav>
                                    <Nav.Link
                                        onClick={() => {
                                            goTo(`/orders/${id}`);
                                        }}
                                    >
                                        Orders
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={() => {
                                            goTo(`/categories_&_meals/${id}`);
                                        }}
                                    >
                                        Categories&Meals
                                    </Nav.Link>
                                </Nav>
                            )}
                            <Nav.Link onClick={loggedOut}>log out </Nav.Link>
                        </Nav>
                    ) : (
                        <Nav>
                            <Nav.Link
                                onClick={() => {
                                    goTo("/restaurant_login");
                                }}
                            >
                                Join As Restaurant
                            </Nav.Link>
                            <Nav.Link
                                onClick={() => {
                                    goTo("/login");
                                }}
                            >
                                login
                            </Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
    // return (
    //     <nav className="navbar navbar-expand-md bg-dark navbar-dark">
    //         {state.isLoggedIn ? (
    //             <>
    //                 <div>
    //                     <h1
    //                         className="title"
    //                         onClick={() => {
    //                             goTo("/");
    //                         }}
    //                     >
    //                         Order Online
    //                     </h1>
    //                 </div>
    //                 <div className="links">
    //                     <h1
    //                         className="link"
    //                         onClick={() => {
    //                             goTo("/restaurants");
    //                         }}
    //                     >
    //                         Restaurants
    //                     </h1>
    //                     {type === "user" && (
    //                         <h1
    //                             className="link"
    //                             onClick={() => {
    //                                 goTo(`/cart/${id}`);
    //                             }}
    //                         >
    //                             Cart
    //                         </h1>
    //                     )}
    //                     {type === "user" ? (
    //                         <h1
    //                             className="link"
    //                             onClick={() => {
    //                                 goTo(`/my_profile/${id}`);
    //                             }}
    //                         >
    //                             My Profile
    //                         </h1>
    //                     ) : (
    //                         <div>
    //                             <h1
    //                                 className="link"
    //                                 onClick={() => {
    //                                     goTo(`/orders/${id}`);
    //                                 }}
    //                             >
    //                                 Orders
    //                             </h1>
    //                             <h1
    //                                 className="link"
    //                                 onClick={() => {
    //                                     goTo(`/categories_&_meals/${id}`);
    //                                 }}
    //                             >
    //                                 Categories&Meals
    //                             </h1>
    //                         </div>
    //                     )}

    //                     <h1 className="link" onClick={loggedOut}>
    //                         log out
    //                     </h1>
    //                 </div>
    //             </>
    //         ) : (
    //             <>
    //                 <div>
    //                     <h1
    //                         className="title"
    //                         onClick={() => {
    //                             goTo("/");
    //                         }}
    //                     >
    //                         Order Online
    //                     </h1>
    //                 </div>
    //                 <div className="links">
    //                     <h1
    //                         className="link"
    //                         onClick={() => {
    //                             goTo("/restaurants");
    //                         }}
    //                     >
    //                         Restaurants
    //                     </h1>
    //                     <h1
    //                         className="link"
    //                         onClick={() => {
    //                             goTo("/restaurant_login");
    //                         }}
    //                     >
    //                         Join As Restaurant
    //                     </h1>
    //                     <h1
    //                         className="link"
    //                         onClick={() => {
    //                             goTo("/login");
    //                         }}
    //                     >
    //                         login
    //                     </h1>
    //                 </div>
    //             </>
    //         )}
    //     </nav>
    // );
};

export default Navigation;
