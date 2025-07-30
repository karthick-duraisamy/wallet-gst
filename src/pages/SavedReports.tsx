
import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Space,
  Typography,
  Tag,
  Popconfirm,
  message,
  Input
} from 'antd';
import { 
  ArrowLeftOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  SearchOutlined
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
      ellipsis: true,
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
      render: (frequency: string) => (
        <Tag color={frequency === 'Daily' ? 'green' : frequency === 'Weekly' ? 'orange' : 'purple'}>
          {frequency}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) => (
        <Space size="small">
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

      {/* Search and Filters */}
      <Card style={{ marginBottom: '24px', background: isDarkMode ? '#1f1f1f' : '#fff' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Search
            placeholder="Search reports..."
            allowClear
            style={{ width: 300 }}
            onSearch={setSearchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </Card>

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
              `${range[0]}-${range[1]} of ${total} reports`
          }}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default SavedReports;
