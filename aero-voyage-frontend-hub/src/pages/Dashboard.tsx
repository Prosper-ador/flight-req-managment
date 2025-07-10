
import { useState, useEffect } from 'react';
import { 
  Plane, 
  Calendar, 
  MapPin, 
  Clock, 
  Star, 
  Trophy,
  CreditCard,
  Bell,
  User,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface Flight {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  seatNumber: string;
  gate: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loyaltyPoints, setLoyaltyPoints] = useState(2450);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockFlights: Flight[] = [
      {
        id: '1',
        from: 'New York (JFK)',
        to: 'London (LHR)',
        date: '2024-01-15',
        time: '14:30',
        status: 'upcoming',
        seatNumber: '12A',
        gate: 'B4'
      },
      {
        id: '2',
        from: 'Paris (CDG)',
        to: 'Tokyo (NRT)',
        date: '2024-01-25',
        time: '22:15',
        status: 'upcoming',
        seatNumber: '8C',
        gate: 'A12'
      },
      {
        id: '3',
        from: 'Dubai (DXB)',
        to: 'Sydney (SYD)',
        date: '2023-12-20',
        time: '09:45',
        status: 'completed',
        seatNumber: '15F',
        gate: 'C7'
      }
    ];

    setTimeout(() => {
      setFlights(mockFlights);
      setIsLoading(false);
    }, 1000);
  }, []);

  const upcomingFlights = flights.filter(f => f.status === 'upcoming');
  const completedFlights = flights.filter(f => f.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-green-600 bg-green-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-2">
                Welcome back, {user?.name?.split(' ')[0]}! ✈️
              </h1>
              <p className="text-muted-foreground text-lg">
                Ready for your next adventure? Let's see what's coming up.
              </p>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="travel-card animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Plane className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Trips</p>
                  <p className="text-2xl font-bold text-blue-600">{upcomingFlights.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="travel-card animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 rounded-full">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Loyalty Points</p>
                  <p className="text-2xl font-bold text-green-600">{loyaltyPoints.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="travel-card animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-100 rounded-full">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Countries Visited</p>
                  <p className="text-2xl font-bold text-purple-600">{completedFlights.length + 5}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="travel-card animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Trip Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">4.8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Flights */}
          <div className="lg:col-span-2">
            <Card className="travel-card animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Upcoming Flights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingFlights.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingFlights.map((flight, index) => (
                      <div 
                        key={flight.id} 
                        className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                              <Plane className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold">{flight.from} → {flight.to}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(flight.date).toLocaleDateString()} at {flight.time}
                              </p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(flight.status)}`}>
                            {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>Seat {flight.seatNumber}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>Gate {flight.gate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button className="w-full mt-4 gradient-sky text-white">
                      <Plane className="h-4 w-4 mr-2" />
                      Book New Flight
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground mb-4">No upcoming flights</p>
                    <Button>Book Your First Flight</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Loyalty */}
          <div className="space-y-6">
            {/* Loyalty Status */}
            <Card className="travel-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span>Loyalty Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full">
                    <Star className="h-4 w-4" />
                    <span className="font-semibold">Gold Member</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Points Balance</span>
                    <span className="font-semibold">{loyaltyPoints.toLocaleString()}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    2,550 more points to Platinum
                  </p>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Redeem Points
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="travel-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plane className="h-4 w-4 mr-2" />
                  Search Flights
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Check-in Online
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Flight Status
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Manage Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="travel-card mt-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle>Recent Flight History</CardTitle>
          </CardHeader>
          <CardContent>
            {completedFlights.length > 0 ? (
              <div className="space-y-3">
                {completedFlights.map((flight) => (
                  <div key={flight.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Plane className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">{flight.from} → {flight.to}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(flight.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(flight.status)}`}>
                      Completed
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">No flight history yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
