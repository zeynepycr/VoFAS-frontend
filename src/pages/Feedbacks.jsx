import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const [filter, setFilter] = useState({
    sentiment: 'ALL',
    method: 'ALL',
    type: 'ALL',
    status: 'ALL'
  });

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost:8081/vofas/api/v1/feedback', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch feedbacks');
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [token]);

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'POSITIVE':
        return 'bg-green-100 text-green-800';
      case 'NEGATIVE':
        return 'bg-red-100 text-red-800';
      case 'NEUTRAL':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-blue-100 text-blue-800';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    return (
      (filter.sentiment === 'ALL' || feedback.sentiment === filter.sentiment) &&
      (filter.method === 'ALL' || feedback.methodEnum === filter.method) &&
      (filter.type === 'ALL' || feedback.typeEnum === filter.type) &&
      (filter.status === 'ALL' || feedback.feedbackStatus === filter.status)
    );
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Feedbacks</h1>
        <div className="flex gap-4">
          <select
            className="p-2 border rounded"
            value={filter.sentiment}
            onChange={(e) => setFilter({ ...filter, sentiment: e.target.value })}
          >
            <option value="ALL">All Sentiments</option>
            <option value="POSITIVE">Positive</option>
            <option value="NEGATIVE">Negative</option>
            <option value="NEUTRAL">Neutral</option>
          </select>
          <select
            className="p-2 border rounded"
            value={filter.method}
            onChange={(e) => setFilter({ ...filter, method: e.target.value })}
          >
            <option value="ALL">All Methods</option>
            <option value="DYNAMIC_QR">Dynamic QR</option>
            <option value="KIOSK">Kiosk</option>
            <option value="STATIC_QR">Static QR</option>
            <option value="WEBSITE">Website</option>
          </select>
          <select
            className="p-2 border rounded"
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          >
            <option value="ALL">All Types</option>
            <option value="TEXT">Text</option>
            <option value="VOICE">Voice</option>
          </select>
          <select
            className="p-2 border rounded"
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="ALL">All Status</option>
            <option value="READY">Ready</option>
            <option value="RECEIVED">Received</option>
            <option value="WAITING_SENTIMENT_ANALYSIS">Waiting Sentiment Analysis</option>
            <option value="WAITING_TRANSCRIPTION">Waiting Transcription</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Content</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sentiment</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Analysis Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFeedbacks.map((feedback) => (
              <tr key={feedback.feedbackId} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{feedback.feedbackId}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate" title={feedback.content}>{feedback.content}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{format(new Date(feedback.feedbackDate), 'PPpp')}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(feedback.feedbackStatus)}`}>
                    {feedback.feedbackStatus}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{feedback.methodEnum}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSentimentColor(feedback.sentiment)}`}>
                    {feedback.sentiment}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{feedback.typeEnum}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{feedback.feedbackSource?.name || '-'}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{feedback.receivedFromSentimentAnalysis ? format(new Date(feedback.receivedFromSentimentAnalysis), 'PPpp') : 'Not analyzed'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feedbacks; 