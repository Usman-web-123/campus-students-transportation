import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, MapPin, Clock, Users, AlertTriangle } from "lucide-react";

interface DemandData {
  location: string;
  currentDemand: number;
  availableDrivers: number;
  waitTime: string;
  trend: 'up' | 'down' | 'stable';
  priority: 'high' | 'medium' | 'low';
}

interface TimeSlotDemand {
  time: string;
  demand: number;
  prediction: number;
}

export const DemandVisualization = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const demandData: DemandData[] = [
    {
      location: "MBU Main Gate",
      currentDemand: 12,
      availableDrivers: 3,
      waitTime: "8-12 mins",
      trend: 'up',
      priority: 'high'
    },
    {
      location: "Tirupati Railway Station", 
      currentDemand: 8,
      availableDrivers: 5,
      waitTime: "3-5 mins",
      trend: 'down',
      priority: 'medium'
    },
    {
      location: "Sapthagiri Mall",
      currentDemand: 4,
      availableDrivers: 6,
      waitTime: "1-3 mins", 
      trend: 'stable',
      priority: 'low'
    },
    {
      location: "MBU Hostel Block",
      currentDemand: 15,
      availableDrivers: 2,
      waitTime: "15+ mins",
      trend: 'up',
      priority: 'high'
    }
  ];

  const timeSlotDemand: TimeSlotDemand[] = [
    { time: "6:00 AM", demand: 3, prediction: 4 },
    { time: "8:00 AM", demand: 12, prediction: 15 },
    { time: "10:00 AM", demand: 6, prediction: 8 },
    { time: "12:00 PM", demand: 8, prediction: 10 },
    { time: "2:00 PM", demand: 5, prediction: 6 },
    { time: "4:00 PM", demand: 14, prediction: 18 },
    { time: "6:00 PM", demand: 20, prediction: 25 },
    { time: "8:00 PM", demand: 16, prediction: 12 },
    { time: "10:00 PM", demand: 8, prediction: 6 },
  ];

  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-transport-danger text-white';
      case 'medium': return 'bg-transport-warning text-white';
      case 'low': return 'bg-transport-success text-white';
      default: return 'bg-muted';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-transport-danger" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-transport-success" />;
      default: return <div className="h-4 w-4 rounded-full bg-muted-foreground" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Live Demand Monitor</h2>
          <p className="text-muted-foreground">
            Real-time demand and supply balance across all locations
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Last updated</div>
          <div className="font-semibold">{currentTime.toLocaleTimeString()}</div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={refreshData}
            disabled={refreshing}
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </div>

      {/* Current Demand by Location */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {demandData.map((location) => (
          <Card key={location.location} className="border-none shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{location.location}</CardTitle>
                <Badge className={getPriorityColor(location.priority)}>
                  {location.priority.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-transport-primary" />
                  <span className="text-sm">Demand</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-transport-primary">
                    {location.currentDemand}
                  </span>
                  {getTrendIcon(location.trend)}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-transport-success" />
                  <span className="text-sm">Available</span>
                </div>
                <span className="text-lg font-semibold text-transport-success">
                  {location.availableDrivers}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-transport-warning" />
                  <span className="text-sm">Wait Time</span>
                </div>
                <span className="text-sm font-medium text-transport-warning">
                  {location.waitTime}
                </span>
              </div>

              {location.priority === 'high' && (
                <div className="flex items-center space-x-2 p-2 bg-transport-danger/10 rounded-md">
                  <AlertTriangle className="h-4 w-4 text-transport-danger" />
                  <span className="text-xs text-transport-danger">High demand area</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hourly Demand Prediction */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-transport-primary" />
            Today's Demand Pattern
          </CardTitle>
          <CardDescription>
            Current demand vs AI predictions for optimal driver allocation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-primary rounded"></div>
                <span>Current Demand</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-secondary rounded"></div>
                <span>AI Prediction</span>
              </div>
            </div>
            
            <div className="grid grid-cols-9 gap-2">
              {timeSlotDemand.map((slot, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-xs font-medium">{slot.time}</div>
                  <div className="space-y-1">
                    <div 
                      className="bg-gradient-primary rounded-t"
                      style={{ height: `${(slot.demand / 25) * 60}px`, minHeight: '8px' }}
                    ></div>
                    <div 
                      className="bg-gradient-secondary rounded-b opacity-70"
                      style={{ height: `${(slot.prediction / 25) * 60}px`, minHeight: '8px' }}
                    ></div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-transport-primary">{slot.demand}</div>
                    <div className="text-xs text-transport-secondary">{slot.prediction}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Peak Time Alerts */}
      <Card className="border-none shadow-lg bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-transport-warning" />
            Peak Time Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-transport-warning/10 rounded-lg border-l-4 border-transport-warning">
              <div>
                <div className="font-medium">Evening Rush (6:00 PM - 8:00 PM)</div>
                <div className="text-sm text-muted-foreground">Expected 25+ ride requests</div>
              </div>
              <Badge className="bg-transport-warning text-white">2 hours</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-transport-success/10 rounded-lg border-l-4 border-transport-success">
              <div>
                <div className="font-medium">Morning Optimal (10:00 AM - 12:00 PM)</div>
                <div className="text-sm text-muted-foreground">Good driver-to-demand ratio</div>
              </div>
              <Badge className="bg-transport-success text-white">Now</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};