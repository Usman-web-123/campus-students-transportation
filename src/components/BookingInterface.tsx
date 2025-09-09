import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, DollarSign, Navigation2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import autoIcon from "@/assets/auto-icon.jpg";

interface RideOption {
  id: string;
  driverName: string;
  rating: number;
  estimatedTime: string;
  price: number;
  seatsAvailable: number;
  distance: string;
}

export const BookingInterface = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [searchingRides, setSearchingRides] = useState(false);
  const [rideOptions, setRideOptions] = useState<RideOption[]>([]);
  const { toast } = useToast();

  const popularDestinations = [
    "Tirupati Railway Station",
    "Tirupati Bus Station", 
    "Sapthagiri Mall",
    "Srinivasam Complex",
    "TTD Temple",
    "Airport",
  ];

  const searchRides = async () => {
    if (!pickup || !destination) {
      toast({
        title: "Missing Information",
        description: "Please select both pickup and destination locations.",
        variant: "destructive",
      });
      return;
    }

    setSearchingRides(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockRides: RideOption[] = [
        {
          id: "1",
          driverName: "Rajesh Kumar",
          rating: 4.8,
          estimatedTime: "5 mins",
          price: 120,
          seatsAvailable: 3,
          distance: "2.3 km"
        },
        {
          id: "2", 
          driverName: "Suresh Reddy",
          rating: 4.6,
          estimatedTime: "8 mins",
          price: 110,
          seatsAvailable: 2,
          distance: "1.8 km"
        },
        {
          id: "3",
          driverName: "Venkat Rao",
          rating: 4.9,
          estimatedTime: "12 mins", 
          price: 100,
          seatsAvailable: 4,
          distance: "3.1 km"
        }
      ];
      
      setRideOptions(mockRides);
      setSearchingRides(false);
    }, 2000);
  };

  const bookRide = (rideId: string, driverName: string) => {
    toast({
      title: "Ride Booked Successfully!",
      description: `Your ride with ${driverName} has been confirmed. You'll receive driver contact details shortly.`,
    });
    setRideOptions([]);
    setPickup("");
    setDestination("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Book Your Ride</h2>
        <p className="text-muted-foreground">
          Find available autos with transparent pricing and real-time tracking
        </p>
      </div>

      {/* Booking Form */}
      <Card className="border-none shadow-lg bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-transport-primary" />
            Trip Details
          </CardTitle>
          <CardDescription>
            Enter your journey details to find available rides
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickup">Pickup Location</Label>
              <Select value={pickup} onValueChange={setPickup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pickup point" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mbu-main-gate">MBU Main Gate</SelectItem>
                  <SelectItem value="mbu-hostel">MBU Hostel Block</SelectItem>
                  <SelectItem value="mbu-library">MBU Library</SelectItem>
                  <SelectItem value="mbu-cafeteria">MBU Cafeteria</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {popularDestinations.map((dest) => (
                    <SelectItem key={dest} value={dest.toLowerCase().replace(/\s+/g, '-')}>
                      {dest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="passengers">Number of Passengers</Label>
              <Select value={passengers} onValueChange={setPassengers}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Passenger</SelectItem>
                  <SelectItem value="2">2 Passengers</SelectItem>
                  <SelectItem value="3">3 Passengers</SelectItem>
                  <SelectItem value="4">4 Passengers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                className="w-full bg-gradient-primary hover:opacity-90" 
                onClick={searchRides}
                disabled={searchingRides}
              >
                {searchingRides ? (
                  <>
                    <Navigation2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching Rides...
                  </>
                ) : (
                  "Find Rides"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ride Options */}
      {rideOptions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Available Rides</h3>
          {rideOptions.map((ride) => (
            <Card key={ride.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img 
                        src={autoIcon} 
                        alt="Auto" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{ride.driverName}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          ⭐ {ride.rating}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {ride.estimatedTime}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {ride.distance}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <div className="text-2xl font-bold text-transport-primary">
                      ₹{ride.price}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        <Users className="h-3 w-3 mr-1" />
                        {ride.seatsAvailable} seats
                      </Badge>
                      <Button 
                        size="sm" 
                        className="bg-gradient-secondary hover:opacity-90"
                        onClick={() => bookRide(ride.id, ride.driverName)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Destinations */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle>Popular Destinations</CardTitle>
          <CardDescription>Quick access to frequently visited locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {popularDestinations.map((dest) => (
              <Button
                key={dest}
                variant="outline"
                className="h-auto p-4 text-left justify-start"
                onClick={() => setDestination(dest.toLowerCase().replace(/\s+/g, '-'))}
              >
                <MapPin className="h-4 w-4 mr-2 text-transport-primary" />
                <span className="text-sm">{dest}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};