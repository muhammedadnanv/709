import { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProfileImageUploadProps {
  userName: string;
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
}

export const ProfileImageUpload = ({ userName, profileImage, setProfileImage }: ProfileImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Image too large",
        description: "Please choose an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a JPEG, PNG, or GIF image",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      setProfileImage(e.target?.result as string);
      setIsLoading(false);
      toast({
        title: "Success!",
        description: "Your profile picture has been updated",
      });
    };

    reader.onerror = () => {
      setIsLoading(false);
      toast({
        title: "Upload failed",
        description: "Please try uploading your image again",
        variant: "destructive",
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="w-32 h-32 border-2 border-primary/10">
        <AvatarImage src={profileImage || ""} alt={`${userName}'s profile`} />
        <AvatarFallback className="text-lg bg-primary/5">
          {userName ? userName.charAt(0).toUpperCase() : "U"}
        </AvatarFallback>
      </Avatar>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/jpeg,image/png,image/gif"
        className="hidden"
        aria-label="Upload profile picture"
      />
      <Button 
        variant="outline" 
        onClick={() => fileInputRef.current?.click()}
        className="gap-2 w-full sm:w-auto"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Upload className="h-4 w-4" />
        )}
        {isLoading ? "Uploading..." : "Upload Profile Picture"}
      </Button>
      <p className="text-sm text-muted-foreground text-center">
        Supported formats: JPEG, PNG, GIF (max 5MB)
      </p>
    </div>
  );
};