
import React, { useState } from 'react';
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

// Sample book data
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
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '7',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Classic',
    location: 'San Francisco',
    owner: 'Robert Lee',
    status: 'Exchanged',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=500&auto=format&fit=crop'
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
  }
];

const BrowseBooks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  // Get unique genres, locations, and statuses
  const genres = [...new Set(allBooks.map(book => book.genre))];
  const locations = [...new Set(allBooks.map(book => book.location))];
  const statuses = [...new Set(allBooks.map(book => book.status))];

  const filteredBooks = allBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === '' || book.genre === selectedGenre;
    const matchesLocation = selectedLocation === '' || book.location === selectedLocation;
    const matchesStatus = selectedStatus === '' || book.status === selectedStatus;
    
    return matchesSearch && matchesGenre && matchesLocation && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Browse Books</h1>
            
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by title or author..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
              
              {isFiltersVisible && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                    <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                      <SelectTrigger>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger>
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
                </div>
              )}
            </div>
            
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} {...book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No books match your search criteria.</p>
                <Button 
                  variant="link" 
                  className="text-purple"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedGenre('');
                    setSelectedLocation('');
                    setSelectedStatus('');
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BrowseBooks;
