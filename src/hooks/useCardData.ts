import { useState, useEffect, Dispatch, SetStateAction } from 'react';

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

const initialCardData: CardData = {
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

interface UseCardDataReturn {
  cardData: CardData;
  setCardData: Dispatch<SetStateAction<CardData>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: keyof CardData, value: string) => void;
}

export const useCardData = (): UseCardDataReturn => {
  const [cardData, setCardData] = useState<CardData>(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : initialCardData;
    } catch (error) {
      console.error('Error loading card data:', error);
      return initialCardData;
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

  const handleSelectChange = (field: keyof CardData, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    cardData,
    setCardData,
    handleInputChange,
    handleSelectChange,
  };
};