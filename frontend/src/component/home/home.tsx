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

      {/* Features Section */}
      <div className="relative z-10 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-neon mb-6 bg-gradient-to-r from-neon-400 to-cyan-400 bg-clip-text text-transparent">
              Why Choose QuickClinic?
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Experience healthcare reimagined with cutting-edge technology and compassionate care
            </p>
          </motion.div>

          <Row className="g-4">
            {[
              {
                icon: <Heart className="w-12 h-12" />,
                title: "Quality Healthcare",
                description: "We provide the best medical care with state-of-the-art facilities and experienced professionals.",
                gradient: "from-red-500 to-pink-500"
              },
              {
                icon: <Stethoscope className="w-12 h-12" />,
                title: "Expert Doctors",
                description: "Our team of highly skilled and experienced doctors are dedicated to your well-being.",
                gradient: "from-neon-500 to-cyan-500"
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: "Advanced Technology",
                description: "We use the latest medical technology to provide exceptional and accurate care.",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: <Clock className="w-12 h-12" />,
                title: "24/7 Support",
                description: "Round-the-clock support and emergency services for your peace of mind.",
                gradient: "from-purple-500 to-violet-500"
              }
            ].map((feature, index) => (
              <Col lg={3} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassCard hover className="h-full text-center">
                    <motion.div
                      className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-white/80 leading-relaxed">{feature.description}</p>
                  </GlassCard>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* About Us Section */}
      <div className="relative z-10 py-20">
        <Container>
          <Row className="items-center">
            <Col lg={6} className="mb-12 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <GlassCard glow className="p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-neon-500 to-cyan-500 rounded-full flex items-center justify-center"
                    >
                      <Heart className="w-16 h-16 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-white">Our Mission</h3>
                    <p className="text-white/80 mt-4">
                      Transforming healthcare through innovation and compassion
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            </Col>
            
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="pl-0 lg:pl-8"
              >
                <h2 className="text-4xl md:text-5xl font-bold font-neon mb-8 bg-gradient-to-r from-neon-400 to-cyan-400 bg-clip-text text-transparent">
                  About QuickClinic
                </h2>
                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  QuickClinic is dedicated to revolutionizing healthcare through cutting-edge technology, 
                  compassionate care, and innovative solutions. Our mission is to enhance the well-being 
                  of our community by providing accessible, high-quality medical services.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    "Advanced Medical Technology",
                    "Experienced Healthcare Professionals", 
                    "24/7 Emergency Services",
                    "Personalized Patient Care"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-neon-400 to-cyan-400 rounded-full" />
                      <span className="text-white/90">{item}</span>
                    </motion.div>
                  ))}
                </div>
                <Link to="/user/signup">
                  <NeonButton size="lg">
                    <Zap className="w-5 h-5" />
                    Join Our Community
                  </NeonButton>
                </Link>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
