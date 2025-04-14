
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, BookOpen, User, LogIn, Menu, X } from 'lucide-react';

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
              <BookOpen className="h-6 w-6 text-purple" />
              <span className="text-xl font-bold text-gray-800">BookHive</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-purple transition-colors">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/browse" className="flex items-center gap-1 text-gray-600 hover:text-purple transition-colors">
              <BookOpen className="h-4 w-4" />
              <span>Browse Books</span>
            </Link>
            <Link to="/profile" className="flex items-center gap-1 text-gray-600 hover:text-purple transition-colors">
              <User className="h-4 w-4" />
              <span>My Profile</span>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="text-purple border-purple hover:bg-purple hover:text-white">
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
                <Home className="h-5 w-5 text-purple" />
                <span>Home</span>
              </Link>
              <Link 
                to="/browse" 
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-5 w-5 text-purple" />
                <span>Browse Books</span>
              </Link>
              <Link 
                to="/profile" 
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5 text-purple" />
                <span>My Profile</span>
              </Link>
              <Link 
                to="/login" 
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="h-5 w-5 text-purple" />
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
