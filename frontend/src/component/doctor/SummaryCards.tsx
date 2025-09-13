import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
};

const SummaryCards: React.FC = () => {
  const cards = [
    { title: 'Total Appointments', value: '24', icon: '📅', color: 'bg-blue-100' },
    { title: 'Today\'s Appointments', value: '8', icon: '⏰', color: 'bg-green-100' },
    { title: 'Total Earnings', value: '$2,400', icon: '💰', color: 'bg-yellow-100' },
    { title: 'Patient Reviews', value: '4.8', icon: '⭐', color: 'bg-purple-100' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, index) => (
        <SummaryCard
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
          color={card.color}
        />
      ))}
    </div>
  );
};

export default SummaryCards;
