import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value); // Pass the search term to the parent component
    };

    return (
        <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
            style={{ padding: '8px', width: '200px', borderRadius: '4px' }}
        />
    );
};

export default SearchBar;
