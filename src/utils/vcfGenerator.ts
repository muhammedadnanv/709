import { CardData } from "@/types/qrTypes";

export const validateCardData = (cardData: CardData): string[] => {
  const errors: string[] = [];
  
  if (!cardData.name?.trim()) errors.push("Name is required");
  if (!cardData.phone?.trim()) errors.push("Phone number is required");
  if (!cardData.email?.trim()) errors.push("Email is required");
  
  // Validate phone format (E.164)
  if (cardData.phone && !/^\+?[1-9]\d{1,14}$/.test(cardData.phone)) {
    errors.push("Invalid phone number format. Please use international format (e.g., +1234567890)");
  }
  
  // Validate email
  if (cardData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cardData.email)) {
    errors.push("Invalid email format");
  }
  
  return errors;
};

export const generateVCFContent = (cardData: CardData): string => {
  const escapeVCF = (value: string = "") => 
    value.replace(/[\\,;]/g, '\\$&').replace(/\n/g, '\\n');

  const vcfContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeVCF(cardData.name?.split(' ').slice(1).join(' '))};${escapeVCF(cardData.name?.split(' ')[0])};;;`,
    `FN:${escapeVCF(cardData.name)}`,
    `ORG:${escapeVCF(cardData.company)}`,
    `TITLE:${escapeVCF(cardData.title)}`,
    `TEL;TYPE=WORK,VOICE:${escapeVCF(cardData.phone)}`,
    `EMAIL;TYPE=WORK:${escapeVCF(cardData.email)}`,
    `URL:${escapeVCF(cardData.website)}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${escapeVCF(cardData.linkedin)}`,
    `X-SOCIALPROFILE;TYPE=instagram:${escapeVCF(cardData.instagram)}`,
    `X-SOCIALPROFILE;TYPE=facebook:${escapeVCF(cardData.facebook)}`,
    'END:VCARD'
  ].join('\n');

  return vcfContent;
};

export const generateDataUrl = (vcfContent: string): string => {
  const blob = new Blob([vcfContent], { type: 'text/vcard;charset=utf-8' });
  return URL.createObjectURL(blob);
};