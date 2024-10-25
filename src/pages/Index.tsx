import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CardEditor from "@/components/CardEditor";
import CardTemplates from "@/components/CardTemplates";
import { Save, Share2, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Card saved successfully!",
      description: "You can find it in your dashboard.",
    });
  };

  const handleSelectTemplate = (template: any) => {
    toast({
      title: "Template applied!",
      description: `You selected ${template.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="border-b bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Splex</h1>
          <Button variant="outline" className="gap-2">
            <User className="h-4 w-4" />
            Sign In
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr,300px] gap-8">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Create Your Digital Card</h2>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            <CardEditor />
          </div>

          <div className="space-y-6">
            <CardTemplates onSelectTemplate={handleSelectTemplate} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;