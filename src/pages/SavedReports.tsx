
import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Table, 
  Input, 
  Space,
  Typography,
  Tag,
  Popconfirm,
  message
} from 'antd';
import { 
  ArrowLeftOutlined,
  SearchOutlined,
  PlusOutlined,
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const { Title } = Typography;
const { Search } = Input;

const SavedReports: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [searchText, setSearchText] = useState('');

  // Sample saved reports data
  const savedReportsData = [
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

  const handleDelete = (reportId: string) => {
    message.success('Report deleted successfully');
  };

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
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => navigate('/report')}
          />
          <Popconfirm
            title="Are you sure you want to delete this report?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="text" 
              icon={<DeleteOutlined />} 
              danger
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ 
      padding: '24px', 
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
          <Title level={2} style={{ margin: 0, color: isDarkMode ? '#fff' : '#1a1a1a' }}>
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
          }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );
};

export default SavedReports;
