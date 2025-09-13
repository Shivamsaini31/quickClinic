import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const data = localStorage.getItem('authState');
  const fetchdata = data ? JSON.parse(data) : null;
  const id = fetchdata?.user?._id;

  // Don't render if ID is not available
  if (!id) {
    return (
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-10">
        <div className="p-6 h-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { path: `/doctor/dashboard/${id}`, label: 'Dashboard', icon: '🏠' },
    { path: `/doctor/dashboard/${id}/appointments`, label: 'Appointments', icon: '📅' },
    { path: `/doctor/dashboard/${id}/schedule`, label: 'Schedule', icon: '⏰' },
    { path: `/doctor/dashboard/${id}/earnings`, label: 'Earnings', icon: '💰' },
    { path: `/doctor/dashboard/${id}/leave`, label: 'Leave', icon: '🏖️' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-10">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Doctor Portal</h2>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    location.pathname.includes(item.path.split('/')[2])
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
