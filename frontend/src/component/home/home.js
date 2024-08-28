import React, { Fragment } from 'react';
import { CgMouse } from 'react-icons/cg';
import './home.css';
import ProductCard from './product';
import MetaData from '../layout/metadata';

const products = [
    {
        name: "black-tshirt",
        images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
        price: "3006",
        _id: "abhishek",
        ratings: "5"
    },
    // Add more products as needed
];

const Home = ({ searchQuery }) => {
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log("Current Search Query:", searchQuery); // Log the search query here

    return (
        <Fragment>
            <MetaData title="hi this side karan aggarwal" />

            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>

            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </Fragment>
    );
};

export default Home;
