
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'bot' | 'user' }[]>([
    { text: "Hi there! I'm BookHive Assistant. How can I help you today?", sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const API_KEY = "AIzaSyCKD9aCLovJ4E3Lei6Z6pqXEWjz6gdBKRU";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a helpful assistant for a book sharing platform called BookHive. Answer the following question briefly and helpfully about books, book sharing, or how to use the platform: ${userMessage}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const botResponse = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      } else {
        throw new Error('Invalid response from Gemini API');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      toast({
        title: "Error",
        description: "Sorry, I couldn't process your request right now.",
        variant: "destructive",
      });
      setMessages(prev => [
        ...prev,
        { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'bot' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 shadow-2xl"
          >
            <Card className="border-2 border-purple-400">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <span className="font-medium">BookHive Assistant</span>
                </div>
                <Button variant="ghost" size="icon" onClick={toggleChatbot} className="text-white hover:bg-purple-700">
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-3 max-h-96 overflow-y-auto bg-gradient-to-b from-purple-50 to-white">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-purple-600 text-white rounded-tr-none'
                            : 'bg-white border border-purple-200 rounded-tl-none shadow-sm'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {message.sender === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4 text-purple-600" />
                          )}
                          <span className="text-xs font-medium">
                            {message.sender === 'user' ? 'You' : 'BookHive Assistant'}
                          </span>
                        </div>
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] p-3 rounded-lg bg-white border border-purple-200 rounded-tl-none">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-purple-600" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="p-3 bg-gray-50 border-t">
                <div className="flex w-full gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="border-purple-200 focus:border-purple-500"
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={isLoading} 
                    size="icon"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 z-50 rounded-full h-14 w-14 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg"
        size="icon"
      >
        <MessageCircle className={`h-6 w-6 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </Button>
    </>
  );
};

export default Chatbot;
