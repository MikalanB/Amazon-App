import React from 'react';
import Products from '../components/Products';
import '../css/Product.css';

const Main = (props) => {
    return(
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://m.media-amazon.com/images/I/61oAtReLhZL._SX3000_.jpg" className="d-block w-100" alt="Exclusive Prime Student Membership Ad" />
                </div>
                <div className="carousel-item">
                    <img src="https://m.media-amazon.com/images/I/61CX00seH6L._SX3000_.jpg" className="d-block w-100" alt="Listen to Audible Ad" />
                </div>
                <div className="carousel-item">
                    <img src="https://m.media-amazon.com/images/I/616uH3DvNyL._SX3000_.jpg" className="d-block w-100" alt="3 months free of Amazon Music" />
                </div>
                <div className="carousel-item">
                    <img src="https://m.media-amazon.com/images/I/71A2FN5eitL._SX3000_.jpg" className="d-block w-100" alt="Alexa Ring Door Bell Ad" />
                </div>
                <div className="carousel-item">
                    <img src="https://m.media-amazon.com/images/I/61jzKpqQvlL._SX3000_.jpg" className="d-block w-100" alt="Buy now, pay over time" />
                </div>
                <div className="carousel-item">
                    <img src="https://m.media-amazon.com/images/I/71v2t6-iPlL._SX3000_.jpg" className="d-block w-100" alt="Amazon Home: Upgrade you kitchen" />
                </div>
                <div className="carousel-item">
                    <img src="https://m.media-amazon.com/images/I/71UIKH4ACbL._SX3000_.jpg" className="d-block w-100" alt="Denali Ad" />
                </div>
                <div className="carousel-item">
                    <img src="https://m.media-amazon.com/images/I/7177bXiJl6L._SX3000_.jpg" className="d-block w-100" alt="Amazon Basics: Pet Crates" />
                </div>
                <div className="carousel-item">
                    <img src="https://m.media-amazon.com/images/I/71bvQchb1jL._SX3000_.jpg" className="d-block w-100" alt="Amazon Music: Podcasts of the year" />
                </div>
                <div className="carousel-item">
                    <img src="https://m.media-amazon.com/images/I/61+p0FuZTaL._SX3000_.jpg" className="d-block w-100" alt="All New Judy Justice" />
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
    <div>
        <Products />
    </div>
</div>

    )
}

export default Main;
