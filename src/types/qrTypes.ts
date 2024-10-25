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