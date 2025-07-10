
import { Card, CardContent } from '@/components/ui/card';

const destinations = [
  {
    city: 'Douala',
    country: 'Cameroon',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
    price: 'From $299'
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop',
    price: 'From $899'
  },
  {
    city: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=250&fit=crop',
    price: 'From $399'
  },
  {
    city: 'London',
    country: 'UK',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop',
    price: 'From $499'
  }
];

const FeaturedDestinations = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Popular Destinations</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">Discover amazing places around the world</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <div className="relative">
              <img
                src={destination.image}
                alt={destination.city}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{destination.city}</h3>
                <p className="text-sm text-gray-200">{destination.country}</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">{destination.price}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Round trip</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDestinations;
