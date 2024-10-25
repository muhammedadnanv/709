import { CardData } from "@/hooks/useCardData";

export const generateVCardData = (cardData: CardData, hasWirelessConnectivity: boolean) => {
  const nameParts = cardData.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";
  
  let vcard = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${cardData.name}
TITLE:${cardData.title}`;

  // Add all contact information
  if (cardData.company) {
    vcard += `\nORG:${cardData.company}`;
  }
  if (cardData.department) {
    vcard += `\nDEPARTMENT:${cardData.department}`;
  }
  if (cardData.pronouns) {
    vcard += `\nNOTE:Pronouns: ${cardData.pronouns}`;
  }
  if (cardData.location) {
    vcard += `\nADR:;;${cardData.location};;;;`;
  }
  if (cardData.phone) {
    vcard += `\nTEL;TYPE=CELL:${cardData.phone}`;
  }
  if (cardData.email) {
    vcard += `\nEMAIL:${cardData.email}`;
  }
  if (cardData.website) {
    vcard += `\nURL:${cardData.website}`;
  }
  if (cardData.linkedin) {
    vcard += `\nX-SOCIALPROFILE;TYPE=linkedin:${cardData.linkedin}`;
  }
  if (cardData.instagram) {
    vcard += `\nX-SOCIALPROFILE;TYPE=instagram:${cardData.instagram}`;
  }
  if (cardData.facebook) {
    vcard += `\nX-SOCIALPROFILE;TYPE=facebook:${cardData.facebook}`;
  }

  if (hasWirelessConnectivity) {
    vcard += '\nX-WIRELESS-ENABLED:true';
  }

  vcard += '\nEND:VCARD';
  return vcard;
};