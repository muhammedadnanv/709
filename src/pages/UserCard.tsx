import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CardPreview } from "@/components/card/CardPreview";
import { CardData } from "@/types/qrTypes";
import { WalletActions } from "@/components/card/WalletActions";

const fetchUserCard = async (userId: string): Promise<CardData> => {
  // In a real implementation, this would fetch from your API
  // For now, we'll return mock data
  return {
    id: userId as `${string}-${string}-${string}-${string}-${string}`,
    name: "John Doe",
    title: "Software Engineer",
    company: "Tech Corp",
    department: "Engineering",
    pronouns: "they/them",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    email: "john@example.com",
    website: "https://example.com",
    customButtons: []
  };
};

const UserCard = () => {
  const { userId } = useParams();

  const { data: cardData, isLoading } = useQuery({
    queryKey: ['userCard', userId],
    queryFn: () => fetchUserCard(userId!),
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!cardData) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Card not found</h2>
          <p className="text-muted-foreground mt-2">This card may have been deleted or doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <div className="max-w-md mx-auto space-y-6">
        <CardPreview
          cardData={cardData}
          profileImage={null}
          qrStyle={{
            background: "#FFFFFF",
            foreground: "#000000"
          }}
        />
        <WalletActions
          cardData={cardData}
          qrCodeUrl={cardData.name}
        />
      </div>
    </div>
  );
};

export default UserCard;