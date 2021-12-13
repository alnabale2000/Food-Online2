import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addAddress, setAddress } from "../../reducers/address";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import CustomPopup from "./../popup";

const UserAddress = () => {
    const id = localStorage.getItem("id");
    const [city, setCity] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [additionDescription, setAdditionDescription] = useState("");

    const [visibility, setVisibility] = useState(false);

    const popupCloseHandler = (e) => {
        setVisibility(e);
    };

    const dispatch = useDispatch();
    const state = useSelector((state) => {
        return {
            address: state.address.address,
        };
    });
    const address = state.address[0];

    useEffect(() => {
        axios.get(`http://localhost:5000/getAddress/${id}`).then((res) => {
            dispatch(setAddress(res.data));
        });
    }, []);

    const deleteAddress = () => {
        axios.delete(`http://localhost:5000/deleteAddress/${id}`);
        dispatch(setAddress([]));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`http://localhost:5000/addAddress/${id}`, {
                city,
                neighborhood,
                houseNumber,
                additionDescription,
            })
            .then((res) => {
                console.log("res.data", res.data);
                dispatch(addAddress(res.data));
            });
    };
    return (
        <section className="user-address-body">
            <div className="cart-box">
                <div className="top-meals-box-text flex-box space-b baseline">
                    <h3>Address</h3>
                    {address ? (
                        <div onClick={deleteAddress}>
                            <FaTrashAlt className="clear-cart" />
                        </div>
                    ) : (
                        <div id="address">
                            <FaPlus
                                onClick={(e) => setVisibility(!visibility)}
                                className="add-address-button flex-box baseline space-b"
                            />

                            <CustomPopup
                                onClose={popupCloseHandler}
                                show={visibility}
                                title="Add Address"
                            >
                                <form>
                                    <div className="pop-up-content">
                                        <div className="user-info-inputs flex-box space-b">
                                            <div>
                                                <div>
                                                    <label>City </label>
                                                    <br />
                                                    <input
                                                        type="text"
                                                        placeholder="Amman,Zarqa,etc..."
                                                        onChange={(e) => setCity(e.target.value)}
                                                        className="meal-input"
                                                    />
                                                </div>
                                                <br />

                                                <div>
                                                    <label>Neighborhood </label>
                                                    <br />

                                                    <input
                                                        type="text"
                                                        placeholder="Marka-Masjed Alqouds"
                                                        onChange={(e) =>
                                                            setNeighborhood(e.target.value)
                                                        }
                                                        className="meal-input"
                                                    />
                                                </div>
                                                <br />

                                                <div>
                                                    <label>House Number </label>
                                                    <br />

                                                    <input
                                                        type="text"
                                                        placeholder="Your House Number"
                                                        onChange={(e) =>
                                                            setHouseNumber(Number(e.target.value))
                                                        }
                                                        className="meal-input"
                                                    />
                                                </div>
                                                <br />

                                                <div>
                                                    {/* <label>Confirm Password : </label>
                                <input
                                    type="password"
                                    onChange={(e) => {
                                        setOldPassword(e.target.value);
                                    }}
                                /> */}
                                                    <label>More Details</label>
                                                    <br />
                                                    <input
                                                        type="text"
                                                        placeholder="ex:After The mini-market go right"
                                                        onChange={(e) =>
                                                            setAdditionDescription(e.target.value)
                                                        }
                                                        className="meal-input"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="user-info-inputs">
                                            <label></label>
                                            <input
                                                placeholder="city"
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                            <input
                                                placeholder="neighborhood"
                                                onChange={(e) => setNeighborhood(e.target.value)}
                                            />
                                            <input
                                                placeholder="house_number"
                                                onChange={(e) =>
                                                    setHouseNumber(Number(e.target.value))
                                                }
                                            />
                                            <textarea
                                                placeholder="additional_description"
                                                onChange={(e) =>
                                                    setAdditionDescription(e.target.value)
                                                }
                                            />
                                            <button onClick={handleSubmit} type="submit">
                                                Add Address
                                            </button>
                                        </div> */}
                                    </div>
                                    <button
                                        onClick={handleSubmit}
                                        type="submit"
                                        className="btn btn-secondary"
                                    >
                                        Add Address
                                    </button>
                                </form>
                            </CustomPopup>

                            {/* <Popup
                                trigger={
                                    <div className="add-address-button flex-box baseline space-b">
                                        <FaPlus />
                                    </div>
                                }
                                {...{ contentStyle, overlayStyle, arrowStyle }}
                                position="left center"
                            >
                                <form>
                                    <div className="pop-up-a">
                                        <h3>Add Address</h3>
                                        <input
                                            placeholder="city"
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                        <input
                                            placeholder="neighborhood"
                                            onChange={(e) => setNeighborhood(e.target.value)}
                                        />
                                        <input
                                            placeholder="house_number"
                                            onChange={(e) => setHouseNumber(Number(e.target.value))}
                                        />
                                        <textarea
                                            placeholder="additional_description"
                                            onChange={(e) => setAdditionDescription(e.target.value)}
                                        />
                                        <button onClick={handleSubmit} type="submit">
                                            Add Address
                                        </button>
                                    </div>
                                </form>
                            </Popup> */}
                        </div>
                    )}
                </div>
                {address ? (
                    <section id="address" className="address-info">
                        <br />
                        <h5>City : {address.city}</h5>
                        <h6>Neighborhood : {address.neighborhood}</h6>
                        <h6>House Number : {address.houseNumber}</h6>
                        <div className="flex-box baseline">
                            <h6>More Details : </h6>
                            <p> {address.additionDescription}</p>
                        </div>
                        {/* <div onClick={deleteAddress}>
                            <h3>Delete Address</h3>
                            <FaArchive />
                        </div> */}
                    </section>
                ) : (
                    <div>
                        <br />
                        <h3>You didn't Add An Address.</h3>
                    </div>

                    // <div id="address">
                    //     <h3>You didn't Add An Address.</h3>
                    //     <Popup
                    //         trigger={
                    //             <button>
                    //                 <h3>Add New Address</h3>
                    //                 <FaPlus />
                    //             </button>
                    //         }
                    //         position="center"
                    //     >
                    //         <form>
                    //             <h3>Add Address</h3>
                    //             <input
                    //                 placeholder="city"
                    //                 onChange={(e) => setCity(e.target.value)}
                    //             />
                    //             <input
                    //                 placeholder="neighborhood"
                    //                 onChange={(e) => setNeighborhood(e.target.value)}
                    //             />
                    //             <input
                    //                 placeholder="house_number"
                    //                 onChange={(e) => setHouseNumber(Number(e.target.value))}
                    //             />
                    //             <textarea
                    //                 placeholder="additional_description"
                    //                 onChange={(e) => setAdditionDescription(e.target.value)}
                    //             />
                    //             <button onClick={handleSubmit}>add</button>
                    //         </form>
                    //     </Popup>
                    // </div>
                )}
            </div>
        </section>
        // <section id="address">
        //     {address ? (
        //         <section>
        //             {console.log("address", address)}
        //             <h1>City :{address.city}</h1>
        //             <h2>Neighborhood:{address.neighborhood}</h2>
        //             <h3>House Number:{address.house_number}</h3>
        //             <div>
        //                 <h2>More Details:</h2>
        //                 <p>{address.additional_descreption}</p>
        //             </div>
        //             <div onClick={deleteAddress}>
        //                 <h3>Delete Address</h3>
        //                 <FaArchive />
        //             </div>
        //         </section>
        //     ) : (
        //         <div>
        //             <h3>You didn't Add An Address.</h3>
        //             <Popup
        //                 trigger={
        //                     <button>
        //                         {" "}
        //                         <h3>Add New Address</h3>
        //                         <FaPlus />{" "}
        //                     </button>
        //                 }
        //                 position="center"
        //             >
        //                 <form>
        //                     <h3>Add Address</h3>
        //                     <input placeholder="city" onChange={(e) => setCity(e.target.value)} />
        //                     <input
        //                         placeholder="neighborhood"
        //                         onChange={(e) => setNeighborhood(e.target.value)}
        //                     />
        //                     <input
        //                         placeholder="house_number"
        //                         onChange={(e) => setHouseNumber(Number(e.target.value))}
        //                     />
        //                     <textarea
        //                         placeholder="additional_description"
        //                         onChange={(e) => setAdditionDescription(e.target.value)}
        //                     />
        //                     <button onClick={handleSubmit}>add</button>
        //                 </form>
        //             </Popup>
        //         </div>
        //     )}
        // </section>
    );
};

export default UserAddress;
