
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-purple-light/30 to-white pt-12 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              Discover, Share, and Connect Through Books
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Join our community of book lovers to exchange, borrow, or give away books. Connect with fellow readers and expand your library without spending a penny.
            </p>
            <div className="flex gap-4">
              <Link to="/browse">
                <Button className="bg-purple hover:bg-purple-dark">
                  Browse Books
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" className="border-purple text-purple hover:bg-purple hover:text-white">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-64 h-64 bg-purple/10 rounded-lg transform rotate-6"></div>
              <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-purple/20 rounded-lg transform -rotate-6"></div>
              <div className="relative bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                <div className="flex justify-center mb-4 text-purple">
                  <BookOpen className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">How it works</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-purple/20 text-purple font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">1</span>
                    <span>Create your profile as a book owner or seeker</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple/20 text-purple font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">2</span>
                    <span>List your books or browse available listings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple/20 text-purple font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">3</span>
                    <span>Connect with other users and arrange exchanges</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple/20 text-purple font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">4</span>
                    <span>Share your experience and build the community</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
