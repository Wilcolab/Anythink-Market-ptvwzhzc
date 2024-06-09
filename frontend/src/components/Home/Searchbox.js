import React, { useState } from "react";

const SearchBox = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);

        if (value.length >= 3) { // Only trigger search if at least 3 characters are typed
            onSearch(value);
        }
    };

    return (
        <input
            type="text"
            className="search-box"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
        />
    );
};

export default SearchBox;
