
import React, { useState, useEffect } from 'react';
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

const { Title } = Typography;
const { Search } = Input;

const SavedReports: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [reportType, setReportType] = useState("DSR");
  const [savedReportsData, setSavedReportsData] = useState<any[]>([]);

  const reportTypes = ["DSR", "Ledger", "Commission", "Top-up", "Sales"];

  useEffect(() => {
    // Load saved reports from localStorage
    const savedReports = JSON.parse(localStorage.getItem('savedReports') || '[]');
    const defaultReports = [
      {
        key: '1',
        name: 'Monthly DSR Report',
        type: 'DSR',
        description: 'Monthly sales report for all agencies',
        createdDate: '2024-01-15',
        lastRun: '2024-01-25',
        frequency: 'Monthly',
        status: 'Active'
      },
      {
        key: '2',
        name: 'Weekly Commission Report',
        type: 'Commission',
        description: 'Weekly commission breakdown',
        createdDate: '2024-01-10',
        lastRun: '2024-01-24',
        frequency: 'Weekly',
        status: 'Active'
      },
      {
        key: '3',
        name: 'Annual Ledger Summary',
        type: 'Ledger',
        description: 'Complete ledger for financial year',
        createdDate: '2024-01-05',
        lastRun: '2024-01-20',
        frequency: 'Yearly',
        status: 'Paused'
      }
    ];
    
    setSavedReportsData([...defaultReports, ...savedReports]);
  }, []);

  const handleDownload = (reportId: string) => {
    message.success('Report downloaded successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'green';
      case 'Paused': return 'orange';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Report Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value: any, record: any) =>
        record.name.toLowerCase().includes(value.toLowerCase()) ||
        record.type.toLowerCase().includes(value.toLowerCase()),
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'Last Run',
      dataIndex: 'lastRun',
      key: 'lastRun',
    },
    {
      title: 'Frequency',
      dataIndex: 'frequency',
      key: 'frequency',
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
            style={{ border: 'none', background: 'transparent' }}
          />
          <Title level={2} style={{ margin: 0, color: '#5A4FCF' }}>
            Saved Reports
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
          {/* Search */}
          <div style={{ marginBottom: '24px' }}>
            <Search
              placeholder="Search reports..."
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
          </div>

          {/* Reports Table */}
          <Card style={{ background: isDarkMode ? '#1f1f1f' : '#fff' }}>
            <Table
              columns={columns}
              dataSource={savedReportsData}
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

export default SavedReports;
