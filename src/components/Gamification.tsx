import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Star, 
  Crown, 
  Medal, 
  Gift,
  Zap,
  Target,
  Users,
  Calendar,
  MapPin,
  Flame,
  Award,
  TrendingUp
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: number;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface Leaderboard {
  rank: number;
  name: string;
  points: number;
  badges: string[];
  ridesThisMonth: number;
}

export const Gamification = () => {
  const [userStats] = useState({
    totalPoints: 2450,
    level: 8,
    nextLevelPoints: 2800,
    streak: 7,
    totalRides: 42,
    ecoPoints: 180,
    socialRank: 3,
    monthlyRides: 12
  });

  const achievements: Achievement[] = [
    {
      id: "first_ride",
      title: "Welcome Aboard!",
      description: "Complete your first ride",
      icon: <Star className="h-6 w-6" />,
      points: 50,
      unlocked: true,
      progress: 1,
      maxProgress: 1
    },
    {
      id: "eco_warrior",
      title: "Eco Warrior",
      description: "Save 100kg CO2 through carpooling",
      icon: <Zap className="h-6 w-6" />,
      points: 200,
      unlocked: true,
      progress: 100,
      maxProgress: 100
    },
    {
      id: "social_butterfly",
      title: "Social Butterfly",
      description: "Travel with 10 different people",
      icon: <Users className="h-6 w-6" />,
      points: 150,
      unlocked: false,
      progress: 7,
      maxProgress: 10
    },
    {
      id: "streak_master",
      title: "Streak Master",
      description: "Book rides for 7 consecutive days",
      icon: <Flame className="h-6 w-6" />,
      points: 300,
      unlocked: true,
      progress: 7,
      maxProgress: 7
    },
    {
      id: "explorer",
      title: "Campus Explorer",
      description: "Visit 15 different destinations",
      icon: <MapPin className="h-6 w-6" />,
      points: 250,
      unlocked: false,
      progress: 12,
      maxProgress: 15
    },
    {
      id: "weekend_warrior",
      title: "Weekend Warrior",
      description: "Take 20 weekend trips",
      icon: <Calendar className="h-6 w-6" />,
      points: 180,
      unlocked: false,
      progress: 15,
      maxProgress: 20
    }
  ];

  const leaderboard: Leaderboard[] = [
    {
      rank: 1,
      name: "Priya Sharma",
      points: 3850,
      badges: ["Eco Warrior", "Streak Master", "Social Butterfly"],
      ridesThisMonth: 28
    },
    {
      rank: 2,
      name: "Arjun Reddy", 
      points: 3200,
      badges: ["Explorer", "Weekend Warrior"],
      ridesThisMonth: 24
    },
    {
      rank: 3,
      name: "You",
      points: userStats.totalPoints,
      badges: ["Eco Warrior", "Streak Master"],
      ridesThisMonth: userStats.monthlyRides
    },
    {
      rank: 4,
      name: "Kiran Kumar",
      points: 2100,
      badges: ["Social Butterfly"],
      ridesThisMonth: 18
    },
    {
      rank: 5,
      name: "Deepika Reddy",
      points: 1950,
      badges: ["Weekend Warrior"],
      ridesThisMonth: 16
    }
  ];

  const rewards = [
    {
      id: "coffee_voucher",
      title: "Free Coffee at Campus Cafe",
      description: "Enjoy a complimentary coffee",
      points: 500,
      available: userStats.totalPoints >= 500,
      icon: "☕"
    },
    {
      id: "ride_discount",
      title: "20% Off Next 5 Rides",
      description: "Exclusive discount on your next rides",
      points: 800,
      available: userStats.totalPoints >= 800,
      icon: "🎫"
    },
    {
      id: "priority_booking",
      title: "Priority Booking Access",
      description: "Get first choice on popular rides",
      points: 1200,
      available: userStats.totalPoints >= 1200,
      icon: "⚡"
    },
    {
      id: "monthly_pass",
      title: "Free Weekend Pass",
      description: "Unlimited weekend rides for a month",
      points: 2000,
      available: userStats.totalPoints >= 2000,
      icon: "🎪"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-amber-600" />;
      default: return <Trophy className="h-5 w-5 text-transport-primary" />;
    }
  };

  const levelProgress = ((userStats.totalPoints % 350) / 350) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">🎯 MBU Transport Champions</h2>
        <p className="text-muted-foreground">
          Earn points, unlock achievements, and compete with fellow students
        </p>
      </div>

      {/* User Stats Overview */}
      <Card className="border-none shadow-lg bg-gradient-card">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-transport-primary mb-2">
                {userStats.totalPoints.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-transport-secondary mb-2">
                Level {userStats.level}
              </div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-3xl font-bold text-transport-warning mb-2">
                <Flame className="h-8 w-8 mr-1" />
                {userStats.streak}
              </div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-transport-success mb-2">
                #{userStats.socialRank}
              </div>
              <div className="text-sm text-muted-foreground">Campus Rank</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress to Level {userStats.level + 1}</span>
              <span className="text-sm text-muted-foreground">
                {userStats.totalPoints % 350} / 350 XP
              </span>
            </div>
            <Progress value={levelProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="achievements" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`border-none shadow-lg ${
                  achievement.unlocked 
                    ? 'bg-gradient-primary/10 border-l-4 border-l-transport-primary' 
                    : 'bg-gradient-card'
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.unlocked 
                          ? 'bg-transport-primary text-white' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    <Badge className={
                      achievement.unlocked 
                        ? 'bg-transport-success text-white' 
                        : 'bg-muted text-muted-foreground'
                    }>
                      {achievement.points} XP
                    </Badge>
                  </div>

                  {!achievement.unlocked && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                      </div>
                      <Progress 
                        value={(achievement.progress / achievement.maxProgress) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}

                  {achievement.unlocked && (
                    <div className="flex items-center space-x-2 text-transport-success">
                      <Trophy className="h-4 w-4" />
                      <span className="text-sm font-medium">Unlocked!</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-transport-primary" />
                Monthly Leaderboard
              </CardTitle>
              <CardDescription>Top performers this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user) => (
                  <div 
                    key={user.rank}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      user.name === 'You' 
                        ? 'bg-gradient-primary/10 border border-transport-primary' 
                        : 'bg-gradient-card'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(user.rank)}
                        <span className="text-2xl font-bold">#{user.rank}</span>
                      </div>
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-transport-secondary text-white">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <div className="flex space-x-1">
                          {user.badges.slice(0, 2).map((badge, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                          {user.badges.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{user.badges.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-transport-primary">
                        {user.points.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.ridesThisMonth} rides
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <Card 
                key={reward.id} 
                className={`border-none shadow-lg ${
                  reward.available ? 'hover:shadow-xl transition-shadow' : 'opacity-75'
                }`}
              >
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="text-4xl">{reward.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{reward.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {reward.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Gift className="h-4 w-4 text-transport-warning" />
                      <span className="font-medium">{reward.points} points</span>
                    </div>
                    <Button 
                      className={reward.available ? 'bg-gradient-primary' : ''}
                      disabled={!reward.available}
                      variant={reward.available ? 'default' : 'outline'}
                    >
                      {reward.available ? 'Redeem Now' : 'Not Available'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-none shadow-lg bg-gradient-card">
            <CardContent className="pt-6 text-center">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-transport-warning" />
              <h3 className="text-lg font-semibold mb-2">More Rewards Coming Soon!</h3>
              <p className="text-muted-foreground">
                Keep earning points to unlock exclusive rewards and benefits
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};