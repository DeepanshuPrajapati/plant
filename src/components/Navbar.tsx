import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, MessageSquare, Upload, Info, LogIn, LogOut } from 'lucide-react';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-emerald-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8" />
            <span className="font-bold text-xl">AyurLeaf AI</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/upload" className="flex items-center space-x-1 hover:text-emerald-200">
              <Upload className="h-5 w-5" />
              <span>Upload</span>
            </Link>
            <Link to="/chatbot" className="flex items-center space-x-1 hover:text-emerald-200">
              <MessageSquare className="h-5 w-5" />
              <span>AI Chat</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-1 hover:text-emerald-200">
              <Info className="h-5 w-5" />
              <span>About</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-emerald-200">Welcome, {user}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500"
              >
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;