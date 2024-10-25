import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2, Eye, Share2, QrCode, MessageCircle } from "lucide-react";

interface CardAnalytics {
  views: number;
  shares: number;
  scans: number;
  whatsappClicks: number;
  date: string;
}

interface CardAnalyticsProps {
  cardId: string;
}

const fetchAnalytics = async (cardId: string): Promise<CardAnalytics[]> => {
  // In a real implementation, this would fetch from your API
  // Mock data for demonstration
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split('T')[0],
      views: Math.floor(Math.random() * 50),
      shares: Math.floor(Math.random() * 20),
      scans: Math.floor(Math.random() * 30),
      whatsappClicks: Math.floor(Math.random() * 15)
    };
  }).reverse();

  return last7Days;
};

export const CardAnalytics = ({ cardId }: CardAnalyticsProps) => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['cardAnalytics', cardId],
    queryFn: () => fetchAnalytics(cardId),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const totalViews = analytics?.reduce((sum, day) => sum + day.views, 0) || 0;
  const totalShares = analytics?.reduce((sum, day) => sum + day.shares, 0) || 0;
  const totalScans = analytics?.reduce((sum, day) => sum + day.scans, 0) || 0;
  const totalWhatsApp = analytics?.reduce((sum, day) => sum + day.whatsappClicks, 0) || 0;

  return (
    <Card className="p-6 space-y-6">
      <h3 className="text-lg font-semibold">Card Analytics</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-secondary rounded-lg">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="text-sm">Views</span>
          </div>
          <p className="text-2xl font-bold">{totalViews}</p>
        </div>
        
        <div className="p-4 bg-secondary rounded-lg">
          <div className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span className="text-sm">Shares</span>
          </div>
          <p className="text-2xl font-bold">{totalShares}</p>
        </div>
        
        <div className="p-4 bg-secondary rounded-lg">
          <div className="flex items-center gap-2">
            <QrCode className="h-4 w-4" />
            <span className="text-sm">Scans</span>
          </div>
          <p className="text-2xl font-bold">{totalScans}</p>
        </div>
        
        <div className="p-4 bg-secondary rounded-lg">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">WhatsApp</span>
          </div>
          <p className="text-2xl font-bold">{totalWhatsApp}</p>
        </div>
      </div>

      <div className="h-[200px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={analytics}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="#2563eb" />
            <Line type="monotone" dataKey="shares" stroke="#16a34a" />
            <Line type="monotone" dataKey="scans" stroke="#9333ea" />
            <Line type="monotone" dataKey="whatsappClicks" stroke="#25D366" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};