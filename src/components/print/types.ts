export interface OrderDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PrintServiceProps {
  cardData: {
    name: string;
  };
}