import { Wifi, Bluetooth, Facebook, Instagram, Linkedin } from "lucide-react";

interface QRConnectivityStatusProps {
  isPremium: boolean;
  connectivityData?: {
    wifi: { ssid: string; password: string };
    bluetooth: { deviceName: string; mac: string };
  };
  cardData: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export const QRConnectivityStatus = ({
  isPremium,
  connectivityData,
  cardData
}: QRConnectivityStatusProps) => {
  return (
    <>
      <div className="flex gap-4 mb-4">
        {isPremium && connectivityData?.wifi?.ssid && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Wifi className="h-4 w-4" />
            <span>WiFi Ready</span>
          </div>
        )}
        {isPremium && connectivityData?.bluetooth?.deviceName && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Bluetooth className="h-4 w-4" />
            <span>Bluetooth Ready</span>
          </div>
        )}
      </div>
      <div className="flex gap-4 mb-4">
        {cardData.facebook && (
          <Facebook className="h-4 w-4 text-muted-foreground" />
        )}
        {cardData.instagram && (
          <Instagram className="h-4 w-4 text-muted-foreground" />
        )}
        {cardData.linkedin && (
          <Linkedin className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
    </>
  );
};