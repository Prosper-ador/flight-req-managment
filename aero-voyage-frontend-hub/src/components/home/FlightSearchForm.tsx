
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Users, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const FlightSearchForm = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: '1',
    tripType: 'round-trip'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchData.from || !searchData.to || !searchData.departDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Navigate to flights page with search parameters
    const params = new URLSearchParams({
      from: searchData.from,
      to: searchData.to,
      departDate: searchData.departDate,
      returnDate: searchData.returnDate,
      passengers: searchData.passengers,
      tripType: searchData.tripType
    });
    
    navigate(`/flights?${params.toString()}`);
  };

  const swapCities = () => {
    setSearchData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  return (
    <Card className="max-w-4xl mx-auto -mt-16 relative z-20 shadow-2xl">
      <CardContent className="p-8">
        <form onSubmit={handleSearch} className="space-y-6">
          {/* Trip Type Selection */}
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="tripType"
                value="round-trip"
                checked={searchData.tripType === 'round-trip'}
                onChange={(e) => setSearchData(prev => ({ ...prev, tripType: e.target.value }))}
                className="text-blue-600"
              />
              <span>Round Trip</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="tripType"
                value="one-way"
                checked={searchData.tripType === 'one-way'}
                onChange={(e) => setSearchData(prev => ({ ...prev, tripType: e.target.value }))}
                className="text-blue-600"
              />
              <span>One Way</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* From */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <Input
                type="text"
                placeholder="Departure city"
                value={searchData.from}
                onChange={(e) => setSearchData(prev => ({ ...prev, from: e.target.value }))}
                className="pl-4"
              />
            </div>

            {/* Swap Button */}
            <div className="flex items-end justify-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={swapCities}
                className="mb-1 hover:bg-blue-50"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            {/* To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <Input
                type="text"
                placeholder="Destination city"
                value={searchData.to}
                onChange={(e) => setSearchData(prev => ({ ...prev, to: e.target.value }))}
                className="pl-4"
              />
            </div>

            {/* Passengers */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
              <Select value={searchData.passengers} onValueChange={(value) => setSearchData(prev => ({ ...prev, passengers: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Departure Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Departure Date</label>
              <Input
                type="date"
                value={searchData.departDate}
                onChange={(e) => setSearchData(prev => ({ ...prev, departDate: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Return Date */}
            {searchData.tripType === 'round-trip' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
                <Input
                  type="date"
                  value={searchData.returnDate}
                  onChange={(e) => setSearchData(prev => ({ ...prev, returnDate: e.target.value }))}
                  min={searchData.departDate || new Date().toISOString().split('T')[0]}
                />
              </div>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
            <Search className="mr-2 h-5 w-5" />
            Search Flights
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FlightSearchForm;
