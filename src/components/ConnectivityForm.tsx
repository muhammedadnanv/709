import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Wifi, Bluetooth } from "lucide-react";

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
}

export const ConnectivityForm = ({ 
  connectivityData, 
  handleConnectivityChange 
}: ConnectivityFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Wireless Connectivity</h3>
      
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
    </div>
  );
};