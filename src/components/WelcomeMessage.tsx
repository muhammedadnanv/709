import { QrCode, Smartphone, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export const WelcomeMessage = () => {
  return (
    <Card className="p-6 space-y-6 text-center">
      <h2 className="text-3xl font-bold tracking-tight">Always with you!</h2>
      
      <div className="grid gap-6 md:grid-cols-3 py-6">
        <div className="space-y-2">
          <Smartphone className="h-8 w-8 mx-auto text-primary" />
          <h3 className="font-semibold">Never Forget</h3>
          <p className="text-sm text-muted-foreground">
            Your digital business card is always with you on your phone
          </p>
        </div>
        
        <div className="space-y-2">
          <QrCode className="h-8 w-8 mx-auto text-primary" />
          <h3 className="font-semibold">Quick Sharing</h3>
          <p className="text-sm text-muted-foreground">
            Share your contact info instantly with a simple QR code scan
          </p>
        </div>
        
        <div className="space-y-2">
          <Share2 className="h-8 w-8 mx-auto text-primary" />
          <h3 className="font-semibold">No App Needed</h3>
          <p className="text-sm text-muted-foreground">
            Works with any phone camera - no special apps or NFC chips required
          </p>
        </div>
      </div>

      <p className="text-muted-foreground">
        Give it a try! Scan any QR code above to instantly save contact details.
      </p>
    </Card>
  );
};