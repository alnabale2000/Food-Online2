import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";

const Search = () => {
    const [searchText, setSearchText] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/restaurants/${searchText}`);
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="flexbox">
                <div>
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search For A Restaurant. . ."
                        onChange={(e) => setSearchText(e.target.value)}
                        required
                    />
                </div>
                <Button className="search-button" variant="dark" onClick={handleSubmit}>
                    Search
                </Button>{" "}
            </div>
        </form>
    );
};

export default Search;
