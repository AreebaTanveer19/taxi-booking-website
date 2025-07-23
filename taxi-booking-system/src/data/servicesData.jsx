import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EventIcon from '@mui/icons-material/Event';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import airportimg from '../assets/taxi1.png';
import corporateimg from '../assets/taxi1.png';
import weddingimg from '../assets/taxi1.png';
import executiveimg from '../assets/taxi1.png';
import tourimg from '../assets/taxi1.png';
import crewimg from '../assets/taxi1.png';

const servicesData = [
  {
    id: 'airport-transfers',
    name: 'Airport Transfers',
    icon: <FlightTakeoffIcon fontSize="large" />, 
    image: airportimg,
    desc: 'Reliable and punctual airport transfers for all your flights.',
    useCases: [
      'Domestic & International Flights',
      'Meet & Greet Service',
      'Flight Tracking',
      'Luggage Assistance'
    ]
  },
  {
    id: 'corporate-transfers',
    name: 'Corporate Transfers',
    icon: <BusinessCenterIcon fontSize="large" />,
    image: corporateimg,
    desc: 'Professional transportation for business executives and corporate events.',
    useCases: [
      'Executive Commutes',
      'Client Meetings',
      'Corporate Events',
      'Conference Transfers'
    ]
  },
  {
    id: 'wedding-services',
    name: 'Wedding Services',
    icon: <EventIcon fontSize="large" />,
    image: weddingimg,
    desc: 'Elegant and stylish wedding car hire for your special day.',
    useCases: [
      'Bridal Party Transport',
      'Groom Transport',
      'Guest Shuttles',
      'Venue Transfers'
    ]
  },
  {
    id: 'event-transportation',
    name: 'Event Transportation',
    icon: <EmojiEventsIcon fontSize="large" />,
    image: executiveimg,
    desc: 'Group transportation for concerts, sports, and special events.',
    useCases: [
      'Concert Transfers',
      'Sporting Events',
      'Galas & Awards',
      'VIP Event Access'
    ]
  },
  {
    id: 'tours-sightseeing',
    name: 'Tours & Sightseeing',
    icon: <DirectionsCarIcon fontSize="large" />,
    image: tourimg,
    desc: 'Guided tours with luxury transportation to explore the city.',
    useCases: [
      'City Tours',
      'Wine Country Tours',
      'Custom Itineraries',
      'Multi-Day Excursions'
    ]
  },
  {
    id: 'crew-shuttles',
    name: 'Crew Shuttles',
    icon: <LocalShippingIcon fontSize="large" />,
    image: crewimg,
    desc: 'Efficient crew transportation for film, TV, and production teams.',
    useCases: [
      'Film & TV Shoots',
      'Production Crews',
      'Equipment Transport',
      'Location Shuttles'
    ]
  }
];

export default servicesData;
