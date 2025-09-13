import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Menu as MenuIcon, 
  X as CloseIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  ContactMail as ContactIcon,
  Login as LoginIcon,
  PersonAdd as SignupIcon
} from '@mui/icons-material';

const GuestHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    navigate('/user/login');
  };

  const handleSignup = () => {
    navigate('/user/signup');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link 
            className="text-3xl font-bold tracking-wider hover:text-yellow-300 transition duration-300 flex items-center"
            to="/user/home"
          >
            <span className="mr-2">🏥</span>
            QuickClinic
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/user/home" 
              className="flex items-center space-x-2 hover:text-yellow-300 transition duration-300"
            >
              <HomeIcon />
              <span>Home</span>
            </Link>
            <Link 
              to="/user/about" 
              className="flex items-center space-x-2 hover:text-yellow-300 transition duration-300"
            >
              <InfoIcon />
              <span>About</span>
            </Link>
            <Link 
              to="/user/about" 
              className="flex items-center space-x-2 hover:text-yellow-300 transition duration-300"
            >
              <ContactIcon />
              <span>Contact</span>
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleLogin}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition duration-300"
            >
              <LoginIcon />
              <span>Login</span>
            </button>
            <button
              onClick={handleSignup}
              className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg transition duration-300 font-semibold"
            >
              <SignupIcon />
              <span>Sign Up</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition duration-300"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="md:hidden mt-4 pb-4 border-t border-white/20">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link 
                to="/user/home" 
                className="flex items-center space-x-2 hover:text-yellow-300 transition duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <HomeIcon />
                <span>Home</span>
              </Link>
              <Link 
                to="/user/about" 
                className="flex items-center space-x-2 hover:text-yellow-300 transition duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <InfoIcon />
                <span>About</span>
              </Link>
              <Link 
                to="/user/about" 
                className="flex items-center space-x-2 hover:text-yellow-300 transition duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ContactIcon />
                <span>Contact</span>
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-white/20">
                <button
                  onClick={() => {
                    handleLogin();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition duration-300 text-left"
                >
                  <LoginIcon />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => {
                    handleSignup();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg transition duration-300 font-semibold text-left"
                >
                  <SignupIcon />
                  <span>Sign Up</span>
                </button>
              </div>
            </nav>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default GuestHeader;
