
import React from 'react';
import './SpecialtyGrid.css';

function SpecialtyGrid({ specialties }) {
  return (
    <div className="specialty-grid">
      {specialties.map((specialty, index) => (
        <div key={index} className="specialty-item">
          <div className="specialty-placeholder"></div>
          <img src={specialty.image} className='imgtag' alt='image hai bhai'/>
          <h4>{specialty.title}</h4>
        </div>
      ))}
    </div>
  );
}

export default SpecialtyGrid;
