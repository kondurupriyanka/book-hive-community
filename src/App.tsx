
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import BrowseBooks from "./pages/BrowseBooks";
import BookDetail from "./pages/BookDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AddBook from "./pages/AddBook";
import NotFound from "./pages/NotFound";
import OwnerDashboard from "./pages/OwnerDashboard";
import SeekerDashboard from "./pages/SeekerDashboard";
import RoleSelection from "./pages/RoleSelection";
import Chatbot from "./components/Chatbot";
import { UserProvider, useUser } from "./contexts/UserContext";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole?: 'owner' | 'seeker' }) => {
  const { isLoggedIn, userRole } = useUser();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={userRole === 'owner' ? '/owner-dashboard' : '/seeker-dashboard'} replace />;
  }
  
  return children;
};

// Route components wrapper with UserProvider
const AppRoutes = () => {
  const { isLoggedIn, userRole } = useUser();
  
  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? 
        <Navigate to={userRole === 'owner' ? '/owner-dashboard' : '/seeker-dashboard'} replace /> : 
        <Index />} 
      />
      <Route path="/role-selection" element={<RoleSelection />} />
      <Route path="/browse" element={<BrowseBooks />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/add-book" 
        element={
          <ProtectedRoute requiredRole="owner">
            <AddBook />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/owner-dashboard" 
        element={
          <ProtectedRoute requiredRole="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/seeker-dashboard" 
        element={
          <ProtectedRoute requiredRole="seeker">
            <SeekerDashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
          <Chatbot />
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
