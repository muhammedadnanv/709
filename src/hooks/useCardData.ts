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
  company?: string;
  department?: string;
  pronouns?: string;
  location?: string;
}

const STORAGE_KEY = 'splex-card-data';

export const useCardData = () => {
  const [cardData, setCardData] = useState<CardData>(() => {
    try {
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
        company: "",
        department: "",
        pronouns: "",
        location: "",
      };
    } catch (error) {
      console.error('Error loading card data:', error);
      return {
        name: "",
        title: "",
        phone: "",
        email: "",
        website: "",
        linkedin: "",
        instagram: "",
        facebook: "",
        company: "",
        department: "",
        pronouns: "",
        location: "",
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cardData));
    } catch (error) {
      console.error('Error saving card data:', error);
    }
  }, [cardData]);

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