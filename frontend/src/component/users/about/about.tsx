import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            About QuickClinic
          </h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              QuickClinic is a comprehensive healthcare management platform that connects patients with doctors, 
              enabling seamless appointment booking, real-time messaging, and payment processing.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Our mission is to make healthcare more accessible and convenient for everyone. We provide a 
              modern, user-friendly platform that streamlines the entire healthcare experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-xl font-semibold mb-2">Quality Care</h3>
                <p className="text-gray-600">We ensure the highest standards of medical care.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Quick Access</h3>
                <p className="text-gray-600">Fast and easy appointment booking system.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-2">Secure</h3>
                <p className="text-gray-600">Your data and privacy are our top priority.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
