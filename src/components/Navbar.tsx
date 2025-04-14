
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, User, LogIn, Menu, X, BookMarked, Sparkles } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative">
                <BookMarked className="h-7 w-7 text-purple-600" />
                <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-amber-400" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">BookHive</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors">
              <span>Home</span>
            </Link>
            <Link to="/browse" className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors">
              <span>Browse Books</span>
            </Link>
            <Link to="/profile" className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors">
              <span>My Profile</span>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="text-purple-600 border-purple-300 hover:bg-purple-600 hover:text-white">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} size="icon">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-5 w-5 text-purple-600" />
                <span>Home</span>
              </Link>
              <Link 
                to="/browse" 
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-5 w-5 text-purple-600" />
                <span>Browse Books</span>
              </Link>
              <Link 
                to="/profile" 
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5 text-purple-600" />
                <span>My Profile</span>
              </Link>
              <Link 
                to="/login" 
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="h-5 w-5 text-purple-600" />
                <span>Login</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
