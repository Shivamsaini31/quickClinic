import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faStethoscope, faSyringe, faPills, faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Box, Typography, IconButton, Link } from '@mui/material';
import { styled } from '@mui/system';
import './footer.css';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#343a40',
  color: '#ffffff',
  padding: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.3)',
  marginTop: 'auto', // Ensures footer sticks to the bottom
}));

const FooterSection = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: '10px',
}));

const SocialIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  marginTop: '10px',
}));

const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  fontSize: '24px',
  transition: 'transform 0.3s, color 0.3s',
  '&:hover': {
    transform: 'scale(1.2)',
  },
}));

const iconColors = {
  facebook: '#4267B2',
  instagram: '#C13584',
  linkedin: '#0077b5',
};

const Footer = () => {
  return (
    <FooterContainer className="footer-container">
      <FooterSection className="footer-section">
        <Typography variant="h6">Contact Us</Typography>
        <Typography><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Health St, Wellness City</Typography>
        <Typography><FontAwesomeIcon icon={faPhone} /> +1 (234) 567-8901</Typography>
        <Typography><FontAwesomeIcon icon={faEnvelope} /> info@doctorwebsite.com</Typography>
      </FooterSection>
      <FooterSection className="footer-section">
        <Typography variant="h6">Our Services</Typography>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><FontAwesomeIcon icon={faStethoscope} /> General Checkup</li>
          <li><FontAwesomeIcon icon={faSyringe} /> Vaccinations</li>
          <li><FontAwesomeIcon icon={faPills} /> Prescription Services</li>
          <li><FontAwesomeIcon icon={faHeartbeat} /> Cardiology</li>
        </ul>
      </FooterSection>
      <FooterSection className="footer-section">
        <Typography variant="h6" className="follow-us">Follow Us</Typography>
        <SocialIcons className="social-icons">
          <AnimatedIconButton component={Link} href="https://www.facebook.com" target="_blank" sx={{ color: iconColors.facebook }} className="animated-icon-button">
            <FaFacebookF />
          </AnimatedIconButton>
          <AnimatedIconButton component={Link} href="https://www.instagram.com" target="_blank" sx={{ color: iconColors.instagram }} className="animated-icon-button">
            <FaInstagram />
          </AnimatedIconButton>
          <AnimatedIconButton component={Link} href="https://www.linkedin.com" target="_blank" sx={{ color: iconColors.linkedin }} className="animated-icon-button">
            <FaLinkedinIn />
          </AnimatedIconButton>
        </SocialIcons>
      </FooterSection>
    </FooterContainer>
  );
};

export default Footer;
