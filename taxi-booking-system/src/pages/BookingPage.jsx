import React, { useState, useEffect, useRef } from "react";
import { LoadScript, Autocomplete, GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../styles/BookingPage.css";
import { FaClipboardCheck, FaRegClock, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import enGB from 'date-fns/locale/en-GB';
import { sendBookingConfirmationEmail } from '../utils/emailService';

// Register the UK locale for 24-hour time format
registerLocale('en-GB', enGB);


const BookingPage = () => {
  // State for thank you modal
  const [thankYouModal, setThankYouModal] = useState({
    show: false,
    isSpecialVehicle: false,
    vehicleType: ''
  });
  const pickupAutocompleteRef = useRef(null);
  const dropoffAutocompleteRef = useRef(null);
  const phoneInputRef = useRef();
  const formContainerRef = useRef();
  // Refs for error fields
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const cityRef = useRef();
  const serviceTypeRef = useRef();
  const pickupRef = useRef();
  const dropoffRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const expectedEndTimeRef = useRef();
  const vehicleRef = useRef();
  const nameOnCardRef = useRef();
  const cardNumberRef = useRef();
  const expiryMonthRef = useRef();
  const expiryYearRef = useRef();
  const cvcRef = useRef();
  const termsRef = useRef();
  const [distanceLoading, setDistanceLoading] = useState(false);
  const [distanceError, setDistanceError] = useState("");
  const [errors, setErrors] = useState({});
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingTooSoon, setIsBookingTooSoon] = useState(false);
  const [quoteRequested, setQuoteRequested] = useState(false);
  const [showQuoteConfirmation, setShowQuoteConfirmation] = useState(false);

  const [form, setForm] = useState({
    bookingMethod: "distance",
    name: "",
    email: "",
    phone: "",
    city: "",
    serviceType: "",
    airportDirection: "", // New field for airport direction (to/from)
    flightDetails: {
      flightNumber: "",
      flightTime: "",
    },
    terminal: "",
    luggage: "",
    specialInstructions: "",
    paymentMethod: "Card",
    nameOnCard: "",
    cardNumber: "",
    cardType: "Visa",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    termsAccepted: false,
    vehiclePreference: "",
    date: null,
    time: null,
    expectedEndTime: null,
    passengers: 1,
    pickup: "",
    dropoff: "",
    additionalStop: "",
    distance: "",
    adults: 1,
    children_0_4: 0,
    children_5_8: 0,
    suitcases: 0,
    carryOn: 0,
  });
  
  const additionalStopAutocompleteRef = useRef(null);

  const fleet = [
    {
      id: 1,
      name: "Executive Sedan",
      capacity: "1-4 PAX • 2 Suitcases",
      models: "Lexus, Mercedes E Class, BMW 5 Series",
      features: [
        "Air Conditioning",
        "Leather Seats",
        "Phone Chargers",
        "Bottled Water",
      ],
      image:
        "https://i.pinimg.com/1200x/fa/9e/3d/fa9e3dbc28c719ec1caa58a73dcf261f.jpg",
      idealFor: "Business meetings, airport transfers, and special occasions",
    },
    
    {
      id: 2,
      name: "Premium SUV",
      capacity: "1-6 PAX • 3 Suitcases • 2 Carry On",
      models: "Audi Q7 or Similar",
      features: [
        "Spacious Interior",
        "All-Wheel Drive",
        "Child Seats Available",
        "Climate Control",
      ],
      image:
        "https://i.pinimg.com/1200x/1d/d3/4a/1dd34ad755b30b3f0f00d65a1418bf1c.jpg",
      idealFor: "Family vacations, group outings, and road trips",
    },
    {
      id: 3,
      name: "Premium Sedan",
      capacity: "1-4 PAX • 2 Suitcases",
      models: "Mercedes S Class, BMW 7 Series or Audi A8",
      features: [
        "Premium Sound System",
        "Massage Seats",
        "WiFi",
        "Refreshments",
      ],
      image:
        "https://i.pinimg.com/1200x/a9/71/d0/a971d076a33b6270548439fa6c24d467.jpg",
      idealFor: "Corporate events, weddings, and luxury getaways",
    },
    {
      id: 4,
      name: "Luxury Van",
      capacity: "1-7 PAX • 5 Suitcases",
      models: "Mercedes Van or Similar",
      features: [
        "Ample Luggage Space",
        "Comfortable Seating",
        "Privacy Partitions",
        "Entertainment System",
      ],
      image:
        "https://i.pinimg.com/1200x/a3/28/3c/a3283ca191f3ca879a3fe4567c513d11.jpg",
      idealFor: "Group transportation, parties, and events",
    },
    {
      id: 5,
      name: "Sprinter",
      capacity: "1-11 PAX • 6 Suitcases/Trailer",
      models: "Mercedes Sprinter or Similar",
      features: [
        "Group Transport",
        "Luxury Seating",
        "Onboard Restroom",
        "Professional Driver",
      ],
      image:
        "https://i.pinimg.com/1200x/63/32/3c/63323c04621887790f91a67bb46b8ca0.jpg",
      idealFor: "Large groups, corporate events, and weddings",
    },
  ];

  // Airport terminal addresses for auto-filling pickup/dropoff locations
  const airportTerminalAddresses = {
    Sydney: {
      "T1 International": "Sydney Airport Terminal 1, International Terminal, Sydney NSW 2020, Australia",
      "T2 Domestic": "Sydney Airport Terminal 2, Domestic Terminal, Sydney NSW 2020, Australia",
      "T3 Domestic": "Sydney Airport Terminal 3, Domestic Terminal, Sydney NSW 2020, Australia"
    },
    Melbourne: {
      "T1 International": "Melbourne Airport Terminal 1, Departure Dr, Melbourne Airport VIC 3045, Australia",
      "T2 Domestic": "Melbourne Airport Terminal 2, Departure Dr, Melbourne Airport VIC 3045, Australia",
      "T3 Domestic": "Melbourne Airport Terminal 3, Departure Dr, Melbourne Airport VIC 3045, Australia",
      "T4 Domestic": "Melbourne Airport Terminal 4, Departure Dr, Melbourne Airport VIC 3045, Australia"
    }
  };

  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("distance");
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [estimatedFare, setEstimatedFare] = useState(0);
  const [directions, setDirections] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const SYDNEY_CENTER = { lat: -33.8688, lng: 151.2093 };
  const DEFAULT_ZOOM = 12;

  // Handler for pickup autocomplete
  const handlePickupPlaceChanged = () => {
    const place = pickupAutocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      setForm((prev) => ({ ...prev, pickup: place.formatted_address }));
      // Clear pickup error when valid location is selected
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.pickup;
        return newErrors;
      });
    }
  };

  // Handler for dropoff autocomplete
  const handleDropoffPlaceChanged = () => {
    const place = dropoffAutocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      setForm((prev) => ({ ...prev, dropoff: place.formatted_address }));      // Clear dropoff error when valid location is selected
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.dropoff;
        return newErrors;
      });
    }
  };

  // Handler for additional stop autocomplete
  const handleAdditionalStopPlaceChanged = () => {
    const place = additionalStopAutocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      setForm((prev) => ({ ...prev, additionalStop: place.formatted_address }));
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.additionalStop;
        return newErrors;
      });
    }
  };

  // Handler for airport direction change
  const handleAirportDirectionChange = (direction) => {
    setForm((prev) => {
      const updatedForm = { ...prev, airportDirection: direction };
      
      // Auto-fill pickup or dropoff based on direction and terminal
      if (direction && prev.terminal && prev.city) {
        const terminalAddress = airportTerminalAddresses[prev.city]?.[prev.terminal];
        if (terminalAddress) {
          if (direction === "to") {
            // Going TO airport: dropoff should be the terminal
            updatedForm.dropoff = terminalAddress;
          } else if (direction === "from") {
            // Coming FROM airport: pickup should be the terminal
            updatedForm.pickup = terminalAddress;
          }
        }
      }
      
      return updatedForm;
    });
  };

  // Handler for terminal change with auto-fill logic
  const handleTerminalChange = (terminal) => {
    setForm((prev) => {
      const updatedForm = { ...prev, terminal };
      
      // Auto-fill pickup or dropoff based on direction and new terminal
      if (terminal && prev.airportDirection && prev.city) {
        const terminalAddress = airportTerminalAddresses[prev.city]?.[terminal];
        if (terminalAddress) {
          if (prev.airportDirection === "to") {
            // Going TO airport: dropoff should be the terminal
            updatedForm.dropoff = terminalAddress;
          } else if (prev.airportDirection === "from") {
            // Coming FROM airport: pickup should be the terminal
            updatedForm.pickup = terminalAddress;
          }
        }
      }
      
      return updatedForm;
    });
  };

  // Calculate distance when pickup, dropoff, or additional stop changes
  useEffect(() => {
    const calculateDistance = async () => {
      if (!form.pickup || !form.dropoff || form.bookingMethod !== "distance") {
        return;
      }
      
      setDistanceLoading(true);
      try {
        const service = new window.google.maps.DistanceMatrixService();
        let totalDistance = 0;
        
        // Calculate distance from pickup to additional stop if provided
        if (form.additionalStop) {
          const leg1 = await service.getDistanceMatrix({
            origins: [form.pickup],
            destinations: [form.additionalStop],
            travelMode: "DRIVING",
          });
          totalDistance += leg1.rows[0].elements[0].distance.value;
          
          // Calculate distance from additional stop to dropoff
          const leg2 = await service.getDistanceMatrix({
            origins: [form.additionalStop],
            destinations: [form.dropoff],
            travelMode: "DRIVING",
          });
          totalDistance += leg2.rows[0].elements[0].distance.value;
        } else {
          // Direct route if no additional stop
          const result = await service.getDistanceMatrix({
            origins: [form.pickup],
            destinations: [form.dropoff],
            travelMode: "DRIVING",
          });
          totalDistance = result.rows[0].elements[0].distance.value;
        }
        
        setForm(prev => ({
          ...prev,
          distance: totalDistance
        }));
        
        // Recalculate fare with new distance
        setEstimatedFare(calculateFare({
          ...form,
          distance: totalDistance
        }));
        
      } catch (error) {
        console.error("Error calculating distance:", error);
        setDistanceError("Failed to calculate distance. Please check the addresses and try again.");
      } finally {
        setDistanceLoading(false);
      }
    };
    
    // Add a small debounce to prevent too many API calls
    const timer = setTimeout(() => {
      calculateDistance();
    }, 500);
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.pickup, form.dropoff, form.additionalStop, form.bookingMethod]);

  const calculateDuration = (startTime, endTime) => {
    // Handle both Date objects and string time formats
    let startDate, endDate;
    
    if (startTime instanceof Date) {
      startDate = startTime;
    } else {
      const [startHours, startMinutes] = startTime.split(":").map(Number);
      startDate = new Date();
      startDate.setHours(startHours, startMinutes, 0, 0);
    }
    
    if (endTime instanceof Date) {
      endDate = endTime;
    } else {
      const [endHours, endMinutes] = endTime.split(":").map(Number);
      endDate = new Date();
      endDate.setHours(endHours, endMinutes, 0, 0);
    }
    
    // Handle overnight bookings (if end time is before start time, it's the next day)
    if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }
    
    // Calculate difference in minutes
    const diffMs = endDate - startDate;
    const diffMins = Math.floor(diffMs / 60000);
    
    return diffMins;
  };



  // State for vehicle prices
  const [vehiclePrices, setVehiclePrices] = useState({});
  const [pricesLoading, setPricesLoading] = useState(true);

  // Fetch vehicle prices on component mount
  useEffect(() => {
    const fetchVehiclePrices = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/vehicle-prices`);
        const data = await response.json();
        if (data.success) {
          // Convert array to object for easier access
          const pricesObj = {};
          data.data.forEach(price => {
            pricesObj[price.vehicleType] = {
              baseFare: price.baseFare,
              perKmRate: price.perKmRate,
              hourlyRate: price.hourlyRate,
              baseDistance: price.baseDistance
            };
          });
          setVehiclePrices(pricesObj);
        }
      } catch (error) {
        console.error('Error fetching vehicle prices:', error);
        // Fallback to default prices if API fails
        setVehiclePrices({
          "Executive Sedan": { baseFare: 70, perKmRate: 2.5, hourlyRate: 100, baseDistance: 1 },
          "Premium Sedan": { baseFare: 125, perKmRate: 5.5, hourlyRate: 120, baseDistance: 5 },
          "Premium SUV": { baseFare: 80, perKmRate: 3, hourlyRate: 110, baseDistance: 1 },
          "Luxury Van": { baseFare: 110, perKmRate: 4.5, hourlyRate: 130, baseDistance: 5 },
          "Sprinter": { baseFare: 150, perKmRate: 6, hourlyRate: 200, baseDistance: 10 }
        });
      } finally {
        setPricesLoading(false);
      }
    };

    fetchVehiclePrices();
  }, []);

  // Returns a breakdown of all fare components for transparency
  const calculateFareBreakdown = (formData) => {
    let baseFare = 0;
    let distanceCharge = 0;
    let timeCharge = 0;
    let terminalToll = 0;
    let babySeatTotal = 0;
    let boosterSeatTotal = 0;
    let total = 0;
    const distanceInKm = (formData.distance || 0) / 1000;
    
    if (pricesLoading) {
      // Return a loading state with all zeros if prices are still loading
      return {
        baseFare: 0,
        distanceCharge: 0,
        timeCharge: 0,
        terminalToll: 0,
        babySeatTotal: 0,
        boosterSeatTotal: 0,
        additionalStopCharge: 0,
        total: 0,
        loading: true
      };
    }
    
    if (formData.bookingMethod === "distance") {
      const rates = vehiclePrices[formData.vehiclePreference] || vehiclePrices["Executive Sedan"] || 
        { baseFare: 70, perKmRate: 2.5, baseDistance: 1 };
      
      baseFare = rates.baseFare;
      if (distanceInKm > rates.baseDistance) {
        distanceCharge = (distanceInKm - rates.baseDistance) * rates.perKmRate;
      }
      total = baseFare + distanceCharge;
    } else {
      // Time-based
      const rates = vehiclePrices[formData.vehiclePreference] || vehiclePrices["Executive Sedan"] || 
        { hourlyRate: 100 };
      const hours = calculateDuration(formData.time, formData.expectedEndTime) / 60;
      timeCharge = hours * rates.hourlyRate;
      total = timeCharge;
    }

    // Terminal tolls
    if (formData.serviceType === "Airport Transfers" && formData.terminal) {
      const terminalTolls = {
        "T1 International": 15,
        "T2 Domestic": 7,
        "T3 Domestic": 5,
        "T4 Domestic": 7,
      };
      terminalToll = terminalTolls[formData.terminal] || 0;
      total += terminalToll;
    }

    // Additional stop charge
    const additionalStopCharge = formData.additionalStop ? 10 : 0;

    // Child seats
    const babySeatCharge = 10;
    const boosterSeatCharge = 10;
    babySeatTotal = (formData.children_0_4 || 0) * babySeatCharge;
    boosterSeatTotal = (formData.children_5_8 || 0) * boosterSeatCharge;
    total += babySeatTotal + boosterSeatTotal + additionalStopCharge;

    return {
      baseFare: Math.round(baseFare),
      distanceCharge: Math.round(distanceCharge),
      timeCharge: Math.round(timeCharge),
      terminalToll: Math.round(terminalToll),
      babySeatTotal: Math.round(babySeatTotal),
      boosterSeatTotal: Math.round(boosterSeatTotal),
      additionalStopCharge: Math.round(additionalStopCharge),
      total: Math.round(total)
    };
  };

  // Legacy: used in vehicle cards
  const calculateFare = (formData) => calculateFareBreakdown(formData).total;


  const calculateRoute = async () => {
    if (form.pickup && form.dropoff && window.google) {
      try {
        const directionsService = new window.google.maps.DirectionsService();
        const waypoints = [];
        
        // Add additional stop as a waypoint if provided
        if (form.additionalStop) {
          waypoints.push({
            location: form.additionalStop,
            stopover: true
          });
        }

        const result = await new Promise((resolve, reject) => {
          directionsService.route(
            {
              origin: form.pickup,
              destination: form.dropoff,
              waypoints: waypoints,
              optimizeWaypoints: true,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === "OK") {
                resolve(result);
              } else {
                console.error("Directions request failed due to ", status);
                reject(status);
              }
            }
          );
        });

        setDirections(result);
      } catch (error) {
        console.error("Error calculating route:", error);
        // Optionally set an error state to show to the user
        setDistanceError("Unable to calculate route. Please check the addresses and try again.");
      }
    }
  };

  useEffect(() => {
    if (mapLoaded && form.pickup && form.dropoff) {
      calculateRoute();
    }
  }, [form.pickup, form.dropoff, mapLoaded]);

  useEffect(() => {
    if (form.bookingMethod === "distance") {
      calculateRoute();
    } else if (
      form.bookingMethod === "time" &&
      form.time &&
      form.expectedEndTime
    ) {
      setEstimatedFare(calculateFare(form));
    }
  }, [
    form.pickup,
    form.dropoff,
    form.time,
    form.expectedEndTime,
    form.bookingMethod,
  ]);

  // Google Maps API key validation
  if (!googleMapsApiKey) {
    console.error("Google Maps API key is missing");
  }

  const checkBookingTime = (date, time) => {
    if (!date || !time) return false;
    
    // Create a new date object for the booking time
    const bookingDateTime = new Date(date);
    
    // If time is a string (HH:MM), parse it
    if (typeof time === 'string') {
      const [hours, minutes] = time.split(':');
      bookingDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    } else if (time instanceof Date) {
      // If time is a Date object, use it directly
      bookingDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);
    } else {
      return false;
    }
    
    const now = new Date();
    const eightHoursFromNow = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    
    return bookingDateTime < eightHoursFromNow;
  };

  // Handler for date and time changes
  const handleDateTimeChange = (date, field) => {
    if (!date) return;
    
    setForm(prev => {
      const newForm = { ...prev };
      let isTooSoon = false;
      
      if (field === 'date') {
        newForm.date = date;
        // Check if the selected time with the new date is too soon
        if (newForm.time) {
          isTooSoon = checkBookingTime(date, newForm.time);
        }
      } else if (field === 'time') {
        // Store the time as a Date object
        newForm.time = date;
        
        // Check if the selected time is too soon
        if (newForm.date) {
          isTooSoon = checkBookingTime(newForm.date, date);
        }
        
        // Clear the expectedEndTime error when start time is changed
        setErrors(prevErrors => ({
          ...prevErrors,
          expectedEndTime: undefined
        }));
      } else if (field === 'expectedEndTime') {
        // Store the end time as a Date object
        newForm.expectedEndTime = date;
        
        // Clear the expectedEndTime error when end time is changed
        setErrors(prevErrors => ({
          ...prevErrors,
          expectedEndTime: undefined
        }));
      }
      
      // Update the isBookingTooSoon state
      setIsBookingTooSoon(isTooSoon);
      
      return newForm;
    })
  };

  const handleInputChange = (e) => {
    if (!e || !e.target) {
      return; // Skip if no event or target
    }
    const { name, value, type, checked } = e.target;
    
    // Create updated form data
    const updatedForm = {
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    };
    
    // Check if the booking is too soon when date or time changes
    if (name === 'date' || name === 'time') {
      const isTooSoon = checkBookingTime(
        name === 'date' ? value : updatedForm.date,
        name === 'time' ? value : updatedForm.time
      );
      setIsBookingTooSoon(isTooSoon);
    }
    
    // Handle airport direction and terminal changes with auto-fill logic
    if (name === 'airportDirection') {
      handleAirportDirectionChange(value);
      return;
    }
    
    if (name === 'terminal') {
      handleTerminalChange(value);
      return;
    }
    
    setForm(updatedForm);

    // Clear pickup and dropoff when city changes
    if (name === "city") {
      setForm((prev) => ({
        ...prev,
        [name]: value,
        pickup: "",
        dropoff: "",
        // Also clear terminal and direction when city changes
        terminal: "",
        airportDirection: ""
      }));
    }

    // Clear terminal and direction when service type changes (if not airport transfers)
    if (name === "serviceType" && value !== "Airport Transfers") {
      setForm((prev) => ({
        ...prev,
        [name]: value,
        terminal: "",
        airportDirection: ""
      }));
    }

    // Live error clearing with past date/time validation
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      switch (name) {
        case "name":
          if (value.trim()) delete newErrors.name;
          break;
        case "email":
          if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) delete newErrors.email;
          break;
        case "phone":
          if (value && value.length >= 8) delete newErrors.phone;
          break;
        case "city":
          if (value) delete newErrors.city;
          break;
        case "serviceType":
          if (value) delete newErrors.serviceType;
          break;
        case "pickup":
          if (value) delete newErrors.pickup;
          break;
        case "dropoff":
          if (value) delete newErrors.dropoff;
          break;
        case "date":
          if (value) {
            const today = new Date().toISOString().split("T")[0];
            if (value < today) {
              newErrors.date = "Cannot select past date";
            } else {
              delete newErrors.date;
            }
          }
          break;
        case "time":
          if (value) {
            const now = new Date();
            const selectedDateTime = new Date(
              `${
                form.date || new Date().toISOString().split("T")[0]
              }T${value}:00`
            );
            if (selectedDateTime < now) {
              newErrors.time = "Cannot select past time";
            } else {
              delete newErrors.time;
            }
          }
          break;
        case "vehiclePreference":
          if (value) delete newErrors.vehiclePreference;
          break;
        case "nameOnCard":
          if (value) delete newErrors.nameOnCard;
          break;
        case "cardNumber":
          if (/^\d{12,19}$/.test(value.replace(/\s/g, "")))
            delete newErrors.cardNumber;
          break;
        case "expiryMonth":
          if (value) delete newErrors.expiryMonth;
          break;
        case "expiryYear":
          if (value) delete newErrors.expiryYear;
          break;
        case "cvc":
          if (/^\d{3,4}$/.test(value)) delete newErrors.cvc;
          break;
        case "termsAccepted":
          if (checked) delete newErrors.termsAccepted;
          break;
        case "passengers":
        case "adults":
        case "children_0_4":
        case "children_5_8":
          // Validate that total passengers equals sum of age groups
          const currentForm = name === "passengers" ? { ...form, passengers: parseInt(value) || 0 } :
                             name === "adults" ? { ...form, adults: parseInt(value) || 0 } :
                             name === "children_0_4" ? { ...form, children_0_4: parseInt(value) || 0 } :
                             { ...form, children_5_8: parseInt(value) || 0 };
          
          const totalPassengers = parseInt(currentForm.passengers) || 0;
          const sumAgeGroups = (parseInt(currentForm.adults) || 0) + 
                              (parseInt(currentForm.children_0_4) || 0) + 
                              (parseInt(currentForm.children_5_8) || 0);
          
          if (totalPassengers !== sumAgeGroups && totalPassengers > 0 && sumAgeGroups > 0) {
            newErrors.passengers = `Total passengers (${totalPassengers}) must equal sum of all age groups (${sumAgeGroups})`;
          } else {
            delete newErrors.passengers;
          }
          break;
        default:
          break;
      }
      return newErrors;
    });
  };

  const handlePhoneChange = (value) => {
    setForm((prev) => ({ ...prev, phone: value }));
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value && value.length >= 8) delete newErrors.phone;
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate all required fields
      if (!form.name || !form.email || !form.phone || !form.city || !form.serviceType || 
          !form.pickup || !form.date || !form.time || !form.vehiclePreference) {
        alert('Please fill in all required fields');
        return;
      }

      // Check if booking is too soon
      if (checkBookingTime(form.date, form.time)) {
        setIsBookingTooSoon(true);
        alert('Bookings must be made at least 8 hours in advance. Please select a later time.');
        return;
      }

      // Format dates for submission
      const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
      };

      const formatTime = (date) => {
        if (!date) return '';
        if (typeof date === 'string') return date; // Already in HH:MM format
        const d = new Date(date);
        return d.toTimeString().slice(0, 5); // Returns HH:MM
      };

      // Calculate final cost (already includes all charges)
      let finalCost = calculateFare(form);

      // Create a clean booking data object with only the fields we want to send
      const bookingData = {
        // Basic info
        name: form.name,
        email: form.email,
        phone: form.phone,
        city: form.city,
        serviceType: form.serviceType,
        
        // Location info
        pickup: form.pickup,
        dropoff: form.dropoff || '',
        additionalStop: form.additionalStop || '',
        terminal: form.terminal || '',
        airportDirection: form.airportDirection || '',
        
        // Date and time
        date: formatDate(form.date),
        time: formatTime(form.time),
        expectedEndTime: form.expectedEndTime ? formatTime(form.expectedEndTime) : '',
        bookingMethod: form.bookingMethod || 'distance',
        
        // Passenger and luggage info
        totalPassengers: parseInt(form.adults || 0) + parseInt(form.children_0_4 || 0) + parseInt(form.children_5_8 || 0),
        adults: parseInt(form.adults || 0),
        children_0_4: parseInt(form.children_0_4 || 0),
        children_5_8: parseInt(form.children_5_8 || 0),
        suitcases: parseInt(form.suitcases || 0),
        carryOn: parseInt(form.carryOn || 0),
        
        // Vehicle and pricing
        vehiclePreference: form.vehiclePreference,
        estimatedCost: Math.round(finalCost),
        
        // System fields
        status: 'pending',
        createdAt: new Date().toISOString(),
        
        // Optional fields
        specialInstructions: form.specialInstructions || '',
        flightNumber: form.flightNumber || '',
        flightTime: form.flightTime || ''
      };

      // Log the data being sent for debugging
      console.log('Submitting booking:', bookingData);

      // Send the booking data to the backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Server error:', errorData);
        throw new Error(errorData.message || 'Failed to submit booking');
      }

      const result = await response.json();

      if (result.success) {
        // Add the booking ID from the response to the booking data
        const bookingDataWithId = {
          ...bookingData,
          _id: result.data?._id || result.bookingId || 'Pending'
        };
        
        // Check if this is a Sprinter or non-standard vehicle booking
        const isSpecialVehicle = form.vehiclePreference === 'Sprinter' || 
                             !['Airport Transfers', 'Point to Point', 'Crew Transfer'].includes(form.serviceType);
        
        // Send booking confirmation email with special flag for Sprinter/non-standard bookings
        try {
          await sendBookingConfirmationEmail({
            ...bookingData,
            bookingId: data.bookingId || 'N/A',
            isSpecialVehicle: isSpecialVehicle
          });
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError);
          // Don't fail the booking if email fails
        }

        setThankYouModal({
          show: true,
          isSpecialVehicle: isSpecialVehicle,
          vehicleType: form.vehiclePreference
        });
      } else {
        throw new Error(result.message || 'Booking failed');
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert(`Booking failed: ${error.message || 'Please check your details and try again'}`);
    }
  };

  // Helper: Scroll to first error
  const scrollToFirstError = (errorKeys) => {
    const refMap = {
      name: nameRef,
      email: emailRef,
      phone: phoneRef,
      city: cityRef,
      serviceType: serviceTypeRef,
      pickup: pickupRef,
      dropoff: dropoffRef,
      date: dateRef,
      time: timeRef,
      vehiclePreference: vehicleRef,
      nameOnCard: nameOnCardRef,
      cardNumber: cardNumberRef,
      expiryMonth: expiryMonthRef,
      expiryYear: expiryYearRef,
      cvc: cvcRef,
      termsAccepted: termsRef,
    };
    for (const key of errorKeys) {
      if (refMap[key] && refMap[key].current) {
        refMap[key].current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      }
    }
  };

  // Step 2: Personal Details
  const validateStep2 = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      newErrors.email = "Email is invalid";
    if (!form.phone || form.phone.length < 8)
      newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      scrollToFirstError(Object.keys(newErrors));
      return false;
    }
    return true;
  };

  // Helper function to get vehicle capacity
  const getVehicleCapacity = (vehicleName) => {
    const vehicle = fleet.find((v) => v.name === vehicleName);
    if (!vehicle) return { passengers: 0, luggage: 0 };

    // Extract passenger capacity from capacity string (e.g., "1-3 PAX" -> 3)
    const passengerMatch = vehicle.capacity.match(/(\d+)-(\d+)\s*PAX/);
    const maxPassengers = passengerMatch ? parseInt(passengerMatch[2]) : 0;

    // Extract luggage capacity from capacity string (e.g., "2 Suitcases" -> 2)
    const luggageMatch = vehicle.capacity.match(/(\d+)\s*Suitcases/);
    const maxLuggage = luggageMatch ? parseInt(luggageMatch[1]) : 0;

    return { passengers: maxPassengers, luggage: maxLuggage };
  };

  // Step 3: Booking Details Validation
  const validateStep3 = () => {
    const newErrors = {};
    let isValid = true;
    
    // Check if pickup location is set
    if (!form.pickup) {
      newErrors.pickup = "Pickup location is required";
      isValid = false;
    }
    
    // Check if dropoff location is set
    if (!form.dropoff) {
      newErrors.dropoff = "Dropoff location is required";
      isValid = false;
    }
    
    // Check if date is set
    if (!form.date) {
      newErrors.date = "Date is required";
      isValid = false;
    }
    
    // Check if time is set
    if (!form.time) {
      newErrors.time = "Time is required";
      isValid = false;
    }
    
    // Check if booking method is selected
    if (!form.bookingMethod) {
      newErrors.bookingMethod = "Please select a booking method";
      isValid = false;
    }
    
    // For airport transfers, check if direction is selected
    if (form.serviceType === "Airport Transfers" && !form.airportDirection) {
      newErrors.airportDirection = "Please select airport direction";
      isValid = false;
    }
    
    // For distance-based bookings, ensure distance is calculated
    if (form.bookingMethod === 'distance' && (!form.distance || form.distance <= 0)) {
      newErrors.distance = "Please calculate the distance first";
      isValid = false;
    }
    
    // For time-based bookings, ensure end time is set
    if (form.bookingMethod === 'time' && !form.expectedEndTime) {
      newErrors.expectedEndTime = "End time is required for time-based booking";
      isValid = false;
    }
    
    // For time-based bookings, ensure minimum 2-hour duration
    if (form.bookingMethod === 'time' && form.time && form.expectedEndTime) {
      // Create Date objects for today with the selected times
      const today = new Date();
      const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 
                               form.time.getHours(), form.time.getMinutes());
      const endTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 
                             form.expectedEndTime.getHours(), form.expectedEndTime.getMinutes());
      
      // Handle case where end time is on the next day
      if (endTime <= startTime) {
        endTime.setDate(endTime.getDate() + 1);
      }
      
      const durationHours = (endTime - startTime) / (1000 * 60 * 60);
      
      if (durationHours < 2) {
        newErrors.expectedEndTime = "Minimum booking duration is 2 hours";
        isValid = false;
      }
    }
    
    // Update errors state
    setErrors(prev => ({ ...prev, ...newErrors }));
    
    // Scroll to first error if any
    if (!isValid) {
      const firstErrorKey = Object.keys(newErrors)[0];
      const errorRef = firstErrorKey === 'pickup' ? pickupRef :
                     firstErrorKey === 'dropoff' ? dropoffRef :
                     firstErrorKey === 'date' ? dateRef :
                     firstErrorKey === 'time' ? timeRef :
                     firstErrorKey === 'bookingMethod' ? bookingMethodRef :
                     firstErrorKey === 'airportDirection' ? serviceTypeRef :
                     firstErrorKey === 'expectedEndTime' ? expectedEndTimeRef : null;
      
      if (errorRef && errorRef.current) {
        errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    
    return isValid;
  };

  // Step 4: Vehicle Selection
  const validateStep4 = () => {
    const newErrors = {};
    if (!form.vehiclePreference) {
      newErrors.vehiclePreference = "Please select a vehicle";
    } else {
      const vehicleCapacity = getVehicleCapacity(form.vehiclePreference);
      let errorMessage = "";

      if (form.passengers > vehicleCapacity.passengers) {
        errorMessage += `This vehicle can only accommodate up to ${vehicleCapacity.passengers} passengers. You have ${form.passengers} passengers. `;
      }

      // Calculate effective luggage: 2 carry-on = 1 suitcase
      const suitcases = parseInt(form.suitcases) || 0;
      const carryOn = parseInt(form.carryOn) || 0;
      const effectiveLuggage = suitcases + Math.ceil(carryOn / 2);
      if (effectiveLuggage > vehicleCapacity.luggage) {
        errorMessage += `This vehicle can only carry up to ${vehicleCapacity.luggage} effective luggage items. You have ${suitcases} suitcases + ${carryOn} carry-on = ${effectiveLuggage} effective items (2 carry-on = 1 suitcase).`;
      }

      if (errorMessage) {
        newErrors.vehiclePreference = errorMessage.trim();
      }
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      scrollToFirstError(Object.keys(newErrors));
      return false;
    }
    return true;
  };

  // Step 5: Payment Details
  const validateStep5 = () => {
    const newErrors = {};
    if (!form.nameOnCard) newErrors.nameOnCard = "Name on card is required";
    if (
      !form.cardNumber ||
      !/^\d{12,19}$/.test(form.cardNumber.replace(/\s/g, ""))
    )
      newErrors.cardNumber = "Valid card number is required";
    if (!form.expiryMonth) newErrors.expiryMonth = "Expiry month is required";
    if (!form.expiryYear) newErrors.expiryYear = "Expiry year is required";
    if (!form.cvc || !/^\d{3,4}$/.test(form.cvc))
      newErrors.cvc = "Valid CVC is required";
    if (!form.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and conditions";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      scrollToFirstError(Object.keys(newErrors));
      return false;
    }
    return true;
  };

  // Scroll to top on step change
  useEffect(() => {
    if (formContainerRef.current) {
      formContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [step]);

  useEffect(() => {
    if (step === 4 && !form.vehiclePreference) {
      const firstVehicle = fleet[0].name;
      setForm((prev) => ({
        ...prev,
        vehiclePreference: firstVehicle,
      }));
      setEstimatedFare(calculateFare(form));
    }
  }, [step]);

  const renderStep1 = () => (
  <motion.div
    className="step-container step-1-simple"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="step-header">
      <h2 className="step-title">Select Booking Type</h2>
    </div>

    <div className="booking-type-cards">
      <motion.div
        className={`booking-type-card distance-based ${
          selectedOption === "distance" ? "selected" : ""
        }`}
        onClick={() => {
          setForm({ ...form, bookingMethod: "distance" });
          setSelectedOption("distance");
          setStep(2);
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <h3 className="card-title">Distance Based</h3>
        <p className="card-subtitle">Calculate cost by distance travelled</p>
        <div className="card-icon">
          <FaMapMarkerAlt />
        </div>
      </motion.div>

      <motion.div
        className={`booking-type-card time-based ${
          selectedOption === "time" ? "selected" : ""
        }`}
        onClick={() => {
          setForm({ ...form, bookingMethod: "time" });
          setSelectedOption("time");
          setStep(2);
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <h3 className="card-title">Time Based</h3>
        <p className="card-subtitle">Calculate cost by duration of booking</p>
        <div className="card-icon">
          <FaRegClock />
        </div>
      </motion.div>
    </div>

    <div className="step-actions">
      <button 
        className="next-button"
        onClick={() => {
          if (selectedOption) {
            setStep(2);
          }
        }}
        disabled={!selectedOption}
      >
        Next
      </button>
    </div>
  </motion.div>
);  

  const renderStep2 = () => (
    <motion.div
      className="step-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="step-title">Step 04: Your Details</h2>
      <form className="booking-form">
      <div className="form-container">
        {/* Name and Email Row */}
        <div className="form-row">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              required
              ref={nameRef}
            />
            {errors.name && (
              <div className="error-message">{errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
              ref={emailRef}
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>
        </div>
        
        {/* Phone Row */}
        <div className="form-row">
          <div className="form-group full-width">
            <label>Phone</label>
            <PhoneInput
              country={"au"}
              value={form.phone}
              onChange={handlePhoneChange}
            />
            {errors.phone && (
              <div className="error-message">{errors.phone}</div>
            )}
          </div>
        </div>
        
        {/* Special Instructions Row */}
        <div className="form-row">
          <div className="form-group full-width">
            <label>Special Instructions (Optional)</label>
            <textarea
              name="specialInstructions"
              value={form.specialInstructions}
              onChange={handleInputChange}
              rows="6"
              placeholder="Any special requests?"
            ></textarea>
          </div>
        </div>
      </div>
        <div className="form-actions">
          <button type="button" onClick={() => setStep(3)}>
            Back
          </button>
          {(['Airport Transfers', 'Point to Point', 'Crew Transfer'].includes(form.serviceType) && form.vehiclePreference !== 'Sprinter') ? (
            <button
              type="button"
              onClick={() => {
                if (validateStep2()) {
                  setStep(5);
                }
              }}
            >
              Continue to Payment Details
            </button>
          ) : (
            <>
              <button
                type="button"
                style={{ background: '#8b5a2b', color: '#fff', fontWeight: 600 }}
                onClick={() => setShowQuoteConfirmation(true)}
                disabled={quoteRequested}
              >
                {quoteRequested ? 'Request Sent!' : 'Get Quote from our Team'}
              </button>
              {quoteRequested && (
                <p style={{ color: '#4CAF50', marginTop: '10px', fontSize: '0.9rem' }}>
                  Thank you! Our team will contact you soon with your quote.
                </p>
              )}
              
              {/* Quote Confirmation Modal */}
              {showQuoteConfirmation && (
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000,
                }}>
                  <div style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '8px',
                    maxWidth: '500px',
                    width: '90%',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}>
                    <h3 style={{ marginTop: 0, color: '#333' }}>Confirm Quote Request</h3>
                    <p>Are you sure you want to request a quote for your trip?</p>
                    <div style={{ marginTop: '1.5rem' }}>
                      <button
                        onClick={async () => {
                          setShowQuoteConfirmation(false);
                          try {
                            // Prepare quote data
                            const quoteData = {
                              name: form.name,
                              phone: form.phone,
                              email: form.email,
                              pickup: form.pickup,
                              dropoff: form.dropoff,
                              additionalStop: form.additionalStop,
                              date: form.date,
                              time: form.time,
                              passengers: form.passengers,
                              adults: form.adults,
                              children_0_4: form.children_0_4,
                              children_5_8: form.children_5_8,
                              vehiclePreference: form.vehiclePreference || 'Not selected',
                              specialInstructions: form.specialInstructions || '',
                              type: 'quote_request'
                            };

                            // Send quote request to the server
                            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/email/send-quote-request`, {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify(quoteData),
                            });

                            if (!response.ok) {
                              throw new Error('Failed to send quote request');
                            }

                            // Show success message
                            setQuoteRequested(true);
                            
                            // Reset the message after 5 seconds
                            setTimeout(() => {
                              setQuoteRequested(false);
                            }, 5000);
                          } catch (error) {
                            console.error('Error sending quote request:', error);
                            alert('Failed to send quote request. Please try again.');
                          }
                        }}
                        style={{
                          backgroundColor: '#8b5a2b',
                          color: 'white',
                          border: 'none',
                          padding: '0.6rem 1.5rem',
                          borderRadius: '4px',
                          margin: '0 0.5rem',
                          cursor: 'pointer',
                          fontWeight: 600
                        }}
                      >
                        Yes, Get Quote
                      </button>
                      <button
                        onClick={() => setShowQuoteConfirmation(false)}
                        style={{
                          backgroundColor: '#f0f0f0',
                          color: '#333',
                          border: '1px solid #ddd',
                          padding: '0.6rem 1.5rem',
                          borderRadius: '4px',
                          margin: '0 0.5rem',
                          cursor: 'pointer',
                          fontWeight: 500
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </form>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      className="step-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="step-title">Step 02: Journey Details</h2>
      <form className="omni-form">
        <div className="form-container">
          {/* Service Details Row */}
          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <select
                name="city"
                value={form.city}
                onChange={handleInputChange}
                ref={cityRef}
              >
                <option value="">----Select your city---</option>
                <option value="Sydney">Sydney</option>
                <option value="Melbourne">Melbourne</option>
              </select>
              {errors.city && <div className="error-message">{errors.city}</div>}
            </div>
            <div className="form-group">
              <label>Type of Service</label>
              <select
                name="serviceType"
                value={form.serviceType}
                onChange={handleInputChange}
                required
                ref={serviceTypeRef}
              >
                <option value="">-- Select a Service --</option>
                <option value="Airport Transfers">Airport Transfers</option>
                <option value="Point to Point">Point to Point</option>
                <option value="Corporate Transfers">Corporate Transfers</option>
                <option value="Wedding Car">Wedding Car</option>
                <option value="Crew Transfer">Crew Transfer</option>
                <option value="Special Events">Special Events</option>
                
              </select>
              {errors.serviceType && (
                <div className="error-message">{errors.serviceType}</div>
              )}
            </div>
            {form.serviceType === "Airport Transfers" && (
              <div className="form-group">
                <label>Direction</label>
                <select
                  name="airportDirection"
                  value={form.airportDirection}
                  onChange={handleInputChange}
                >
                  <option value="">-- Select Direction --</option>
                  <option value="to">To Airport</option>
                  <option value="from">From Airport</option>
                </select>
                {errors.airportDirection && (
                  <div className="error-message">{errors.airportDirection}</div>
                )}
              </div>
            )}
          </div>

          {form.serviceType === "Airport Transfers" && (
            <>
              <div className="form-section-title">Flight Details</div>
              <div className="form-row">
                <div className="form-group">
                  <label>Terminal</label>
                  <select
                    name="terminal"
                    value={form.terminal}
                    onChange={handleInputChange}
                  >
                    <option value="">-- Select Terminal --</option>

                    {form.city === "Sydney" && (
                      <>
                        <optgroup label="Sydney Airport Terminals">
                          <option value="T1 International">T1 International</option>
                          <option value="T2 Domestic">T2 Domestic</option>
                          <option value="T3 Domestic">T3 Domestic</option>
                        </optgroup>
                      </>
                    )}

                    {form.city === "Melbourne" && (
                      <>
                        <optgroup label="Melbourne Airport Terminals">
                          <option value="T1 International">T1 International</option>
                          <option value="T2 Domestic">T2 Domestic</option>
                          <option value="T3 Domestic">T3 Domestic</option>
                          <option value="T4 Domestic">T4 Domestic</option>
                        </optgroup>
                      </>
                    )}
                  </select>
                </div>
                <div className="form-group">
                  <label>Flight Number</label>
                  <input
                    type="text"
                    name="flightNumber"
                    value={form.flightDetails.flightNumber}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        flightDetails: {
                          ...prev.flightDetails,
                          flightNumber: e.target.value,
                        },
                      }))
                    }
                    placeholder="e.g. EK412"
                  />
                </div>
                <div className="form-group">
                  <label>Flight Time</label>
                  <DatePicker
                    selected={form.flightDetails.flightTime}
                    onChange={(date) => {
                      setForm((prev) => ({
                        ...prev,
                        flightDetails: {
                          ...prev.flightDetails,
                          flightTime: date,
                        },
                      }))
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={1}
                    timeCaption="Time"
                    dateFormat="HH:mm"
                    timeFormat="HH:mm"
                    placeholderText="hh:mm"
                    className="form-control time-picker"
                    locale="en-GB"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Pickup & Drop-off Fields */}
          {form.bookingMethod === "distance" && (
            <div className="form-row">
              <div className="form-group pickup-address">
                <label>Pickup Address</label>
                <div className="Autocomplete">
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      pickupAutocompleteRef.current = autocomplete;
                      if (form.city === "Sydney") {
                        autocomplete.setComponentRestrictions({
                          country: "au",
                        });
                        autocomplete.setBounds(
                          new window.google.maps.LatLngBounds(
                            new window.google.maps.LatLng(-34.0, 150.5), // SW Sydney
                            new window.google.maps.LatLng(-33.7, 151.3) // NE Sydney
                          )
                        );
                      } else if (form.city === "Melbourne") {
                        autocomplete.setComponentRestrictions({
                          country: "au",
                        });
                        autocomplete.setBounds(
                          new window.google.maps.LatLngBounds(
                            new window.google.maps.LatLng(-38.0, 144.5), // SW Melbourne
                            new window.google.maps.LatLng(-37.6, 145.2) // NE Melbourne
                          )
                        );
                      } else {
                        autocomplete.setComponentRestrictions({
                          country: "au",
                        });
                      }
                    }}
                    onPlaceChanged={handlePickupPlaceChanged}
                  >
                    <input
                      type="text"
                      placeholder={`Pickup location in ${
                        form.city || "selected city"
                      }`}
                      value={form.pickup}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, pickup: e.target.value }))
                      }
                      required
                      ref={pickupRef}
                    />
                  </Autocomplete>
                </div>
                {errors.pickup && (
                  <div className="error-message">{errors.pickup}</div>
                )}
              </div>
              <div className="form-group drop-off-address">
                <label>Drop-off Address</label>
                <div className="Autocomplete">
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      dropoffAutocompleteRef.current = autocomplete;
                      if (form.city === "Sydney") {
                        autocomplete.setComponentRestrictions({
                          country: "au",
                        });
                        autocomplete.setBounds(
                          new window.google.maps.LatLngBounds(
                            new window.google.maps.LatLng(-34.0, 150.5), // SW Sydney
                            new window.google.maps.LatLng(-33.7, 151.3) // NE Sydney
                          )
                        );
                      } else if (form.city === "Melbourne") {
                        autocomplete.setComponentRestrictions({
                          country: "au",
                        });
                        autocomplete.setBounds(
                          new window.google.maps.LatLngBounds(
                            new window.google.maps.LatLng(-38.0, 144.5), // SW Melbourne
                            new window.google.maps.LatLng(-37.6, 145.2) // NE Melbourne
                          )
                        );
                      } else {
                        autocomplete.setComponentRestrictions({
                          country: "au",
                        });
                      }
                    }}
                    onPlaceChanged={handleDropoffPlaceChanged}
                  >
                    <input
                      type="text"
                      placeholder={`Drop-off location in ${
                        form.city || "selected city"
                      }`}
                      value={form.dropoff}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          dropoff: e.target.value,
                        }))
                      }
                      required
                      ref={dropoffRef}
                    />
                  </Autocomplete>
                </div>
                {errors.dropoff && (
                  <div className="error-message">{errors.dropoff}</div>
                )}
              </div>
              <div className="form-group additional-stop-address">
                <label>Additional Stop </label>
                <div className="Autocomplete">
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      additionalStopAutocompleteRef.current = autocomplete;
                      if (form.city === "Sydney") {
                        autocomplete.setComponentRestrictions({
                          country: "au",
                        });
                        autocomplete.setBounds(
                          new window.google.maps.LatLngBounds(
                            new window.google.maps.LatLng(-34.0, 150.5), // SW Sydney
                            new window.google.maps.LatLng(-33.7, 151.3) // NE Sydney
                          )
                        );
                      } else if (form.city === "Melbourne") {
                        autocomplete.setComponentRestrictions({
                          country: "au",
                        });
                        autocomplete.setBounds(
                          new window.google.maps.LatLngBounds(
                            new window.google.maps.LatLng(-38.0, 144.5), // SW Melbourne
                            new window.google.maps.LatLng(-37.6, 145.2) // NE Melbourne
                          )
                        );
                      } else {
                        autocomplete.setComponentRestrictions({
                          country: "au",
                        });
                      }
                    }}
                    onPlaceChanged={handleAdditionalStopPlaceChanged}
                  >
                    <input
                      type="text"
                      placeholder={`Additional stop in ${
                        form.city || "selected city"
                      } (optional)`}
                      value={form.additionalStop}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          additionalStop: e.target.value,
                        }))
                      }
                    />
                  </Autocomplete>
                </div>
              </div>
            </div>
          )}
          {form.bookingMethod === "time" && (
            <div className="form-row">
              <div className="form-group">
                <label>Pickup Location</label>
                <div className="Autocomplete">
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      pickupAutocompleteRef.current = autocomplete;
                      if (form.city === "Sydney") {
                        autocomplete.setComponentRestrictions({
                          country: "au",
                        });
                        autocomplete.setBounds(
                          new window.google.maps.LatLngBounds(
                            new window.google.maps.LatLng(-34.0, 150.5), // SW Sydney
                            new window.google.maps.LatLng(-33.7, 151.3) // NE Sydney
                          )
                        );
                      } else if (form.city === "Melbourne") {
                        autocomplete.setComponentRestrictions({
                          country: "au",
                        });
                        autocomplete.setBounds(
                          new window.google.maps.LatLngBounds(
                            new window.google.maps.LatLng(-38.0, 144.5), // SW Melbourne
                            new window.google.maps.LatLng(-37.6, 145.2) // NE Melbourne
                          )
                        );
                      } else {
                        autocomplete.setComponentRestrictions({
                          country: "au",
                        });
                      }
                    }}
                    onPlaceChanged={handlePickupPlaceChanged}
                  >
                    <input
                      type="text"
                      placeholder={`Pickup location in ${
                        form.city || "selected city"
                      }`}
                      value={form.pickup}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, pickup: e.target.value }))
                      }
                      required
                      ref={pickupRef}
                    />
                  </Autocomplete>
                </div>
                {errors.pickup && (
                  <div className="error-message">{errors.pickup}</div>
                )}
              </div>
              <div className="form-group">
                <label>Dropoff Location</label>
                <div className="Autocomplete">
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      dropoffAutocompleteRef.current = autocomplete;
                      if (form.city === "Sydney") {
                        autocomplete.setComponentRestrictions({
                          country: "au",
                        });
                        autocomplete.setBounds(
                          new window.google.maps.LatLngBounds(
                            new window.google.maps.LatLng(-34.0, 150.5), // SW Sydney
                            new window.google.maps.LatLng(-33.7, 151.3) // NE Sydney
                          )
                        );
                      } else if (form.city === "Melbourne") {
                        autocomplete.setComponentRestrictions({
                          country: "au",
                        });
                        autocomplete.setBounds(
                          new window.google.maps.LatLngBounds(
                            new window.google.maps.LatLng(-38.0, 144.5), // SW Melbourne
                            new window.google.maps.LatLng(-37.6, 145.2) // NE Melbourne
                          )
                        );
                      } else {
                        autocomplete.setComponentRestrictions({
                          country: "au",
                        });
                      }
                    }}
                    onPlaceChanged={handleDropoffPlaceChanged}
                  >
                    <input
                      type="text"
                      placeholder={`Dropoff location in ${
                        form.city || "selected city"
                      }`}
                      value={form.dropoff}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          dropoff: e.target.value,
                        }))
                      }
                      required
                      ref={dropoffRef}
                    />
                  </Autocomplete>
                </div>
                {errors.dropoff && (
                  <div className="error-message">{errors.dropoff}</div>
                )}
              </div>
              <div className="form-group additional-stop-address">
                <label>Additional Stop </label>
                <div className="Autocomplete">
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      additionalStopAutocompleteRef.current = autocomplete;
                      if (form.city === "Sydney") {
                        autocomplete.setComponentRestrictions({
                          country: "au",
                        });
                        autocomplete.setBounds(
                          new window.google.maps.LatLngBounds(
                            new window.google.maps.LatLng(-34.0, 150.5), // SW Sydney
                            new window.google.maps.LatLng(-33.7, 151.3) // NE Sydney
                          )
                        );
                      } else if (form.city === "Melbourne") {
                        autocomplete.setComponentRestrictions({
                          country: "au",
                        });
                        autocomplete.setBounds(
                          new window.google.maps.LatLngBounds(
                            new window.google.maps.LatLng(-38.0, 144.5), // SW Melbourne
                            new window.google.maps.LatLng(-37.6, 145.2) // NE Melbourne
                          )
                        );
                      } else {
                        autocomplete.setComponentRestrictions({
                          country: "au",
                        });
                      }
                    }}
                    onPlaceChanged={handleAdditionalStopPlaceChanged}
                  >
                    <input
                      type="text"
                      placeholder={`Additional stop in ${
                        form.city || "selected city"
                      } (optional)`}
                      value={form.additionalStop}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          additionalStop: e.target.value,
                        }))
                      }
                    />
                  </Autocomplete>
                </div>
              </div>
            </div>
          )}

          {/* Passenger Details Row */}
          <div className="passenger-row">
            <div className="form-group">
              <label>Adults</label>
              <input
                type="number"
                name="adults"
                min="1"
                max="8"
                value={form.adults}
                onChange={(e) => {
                  const newAdults = parseInt(e.target.value) || 0;
                  setForm(prev => ({
                    ...prev,
                    adults: newAdults,
                    passengers: newAdults + (parseInt(prev.children_0_4) || 0) + (parseInt(prev.children_5_8) || 0)
                  }));
                }}
              />
            </div>
            <div className="form-group">
              <label>Kids {'<'} 4 age</label>
              <input
                type="number"
                name="children_0_4"
                min="0"
                max="3"
                value={form.children_0_4}
                onChange={(e) => {
                  const newKids04 = parseInt(e.target.value) || 0;
                  setForm(prev => ({
                    ...prev,
                    children_0_4: newKids04,
                    passengers: (parseInt(prev.adults) || 0) + newKids04 + (parseInt(prev.children_5_8) || 0)
                  }));
                }}
              />
            </div>
            <div className="form-group">
              <label>Kids (4-8 age)</label>
              <input
                type="number"
                name="children_5_8"
                min="0"
                max="3"
                value={form.children_5_8}
                onChange={(e) => {
                  const newKids58 = parseInt(e.target.value) || 0;
                  setForm(prev => ({
                    ...prev,
                    children_5_8: newKids58,
                    passengers: (parseInt(prev.adults) || 0) + (parseInt(prev.children_0_4) || 0) + newKids58
                  }));
                }}
              />
            </div>
            <div className="form-group">
              <label>Total Pax</label>
              <input
                type="number"
                name="passengers"
                min="1"
                max="24"
                value={form.passengers}
                readOnly
                className="readonly-input"
              />
              {errors.passengers && (
                <div className="error-message">{errors.passengers}</div>
              )}
            </div>
          </div>

          {/* Luggage Row */}
          <div className="form-row">
            <div className="form-group">
              <label>Number of Suitcases</label>
              <input
                type="number"
                name="suitcases"
                min="0"
                max="8"
                value={form.suitcases}
                onChange={handleInputChange}
                placeholder="e.g., 2"
              />
            </div>
            <div className="form-group">
              <label>Carry On</label>
              <input
                type="number"
                name="carryOn"
                min="0"
                max="8"
                value={form.carryOn}
                onChange={handleInputChange}
                placeholder="e.g., 1"
              />
            </div>
          </div>

          {/* Booking Time Restriction Notice */}
          {isBookingTooSoon && (
            <div className="booking-notice error">
              <p>⚠️ Bookings must be made at least 8 hours in advance. Please select a later time.</p>
            </div>
          )}
          
          {/* Date, Time and Expected End Time Row */}
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <DatePicker
                selected={form.date}
                onChange={(date) => handleDateTimeChange(date, 'date')}
                minDate={new Date()}
                dateFormat="dd-MM-yyyy"
                placeholderText="dd-mm-yyyy"
                className="form-control date-picker"
                required
              />
              {errors.date && <div className="error-message">{errors.date}</div>}
            </div>
            <div className="form-group">
              <label>PICKUP Time</label>
              <DatePicker
                selected={form.time}
                onChange={(date) => handleDateTimeChange(date, 'time')}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={1}
                timeCaption="Time"
                dateFormat="HH:mm"
                timeFormat="HH:mm"
                placeholderText="hh:mm"
                className="form-control time-picker"
                locale="en-GB"
                required
              />
              {errors.time && <div className="error-message">{errors.time}</div>}
            </div>
            {form.bookingMethod === "time" && (
              <div className="form-group">
                <label>End Time</label>
                <DatePicker
                  selected={form.expectedEndTime}
                  onChange={(date) => handleDateTimeChange(date, 'expectedEndTime')}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={1}
                  timeCaption="Time"
                  dateFormat="HH:mm"
                  timeFormat="HH:mm"
                  placeholderText="hh:mm"
                  className="form-control time-picker"
                  locale="en-GB"
                  required
                  ref={expectedEndTimeRef}
                />
              </div>
            )}
          </div>
          
          {/* Full row error message for expected end time */}
          {form.bookingMethod === "time" && errors.expectedEndTime && (
            <div className="form-row">
              <div className="form-group full-width-error">
                <div className="error-message">{errors.expectedEndTime}</div>
              </div>
            </div>
          )}
          {form.bookingMethod === "distance" && form.distance && (
            <p className="distance-display">
              Distance: {(form.distance / 1000).toFixed(1)} km
            </p>
          )}

          {/* Google Map Embed */}
          <div
            className="form-group full-width booking-map-embed"
            style={{ margin: "1.5rem 0" }}
          >
            <div
              className="route-map map-container"
              style={{ height: "300px" }}
            >
              <GoogleMap
                mapContainerStyle={{ height: "100%", width: "100%" }}
                zoom={DEFAULT_ZOOM}
                center={
                  directions?.routes[0]?.bounds?.getCenter() || SYDNEY_CENTER
                }
                onLoad={() => setMapLoaded(true)}
                options={{
                  zoomControl: true,
                  mapTypeControl: false,
                  streetViewControl: false,
                  fullscreenControl: false,
                }}
              >
                {directions && (
                  <DirectionsRenderer
                    directions={directions}
                    options={{
                      polylineOptions: {
                        strokeColor: "#1976D2",
                        strokeOpacity: 0.8,
                        strokeWeight: 4,
                      },
                      suppressMarkers: false,
                      markerOptions: {
                        clickable: false,
                      },
                    }}
                  />
                )}
              </GoogleMap>
            </div>
          </div>
        </div>
        <div className="form-actions">
          <button type="button" onClick={() => setStep(1)}>
            Back
          </button>
          <button
            type="button"
            onClick={() => {
              if (validateStep3()) {
                setStep(3); // Move to Vehicle Details (Step 4)
              }
            }}
            disabled={isBookingTooSoon}
            className={isBookingTooSoon ? 'disabled-button' : 'primary-button'}
          >
            {isBookingTooSoon ? 'Please select a later time (min 8 hours ahead)' : 'Continue to Vehicle Selection'}
          </button>
        </div>
      </form>
    </motion.div>
  );

  const renderStep4 = () => {
    return (
      <motion.div
        className="step-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="step-title">Step 03: Select Your Vehicle</h2>
        {(form.vehiclePreference &&
        ((form.bookingMethod === "distance" && form.distance) ||
          (form.bookingMethod === "time" && form.expectedEndTime))) && (
        (["Airport Transfers", "Point to Point", "Crew Transfer"].includes(form.serviceType) && form.vehiclePreference !== 'Sprinter') ? (
          <p className="fare-estimate">
            Estimated Price: AUD ${calculateFare(form)}
          </p>
        ) : (
          <p className="fare-estimate" style={{ color: '#1976d2', fontWeight: 500 }}>
            Our team will contact you once you fill your details.
          </p>
        )
      )}
        <div className="form-row">
          <div className="form-group">
            <label>Total Pax: {form.passengers}</label>
            <input
              type="number"
              name="passengers"
              value={form.passengers}
              onChange={handleInputChange}
              min="1"
              max="11"
              style={{ width: "100px", marginLeft: "10px" }}
            />
          </div>
          <div className="form-group">
            <label>Suitcases: {form.suitcases}</label>
            <input
              type="number"
              name="suitcases"
              value={form.suitcases}
              onChange={handleInputChange}
              min="0"
              max="20"
              style={{ width: "100px", marginLeft: "10px" }}
            />
          </div>
          <div className="form-group">
            <label>Carry On: {form.carryOn}</label>
            <input
              type="number"
              name="carryOn"
              value={form.carryOn}
              onChange={handleInputChange}
              min="0"
              max="10"
              style={{ width: "100px", marginLeft: "10px" }}
            />
          </div>
        </div>
        {errors.passengers && (
          <div className="passenger-row-error">{errors.passengers}</div>
        )}
        <div className="vehicle-selection-grid">
          {fleet.map((vehicle) => {
            const capacity = getVehicleCapacity(vehicle.name);
            const isPassengerCompatible = form.passengers <= capacity.passengers;
            // Calculate effective luggage: 2 carry-on = 1 suitcase
            const suitcases = parseInt(form.suitcases) || 0;
            const carryOn = parseInt(form.carryOn) || 0;
            const effectiveLuggage = suitcases + Math.ceil(carryOn / 2);
            const isLuggageCompatible = effectiveLuggage <= capacity.luggage;
            const isCompatible = isPassengerCompatible && isLuggageCompatible;
            const isSelected = form.vehiclePreference === vehicle.name;

            return (
              <div
                key={vehicle.id}
                className={`vehicle-card${isSelected ? " selected" : ""}${
                  !isCompatible ? " incompatible" : ""
                }`}
                onClick={() => {
                  if (isCompatible) {
                    setForm((prev) => ({
                      ...prev,
                      vehiclePreference: vehicle.name,
                    }));
                  }
                }}
                style={{
                  opacity: isCompatible ? 1 : 0.6,
                  cursor: isCompatible ? "pointer" : "not-allowed",
                  position: "relative",
                }}
              >
                {!isCompatible && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "50%",
                      width: "80px",
                      height: "80px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "3px solid #d32f2f",
                      boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "2.5rem",
                        color: "#d32f2f",
                        fontWeight: "bold",
                        lineHeight: 1,
                      }}
                    >
                      ✕
                    </span>
                  </div>
                )}
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="vehicle-card-image"
                />
                <div className="vehicle-card-content">
                  <h3 className="vehicle-card-title">{vehicle.name}</h3>
                  <div className="vehicle-card-capacity">
                    {vehicle.capacity}
                  </div>
                  {isCompatible && ((form.bookingMethod === "distance" && form.distance) ||
                    (form.bookingMethod === "time" && form.expectedEndTime)) && (
                    (["Airport Transfers", "Point to Point", "Crew Transfer"].includes(form.serviceType) && vehicle.name !== 'Sprinter') ? (
                      <div className="vehicle-card-price">
                        AUD ${calculateFare({ ...form, vehiclePreference: vehicle.name })}
                        <div className="gst-note" style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>
                          *Prices include GST
                        </div>
                      </div>
                    ) : (
                      <div className="vehicle-card-price" style={{ color: '#1976d2', fontWeight: 500 }}>
                        Our team will contact you for fare once you fill your details.
                      </div>
                    )
                  )}
                  {!isCompatible && (
                    <div
                      className="vehicle-card-error"
                      style={{
                        color: "#d32f2f",
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        marginTop: "10px",
                        padding: "8px",
                        backgroundColor: "rgba(211, 47, 47, 0.1)",
                        borderRadius: "4px",
                        border: "1px solid #d32f2f",
                      }}
                    >
                      {!isPassengerCompatible &&
                        `❌ Too many passengers (max: ${capacity.passengers})`}
                      {!isPassengerCompatible && !isLuggageCompatible && <br />}
                      {!isLuggageCompatible &&
                        `❌ Too much luggage (max: ${capacity.luggage} effective, you have ${suitcases} suitcases + ${carryOn} carry-on = ${effectiveLuggage} effective)`}
                    </div>
                  )}
                  <div className="vehicle-card-models">{vehicle.models}</div>
                  <div className="vehicle-card-description">
                    {vehicle.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {errors.vehiclePreference && (
          <div className="error-message">{errors.vehiclePreference}</div>
        )}
        <div className="form-actions">
          <button type="button" onClick={() => setStep(2)}>
            Back
          </button>
          <button
            type="button"
            onClick={() => {
              if (validateStep4()) {
                setStep(4);
              }
            }}
            disabled={!form.vehiclePreference}
          >
            Continue to Personal Details
          </button>
        </div>
      </motion.div>
    );
  };

  const renderStep5 = () => (
    <motion.div
      className="step-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="step-title">Step 05: Payment Details</h2>
      {form.paymentMethod === "Card" && (
        <>
          <div className="form-group">
            <label>Name on Card</label>
            <input
              type="text"
              name="nameOnCard"
              value={form.nameOnCard}
              onChange={handleInputChange}
              required
              ref={nameOnCardRef}
            />
            {errors.nameOnCard && (
              <div className="error-message">{errors.nameOnCard}</div>
            )}
          </div>
          <div className="form-group">
            <label>Card Type</label>
            <select
              name="cardType"
              value={form.cardType}
              onChange={handleInputChange}
            >
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
              <option value="Amex">American Express</option>
            </select>
          </div>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleInputChange}
              placeholder="xxxx xxxx xxxx xxxx"
              className="form-control"
              ref={cardNumberRef}
            />
            {errors.cardNumber && (
              <div className="error-message">{errors.cardNumber}</div>
            )}
          </div>
          <div className="form-group">
            <label>Expiry Date</label>
            <div className="expiry-date-fields">
              <select
                name="expiryMonth"
                value={form.expiryMonth}
                onChange={handleInputChange}
                required
                ref={expiryMonthRef}
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {String(i + 1).padStart(2, "0")}
                  </option>
                ))}
              </select>
              <select
                name="expiryYear"
                value={form.expiryYear}
                onChange={handleInputChange}
                required
                ref={expiryYearRef}
              >
                <option value="">Year</option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={new Date().getFullYear() + i}>
                    {new Date().getFullYear() + i}
                  </option>
                ))}
              </select>
            </div>
            {errors.expiryMonth && (
              <div className="error-message">{errors.expiryMonth}</div>
            )}
            {errors.expiryYear && (
              <div className="error-message">{errors.expiryYear}</div>
            )}
          </div>
          <div className="form-group">
            <label>CVC</label>
            <input
              type="text"
              name="cvc"
              value={form.cvc}
              onChange={handleInputChange}
              placeholder="123"
              className="form-control"
              ref={cvcRef}
            />
            {errors.cvc && <div className="error-message">{errors.cvc}</div>}
          </div>
          <h3 className="form-section-title">Terms and Conditions</h3>
          <div className="form-group full-width">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={form.termsAccepted}
                onChange={handleInputChange}
                required
                ref={termsRef}
              />
              I accept the{" "}
              <a
                href="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
              >
                terms and conditions
              </a>
              .
            </label>
            {errors.termsAccepted && (
              <div className="error-message">{errors.termsAccepted}</div>
            )}
          </div>
        </>
      )}
      <div className="form-actions">
        <button type="button" onClick={() => setStep(4)}>
          Back
        </button>
        <button
          type="button"
          onClick={() => {
            if (validateStep5()) {
              setStep(6);
            }
          }}
        >
          Continue to Summary
        </button>
      </div>
    </motion.div>
  );

  const renderStep6 = () => {
    // Use breakdown object for all fare display
    const breakdown = calculateFareBreakdown(form);
    

    if (!breakdown.total || isNaN(breakdown.total)) {
      return (
        <motion.div className="step-container">
          <h2 className="step-title">Booking Summary</h2>
          <div className="error-message">
            <p>We're having trouble calculating your fare.</p>
            <button className="back-button" onClick={() => setStep(4)}>
              Back to Payment
            </button>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div className="step-container summary-redesign">
        <div className="summary-main-card">
          <div className="summary-header">
            <FaClipboardCheck className="summary-main-icon" />
            <h2 className="step-title" style={{ marginBottom: 0 }}>
              Booking Summary
            </h2>
          </div>

          <div className="summary-section-block">
            <div className="summary-section-title">📋 Trip Overview</div>
            <div className="summary-details-grid">
              <div className="summary-label">From:</div>
              <div className="summary-value">
                {form.pickup || "Not specified"}
              </div>
              {form.dropoff && (
                <>
                  <div className="summary-label">To:</div>
                  <div className="summary-value">{form.dropoff}</div>
                  <div className="summary-label">Additional Stop:</div>
                  <div className="summary-value">{form.additionalStop || "Not specified"}</div>
                </>
              )}
              <div className="summary-label">Date & Time:</div>
              <div className="summary-value">
                {form.date instanceof Date ? form.date.toLocaleDateString('en-GB') : form.date} at {form.time instanceof Date ? form.time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : form.time}
                {form.bookingMethod === 'time' && form.expectedEndTime && (
                  <div style={{ fontSize: '0.9em', color: '#666', marginTop: '4px' }}>
                    to {form.expectedEndTime instanceof Date ? form.expectedEndTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : form.expectedEndTime}
                  </div>
                )}
              </div>
              <div className="summary-label">Vehicle:</div>
              <div className="summary-value">
                {form.vehiclePreference || "Not specified"}
              </div>
            </div>
          </div>

          <div className="summary-section-block">
            <div className="summary-section-title">👤 Contact & Passengers</div>
            <div className="summary-details-grid">
              <div className="summary-label">Name:</div>
              <div className="summary-value">
                {form.name || "Not specified"}
              </div>
              <div className="summary-label">Phone:</div>
              <div className="summary-value">
                {form.phone || "Not specified"}
              </div>
              <div className="summary-label">Passengers:</div>
              <div className="summary-value">
                {form.adults || 0} {form.adults === 1 ? 'adult' : 'adults'}
                {(form.children_0_4 > 0 || form.children_5_8 > 0) && (
                  <>, {form.children_0_4 + form.children_5_8} {form.children_0_4 + form.children_5_8 === 1 ? 'child' : 'children'}</>
                )}
              </div>
              {(form.children_0_4 > 0 || form.children_5_8 > 0) && (
                <>
                  <div className="summary-label">Child Seats:</div>
                  <div className="summary-value">
                    {form.children_0_4 > 0 && `${form.children_0_4} baby seat${form.children_0_4 > 1 ? 's' : ''} (0-4 years)`}
                    {form.children_0_4 > 0 && form.children_5_8 > 0 && ', '}
                    {form.children_5_8 > 0 && `${form.children_5_8} booster seat${form.children_5_8 > 1 ? 's' : ''} (5-8 years)`}
                  </div>
                </>
              )}
              <div className="summary-label">Luggage:</div>
              <div className="summary-value">
                {form.suitcases || 0} suitcase{form.suitcases !== 1 ? 's' : ''}, {form.carryOn || 0} carry-on
              </div>
            </div>
          </div>

          {form.serviceType === "Airport Transfers" && form.terminal && (
          <div className="summary-section-block">
            <div className="summary-section-title">✈️ Airport Details</div>
            <div className="summary-details-grid">
              <div className="summary-label">Service:</div>
              <div className="summary-value">{form.serviceType}</div>
              <div className="summary-label">Terminal:</div>
              <div className="summary-value">{form.terminal}</div>
              {form.flightDetails?.flightNumber && (
                <>
                  <div className="summary-label">Flight:</div>
                  <div className="summary-value">
                    <div>{form.flightDetails.flightNumber}</div>
                    {form.flightDetails?.flightTime && (
                      <div style={{ fontSize: '0.9em', color: '#666', marginTop: '2px' }}>
                        {form.flightDetails?.flightTime instanceof Date ? form.flightDetails.flightTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : typeof form.flightDetails?.flightTime === 'string' ? form.flightDetails?.flightTime : 'Not specified'}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

          <div className="summary-section-block">
            <div className="summary-section-title">Fare Breakdown</div>
            <div className="fare-breakdown-grid">
              <div className="breakdown-label">Fare (no extras):</div>
              <div className="breakdown-value">
                ${breakdown.baseFare + (breakdown.distanceCharge || breakdown.timeCharge || 0)}
              </div>

              {(breakdown.terminalToll > 0 || breakdown.babySeatTotal > 0 || breakdown.boosterSeatTotal > 0 || breakdown.additionalStopCharge > 0) && (
                <>
                  <div className="breakdown-label" style={{ gridColumn: '1 / -1', fontWeight: 500, color: '#444', marginTop: 8 }}>Extra Charges</div>
                  {breakdown.terminalToll > 0 && (
                    <>
                      <div className="breakdown-label">Airport Terminal Toll:</div>
                      <div className="breakdown-value">${breakdown.terminalToll}</div>
                    </>
                  )}
                  {breakdown.additionalStopCharge > 0 && (
                    <>
                      <div className="breakdown-label">Additional Stop:</div>
                      <div className="breakdown-value">${breakdown.additionalStopCharge}</div>
                    </>
                  )}
                  {breakdown.babySeatTotal > 0 && (
                    <>
                      <div className="breakdown-label">Baby Seat(s) Fee:</div>
                      <div className="breakdown-value">${breakdown.babySeatTotal}</div>
                    </>
                  )}
                  {breakdown.boosterSeatTotal > 0 && (
                    <>
                      <div className="breakdown-label">Booster Seat(s) Fee:</div>
                      <div className="breakdown-value">${breakdown.boosterSeatTotal}</div>
                    </>
                  )}
                </>
              )}

              <div className="breakdown-label breakdown-total">Grand Total:</div>
              <div className="breakdown-value breakdown-total">${breakdown.total}</div>
            </div>
          </div>


          <div className="summary-actions">
            <div className="summary-buttons">
              <motion.button
                type="button"
                className="back-button"
                onClick={() => setStep(4)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Back
              </motion.button>
              <motion.button
                type="button"
                className="confirm-button"
                onClick={handleSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Confirm Booking
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
      <div className="booking-page-root">
        {thankYouModal.show && (
          <>
            <style>{`
              .thank-you-modal-overlay {
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(30,32,50,0.55);
                display: flex; align-items: center; justify-content: center;
                z-index: 2000; animation: fadeIn 0.3s;
              }
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              .thank-you-modal {
                background: linear-gradient(135deg, #fff 70%, #e0e7ff 100%);
                border-radius: 18px; box-shadow: 0 6px 32px rgba(50,60,120,0.18);
                padding: 2.5rem 2.2rem 2rem 2.2rem; max-width: 420px; width: 90vw;
                text-align: center; animation: modalPopUp 0.4s cubic-bezier(.6,-0.28,.74,.05);
              }
              @keyframes modalPopUp { from { transform: scale(0.9) translateY(30px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
              .thank-you-modal h2 { color: #3b2f7f; font-size: 2rem; margin-bottom: 0.5rem; font-weight: 700; letter-spacing: 0.01em; }
              .thank-you-modal p { color: #444; font-size: 1.1rem; margin-bottom: 1.4rem; margin-top: 0.5rem; line-height: 1.5; }
              .thank-you-modal .thank-you-emoji { font-size: 2.5rem; margin-bottom: 0.7rem; animation: pulse 1.5s infinite; }
              @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.13); } 100% { transform: scale(1); } }
              .thank-you-modal button {
                background: linear-gradient(90deg, #5b67e8 60%, #8f6be8 100%);
                color: #fff; border: none; border-radius: 8px; padding: 0.7rem 2.2rem;
                font-size: 1.1rem; font-weight: 600; cursor: pointer;
                box-shadow: 0 2px 8px rgba(91,103,232,0.08);
                transition: background 0.2s, transform 0.2s;
                margin-top: 0.8rem;
              }
              .thank-you-modal button:hover {
                background: linear-gradient(90deg, #8f6be8 60%, #5b67e8 100%);
                transform: scale(1.03);
              }
              .thank-you-modal .special-note {
                background: rgba(91, 103, 232, 0.1);
                border-radius: 8px;
                padding: 12px;
                margin: 15px 0;
                font-size: 0.95rem;
                color: #3b2f7f;
              }
            `}</style>
            <div className="thank-you-modal-overlay">
              <div className="thank-you-modal">
                <div className="thank-you-emoji">
                  {thankYouModal.isSpecialVehicle ? '🚐' : '🎉'}
                </div>
                <h2>Thank You!</h2>
                {thankYouModal.isSpecialVehicle ? (
                  <>
                    <p>Your {thankYouModal.vehicleType} booking request has been received.</p>
                    <div className="special-note">
                      Our team will review your request and contact you shortly with confirmation and payment details.
                    </div>
                    <p>For any urgent inquiries, please contact our customer service.</p>
                  </>
                ) : (
                  <p>We have received your booking.<br />Our team will contact you soon.</p>
                )}
                <button
  style={{ marginTop: '0.8rem', background: 'linear-gradient(90deg, #5b67e8 60%, #8f6be8 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.7rem 2.2rem', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(91,103,232,0.08)', transition: 'background 0.2s, transform 0.2s' }}
  onClick={() => {
    setThankYouModal({ show: false, isSpecialVehicle: false, vehicleType: '' });
    setStep(1);
    setForm({
      bookingMethod: "distance",
      name: "",
      email: "",
      phone: "",
      city: "",
      serviceType: "",
      flightDetails: { flightNumber: "", flightTime: "" },
      terminal: "",
      luggage: "",
      specialInstructions: "",
      paymentMethod: "Card",
      nameOnCard: "",
      cardNumber: "",
      cardType: "Visa",
      expiryMonth: "",
      expiryYear: "",
      cvc: "",
      termsAccepted: false,
      vehiclePreference: "",
      date: "",
      time: "",
      expectedEndTime: "",
      passengers: 1,
      pickup: "",
      dropoff: "",
      distance: "",
      adults: 1,
      children_0_4: 0,
      children_5_8: 0,
      suitcases: 0,
      carryOn: 0,
    });
    setErrors({});
  }}
>
  Close
</button>
              </div>
            </div>
          </>
        )}
        <div className="booking-form-container" ref={formContainerRef}>
          {/* Progress Indicator */}
          <div className="progress-indicator">
            <div
              className={`progress-step${
                step === 1 ? " active" : step > 1 ? " completed" : ""
              }`}
            >
              1
            </div>
            <div className="progress-bar"></div>
            <div
              className={`progress-step${
                step === 2 ? " active" : step > 2 ? " completed" : ""
              }`}
            >
              2
            </div>
            <div className="progress-bar"></div>
            <div
              className={`progress-step${
                step === 3 ? " active" : step > 3 ? " completed" : ""
              }`}
            >
              3
            </div>
            <div className="progress-bar"></div>
            <div
              className={`progress-step${
                step === 4 ? " active" : step > 4 ? " completed" : ""
              }`}
            >
              4
            </div>
            <div className="progress-bar"></div>
            <div
              className={`progress-step${
                step === 5 ? " active" : step > 5 ? " completed" : ""
              }`}
            >
              5
            </div>
            <div className="progress-bar"></div>
            <div className={`progress-step${step === 6 ? " active" : ""}`}>
              6
            </div>
          </div>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep3()}
          {step === 3 && renderStep4()}
          {step === 4 && renderStep2()}
          {step === 5 && renderStep5()}
          {step === 6 && renderStep6()}
        </div>
      </div>
    </LoadScript>
  );
};

export default BookingPage;
