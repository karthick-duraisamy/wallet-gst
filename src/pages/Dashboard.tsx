import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Select, 
  Button, 
  Typography, 
  List, 
  Avatar,
  Tag,
  Switch,
  Tabs
} from 'antd';
import { 
  UserOutlined, 
  DollarOutlined, 
  FileTextOutlined, 
  CheckCircleOutlined,
  CalendarOutlined,
  FilterOutlined 
} from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';
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
import '../styles/Dashboard.scss';

const { Title, Text } = Typography;
const { Option } = Select;

const Dashboard: React.FC = () => {
  const { isDarkMode, translate } = useTheme();
  const [timePeriod, setTimePeriod] = useState("Last 7 Days");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedVendor, setSelectedVendor] = useState("ClearTrip");
  const [invoiceType, setInvoiceType] = useState("invoices-count");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedAirline, setSelectedAirline] = useState("All Airlines");
  const [selectedAirlineForAmount, setSelectedAirlineForAmount] = useState("All Airlines");
  const [selectedAirlineForPending, setSelectedAirlineForPending] = useState("All Airlines");

  // Mock data
  const invoiceStatusData = [
    {
      month: "Jan",
      Submitted: 150,
      "Pending to File": 30,
      "Invoice Missing": 15,
      "Additional in GSTR -2A": 10,
    },
    {
      month: "Feb",
      Submitted: 210,
      "Pending to File": 45,
      "Invoice Missing": 25,
      "Additional in GSTR -2A": 20,
    },
    {
      month: "Mar",
      Submitted: 180,
      "Pending to File": 25,
      "Invoice Missing": 35,
      "Additional in GSTR -2A": 30,
    },
  ];

  const airlineAmountData = [
    { airline: "IndiGo", amount: 150000, color: "#1890ff" },
    { airline: "SpiceJet", amount: 120000, color: "#52c41a" },
    { airline: "Air India", amount: 98000, color: "#faad14" },
    { airline: "Vistara", amount: 85000, color: "#f5222d" },
  ];

  const pendingFilesData = [
    { airline: "IndiGo", files: 25 },
    { airline: "SpiceJet", files: 18 },
    { airline: "Air India", files: 32 },
    { airline: "Vistara", files: 15 },
  ];

  const filterAirlineData = (data: any[], selectedAirline: string) => {
    if (selectedAirline === "All Airlines") return data;
    return data.filter(item => item.airline === selectedAirline);
  };

  const getInvoiceData = () => {
    const baseData = activeTab === "all" ? invoiceStatusData : 
      invoiceStatusData.map(item => ({
        ...item,
        Submitted: Math.floor(item.Submitted * 0.7),
        "Pending to File": Math.floor(item["Pending to File"] * 0.8),
        "Invoice Missing": Math.floor(item["Invoice Missing"] * 0.6),
        "Additional in GSTR -2A": Math.floor(item["Additional in GSTR -2A"] * 0.9),
      }));

    return invoiceType === "amount" ? 
      baseData.map(item => ({
        ...item,
        Submitted: item.Submitted * 1000,
        "Pending to File": item["Pending to File"] * 1000,
        "Invoice Missing": item["Invoice Missing"] * 1000,
        "Additional in GSTR -2A": item["Additional in GSTR -2A"] * 1000,
      })) : baseData;
  };

  return (
    <div className="dashboard-container" style={{ 
      background: isDarkMode ? '#141414' : '#f5f5f5', 
      minHeight: '100vh', 
      padding: '24px' 
    }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ color: '#5A4FCF', marginBottom: '8px' }}>
          {translate('dashboard')}
        </Title>
      </div>

      {/* Filter Section */}
      <Card style={{ 
        marginBottom: '24px', 
        background: isDarkMode ? '#1f1f1f' : '#fff',
        borderRadius: '12px',
        border: 'none',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div>
            <Text style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
              Time Period
            </Text>
            <Select
              value={timePeriod}
              onChange={setTimePeriod}
              style={{ width: 150 }}
              size="large"
            >
              <Option value="Last 7 Days">Last 7 Days</Option>
              <Option value="Last 30 Days">Last 30 Days</Option>
              <Option value="Last 90 Days">Last 90 Days</Option>
            </Select>
          </div>

          <div>
            <Text style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
              Month
            </Text>
            <Select
              value={selectedMonth}
              onChange={setSelectedMonth}
              style={{ width: 120 }}
              size="large"
            >
              <Option value="January">January</Option>
              <Option value="February">February</Option>
              <Option value="March">March</Option>
              <Option value="April">April</Option>
              <Option value="May">May</Option>
              <Option value="June">June</Option>
              <Option value="July">July</Option>
              <Option value="August">August</Option>
              <Option value="September">September</Option>
              <Option value="October">October</Option>
              <Option value="November">November</Option>
              <Option value="December">December</Option>
            </Select>
          </div>

          <div>
            <Text style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
              Travel Vendors
            </Text>
            <Select
              value={selectedVendor}
              onChange={setSelectedVendor}
              style={{ width: 140 }}
              size="large"
            >
              <Option value="ClearTrip">ClearTrip</Option>
              <Option value="MakeMyTrip">MakeMyTrip</Option>
              <Option value="Goibibo">Goibibo</Option>
              <Option value="Yatra">Yatra</Option>
            </Select>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ 
            background: isDarkMode ? '#1f1f1f' : '#fff',
            borderRadius: '12px',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <Text style={{ color: '#666', fontSize: '14px' }}>Total Agencies</Text>
                <div style={{ fontSize: '24px', fontWeight: '600', color: isDarkMode ? '#fff' : '#000' }}>
                  1,234
                </div>
              </div>
              <UserOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ 
            background: isDarkMode ? '#1f1f1f' : '#fff',
            borderRadius: '12px',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <Text style={{ color: '#666', fontSize: '14px' }}>Total Amount</Text>
                <div style={{ fontSize: '24px', fontWeight: '600', color: isDarkMode ? '#fff' : '#000' }}>
                  ₹45,67,890
                </div>
              </div>
              <DollarOutlined style={{ fontSize: '32px', color: '#52c41a' }} />
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ 
            background: isDarkMode ? '#1f1f1f' : '#fff',
            borderRadius: '12px',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <Text style={{ color: '#666', fontSize: '14px' }}>Total Invoices</Text>
                <div style={{ fontSize: '24px', fontWeight: '600', color: isDarkMode ? '#fff' : '#000' }}>
                  5,678
                </div>
              </div>
              <FileTextOutlined style={{ fontSize: '32px', color: '#faad14' }} />
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ 
            background: isDarkMode ? '#1f1f1f' : '#fff',
            borderRadius: '12px',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <Text style={{ color: '#666', fontSize: '14px' }}>Processed</Text>
                <div style={{ fontSize: '24px', fontWeight: '600', color: isDarkMode ? '#fff' : '#000' }}>
                  4,321
                </div>
              </div>
              <CheckCircleOutlined style={{ fontSize: '32px', color: '#f5222d' }} />
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Invoice Status Chart */}
        <Col xs={24} lg={12}>
          <Card
            title={translate("invoiceStatus")}
            style={{
              borderRadius: 12,
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: 450,
            }}
            extra={
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Button
                    type={activeTab === "all" ? "primary" : "default"}
                    size="small"
                    onClick={() => setActiveTab("all")}
                    style={{
                      backgroundColor: activeTab === "all" ? "#5A4FCF" : "transparent",
                      borderColor: activeTab === "all" ? "#5A4FCF" : "#d9d9d9",
                      color: activeTab === "all" ? "#fff" : "#666"
                    }}
                  >
                    All
                  </Button>
                  <Button
                    type={activeTab === "airlines" ? "primary" : "default"}
                    size="small"
                    onClick={() => setActiveTab("airlines")}
                    style={{
                      backgroundColor: activeTab === "airlines" ? "#5A4FCF" : "transparent",
                      borderColor: activeTab === "airlines" ? "#5A4FCF" : "#d9d9d9",
                      color: activeTab === "airlines" ? "#fff" : "#666"
                    }}
                  >
                    Airlines
                  </Button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Text style={{ fontSize: "12px" }}>Type:</Text>
                  <Select
                    value={invoiceType}
                    onChange={setInvoiceType}
                    size="small"
                    style={{ width: 140 }}
                  >
                    <Option value="invoices-count">Invoices Count</Option>
                    <Option value="amount">Amount</Option>
                  </Select>
                </div>
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={getInvoiceData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Submitted" stackId="a" fill="#1890ff" />
                <Bar dataKey="Pending to File" stackId="a" fill="#52c41a" />
                <Bar dataKey="Invoice Missing" stackId="a" fill="#faad14" />
                <Bar dataKey="Additional in GSTR -2A" stackId="a" fill="#f5222d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Airline Wise Claimable Amount */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Airline Wise Claimable Amount (INR)</span>
                <Select
                  value={selectedAirlineForAmount}
                  onChange={setSelectedAirlineForAmount}
                  size="small"
                  style={{ width: 140 }}
                >
                  <Option value="All Airlines">All Airlines</Option>
                  <Option value="IndiGo">IndiGo</Option>
                  <Option value="SpiceJet">SpiceJet</Option>
                  <Option value="Air India">Air India</Option>
                  <Option value="Vistara">Vistara</Option>
                </Select>
              </div>
            }
            style={{
              borderRadius: 12,
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: 450,
            }}
          >
            <List
              dataSource={filterAirlineData(airlineAmountData, selectedAirlineForAmount)}
              renderItem={(item) => (
                <List.Item style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: item.color }}>{item.airline.charAt(0)}</Avatar>}
                    title={<span style={{ fontWeight: '500' }}>{item.airline}</span>}
                    description={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '16px', fontWeight: '600', color: '#52c41a' }}>
                          ₹{item.amount.toLocaleString()}
                        </span>
                        <Tag color="green">Active</Tag>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Airlines Pending Files to GST */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Airlines Pending Files to GST</span>
                <Select
                  value={selectedAirlineForPending}
                  onChange={setSelectedAirlineForPending}
                  size="small"
                  style={{ width: 140 }}
                >
                  <Option value="All Airlines">All Airlines</Option>
                  <Option value="IndiGo">IndiGo</Option>
                  <Option value="SpiceJet">SpiceJet</Option>
                  <Option value="Air India">Air India</Option>
                  <Option value="Vistara">Vistara</Option>
                </Select>
              </div>
            }
            style={{
              borderRadius: 12,
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: 450,
            }}
          >
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={filterAirlineData(pendingFilesData, selectedAirlineForPending)}
                  dataKey="files"
                  nameKey="airline"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ name, files }) => `${name}: ${files}`}
                >
                  {filterAirlineData(pendingFilesData, selectedAirlineForPending).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={airlineAmountData[index]?.color || '#8884d8'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Recent Activities */}
        <Col xs={24} lg={12}>
          <Card
            title="Recent Activities"
            style={{
              borderRadius: 12,
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: 450,
            }}
          >
            <List
              dataSource={[
                { title: 'Invoice INV001 uploaded', time: '2 hours ago', status: 'success' },
                { title: 'Reconciliation completed for March', time: '4 hours ago', status: 'info' },
                { title: 'GST filing pending', time: '1 day ago', status: 'warning' },
                { title: 'New agency registered', time: '2 days ago', status: 'success' },
                { title: 'System maintenance scheduled', time: '3 days ago', status: 'info' },
              ]}
              renderItem={(item) => (
                <List.Item style={{ padding: '12px 0' }}>
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        style={{ 
                          backgroundColor: item.status === 'success' ? '#52c41a' : 
                                           item.status === 'warning' ? '#faad14' : '#1890ff' 
                        }}
                      >
                        {item.status === 'success' ? '✓' : item.status === 'warning' ? '!' : 'i'}
                      </Avatar>
                    }
                    title={<span style={{ fontSize: '14px' }}>{item.title}</span>}
                    description={<span style={{ fontSize: '12px', color: '#666' }}>{item.time}</span>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;