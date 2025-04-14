
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard, { BookProps } from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Heart, BookOpen, BookMarked, MessageCircle, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';

// Sample books for wishlist
const wishlistBooks: BookProps[] = [
  {
    id: '3',
    title: 'Train to Pakistan',
    author: 'Khushwant Singh',
    genre: 'Historical Fiction',
    location: 'Delhi',
    owner: 'Vikram Malhotra',
    ownerEmail: 'vikram.malhotra@example.com',
    ownerPhone: '+91 76543 21098',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1598618589929-b1433d05cdf3?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'The Namesake',
    author: 'Jhumpa Lahiri',
    genre: 'Contemporary Fiction',
    location: 'Kolkata',
    owner: 'Rahul Banerjee',
    ownerEmail: 'rahul.banerjee@example.com',
    ownerPhone: '+91 54321 09876',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1588497859490-85d1c17db96d?q=80&w=500&auto=format&fit=crop'
  }
];

// Sample stats for the dashboard
const stats = [
  { title: 'Books Borrowed', value: 3, icon: BookMarked, color: 'bg-purple-500' },
  { title: 'Wishlist Items', value: 8, icon: Heart, color: 'bg-pink-500' },
  { title: 'Messages Sent', value: 12, icon: MessageCircle, color: 'bg-indigo-500' },
  { title: 'Cities Explored', value: 4, icon: Map, color: 'bg-blue-500' },
];

// Sample recommended books based on user preferences
const recommendedBooks: BookProps[] = [
  {
    id: '6',
    title: 'A Suitable Boy',
    author: 'Vikram Seth',
    genre: 'Historical Fiction',
    location: 'Lucknow',
    owner: 'Aisha Khan',
    ownerEmail: 'aisha.khan@example.com',
    ownerPhone: '+91 43210 98765',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1510375915736-59960f55d71b?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '8',
    title: 'The Palace of Illusions',
    author: 'Chitra Banerjee Divakaruni',
    genre: 'Mythological Fiction',
    location: 'Chennai',
    owner: 'Divya Sundar',
    ownerEmail: 'divya.sundar@example.com',
    ownerPhone: '+91 21098 76543',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1488841714725-bb4c32d1ac94?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '9',
    title: 'The Interpreter of Maladies',
    author: 'Jhumpa Lahiri',
    genre: 'Short Stories',
    location: 'Hyderabad',
    owner: 'Kiran Rao',
    ownerEmail: 'kiran.rao@example.com',
    ownerPhone: '+91 10987 65432',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=500&auto=format&fit=crop'
  },
];

const SeekerDashboard: React.FC = () => {
  const { userName } = useUser();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50">
      <Navbar />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-700 mb-2">
              Welcome, {userName || 'Book Seeker'}!
            </h1>
            <p className="text-gray-600">
              Discover new books and connect with book owners in your area.
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {stats.map((stat, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="flex items-center p-6">
                  <div className={`rounded-full p-3 mr-4 ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Tabs defaultValue="wishlist" className="w-full">
                <TabsList className="mb-6 bg-white shadow-sm w-full justify-start">
                  <TabsTrigger value="wishlist" className="flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    My Wishlist
                  </TabsTrigger>
                  <TabsTrigger value="borrowed" className="flex items-center">
                    <BookMarked className="h-4 w-4 mr-2" />
                    Borrowed Books
                  </TabsTrigger>
                  <TabsTrigger value="requests" className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    My Requests
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="wishlist">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">My Wishlist</h2>
                    <Link to="/browse">
                      <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md">
                        <Search className="h-4 w-4 mr-2" />
                        Find More Books
                      </Button>
                    </Link>
                  </div>
                  
                  {wishlistBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {wishlistBooks.map(book => (
                        <BookCard key={book.id} {...book} />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center py-12">
                        <Heart className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                        <p className="text-gray-600 text-center mb-6">
                          You haven't added any books to your wishlist yet.
                        </p>
                        <Link to="/browse">
                          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
                            <Search className="h-4 w-4 mr-2" />
                            Browse Books
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="borrowed">
                  <Card>
                    <CardContent className="flex flex-col items-center py-12">
                      <BookMarked className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No borrowed books</h3>
                      <p className="text-gray-600 text-center mb-6">
                        You haven't borrowed any books yet.
                      </p>
                      <Link to="/browse">
                        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
                          <Search className="h-4 w-4 mr-2" />
                          Find Books to Borrow
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="requests">
                  <Card>
                    <CardContent className="flex flex-col items-center py-12">
                      <MessageCircle className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No book requests</h3>
                      <p className="text-gray-600 text-center mb-6">
                        You haven't made any book requests yet.
                      </p>
                      <Link to="/browse">
                        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
                          <Search className="h-4 w-4 mr-2" />
                          Browse Books
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Sidebar */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Recommended Books */}
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Recommended for You</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendedBooks.map((book) => (
                      <Link to={`/book/${book.id}`} key={book.id} className="flex items-start group">
                        <div className="h-16 w-12 min-w-12 overflow-hidden rounded mr-3 bg-gray-100">
                          <img src={book.coverUrl} alt={book.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-purple-700 transition-colors">{book.title}</p>
                          <p className="text-xs text-gray-500">{book.author}</p>
                          <div className="flex items-center mt-1">
                            <Map className="h-3 w-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">{book.location}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Link to="/browse">
                      <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 text-sm">
                        View All Recommendations
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-none shadow-md bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/browse" className="block">
                    <Button variant="secondary" className="w-full justify-start">
                      <Search className="h-4 w-4 mr-2" />
                      Find New Books
                    </Button>
                  </Link>
                  <Link to="/profile" className="block">
                    <Button variant="secondary" className="w-full justify-start">
                      <Search className="h-4 w-4 mr-2" />
                      Update Preferences
                    </Button>
                  </Link>
                  <Link to="/browse" className="block">
                    <Button variant="secondary" className="w-full justify-start">
                      <Map className="h-4 w-4 mr-2" />
                      Explore Nearby
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SeekerDashboard;
