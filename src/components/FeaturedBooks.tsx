
import React, { useState } from 'react';
import BookCard, { BookProps } from './BookCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

// Sample book data with updated realistic images
const featuredBooks: BookProps[] = [
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
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=500&auto=format&fit=crop'
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
    coverUrl: 'https://images.unsplash.com/photo-1531928351158-2f736078e0a1?q=80&w=500&auto=format&fit=crop'
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
    coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=500&auto=format&fit=crop'
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
    coverUrl: 'https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?q=80&w=500&auto=format&fit=crop'
  }
];

const FeaturedBooks: React.FC = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (id: string) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(bookId => bookId !== id));
      toast({
        description: "Book removed from your wishlist",
        variant: "default",
      });
    } else {
      setWishlist([...wishlist, id]);
      toast({
        description: "Book added to your wishlist",
        variant: "default",
      });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <motion.h2 
            className="text-3xl font-bold text-purple-800"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Featured Books
          </motion.h2>
          <Link to="/browse">
            <Button variant="ghost" className="text-purple-700 hover:text-purple-900 hover:bg-purple-100/50">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredBooks.map(book => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <BookCard key={book.id} {...book} />
              <motion.button
                className="absolute top-3 right-3 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all duration-300"
                onClick={() => toggleWishlist(book.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart 
                  className={`h-5 w-5 ${wishlist.includes(book.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
