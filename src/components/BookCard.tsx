
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, MapPin, User, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface BookProps {
  id: string;
  title: string;
  author: string;
  genre: string;
  location: string;
  owner: string;
  ownerEmail?: string;
  ownerPhone?: string;
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
  ownerEmail,
  ownerPhone,
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
      <Card className="book-card h-full flex flex-col overflow-hidden border border-purple-100 shadow-md hover:shadow-lg transition-all duration-300">
        <div className="aspect-[3/4] relative overflow-hidden">
          {coverUrl ? (
            <img 
              src={coverUrl} 
              alt={`${title} cover`} 
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-purple-100 flex items-center justify-center">
              <Book className="h-12 w-12 text-purple-600" />
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge className={`${statusColors[status]} shadow-sm`}>
              {status}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4 flex-grow">
          <h3 className="text-lg font-semibold line-clamp-1 text-purple-900">{title}</h3>
          <p className="text-purple-600 text-sm mb-2">by {author}</p>
          
          <div className="flex items-center text-sm text-purple-500 mt-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-sm text-purple-500 mt-1 cursor-pointer">
                  <User className="h-4 w-4 mr-1" />
                  <span>{owner}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-purple-50 border border-purple-200">
                <div className="p-2">
                  {ownerEmail && (
                    <div className="flex items-center text-sm text-purple-600 mb-1">
                      <Mail className="h-3 w-3 mr-1" />
                      <span>{ownerEmail}</span>
                    </div>
                  )}
                  {ownerPhone && (
                    <div className="flex items-center text-sm text-purple-600">
                      <Phone className="h-3 w-3 mr-1" />
                      <span>{ownerPhone}</span>
                    </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Badge variant="outline" className="mt-3 border-purple-200 text-purple-600">
            {genre}
          </Badge>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Link to={`/book/${id}`} className="w-full">
            <Button variant="outline" className="w-full text-purple-600 border-purple-300 hover:bg-purple-600 hover:text-white transition-colors duration-300">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BookCard;
