import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BarChart2, MessageSquare, Settings, Home } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const { user, getUserFullName } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold text-purple-700">VoFAS Dashboard</h2>
          <p className="text-sm text-gray-500">Welcome, {getUserFullName()}</p>
        </div>
        <nav className="mt-4">
          <Link
            to="/dashboard"
            className={`flex items-center px-4 py-3 ${isActive('/dashboard')}`}
          >
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            to="/analytics"
            className={`flex items-center px-4 py-3 ${isActive('/analytics')}`}
          >
            <BarChart2 className="w-5 h-5 mr-3" />
            Analytics
          </Link>
          <Link
            to="/feedbacks"
            className={`flex items-center px-4 py-3 ${isActive('/feedbacks')}`}
          >
            <MessageSquare className="w-5 h-5 mr-3" />
            Feedbacks
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/settings"
              className={`flex items-center px-4 py-3 ${isActive('/settings')}`}
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Link>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 