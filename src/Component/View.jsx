import React from 'react';
import './View.css'; // Make sure to import the CSS file

const View = ({image,heading,desc}) => {
    return (
        <div className="card">
            <div className='card-upper-shadow'></div>
            <img 
                className="card-image" 
                src={image} // Replace with your image URL
                alt="Food"
            />

            <div className="card-content">
                <h2 className="heading">{heading}</h2>
                <h4 className="description">{desc}
                </h4>
            </div>
        </div>
    );
};

export default View;
