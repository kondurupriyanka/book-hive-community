
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard, { BookProps } from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PenSquare, Book, Plus, BookOpen, TrendingUp, Users, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';

// Sample books owned by the user
const myBooks: BookProps[] = [
  {
    id: '1',
    title: 'The White Tiger',
    author: 'Aravind Adiga',
    genre: 'Fiction',
    location: 'Mumbai',
    owner: 'Priya Sharma',
    ownerEmail: 'priya.sharma@example.com',
    ownerPhone: '+91 98765 43210',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1626618012641-bfbca5a31239?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'The God of Small Things',
    author: 'Arundhati Roy',
    genre: 'Literary Fiction',
    location: 'Kerala',
    owner: 'Arjun Nair',
    ownerEmail: 'arjun.nair@example.com',
    ownerPhone: '+91 87654 32109',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1542086260-ddb62f405816?q=80&w=500&auto=format&fit=crop'
  }
];

// Sample stats for the dashboard
const stats = [
  { title: 'Books Listed', value: 12, icon: BookOpen, color: 'bg-purple-500' },
  { title: 'Active Loans', value: 3, icon: Bookmark, color: 'bg-indigo-500' },
  { title: 'Total Views', value: 87, icon: TrendingUp, color: 'bg-pink-500' },
  { title: 'Interested Seekers', value: 5, icon: Users, color: 'bg-blue-500' },
];

// Sample recent activities
const recentActivities = [
  { action: 'New request for "The White Tiger"', user: 'Rajiv Kumar', time: '2 hours ago' },
  { action: 'Book returned: "The God of Small Things"', user: 'Meera Patel', time: '1 day ago' },
  { action: 'New message about "Midnight\'s Children"', user: 'Ananya Singh', time: '2 days ago' },
];

const OwnerDashboard: React.FC = () => {
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
              Welcome, {userName || 'Book Owner'}!
            </h1>
            <p className="text-gray-600">
              Manage your book collection and connect with book seekers.
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
              <Tabs defaultValue="my-books" className="w-full">
                <TabsList className="mb-6 bg-white shadow-sm w-full justify-start">
                  <TabsTrigger value="my-books" className="flex items-center">
                    <Book className="h-4 w-4 mr-2" />
                    My Books
                  </TabsTrigger>
                  <TabsTrigger value="rented" className="flex items-center">
                    <Book className="h-4 w-4 mr-2" />
                    Rented Out
                  </TabsTrigger>
                  <TabsTrigger value="requests" className="flex items-center">
                    <Book className="h-4 w-4 mr-2" />
                    Requests
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="my-books">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">My Books</h2>
                    <Link to="/add-book">
                      <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Book
                      </Button>
                    </Link>
                  </div>
                  
                  {myBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {myBooks.map(book => (
                        <BookCard key={book.id} {...book} />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center py-12">
                        <Book className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No books yet</h3>
                        <p className="text-gray-600 text-center mb-6">
                          You haven't added any books to your collection yet.
                        </p>
                        <Link to="/add-book">
                          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Your First Book
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="rented">
                  <Card>
                    <CardContent className="flex flex-col items-center py-12">
                      <Book className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No rented books</h3>
                      <p className="text-gray-600 text-center mb-6">
                        You haven't rented out any books yet.
                      </p>
                      <Link to="/browse">
                        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
                          Manage Your Books
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="requests">
                  <Card>
                    <CardContent className="flex flex-col items-center py-12">
                      <Book className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No requests</h3>
                      <p className="text-gray-600 text-center mb-6">
                        You don't have any book requests yet.
                      </p>
                      <Link to="/browse">
                        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
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
              {/* Recent Activities */}
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start">
                        <div className="h-2 w-2 mt-2 rounded-full bg-purple-500 mr-3"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <span>{activity.user}</span>
                            <span className="mx-1">•</span>
                            <span>{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-none shadow-md bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/add-book" className="block">
                    <Button variant="secondary" className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Book
                    </Button>
                  </Link>
                  <Link to="/profile" className="block">
                    <Button variant="secondary" className="w-full justify-start">
                      <PenSquare className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                  <Link to="/browse" className="block">
                    <Button variant="secondary" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Browse Books
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

export default OwnerDashboard;
