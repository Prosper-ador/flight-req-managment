
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FiltersProps {
  filters: {
    priceRange: number[];
    airlines: string[];
    departureTime: string;
  };
  onFiltersChange: (filters: any) => void;
}

const airlines = [
  'American Airlines',
  'Delta Airlines',
  'United Airlines',
  'Southwest Airlines',
  'JetBlue Airways',
  'Alaska Airlines'
];

const FlightFilters = ({ filters, onFiltersChange }: FiltersProps) => {
  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: value
    });
  };

  const handleAirlineChange = (airline: string, checked: boolean) => {
    const updatedAirlines = checked
      ? [...filters.airlines, airline]
      : filters.airlines.filter(a => a !== airline);
    
    onFiltersChange({
      ...filters,
      airlines: updatedAirlines
    });
  };

  const handleDepartureTimeChange = (value: string) => {
    onFiltersChange({
      ...filters,
      departureTime: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceRangeChange}
            max={2000}
            min={0}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Airlines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Airlines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {airlines.map((airline) => (
            <div key={airline} className="flex items-center space-x-2">
              <Checkbox
                id={airline}
                checked={filters.airlines.includes(airline)}
                onCheckedChange={(checked) => handleAirlineChange(airline, checked as boolean)}
              />
              <label htmlFor={airline} className="text-sm font-medium">
                {airline}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Departure Time */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Departure Time</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.departureTime} onValueChange={handleDepartureTimeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any time</SelectItem>
              <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
              <SelectItem value="evening">Evening (6PM - 12AM)</SelectItem>
              <SelectItem value="night">Night (12AM - 6AM)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlightFilters;
