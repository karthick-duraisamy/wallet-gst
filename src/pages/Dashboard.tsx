
import React, { useState } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Select, 
  Button, 
  Table, 
  Progress,
  Typography,
  Space,
  Divider,
  Statistic
} from 'antd';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  DownloadOutlined, 
  InfoCircleOutlined, 
  MailOutlined,
  WhatsAppOutlined,
  BellOutlined,
  EyeOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const Dashboard: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState('select');
  const [travelVendor, setTravelVendor] = useState('select');

  // Overview summary data
  const overviewData = [
    {
      title: 'Email',
      icon: <MailOutlined style={{ fontSize: 32, color: '#FFB020' }} />,
      total: 0,
      stats: [
        { label: 'Sent', value: 0, color: '#52c41a' },
        { label: 'Queue', value: 0, color: '#faad14' },
        { label: 'Not - Sent', value: 0, color: '#ff4d4f' }
      ]
    },
    {
      title: 'WhatsApp',
      icon: <WhatsAppOutlined style={{ fontSize: 32, color: '#25D366' }} />,
      total: 0,
      stats: [
        { label: 'Sent', value: 0, color: '#52c41a' },
        { label: 'Queue', value: 0, color: '#faad14' },
        { label: 'Not - Sent', value: 0, color: '#ff4d4f' }
      ]
    },
    {
      title: 'Push notification',
      icon: <BellOutlined style={{ fontSize: 32, color: '#1890ff' }} />,
      total: 400,
      stats: [
        { label: 'Total mail', value: 400, color: '#52c41a' },
        { label: 'AI Response', value: 35, color: '#ff4d4f' }
      ]
    }
  ];

  // Chart data
  const invoiceStatusData = [
    { month: 'Apr', Submitted: 180, 'Pending to File': 40, 'Invoice Missing': 20, 'Additional in GSTR -2A': 10 },
    { month: 'May', Submitted: 200, 'Pending to File': 35, 'Invoice Missing': 25, 'Additional in GSTR -2A': 15 },
    { month: 'Jun', Submitted: 220, 'Pending to File': 30, 'Invoice Missing': 30, 'Additional in GSTR -2A': 20 },
    { month: 'Jul', Submitted: 190, 'Pending to File': 45, 'Invoice Missing': 15, 'Additional in GSTR -2A': 25 },
    { month: 'Aug', Submitted: 210, 'Pending to File': 25, 'Invoice Missing': 35, 'Additional in GSTR -2A': 10 },
    { month: 'Sep', Submitted: 180, 'Pending to File': 50, 'Invoice Missing': 20, 'Additional in GSTR -2A': 30 },
    { month: 'Oct', Submitted: 240, 'Pending to File': 20, 'Invoice Missing': 25, 'Additional in GSTR -2A': 15 },
    { month: 'Nov', Submitted: 200, 'Pending to File': 40, 'Invoice Missing': 30, 'Additional in GSTR -2A': 20 },
    { month: 'Dec', Submitted: 220, 'Pending to File': 35, 'Invoice Missing': 20, 'Additional in GSTR -2A': 25 },
    { month: 'Jan', Submitted: 190, 'Pending to File': 30, 'Invoice Missing': 40, 'Additional in GSTR -2A': 15 },
    { month: 'Feb', Submitted: 210, 'Pending to File': 45, 'Invoice Missing': 25, 'Additional in GSTR -2A': 20 },
    { month: 'Mar', Submitted: 180, 'Pending to File': 25, 'Invoice Missing': 35, 'Additional in GSTR -2A': 30 }
  ];

  // Recent failures data
  const recentFailures = [];

  // Airline data
  const airlineData = [
    {
      key: '1',
      airline: 'SG',
      code: '6132',
      bookings: '1024 tickets',
      cancellations: '11364',
      amount: 'INR -5232',
      color: '#ff4d4f'
    },
    {
      key: '2',
      airline: 'AI',
      code: '324',
      bookings: '324 tickets',
      cancellations: '1032',
      amount: 'INR -708',
      color: '#722ed1'
    },
    {
      key: '3',
      airline: '6E',
      code: '529',
      bookings: '529 tickets',
      cancellations: '1356',
      amount: 'INR -1428',
      color: '#1890ff'
    },
    {
      key: '4',
      airline: 'UK',
      code: '168',
      bookings: '168 tickets',
      cancellations: '312',
      amount: 'INR -144',
      color: '#fa8c16'
    },
    {
      key: '5',
      airline: 'IX',
      code: '96',
      bookings: '96 tickets',
      cancellations: '336',
      amount: 'INR -240',
      color: '#ff4d4f'
    },
    {
      key: '6',
      airline: 'G8',
      code: '348',
      bookings: '348 tickets',
      cancellations: '1548',
      amount: 'INR -1200',
      color: '#52c41a'
    }
  ];

  const airlineColumns = [
    {
      title: 'Airline code',
      dataIndex: 'airline',
      key: 'airline',
      render: (text: string, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div 
            style={{ 
              width: 16, 
              height: 16, 
              backgroundColor: record.color, 
              borderRadius: 2 
            }} 
          />
          <Text strong>{text}</Text>
        </div>
      ),
    },
    {
      title: 'Bookings/Claim',
      dataIndex: 'code',
      key: 'code',
      render: (text: string, record: any) => (
        <div>
          <div style={{ fontWeight: 600 }}>{text}</div>
          <div style={{ fontSize: 12, color: '#666' }}>{record.bookings}</div>
        </div>
      ),
    },
    {
      title: 'Cancellations/Claim',
      dataIndex: 'cancellations',
      key: 'cancellations',
      render: (text: string) => (
        <div>
          <div style={{ fontWeight: 600 }}>{text}</div>
          <div style={{ fontSize: 12, color: '#666' }}>1356 tickets</div>
        </div>
      ),
    },
    {
      title: 'Net Claimable',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: string) => (
        <Text style={{ fontWeight: 600, color: text.includes('-') ? '#ff4d4f' : '#52c41a' }}>
          {text}
        </Text>
      ),
    },
  ];

  const pendingFilesData = [
    { month: 'SG', value: 8 }
  ];

  return (
    <div className="slide-up" style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3} style={{ margin: 0, color: '#333' }}>Dashboard</Title>
        <Select defaultValue="This month" style={{ width: 120 }}>
          <Option value="This month">This month</Option>
          <Option value="Last month">Last month</Option>
          <Option value="This year">This year</Option>
        </Select>
      </div>

      {/* Overall Summary Section */}
      <div style={{ marginBottom: 32 }}>
        <Title level={4} style={{ marginBottom: 16, color: '#333' }}>Overall summary</Title>
        <Row gutter={[24, 24]}>
          {overviewData.map((item, index) => (
            <Col xs={24} md={8} key={index}>
              <Card 
                style={{ 
                  borderRadius: 12, 
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                bodyStyle={{ padding: '24px' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
                  <div style={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: 12, 
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: '#333', display: 'block' }}>
                      {item.title}
                    </Text>
                    <Text style={{ fontSize: 24, fontWeight: 600, color: '#1890ff' }}>
                      Total: {item.total}
                    </Text>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {item.stats.map((stat, statIndex) => (
                    <div key={statIndex} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ color: '#666', fontSize: 14 }}>{stat.label}</Text>
                      <Text style={{ color: stat.color, fontWeight: 600, fontSize: 16 }}>
                        {stat.value}
                      </Text>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Recent failures section */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col xs={24} lg={16}>
          <Card 
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 600 }}>Recent failures</Text>
                <Button type="link" icon={<EyeOutlined />} style={{ color: '#1890ff' }}>
                  View all failures
                </Button>
              </div>
            }
            style={{ 
              borderRadius: 12, 
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              minHeight: 300
            }}
          >
            {recentFailures.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '60px 20px',
                color: '#999'
              }}>
                <div style={{ marginBottom: 16 }}>
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ margin: '0 auto' }}>
                    <rect x="20" y="20" width="40" height="30" rx="4" stroke="#e0e0e0" strokeWidth="2" fill="none"/>
                    <rect x="25" y="25" width="30" height="20" rx="2" fill="#f5f5f5"/>
                    <circle cx="40" cy="35" r="3" fill="#e0e0e0"/>
                    <rect x="30" y="55" width="20" height="8" rx="4" fill="#f0f0f0"/>
                  </svg>
                </div>
                <Text style={{ fontSize: 16, color: '#999' }}>No data available</Text>
              </div>
            ) : (
              <Table
                columns={[
                  { title: 'Tracking ID', dataIndex: 'trackingId', key: 'trackingId' },
                  { title: 'Details', dataIndex: 'details', key: 'details' },
                  { title: 'Status', dataIndex: 'status', key: 'status' },
                  { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
                  { title: 'Action', dataIndex: 'action', key: 'action' },
                ]}
                dataSource={recentFailures}
                pagination={false}
              />
            )}
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card 
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 600 }}>Top sent notifications</Text>
              </div>
            }
            style={{ 
              borderRadius: 12, 
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              minHeight: 300
            }}
          >
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, color: '#666' }}>AI Mail Agent</Text>
              </div>
              <Button type="primary" style={{ marginBottom: 20 }}>
                Push Notification
              </Button>
              <div style={{ 
                textAlign: 'center', 
                padding: '20px',
                color: '#999'
              }}>
                <div style={{ marginBottom: 16 }}>
                  <svg width="120" height="80" viewBox="0 0 120 80" fill="none" style={{ margin: '0 auto' }}>
                    <rect x="20" y="15" width="80" height="50" rx="8" stroke="#e0e0e0" strokeWidth="2" fill="white"/>
                    <rect x="30" y="25" width="60" height="4" rx="2" fill="#f0f0f0"/>
                    <rect x="30" y="35" width="40" height="4" rx="2" fill="#f0f0f0"/>
                    <rect x="30" y="45" width="50" height="4" rx="2" fill="#f0f0f0"/>
                    <text x="60" y="75" fontSize="10" fill="#ccc" textAnchor="middle">Empty</text>
                  </svg>
                </div>
                <Text style={{ fontSize: 14, color: '#999' }}>Notification not sent</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Invoice Status Chart */}
        <Col xs={24} lg={12}>
          <Card 
            title="Invoice status"
            extra={<DownloadOutlined style={{ cursor: 'pointer' }} />}
            style={{ 
              borderRadius: 12, 
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              height: 400 
            }}
          >
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <Button size="small" type="primary">All</Button>
              <Button size="small">Airlines</Button>
              <Select size="small" defaultValue="Type" style={{ width: 80 }}>
                <Option value="Type">Type</Option>
              </Select>
              <Select size="small" defaultValue="Invoices Count" style={{ width: 120 }}>
                <Option value="Invoices Count">Invoices Count</Option>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={invoiceStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Submitted" stackId="a" fill="#1890ff" />
                <Bar dataKey="Pending to File" stackId="a" fill="#52c41a" />
                <Bar dataKey="Invoice Missing" stackId="a" fill="#faad14" />
                <Bar dataKey="Additional in GSTR -2A" stackId="a" fill="#ff4d4f" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Airline wise claimable amount */}
        <Col xs={24} lg={12}>
          <Card 
            title="Airline wise claimable Amount(INR)"
            extra={
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Select size="small" defaultValue="Airlines" style={{ width: 80 }}>
                  <Option value="Airlines">Airlines</Option>
                </Select>
                <DownloadOutlined style={{ cursor: 'pointer' }} />
              </div>
            }
            style={{ 
              borderRadius: 12, 
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              height: 400 
            }}
          >
            <Table
              columns={airlineColumns}
              dataSource={airlineData}
              pagination={false}
              size="small"
              scroll={{ y: 280 }}
            />
          </Card>
        </Col>

        {/* Airlines pending files to GST */}
        <Col xs={24}>
          <Card 
            title="Airlines pending files to GST"
            extra={
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Text>Type:</Text>
                <Select size="small" defaultValue="Invoices Count" style={{ width: 120 }}>
                  <Option value="Invoices Count">Invoices Count</Option>
                </Select>
                <Text>Airlines:</Text>
                <Select size="small" defaultValue="All" style={{ width: 80 }}>
                  <Option value="All">All</Option>
                </Select>
              </div>
            }
            style={{ 
              borderRadius: 12, 
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              height: 300 
            }}
          >
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={pendingFilesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
