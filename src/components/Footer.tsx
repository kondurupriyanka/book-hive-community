import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-purple" />
              <span className="text-xl font-bold text-gray-800">BookHive</span>
            </div>
            <p className="text-gray-600 mb-4">
              Connecting book lovers through a community-based exchange platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-purple transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-purple transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/browse" className="text-gray-600 hover:text-purple transition-colors">Browse Books</Link>
              </li>
              <li>
                <Link to="/add-book" className="text-gray-600 hover:text-purple transition-colors">Add a Book</Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-purple transition-colors">My Profile</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-purple transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-purple transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-purple transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-purple transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
              />
              <button className="bg-purple hover:bg-purple-dark text-white px-4 py-2 rounded-r-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} BookHive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
