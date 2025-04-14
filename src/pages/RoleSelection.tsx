
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Search, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

const RoleSelection: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const { toast } = useToast();

  const handleRoleSelection = (role: 'owner' | 'seeker') => {
    // For demo purposes, create a user with the selected role
    const demoName = role === 'owner' ? 'Book Owner' : 'Book Seeker';
    login('demo@example.com', 'password', role, demoName);
    
    toast({
      title: 'Account created!',
      description: `Welcome to BookHive as a ${role === 'owner' ? 'Book Owner' : 'Book Seeker'}!`,
    });
    
    // Redirect to the appropriate dashboard
    navigate(role === 'owner' ? '/owner-dashboard' : '/seeker-dashboard');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 to-purple-100">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-700 mb-4">
              Choose Your Role
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              BookHive caters to both book owners and seekers. Choose the role that best describes how you want to use our platform.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Book Owner Card */}
            <motion.div variants={itemVariants}>
              <Card className="h-full border-0 shadow-xl overflow-hidden bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-24 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-white" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Book Owner</h2>
                    <p className="text-gray-600 mb-6">
                      Share your book collection with others in your community. List books, manage borrowing requests, and keep track of your inventory.
                    </p>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">List books from your collection</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">Manage borrow requests</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">Track book status and returns</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">Connect with book lovers</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleRoleSelection('owner')}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md group-hover:shadow-lg"
                    >
                      Join as Book Owner
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Book Seeker Card */}
            <motion.div variants={itemVariants}>
              <Card className="h-full border-0 shadow-xl overflow-hidden bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-24 flex items-center justify-center">
                    <Search className="h-12 w-12 text-white" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Book Seeker</h2>
                    <p className="text-gray-600 mb-6">
                      Find books to borrow or exchange in your neighborhood. Discover new reads, save favorites, and connect with book owners.
                    </p>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">Browse available books nearby</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">Request to borrow books</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">Create a wishlist of favorites</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">Get personalized recommendations</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleRoleSelection('seeker')}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-md group-hover:shadow-lg"
                    >
                      Join as Book Seeker
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RoleSelection;
