import { CardData, VCardData } from "@/types/qrTypes";

export const validateCardData = (cardData: CardData): string[] => {
  const errors: string[] = [];
  
  if (!cardData.name?.trim()) {
    errors.push("Name is required");
  } else if (cardData.name.length < 2) {
    errors.push("Name must be at least 2 characters long");
  }
  
  if (cardData.phone?.trim() && !/^\+?[1-9]\d{1,14}$/.test(cardData.phone)) {
    errors.push("Please enter a valid phone number");
  }
  
  if (cardData.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cardData.email)) {
    errors.push("Please enter a valid email address");
  }
  
  if (cardData.website && !cardData.website.trim().startsWith('http')) {
    errors.push("Website URL must start with http:// or https://");
  }

  return errors;
};

export const generateVCFContent = (cardData: CardData): VCardData => {
  const nameParts = cardData.name?.split(" ") || ["", ""];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";
  
  let vcard = `BEGIN:VCARD\nVERSION:3.0\n`;
  
  const encodeField = (value: string | undefined) => 
    value ? value.replace(/[\\,;]/g, '\\$&')
                  .replace(/\n/g, '\\n')
                  .replace(/</g, '')
                  .replace(/>/g, '')
                  .trim() : '';
  
  // Required fields
  vcard += `N:${encodeField(lastName)};${encodeField(firstName)};;;\n`;
  vcard += `FN:${encodeField(cardData.name)}\n`;
  
  // Optional fields with proper encoding
  if (cardData.title) vcard += `TITLE:${encodeField(cardData.title)}\n`;
  if (cardData.company) vcard += `ORG:${encodeField(cardData.company)}\n`;
  if (cardData.department) vcard += `DEPARTMENT:${encodeField(cardData.department)}\n`;
  if (cardData.pronouns) vcard += `NOTE;CHARSET=UTF-8:Pronouns: ${encodeField(cardData.pronouns)}\n`;
  if (cardData.location) vcard += `ADR;TYPE=WORK:;;${encodeField(cardData.location)};;;;\n`;
  if (cardData.phone) vcard += `TEL;TYPE=CELL:${encodeField(cardData.phone)}\n`;
  if (cardData.email) vcard += `EMAIL;TYPE=WORK:${encodeField(cardData.email)}\n`;
  if (cardData.website) vcard += `URL:${encodeField(cardData.website)}\n`;

  // Add custom fields for digital wallet compatibility
  vcard += `X-DIGITAL-CARD:true\n`;
  vcard += `X-WALLET-COMPATIBLE:true\n`;
  
  vcard += `END:VCARD`;

  const cleanName = (cardData.name || 'contact')
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase();
  const downloadFilename = `${cleanName}_digital_card.vcf`;

  const vcardBlob = new Blob([vcard], { 
    type: 'text/vcard;charset=utf-8'
  });
  const dataUrl = URL.createObjectURL(vcardBlob);
  
  return {
    vcard,
    dataUrl,
    downloadFilename
  };
};

export const generateQRCodeData = (cardData: CardData): string => {
  const vCardString = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${cardData.name || ''}`,
    `TITLE:${cardData.title || ''}`,
    `ORG:${cardData.company || ''}`,
    cardData.department && `ORG-UNIT:${cardData.department}`,
    cardData.phone && `TEL;TYPE=WORK,VOICE:${cardData.phone}`,
    cardData.email && `EMAIL;TYPE=WORK:${cardData.email}`,
    cardData.website && `URL:${cardData.website}`,
    cardData.location && `ADR;TYPE=WORK:;;${cardData.location}`,
    cardData.pronouns && `NOTE:Pronouns: ${cardData.pronouns}`,
    'END:VCARD'
  ]
    .filter(Boolean)
    .join('\n');

  return vCardString;
};