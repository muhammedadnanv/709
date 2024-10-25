export interface QRTemplate {
  id: number;
  name: string;
  style: {
    background: string;
    foreground: string;
    cornerColor: string;
    layout: "modern" | "classic" | "minimal" | "bold";
  };
}

export interface ConnectivityData {
  wifi?: {
    ssid: string;
    password: string;
  };
  bluetooth?: {
    deviceName: string;
    mac: string;
  };
}