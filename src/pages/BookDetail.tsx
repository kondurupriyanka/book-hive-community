
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { BookProps } from '@/components/BookCard';
import { Book, MapPin, User, Calendar, MessageCircle, ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

// Sample book data (same as in BrowseBooks but expanded)
const allBooks: BookProps[] = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Classic',
    location: 'New York',
    owner: 'John Doe',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    location: 'Chicago',
    owner: 'Jane Smith',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    genre: 'Non-fiction',
    location: 'Seattle',
    owner: 'Michael Brown',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    location: 'Austin',
    owner: 'Sarah Johnson',
    status: 'Rented',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    location: 'Portland',
    owner: 'David Wilson',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '6',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    genre: 'Psychology',
    location: 'Boston',
    owner: 'Emily Chen',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '7',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Classic',
    location: 'San Francisco',
    owner: 'Robert Lee',
    status: 'Exchanged',
    coverUrl: 'https://images.unsplash.com/photo-1603162501929-794b8c99fdd8?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '8',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-help',
    location: 'Denver',
    owner: 'Lisa Thompson',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1594312915251-48db9280c8f1?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '9',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Science Fiction',
    location: 'Las Vegas',
    owner: 'Ryan Mitchell',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1610882647160-fe479c8a5b26?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '10',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    genre: 'Young Adult',
    location: 'Miami',
    owner: 'Sophia Garcia',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1633477189729-9290b3261d0a?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '11',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'Fiction',
    location: 'Nashville',
    owner: 'Tyler Johnson',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '12',
    title: 'Educated',
    author: 'Tara Westover',
    genre: 'Memoir',
    location: 'Salt Lake City',
    owner: 'Emma Wilson',
    status: 'Rented',
    coverUrl: 'https://images.unsplash.com/photo-1605116364576-2933f34d4da1?q=80&w=500&auto=format&fit=crop'
  }
];

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const book = allBooks.find(book => book.id === id);
  const [isLoaded, setIsLoaded] = useState(false);

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
          <Link to="/browse" className="inline-flex items-center text-indigo-600 hover:underline mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Link>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Book Not Found</h1>
            <p className="text-gray-600 mb-6">The book you're looking for doesn't exist or has been removed.</p>
            <Link to="/browse">
              <Button className="bg-indigo-600 hover:bg-indigo-700">Browse Other Books</Button>
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/browse" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 hover:underline mb-6 transition-colors duration-300">
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
              <div className="rounded-xl overflow-hidden border border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300">
                {book.coverUrl ? (
                  <img 
                    src={book.coverUrl} 
                    alt={`${book.title} cover`} 
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[3/4] bg-indigo-100 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-indigo-600" />
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
                <h1 className="text-3xl font-bold text-indigo-900">{book.title}</h1>
                <Badge className={`${statusColors[book.status]}`}>
                  {book.status}
                </Badge>
              </div>
              
              <p className="text-xl text-indigo-700 mb-6">by {book.author}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center text-indigo-600">
                  <User className="h-5 w-5 mr-2 text-indigo-500" />
                  <span>Owner: {book.owner}</span>
                </div>
                <div className="flex items-center text-indigo-600">
                  <MapPin className="h-5 w-5 mr-2 text-indigo-500" />
                  <span>Location: {book.location}</span>
                </div>
                <div className="flex items-center text-indigo-600">
                  <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
                  <span>Listed on: April 14, 2025</span>
                </div>
                <div className="flex items-center text-indigo-600">
                  <Clock className="h-5 w-5 mr-2 text-indigo-500" />
                  <span>Available for: Exchange, Rental</span>
                </div>
                <div className="sm:col-span-2">
                  <Badge variant="outline" className="text-sm border-indigo-200 text-indigo-700">
                    {book.genre}
                  </Badge>
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="p-6 mb-6 border-indigo-100 shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-indigo-800">About this book</h2>
                  <p className="text-indigo-600">
                    This {book.genre.toLowerCase()} book "{book.title}" by {book.author} is currently {book.status.toLowerCase()}. 
                    The owner, {book.owner}, is located in {book.location} and is willing to exchange or rent this book.
                    Please use the contact button below to arrange the details of the exchange.
                  </p>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 transition-all duration-300">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Owner
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
