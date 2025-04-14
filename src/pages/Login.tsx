
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookOpen, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // In a real app, this would validate credentials against the backend
      if (email && password) {
        // For demo purposes, determine role based on email
        // In a real app, this would come from the backend
        const role = email.includes('owner') ? 'owner' : 'seeker';
        const name = email.split('@')[0];
        
        login(email, password, role, name);
        
        toast({
          title: "Login successful!",
          description: `Welcome back, ${name}!`,
        });
        
        // Redirect based on role
        navigate(role === 'owner' ? '/owner-dashboard' : '/seeker-dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 to-purple-100">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-md">
                <LogIn className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700">Welcome back</CardTitle>
              <CardDescription className="text-center text-gray-600">
                Enter your credentials to sign in to your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-700">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-800 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </Button>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <span>Don't have an account?</span>
                  <Link to="/signup" className="text-purple-600 hover:text-purple-800 font-medium hover:underline">
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
