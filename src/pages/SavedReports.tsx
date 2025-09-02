
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Button, 
  Table, 
  Input, 
  Space,
  Typography,
  Tag,
  message,
  Tooltip
} from 'antd';
import { 
  ArrowLeftOutlined,
  PlusOutlined,
  DownloadOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Report.scss';

const { Title } = Typography;
const { Search } = Input;

const SavedReports: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [reportType, setReportType] = useState(() => {
    return localStorage.getItem('selectedSavedReportType') || "DSR";
  });

  // Save report type to localStorage when it changes
  const handleReportTypeChange = (type: string) => {
    setReportType(type);
    localStorage.setItem('selectedSavedReportType', type);
  };
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
      render: (name: string, record: any) => (
        <div className="info-container">
          <span className="info-name">{name}</span>
          {record.description && (
            <Tooltip title={record.description} placement="top">
              <InfoCircleOutlined className="info-icon" />
            </Tooltip>
          )}
        </div>
      ),
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
            className='cls-saveDownload'
          />
        </Space>
      ),
    },
  ];

  return (
    <div className={`cls-report-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Header */}
      <div className="cls-report-header">
        <div className="cls-header-left">
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/report')}
            className="cls-back-btn"
          />
          <Title level={2} className="cls-page-title">
            Saved Reports
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

      <div className="cls-report-body">
        {/* Left Sidebar - Report Types */}
        <div className="cls-report-sidebar">
          <Card className={`cls-report-types-card ${isDarkMode ? 'dark' : 'light'}`}>
            {reportTypes.map((type) => (
              <div
                key={type}
                className={`cls-report-type-item ${reportType === type ? 'active' : ''} ${isDarkMode ? 'dark' : 'light'}`}
                onClick={() => handleReportTypeChange(type)}
              >
                {type}
              </div>
            ))}
          </Card>
        </div>

        {/* Main Content */}
        <div className="cls-report-main">
          <Card className={`cls-reports-card ${isDarkMode ? 'dark' : 'light'}`}>
            <Table
              columns={columns}
              dataSource={savedReportsData}
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

export default SavedReports;
