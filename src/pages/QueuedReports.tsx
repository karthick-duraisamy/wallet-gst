import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Table, 
  Input, 
  Space,
  Typography,
  Tag,
  message
} from 'antd';
import { 
  ArrowLeftOutlined,
  PlusOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Report.scss';

const { Title } = Typography;

const QueuedReports: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [reportType, setReportType] = useState(() => {
    return localStorage.getItem('selectedQueuedReportType') || "DSR";
  });

  // Save report type to localStorage when it changes
  const handleReportTypeChange = (type: string) => {
    setReportType(type);
    localStorage.setItem('selectedQueuedReportType', type);
  };

  const reportTypes = ["DSR", "Ledger", "Commission", "Top-up", "Sales"];

  // Load queued reports from localStorage
  const [queuedReportsData, setQueuedReportsData] = useState([
    {
      key: '1',
      name: 'Large DSR Export',
      type: 'DSR',
      status: 'Processing',
      progress: 65,
      queueTime: '2024-01-25 10:30',
      estimatedCompletion: '2024-01-25 11:00',
      priority: 'High'
    },
    {
      key: '2',
      name: 'Commission Analysis',
      type: 'Commission',
      status: 'Queued',
      progress: 0,
      queueTime: '2024-01-25 10:45',
      estimatedCompletion: '2024-01-25 11:30',
      priority: 'Medium'
    }
  ]);

  React.useEffect(() => {
    const savedQueued = JSON.parse(localStorage.getItem('queuedReports') || '[]');
    if (savedQueued.length > 0) {
      setQueuedReportsData(prev => [...prev, ...savedQueued]);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing': return 'blue';
      case 'Queued': return 'orange';
      case 'Paused': return 'red';
      case 'Completed': return 'green';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'red';
      case 'Medium': return 'orange';
      case 'Low': return 'green';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Report Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color="blue">{type}</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Queue Time',
      dataIndex: 'queueTime',
      key: 'queueTime',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<DownloadOutlined />} 
            onClick={() => handleDownload(record.key)}
            style={{ color: '#52c41a' }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className={`cls-queued-reports-page ${isDarkMode ? "cls-dark" : ""}`}>
      {/* Header */}
      <div className="cls-queued-reports-header">
        <div className="cls-header-left">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/report')}
            className="cls-back-btn"
          />
          <Title level={2} className="cls-page-title">
            Queued Reports
          </Title>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/report')}
          className="cls-create-report-btn"
        >
          Create New Report
        </Button>
      </div>

      <div className="cls-queued-reports-content">
        {/* Left Sidebar - Report Types */}
        <div className="cls-report-sidebar">
          <Card className={`cls-report-types-card ${isDarkMode ? "cls-dark" : ""}`}>
            {reportTypes.map((type) => (
              <div
                key={type}
                className={`cls-report-type-item ${
                  reportType === type ? "cls-selected" : ""
                } ${isDarkMode ? "cls-dark" : ""}`}
                onClick={() => handleReportTypeChange(type)}
              >
                {type}
              </div>
            ))}
          </Card>
        </div>

        {/* Main Content */}
        <div className="cls-report-main">
          <Card className={`cls-reports-table-card ${isDarkMode ? "cls-dark" : ""}`}>
            <Table
              columns={columns}
              dataSource={queuedReportsData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
              scroll={{ x: 800 }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QueuedReports;