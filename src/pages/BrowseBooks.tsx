
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard, { BookProps } from '@/components/BookCard';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Expanded book data with real-world books
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

const BrowseBooks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Get unique genres, locations, and statuses
  const genres = [...new Set(allBooks.map(book => book.genre))];
  const locations = [...new Set(allBooks.map(book => book.location))];
  const statuses = [...new Set(allBooks.map(book => book.status))];

  useEffect(() => {
    // Set page as loaded after a small delay for animations
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredBooks = allBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === '' || selectedGenre === 'all_genres' || book.genre === selectedGenre;
    const matchesLocation = selectedLocation === '' || selectedLocation === 'all_locations' || book.location === selectedLocation;
    const matchesStatus = selectedStatus === '' || selectedStatus === 'all_statuses' || book.status === selectedStatus;
    
    return matchesSearch && matchesGenre && matchesLocation && matchesStatus;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50">
      <Navbar />
      <main className="flex-grow">
        <div className="py-8">
          <div className="container mx-auto px-4">
            <motion.h1 
              className="text-3xl font-bold text-indigo-800 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Browse Books
            </motion.h1>
            
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-indigo-400" />
                  <Input
                    placeholder="Search by title or author..."
                    className="pl-10 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 transition-all duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-indigo-300 text-indigo-700 hover:bg-indigo-100 transition-all duration-300"
                  onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
              
              {isFiltersVisible && (
                <motion.div 
                  className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-1">Genre</label>
                    <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                      <SelectTrigger className="border-indigo-200 focus:ring-indigo-400">
                        <SelectValue placeholder="All Genres" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_genres">All Genres</SelectItem>
                        {genres.map(genre => (
                          <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-1">Location</label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="border-indigo-200 focus:ring-indigo-400">
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_locations">All Locations</SelectItem>
                        {locations.map(location => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-1">Status</label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="border-indigo-200 focus:ring-indigo-400">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_statuses">All Statuses</SelectItem>
                        {statuses.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}
            </motion.div>
            
            {filteredBooks.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate={isPageLoaded ? "visible" : "hidden"}
              >
                {filteredBooks.map(book => (
                  <motion.div key={book.id} variants={itemVariants}>
                    <BookCard {...book} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-indigo-600">No books match your search criteria.</p>
                <Button 
                  variant="link" 
                  className="text-indigo-500 hover:text-indigo-700"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedGenre('');
                    setSelectedLocation('');
                    setSelectedStatus('');
                  }}
                >
                  Clear all filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BrowseBooks;
