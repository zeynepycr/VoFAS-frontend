import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    positive: 0,
    negative: 0,
    neutral: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('http://localhost:8080/vofas/api/v1/feedback/analytics', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }
        const data = await response.json();
        setAnalytics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 rounded shadow">
          <h2 className="font-bold">Positive</h2>
          <p>{analytics.positive}%</p>
        </div>
        <div className="p-4 bg-red-100 rounded shadow">
          <h2 className="font-bold">Negative</h2>
          <p>{analytics.negative}%</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <h2 className="font-bold">Neutral</h2>
          <p>{analytics.neutral}%</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 