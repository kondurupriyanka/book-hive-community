
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { BookProps } from '@/components/BookCard';
import { Book, MapPin, User, Calendar, MessageCircle, ArrowLeft } from 'lucide-react';

// Sample book data (same as in BrowseBooks)
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
  }
];

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const book = allBooks.find(book => book.id === id);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <Link to="/browse" className="inline-flex items-center text-purple hover:underline mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Link>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Book Not Found</h1>
            <p className="text-gray-600 mb-6">The book you're looking for doesn't exist or has been removed.</p>
            <Link to="/browse">
              <Button>Browse Other Books</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const statusColors = {
    Available: 'bg-green-100 text-green-800',
    Rented: 'bg-yellow-100 text-yellow-800',
    Exchanged: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <Link to="/browse" className="inline-flex items-center text-purple hover:underline mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="rounded-xl overflow-hidden border border-gray-100 shadow-md">
                {book.coverUrl ? (
                  <img 
                    src={book.coverUrl} 
                    alt={`${book.title} cover`} 
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[3/4] bg-purple/10 flex items-center justify-center">
                    <Book className="h-16 w-16 text-purple-dark" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
                <Badge className={`${statusColors[book.status]}`}>
                  {book.status}
                </Badge>
              </div>
              
              <p className="text-xl text-gray-600 mb-6">by {book.author}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <User className="h-5 w-5 mr-2 text-purple" />
                  <span>Owner: {book.owner}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2 text-purple" />
                  <span>Location: {book.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2 text-purple" />
                  <span>Listed on: April 10, 2025</span>
                </div>
                <div>
                  <Badge variant="outline" className="text-sm">
                    {book.genre}
                  </Badge>
                </div>
              </div>
              
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">About this book</h2>
                <p className="text-gray-600">
                  This is a {book.status.toLowerCase()} book in the {book.genre} genre. 
                  The owner, {book.owner}, is located in {book.location} and is willing to exchange or rent this book.
                  Please use the contact button below to arrange the details of the exchange.
                </p>
              </Card>
              
              <Button className="w-full sm:w-auto bg-purple hover:bg-purple-dark">
                <MessageCircle className="h-5 w-5 mr-2" />
                Contact Owner
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDetail;
