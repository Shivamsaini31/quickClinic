import React from 'react';

interface Specialty {
  title: string;
  image: string;
}

interface SpecialtyGridProps {
  specialties: Specialty[];
}

const SpecialtyGrid: React.FC<SpecialtyGridProps> = ({ specialties }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {specialties.map((specialty, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-105"
        >
          <div className="relative h-40 overflow-hidden rounded-t-lg">
            <img
              src={specialty.image}
              alt={specialty.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              {specialty.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpecialtyGrid;
