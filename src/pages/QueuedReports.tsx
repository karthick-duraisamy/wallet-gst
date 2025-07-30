
import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Typography, 
  Table,
  Tag,
  Pagination,
  Select
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import '../styles/Report.scss';

const { Title, Text } = Typography;
const { Option } = Select;

const QueuedReports: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const queuedReportsData = [
    {
      key: '1',
      reportName: 'dsr report',
      dateTime: '25-Jul-2025 12:27 PM',
      status: 'Completed'
    },
    {
      key: '2',
      reportName: '',
      dateTime: '14-Jul-2025 03:37 PM',
      status: 'Completed'
    },
    {
      key: '3',
      reportName: 'dsr march mon...',
      dateTime: '08-Jul-2025 05:50 PM',
      status: 'Failed'
    },
    {
      key: '4',
      reportName: 'dsr apr month',
      dateTime: '08-Jul-2025 05:45 PM',
      status: 'Failed'
    },
    {
      key: '5',
      reportName: 'dsr',
      dateTime: '04-Jul-2025 10:59 AM',
      status: 'Completed'
    }
  ];

  const columns = [
    {
      title: 'Report name',
      dataIndex: 'reportName',
      key: 'reportName',
      render: (text: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            backgroundColor: '#ff9500' 
          }} />
          {text || 'Unnamed Report'}
        </div>
      ),
    },
    {
      title: 'Date & Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Completed' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        record.status === 'Completed' && (
          <Button 
            type="text" 
            icon={<DownloadOutlined />}
            style={{ color: '#ff4d4f' }}
          />
        )
      ),
    },
  ];

  const reportTypes = ['DSR', 'Ledger', 'Commission', 'Top-up', 'Sales'];

  return (
    <div className="cls-report-page">
      <div className="cls-report-header">
        <div className="cls-breadcrumb">
          <Text>Home » Create custom report</Text>
        </div>
        <Title level={3} className="cls-queued-title">Queued Report</Title>
        <div className="cls-header-buttons">
          <Button 
            type="primary"
            onClick={() => navigate('/report')}
            className="cls-create-btn"
          >
            Create report
          </Button>
        </div>
      </div>

      <Card className="cls-report-card">
        <div className="cls-report-content">
          <div className="cls-sidebar">
            <div className="cls-report-types">
              {reportTypes.map((reportType) => (
                <div
                  key={reportType}
                  className={`cls-report-type ${reportType === 'DSR' ? 'cls-active' : ''}`}
                >
                  {reportType}
                </div>
              ))}
            </div>
          </div>

          <div className="cls-main-content">
            <Table 
              columns={columns} 
              dataSource={queuedReportsData}
              pagination={false}
              className="cls-queued-reports-table"
            />
            
            <div className="cls-pagination-container">
              <div className="cls-pagination-info">
                <span>Displaying </span>
                <Select 
                  value={pageSize} 
                  onChange={setPageSize}
                  style={{ width: 60, margin: '0 8px' }}
                >
                  <Option value={5}>5</Option>
                  <Option value={10}>10</Option>
                  <Option value={20}>20</Option>
                </Select>
                <span>Out of 487</span>
              </div>
              
              <Pagination
                current={currentPage}
                total={487}
                pageSize={pageSize}
                onChange={setCurrentPage}
                showSizeChanger={false}
                className="cls-pagination"
              />
              
              <div className="cls-go-to-page">
                <span>Go to page </span>
                <Select 
                  placeholder="Page"
                  style={{ width: 80, margin: '0 8px' }}
                >
                  {Array.from({ length: Math.ceil(487 / pageSize) }, (_, i) => (
                    <Option key={i + 1} value={i + 1}>{i + 1}</Option>
                  ))}
                </Select>
                <Button 
                  type="primary" 
                  size="small"
                  style={{ background: '#ff4d4f', borderColor: '#ff4d4f' }}
                >
                  Go
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QueuedReports;
