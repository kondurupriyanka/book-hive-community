import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { BookProps } from '@/components/BookCard';
import { Book, MapPin, User, Calendar, MessageCircle, ArrowLeft, Clock, BookOpen, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

// Sample book data (same as in BrowseBooks but expanded)
const allBooks: BookProps[] = [
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
  },
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
    id: '4',
    title: 'Midnight\'s Children',
    author: 'Salman Rushdie',
    genre: 'Magical Realism',
    location: 'Bangalore',
    owner: 'Sanjana Reddy',
    ownerEmail: 'sanjana.reddy@example.com',
    ownerPhone: '+91 65432 10987',
    status: 'Rented',
    coverUrl: 'https://images.unsplash.com/photo-1613330195097-8b5991f1a1f9?q=80&w=500&auto=format&fit=crop'
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
  },
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
    id: '7',
    title: 'The Immortals of Meluha',
    author: 'Amish Tripathi',
    genre: 'Mythology',
    location: 'Pune',
    owner: 'Aditya Desai',
    ownerEmail: 'aditya.desai@example.com',
    ownerPhone: '+91 32109 87654',
    status: 'Exchanged',
    coverUrl: 'https://images.unsplash.com/photo-1518744386442-2d48ac47a7eb?q=80&w=500&auto=format&fit=crop'
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
  {
    id: '10',
    title: 'Sacred Games',
    author: 'Vikram Chandra',
    genre: 'Crime Fiction',
    location: 'Mumbai',
    owner: 'Rohan Kapoor',
    ownerEmail: 'rohan.kapoor@example.com',
    ownerPhone: '+91 09876 54321',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1485601284679-a2f88bd4f0f3?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '11',
    title: 'The Guide',
    author: 'R.K. Narayan',
    genre: 'Classic',
    location: 'Mysore',
    owner: 'Meera Iyer',
    ownerEmail: 'meera.iyer@example.com',
    ownerPhone: '+91 98765 12345',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '12',
    title: 'The Shadow Lines',
    author: 'Amitav Ghosh',
    genre: 'Historical Fiction',
    location: 'Goa',
    owner: 'Neha D\'souza',
    ownerEmail: 'neha.dsouza@example.com',
    ownerPhone: '+91 87654 56789',
    status: 'Rented',
    coverUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=500&auto=format&fit=crop'
  }
];

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const book = allBooks.find(book => book.id === id);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <Link to="/browse" className="inline-flex items-center text-purple-600 hover:underline mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Link>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Book Not Found</h1>
            <p className="text-gray-600 mb-6">The book you're looking for doesn't exist or has been removed.</p>
            <Link to="/browse">
              <Button className="bg-purple-600 hover:bg-purple-700">Browse Other Books</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const statusColors = {
    Available: 'bg-emerald-100 text-emerald-800',
    Rented: 'bg-amber-100 text-amber-800',
    Exchanged: 'bg-slate-100 text-slate-800'
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-pink-50">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/browse" className="inline-flex items-center text-purple-600 hover:text-purple-800 hover:underline mb-6 transition-colors duration-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="md:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-xl overflow-hidden border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300">
                {book.coverUrl ? (
                  <img 
                    src={book.coverUrl} 
                    alt={`${book.title} cover`} 
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[3/4] bg-purple-100 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-purple-600" />
                  </div>
                )}
              </div>
            </motion.div>
            
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h1 className="text-3xl font-bold text-purple-900">{book.title}</h1>
                <Badge className={`${statusColors[book.status]}`}>
                  {book.status}
                </Badge>
              </div>
              
              <p className="text-xl text-purple-700 mb-6">by {book.author}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center text-purple-600">
                  <User className="h-5 w-5 mr-2 text-purple-500" />
                  <span>Owner: {book.owner}</span>
                </div>
                <div className="flex items-center text-purple-600">
                  <MapPin className="h-5 w-5 mr-2 text-purple-500" />
                  <span>Location: {book.location}</span>
                </div>
                <div className="flex items-center text-purple-600">
                  <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                  <span>Listed on: April 14, 2025</span>
                </div>
                <div className="flex items-center text-purple-600">
                  <Clock className="h-5 w-5 mr-2 text-purple-500" />
                  <span>Available for: Exchange, Rental</span>
                </div>
                <div className="sm:col-span-2">
                  <Badge variant="outline" className="text-sm border-purple-200 text-purple-700">
                    {book.genre}
                  </Badge>
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="p-6 mb-6 border-purple-100 shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-purple-800">About this book</h2>
                  <p className="text-purple-600">
                    This {book.genre.toLowerCase()} book "{book.title}" by {book.author} is currently {book.status.toLowerCase()}. 
                    The owner, {book.owner}, is located in {book.location} and is willing to exchange or rent this book.
                    Please use the contact button below to arrange the details of the exchange.
                  </p>
                </Card>
              </motion.div>

              {showContact && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <Card className="p-6 border-purple-100 bg-purple-50 shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-purple-800">Contact Information</h2>
                    <div className="space-y-3">
                      {book.ownerEmail && (
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 mr-3 text-purple-500" />
                          <a href={`mailto:${book.ownerEmail}`} className="text-purple-600 hover:text-purple-800 transition-colors">
                            {book.ownerEmail}
                          </a>
                        </div>
                      )}
                      {book.ownerPhone && (
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 mr-3 text-purple-500" />
                          <a href={`tel:${book.ownerPhone}`} className="text-purple-600 hover:text-purple-800 transition-colors">
                            {book.ownerPhone}
                          </a>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <Button 
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 transition-all duration-300"
                  onClick={() => setShowContact(!showContact)}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {showContact ? 'Hide Contact Info' : 'Contact Owner'}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDetail;
