export interface CustomButton {
  id: string;
  label: string;
  url: string;
}

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

export interface CardData {
  id?: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  company?: string;
  department?: string;
  pronouns?: string;
  location?: string;
  customButtons: CustomButton[];
}