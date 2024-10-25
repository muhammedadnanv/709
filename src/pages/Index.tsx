import { Button } from "@/components/ui/button";
import { Menu, Save, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AuthHeader } from "@/components/AuthHeader";
import { CardManager } from "@/components/CardManager";

const Index = () => {
  const { toast } = useToast();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Digital Cards",
          text: "Check out my digital business cards!",
        });

        toast({
          title: "Success!",
          description: "Your cards have been shared successfully.",
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          toast({
            title: "Error",
            description: "Unable to share the cards. Try saving and sharing manually.",
            variant: "destructive",
          });
        }
      }
    } else {
      toast({
        title: "Info",
        description: "Please use the Save button and share the saved file manually.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Splex</h1>
            
            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col gap-4 mt-8">
                    <AuthHeader />
                    <Button 
                      variant="outline" 
                      className="w-full gap-2"
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop buttons */}
            <div className="hidden md:flex gap-2">
              <AuthHeader />
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold">Your Digital Cards</h2>
          </div>

          <CardManager />
        </div>
      </main>
    </div>
  );
};

export default Index;