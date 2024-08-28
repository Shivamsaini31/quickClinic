import React from 'react';
import Navbar from './navbar';
import SearchBar from './searchbar'; 

const Header = ({ onSearch }) => {
    return (
        <header>
            <Navbar />
            <SearchBar onSearch={onSearch} />
        </header>
    );
};

export default Header;
