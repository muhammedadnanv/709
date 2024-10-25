export const generateVCard = (cardData: any) => `BEGIN:VCARD
VERSION:3.0
FN:${cardData?.name || ''}
TITLE:${cardData?.title || ''}
TEL:${cardData?.phone || ''}
EMAIL:${cardData?.email || ''}
URL:${cardData?.website || ''}
URL;type=LinkedIn:${cardData?.linkedin || ''}
URL;type=Instagram:${cardData?.instagram || ''}
URL;type=Facebook:${cardData?.facebook || ''}
NOTE:Professional Networking Contact
END:VCARD`;

export const generateWiFiConfig = (ssid: string, password: string, security = 'WPA') => 
  `WIFI:T:${security};S:${ssid};P:${password};;`;

export const generateBluetoothConfig = (deviceName: string, mac: string) =>
  `BT:DN:${deviceName};MAC:${mac};;`;

export const generateQRData = (cardData: any, connectivityData: any, isPremium: boolean) => {
  const data = {
    vcard: generateVCard(cardData),
    ...(isPremium && connectivityData?.wifi?.ssid && {
      wifi: generateWiFiConfig(
        connectivityData.wifi.ssid,
        connectivityData.wifi.password
      )
    }),
    ...(isPremium && connectivityData?.bluetooth?.deviceName && {
      bluetooth: generateBluetoothConfig(
        connectivityData.bluetooth.deviceName,
        connectivityData.bluetooth.mac
      )
    })
  };
  return JSON.stringify(data);
};