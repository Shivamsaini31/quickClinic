
import React from 'react';
import './SummaryCards.css';

function SummaryCards() {
  const cards = [
    { title: 'Total Service Request', value: 1000, change: '+36%' },
    { title: 'Open Request', value: 1000, change: '-36%' },
    { title: 'Completed', value: 1000, change: '+36%' },
    { title: 'Closed', value: 1000, change: '+36%' },
  ];

  return (
    <div className="summary-cards1">
      {cards.map((card, index) => (
        <div key={index} className="card1">
          <h3>{card.title}</h3>
          <p>{card.value}</p>
          <span>{card.change}</span>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;
