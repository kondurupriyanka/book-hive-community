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

const BrowseBooks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const genres = [...new Set(allBooks.map(book => book.genre))];
  const locations = [...new Set(allBooks.map(book => book.location))];
  const statuses = [...new Set(allBooks.map(book => book.status))];

  useEffect(() => {
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-pink-50">
      <Navbar />
      <main className="flex-grow">
        <div className="py-8">
          <div className="container mx-auto px-4">
            <motion.h1 
              className="text-3xl font-bold text-purple-800 mb-6"
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
                  <Search className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                  <Input
                    placeholder="Search by title or author..."
                    className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400 transition-all duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-purple-300 text-purple-700 hover:bg-purple-100 transition-all duration-300"
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
                    <label className="block text-sm font-medium text-purple-700 mb-1">Genre</label>
                    <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                      <SelectTrigger className="border-purple-200 focus:ring-purple-400">
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
                    <label className="block text-sm font-medium text-purple-700 mb-1">Location</label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="border-purple-200 focus:ring-purple-400">
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
                    <label className="block text-sm font-medium text-purple-700 mb-1">Status</label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="border-purple-200 focus:ring-purple-400">
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
                <p className="text-purple-600">No books match your search criteria.</p>
                <Button 
                  variant="link" 
                  className="text-purple-500 hover:text-purple-700"
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
