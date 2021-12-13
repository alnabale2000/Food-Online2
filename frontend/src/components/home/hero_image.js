import React from "react";
import { useHistory } from "react-router-dom";
import Search from "./search";

const HeroImage = () => {
    const history = useHistory();

    return (
        <div className="hero-image">
            <h1>
                {" "}
                Food House,
                <br />
                Get Your Food Online
            </h1>
            <br />
            <div className="search">
                <Search />
            </div>
        </div>
    );
};

export default HeroImage;
