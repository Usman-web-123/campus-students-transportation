import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  MapPin, 
  Clock, 
  DollarSign, 
  Star,
  UserPlus,
  Share2,
  Calendar,
  Route
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CarpoolRide {
  id: string;
  organizer: string;
  organizerRating: number;
  pickup: string;
  destination: string;
  departureTime: string;
  totalSeats: number;
  availableSeats: number;
  costPerPerson: number;
  estimatedDuration: string;
  preferences: string[];
  participants: string[];
}

export const RideSharing = () => {
  const [activeTab, setActiveTab] = useState<'join' | 'create'>('join');
  const [newRide, setNewRide] = useState({
    pickup: '',
    destination: '',
    departureTime: '',
    totalSeats: 4,
    preferences: [] as string[]
  });

  const { toast } = useToast();

  const availableRides: CarpoolRide[] = [
    {
      id: "CP001",
      organizer: "Priya Sharma",
      organizerRating: 4.9,
      pickup: "MBU Main Gate",
      destination: "Tirupati Railway Station",
      departureTime: "2024-12-09T14:30",
      totalSeats: 4,
      availableSeats: 2,
      costPerPerson: 35,
      estimatedDuration: "25 mins",
      preferences: ["Non-smoking", "Music OK"],
      participants: ["Priya Sharma", "Arjun Reddy"]
    },
    {
      id: "CP002", 
      organizer: "Kiran Kumar",
      organizerRating: 4.7,
      pickup: "MBU Hostel Block",
      destination: "Sapthagiri Mall",
      departureTime: "2024-12-09T16:00",
      totalSeats: 3,
      availableSeats: 1,
      costPerPerson: 25,
      estimatedDuration: "15 mins",
      preferences: ["Quiet ride", "Non-smoking"],
      participants: ["Kiran Kumar", "Deepika Reddy"]
    },
    {
      id: "CP003",
      organizer: "Rohit Varma",
      organizerRating: 4.8,
      pickup: "MBU Academic Block",
      destination: "TTD Temple",
      departureTime: "2024-12-09T18:30",
      totalSeats: 4,
      availableSeats: 3,
      costPerPerson: 30,
      estimatedDuration: "20 mins",
      preferences: ["Devotional music", "Early morning"],
      participants: ["Rohit Varma"]
    }
  ];

  const popularDestinations = [
    "Tirupati Railway Station",
    "Tirupati Bus Station", 
    "Sapthagiri Mall",
    "TTD Temple",
    "Srinivasam Complex",
    "Ruia Hospital"
  ];

  const handleJoinRide = (rideId: string, organizer: string) => {
    toast({
      title: "🚗 Ride Request Sent!",
      description: `Your request to join ${organizer}'s carpool has been sent. You'll be notified once confirmed.`
    });
  };

  const handleCreateRide = () => {
    if (!newRide.pickup || !newRide.destination || !newRide.departureTime) {
      toast({
        title: "⚠️ Missing Information",
        description: "Please fill in all required fields to create a carpool ride.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "🎉 Carpool Created!",
      description: `Your ride from ${newRide.pickup} to ${newRide.destination} is now live. Students can join your carpool.`
    });

    // Reset form
    setNewRide({
      pickup: '',
      destination: '',
      departureTime: '',
      totalSeats: 4,
      preferences: []
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ride Sharing & Carpools</h2>
        <p className="text-muted-foreground">
          Split costs, reduce emissions, and travel together with fellow students
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-lg bg-gradient-card p-1">
          <Button
            variant={activeTab === 'join' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('join')}
            className={activeTab === 'join' ? 'bg-gradient-primary' : ''}
          >
            <Users className="h-4 w-4 mr-2" />
            Join a Ride
          </Button>
          <Button
            variant={activeTab === 'create' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('create')}
            className={activeTab === 'create' ? 'bg-gradient-primary' : ''}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Create Carpool
          </Button>
        </div>
      </div>

      {activeTab === 'join' && (
        <div className="space-y-6">
          <Card className="border-none shadow-lg bg-gradient-card">
            <CardHeader>
              <CardTitle>💡 Carpool Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-3">
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-transport-success" />
                  <div className="font-medium">Save Money</div>
                  <div className="text-sm text-muted-foreground">Split ride costs</div>
                </div>
                <div className="text-center p-3">
                  <Users className="h-8 w-8 mx-auto mb-2 text-transport-primary" />
                  <div className="font-medium">Meet Friends</div>
                  <div className="text-sm text-muted-foreground">Travel with peers</div>
                </div>
                <div className="text-center p-3">
                  <Route className="h-8 w-8 mx-auto mb-2 text-transport-secondary" />
                  <div className="font-medium">Eco-Friendly</div>
                  <div className="text-sm text-muted-foreground">Reduce emissions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Available Carpools</h3>
            {availableRides.map((ride) => (
              <Card key={ride.id} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-transport-primary text-white">
                          {ride.organizer.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{ride.organizer}</h4>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-transport-warning fill-current" />
                          <span className="text-sm font-medium">{ride.organizerRating}</span>
                          <span className="text-muted-foreground text-sm">• Organizer</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-transport-primary">
                        ₹{ride.costPerPerson}
                      </div>
                      <div className="text-sm text-muted-foreground">per person</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-transport-success" />
                        <span className="font-medium">Pickup:</span>
                        <span className="ml-2">{ride.pickup}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-transport-danger" />
                        <span className="font-medium">Drop:</span>
                        <span className="ml-2">{ride.destination}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-transport-secondary" />
                        <span className="font-medium">Departure:</span>
                        <span className="ml-2">{formatDate(ride.departureTime)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-transport-warning" />
                        <span className="font-medium">Duration:</span>
                        <span className="ml-2">{ride.estimatedDuration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-transport-primary" />
                        <span className="text-sm">
                          {ride.availableSeats} of {ride.totalSeats} seats available
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        {ride.preferences.map((pref, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {pref}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {ride.participants.map((participant, index) => (
                        <Avatar key={index} className="h-8 w-8 border-2 border-background">
                          <AvatarFallback className="text-xs bg-transport-secondary text-white">
                            {participant.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <Button 
                      className="bg-gradient-primary"
                      disabled={ride.availableSeats === 0}
                      onClick={() => handleJoinRide(ride.id, ride.organizer)}
                    >
                      {ride.availableSeats === 0 ? 'Full' : 'Join Ride'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'create' && (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Create a New Carpool</CardTitle>
            <CardDescription>
              Organize a shared ride and split the costs with fellow students
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Location</Label>
                <Select onValueChange={(value) => setNewRide({...newRide, pickup: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pickup location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MBU Main Gate">MBU Main Gate</SelectItem>
                    <SelectItem value="MBU Hostel Block">MBU Hostel Block</SelectItem>
                    <SelectItem value="MBU Academic Block">MBU Academic Block</SelectItem>
                    <SelectItem value="MBU Sports Complex">MBU Sports Complex</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Select onValueChange={(value) => setNewRide({...newRide, destination: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {popularDestinations.map(dest => (
                      <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departure">Departure Time</Label>
                <Input
                  id="departure"
                  type="datetime-local"
                  value={newRide.departureTime}
                  onChange={(e) => setNewRide({...newRide, departureTime: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seats">Total Seats (including you)</Label>
                <Select onValueChange={(value) => setNewRide({...newRide, totalSeats: parseInt(value)})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select total seats" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 seats</SelectItem>
                    <SelectItem value="3">3 seats</SelectItem>
                    <SelectItem value="4">4 seats</SelectItem>
                    <SelectItem value="5">5 seats</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Ride Preferences (Optional)</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['Non-smoking', 'Music OK', 'Quiet ride', 'AC preferred', 'Pet-friendly', 'Luggage space'].map(pref => (
                  <Button
                    key={pref}
                    variant={newRide.preferences.includes(pref) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      const prefs = newRide.preferences.includes(pref)
                        ? newRide.preferences.filter(p => p !== pref)
                        : [...newRide.preferences, pref];
                      setNewRide({...newRide, preferences: prefs});
                    }}
                  >
                    {pref}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-muted-foreground">
                💡 Estimated cost per person will be calculated based on the route
              </div>
              <Button 
                className="bg-gradient-primary px-8"
                onClick={handleCreateRide}
              >
                Create Carpool
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};