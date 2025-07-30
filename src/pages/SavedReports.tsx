
import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Typography, 
  Table,
  Tag
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import '../styles/Report.scss';

const { Title, Text } = Typography;

const SavedReports: React.FC = () => {
  const navigate = useNavigate();

  const savedReportsData = [
    {
      key: '1',
      reportName: 'Test123',
      status: 'Not Scheduled',
      scheduledFrequency: 'N/A',
      scheduledDateRange: 'N/A'
    },
    {
      key: '2',
      reportName: 'Corporate B',
      status: 'Not Scheduled',
      scheduledFrequency: 'N/A',
      scheduledDateRange: 'N/A'
    },
    {
      key: '3',
      reportName: 'Corporate A',
      status: 'Not Scheduled',
      scheduledFrequency: 'N/A',
      scheduledDateRange: 'N/A'
    },
    {
      key: '4',
      reportName: 'test last 7days',
      status: 'Not Scheduled',
      scheduledFrequency: 'N/A',
      scheduledDateRange: 'N/A'
    },
    {
      key: '5',
      reportName: 'report check',
      status: 'Not Scheduled',
      scheduledFrequency: 'N/A',
      scheduledDateRange: 'N/A'
    }
  ];

  const columns = [
    {
      title: 'Report name',
      dataIndex: 'reportName',
      key: 'reportName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            backgroundColor: '#ff9500' 
          }} />
          <Tag color="orange">{status}</Tag>
        </div>
      ),
    },
    {
      title: 'Scheduled frequency',
      dataIndex: 'scheduledFrequency',
      key: 'scheduledFrequency',
    },
    {
      title: 'Scheduled date range',
      dataIndex: 'scheduledDateRange',
      key: 'scheduledDateRange',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button 
          type="text" 
          icon={<DownloadOutlined />}
          style={{ color: '#ff4d4f' }}
        />
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
        <Title level={3} className="cls-saved-title">Saved Report</Title>
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
              dataSource={savedReportsData}
              pagination={false}
              className="cls-saved-reports-table"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SavedReports;
