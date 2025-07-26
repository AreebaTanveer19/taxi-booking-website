export const openWhatsApp = (serviceName = '') => {
  const phoneNumber = '923264140389';
  const message = serviceName 
    ? `Hello, I'm interested in ${serviceName} service!` 
    : "Hello, I'm interested in your services!";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};
