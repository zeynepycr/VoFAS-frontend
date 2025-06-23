import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { Table, Card, DatePicker, Select, Button, message, Row, Col, Spin } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Feedbacks = () => {
  const { token, logout } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [filters, setFilters] = useState({
    dateRange: [dayjs().subtract(7, 'days'), dayjs()],
    feedbackStatuses: [],
    feedbackMethods: [],
    sentiments: [],
    types: []
  });

  // Backend status enum'larına çevirme fonksiyonu
  const mapToBackendStatus = (status) => {
    const statusMap = {
      'READY': 'READY',
      'RESOLVED': 'RESOLVED',
      'PENDING': 'PENDING'
    };
    return statusMap[status] || status;
  };

  const fetchFeedbacks = useCallback(async (pageNo = 0, _pageSize = 10) => {
    try {
      setLoading(true);
      const [startDate, endDate] = filters.dateRange || [];
  
      // Request body oluştur
      const requestBody = {
        startDate: startDate ? startDate.format('YYYY-MM-DD') : null, // Formatı değiştirdik
        endDate: endDate ? endDate.format('YYYY-MM-DD') : null,
        feedbackStatuses: filters.feedbackStatuses.length > 0 ? filters.feedbackStatuses : null,
        feedbackMethods: filters.feedbackMethods.length > 0 ? filters.feedbackMethods : null,
        sentiments: filters.sentiments.length > 0 ? filters.sentiments : null,
        types: filters.types.length > 0 ? filters.types : null
      };
  
      // Boş değerleri temizle
      const cleanedRequestBody = Object.fromEntries(
        Object.entries(requestBody).filter(([_, v]) => v !== null)
      );
  
      const queryParams = new URLSearchParams({
        'sort-by': 'feedbackDate',
        'ascending': 'false',
        'page-no': pageNo.toString(),
      });
  
      const response = await fetch(`/vofas/api/v1/feedback?${queryParams.toString()}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(cleanedRequestBody)
      });
  
      // Hata durumlarını daha detaylı işle
      if (!response.ok) {
        let errorMessage = `Sunucu hatası: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage += ` - ${errorData.message || errorData.errorMessage || 'Bilinmeyen hata'}`;
          console.error('API Error Details:', errorData);
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
        throw new Error(errorMessage);
      }
  
      // Başarılı yanıtı işle
      const responseData = await response.json();
      console.log('API Response:', responseData); // Debug için
  
      if (responseData?.content) {
        setFeedbacks(Array.isArray(responseData.content) ? responseData.content : []);
        setPagination(prev => ({
          ...prev,
          current: pageNo + 1,
          pageSize: _pageSize,
          total: responseData.totalElements || 0
        }));
      } else {
        message.warning('Beklenmeyen yanıt formatı');
        setFeedbacks([]);
        setPagination(prev => ({ ...prev, total: 0 }));
      }
    } catch (error) {
      console.error('Geri bildirimler alınırken hata:', error);
      message.error(error.message || 'Geri bildirimler alınamadı');
      setFeedbacks([]);
      setPagination(prev => ({ ...prev, total: 0 }));
    } finally {
      setLoading(false);
    }
  }, [filters, token, logout]);
  useEffect(() => {
    fetchFeedbacks(0, pagination.pageSize);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      if (key === 'dateRange') {
        newFilters[key] = value;
      } else {
        newFilters[key] = value ? [value] : [];
      }
      return newFilters;
    });
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const handleTableChange = (paginationConfig) => {
    const { current, pageSize } = paginationConfig;
    setPagination(paginationConfig);
    fetchFeedbacks(current - 1, pageSize);
  };

  const handleRefresh = () => {
    fetchFeedbacks(pagination.current - 1, pagination.pageSize);
  };

  const clearFilters = () => {
    setFilters({
      dateRange: [dayjs().subtract(7, 'days'), dayjs()],
      feedbackStatuses: [],
      feedbackMethods: [],
      sentiments: [],
      types: []
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'feedbackId',
      key: 'feedbackId',
      width: 80,
      sorter: true
    },
    {
      title: 'İçerik',
      dataIndex: 'content',
      key: 'content',
      render: (text) => (
        <div style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={text}>
          {text}
        </div>
      )
    },
    {
      title: 'Tarih',
      dataIndex: 'feedbackDate',
      key: 'feedbackDate',
      render: (date) => dayjs(date).format('DD.MM.YYYY HH:mm'),
      sorter: true
    },
    {
      title: 'Durum',
      dataIndex: 'feedbackStatus',
      key: 'feedbackStatus',
      render: (status) => {
        const statusColors = {
          'READY': 'blue',
          'RESOLVED': 'green',
          'PENDING': 'orange',
          'RECEIVED': 'gray',
          'WAITING_TRANSCRIPTION': 'orange',
          'WAITING_SENTIMENT_ANALYSIS': 'purple'
        };
        return (
          <span style={{ color: statusColors[status] || 'black' }}>
            {status}
          </span>
        );
      }
    },
    {
      title: 'Metod',
      dataIndex: 'methodEnum',
      key: 'methodEnum',
      render: (method) => <span>{method?.replace('_', ' ')}</span>
    },
    {
      title: 'Sentiment',
      dataIndex: 'sentiment',
      key: 'sentiment',
      render: (sentiment) => {
        const sentimentColors = {
          'POSITIVE': 'green',
          'NEUTRAL': 'gray',
          'NEGATIVE': 'red'
        };
        return (
          <span style={{ color: sentimentColors[sentiment] || 'black' }}>
            {sentiment}
          </span>
        );
      }
    },
    {
      title: 'Tip',
      dataIndex: 'typeEnum',
      key: 'typeEnum',
      render: (type) => <span>{type}</span>
    }
  ];

  return (
    <div className="p-4">
      <Card
        title="Geri Bildirimler"
        extra={
          <div className="flex gap-2">
            <Button onClick={clearFilters}>
              Filtreleri Temizle
            </Button>
            <Button
              type="primary"
              onClick={handleRefresh}
              loading={loading}
            >
              Yenile
            </Button>
          </div>
        }
      >
        {/* Filters Section */}
        <div className="mb-4 p-4 bg-gray-50 rounded">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <label className="block text-sm font-medium mb-1">Tarih Aralığı</label>
              <RangePicker
                value={filters.dateRange}
                onChange={(dates) => handleFilterChange('dateRange', dates)}
                className="w-full"
                disabledDate={(current) => current && current > dayjs().endOf('day')}
                format="DD.MM.YYYY"
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <label className="block text-sm font-medium mb-1">Durum</label>
              <Select
                placeholder="Durum seçin"
                value={filters.feedbackStatuses[0]}
                onChange={(value) => handleFilterChange('feedbackStatuses', value)}
                allowClear
                className="w-full"
              >
                <Option value="READY">Hazır</Option>
                <Option value="RESOLVED">Çözüldü</Option>
                <Option value="PENDING">Beklemede</Option>
                <Option value="RECEIVED">Alındı</Option>
                <Option value="WAITING_TRANSCRIPTION">Transkript Bekliyor</Option>
                <Option value="WAITING_SENTIMENT_ANALYSIS">Sentiment Analizi Bekliyor</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <label className="block text-sm font-medium mb-1">Metod</label>
              <Select
                placeholder="Metod seçin"
                value={filters.feedbackMethods[0]}
                onChange={(value) => handleFilterChange('feedbackMethods', value)}
                allowClear
                className="w-full"
              >
                <Option value="WEBSITE">Website</Option>
                <Option value="KIOSK">Kiosk</Option>
                <Option value="STATIC_QR">Static QR</Option>
                <Option value="DYNAMIC_QR">Dynamic QR</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <label className="block text-sm font-medium mb-1">Sentiment</label>
              <Select
                placeholder="Sentiment seçin"
                value={filters.sentiments[0]}
                onChange={(value) => handleFilterChange('sentiments', value)}
                allowClear
                className="w-full"
              >
                <Option value="POSITIVE">Pozitif</Option>
                <Option value="NEUTRAL">Nötr</Option>
                <Option value="NEGATIVE">Negatif</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <label className="block text-sm font-medium mb-1">Tip</label>
              <Select
                placeholder="Tip seçin"
                value={filters.types[0]}
                onChange={(value) => handleFilterChange('types', value)}
                allowClear
                className="w-full"
              >
                <Option value="TEXT">Text</Option>
                <Option value="VOICE">Voice</Option>
              </Select>
            </Col>
          </Row>
        </div>

        {/* Table Section */}
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={feedbacks}
            rowKey="feedbackId"
            pagination={{
              ...pagination,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100'],
              showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} kayıt`,
              showQuickJumper: true
            }}
            onChange={handleTableChange}
            locale={{ emptyText: 'Geri bildirim bulunamadı' }}
            scroll={{ x: 'max-content' }}
            size="small"
          />
        </Spin>
      </Card>
    </div>
  );
};

export default Feedbacks;