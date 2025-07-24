import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import eventImg from '../../assets/taxi.jpg';

const EventService = () => {
  const serviceData = {
    name: 'Event Transportation',
    image: eventImg,
    desc: 'Group transportation for concerts, sports, and special events in Sydney.',
    useCases: [
      'Concert Transfers',
      'Sporting Events',
      'Galas & Awards',
      'VIP Event Access',
      'Multiple Vehicle Options',
      'Professional Drivers'
    ]
  };

  return <ServiceTemplate service={serviceData} />;
};

export default EventService;
