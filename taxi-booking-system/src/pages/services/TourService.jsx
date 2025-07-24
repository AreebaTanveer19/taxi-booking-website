import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import tourImg from '../../assets/taxi.jpg';

const TourService = () => {
  const serviceData = {
    name: 'Tours & Sightseeing',
    image: tourImg,
    desc: 'Guided tours with luxury transportation to explore Sydney and beyond.',
    useCases: [
      'City Tours',
      'Wine Country Tours',
      'Custom Itineraries',
      'Multi-Day Excursions',
      'Knowledgeable Drivers',
      'Flexible Scheduling'
    ]
  };

  return <ServiceTemplate service={serviceData} />;
};

export default TourService;
