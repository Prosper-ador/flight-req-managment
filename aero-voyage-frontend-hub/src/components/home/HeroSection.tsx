
import { Plane, Star, Shield, Clock } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Your Journey Begins Here
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover amazing destinations with our seamless flight booking experience
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center">
              <Star className="h-12 w-12 mb-4 text-yellow-400" />
              <h3 className="text-lg font-semibold mb-2">Premium Service</h3>
              <p className="text-blue-100">Award-winning customer service and support</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 mb-4 text-green-400" />
              <h3 className="text-lg font-semibold mb-2">Secure Booking</h3>
              <p className="text-blue-100">Your data is protected with enterprise-grade security</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-12 w-12 mb-4 text-orange-400" />
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-blue-100">Round-the-clock assistance whenever you need it</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 opacity-20">
        <Plane className="h-32 w-32 text-white transform rotate-45" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-20">
        <Plane className="h-24 w-24 text-white transform -rotate-45" />
      </div>
    </section>
  );
};

export default HeroSection;
