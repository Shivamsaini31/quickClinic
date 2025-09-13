import React from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="homepage flex flex-col">
      {/* Hero Section */}
      <div className="hero-section d-flex align-items-center justify-content-center bg-gradient-to-r from-blue-600 to-blue-800 min-h-screen">
        <Container>
          <Row>
            <Col md={6} className="text-center text-md-left ml-16">
              <h1 className="display-4 text-white animate-fade-in font-bold text-4xl md:text-6xl mb-6">
                Welcome to Doctor Quick Clinic
              </h1>
              <p className="text-white lead animate-slide-in mt-6 text-lg md:text-xl mb-8">
                Your health, our priority. Join us today for a healthier tomorrow!
              </p>
              {/* Link to the login page */}
              <Link to="/user/login">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="mt-6 animate-bounce bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
                >
                  Get Started
                </Button>
              </Link>
            </Col>
            <Col>
              {/* Empty column for layout */}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Slideshow Section */}
      <div className='flex justify-center align-items-center py-16'>
        <Container className="mt-5 ml-36">
          <Carousel fade className="carousel-animated">
            <Carousel.Item>
              <div className="d-block w-full h-96 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🏥</div>
                  <h3 className="text-4xl font-bold">Quality Healthcare</h3>
                </div>
              </div>
              <Carousel.Caption className="bg-black bg-opacity-50 rounded-lg p-4">
                <h3 className="animate-zoom-in text-2xl font-bold text-white">Quality Healthcare</h3>
                <p className="animate-fade-in text-white">We provide the best medical care in the city.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-block w-full h-96 bg-gradient-to-r from-green-500 to-green-700 rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">👨‍⚕️</div>
                  <h3 className="text-4xl font-bold">Experienced Doctors</h3>
                </div>
              </div>
              <Carousel.Caption className="bg-black bg-opacity-50 rounded-lg p-4">
                <h3 className="animate-zoom-in text-2xl font-bold text-white">Experienced Doctors</h3>
                <p className="animate-fade-in text-white">Our team of doctors are highly skilled and experienced.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-block w-full h-96 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🏗️</div>
                  <h3 className="text-4xl font-bold">State-of-the-art Facilities</h3>
                </div>
              </div>
              <Carousel.Caption className="bg-black bg-opacity-50 rounded-lg p-4">
                <h3 className="animate-zoom-in text-2xl font-bold text-white">State-of-the-art Facilities</h3>
                <p className="animate-fade-in text-white">We use the latest technology to provide exceptional care.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>
      </div>

      {/* About Us Section */}
      <Container className="about-us mt-5 py-16">
        <Row>
          <Col md={6} className="animate-slide-up">
            <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shadow-lg w-full h-96 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <div className="text-8xl mb-4">🏥</div>
                <h3 className="text-2xl font-bold">Our Clinic</h3>
              </div>
            </div>
          </Col>
          <Col md={6} className="d-flex flex-column justify-content-center animate-slide-up pl-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About Doctor Quick Clinic</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Doctor Quick Clinic is dedicated to providing comprehensive healthcare services. Our mission is to enhance
              the well-being of our community through compassionate care and the latest medical advancements.
            </p>
            <Button 
              variant="outline-primary" 
              size="lg" 
              className="mt-3 animate-hover-grow border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Learn More
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
