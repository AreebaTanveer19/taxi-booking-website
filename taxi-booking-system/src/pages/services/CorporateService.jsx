import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import corporateImg from '../../assets/taxi.jpg';

const CorporateService = () => {
  const serviceData = {
    name: 'Corporate Services',
    image: corporateImg,
    desc: 'Professional transportation for business executives and corporate events in Sydney.',
    useCases: [
      'Executive Commutes',
      'Client Meetings',
      'Corporate Events',
      'Conference Transfers',
      'Airport Pickups',
      '24/7 Availability'
    ]
  };

  return <ServiceTemplate service={serviceData} />;
};

export default CorporateService;
