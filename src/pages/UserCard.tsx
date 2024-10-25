import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CardPreview } from "@/components/card/CardPreview";
import { generateVCardData } from "@/utils/vcard";
import { CardData } from "@/hooks/useCardData";
import { WalletActions } from "@/components/card/WalletActions";

const fetchUserCard = async (userId: string): Promise<CardData> => {
  // In a real implementation, this would fetch from your API
  // For now, we'll return mock data
  return {
    name: "John Doe",
    title: "Software Engineer",
    company: "Tech Corp",
    department: "Engineering",
    pronouns: "they/them",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    email: "john@example.com",
    website: "https://example.com",
    linkedin: "https://linkedin.com/in/johndoe",
    instagram: "https://instagram.com/johndoe",
    facebook: "https://facebook.com/johndoe",
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
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!cardData) {
    return <div className="flex justify-center items-center min-h-screen">Card not found</div>;
  }

  const vCardData = generateVCardData(cardData, false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto space-y-6">
        <CardPreview
          cardData={cardData}
          profileImage={null}
          vCardData={vCardData}
          qrStyle={{
            background: "#FFFFFF",
            foreground: "#000000"
          }}
        />
        <WalletActions
          cardData={cardData}
          qrCodeUrl={vCardData}
        />
      </div>
    </div>
  );
};

export default UserCard;