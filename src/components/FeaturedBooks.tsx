
import React from 'react';
import BookCard, { BookProps } from './BookCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Sample book data
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
  }
];

const FeaturedBooks: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-purple-800">Featured Books</h2>
          <Link to="/browse">
            <Button variant="ghost" className="text-purple hover:text-purple-dark hover:bg-purple/10">
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
            >
              <BookCard key={book.id} {...book} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
