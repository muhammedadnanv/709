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
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Users className="h-6 w-6" />
          Team Management
        </h2>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="teamName">Team Name</Label>
          <Input
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
          />
        </div>

        <Button onClick={handleInvite} className="w-full gap-2">
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