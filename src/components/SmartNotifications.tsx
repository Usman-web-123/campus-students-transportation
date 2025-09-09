import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  BellRing, 
  Clock, 
  MapPin, 
  Users, 
  TrendingUp,
  AlertTriangle,
  Navigation,
  Star,
  Gift,
  Zap,
  Settings,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: 'ride_confirmed' | 'driver_arriving' | 'price_drop' | 'carpool_match' | 'achievement' | 'promotion' | 'traffic_alert' | 'weather_alert';
  title: string;
  message: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
  actionable: boolean;
  data?: any;
}

interface NotificationSettings {
  rideUpdates: boolean;
  priceAlerts: boolean;
  carpoolMatches: boolean;
  achievements: boolean;
  promotions: boolean;
  trafficWeather: boolean;
  pushEnabled: boolean;
}

export const SmartNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "driver_arriving",
      title: "🚗 Driver Approaching",
      message: "Ravi Kumar is 2 minutes away from MBU Main Gate. Vehicle: AP 05 AB 1234",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      priority: "high",
      read: false,
      actionable: true,
      data: { driverName: "Ravi Kumar", eta: "2 mins", vehicle: "AP 05 AB 1234" }
    },
    {
      id: "2", 
      type: "price_drop",
      title: "💰 Price Drop Alert",
      message: "Ride to Tirupati Railway Station is now ₹95 (was ₹120). Book now to save!",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      priority: "medium",
      read: false,
      actionable: true,
      data: { route: "MBU → Railway Station", oldPrice: 120, newPrice: 95 }
    },
    {
      id: "3",
      type: "carpool_match",
      title: "👥 Perfect Carpool Match",
      message: "3 students going to Sapthagiri Mall at 4:00 PM. Join and save ₹30!",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      priority: "medium",
      read: true,
      actionable: true,
      data: { destination: "Sapthagiri Mall", time: "4:00 PM", savings: 30 }
    },
    {
      id: "4",
      type: "achievement",
      title: "🏆 Achievement Unlocked!",
      message: "Congratulations! You've earned 'Eco Warrior' badge for saving 100kg CO2.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priority: "low",
      read: true,
      actionable: false,
      data: { achievement: "Eco Warrior", points: 200 }
    },
    {
      id: "5",
      type: "traffic_alert",
      title: "⚠️ Traffic Alert",
      message: "Heavy traffic on Tirupati-Bangalore highway. Consider alternative routes.",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      priority: "medium",
      read: false,
      actionable: false
    }
  ]);

  const [settings, setSettings] = useState<NotificationSettings>({
    rideUpdates: true,
    priceAlerts: true,
    carpoolMatches: true,
    achievements: true,
    promotions: false,
    trafficWeather: true,
    pushEnabled: false
  });

  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  // Simulate new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotifications = [
        {
          id: Math.random().toString(),
          type: "promotion" as const,
          title: "🎉 Weekend Special",
          message: "Get 25% off on all weekend rides. Valid till Sunday!",
          timestamp: new Date(),
          priority: "low" as const,
          read: false,
          actionable: true
        },
        {
          id: Math.random().toString(),
          type: "ride_confirmed" as const,
          title: "✅ Ride Confirmed",
          message: "Your ride to TTD Temple at 6:30 PM has been confirmed with Kiran Kumar.",
          timestamp: new Date(),
          priority: "high" as const,
          read: false,
          actionable: false
        }
      ];

      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        const randomNotification = newNotifications[Math.floor(Math.random() * newNotifications.length)];
        setNotifications(prev => [randomNotification, ...prev]);
        
        // Show toast for new notification
        toast({
          title: randomNotification.title,
          description: randomNotification.message,
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [toast]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'ride_confirmed': return <Navigation className="h-5 w-5 text-transport-success" />;
      case 'driver_arriving': return <MapPin className="h-5 w-5 text-transport-primary animate-pulse" />;
      case 'price_drop': return <TrendingUp className="h-5 w-5 text-transport-success" />;
      case 'carpool_match': return <Users className="h-5 w-5 text-transport-secondary" />;
      case 'achievement': return <Star className="h-5 w-5 text-transport-warning" />;
      case 'promotion': return <Gift className="h-5 w-5 text-transport-primary" />;
      case 'traffic_alert': return <AlertTriangle className="h-5 w-5 text-transport-danger" />;
      case 'weather_alert': return <Zap className="h-5 w-5 text-transport-warning" />;
      default: return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-transport-danger bg-transport-danger/5';
      case 'medium': return 'border-l-transport-warning bg-transport-warning/5';
      case 'low': return 'border-l-transport-success bg-transport-success/5';
      default: return 'border-l-muted';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    toast({
      title: "🗑️ All Cleared",
      description: "All notifications have been cleared."
    });
  };

  const requestPushPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setSettings(prev => ({ ...prev, pushEnabled: permission === 'granted' }));
      
      toast({
        title: permission === 'granted' ? "🔔 Push Notifications Enabled" : "❌ Permission Denied",
        description: permission === 'granted' 
          ? "You'll now receive real-time push notifications" 
          : "You can enable this later in browser settings"
      });
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Smart Notifications</h2>
          <p className="text-muted-foreground">
            Stay updated with real-time alerts and personalized updates
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {unreadCount > 0 && (
            <Badge className="bg-transport-danger text-white">
              {unreadCount} unread
            </Badge>
          )}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BellRing className="h-5 w-5 text-transport-primary" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Customize what notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'rideUpdates', label: 'Ride Updates', desc: 'Driver arrivals, confirmations, cancellations' },
              { key: 'priceAlerts', label: 'Price Alerts', desc: 'Price drops and surge pricing notifications' },
              { key: 'carpoolMatches', label: 'Carpool Matches', desc: 'When someone matches your carpool preferences' },
              { key: 'achievements', label: 'Achievements', desc: 'Points, badges, and milestone celebrations' },
              { key: 'promotions', label: 'Promotions', desc: 'Special offers and discount codes' },
              { key: 'trafficWeather', label: 'Traffic & Weather', desc: 'Route conditions and weather alerts' }
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between space-x-4">
                <div className="flex-1">
                  <Label htmlFor={key} className="font-medium">{label}</Label>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
                <Switch
                  id={key}
                  checked={settings[key as keyof NotificationSettings] as boolean}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, [key]: checked }))
                  }
                />
              </div>
            ))}
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-1">
                  <Label className="font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications even when the app is closed
                  </p>
                </div>
                {!settings.pushEnabled ? (
                  <Button size="sm" onClick={requestPushPermission}>
                    Enable
                  </Button>
                ) : (
                  <Badge className="bg-transport-success text-white">Enabled</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notifications List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Notifications</h3>
          {notifications.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAllNotifications}
            >
              Clear All
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <Card className="border-none shadow-lg">
            <CardContent className="pt-12 pb-12 text-center">
              <Bell className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
              <p className="text-muted-foreground">
                No new notifications. We'll alert you when something important happens.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`border-none shadow-lg border-l-4 cursor-pointer transition-all hover:shadow-xl ${
                  getPriorityColor(notification.priority)
                } ${!notification.read ? 'ring-1 ring-transport-primary/20' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-3 flex-1">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold">{notification.title}</h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-transport-primary rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                          </div>
                          {notification.actionable && (
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};