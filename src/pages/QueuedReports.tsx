
import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Table, 
  Input, 
  Space,
  Typography,
  Tag,
  Progress,
  Popconfirm,
  message
} from 'antd';
import { 
  ArrowLeftOutlined,
  PlusOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const { Title } = Typography;
const { Search } = Input;

const QueuedReports: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [reportType, setReportType] = useState("DSR");

  const reportTypes = ["DSR", "Ledger", "Commission", "Top-up", "Sales"];

  // Sample queued reports data
  const queuedReportsData = [
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
    },
    {
      key: '3',
      name: 'Annual Sales Report',
      type: 'Sales',
      status: 'Paused',
      progress: 25,
      queueTime: '2024-01-25 09:15',
      estimatedCompletion: '2024-01-25 12:00',
      priority: 'Low'
    },
    {
      key: '4',
      name: 'Ledger Summary',
      type: 'Ledger',
      status: 'Completed',
      progress: 100,
      queueTime: '2024-01-25 08:00',
      estimatedCompletion: '2024-01-25 08:45',
      priority: 'High'
    }
  ];

  const handlePause = (reportId: string) => {
    message.success('Report paused');
  };

  const handleResume = (reportId: string) => {
    message.success('Report resumed');
  };

  const handleDownload = (reportId: string) => {
    message.success('Report downloaded successfully');
  };

  const handleCancel = (reportId: string) => {
    message.success('Report cancelled');
  };

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
    <div style={{ 
      background: isDarkMode ? '#141414' : '#f5f5f5',
      minHeight: 'calc(100vh - 128px)' 
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/report')}
            style={{ border: 'none', background: 'transparent', fontSize: '16px' }}
          />
          <Title level={2} style={{ margin: 0, color: '#5A4FCF' }}>
            Queued Reports
          </Title>
        </div>
        <Button 
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/report')}
          style={{ background: '#5A4FCF', borderColor: '#5A4FCF' }}
        >
          Create New Report
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Left Sidebar - Report Types */}
        <div
          style={{
            width: "295px",
            position: "sticky",
            top: "50px",
            height: "fit-content",
          }}
        >
          <Card
            style={{
              background: isDarkMode ? "#1f1f1f" : "#fff",
              padding: "8px",
            }}
          >
            {reportTypes.map((type, index) => (
              <div
                key={type}
                style={{
                  padding: "12px 16px",
                  marginBottom: "4px",
                  background: reportType === type ? "#5A4FCF" : "transparent",
                  color:
                    reportType === type
                      ? "#fff"
                      : isDarkMode
                        ? "#fff"
                        : "#1a1a1a",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: reportType === type ? "500" : "400",
                  fontSize: "14px",
                  transition: "all 0.2s ease",
                  textAlign: "center",
                }}
                onClick={() => setReportType(type)}
              >
                {type}
              </div>
            ))}
          </Card>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {/* Reports Table */}
          <Card style={{ background: isDarkMode ? '#1f1f1f' : '#fff' }}>
            <Table
              columns={columns}
              dataSource={queuedReportsData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} of ${total} items`,
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
