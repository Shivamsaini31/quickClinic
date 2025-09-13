import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Dashboard as DashboardIcon,
  CalendarToday as CalendarIcon,
  History as HistoryIcon,
  EventBusy as CancelIcon,
  Person as ProfileIcon,
  Chat as ChatIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  X as CloseIcon
} from '@mui/icons-material';

interface PatientSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const PatientSidebar: React.FC<PatientSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { id: urlId } = useParams<{ id: string }>();
  const data = localStorage.getItem('authState');
  const fetchdata = data ? JSON.parse(data) : null;
  // Always prioritize localStorage first, then URL params as fallback
  const id = fetchdata?.user?._id || urlId;

  // Don't render menu items if ID is not available
  if (!id) {
    return (
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6 h-full flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const menuItems = [
    {
      icon: <DashboardIcon />,
      label: 'Dashboard',
      path: `/patient/dashboard/${id}`,
      description: 'Overview of your health'
    },
    {
      icon: <CalendarIcon />,
      label: 'Book Appointment',
      path: `/patient/dashboard/${id}/appointment`,
      description: 'Schedule new appointments'
    },
    {
      icon: <HistoryIcon />,
      label: 'Appointment History',
      path: `/patient/dashboard/${id}/history`,
      description: 'View past appointments'
    },
    {
      icon: <CancelIcon />,
      label: 'Cancel/Postpone',
      path: `/patient/dashboard/${id}/cancel/postpond`,
      description: 'Manage existing appointments'
    },
    {
      icon: <ChatIcon />,
      label: 'Chat with Doctor',
      path: `/user/${id}/chats`,
      description: 'Message your doctors'
    },
    {
      icon: <ProfileIcon />,
      label: 'Update Profile',
      path: `/user/${id}/update`,
      description: 'Manage your information'
    },
    {
      icon: <ProfileIcon />,
      label: 'User Info',
      path: `/user/${id}/info`,
      description: 'View your information'
    },
    {
      icon: <NotificationsIcon />,
      label: 'Notifications',
      path: `/patient/dashboard/${id}/notifications`,
      description: 'View all notifications'
    },
    {
      icon: <SettingsIcon />,
      label: 'Settings',
      path: '#',
      description: 'Account preferences'
    },
    {
      icon: <HelpIcon />,
      label: 'Help & Support',
      path: '/user/about',
      description: 'Get assistance'
    }
  ];

  const isActive = (path: string) => {
    if (path === '#') return false;
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
          />
        </motion.div>
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="mr-2">🏥</span>
              Patient Portal
            </h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              <CloseIcon />
            </button>
          </div>

          {/* User Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {fetchdata?.user?.name?.charAt(0) || 'P'}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{fetchdata?.user?.name}</h3>
                <p className="text-sm text-gray-600">{fetchdata?.user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    onClick={() => {
                      if (item.path === '#') {
                        // Handle special cases like notifications
                        return;
                      }
                      onClose();
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span className={`text-xl ${isActive(item.path) ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>
                      {item.icon}
                    </span>
                    <div className="flex-1">
                      <span className="font-medium">{item.label}</span>
                      <p className="text-xs opacity-75 mt-1">{item.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500">
                QuickClinic v1.0
              </p>
            </div>
          </div>
        </div>
        </div>
      </motion.div>
    </>
  );
};

export default PatientSidebar;
