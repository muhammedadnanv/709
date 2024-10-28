import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { OrderDetails } from "./types";

interface AddressFormProps {
  orderDetails: OrderDetails;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export const AddressForm = ({ 
  orderDetails, 
  onInputChange, 
  onBack, 
  onSubmit 
}: AddressFormProps) => {
  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name*</Label>
        <Input
          id="fullName"
          name="fullName"
          value={orderDetails.fullName}
          onChange={onInputChange}
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
          onChange={onInputChange}
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
          onChange={onInputChange}
          placeholder="+1 (555) 000-0000"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Shipping Address*</Label>
        <Textarea
          id="address"
          name="address"
          value={orderDetails.address}
          onChange={onInputChange}
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
            onChange={onInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">State*</Label>
          <Input
            id="state"
            name="state"
            value={orderDetails.state}
            onChange={onInputChange}
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
          onChange={onInputChange}
          required
        />
      </div>
      
      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          onClick={onBack}
        >
          Back
        </Button>
        <Button onClick={onSubmit}>
          Place Print Order
        </Button>
      </div>
    </div>
  );
};