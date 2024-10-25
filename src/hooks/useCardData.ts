import { useState, useEffect } from 'react';

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

const STORAGE_KEY = 'splex-card-data';

export const useCardData = () => {
  const [cardData, setCardData] = useState<CardData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : {
      name: "",
      title: "",
      phone: "",
      email: "",
      website: "",
      linkedin: "",
      instagram: "",
      facebook: "",
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cardData));
  }, [cardData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const resetCardData = () => {
    setCardData({
      name: "",
      title: "",
      phone: "",
      email: "",
      website: "",
      linkedin: "",
      instagram: "",
      facebook: "",
    });
  };

  return {
    cardData,
    setCardData,
    handleInputChange,
    resetCardData,
  };
};