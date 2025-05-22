
import { WelcomeMessage } from "@/components/WelcomeMessage";
import { CardManager } from "@/components/CardManager";
import { PricingPlans } from "@/components/PricingPlans";
import { SignIn } from "@clerk/clerk-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import { ChatBot } from "@/components/chat/ChatBot";
import { DonationWidget } from "@/components/donation/DonationWidget";

const Index = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(true);
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Dialog open={showAuthDialog && !isSignedIn} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <SignIn afterSignInUrl="/" signUpUrl="/sign-up" />
        </DialogContent>
      </Dialog>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8 max-w-7xl mx-auto">
          <WelcomeMessage />
          <CardManager />
          <PricingPlans />
        </div>
      </main>
      
      <ChatBot />
      <DonationWidget 
        upiId="adnanmuhammad4393@okicici"
        name="Muhammed Adnan"
        defaultAmount={199}
        position="bottom-right"
        primaryColor="#8B5CF6"
        buttonText="Donate"
      />
    </div>
  );
};

export default Index;
