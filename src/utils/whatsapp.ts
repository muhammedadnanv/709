export const sendToWhatsApp = (orderDetails: {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  material: string;
  quantity: string;
}) => {
  const message = `
New Print Order:
---------------
Name: ${orderDetails.fullName}
Email: ${orderDetails.email}
Phone: ${orderDetails.phone}
Address: ${orderDetails.address}
City: ${orderDetails.city}
State: ${orderDetails.state}
ZIP: ${orderDetails.zipCode}
Material: ${orderDetails.material}
Quantity: ${orderDetails.quantity} cards
`;
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/919656778508?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};