import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Database, Share2, Shield, Check, User, Building2, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PricingPlans = () => {
  const { toast } = useToast();

  const handleSubscribe = (plan: string) => {
    if (plan === 'Business+') {
      const whatsappUrl = `https://wa.me/919656778508?text=Hi,%20I'm%20interested%20in%20the%20${plan}%20plan`;
      window.open(whatsappUrl, '_blank');
    } else {
      toast({
        title: "Coming Soon",
        description: `${plan} subscription will be available shortly.`,
      });
    }
  };

  const plans = [
    {
      name: "Free",
      description: "Perfect for individuals",
      price: "$0",
      icon: User,
      features: [
        "Up to 3 digital cards",
        "Basic customization",
        "QR code sharing",
        "Email support"
      ]
    },
    {
      name: "Pro",
      description: "For professionals",
      price: "$5",
      icon: Users,
      features: [
        "Unlimited digital cards",
        "Premium templates",
        "Advanced customization",
        "Priority support"
      ]
    },
    {
      name: "Business",
      description: "For organizations",
      price: "$4",
      icon: Building2,
      features: [
        "Per user/month",
        "Advanced analytics",
        "Custom branding",
        "API access",
        "24/7 support"
      ]
    },
    {
      name: "Business+",
      description: "Enterprise solution",
      price: "Custom",
      icon: Building,
      features: [
        "Custom user limit",
        "Dedicated support",
        "Custom integration",
        "SLA guarantee",
        "On-premise option"
      ]
    }
  ];

  return (
    <div className="py-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card key={plan.name} className="p-6 space-y-6 hover:shadow-lg transition-shadow">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>
              
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && plan.price !== "$0" && <span className="text-muted-foreground">per user/month</span>}
              </div>
              
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.name === "Business+" ? "outline" : "default"}
                className="w-full"
                onClick={() => handleSubscribe(plan.name)}
              >
                {plan.name === "Free" ? "Current Plan" : plan.name === "Business+" ? "Contact Sales" : "Subscribe"}
              </Button>
            </Card>
          )}
        )}
      </div>
    </div>
  );
};
