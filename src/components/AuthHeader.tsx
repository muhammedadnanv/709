import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { User } from "lucide-react";

export const AuthHeader = () => {
  const { isSignedIn, user } = useUser();

  return (
    <div className="flex items-center gap-2">
      {isSignedIn ? (
        <div className="flex items-center gap-3">
          <span className="text-sm hidden md:inline">
            Welcome, {user.firstName || user.username}
          </span>
          <SignOutButton>
            <Button variant="outline" className="gap-2">
              <User className="h-4 w-4" />
              Sign Out
            </Button>
          </SignOutButton>
        </div>
      ) : (
        <SignInButton mode="modal">
          <Button variant="outline" className="gap-2">
            <User className="h-4 w-4" />
            Sign In
          </Button>
        </SignInButton>
      )}
    </div>
  );
};