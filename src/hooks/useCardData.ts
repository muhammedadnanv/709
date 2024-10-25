import { useState } from 'react';

export interface CardData {
  name: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  linkedin: string;
  instagram: string;
  facebook: string;
}

export const useCardData = () => {
  const [cardData, setCardData] = useState<CardData>({
    name: "",
    title: "",
    phone: "",
    email: "",
    website: "",
    linkedin: "",
    instagram: "",
    facebook: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    cardData,
    setCardData,
    handleInputChange,
  };
};