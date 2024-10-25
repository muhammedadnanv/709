import { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface ProfileImageUploadProps {
  userName: string;
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
}

export const ProfileImageUpload = ({ userName, profileImage, setProfileImage }: ProfileImageUploadProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Error",
        description: "Please upload a valid image file (JPEG, PNG, or GIF)",
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
        title: "Success",
        description: "Profile picture updated successfully",
      });
    };

    reader.onerror = () => {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="w-32 h-32">
        <AvatarImage src={profileImage || ""} alt="Profile" />
        <AvatarFallback className="text-lg">
          {userName ? userName.charAt(0).toUpperCase() : "U"}
        </AvatarFallback>
      </Avatar>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/jpeg,image/png,image/gif"
        className="hidden"
      />
      <Button 
        variant="outline" 
        onClick={() => fileInputRef.current?.click()}
        className="gap-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Upload className="h-4 w-4" />
        )}
        {isLoading ? "Uploading..." : "Upload Profile Picture"}
      </Button>
    </div>
  );
};