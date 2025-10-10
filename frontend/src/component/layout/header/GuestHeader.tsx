import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Menu as MenuIcon, 
  X as CloseIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  ContactMail as ContactIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import NeonButton from '../../common/NeonButton';
import { Stethoscope, Zap } from 'lucide-react';

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-2xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              className="text-3xl font-bold font-neon tracking-wider text-white hover:text-cyan-400 transition duration-300 flex items-center group"
              to="/user/home"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="mr-3"
              >
                <Stethoscope className="w-8 h-8 text-neon-400" />
              </motion.div>
              <span className="bg-gradient-to-r from-neon-400 to-cyan-400 bg-clip-text text-transparent">
                QuickClinic
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { to: "/user/home", icon: <HomeIcon />, label: "Home" },
              { to: "/user/about", icon: <InfoIcon />, label: "About" },
              { to: "/user/about", icon: <ContactIcon />, label: "Contact" }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Link 
                  to={item.to} 
                  className="flex items-center space-x-2 text-white/90 hover:text-cyan-400 transition duration-300 group relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.icon}
                  </motion.div>
                  <span className="font-medium">{item.label}</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Action Buttons */}
          <motion.div 
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <NeonButton 
              variant="outline" 
              size="sm"
              onClick={handleLogin}
              className="flex items-center gap-2"
            >
              <LoginIcon className="w-4 h-4" />
              Login
            </NeonButton>
            <NeonButton 
              size="sm"
              onClick={handleSignup}
              className="flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Sign Up
            </NeonButton>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition duration-300 border border-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <CloseIcon className="text-white" /> : <MenuIcon className="text-white" />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 pb-4 border-t border-white/20 bg-white/5 backdrop-blur-sm rounded-lg"
          >
            <nav className="flex flex-col space-y-4 mt-4 px-4">
              {[
                { to: "/user/home", icon: <HomeIcon />, label: "Home" },
                { to: "/user/about", icon: <InfoIcon />, label: "About" },
                { to: "/user/about", icon: <ContactIcon />, label: "Contact" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link 
                    to={item.to} 
                    className="flex items-center space-x-3 text-white/90 hover:text-cyan-400 transition duration-300 py-3 px-4 rounded-lg hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
              
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <NeonButton 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      handleLogin();
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-center"
                  >
                    <LoginIcon className="w-4 h-4" />
                    Login
                  </NeonButton>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <NeonButton 
                    size="sm"
                    onClick={() => {
                      handleSignup();
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-center"
                  >
                    <Zap className="w-4 h-4" />
                    Sign Up
                  </NeonButton>
                </motion.div>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default GuestHeader;
