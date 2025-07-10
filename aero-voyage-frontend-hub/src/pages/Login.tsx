
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(credentials.email, credentials.password);
      toast({
        title: "Welcome back! ✈️",
        description: "You've successfully signed in. Ready for your next adventure?"
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-travel-pattern"></div>
      
      {/* Floating planes animation */}
      <div className="absolute top-20 left-10 animate-float opacity-10">
        <Plane className="h-16 w-16 text-primary transform rotate-45" />
      </div>
      <div className="absolute top-40 right-20 animate-float opacity-10" style={{ animationDelay: '1s' }}>
        <Plane className="h-12 w-12 text-sky-500 transform -rotate-12" />
      </div>
      <div className="absolute bottom-20 left-1/4 animate-float opacity-10" style={{ animationDelay: '2s' }}>
        <Plane className="h-20 w-20 text-blue-400 transform rotate-12" />
      </div>

      {/* Sparkle effects */}
      <div className="absolute top-1/4 right-1/4 animate-pulse">
        <Sparkles className="h-6 w-6 text-yellow-400 opacity-60" />
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-pulse" style={{ animationDelay: '1.5s' }}>
        <Sparkles className="h-4 w-4 text-pink-400 opacity-50" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md animate-slide-up">
          <Card className="glass border-white/20 shadow-2xl backdrop-blur-xl">
            <CardContent className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 gradient-sky rounded-full blur-lg opacity-30 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-primary to-sky-600 p-4 rounded-full">
                      <Plane className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gradient mb-2">Welcome Back</h1>
                <p className="text-muted-foreground text-lg">
                  Ready for your next adventure? ✨
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground/80">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    className="h-12 bg-white/50 border-white/30 focus:border-primary/50 focus:bg-white/70 transition-all duration-300"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground/80">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter your password"
                      className="h-12 bg-white/50 border-white/30 focus:border-primary/50 focus:bg-white/70 transition-all duration-300 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-primary to-sky-600 hover:from-primary/90 hover:to-sky-600/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 group-hover:space-x-3 transition-all duration-300">
                      <span>Sign In</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card/80 text-muted-foreground">New to SkyBook?</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <Link 
                  to="/register" 
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium transition-colors duration-300 group"
                >
                  <span>Create your account</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Inspirational Quote */}
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground italic">
                  "Adventure awaits those who dare to explore" 🌍
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;