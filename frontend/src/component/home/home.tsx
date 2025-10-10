import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SimpleParticleBackground from '../common/SimpleParticleBackground';
import GlassCard from '../common/GlassCard';
import NeonButton from '../common/NeonButton';
import { Heart, Stethoscope, Shield, Zap, Users, Clock } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="homepage relative min-h-screen overflow-hidden">
      {/* Particle Background */}
      <SimpleParticleBackground />
      
      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <Container className="relative z-20">
          <Row className="items-center">
            <Col lg={6} className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold font-neon mb-6 bg-gradient-to-r from-neon-400 via-cyan-400 to-neon-500 bg-clip-text text-transparent animate-glow"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  QuickClinic
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Your health, our priority. Experience the future of healthcare with our 
                  <span className="text-cyan-400 font-semibold"> cutting-edge technology</span> and 
                  <span className="text-neon-400 font-semibold"> compassionate care</span>.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link to="/user/login">
                    <NeonButton size="lg" className="w-full sm:w-auto">
                      <Zap className="w-5 h-5" />
                      Get Started
                    </NeonButton>
                  </Link>
                  <Link to="/user/signup">
                    <NeonButton variant="outline" size="lg" className="w-full sm:w-auto">
                      <Users className="w-5 h-5" />
                      Join Now
                    </NeonButton>
                  </Link>
                </motion.div>
              </motion.div>
            </Col>
            
            <Col lg={6} className="mt-12 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative"
              >
                <GlassCard glow className="p-8">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-neon-500 to-cyan-500 rounded-full flex items-center justify-center"
                    >
                      <Stethoscope className="w-16 h-16 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-4">Advanced Healthcare</h3>
                    <p className="text-white/80">
                      State-of-the-art medical facilities with experienced professionals
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
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