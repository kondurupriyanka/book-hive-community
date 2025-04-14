
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard, { BookProps } from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { PenSquare, Book, Plus, MapPin, Mail, Phone, Calendar } from 'lucide-react';

// Sample user data
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '(123) 456-7890',
  location: 'New York',
  joined: 'March 2025',
  role: 'Book Owner',
  avatar: ''
};

// Sample books owned by the user
const myBooks: BookProps[] = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Classic',
    location: 'New York',
    owner: 'John Doe',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    location: 'New York',
    owner: 'John Doe',
    status: 'Rented',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=500&auto=format&fit=crop'
  }
];

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-8">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="w-24 h-24 mb-4">
                    {user.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : (
                      <AvatarFallback className="bg-purple/20 text-purple-dark text-2xl">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                  <p className="text-gray-600">{user.role}</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3 text-purple" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-3 text-purple" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-3 text-purple" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3 text-purple" />
                    <span>Joined {user.joined}</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <PenSquare className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Tabs defaultValue="my-books">
                <TabsList className="mb-6 bg-white">
                  <TabsTrigger value="my-books" className="flex items-center">
                    <Book className="h-4 w-4 mr-2" />
                    My Books
                  </TabsTrigger>
                  <TabsTrigger value="borrowed" className="flex items-center">
                    <Book className="h-4 w-4 mr-2" />
                    Borrowed Books
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex items-center">
                    <Book className="h-4 w-4 mr-2" />
                    Exchange History
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="my-books">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">My Books</h2>
                    <Link to="/add-book">
                      <Button className="bg-purple hover:bg-purple-dark">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Book
                      </Button>
                    </Link>
                  </div>
                  
                  {myBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {myBooks.map(book => (
                        <BookCard key={book.id} {...book} />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center py-12">
                        <Book className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No books yet</h3>
                        <p className="text-gray-600 text-center mb-6">
                          You haven't added any books to your collection yet.
                        </p>
                        <Link to="/add-book">
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Your First Book
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="borrowed">
                  <Card>
                    <CardContent className="flex flex-col items-center py-12">
                      <Book className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No borrowed books</h3>
                      <p className="text-gray-600 text-center mb-6">
                        You haven't borrowed any books yet.
                      </p>
                      <Link to="/browse">
                        <Button>
                          Browse Books
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="history">
                  <Card>
                    <CardContent className="flex flex-col items-center py-12">
                      <Book className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No exchange history</h3>
                      <p className="text-gray-600 text-center mb-6">
                        You haven't exchanged any books yet.
                      </p>
                      <Link to="/browse">
                        <Button>
                          Find Books to Exchange
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
