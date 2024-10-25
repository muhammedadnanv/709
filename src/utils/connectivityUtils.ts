import { QRTemplate } from "@/types/qrTypes";
import qrcodeTerminal from 'qrcode-terminal';

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
    'NOTE:Professional Networking Contact',
    'END:VCARD'
  ].filter(Boolean).join('\n');
  
  return vcard;
};

export const generateWiFiConfig = (ssid: string, password: string) => 
  `WIFI:T:WPA;S:${ssid};P:${password};;`;

export const generateBluetoothConfig = (deviceName: string, mac: string) =>
  `BT:DN:${deviceName};MAC:${mac};;`;

export const generateQRData = (cardData: any, connectivityData: any, isPremium: boolean) => {
  let qrData = generateVCard(cardData);
  
  if (isPremium && connectivityData) {
    if (connectivityData.wifi?.ssid) {
      qrData += '\n---WIFI---\n' + generateWiFiConfig(
        connectivityData.wifi.ssid,
        connectivityData.wifi.password
      );
    }
    
    if (connectivityData.bluetooth?.deviceName) {
      qrData += '\n---BLUETOOTH---\n' + generateBluetoothConfig(
        connectivityData.bluetooth.deviceName,
        connectivityData.bluetooth.mac
      );
    }
  }

  // Generate terminal QR code
  qrcodeTerminal.generate(qrData, { small: true }, (qr) => {
    console.log('\nTerminal QR Code:');
    console.log(qr);
  });
  
  return qrData;
};

export const previewQRInTerminal = (data: string) => {
  qrcodeTerminal.generate(data, { small: true }, (qr) => {
    console.log('\nQR Code Preview:');
    console.log(qr);
  });
};