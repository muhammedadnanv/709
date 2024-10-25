import { QRTemplate } from "@/types/qrTypes";

export const qrTemplates: QRTemplate[] = [
  {
    id: 1,
    name: "Modern Black",
    style: {
      background: "#FFFFFF",
      foreground: "#000000",
      cornerColor: "#000000",
      layout: "modern"
    }
  },
  {
    id: 2,
    name: "Ocean Blue",
    style: {
      background: "#001F3F",
      foreground: "#FFFFFF",
      cornerColor: "#7FDBFF",
      layout: "modern"
    }
  },
  {
    id: 3,
    name: "Forest Green",
    style: {
      background: "#2ECC40",
      foreground: "#FFFFFF",
      cornerColor: "#01FF70",
      layout: "classic"
    }
  },
  {
    id: 4,
    name: "Sunset Red",
    style: {
      background: "#FF4136",
      foreground: "#FFFFFF",
      cornerColor: "#FF851B",
      layout: "minimal"
    }
  },
  {
    id: 5,
    name: "Royal Purple",
    style: {
      background: "#B10DC9",
      foreground: "#FFFFFF",
      cornerColor: "#F012BE",
      layout: "bold"
    }
  },
  {
    id: 6,
    name: "Golden Sun",
    style: {
      background: "#FFDC00",
      foreground: "#000000",
      cornerColor: "#FF851B",
      layout: "classic"
    }
  },
  {
    id: 7,
    name: "Sky Blue",
    style: {
      background: "#7FDBFF",
      foreground: "#000000",
      cornerColor: "#001F3F",
      layout: "minimal"
    }
  },
  {
    id: 8,
    name: "Neon Pink",
    style: {
      background: "#F012BE",
      foreground: "#FFFFFF",
      cornerColor: "#B10DC9",
      layout: "bold"
    }
  },
  {
    id: 9,
    name: "Lime Light",
    style: {
      background: "#01FF70",
      foreground: "#000000",
      cornerColor: "#2ECC40",
      layout: "modern"
    }
  },
  {
    id: 10,
    name: "Orange Glow",
    style: {
      background: "#FF851B",
      foreground: "#000000",
      cornerColor: "#FF4136",
      layout: "classic"
    }
  }
];
