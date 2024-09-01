import React from 'react';
import './SpecialtyGrid.css';

function SpecialtyGrid({ specialties }) {
  return (
    <div className="specialty-grid">
      {specialties.map((specialty, index) => (
        <div key={index} className="specialty-item">
          <div className="specialty-placeholder"></div>
          {/* Modified alt attribute to remove redundant words */}
          <img src={specialty.image} className='imgtag' alt={specialty.title} />
          <h4>{specialty.title}</h4>
        </div>
      ))}
    </div>
  );
}

export default SpecialtyGrid;
