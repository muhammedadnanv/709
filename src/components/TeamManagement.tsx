import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Users, UserPlus, Settings } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const TeamManagement = () => {
  const [teamName, setTeamName] = useState("");
  const { toast } = useToast();

  const handleInvite = () => {
    toast({
      title: "Coming Soon",
      description: "Team management features will be available in the next update.",
    });
  };

  return (
    <Card className="p-4 sm:p-6 space-y-6 mx-4 sm:mx-auto max-w-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
          <Users className="h-5 w-5 sm:h-6 sm:w-6" />
          Team Management
        </h2>
        <Button variant="outline" size="icon" className="self-end sm:self-auto">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="teamName" className="text-base">Team Name</Label>
          <Input
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
            className="h-12"
          />
        </div>

        <Button onClick={handleInvite} className="w-full gap-2 h-12">
          <UserPlus className="h-4 w-4" />
          Invite Team Members
        </Button>
      </div>

      <div className="pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          Upgrade to Pro for advanced team management features including CRM integration,
          analytics, and custom branding.
        </p>
      </div>
    </Card>
  );
};