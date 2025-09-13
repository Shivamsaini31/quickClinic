import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="header1 bg-white shadow-sm border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <input 
            type="text" 
            placeholder="Type to search" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <div className="user-profile1 flex items-center ml-4">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">D</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
