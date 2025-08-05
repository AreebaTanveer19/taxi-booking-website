import React, { useState, useEffect, useRef } from "react";
import {
  LoadScript,
  Autocomplete,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../styles/BookingPage.css";
import {FaClipboardCheck,FaRegClock,FaMapMarkerAlt} from "react-icons/fa";
import { motion } from "framer-motion";

const BookingPage = () => {
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

  const [form, setForm] = useState({
    bookingMethod: "distance",
    name: "",
    email: "",
    phone: "",
    city: "",
    serviceType: "",
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
      id: 3,
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
      setForm((prev) => ({ ...prev, dropoff: place.formatted_address }))      // Clear dropoff error when valid location is selected
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.dropoff;
        return newErrors;
      });
    }
  };

  // Calculate distance when both pickup and dropoff are set
  useEffect(() => {
    const calculateDistance = async () => {
      if (form.pickup && form.dropoff && form.bookingMethod === "distance") {
        setDistanceLoading(true);
        try {
          const service = new window.google.maps.DistanceMatrixService();
          const results = await service.getDistanceMatrix({
            origins: [form.pickup],
            destinations: [form.dropoff],
            travelMode: "DRIVING",
          });
          const distance = results.rows[0].elements[0].distance.value;
          setForm((prev) => ({ ...prev, distance }));
          setEstimatedFare(calculateFare(prev));
        } catch (error) {
          setDistanceError("Failed to calculate distance");
        } finally {
          setDistanceLoading(false);
        }
      }
    };
    calculateDistance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.pickup, form.dropoff, form.bookingMethod]);

  const calculateDuration = (startTime, endTime) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);
    const totalStartMinutes = startHours * 60 + startMinutes;
    const totalEndMinutes = endHours * 60 + endMinutes;

    let duration = totalEndMinutes - totalStartMinutes;
    if (duration < 0) {
      duration += 24 * 60; // Add 24 hours for next day
    }
    return duration;
  };

  const calculateFare = (formData) => {
    let fare = 0;
    const distanceInKm = (formData.distance || 0) / 1000; // Convert meters to kilometers
    
    if (formData.bookingMethod === "distance") {
      // Distance-based calculation
      const vehicleRates = {
        "Executive Sedan": { base: 70, perKm: 3, baseDistance: 5 },
        "Premium Sedan": { base: 125, perKm: 5.5, baseDistance: 5 },
        "Premium SUV": { base: 80, perKm: 3, baseDistance: 5 },
        "Luxury Van": { base: 110, perKm: 4.5, baseDistance: 5 },
        "Sprinter": { base: 0, perKm: 0, baseDistance: 5 },
      };
      
      const rates = vehicleRates[formData.vehiclePreference] || vehicleRates["Executive Sedan"];
      
      if (distanceInKm <= rates.baseDistance) {
        fare = rates.base;
      } else {
        const additionalKm = distanceInKm - rates.baseDistance;
        fare = rates.base + (additionalKm * rates.perKm);
      }
    } else {
      // Time-based calculation (using hourly rates as a fallback)
      const hourlyRates = {
        "Executive Sedan": 110,
        "Premium Sedan": 120,
        "Premium SUV": 100,
        "Luxury Van": 130,
        "Sprinter": 150,
      };
      const hours = calculateDuration(formData.time, formData.expectedEndTime) / 60;
      fare = hours * (hourlyRates[formData.vehiclePreference] || 100);
    }

    // Add terminal tolls for airport transfers
    if (formData.serviceType === "Airport Transfers" && formData.terminal) {
      const terminalTolls = {
        "T1 International": 15,
        "T2 Domestic": 7,
        "T3 Domestic": 5,
        "T4 Domestic": 7, // No toll for T4 as per requirements
      };
      
      const toll = terminalTolls[formData.terminal] || 0;
      fare += toll;
    }

    // Add child seat charges
    const babySeatCharge = 15; // $15 per baby seat (0-4 years)
    const boosterSeatCharge = 15; // $15 per booster seat (5-8 years)
    
    fare += (formData.children_0_4 || 0) * babySeatCharge;
    fare += (formData.children_5_8 || 0) * boosterSeatCharge;

    // Round to nearest dollar
    return Math.round(fare);
  };

  const calculateRoute = async () => {
    if (form.pickup && form.dropoff && window.google) {
      try {
        const directionsService = new window.google.maps.DirectionsService();

        const result = await new Promise((resolve, reject) => {
          directionsService.route(
            {
              origin: form.pickup,
              destination: form.dropoff,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === "OK") {
                resolve(result);
              } else {
                reject(status);
              }
            }
          );
        });

        setDirections(result);
      } catch (error) {
        console.error("Error calculating route:", error);
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedForm = {
      ...form,
      [name]: type === "checkbox" ? checked : value,
    };

    setForm(updatedForm);

    // Clear pickup and dropoff when city changes
    if (name === "city") {
      setForm((prev) => ({
        ...prev,
        [name]: value,
        pickup: "",
        dropoff: "",
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

  const handleVehicleChange = (e) => {
    const { value } = e.target;
    setForm((prev) => {
      const updatedForm = { ...prev, vehiclePreference: value };
      // Recalculate fare immediately after vehicle change
      if (updatedForm.bookingMethod === "distance" && updatedForm.distance) {
        setEstimatedFare(calculateFare(updatedForm));
      } else if (
        updatedForm.bookingMethod === "time" &&
        updatedForm.time &&
        updatedForm.expectedEndTime
      ) {
        setEstimatedFare(calculateFare(updatedForm));
      }
      return updatedForm;
    });
  };

  // const proceedToPayment = () => {
  //   let cost = 0;

  //   if (form.bookingMethod === "distance") {
  //     const distance = parseFloat(form.distance) || 0;
  //     if (distance <= 0) {
  //       cost = 0;
  //     } else if (distance <= 5) {
  //       cost = 60;
  //     } else if (distance <= 10) {
  //       cost = 75; // 60 + 15
  //     } else if (distance <= 15) {
  //       cost = 90; // 75 + 15
  //     } else if (distance <= 20) {
  //       cost = 105; // 90 + 15
  //     } else if (distance <= 25) {
  //       cost = 120; // 105 + 15
  //     } else if (distance <= 30) {
  //       cost = 135; // 120 + 15
  //     } else {
  //       // distance > 30
  //       const costAt30km = 135;
  //       cost = costAt30km + (distance - 30) * 2;
  //     }
  //   } else {
  //     // 'time' based booking
  //     const start = new Date(`2000-01-01T${form.time}`);
  //     const end = new Date(`2000-01-01T${form.expectedEndTime}`);
  //     const hours = (end - start) / (1000 * 60 * 60);
  //     const hourlyRates = {
  //       "Executive Sedan": 60,
  //       "Premium Sedan": 80,
  //       "Luxury Van": 100,
  //       Sprinter: 120,
  //     };
  //     cost = hours * hourlyRates[form.vehiclePreference] || 0;
  //   }

  //   // Add surcharges
  //   let finalCost = cost;
  //   if (form.serviceType === "Airport Transfers") {
  //     finalCost += 15; // Airport surcharge
  //     // Add variable toll tax based on terminal
  //     if (form.terminal === "T1 International") {
  //       finalCost += 15;
  //     } else if (form.terminal === "T2 Domestic") {
  //       finalCost += 11.5;
  //     } else if (form.terminal === "T3 Domestic") {
  //       finalCost += 6.2;
  //     } else if (form.terminal === "T4 Domestic") {
  //       finalCost += 6.2;
  //     }
  //   }
  //   // Add child seat charges based on age groups
    // finalCost += (form.children_0_4 || 0) * 15; // Baby seats for kids 0-4 age group ($15 each)
  //   finalCost += (form.children_5_8 || 0) * 15; // Booster seats for kids 5-8 age group ($15 each)
  //   setEstimatedCost(Math.round(finalCost));
  //   setStep(4); // Move to payment page (now step 4)
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate final cost with all additional charges
    let finalCost = parseFloat(estimatedCost);
    // Add child seat charges based on age groups
    finalCost += (form.children_0_4 || 0) * 15; // Baby seats for kids 0-4 age group ($15 each)
    finalCost += (form.children_5_8 || 0) * 15; // Booster seats for kids 5-8 age group ($15 each)
    if (form.serviceType === "Airport Transfers") {
      finalCost += 15; // Airport surcharge
      // Add variable toll tax based on terminal
      if (form.terminal === "T1 International") {
        finalCost += 15;
      } else if (form.terminal === "T2 Domestic") {
        finalCost += 11.5;
      } else if (form.terminal === "T3 Domestic") {
        finalCost += 6.2;
      } else if (form.terminal === "T4 Domestic") {
        finalCost += 6.2;
      }
    }

    const bookingData = { ...form, estimatedCost: finalCost.toFixed(2) };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings/book`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Booking submitted! Admin has been notified.");
        setStep(1); // Optional: Reset form or redirect
      } else {
        alert("Booking failed. Please try again later.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Try again later.");
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

  // Step 3: Journey Details
  const validateStep3 = () => {
    const newErrors = {};
    if (!form.city) newErrors.city = "City is required";
    if (!form.serviceType) newErrors.serviceType = "Service type is required";
    if (!form.pickup) newErrors.pickup = "Pickup location is required";
    if (!form.dropoff) newErrors.dropoff = "Drop-off location is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.time) newErrors.time = "Time is required";
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
                <option value="Corporate Transfers">Corporate Transfers</option>
                <option value="Airport Transfers">Airport Transfers</option>
                <option value="Wedding Car">Wedding Car</option>
                <option value="Parcel Delivery">Parcel Delivery</option>
                <option value="Special Events">Special Events</option>
                <option value="Point to Point">Point to Point</option>
              </select>
              {errors.serviceType && (
                <div className="error-message">{errors.serviceType}</div>
              )}
            </div>
            {form.serviceType === "Airport Transfers" && (
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
            )}
          </div>

          {form.serviceType === "Airport Transfers" && (
            <>
              <div className="form-section-title">Flight Details</div>
              <div className="form-row">
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
                  <input
                    type="time"
                    name="flightTime"
                    value={form.flightDetails.flightTime}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        flightDetails: {
                          ...prev.flightDetails,
                          flightTime: e.target.value,
                        },
                      }))
                    }
                    step="3600"
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
            </div>
          )}

          {/* Passenger Details Row */}
          <div className="form-row">
            <div className="form-group">
              <label>Total Pax</label>
              <input
                type="number"
                name="passengers"
                min="1"
                max="24"
                value={form.passengers}
                onChange={handleInputChange}
              />
              {errors.passengers && (
                <div className="error-message">{errors.passengers}</div>
              )}
            </div>
            <div className="form-group">
              <label>Adults</label>
              <input
                type="number"
                name="adults"
                min="1"
                max="8"
                value={form.adults}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Kids (0-4 age)</label>
              <input
                type="number"
                name="children_0_4"
                min="0"
                max="3"
                value={form.children_0_4}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Kids (5-8 age)</label>
              <input
                type="number"
                name="children_5_8"
                min="0"
                max="3"
                value={form.children_5_8}
                onChange={handleInputChange}
              />
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

          {/* Date, Time and Expected End Time Row */}
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleInputChange}
                required
                ref={dateRef}
              />
              {errors.date && <div className="error-message">{errors.date}</div>}
            </div>
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleInputChange}
                required
                ref={timeRef}
                step="3600"
              />
              {errors.time && <div className="error-message">{errors.time}</div>}
            </div>
            {form.bookingMethod === "time" && (
              <div className="form-group">
                <label>End Time</label>
                <input
                  type="time"
                  name="expectedEndTime"
                  value={form.expectedEndTime}
                  onChange={handleInputChange}
                  required
                  step="3600"
                />
                {errors.expectedEndTime && (
                  <div className="error-message">{errors.expectedEndTime}</div>
                )}
              </div>
            )}
          </div>
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
                setStep(3);
              }
            }}
          >
            Continue Vehicle Selection
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
        {form.vehiclePreference &&
          ((form.bookingMethod === "distance" && form.distance) ||
            (form.bookingMethod === "time" && form.expectedEndTime)) && (
            <p className="fare-estimate">
              Estimated Price: ${calculateFare(form)}
            </p>
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
                    <div className="vehicle-card-price">
                      ${calculateFare({ ...form, vehiclePreference: vehicle.name })}
                    </div>
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
    // Safely calculate and format fare with fallbacks
    const rawFare = calculateFare(form);
    const fare = Number(rawFare) || 0;
    const totalFare = Math.round(fare);

    if (!rawFare || isNaN(fare)) {
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
                </>
              )}
              <div className="summary-label">Date & Time:</div>
              <div className="summary-value">
                {form.date && form.time ? `${form.date} at ${form.time}` : "Not specified"}
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
                  <div className="summary-value">{form.flightDetails.flightNumber}</div>
                </>
              )}
            </div>
          </div>
        )}

          <div className="summary-section-block">
            <div className="summary-section-title">Payment Info</div>
            <div className="summary-details-grid">
              <div className="summary-label">Payment Method:</div>
              <div className="summary-value">{form.paymentMethod}</div>
            </div>
          </div>

          <div className="summary-actions">
            <div className="summary-cost-display">
              <div className="cost-label">Estimated Total</div>
              <div className="cost-amount">${totalFare}</div>
            </div>
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
