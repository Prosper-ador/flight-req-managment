
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plane, User, CreditCard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/layout/Navbar';
import BookingSummary from '@/components/booking/BookingSummary';
import PassengerForm from '@/components/booking/PassengerForm';
import PaymentForm from '@/components/booking/PaymentForm';
import { apiService } from '@/services/api';
import { toast } from '@/hooks/use-toast';

interface Passenger {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, passengers: passengerCount, totalPrice } = location.state || {};

  const [currentStep, setCurrentStep] = useState(1);
  const [passengers, setPassengers] = useState<Passenger[]>(
    Array.from({ length: passengerCount || 1 }, () => ({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: ''
    }))
  );
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!flight) {
    navigate('/flights');
    return null;
  }

  const steps = [
    { number: 1, title: 'Passenger Details', icon: User },
    { number: 2, title: 'Payment', icon: CreditCard },
    { number: 3, title: 'Confirmation', icon: Check }
  ];

  const handlePassengerUpdate = (index: number, passenger: Passenger) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = passenger;
    setPassengers(updatedPassengers);
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate passenger details
      const isValid = passengers.every(p => 
        p.firstName && p.lastName && p.email && p.phone && p.dateOfBirth
      );
      
      if (!isValid) {
        toast({
          title: "Missing Information",
          description: "Please fill in all passenger details.",
          variant: "destructive"
        });
        return;
      }
    }
    
    setCurrentStep(currentStep + 1);
  };

  const handleBooking = async () => {
    setIsProcessing(true);
    
    try {
      const bookingData = {
        flightId: flight.id,
        passengers,
        payment: paymentData,
        totalAmount: totalPrice
      };

      const response = await apiService.post('/bookings', bookingData);
      
      toast({
        title: "Booking Confirmed!",
        description: "Your flight has been booked successfully."
      });
      
      navigate('/booking-confirmation', { 
        state: { 
          booking: response.data,
          flight 
        } 
      });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step) => (
              <div key={step.number} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2
                  ${currentStep >= step.number 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-400'
                  }
                `}>
                  {currentStep > step.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Passenger Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {passengers.map((passenger, index) => (
                    <div key={index}>
                      {index > 0 && <Separator className="my-6" />}
                      <h3 className="text-lg font-semibold mb-4">
                        Passenger {index + 1}
                      </h3>
                      <PassengerForm
                        passenger={passenger}
                        onChange={(updatedPassenger) => handlePassengerUpdate(index, updatedPassenger)}
                      />
                    </div>
                  ))}
                  
                  <Button onClick={handleNextStep} className="w-full mt-6">
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentForm
                    paymentData={paymentData}
                    onChange={setPaymentData}
                  />
                  
                  <div className="flex gap-4 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleBooking}
                      disabled={isProcessing}
                      className="flex-1"
                    >
                      {isProcessing ? 'Processing...' : `Pay $${totalPrice}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <BookingSummary
              flight={flight}
              passengers={passengerCount}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
