import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Spin, DatePicker, Select, Button } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'antd/dist/reset.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

const DashboardHome = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        startDate: dayjs().subtract(7, 'days').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
        feedbackStatuses: [],
        sentiments: []
    });
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: 0
    });
    const [sort, setSort] = useState({
        sortBy: 'feedbackDate',
        ascending: false
    });
    const navigate = useNavigate();

    // Renk paleti
    const COLORS = {
        POSITIVE: '#4CAF50',
        NEUTRAL: '#FFC107',
        NEGATIVE: '#F44336',
        PENDING: '#9E9E9E'
    };

    // API'den feedback verilerini çekme
    const fetchFeedbackData = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                'sort-by': sort.sortBy,
                ascending: sort.ascending,
                'page-no': pagination.current - 1,
                ...filters
            });

            const response = await fetch(`/vofas/api/v1/feedback?${queryParams}`);
            const data = await response.json();

            if (data.content) {
                setFeedbackData(data.content.map(item => ({
                    key: item.feedbackId,
                    ...item,
                    feedbackSourceName: item.feedbackSource?.sourceName || 'Unknown'
                })));
                setPagination({
                    ...pagination,
                    total: data.totalElements || 0
                });
            }
        } catch (error) {
            console.error('Error fetching feedback data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Sentiment analiz verilerini hazırlama
    const prepareSentimentData = () => {
        const sentimentCounts = {
            POSITIVE: 0,
            NEUTRAL: 0,
            NEGATIVE: 0,
            PENDING: 0
        };

        feedbackData.forEach(item => {
            if (item.sentiment && sentimentCounts[item.sentiment] !== undefined) {
                sentimentCounts[item.sentiment]++;
            }
        });

        return Object.entries(sentimentCounts).map(([name, value]) => ({
            name,
            value,
            color: COLORS[name]
        }));
    };

    // Sütun tanımları
    const columns = [
        {
            title: 'ID',
            dataIndex: 'feedbackId',
            key: 'feedbackId',
            sorter: true,
        },
        {
            title: 'Source',
            dataIndex: 'feedbackSourceName',
            key: 'sourceName',
            filters: [
                { text: 'Twitter', value: 'Twitter' },
                { text: 'Email', value: 'Email' },
                { text: 'Web Form', value: 'Web Form' },
            ],
            onFilter: (value, record) => record.feedbackSourceName.includes(value),
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            render: (text) => (
                <div style={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {text}
                </div>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'feedbackDate',
            key: 'feedbackDate',
            render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
            sorter: true,
        },
        {
            title: 'Sentiment',
            dataIndex: 'sentiment',
            key: 'sentiment',
            render: (sentiment) => (
                <span style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    backgroundColor: COLORS[sentiment] || '#999',
                    color: 'white'
                }}>
          {sentiment}
        </span>
            ),
            filters: [
                { text: 'Positive', value: 'POSITIVE' },
                { text: 'Neutral', value: 'NEUTRAL' },
                { text: 'Negative', value: 'NEGATIVE' },
                { text: 'Pending', value: 'PENDING' },
            ],
            onFilter: (value, record) => record.sentiment === value,
        },
    ];

    // Tablo değişiklikleri (sıralama, sayfalama)
    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination);
        setSort({
            sortBy: sorter.field || 'feedbackDate',
            ascending: sorter.order === 'ascend'
        });
    };

    // Feedback tablosuna tıklama işlemi
    const handleRowClick = (record) => {
        navigate(`/feedback/${record.feedbackId}`);
    };

    // Filtre değişiklikleri
    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // İlk yükleme ve filtre değişikliklerinde verileri yenile
    useEffect(() => {
        fetchFeedbackData();
    }, [filters, pagination.current, sort]);

    const sentimentData = prepareSentimentData();
    const totalFeedback = sentimentData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="dashboard-container" style={{ padding: '24px' }}>
            <h1 style={{ marginBottom: '24px' }}>Feedback Dashboard</h1>

            {/* Filtreleme Bölümü */}
            <Card style={{ marginBottom: '24px' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <RangePicker
                            style={{ width: '100%' }}
                            defaultValue={[dayjs().subtract(7, 'days'), dayjs()]}
                            onChange={(dates) => handleFilterChange('startDate', dates[0].format('YYYY-MM-DD'))}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Select Sentiments"
                            onChange={(value) => handleFilterChange('sentiments', value)}
                        >
                            <Option value="POSITIVE">Positive</Option>
                            <Option value="NEUTRAL">Neutral</Option>
                            <Option value="NEGATIVE">Negative</Option>
                            <Option value="PENDING">Pending</Option>
                        </Select>
                    </Col>
                    <Col xs={24} md={8}>
                        <Button
                            type="primary"
                            style={{ width: '100%' }}
                            onClick={fetchFeedbackData}
                        >
                            Apply Filters
                        </Button>
                    </Col>
                </Row>
            </Card>

            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                {/* İstatistik Kartları */}
                <Col xs={24} sm={12} md={6}>
                    <Card hoverable onClick={() => navigate('/analytics')} style={{ cursor: 'pointer' }}>
                        <h3>Total Feedback</h3>
                        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalFeedback}</p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card hoverable onClick={() => navigate('/analytics')} style={{ cursor: 'pointer' }}>
                        <h3>Positive</h3>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: COLORS.POSITIVE }}>
                            {sentimentData.find(item => item.name === 'POSITIVE')?.value || 0}
                        </p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card hoverable onClick={() => navigate('/analytics')} style={{ cursor: 'pointer' }}>
                        <h3>Negative</h3>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: COLORS.NEGATIVE }}>
                            {sentimentData.find(item => item.name === 'NEGATIVE')?.value || 0}
                        </p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card hoverable onClick={() => navigate('/analytics')} style={{ cursor: 'pointer' }}>
                        <h3>Pending</h3>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: COLORS.PENDING }}>
                            {sentimentData.find(item => item.name === 'PENDING')?.value || 0}
                        </p>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[24, 24]}>
                {/* Feedback Tablosu */}
                <Col xs={24} xl={16}>
                    <Card
                        title="Recent Feedback"
                        hoverable
                        extra={<a onClick={() => navigate('/feedback')}>View All</a>}
                    >
                        <Spin spinning={loading}>
                            <Table
                                columns={columns}
                                dataSource={feedbackData}
                                pagination={pagination}
                                onChange={handleTableChange}
                                onRow={(record) => ({
                                    onClick: () => handleRowClick(record),
                                })}
                                style={{ cursor: 'pointer' }}
                            />
                        </Spin>
                    </Card>
                </Col>

                {/* Sentiment Grafiği */}
                <Col xs={24} xl={8}>
                    <Card
                        title="Sentiment Analysis"
                        hoverable
                        onClick={() => navigate('/analytics')}
                        style={{ cursor: 'pointer', height: '100%' }}
                    >
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={sentimentData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {sentimentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name, props) => [
                                        value,
                                        `${name}: ${((value / totalFeedback) * 100).toFixed(1)}%`
                                    ]}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DashboardHome;