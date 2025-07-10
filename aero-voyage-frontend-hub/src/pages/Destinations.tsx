
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, Calendar, Users, Plane, Heart } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

const destinations = [
  {
    id: 1,
    city: 'Douala',
    country: 'Cameroon',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
    price: 'From $299',
    rating: 4.8,
    description: 'Experience the vibrant culture and stunning landscapes of Cameroon\'s economic capital.',
    highlights: ['Mount Cameroon', 'Wouri River', 'Cultural Museums', 'Local Markets'],
    bestTime: 'Nov - Mar',
    duration: '7-10 days'
  },
  {
    id: 2,
    city: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop',
    price: 'From $899',
    rating: 4.9,
    description: 'Discover the perfect blend of ancient traditions and modern innovation.',
    highlights: ['Tokyo Skytree', 'Shibuya Crossing', 'Cherry Blossoms', 'Sushi Culture'],
    bestTime: 'Mar - May',
    duration: '5-14 days'
  },
  {
    id: 3,
    city: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=250&fit=crop',
    price: 'From $399',
    rating: 4.7,
    description: 'The city that never sleeps offers endless adventures and iconic experiences.',
    highlights: ['Central Park', 'Times Square', 'Statue of Liberty', 'Broadway Shows'],
    bestTime: 'Apr - Jun',
    duration: '4-7 days'
  },
  {
    id: 4,
    city: 'London',
    country: 'UK',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop',
    price: 'From $499',
    rating: 4.6,
    description: 'Rich history meets modern sophistication in this royal capital.',
    highlights: ['Big Ben', 'London Eye', 'British Museum', 'Thames River'],
    bestTime: 'May - Sep',
    duration: '5-8 days'
  },
  {
    id: 5,
    city: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=250&fit=crop',
    price: 'From $599',
    rating: 4.8,
    description: 'Tropical paradise with stunning beaches, temples, and rich culture.',
    highlights: ['Rice Terraces', 'Ancient Temples', 'Beach Resorts', 'Volcanic Mountains'],
    bestTime: 'Apr - Oct',
    duration: '7-14 days'
  },
  {
    id: 6,
    city: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=250&fit=crop',
    price: 'From $799',
    rating: 4.7,
    description: 'Luxury and innovation in the heart of the Arabian desert.',
    highlights: ['Burj Khalifa', 'Dubai Mall', 'Desert Safari', 'Palm Jumeirah'],
    bestTime: 'Nov - Mar',
    duration: '4-7 days'
  }
];

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredDestinations = destinations.filter(dest =>
    dest.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-sky-100/50 dark:from-primary/5 dark:to-slate-800/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
              Discover Amazing Destinations
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Explore breathtaking places around the world and create unforgettable memories
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-primary/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <Card 
                key={destination.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group animate-scale-in border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={destination.image}
                    alt={destination.city}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Favorite Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                    onClick={() => toggleFavorite(destination.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites.includes(destination.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                    />
                  </Button>

                  {/* Location Info */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{destination.city}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{destination.country}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {destination.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.slice(0, 3).map((highlight, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary" 
                          className="text-xs bg-primary/10 text-primary border-primary/20"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{destination.bestTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{destination.duration}</span>
                    </div>
                  </div>

                  {/* Price and Book Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary">{destination.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">per person</span>
                    </div>
                    <Button className="bg-gradient-to-r from-primary to-sky-600 hover:from-primary/90 hover:to-sky-600/90 group">
                      <Plane className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No destinations found</h3>
                <p className="text-muted-foreground">Try searching for a different city or country</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Destinations;
