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
import { Label } from "@/components/ui/label";
import { Printer } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AddressForm } from "./AddressForm";
import { OrderDetails, PrintServiceProps } from "./types";
import { sendToWhatsApp } from "@/utils/whatsapp";

export const PrintService = ({ cardData }: PrintServiceProps) => {
  const [material, setMaterial] = useState("standard");
  const [quantity, setQuantity] = useState("50");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    fullName: cardData.name || "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInitialOrder = () => {
    setShowAddressForm(true);
  };

  const handleFinalOrder = () => {
    if (!orderDetails.fullName || !orderDetails.email || !orderDetails.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    sendToWhatsApp({
      ...orderDetails,
      material,
      quantity
    });
    
    toast({
      title: "Order Submitted Successfully",
      description: "You will be redirected to WhatsApp to confirm your order details.",
    });
    
    setShowAddressForm(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full gap-2">
          <Printer className="h-4 w-4" />
          Order Physical Cards
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Order Physical Business Cards</DialogTitle>
        </DialogHeader>
        
        {!showAddressForm ? (
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Card Material</Label>
              <Select value={material} onValueChange={setMaterial}>
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
              <Select value={quantity} onValueChange={setQuantity}>
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
            
            <Button onClick={handleInitialOrder} className="w-full">
              Continue to Shipping Details
            </Button>
          </div>
        ) : (
          <AddressForm
            orderDetails={orderDetails}
            onInputChange={handleInputChange}
            onBack={() => setShowAddressForm(false)}
            onSubmit={handleFinalOrder}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};