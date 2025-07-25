
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
  Divider
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
import { DownloadOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const Dashboard: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState('select');
  const [travelVendor, setTravelVendor] = useState('select');

  // Status cards data
  const statusCards = [
    {
      title: 'All Travel History',
      items: [
        { label: 'Bookings', value: 9, color: '#52c41a' },
        { label: 'Cancellations', value: 0, color: '#1890ff' }
      ]
    },
    {
      title: 'Airline Invoices',
      items: [
        { label: 'Available', value: 0, color: '#1890ff' },
        { label: 'GST - Filed', value: 0, color: '#722ed1' },
        { label: 'Pending to File', value: 0, color: '#fa8c16' }
      ]
    },
    {
      title: 'All Invoices',
      items: [
        { label: 'Available', value: 0, color: '#1890ff' },
        { label: 'GST - Filed', value: 0, color: '#722ed1' },
        { label: 'Pending to File', value: 0, color: '#fa8c16' }
      ]
    },
    {
      title: 'Net Claimable Amount(INR)',
      items: [
        { label: 'Airlines', value: 364, color: '#ff4d4f' },
        { label: 'All', value: 30, color: '#ff7875' }
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
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0, color: '#1890ff' }}>GST dashboard</Title>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
        <div>
          <Text style={{ marginRight: 8 }}>Time period:</Text>
          <Select 
            value={timePeriod} 
            onChange={setTimePeriod}
            style={{ width: 120 }}
          >
            <Option value="select">select</Option>
            <Option value="monthly">Monthly</Option>
            <Option value="quarterly">Quarterly</Option>
            <Option value="yearly">Yearly</Option>
          </Select>
        </div>
        <div>
          <Text style={{ marginRight: 8 }}>Travel Vendors:</Text>
          <Select 
            value={travelVendor} 
            onChange={setTravelVendor}
            style={{ width: 120 }}
          >
            <Option value="select">select</Option>
            <Option value="all">All Vendors</Option>
          </Select>
        </div>
        <Button type="primary" style={{ marginLeft: 16 }}>
          Apply
        </Button>
      </div>

      {/* Status Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        {statusCards.map((card, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card 
              title={card.title}
              size="small"
              style={{ height: '100%' }}
              headStyle={{ fontSize: 12, fontWeight: 600 }}
            >
              {card.items.map((item, itemIndex) => (
                <div key={itemIndex} style={{ marginBottom: 8 }}>
                  <div 
                    style={{ 
                      padding: '8px 12px',
                      backgroundColor: item.color,
                      color: 'white',
                      borderRadius: 4,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: 12
                    }}
                  >
                    <span>{item.label}</span>
                    <span style={{ fontWeight: 600 }}>{item.value}</span>
                  </div>
                </div>
              ))}
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]}>
        {/* Invoice Status Chart */}
        <Col xs={24} lg={12}>
          <Card 
            title="Invoice status"
            extra={<DownloadOutlined style={{ cursor: 'pointer' }} />}
            style={{ height: 400 }}
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
            style={{ height: 400 }}
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
            style={{ height: 300 }}
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
