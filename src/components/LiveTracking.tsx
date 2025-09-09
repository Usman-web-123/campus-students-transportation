import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Navigation, 
  Phone, 
  MessageCircle, 
  AlertTriangle, 
  Clock,
  Star,
  Car,
  Route,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LiveRideData {
  rideId: string;
  driverName: string;
  driverRating: number;
  driverPhone: string;
  vehicleNumber: string;
  currentLocation: string;
  estimatedArrival: string;
  progress: number;
  status: 'arriving' | 'in_transit' | 'completed';
  route: string[];
  emergencyContact: string;
}

export const LiveTracking = () => {
  const [rideData, setRideData] = useState<LiveRideData>({
    rideId: "MBU-2024-001",
    driverName: "Ravi Kumar",
    driverRating: 4.8,
    driverPhone: "+91 98765 43210",
    vehicleNumber: "AP 05 AB 1234",
    currentLocation: "Near SV University Main Gate",
    estimatedArrival: "3 mins",
    progress: 75,
    status: 'in_transit',
    route: ["MBU Main Gate", "SV University", "Tirupati Railway Station"],
    emergencyContact: "+91 100"
  });

  const [isTracking, setIsTracking] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const { toast } = useToast();

  // Simulate real-time updates
  useEffect(() => {
    if (!isTracking) return;

    const interval = setInterval(() => {
      setRideData(prev => ({
        ...prev,
        progress: Math.min(prev.progress + Math.random() * 5, 100),
        estimatedArrival: prev.progress > 90 ? "1 min" : "3 mins",
        currentLocation: prev.progress > 90 ? "Approaching destination" : "On route to destination"
      }));
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, [isTracking]);

  const handleEmergency = () => {
    toast({
      title: "🚨 Emergency Alert Sent",
      description: "Emergency services and your emergency contact have been notified.",
      variant: "destructive"
    });
  };

  const shareLocation = () => {
    navigator.share?.({
      title: "My Live Location - MBU Transport",
      text: `I'm currently traveling with driver ${rideData.driverName}. Track my ride: ${rideData.rideId}`,
      url: `https://mbu-transport.app/track/${rideData.rideId}`
    }).catch(() => {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard?.writeText(`Track my ride: https://mbu-transport.app/track/${rideData.rideId}`);
      toast({
        title: "📍 Location Link Copied",
        description: "Share this link with friends and family to track your ride."
      });
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Live Ride Tracking</h2>
        <p className="text-muted-foreground">
          Real-time location and ETA updates for your current ride
        </p>
      </div>

      {/* Current Ride Status */}
      <Card className="border-none shadow-lg bg-gradient-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5 text-transport-primary" />
              Ride in Progress
            </CardTitle>
            <Badge className="bg-transport-success text-white animate-pulse">
              LIVE
            </Badge>
          </div>
          <CardDescription>Ride ID: {rideData.rideId}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Trip Progress</span>
              <span>{Math.round(rideData.progress)}%</span>
            </div>
            <Progress value={rideData.progress} className="h-3" />
          </div>

          {/* Route Visualization */}
          <div className="space-y-3">
            {rideData.route.map((stop, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  index < rideData.route.length - 1 && rideData.progress > 50 
                    ? 'bg-transport-success' 
                    : index === rideData.route.length - 1 && rideData.progress > 90
                    ? 'bg-transport-success'
                    : index === 1 && rideData.progress > 25
                    ? 'bg-transport-primary animate-pulse'
                    : 'bg-muted'
                }`} />
                <span className={`text-sm ${
                  index < rideData.route.length - 1 && rideData.progress > 50 
                    ? 'text-transport-success font-medium' 
                    : index === 1 && rideData.progress > 25
                    ? 'text-transport-primary font-medium'
                    : 'text-muted-foreground'
                }`}>
                  {stop}
                </span>
              </div>
            ))}
          </div>

          {/* Current Status */}
          <div className="flex items-center justify-between p-3 bg-transport-primary/10 rounded-lg">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-transport-primary" />
              <div>
                <div className="font-medium">{rideData.currentLocation}</div>
                <div className="text-sm text-muted-foreground">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-transport-primary">
                {rideData.estimatedArrival}
              </div>
              <div className="text-sm text-muted-foreground">ETA</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Driver Information */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-transport-secondary" />
            Driver Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder-driver.jpg" />
              <AvatarFallback className="bg-transport-primary text-white text-lg">
                {rideData.driverName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{rideData.driverName}</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-transport-warning fill-current" />
                  <span className="font-medium">{rideData.driverRating}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{rideData.vehicleNumber}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-transport-success" />
              Call Driver
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-transport-primary" />
              Message
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Safety Features */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-transport-danger" />
            Safety & Sharing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            <Button 
              variant="destructive" 
              className="flex items-center gap-2"
              onClick={handleEmergency}
            >
              <AlertTriangle className="h-4 w-4" />
              Emergency Alert
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={shareLocation}
            >
              <Route className="h-4 w-4" />
              Share Live Location
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Emergency contact: {rideData.emergencyContact} | Your location is being shared with trusted contacts
          </p>
        </CardContent>
      </Card>

      {/* Trip Summary (when completed) */}
      {rideData.progress >= 100 && (
        <Card className="border-none shadow-lg bg-gradient-primary/10">
          <CardContent className="pt-6 text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold mb-2">Trip Completed!</h3>
            <p className="text-muted-foreground mb-4">
              Hope you had a safe and comfortable journey
            </p>
            <Button className="bg-gradient-primary">
              Rate Your Experience
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};