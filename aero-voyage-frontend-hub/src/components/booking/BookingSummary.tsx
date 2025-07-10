
import { Plane, Calendar, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface BookingSummaryProps {
  flight: any;
  passengers: number;
  totalPrice: number;
}

const BookingSummary = ({ flight, passengers, totalPrice }: BookingSummaryProps) => {
  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (dateTime: string) => {
    return new Date(dateTime).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plane className="h-5 w-5" />
          Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Flight Details */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">{flight.airline}</span>
            <span className="text-sm text-gray-600">{flight.flightNumber}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="font-bold text-lg">{formatTime(flight.departureTime)}</div>
              <div className="text-sm text-gray-600">{flight.from}</div>
            </div>
            <div className="text-center">
              <Plane className="h-4 w-4 text-gray-400 mx-auto" />
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">{formatTime(flight.arrivalTime)}</div>
              <div className="text-sm text-gray-600">{flight.to}</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mt-2 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(flight.departureTime)}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {passengers} passenger{passengers !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Base fare × {passengers}</span>
            <span>${flight.price * passengers}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes & fees</span>
            <span>$0</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
