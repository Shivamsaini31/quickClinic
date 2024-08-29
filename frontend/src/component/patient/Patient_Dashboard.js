// src/App.js
import React from 'react'; 
import Card from '../common/Card';
import './Pat_Dash.css'
import url_to_doctor_image1 from '../../images/1.jpg'
import url_to_doctor_image2 from '../../images/2.jpg'
import url_to_doctor_image3 from '../../images/3.jpg' 
import ConsultationCard from './ConsultationCard';
import SpecialtyGrid from './SpecialtyGrid';
import menstrualcycle from '../../images/mens.jpg'
import acne from '../../images/acne.jpg'
import cold_cough from '../../images/cold_cough.jpg'
import child_not from '../../images/child.avif'
import depp from '../../images/depp.jpg'
import dentist from '../../images/oral.png'
import gynecologist from '../../images/Gynecologist.jpg'
import nutrition from '../../images/Nutrition.jpg'
import physiotherapist from '../../images/Physiotherapist.jpg'
import { Link } from 'react-router-dom';

 
function App() {
    const consultationOptions = [
        { title: 'Period doubts or Pregnancy', image: menstrualcycle },
        { title: 'Acne, pimple or skin issues', image: acne }, 
        { title: 'Cold, cough or fever', image: cold_cough },
        { title: 'Child not feeling well', image: child_not },
        { title: 'Depression or anxiety', image: depp },
      ];
    
      const specialties = [{title:'Dentist',image : dentist},{title:'Gynecologist/Obstetrician',image:gynecologist},{title:'Dietitian/Nutrition',image:nutrition},{title:'Physiotherapist',image:physiotherapist}];
  return (
    <>
    <div className='app-container'> 
      <div>
        <Card
            title="Find the best doctors in your vicinity"
            description="With the help of our intelligent algorithms, now locate the best doctors around your vicinity at total ease."
            imageUrl={url_to_doctor_image1}
            url="/doctors"
        />
      </div>
      <div>
        <Card
            title="Schedule appointments with expert doctors"
            description="Find experienced specialist doctors with expert ratings and reviews and book your appointments hassle-free."
            imageUrl={url_to_doctor_image2}
            url="/appointments"
        />
      </div>
      <div>
        <Card
            title="Book face-to-face appointments"
            description="Can't go to the hospital? Book video call appointments with your doctor within the app in a few minutes."
            imageUrl={url_to_doctor_image3}
            url="/video-appointments"
        /> 
      </div>
    </div>
    <div className="app">
        <div className="header">
        <h1>Consult top doctors online for any health concern</h1>
        <p>Private online consultations with verified doctors in all specialties</p> 
        </div>
      <div className="consultation-cards">
        {consultationOptions.map((option, index) => (
          <ConsultationCard key={index} title={option.title} image={option.image} />
        ))}
      </div>
      <h2>Book an appointment for an in-clinic consultation</h2>
      <SpecialtyGrid specialties={specialties} />
      <Link to={'/appointment/appointment.js'} ><button className='linkyo'>Consult Now</button></Link> 
    </div>
    </>
  );
}

export default App;
