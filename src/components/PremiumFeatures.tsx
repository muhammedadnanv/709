import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Lock, BarChart3, Palette, Users, Zap, Smartphone } from "lucide-react";

interface PremiumFeaturesProps {
  onUnlock: () => void;
}

const PremiumFeatures = ({ onUnlock }: PremiumFeaturesProps) => {
  const { toast } = useToast();
  const [isUnlocked, setIsUnlocked] = useState(false);

  const premiumFeatures = [
    {
      id: 'wireless',
      icon: Smartphone,
      title: 'Wireless Connectivity',
      description: 'Connect and share cards wirelessly'
    },
    {
      id: 'analytics',
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track card views and engagement'
    },
    {
      id: 'branding',
      icon: Palette,
      title: 'Custom Branding',
      description: 'Add your logo and brand colors'
    },
    {
      id: 'team',
      icon: Users,
      title: 'Team Features',
      description: 'Manage multiple team members'
    },
    {
      id: 'automation',
      icon: Zap,
      title: 'Automation',
      description: 'Automated updates and sharing'
    }
  ];

  const handleUnlock = () => {
    toast({
      title: "Payment Details",
      description: "UPI: adnanmuhammad4393@okicici - Please pay ₹699 to unlock premium features",
      duration: 10000,
    });
    setIsUnlocked(true);
    onUnlock();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Lock className="h-4 w-4" />
        Premium Features
      </h3>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {premiumFeatures.map((feature) => (
          <AlertDialog key={feature.id}>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full gap-2 h-auto py-4 flex-col items-start text-left"
                disabled={isUnlocked}
              >
                <div className="flex items-center gap-2 w-full">
                  <feature.icon className="h-4 w-4 shrink-0" />
                  <span className="font-medium">{feature.title}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {feature.description}
                </p>
              </Button>
            </AlertDialogTrigger>
            {!isUnlocked && (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Unlock Premium Features</AlertDialogTitle>
                  <AlertDialogDescription>
                    Get access to all premium features including {feature.title.toLowerCase()} for ₹699. 
                    This is a one-time payment. Please use UPI ID: adnanmuhammad4393@okicici
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleUnlock}>Unlock Now</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            )}
          </AlertDialog>
        ))}
      </div>

      <div className="pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          Upgrade to Pro to unlock all premium features including analytics, custom branding, 
          team management, and automation tools.
        </p>
      </div>
    </div>
  );
};

export default PremiumFeatures;