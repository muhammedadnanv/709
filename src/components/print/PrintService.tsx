import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Printer } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PrintServiceProps {
  cardData: {
    name: string;
  };
}

export const PrintService = ({ cardData }: PrintServiceProps) => {
  const [material, setMaterial] = useState("standard");
  const [quantity, setQuantity] = useState("50");
  const { toast } = useToast();

  const handleOrder = () => {
    toast({
      title: "Print Order Received",
      description: `We'll contact you soon about your order for ${quantity} ${material} cards.`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full gap-2">
          <Printer className="h-4 w-4" />
          Order Physical Cards
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Physical Business Cards</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Card Material</Label>
            <Select
              value={material}
              onValueChange={setMaterial}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard (300gsm)</SelectItem>
                <SelectItem value="premium">Premium (400gsm)</SelectItem>
                <SelectItem value="luxury">Luxury (Metallic)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Quantity</Label>
            <Select
              value={quantity}
              onValueChange={setQuantity}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select quantity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">50 Cards</SelectItem>
                <SelectItem value="100">100 Cards</SelectItem>
                <SelectItem value="250">250 Cards</SelectItem>
                <SelectItem value="500">500 Cards</SelectItem>
                <SelectItem value="1000">1000 Cards</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleOrder} className="w-full">
            Place Print Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};