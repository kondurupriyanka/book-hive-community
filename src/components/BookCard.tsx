
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
    Available: 'bg-green-100 text-green-800',
    Rented: 'bg-yellow-100 text-yellow-800',
    Exchanged: 'bg-gray-100 text-gray-800'
  };

  return (
    <Card className="book-card h-full flex flex-col">
      <div className="aspect-[3/4] relative overflow-hidden">
        {coverUrl ? (
          <img 
            src={coverUrl} 
            alt={`${title} cover`} 
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-purple/10 flex items-center justify-center">
            <Book className="h-12 w-12 text-purple-dark" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge className={`${statusColors[status]}`}>
            {status}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4 flex-grow">
        <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">by {author}</p>
        
        <div className="flex items-center text-sm text-gray-500 mt-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <User className="h-4 w-4 mr-1" />
          <span>{owner}</span>
        </div>
        
        <Badge variant="outline" className="mt-3">
          {genre}
        </Badge>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link to={`/book/${id}`} className="w-full">
          <Button variant="outline" className="w-full text-purple hover:bg-purple hover:text-white">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
