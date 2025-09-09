import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Navigation, DollarSign, Clock, Users, MapPin, Phone, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RideRequest {
  id: string;
  studentName: string;
  pickup: string;
  destination: string;
  passengers: number;
  estimatedFare: number;
  distance: string;
  timeAgo: string;
}

export const DriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [rideRequests, setRideRequests] = useState<RideRequest[]>([
    {
      id: "1",
      studentName: "Arjun Reddy",
      pickup: "MBU Main Gate",
      destination: "Tirupati Railway Station",
      passengers: 2,
      estimatedFare: 120,
      distance: "8.5 km",
      timeAgo: "2 mins ago"
    },
    {
      id: "2", 
      studentName: "Priya Sharma",
      pickup: "MBU Hostel Block",
      destination: "Sapthagiri Mall", 
      passengers: 1,
      estimatedFare: 80,
      distance: "4.2 km",
      timeAgo: "5 mins ago"
    }
  ]);
  const { toast } = useToast();

  const handleOnlineToggle = (checked: boolean) => {
    setIsOnline(checked);
    toast({
      title: checked ? "You're now online!" : "You're now offline",
      description: checked 
        ? "You'll start receiving ride requests based on your location." 
        : "You won't receive any new ride requests.",
    });
  };

  const acceptRide = (rideId: string, studentName: string) => {
    setRideRequests(prev => prev.filter(r => r.id !== rideId));
    toast({
      title: "Ride Accepted!",
      description: `You've accepted ${studentName}'s ride. Student contact details sent to your phone.`,
    });
  };

  const declineRide = (rideId: string) => {
    setRideRequests(prev => prev.filter(r => r.id !== rideId));
    toast({
      title: "Ride Declined",
      description: "The ride request has been declined.",
    });
  };

  const todayStats = {
    totalRides: 8,
    earnings: 1240,
    rating: 4.7,
    hoursOnline: 6.5
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Driver Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your availability and respond to ride requests efficiently
        </p>
      </div>

      {/* Online Status */}
      <Card className="border-none shadow-lg bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-transport-primary" />
              Driver Status
            </span>
            <Badge variant={isOnline ? "default" : "secondary"} className="bg-transport-success">
              {isOnline ? "ONLINE" : "OFFLINE"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="online-status"
              checked={isOnline}
              onCheckedChange={handleOnlineToggle}
            />
            <Label htmlFor="online-status">
              {isOnline ? "Available for rides" : "Not accepting rides"}
            </Label>
          </div>
          {isOnline && (
            <p className="text-sm text-muted-foreground mt-2">
              You're visible to students looking for rides in your area.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Today's Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-none shadow-md">
          <CardContent className="pt-6 text-center">
            <Navigation className="h-8 w-8 mx-auto mb-2 text-transport-primary" />
            <div className="text-2xl font-bold">{todayStats.totalRides}</div>
            <div className="text-sm text-muted-foreground">Rides Today</div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md">
          <CardContent className="pt-6 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-transport-success" />
            <div className="text-2xl font-bold">₹{todayStats.earnings}</div>
            <div className="text-sm text-muted-foreground">Today's Earnings</div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md">
          <CardContent className="pt-6 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-transport-warning" />
            <div className="text-2xl font-bold">{todayStats.rating}</div>
            <div className="text-sm text-muted-foreground">Rating</div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md">
          <CardContent className="pt-6 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-transport-secondary" />
            <div className="text-2xl font-bold">{todayStats.hoursOnline}h</div>
            <div className="text-sm text-muted-foreground">Hours Online</div>
          </CardContent>
        </Card>
      </div>

      {/* Ride Requests */}
      {isOnline && rideRequests.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Incoming Ride Requests</h3>
          {rideRequests.map((request) => (
            <Card key={request.id} className="border-l-4 border-l-transport-primary shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{request.studentName}</h4>
                    <p className="text-sm text-muted-foreground">{request.timeAgo}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-transport-primary">
                      ₹{request.estimatedFare}
                    </div>
                    <div className="text-sm text-muted-foreground">{request.distance}</div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-transport-success" />
                    <span className="font-medium">Pickup:</span>
                    <span className="ml-2">{request.pickup}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-transport-danger" />
                    <span className="font-medium">Drop:</span>
                    <span className="ml-2">{request.destination}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-transport-secondary" />
                    <span className="font-medium">Passengers:</span>
                    <span className="ml-2">{request.passengers}</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    className="flex-1 bg-gradient-primary hover:opacity-90"
                    onClick={() => acceptRide(request.id, request.studentName)}
                  >
                    Accept Ride
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => declineRide(request.id)}
                  >
                    Decline
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Requests State */}
      {isOnline && rideRequests.length === 0 && (
        <Card className="border-none shadow-lg">
          <CardContent className="pt-12 pb-12 text-center">
            <Navigation className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold mb-2">No ride requests</h3>
            <p className="text-muted-foreground">
              You're online and ready to receive ride requests. Stay in a popular area for better visibility.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Offline State */}
      {!isOnline && (
        <Card className="border-none shadow-lg">
          <CardContent className="pt-12 pb-12 text-center">
            <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold mb-2">You're offline</h3>
            <p className="text-muted-foreground mb-4">
              Turn on your availability to start receiving ride requests from students.
            </p>
            <Button onClick={() => handleOnlineToggle(true)} className="bg-gradient-primary">
              Go Online
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};