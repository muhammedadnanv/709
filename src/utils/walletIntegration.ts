import { CardData } from "@/types/qrTypes";

export interface WalletPass {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  qrCode: string;
}

const APPLE_WALLET_API_URL = import.meta.env.VITE_APPLE_WALLET_API_URL;
const GOOGLE_WALLET_API_URL = import.meta.env.VITE_GOOGLE_WALLET_API_URL;

export const addToAppleWallet = async (cardData: CardData): Promise<void> => {
  try {
    const response = await fetch(APPLE_WALLET_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: cardData.name,
        title: cardData.title,
        company: cardData.company,
        phone: cardData.phone,
        email: cardData.email,
        website: cardData.website,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add to Apple Wallet');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'business-card.pkpass';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error('Failed to add to Apple Wallet');
  }
};

export const addToGoogleWallet = async (cardData: CardData): Promise<void> => {
  try {
    const response = await fetch(GOOGLE_WALLET_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: cardData.name,
        title: cardData.title,
        company: cardData.company,
        phone: cardData.phone,
        email: cardData.email,
        website: cardData.website,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add to Google Wallet');
    }

    const data = await response.json();
    window.location.href = data.saveUrl;
  } catch (error) {
    throw new Error('Failed to add to Google Wallet');
  }
};