import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import weddingImg from '../../assets/taxi.jpg';

const WeddingService = () => {
  const serviceData = {
    name: 'Wedding Services',
    image: weddingImg,
    desc: 'Elegant and stylish wedding car hire for your special day in Sydney.',
    useCases: [
      'Bridal Party Transport',
      'Groom Transport',
      'Guest Shuttles',
      'Venue Transfers',
      'Flexible Packages',
      'Professional Chauffeurs'
    ]
  };

  return <ServiceTemplate service={serviceData} />;
};

export default WeddingService;
