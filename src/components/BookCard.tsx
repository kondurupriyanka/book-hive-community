
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export interface BookProps {
  id: string;
  title: string;
  author: string;
  genre: string;
  location: string;
  owner: string;
  status: 'Available' | 'Rented' | 'Exchanged';
  coverUrl?: string;
}

const BookCard: React.FC<BookProps> = ({ 
  id, 
  title, 
  author, 
  genre, 
  location, 
  owner, 
  status, 
  coverUrl 
}) => {
  const statusColors = {
    Available: 'bg-emerald-100 text-emerald-800',
    Rented: 'bg-amber-100 text-amber-800',
    Exchanged: 'bg-slate-100 text-slate-800'
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="book-card h-full flex flex-col overflow-hidden border border-indigo-100 shadow-md hover:shadow-lg transition-all duration-300">
        <div className="aspect-[3/4] relative overflow-hidden">
          {coverUrl ? (
            <img 
              src={coverUrl} 
              alt={`${title} cover`} 
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-indigo-100 flex items-center justify-center">
              <Book className="h-12 w-12 text-indigo-600" />
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge className={`${statusColors[status]} shadow-sm`}>
              {status}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4 flex-grow">
          <h3 className="text-lg font-semibold line-clamp-1 text-indigo-900">{title}</h3>
          <p className="text-indigo-600 text-sm mb-2">by {author}</p>
          
          <div className="flex items-center text-sm text-indigo-500 mt-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center text-sm text-indigo-500 mt-1">
            <User className="h-4 w-4 mr-1" />
            <span>{owner}</span>
          </div>
          
          <Badge variant="outline" className="mt-3 border-indigo-200 text-indigo-600">
            {genre}
          </Badge>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Link to={`/book/${id}`} className="w-full">
            <Button variant="outline" className="w-full text-indigo-600 border-indigo-300 hover:bg-indigo-600 hover:text-white transition-colors duration-300">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BookCard;
