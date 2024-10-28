import { CardData, VCardData } from "@/types/qrTypes";

export const validateCardData = (cardData: CardData): string[] => {
  const errors: string[] = [];
  
  // More comprehensive validation
  if (!cardData.name?.trim()) {
    errors.push("Name is required");
  } else if (cardData.name.length < 2) {
    errors.push("Name must be at least 2 characters long");
  }
  
  if (!cardData.phone?.trim()) {
    errors.push("Phone number is required");
  } else if (!/^\+?[1-9]\d{1,14}$/.test(cardData.phone)) {
    errors.push("Please enter a valid phone number (e.g., +1234567890)");
  }
  
  if (!cardData.email?.trim()) {
    errors.push("Email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cardData.email)) {
    errors.push("Please enter a valid email address");
  }
  
  // URL validations
  const urlFields = {
    website: cardData.website,
    linkedin: cardData.linkedin,
    instagram: cardData.instagram,
    facebook: cardData.facebook
  };

  Object.entries(urlFields).forEach(([field, url]) => {
    if (url && !url.trim().startsWith('http')) {
      errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} URL must start with http:// or https://`);
    }
  });

  return errors;
};

export const generateVCFContent = (cardData: CardData): string => {
  const nameParts = cardData.name?.split(" ") || ["", ""];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";
  
  // Create a downloadable vCard format with proper encoding and sanitization
  let vcard = `BEGIN:VCARD\nVERSION:3.0\n`;
  
  // Add required fields with proper encoding and null checks
  const encodeField = (value: string | undefined) => 
    value ? value.replace(/[\\,;]/g, '\\$&')
                  .replace(/\n/g, '\\n')
                  .replace(/</g, '')
                  .replace(/>/g, '')
                  .trim() : '';
  
  vcard += `N:${encodeField(lastName)};${encodeField(firstName)};;;\n`;
  vcard += `FN:${encodeField(cardData.name)}\n`;
  
  if (cardData.title) {
    vcard += `TITLE:${encodeField(cardData.title)}\n`;
  }
  if (cardData.company) {
    vcard += `ORG:${encodeField(cardData.company)}\n`;
  }
  if (cardData.department) {
    vcard += `DEPARTMENT:${encodeField(cardData.department)}\n`;
  }
  if (cardData.pronouns) {
    vcard += `NOTE;CHARSET=UTF-8:Pronouns: ${encodeField(cardData.pronouns)}\n`;
  }
  if (cardData.location) {
    vcard += `ADR;TYPE=WORK:;;${encodeField(cardData.location)};;;;\n`;
  }
  if (cardData.phone) {
    vcard += `TEL;TYPE=CELL:${encodeField(cardData.phone)}\n`;
  }
  if (cardData.email) {
    vcard += `EMAIL;TYPE=WORK:${encodeField(cardData.email)}\n`;
  }
  if (cardData.website) {
    vcard += `URL:${encodeField(cardData.website)}\n`;
  }
  if (cardData.linkedin) {
    vcard += `X-SOCIALPROFILE;TYPE=linkedin:${encodeField(cardData.linkedin)}\n`;
  }
  if (cardData.instagram) {
    vcard += `X-SOCIALPROFILE;TYPE=instagram:${encodeField(cardData.instagram)}\n`;
  }
  if (cardData.facebook) {
    vcard += `X-SOCIALPROFILE;TYPE=facebook:${encodeField(cardData.facebook)}\n`;
  }

  vcard += `END:VCARD`;

  // Generate a clean filename based on the contact's name
  const cleanName = (cardData.name || 'contact')
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase();
  const downloadFilename = `${cleanName}_contact.vcf`;

  // Create a data URL with proper Content-Type
  const vcardBlob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const dataUrl = URL.createObjectURL(vcardBlob);
  
  return {
    vcard,
    dataUrl,
    downloadFilename
  } as VCardData;
};