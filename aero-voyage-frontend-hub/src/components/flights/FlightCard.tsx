
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Clock, Users, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  price: number;
  availableSeats: number;
  aircraft: string;
}

interface FlightCardProps {
  flight: Flight;
  passengers: number;
}

const FlightCard = ({ flight, passengers }: FlightCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isBooking, setIsBooking] = useState(false);

  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const totalPrice = flight.price * passengers;

  const handleBooking = () => {
    if (!user) {
      toast({
        title: "Please Sign In",
        description: "You need to be logged in to book a flight.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    navigate('/booking', {
      state: {
        flight,
        passengers,
        totalPrice
      }
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Flight Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{formatTime(flight.departureTime)}</div>
                <div className="text-sm text-gray-600">{flight.from}</div>
              </div>
              
              <div className="flex-1 px-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="h-px bg-gray-300 flex-1"></div>
                  <Plane className="h-4 w-4 text-gray-400" />
                  <div className="h-px bg-gray-300 flex-1"></div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  {formatDuration(flight.duration)}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">{formatTime(flight.arrivalTime)}</div>
                <div className="text-sm text-gray-600">{flight.to}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Badge variant="secondary">{flight.airline}</Badge>
                <span>{flight.flightNumber}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{flight.availableSeats} seats left</span>
              </div>
              <div className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                <span>{flight.aircraft}</span>
              </div>
            </div>
          </div>

          {/* Price and Booking */}
          <div className="lg:text-right">
            <div className="mb-4">
              <div className="text-sm text-gray-600">
                {passengers > 1 && (
                  <div>${flight.price} × {passengers} passengers</div>
                )}
              </div>
              <div className="text-3xl font-bold text-blue-600">
                ${totalPrice}
              </div>
              <div className="text-sm text-gray-600">Total price</div>
            </div>
            
            <Button 
              onClick={handleBooking}
              disabled={isBooking || flight.availableSeats === 0}
              className="w-full lg:w-auto"
            >
              {flight.availableSeats === 0 ? 'Sold Out' : 'Select Flight'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
