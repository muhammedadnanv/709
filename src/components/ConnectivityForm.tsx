import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Wifi, Bluetooth, Lock } from "lucide-react";
import { PremiumFeatureDialog } from "./PremiumFeatureDialog";

interface ConnectivityFormProps {
  connectivityData: {
    wifi: {
      ssid: string;
      password: string;
    };
    bluetooth: {
      deviceName: string;
      mac: string;
    };
  };
  handleConnectivityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPremium?: boolean;
}

export const ConnectivityForm = ({ 
  connectivityData, 
  handleConnectivityChange,
  isPremium = false
}: ConnectivityFormProps) => {
  const ConnectivityInputs = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-base">WiFi Settings</Label>
        <div className="relative">
          <Wifi className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
          <Input
            name="wifi.ssid"
            value={connectivityData.wifi.ssid}
            onChange={handleConnectivityChange}
            className="pl-10 h-12 text-base"
            placeholder="WiFi Network Name (SSID)"
          />
        </div>
        <div className="relative">
          <Input
            type="password"
            name="wifi.password"
            value={connectivityData.wifi.password}
            onChange={handleConnectivityChange}
            className="h-12 text-base"
            placeholder="WiFi Password"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Bluetooth Settings</Label>
        <div className="relative">
          <Bluetooth className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
          <Input
            name="bluetooth.deviceName"
            value={connectivityData.bluetooth.deviceName}
            onChange={handleConnectivityChange}
            className="pl-10 h-12 text-base"
            placeholder="Device Name"
          />
        </div>
        <div className="relative">
          <Input
            name="bluetooth.mac"
            value={connectivityData.bluetooth.mac}
            onChange={handleConnectivityChange}
            className="h-12 text-base"
            placeholder="MAC Address"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Wireless Connectivity</h3>
      
      {isPremium ? (
        <ConnectivityInputs />
      ) : (
        <PremiumFeatureDialog>
          <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-4 cursor-pointer hover:border-primary transition-colors">
            <Lock className="w-8 h-8 mx-auto text-muted-foreground" />
            <div>
              <h4 className="font-semibold">Premium Feature</h4>
              <p className="text-sm text-muted-foreground">Click to unlock wireless connectivity options</p>
            </div>
          </div>
        </PremiumFeatureDialog>
      )}
    </div>
  );
};