export const openWhatsApp = (serviceName = '') => {
  const phoneNumber = '61416535987';
  const message = serviceName 
    ? `Hello, I'm interested in ${serviceName} service!` 
    : "Hello, I'm interested in your services!";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};
