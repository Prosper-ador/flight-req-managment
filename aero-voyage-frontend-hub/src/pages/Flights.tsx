
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plane, Clock, Calendar, Users, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import FlightCard from '@/components/flights/FlightCard';
import FlightFilters from '@/components/flights/FlightFilters';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { apiService } from '@/services/api';
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

const Flights = () => {
  const [searchParams] = useSearchParams();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('price');
  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    airlines: [],
    departureTime: 'any'
  });

  // Get search parameters from URL
  const searchCriteria = {
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || '',
    departDate: searchParams.get('departDate') || '',
    returnDate: searchParams.get('returnDate') || '',
    passengers: searchParams.get('passengers') || '1',
    tripType: searchParams.get('tripType') || 'round-trip'
  };

  useEffect(() => {
    fetchFlights();
  }, [searchParams, sortBy]);

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const params = {
        from: searchCriteria.from,
        to: searchCriteria.to,
        departureDate: searchCriteria.departDate,
        passengers: searchCriteria.passengers,
        sortBy: sortBy
      };

      const response = await apiService.get('/flights/search', params);
      setFlights(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch flights. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredFlights = flights.filter(flight => {
    // Apply filters
    if (flight.price < filters.priceRange[0] || flight.price > filters.priceRange[1]) {
      return false;
    }
    
    if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) {
      return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Summary */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {searchCriteria.from} → {searchCriteria.to}
          </h1>
          <p className="text-gray-600">
            {searchCriteria.departDate} • {searchCriteria.passengers} passenger{searchCriteria.passengers !== '1' ? 's' : ''}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <FlightFilters 
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {/* Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredFlights.length} flight{filteredFlights.length !== 1 ? 's' : ''} found
              </p>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price (Low to High)</SelectItem>
                  <SelectItem value="duration">Duration (Shortest)</SelectItem>
                  <SelectItem value="departure">Departure Time</SelectItem>
                  <SelectItem value="arrival">Arrival Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Flight Results */}
            <div className="space-y-4">
              {filteredFlights.length === 0 ? (
                <Card className="p-8 text-center">
                  <Plane className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No flights found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search criteria or filters
                  </p>
                </Card>
              ) : (
                filteredFlights.map((flight) => (
                  <FlightCard 
                    key={flight.id} 
                    flight={flight}
                    passengers={parseInt(searchCriteria.passengers)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flights;
