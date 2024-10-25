import { WelcomeMessage } from "@/components/WelcomeMessage";
import { CardManager } from "@/components/CardManager";
import { PricingPlans } from "@/components/PricingPlans";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <WelcomeMessage />
          <CardManager />
          <PricingPlans />
        </div>
      </main>
    </div>
  );
};

export default Index;