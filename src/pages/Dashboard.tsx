import React from 'react';
import { Row, Col, Card, Statistic, Progress, Table } from 'antd';
import { 
  DollarOutlined, 
  FileTextOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined,
  RiseOutlined
} from '@ant-design/icons';

const Dashboard: React.FC = () => {
  const statsData = [
    {
      title: 'Total Claims',
      value: 2456,
      icon: <FileTextOutlined />,
      color: '#1890ff',
      trend: '+12%',
    },
    {
      title: 'Amount Claimed',
      value: 8450000,
      prefix: '₹',
      icon: <DollarOutlined />,
      color: '#52c41a',
      trend: '+8.5%',
    },
    {
      title: 'Pending Claims',
      value: 145,
      icon: <ClockCircleOutlined />,
      color: '#faad14',
      trend: '-5%',
    },
    {
      title: 'Approved Claims',
      value: 2311,
      icon: <CheckCircleOutlined />,
      color: '#52c41a',
      trend: '+15%',
    },
  ];

  const recentClaims = [
    {
      key: '1',
      invoice: 'INV-2024-001',
      supplier: 'IndiGo Airlines',
      amount: 15000,
      status: 'Approved',
      date: '2024-01-15',
    },
    {
      key: '2',
      invoice: 'INV-2024-002',
      supplier: 'Air India',
      amount: 8500,
      status: 'Pending',
      date: '2024-01-16',
    },
    {
      key: '3',
      invoice: 'INV-2024-003',
      supplier: 'SpiceJet',
      amount: 12000,
      status: 'Processing',
      date: '2024-01-17',
    },
  ];

  const columns = [
    {
      title: 'Invoice Number',
      dataIndex: 'invoice',
      key: 'invoice',
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `₹${amount.toLocaleString()}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: Record<string, string> = {
          'Approved': '#52c41a',
          'Pending': '#faad14',
          'Processing': '#1890ff',
          'Rejected': '#ff4d4f',
        };
        return (
          <span style={{ color: colors[status], fontWeight: 500 }}>
            {status}
          </span>
        );
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <div className="slide-up">
      <div className="dashboard-stats">
        {statsData.map((stat, index) => (
          <Card key={index} className="stat-card">
            <div className="flex-between mb-16">
              <div style={{ color: stat.color, fontSize: 24 }}>
                {stat.icon}
              </div>
              <div style={{ color: stat.color, fontSize: 12, fontWeight: 500 }}>
                <RiseOutlined /> {stat.trend}
              </div>
            </div>
            <Statistic
              title={stat.title}
              value={stat.value}
              prefix={stat.prefix}
              valueStyle={{ color: stat.color, fontSize: 28, fontWeight: 700 }}
            />
          </Card>
        ))}
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card 
            title="Recent Claims" 
            className="content-card"
            extra={<a href="/reconciliation">View All</a>}
          >
            <Table
              columns={columns}
              dataSource={recentClaims}
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card title="Claim Status Overview" className="content-card">
            <div className="mb-24">
              <div className="flex-between mb-16">
                <span>Approved</span>
                <span style={{ fontWeight: 600 }}>94%</span>
              </div>
              <Progress percent={94} strokeColor="#52c41a" />
            </div>
            
            <div className="mb-24">
              <div className="flex-between mb-16">
                <span>Processing</span>
                <span style={{ fontWeight: 600 }}>4%</span>
              </div>
              <Progress percent={4} strokeColor="#1890ff" />
            </div>
            
            <div>
              <div className="flex-between mb-16">
                <span>Rejected</span>
                <span style={{ fontWeight: 600 }}>2%</span>
              </div>
              <Progress percent={2} strokeColor="#ff4d4f" />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;