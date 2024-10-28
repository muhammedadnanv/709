import { Button } from "@/components/ui/button";
import { Download, FileImage, FilePdf, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import { useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import jsPDF from "jspdf";

interface CardActionsProps {
  qrCodeRef: React.RefObject<HTMLDivElement>;
  cardData: {
    name: string;
  };
}

export const CardActions = ({ qrCodeRef, cardData }: CardActionsProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async (format: 'png' | 'jpeg' | 'pdf') => {
    if (!qrCodeRef.current) {
      toast({
        title: "Error",
        description: "Could not generate card. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const canvas = await html2canvas(qrCodeRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
      });

      if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
        pdf.save(`${cardData.name || 'digital-card'}.pdf`);
      } else {
        const url = canvas.toDataURL(`image/${format}`, 1.0);
        const link = document.createElement("a");
        link.download = `${cardData.name || 'digital-card'}.${format}`;
        link.href = url;
        link.click();
      }
      
      toast({
        title: "Success!",
        description: `Your card has been downloaded as ${format.toUpperCase()}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download card.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          className="w-full gap-2"
          variant="outline"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {isLoading ? "Downloading..." : "Download Card"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleDownload('png')}>
          <FileImage className="h-4 w-4 mr-2" />
          PNG Image
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDownload('jpeg')}>
          <FileImage className="h-4 w-4 mr-2" />
          JPEG Image
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDownload('pdf')}>
          <FilePdf className="h-4 w-4 mr-2" />
          PDF Document
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};