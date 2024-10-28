import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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
import { Printer, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface PrintServiceProps {
  cardData: {
    name: string;
  };
}

interface OrderDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

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

    // Here you would typically send the order to your backend
    console.log("Order placed:", { material, quantity, orderDetails });
    
    toast({
      title: "Order Submitted Successfully",
      description: "We'll contact you soon to confirm your order details.",
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
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name*</Label>
              <Input
                id="fullName"
                name="fullName"
                value={orderDetails.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={orderDetails.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={orderDetails.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Shipping Address*</Label>
              <Textarea
                id="address"
                name="address"
                value={orderDetails.address}
                onChange={handleInputChange}
                placeholder="Enter your street address"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City*</Label>
                <Input
                  id="city"
                  name="city"
                  value={orderDetails.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State*</Label>
                <Input
                  id="state"
                  name="state"
                  value={orderDetails.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code*</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={orderDetails.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <DialogFooter className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAddressForm(false)}
              >
                Back
              </Button>
              <Button onClick={handleFinalOrder}>
                Place Print Order
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};