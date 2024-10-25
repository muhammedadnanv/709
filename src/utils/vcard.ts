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

  // Only add company and department if they exist
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

  if (hasWirelessConnectivity) {
    vcard += '\nX-WIRELESS-ENABLED:true';
  }

  vcard += '\nEND:VCARD';
  return vcard;
};