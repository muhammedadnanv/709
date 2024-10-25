import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Database, Share2, Shield, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PricingPlans = () => {
  const { toast } = useToast();

  const handleSubscribe = (plan: string) => {
    if (plan === 'Enterprise') {
      // WhatsApp redirect with predefined message
      const whatsappUrl = `https://wa.me/919656778508?text=Hi,%20I'm%20interested%20in%20the%20Enterprise%20plan`;
      window.open(whatsappUrl, '_blank');
    } else {
      toast({
        title: "Coming Soon",
        description: `${plan} subscription will be available shortly.`,
      });
    }
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight">Choose Your Plan</h2>
        <p className="text-muted-foreground mt-2">
          Select the perfect plan for your business needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
        {/* Pro Plan */}
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Pro</h3>
            <p className="text-muted-foreground">For growing businesses</p>
          </div>
          
          <div className="text-3xl font-bold">$29/mo</div>
          
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Team management features</span>
            </li>
            <li className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <span>CRM integrations</span>
            </li>
            <li className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              <span>Unlimited sharing</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Priority support</span>
            </li>
          </ul>

          <Button 
            className="w-full" 
            onClick={() => handleSubscribe('Pro')}
          >
            Subscribe to Pro
          </Button>
        </Card>

        {/* Enterprise Plan */}
        <Card className="p-6 space-y-6 border-primary">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Enterprise</h3>
            <p className="text-muted-foreground">For large organizations</p>
          </div>
          
          <div className="text-3xl font-bold">Custom</div>
          
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Advanced team management</span>
            </li>
            <li className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <span>Custom CRM integrations</span>
            </li>
            <li className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              <span>Enterprise-grade sharing</span>
            </li>
            <li className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Enhanced security features</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Dedicated onboarding support</span>
            </li>
          </ul>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleSubscribe('Enterprise')}
          >
            Contact Sales
          </Button>
        </Card>
      </div>
    </div>
  );
};