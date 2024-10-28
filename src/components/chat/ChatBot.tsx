import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  text: string;
  isBot: boolean;
}

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const { toast } = useToast();

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isBot: false }]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const response = getBotResponse(input.toLowerCase());
      setMessages((prev) => [...prev, { text: response, isBot: true }]);
    }, 1000);
  };

  const getBotResponse = (query: string): string => {
    if (query.includes("price") || query.includes("cost")) {
      return "Our digital cards are free to create! Premium features are available for ₹699.";
    }
    if (query.includes("print") || query.includes("physical")) {
      return "You can export your card for printing through our Print Service feature. The cost varies based on material and quantity.";
    }
    if (query.includes("download") || query.includes("export")) {
      return "You can download your card in PDF, PNG, or JPEG format using the download button on your card preview.";
    }
    return "I'm here to help! You can ask about pricing, printing services, or how to use our features.";
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Support Chat
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex h-[calc(100vh-12rem)] flex-col justify-between">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex ${
                    message.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.isBot
                        ? "bg-secondary"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex gap-2 pt-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button size="icon" onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};