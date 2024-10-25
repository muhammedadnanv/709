import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CardEditor from "@/components/CardEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Image, Share2, Save, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Card saved successfully!",
      description: "You can find it in your dashboard.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="border-b bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">CardCraft</h1>
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
            <Card className="p-4">
              <Tabs defaultValue="elements">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="elements">Elements</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>
                <TabsContent value="elements" className="space-y-4 mt-4">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <QrCode className="h-4 w-4" />
                    Add QR Code
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Image className="h-4 w-4" />
                    Add Image
                  </Button>
                </TabsContent>
                <TabsContent value="templates" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="aspect-[3/2] rounded-lg bg-muted hover:bg-muted/80 cursor-pointer transition-colors"
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Preview QR Code</h3>
              <div className="aspect-square bg-white rounded-lg flex items-center justify-center">
                <QrCode className="h-32 w-32 text-muted-foreground" />
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;