
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, Eye, EyeOff, ArrowRight, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Password strength validation
  const passwordRequirements = [
    { test: (pwd: string) => pwd.length >= 8, text: "At least 8 characters" },
    { test: (pwd: string) => /[A-Z]/.test(pwd), text: "One uppercase letter" },
    { test: (pwd: string) => /[0-9]/.test(pwd), text: "One number" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords don't match. Please check and try again.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
      toast({
        title: "Welcome aboard! 🎉",
        description: "Your account has been created successfully. Let's start planning your journey!"
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong during registration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-travel-pattern"></div>
      
      {/* Floating elements */}
      <div className="absolute top-16 right-10 animate-float opacity-10">
        <Plane className="h-14 w-14 text-purple-500 transform rotate-45" />
      </div>
      <div className="absolute top-1/3 left-10 animate-float opacity-10" style={{ animationDelay: '1s' }}>
        <Plane className="h-18 w-18 text-pink-400 transform -rotate-12" />
      </div>
      <div className="absolute bottom-1/4 right-1/4 animate-float opacity-10" style={{ animationDelay: '2s' }}>
        <Plane className="h-12 w-12 text-violet-400 transform rotate-12" />
      </div>

      {/* Sparkle effects */}
      <div className="absolute top-1/5 left-1/4 animate-pulse">
        <Sparkles className="h-5 w-5 text-yellow-400 opacity-60" />
      </div>
      <div className="absolute bottom-1/2 right-1/3 animate-pulse" style={{ animationDelay: '1.5s' }}>
        <Sparkles className="h-6 w-6 text-pink-400 opacity-50" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-8">
        <div className="w-full max-w-md animate-slide-up">
          <Card className="glass border-white/20 shadow-2xl backdrop-blur-xl">
            <CardContent className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-full">
                      <Plane className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gradient mb-2">Join SkyBook</h1>
                <p className="text-muted-foreground text-lg">
                  Start your journey with us today 🚀
                </p>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground/80">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="h-11 bg-white/50 border-white/30 focus:border-purple-400/50 focus:bg-white/70 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground/80">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    className="h-11 bg-white/50 border-white/30 focus:border-purple-400/50 focus:bg-white/70 transition-all duration-300"
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
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Create a strong password"
                      className="h-11 bg-white/50 border-white/30 focus:border-purple-400/50 focus:bg-white/70 transition-all duration-300 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  
                  {/* Password Requirements */}
                  {formData.password && (
                    <div className="mt-2 space-y-1">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs">
                          <Check className={`h-3 w-3 ${req.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                          <span className={req.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground/80">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm your password"
                      className="h-11 bg-white/50 border-white/30 focus:border-purple-400/50 focus:bg-white/70 transition-all duration-300 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  
                  {/* Password Match Indicator */}
                  {formData.confirmPassword && (
                    <div className="flex items-center space-x-2 text-xs mt-1">
                      <Check className={`h-3 w-3 ${formData.password === formData.confirmPassword ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={formData.password === formData.confirmPassword ? 'text-green-600' : 'text-gray-500'}>
                        Passwords match
                      </span>
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 group-hover:space-x-3 transition-all duration-300">
                      <span>Create Account</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card/80 text-muted-foreground">Already have an account?</span>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <Link 
                  to="/login" 
                  className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-500 font-medium transition-colors duration-300 group"
                >
                  <span>Sign in here</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Inspirational Quote */}
              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground italic">
                  "Every journey begins with a single step" ✨
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
