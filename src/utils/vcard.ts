import { CardData, VCardData } from "@/types/qrTypes";

export const generateVCardData = (cardData: CardData, hasWirelessConnectivity: boolean): VCardData => {
  const nameParts = cardData.name?.split(" ") || ["", ""];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";
  
  // Create a downloadable vCard format with proper encoding
  let vcard = `BEGIN:VCARD\nVERSION:3.0\n`;
  
  // Add required fields with proper encoding and null checks
  const encodeField = (value: string | undefined) => 
    value ? value.replace(/[\\,;]/g, '\\$&').replace(/\n/g, '\\n') : '';
  
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

  if (hasWirelessConnectivity) {
    vcard += `X-WIRELESS-ENABLED:true\n`;
  }

  vcard += `END:VCARD`;

  // Generate a clean filename based on the contact's name
  const cleanName = (cardData.name || 'contact').replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const downloadFilename = `${cleanName}_contact.vcf`;

  // Create a data URL with proper Content-Type and Content-Disposition headers
  const vcardBlob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const dataUrl = URL.createObjectURL(vcardBlob);
  
  return {
    vcard,
    dataUrl,
    downloadFilename
  };
};