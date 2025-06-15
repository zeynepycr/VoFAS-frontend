import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/analytics" className="p-4 bg-blue-100 rounded shadow hover:bg-blue-200">
          <h2 className="font-bold">Analytics</h2>
          <p>View sentiment analysis</p>
        </Link>
        <Link to="/feedbacks" className="p-4 bg-green-100 rounded shadow hover:bg-green-200">
          <h2 className="font-bold">Feedbacks</h2>
          <p>View all feedbacks</p>
        </Link>
        {user?.role === 'admin' && (
          <Link to="/settings" className="p-4 bg-purple-100 rounded shadow hover:bg-purple-200">
            <h2 className="font-bold">Settings</h2>
            <p>Admin settings</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DashboardHome; 