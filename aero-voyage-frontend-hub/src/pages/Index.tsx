
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, ArrowRight, Star, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/home/HeroSection';
import FlightSearchForm from '@/components/home/FlightSearchForm';
import FeaturedDestinations from '@/components/home/FeaturedDestinations';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: Users, value: '10M+', label: 'Happy Travelers' },
    { icon: Plane, value: '500+', label: 'Airlines Partners' },
    { icon: Star, value: '4.9', label: 'Average Rating' },
    { icon: Shield, value: '100%', label: 'Secure Booking' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Flight Search */}
      <div className="container mx-auto px-4 py-12">
        <FlightSearchForm />
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-sky-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-16 bg-gradient-to-r from-primary/5 to-sky-100/50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join millions of travelers who trust SkyBook for their flight bookings. 
                Get exclusive deals and earn loyalty points with every trip.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-sky-600 hover:from-primary/90 hover:to-sky-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                  onClick={() => navigate('/register')}
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary/20 hover:bg-primary/5"
                  onClick={() => navigate('/flights')}
                >
                  Browse Flights
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Destinations */}
      <div className="container mx-auto px-4 py-16">
        <FeaturedDestinations />
      </div>

      {/* Testimonials Section */}
      <section className="py-16 bg-white/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gradient mb-4">What Our Travelers Say</h2>
            <p className="text-muted-foreground text-lg">Real experiences from real adventurers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Digital Nomad",
                content: "SkyBook made booking my round-the-world trip incredibly easy. The interface is intuitive and the deals are amazing!",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Business Traveler",
                content: "As someone who travels frequently for business, SkyBook's loyalty program and quick booking process are game-changers.",
                rating: 5
              },
              {
                name: "Emma Rodriguez",
                role: "Family Traveler",
                content: "Planning our family vacation was stress-free with SkyBook. Great customer service and transparent pricing.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="travel-card p-6 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-br from-primary to-sky-600 p-2 rounded-full">
                  <Plane className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">SkyBook</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for seamless flight bookings and unforgettable travel experiences.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/flights" className="hover:text-white transition-colors">Search Flights</a></li>
                <li><a href="/destinations" className="hover:text-white transition-colors">Destinations</a></li>
                <li><a href="/deals" className="hover:text-white transition-colors">Deals</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="/status" className="hover:text-white transition-colors">Flight Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SkyBook. All rights reserved. Made with ❤️ for travelers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
