
import React from 'react';
import './ConsultationCard.css';
import { Link } from 'react-router-dom';

function ConsultationCard({ image, title }) {
  return (
    <div className="consultation-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <Link to={'/appointments'}><button>Consult Now</button></Link> 
    </div>
  );
}

export default ConsultationCard;
