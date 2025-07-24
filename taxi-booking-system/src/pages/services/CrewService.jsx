import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import crewImg from '../../assets/taxi.jpg';

const CrewService = () => {
  const serviceData = {
    name: 'Crew Shuttles',
    image: crewImg,
    desc: 'Efficient crew transportation for film, TV, and production teams in Sydney.',
    useCases: [
      'Film & TV Shoots',
      'Production Crews',
      'Equipment Transport',
      'Location Shuttles',
      'Flexible Scheduling',
      'Large Vehicle Options'
    ]
  };

  return <ServiceTemplate service={serviceData} />;
};

export default CrewService;
