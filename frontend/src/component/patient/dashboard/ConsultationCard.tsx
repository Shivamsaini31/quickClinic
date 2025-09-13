import React from 'react';

interface ConsultationCardProps {
  title: string;
  image: string;
}

const ConsultationCard: React.FC<ConsultationCardProps> = ({ title, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-105">
      <div className="relative h-32 overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 text-center line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default ConsultationCard;
