import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import airportImg from '../.././assets/taxi.jpg';

const AirportService = () => {
  const serviceData = {
    name: 'Airport Transfers',
    image: airportImg,
    desc: 'Reliable and punctual airport transfers for all your flights in Sydney.',
    useCases: [
      'Domestic & International Flight Transfers',
      'Flight Tracking for Delays',
      'Meet & Greet Service',
      'Luggage Assistance',
      'Child Seats Available',
      '24/7 Availability'
    ]
  };

  return <ServiceTemplate service={serviceData} />;
};

export default AirportService;
