import { CardData } from "@/hooks/useCardData";

export const generateVCardData = (cardData: CardData, hasWirelessConnectivity: boolean) => {
  const nameParts = cardData.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";
  
  let vcard = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${cardData.name}
TITLE:${cardData.title}
TEL;TYPE=CELL:${cardData.phone}
EMAIL:${cardData.email}
URL:${cardData.website}
URL;type=LinkedIn:${cardData.linkedin}
URL;type=Instagram:${cardData.instagram}
URL;type=Facebook:${cardData.facebook}`;

  if (hasWirelessConnectivity) {
    vcard += '\nX-WIRELESS-ENABLED:true';
  }

  vcard += '\nEND:VCARD';
  return vcard;
};