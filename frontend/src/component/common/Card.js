
import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

function Card({ title, description, imageUrl,url }) {
  return (
    <div className="card">
      <img src={imageUrl} alt="doctor" className="card-image" />
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p> 
      <Link to={url} className='card-button'>Next</Link>
    </div> 
  );
}

export default Card;
