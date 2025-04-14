
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, User, LogIn, Menu, X, BookMarked, 
  Sparkles, LogOut, Settings, PlusCircle, Heart, Home 
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isLoggedIn, userRole, userName, logout } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="border-b bg-gradient-to-r from-purple-900 to-indigo-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-full p-1 shadow-lg">
                  <BookMarked className="h-7 w-7 text-white" />
                  <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300" />
                </div>
              </div>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">BookHive</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="flex items-center gap-1 text-gray-200 hover:text-white transition-colors">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/browse" className="flex items-center gap-1 text-gray-200 hover:text-white transition-colors">
              <BookOpen className="h-4 w-4" />
              <span>Browse Books</span>
            </Link>

            {isLoggedIn ? (
              <>
                {userRole === 'owner' && (
                  <Link to="/add-book" className="flex items-center gap-1 text-gray-200 hover:text-white transition-colors">
                    <PlusCircle className="h-4 w-4" />
                    <span>Add Book</span>
                  </Link>
                )}
                <Link to="/profile" className="flex items-center gap-1 text-gray-200 hover:text-white transition-colors">
                  <User className="h-4 w-4" />
                  <span>{userName || 'My Profile'}</span>
                </Link>
                <Button 
                  variant="ghost" 
                  className="text-gray-200 hover:text-white hover:bg-purple-700"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="border-purple-400 hover:bg-purple-700 text-white">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} size="icon" className="text-white">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in bg-gradient-to-b from-purple-900 to-indigo-900 rounded-lg mt-2 shadow-xl">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 p-2 rounded hover:bg-purple-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5 text-purple-300" />
                <span>Home</span>
              </Link>
              <Link 
                to="/browse" 
                className="flex items-center gap-2 p-2 rounded hover:bg-purple-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-5 w-5 text-purple-300" />
                <span>Browse Books</span>
              </Link>

              {isLoggedIn ? (
                <>
                  {userRole === 'owner' && (
                    <Link 
                      to="/add-book" 
                      className="flex items-center gap-2 p-2 rounded hover:bg-purple-800 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <PlusCircle className="h-5 w-5 text-purple-300" />
                      <span>Add Book</span>
                    </Link>
                  )}
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-2 p-2 rounded hover:bg-purple-800 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 text-purple-300" />
                    <span>{userName || 'My Profile'}</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-2 rounded hover:bg-purple-800 transition-colors w-full text-left"
                  >
                    <LogOut className="h-5 w-5 text-purple-300" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center gap-2 p-2 rounded hover:bg-purple-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-5 w-5 text-purple-300" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
