
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BookOpen, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords are the same.",
        variant: "destructive",
      });
      return;
    }
    
    if (!role) {
      toast({
        title: "Role selection required",
        description: "Please select whether you're a Book Owner or Book Seeker.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      login(email, password, role as 'owner' | 'seeker', name);
      
      toast({
        title: "Account created!",
        description: `Welcome to BookHive, ${name}!`,
      });
      
      // Redirect based on role
      navigate(role === 'owner' ? '/owner-dashboard' : '/seeker-dashboard');
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
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700">Create an account</CardTitle>
              <CardDescription className="text-center text-gray-600">
                Join our community of book lovers
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                
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
                  <Label htmlFor="mobile" className="text-gray-700">Mobile Number</Label>
                  <Input
                    id="mobile"
                    placeholder="(123) 456-7890"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-gray-700">I am a</Label>
                  <Select value={role} onValueChange={setRole} required>
                    <SelectTrigger id="role" className="border-purple-200 focus:ring-purple-400">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner" className="text-purple-700">Book Owner</SelectItem>
                      <SelectItem value="seeker" className="text-indigo-700">Book Seeker</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    {role === 'owner' 
                      ? "As a Book Owner, you can list your books for others to borrow or exchange." 
                      : role === 'seeker'
                      ? "As a Book Seeker, you can browse and request books from owners."
                      : "Select a role to continue"}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
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
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                      Creating account...
                    </div>
                  ) : (
                    "Create account"
                  )}
                </Button>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <span>Already have an account?</span>
                  <Link to="/login" className="text-purple-600 hover:text-purple-800 font-medium hover:underline">
                    Sign in
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

export default Signup;
