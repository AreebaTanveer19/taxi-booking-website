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
    desc: 'Our premium airport transfer service ensures you arrive at your flight on time and in style. Our professional chauffeurs will assist with luggage and provide a comfortable ride in our luxury vehicles.',
    detailedDesc: 'Enjoy a seamless and stress-free airport transfer experience with our executive fleet. Choose from luxury sedans, spacious SUVs, or vans tailored to your group size and preference. Our meet-and-greet service ensures a warm welcome with your chauffeur waiting in the arrivals hall holding a name sign. Flights are tracked in real-time to avoid delays. Onboard amenities include complimentary bottled water, high-speed WiFi, mobile chargers, and climate-controlled interiors. Whether you’re flying domestic or international, we ensure timely arrival and personalized attention.',
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
      'https://i.pinimg.com/736x/00/9d/fa/009dfa15dcde9017020e6589eb166bad.jpg'
    ],
    desc: 'Professional transportation solutions for business executives and corporate events. Our discreet chauffeurs understand the importance of punctuality for business meetings.',
    detailedDesc: 'Our corporate transport service is designed with business efficiency in mind. Whether it’s a single executive commute or a full-day roadshow with multiple meetings, we offer clean, discreet, and punctual rides. All vehicles feature laptop trays, USB ports, onboard WiFi, and privacy partitions to allow productivity en route. Dedicated account managers, 24/7 support, and priority scheduling make us the preferred choice for leading corporations. Rest assured with professional chauffeurs trained to uphold complete confidentiality and handle time-critical schedules.',
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
      'https://i.pinimg.com/1200x/a9/71/d0/a971d076a33b6270548439fa6c24d467.jpg',
      'https://i.pinimg.com/736x/00/9d/fa/009dfa15dcde9017020e6589eb166bad.jpg'
    ],
    desc: 'Make your special day unforgettable with our elegant wedding car hire service. We offer classic and modern vehicles to complement your wedding theme.',
    detailedDesc: 'Create a grand entrance on your wedding day with our stunning wedding transportation options. Choose from timeless classics, luxury limousines, or modern SUVs, all available with customized decorations matching your wedding colors. Services include red carpet rollout, bridal bouquet holders, and courteous chauffeurs in formal attire. Complimentary chilled champagne is provided for toasts and photo moments. From bridal party shuttles to VIP guest transfers, we coordinate closely with your wedding planner to ensure everything runs perfectly on schedule.',
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
      'https://i.pinimg.com/1200x/a3/28/3c/a3283ca191f3ca879a3fe4567c513d11.jpg',
      'https://i.pinimg.com/1200x/63/32/3c/63323c04621887790f91a67bb46b8ca0.jpg'
    ],
    desc: 'Reliable and secure parcel delivery service for time-sensitive packages across the city.',
    detailedDesc: 'Our fast and secure parcel transfer service is ideal for businesses and individuals who value reliability and speed. Whether you\'re delivering confidential documents, valuable items, or urgent packages, we ensure door-to-door delivery with full transparency. Track your parcel in real-time and receive instant updates via SMS or email. We offer options for same-day, express, and after-hours deliveries. With trained drivers and sealed, secure compartments, your delivery is always in safe hands.',
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
      'https://i.pinimg.com/1200x/a3/28/3c/a3283ca191f3ca879a3fe4567c513d11.jpg',
     img3
    ],
    desc: 'Premium transportation for special occasions and exclusive events. Arrive in style for your important moments.',
    detailedDesc: 'Make a memorable impression at your next celebration with our luxury transportation for special events. From milestone birthdays to gala nights, our elegant vehicles add a touch of sophistication to any occasion. Each ride is tailored with music, refreshments, and ambiance suited to your theme. Chauffeurs ensure timely arrivals and hassle-free travel so you can focus on enjoying your event. Our service is ideal for red carpet arrivals, VIP guests, and intimate gatherings that demand elegance and class.',
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
      'https://i.pinimg.com/1200x/a3/28/3c/a3283ca191f3ca879a3fe4567c513d11.jpg',
      img3
    ],
    desc: 'Reliable transportation for film crews, production teams, and corporate groups requiring frequent shuttles between locations.',
    detailedDesc: 'Transport your production team or technical crew with efficiency and professionalism. Our vehicles range from executive vans to large coaches, equipped with ample storage space for gear and equipment. We understand the dynamic nature of film and event production, offering round-the-clock availability, last-minute routing changes, and multiple location pickups. Our drivers are familiar with studio locations, remote filming sites, and event venues, ensuring your team stays on schedule while traveling comfortably and securely.',
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
  ,
  {
    id: 'point-to-point',
    name: 'Point to Point',
    icon: <DirectionsCarIcon fontSize="large" />, // reuse existing icon
    images: [
      'https://i.pinimg.com/1200x/36/56/04/36560421183974f0216101c50fc0e341.jpg',
      img1,
      img2
    ],
    desc: 'Direct transfers between any two locations with upfront pricing and no hidden stops.',
    detailedDesc: 'Enjoy hassle-free direct rides between any addresses. Ideal for quick commutes, meetings across town, or evening outings, our point-to-point service offers flat-rate pricing, real-time tracking, and professional chauffeurs who take the fastest, safest routes.',
    features: [
      {
        title: 'Flat-Rate Pricing',
        description: 'Know your fare before you ride – no surge, no surprises.'
      },
      {
        title: 'Door-to-Door',
        description: 'Pickup and drop-off exactly where you need.'
      },
      {
        title: 'Real-Time Tracking',
        description: 'Share your live ETA with friends or colleagues.'
      }
    ],
    useCases: [
      'City Commutes',
      'Dinner Reservations',
      'Cross-Town Meetings',
      'Errand Runs'
    ]
  }
];

export default servicesData;
