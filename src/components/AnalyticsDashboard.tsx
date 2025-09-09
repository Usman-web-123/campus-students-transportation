import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Navigation, 
  DollarSign, 
  Clock,
  MapPin,
  Star,
  Calendar
} from "lucide-react";

export const AnalyticsDashboard = () => {
  const weeklyData = [
    { day: 'Mon', rides: 45, earnings: 5400, avgWait: 8 },
    { day: 'Tue', rides: 52, earnings: 6240, avgWait: 6 },
    { day: 'Wed', rides: 38, earnings: 4560, avgWait: 12 },
    { day: 'Thu', rides: 61, earnings: 7320, avgWait: 5 },
    { day: 'Fri', rides: 78, earnings: 9360, avgWait: 7 },
    { day: 'Sat', rides: 85, earnings: 10200, avgWait: 4 },
    { day: 'Sun', rides: 42, earnings: 5040, avgWait: 9 },
  ];

  const popularDestinations = [
    { name: 'Tirupati Railway Station', rides: 156, percentage: 28 },
    { name: 'Sapthagiri Mall', rides: 98, percentage: 18 },
    { name: 'Tirupati Bus Station', rides: 89, percentage: 16 },
    { name: 'TTD Temple', rides: 67, percentage: 12 },
    { name: 'Srinivasam Complex', rides: 45, percentage: 8 },
    { name: 'Others', rides: 98, percentage: 18 },
  ];

  const hourlyPattern = [
    { hour: '6AM', demand: 8, supply: 12 },
    { hour: '8AM', demand: 25, supply: 15 },
    { hour: '10AM', demand: 15, supply: 20 },
    { hour: '12PM', demand: 22, supply: 18 },
    { hour: '2PM', demand: 12, supply: 16 },
    { hour: '4PM', demand: 35, supply: 20 },
    { hour: '6PM', demand: 48, supply: 25 },
    { hour: '8PM', demand: 32, supply: 22 },
    { hour: '10PM', demand: 18, supply: 15 },
  ];

  const priceAnalysis = [
    { route: 'MBU → Railway Station', basePrice: 120, avgPrice: 135, peakPrice: 180 },
    { route: 'MBU → Bus Station', basePrice: 100, avgPrice: 110, peakPrice: 150 },
    { route: 'MBU → Sapthagiri Mall', basePrice: 80, avgPrice: 85, peakPrice: 120 },
    { route: 'MBU → TTD Temple', basePrice: 90, avgPrice: 95, peakPrice: 130 },
  ];

  const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#06b6d4'];

  const monthlyStats = {
    totalRides: 1247,
    totalEarnings: 149640,
    avgRating: 4.6,
    activeDrivers: 28,
    avgWaitTime: 7.2,
    completionRate: 94.5
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Analytics Dashboard</h2>
        <p className="text-muted-foreground">
          Comprehensive insights into transportation patterns and performance metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="border-none shadow-md">
          <CardContent className="pt-6 text-center">
            <Navigation className="h-8 w-8 mx-auto mb-2 text-transport-primary" />
            <div className="text-2xl font-bold">{monthlyStats.totalRides.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Rides</div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md">
          <CardContent className="pt-6 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-transport-success" />
            <div className="text-2xl font-bold">₹{monthlyStats.totalEarnings.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Revenue</div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md">
          <CardContent className="pt-6 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-transport-warning" />
            <div className="text-2xl font-bold">{monthlyStats.avgRating}</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md">
          <CardContent className="pt-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-transport-secondary" />
            <div className="text-2xl font-bold">{monthlyStats.activeDrivers}</div>
            <div className="text-sm text-muted-foreground">Active Drivers</div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md">
          <CardContent className="pt-6 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-transport-primary" />
            <div className="text-2xl font-bold">{monthlyStats.avgWaitTime}m</div>
            <div className="text-sm text-muted-foreground">Avg Wait Time</div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md">
          <CardContent className="pt-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-transport-success" />
            <div className="text-2xl font-bold">{monthlyStats.completionRate}%</div>
            <div className="text-sm text-muted-foreground">Completion Rate</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="weekly">Weekly Trends</TabsTrigger>
          <TabsTrigger value="destinations">Popular Routes</TabsTrigger>
          <TabsTrigger value="demand">Demand Patterns</TabsTrigger>
          <TabsTrigger value="pricing">Price Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Weekly Ride Volume</CardTitle>
                <CardDescription>Number of completed rides per day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="rides" fill="hsl(240 73% 65%)" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Daily Earnings</CardTitle>
                <CardDescription>Revenue generated each day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value) => [`₹${value}`, 'Earnings']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="earnings" 
                      stroke="hsl(25 95% 53%)" 
                      fill="hsl(25 95% 53%)"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="destinations" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Destination Distribution</CardTitle>
                <CardDescription>Most popular destinations from MBU</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={popularDestinations}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="rides"
                      label={({ percent }: any) => `${Math.round(percent)}%`}
                    >
                      {popularDestinations.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} rides`, 'Total']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Top Destinations</CardTitle>
                <CardDescription>Ranked by total rides this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularDestinations.slice(0, -1).map((dest, index) => (
                    <div key={dest.name} className="flex items-center justify-between p-3 rounded-lg bg-gradient-card">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-transport-primary text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{dest.name}</div>
                          <div className="text-sm text-muted-foreground">{dest.rides} rides</div>
                        </div>
                      </div>
                      <Badge style={{ backgroundColor: COLORS[index] }} className="text-white">
                        {dest.percentage}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demand" className="space-y-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Demand vs Supply Pattern</CardTitle>
              <CardDescription>Hourly demand and driver availability throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={hourlyPattern}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="demand" 
                    stroke="hsl(240 73% 65%)" 
                    strokeWidth={3}
                    name="Demand"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="supply" 
                    stroke="hsl(25 95% 53%)" 
                    strokeWidth={3}
                    name="Available Drivers"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Route Pricing Analysis</CardTitle>
              <CardDescription>Base price vs average and peak pricing by route</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {priceAnalysis.map((route, index) => (
                  <div key={route.route} className="p-4 rounded-lg bg-gradient-card">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">{route.route}</div>
                      <div className="text-sm text-muted-foreground">
                        Peak: ₹{route.peakPrice}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Base Price</span>
                        <span className="font-semibold">₹{route.basePrice}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Average Price</span>
                        <span className="font-semibold text-transport-primary">₹{route.avgPrice}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full"
                          style={{ width: `${(route.avgPrice / route.peakPrice) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};