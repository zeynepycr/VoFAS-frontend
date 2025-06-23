import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, Row, Col, DatePicker, Spin, message, Select, Button } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Analytics = () => {
  const { token, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [filters, setFilters] = useState({
    dateRange: [dayjs().subtract(30, 'days'), dayjs()],
    intervalDays: 7
  });

  // Format date to match backend pattern (dd-MM-yyyy)
  const formatDateForBackend = (date) => {
    return date.format('DD-MM-YYYY');
  };

  // Fetch analytics data from API
  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const [startDate, endDate] = filters.dateRange;

      const response = await fetch(
          `/vofas/api/v1/analytics?` +
          `start-date=${formatDateForBackend(startDate)}&` +
          `end-date=${formatDateForBackend(endDate)}&` +
          `interval-days=${filters.intervalDays}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
      );

      if (response.status === 401) {
        logout();
        message.error('Session expired. Please login again.');
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      if (!responseData.content) {
        throw new Error('No data received from server');
      }

      setAnalyticsData(responseData.content);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      message.error(error.message || 'Error fetching analytics data');
    } finally {
      setLoading(false);
    }
  }, [filters, token, logout]);

  // Prepare chart data from API response
  const prepareChartData = useCallback(() => {
    if (!analyticsData) return {};

    // Sentiment distribution data
    const sentimentData = [
      { name: 'Positive', value: analyticsData.positiveCount || 0, color: '#4CAF50' },
      { name: 'Negative', value: analyticsData.negativeCount || 0, color: '#F44336' },
      { name: 'Neutral', value: analyticsData.neutralCount || 0, color: '#FFC107' }
    ];

    // Method distribution data
    const methodData = Object.entries(analyticsData.methodDistribution || {}).map(([name, value]) => ({
      name: name.replace('_', ' '), // Convert WEBSITE to "WEBSITE" etc.
      value,
      color: getMethodColor(name)
    }));

    // Time series data (convert date strings to formatted dates)
    const timeSeriesData = (analyticsData.timeSeriesStatistics || []).map(item => ({
      ...item,
      date: dayjs(item.date).format('DD-MM-YYYY') // Format date for display
    }));

    return { sentimentData, methodData, timeSeriesData };
  }, [analyticsData]);

  // Get color for method type
  const getMethodColor = (method) => {
    const colors = {
      WEBSITE: '#4285F4',
      KIOSK: '#EA4335',
      STATIC_QR: '#FBBC05',
      DYNAMIC_QR: '#34A853'
    };
    return colors[method] || '#9E9E9E';
  };

  // Handle date range change
  const handleDateChange = (dates) => {
    if (dates && dates[0] && dates[1]) {
      setFilters({ ...filters, dateRange: dates });
    }
  };

  // Handle interval change
  const handleIntervalChange = (value) => {
    setFilters({ ...filters, intervalDays: value });
  };

  // Fetch data when filters change
  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const { sentimentData = [], methodData = [], timeSeriesData = [] } = prepareChartData();

  return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

        <Row gutter={[16, 16]}>
          {/* Filters Section */}
          <Col span={24}>
            <Card title="Filters">
              <Row gutter={16} align="middle">
                <Col>
                  <RangePicker
                      value={filters.dateRange}
                      onChange={handleDateChange}
                      disabledDate={current => current && current > dayjs().endOf('day')}
                  />
                </Col>
                <Col>
                  <Select
                      value={filters.intervalDays}
                      onChange={handleIntervalChange}
                      style={{ width: 120 }}
                  >
                    <Option value={1}>Daily</Option>
                    <Option value={7}>Weekly</Option>
                    <Option value={30}>Monthly</Option>
                  </Select>
                </Col>
                <Col>
                  <Button
                      type="primary"
                      onClick={fetchAnalytics}
                      loading={loading}
                  >
                    Refresh Data
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Stats Cards */}
          <Row gutter={[16, 16]} style={{ width: '100%' }}>
            <Col xs={24} sm={12} md={8}>
              <Card className="text-center">
                <h3>Total Feedback</h3>
                <p className="text-2xl font-bold">
                  {analyticsData?.totalCount || 0}
                </p>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card className="text-center" style={{ color: '#4CAF50' }}>
                <h3>Positive</h3>
                <p className="text-2xl font-bold">
                  {analyticsData?.positiveCount || 0}
                </p>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card className="text-center" style={{ color: '#F44336' }}>
                <h3>Negative</h3>
                <p className="text-2xl font-bold">
                  {analyticsData?.negativeCount || 0}
                </p>
              </Card>
            </Col>
          </Row>

          {/* Charts */}
          <Col xs={24} md={12}>
            <Card title="Sentiment Distribution">
              <Spin spinning={loading}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Spin>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title="Feedback Methods">
              <Spin spinning={loading}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={methodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8">
                      {methodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Spin>
            </Card>
          </Col>

          <Col span={24}>
            <Card title="Feedback Trends Over Time">
              <Spin spinning={loading}>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="positive"
                        stroke="#4CAF50"
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="negative"
                        stroke="#F44336"
                    />
                    <Line
                        type="monotone"
                        dataKey="neutral"
                        stroke="#FFC107"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Spin>
            </Card>
          </Col>
        </Row>
      </div>
  );
};

export default Analytics;