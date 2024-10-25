import { QRTemplate } from "@/types/qrTypes";

export const generateVCard = (cardData: any) => {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${cardData?.name || ''}`,
    `TITLE:${cardData?.title || ''}`,
    `TEL:${cardData?.phone || ''}`,
    `EMAIL:${cardData?.email || ''}`,
    `URL:${cardData?.website || ''}`,
    cardData?.linkedin && `URL;type=LinkedIn:${cardData.linkedin}`,
    cardData?.instagram && `URL;type=Instagram:${cardData.instagram}`,
    cardData?.facebook && `URL;type=Facebook:${cardData.facebook}`,
    'END:VCARD'
  ].filter(Boolean).join('\n');
  
  return vcard;
};

export const generateWiFiConfig = (ssid: string, password: string) => 
  `WIFI:T:WPA;S:${ssid};P:${password};;`;

export const generateBluetoothConfig = (deviceName: string, mac: string) =>
  `bluetooth:${deviceName}|${mac}`;

export const generateQRData = (cardData: any, connectivityData: any, isPremium: boolean) => {
  const data = {
    vcard: generateVCard(cardData),
    ...(isPremium && connectivityData?.wifi?.ssid && {
      wifi: generateWiFiConfig(connectivityData.wifi.ssid, connectivityData.wifi.password)
    }),
    ...(isPremium && connectivityData?.bluetooth?.deviceName && {
      bluetooth: generateBluetoothConfig(connectivityData.bluetooth.deviceName, connectivityData.bluetooth.mac)
    })
  };

  return JSON.stringify(data);
};