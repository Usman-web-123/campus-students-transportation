import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingInterface } from "@/components/BookingInterface";
import { DriverDashboard } from "@/components/DriverDashboard";
import { DemandVisualization } from "@/components/DemandVisualization";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { LiveTracking } from "@/components/LiveTracking";
import { RideSharing } from "@/components/RideSharing";
import { Gamification } from "@/components/Gamification";
import { SmartNotifications } from "@/components/SmartNotifications";
import { PaymentInterface } from "@/components/PaymentInterface";
import { Navigation, MapPin, TrendingUp, Users, Clock, DollarSign } from "lucide-react";
import heroImage from "@/assets/hero-transport.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("booking");

  const problemStats = [
    { icon: Users, label: "Students Affected", value: "500+", color: "text-transport-primary" },
    { icon: Clock, label: "Avg Wait Time", value: "45min", color: "text-transport-warning" },
    { icon: TrendingUp, label: "Price Variation", value: "3x", color: "text-transport-danger" },
    { icon: MapPin, label: "Routes Covered", value: "15+", color: "text-transport-success" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Navigation className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MBU Transport
            </h1>
          </div>
          <nav className="flex items-center space-x-6">
            <Button variant="ghost" onClick={() => setActiveTab("booking")}>Book Ride</Button>
            <Button variant="ghost" onClick={() => setActiveTab("driver")}>For Drivers</Button>
            <Button variant="ghost" onClick={() => setActiveTab("analytics")}>Analytics</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="MBU Campus Transportation" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Smart Transportation
            <br />
            <span className="text-transport-secondary">for MBU Students</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Solving auto shortages, unfair pricing, and unpredictable availability with AI-powered demand balancing.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-transport-primary hover:bg-white/90"
            onClick={() => setActiveTab("booking")}
          >
            Book Your Ride Now
          </Button>
        </div>
      </section>

      {/* Problem Stats */}
      <section className="py-16 bg-gradient-card">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">The Transportation Challenge</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {problemStats.map((stat, index) => (
              <Card key={index} className="text-center border-none shadow-lg">
                <CardContent className="pt-6">
                  <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Interface */}
      <section className="py-16">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9 gap-1">
              <TabsTrigger value="booking">Booking</TabsTrigger>
              <TabsTrigger value="tracking">Live Track</TabsTrigger>
              <TabsTrigger value="carpool">Carpool</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="driver">Driver</TabsTrigger>
              <TabsTrigger value="demand">Demand</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="booking" className="mt-8">
              <BookingInterface />
            </TabsContent>
            
            <TabsContent value="driver" className="mt-8">
              <DriverDashboard />
            </TabsContent>
            
            <TabsContent value="demand" className="mt-8">
              <DemandVisualization />
            </TabsContent>
            
            <TabsContent value="tracking" className="mt-8">
              <LiveTracking />
            </TabsContent>
            
            <TabsContent value="carpool" className="mt-8">
              <RideSharing />
            </TabsContent>
            
            <TabsContent value="payment" className="mt-8">
              <PaymentInterface />
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-8">
              <AnalyticsDashboard />
            </TabsContent>
            
            <TabsContent value="rewards" className="mt-8">
              <Gamification />
            </TabsContent>
            
            <TabsContent value="alerts" className="mt-8">
              <SmartNotifications />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Solution Features */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Smart Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-transport-primary mb-4" />
                <CardTitle>Predictive Demand</CardTitle>
                <CardDescription>
                  AI-powered prediction of peak times and popular routes to optimize driver allocation.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardHeader>
                <DollarSign className="h-10 w-10 text-transport-success mb-4" />
                <CardTitle>Fair Pricing</CardTitle>
                <CardDescription>
                  Transparent, algorithm-based pricing that adjusts fairly based on demand and distance.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardHeader>
                <Clock className="h-10 w-10 text-transport-warning mb-4" />
                <CardTitle>Real-time Matching</CardTitle>
                <CardDescription>
                  Instant matching of students with nearby drivers for minimal wait times.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Navigation className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold">MBU Transport</h3>
          </div>
          <p className="text-muted-foreground">
            Revolutionizing campus transportation with smart technology
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;