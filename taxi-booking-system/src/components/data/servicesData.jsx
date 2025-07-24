import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EventIcon from '@mui/icons-material/Event';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import img1 from '../../assets/A7.png';
import img2 from '../../assets/A8.png';
import img3 from '../../assets/Q7.png';
import img4 from '../../assets/crew.jpeg';

const servicesData = [
  {
    id: 'airport-transfers',
    name: 'Airport Transfers',
    icon: <FlightTakeoffIcon fontSize="large" />,
    images: [
      'https://i.pinimg.com/1200x/f8/c5/f9/f8c5f92b0d721cda2270948c5a1b4074.jpg',
      img2,
      img3,
    ],
    desc: 'Our premium airport transfer service ensures you arrive at your flight on time and in style. We monitor flight statuses in real-time and adjust pickup times accordingly. Our professional chauffeurs will assist with luggage and provide a comfortable ride in our luxury vehicles.',
    detailedDesc: 'Choose from our fleet of luxury sedans, SUVs, or vans for your airport transfer. We offer meet-and-greet services where our chauffeur will wait for you in the arrivals hall with a name sign. Our vehicles are equipped with WiFi, bottled water, and phone chargers for your convenience.',
    features: [
      {
        title: 'Flight Monitoring',
        description: 'We track your flight status to adjust pickup times for delays'
      },
      {
        title: 'Meet & Greet',
        description: 'Driver meets you in arrivals hall with name sign'
      },
      {
        title: 'Luggage Assistance',
        description: 'Professional handling of all your baggage'
      }
    ],
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
    images: [
      'https://i.pinimg.com/736x/19/b5/fc/19b5fcec704c5767652b1dbebffd52ae.jpg',
      img2,
      img3
    ],
    desc: 'Professional transportation solutions for business executives and corporate events. Our discreet chauffeurs understand the importance of punctuality for business meetings.',
    detailedDesc: 'Our corporate clients enjoy priority booking and 24/7 support. Vehicles are equipped with work-friendly amenities including laptop trays, premium sound systems, and privacy partitions. We maintain strict confidentiality for all corporate clients.',
    features: [
      {
        title: 'Discreet Service',
        description: 'Professional drivers maintain complete confidentiality'
      },
      {
        title: 'WiFi Enabled',
        description: 'Stay productive with onboard WiFi and charging ports'
      },
      {
        title: 'Multi-Stop Routing',
        description: 'Efficient routing between meetings and appointments'
      }
    ],
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
    images: [
      'https://i.pinimg.com/736x/62/af/ad/62afadc281ac579ceb3d575f5351df80.jpg',
      img2,
      img3
    ],
    desc: 'Make your special day unforgettable with our elegant wedding car hire service. We offer classic and modern vehicles to complement your wedding theme.',
    detailedDesc: 'Our wedding packages include decorated vehicles, complimentary champagne, and flexible scheduling to accommodate wedding day timelines. We provide door-to-door service for the bridal party and can coordinate with your wedding planner.',
    features: [
      {
        title: 'Decorated Vehicles',
        description: 'Vehicles decorated to match your wedding theme'
      },
      {
        title: 'Complimentary Champagne',
        description: 'Enjoy champagne on your special day'
      },
      {
        title: 'Flexible Scheduling',
        description: 'We accommodate your wedding day timeline'
      }
    ],
    useCases: [
      'Bridal Party Transport',
      'Groom Transport',
      'Guest Shuttles',
      'Venue Transfers'
    ]
  },
  {
    id: 'parcel-transfer',
    name: 'Parcel Transfer',
    icon: <LocalShippingIcon fontSize="large" />,
    images: [
      'https://i.pinimg.com/736x/0a/eb/3e/0aeb3ea13895bf06694135173b017f18.jpg',
      img2,
      img3
    ],
    desc: 'Reliable and secure parcel delivery service for time-sensitive packages across the city.',
    detailedDesc: 'Our specialized parcel transfer service ensures your important documents and packages reach their destination safely and on time. We offer real-time tracking and flexible pickup/delivery options.',
    features: [
      {
        title: 'Real-Time Tracking',
        description: 'Track your package in real-time'
      },
      {
        title: 'Flexible Pickup/Delivery',
        description: 'We accommodate your schedule'
      },
      {
        title: 'Secure Delivery',
        description: 'Your packages are handled with care'
      }
    ],
    useCases: [
      'Document Delivery',
      'Time-Sensitive Packages',
      'Business Deliveries',
      'Same-Day Shipping'
    ]
  },
  {
    id: 'special-events',
    name: 'Special Events',
    icon: <DirectionsCarIcon fontSize="large" />,
    images: [
      'https://i.pinimg.com/736x/0c/51/9d/0c519da9910606b2f4ab3658ea2e4217.jpg',
      img2,
      img3
    ],
    desc: 'Premium transportation for special occasions and exclusive events. Arrive in style for your important moments.',
    detailedDesc: 'Our special event service provides luxury transportation tailored for your unique occasions. Whether it\'s anniversaries, birthdays, or exclusive gatherings, we offer discreet and professional service with vehicles that make a statement.',
    features: [
      {
        title: 'Luxury Vehicles',
        description: 'Arrive in style with our luxury vehicles'
      },
      {
        title: 'Discreet Service',
        description: 'Professional drivers maintain complete confidentiality'
      },
      {
        title: 'Customized Service',
        description: 'We tailor our service to your unique occasion'
      }
    ],
    useCases: [
      'Anniversaries',
      'Birthdays',
      'VIP Gatherings',
      'Exclusive Parties'
    ]
  },
  {
    id: 'crew-transfers',
    name: 'Crew Transfers',
    icon: <LocalShippingIcon fontSize="large" />,
    images: [
      'https://i.pinimg.com/1200x/fe/cc/a5/fecca506a23622ee7634b308ff007150.jpg',
      img2,
      img3
    ],
    desc: 'Reliable transportation for film crews, production teams, and corporate groups requiring frequent shuttles between locations.',
    detailedDesc: 'Our crew shuttle service offers flexible scheduling to accommodate changing production needs. We provide vehicles ranging from luxury vans to coaches, all with ample storage space for equipment. Our drivers are experienced in navigating to remote locations and film sets.',
    features: [
      {
        title: 'Flexible Scheduling',
        description: 'We accommodate your changing production needs'
      },
      {
        title: 'Luxury Vehicles',
        description: 'Travel in comfort with our luxury vehicles'
      },
      {
        title: 'Experienced Drivers',
        description: 'Our drivers are experienced in navigating to remote locations'
      }
    ],
    useCases: [
      'Film & TV Shoots',
      'Production Crews',
      'Equipment Transport',
      'Location Shuttles'
    ]
  }
];

export default servicesData;
