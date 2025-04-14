
import React from 'react';
import { BookOpen, UserPlus, MessageSquare, RefreshCw } from 'lucide-react';

const steps = [
  {
    title: 'List Your Books',
    description: 'Add your books to the platform with details like title, author, and your location.',
    icon: BookOpen,
    color: 'bg-purple/10 text-purple'
  },
  {
    title: 'Create Your Profile',
    description: 'Set up your profile as a book owner or seeker to connect with others.',
    icon: UserPlus,
    color: 'bg-purple-dark/10 text-purple-dark'
  },
  {
    title: 'Connect With Others',
    description: 'Message other users to arrange book exchanges or borrowing.',
    icon: MessageSquare,
    color: 'bg-purple/10 text-purple'
  },
  {
    title: 'Exchange Books',
    description: 'Meet up and exchange books, then mark the transaction as complete.',
    icon: RefreshCw,
    color: 'bg-purple-dark/10 text-purple-dark'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How BookHive Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to share and exchange books with fellow readers in your community. Follow these simple steps to get started.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`${step.color} p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4`}>
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
