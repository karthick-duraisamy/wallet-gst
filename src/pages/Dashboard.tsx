import React, { useState } from "react";
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
  Statistic,
} from "antd";
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
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ReferenceLine,
} from "recharts";
import {
  DownloadOutlined,
  InfoCircleOutlined,
  MailOutlined,
  WhatsAppOutlined,
  BellOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/Dashboard.scss";

const { Title, Text } = Typography;
const { Option } = Select;

const Dashboard: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState("fy-2023-2024");
  const [month, setMonth] = useState("apr");
  const [travelVendor, setTravelVendor] = useState("makemytrip");
  const [invoiceType, setInvoiceType] = useState("invoices-count");
  const [invoiceTab, setInvoiceTab] = useState("all");
  const [airlineFilter, setAirlineFilter] = useState("all");
  const [pendingFilesType, setPendingFilesType] = useState("invoices-count");
  const [pendingFilesAirline, setPendingFilesAirline] = useState("all");
  const { translate, isDarkMode } = useTheme();

  // Overview summary data
  const overviewData = [
    {
      title: "All Travel History",
      backgroundColor: "#4CAF50",
      sections: [
        { label: "Bookings", value: 0, backgroundColor: "#4CAF50" },
        { label: "Cancellations", value: 0, backgroundColor: "#2E7D32" },
      ],
    },
    {
      title: "Airline Invoices",
      backgroundColor: "#3F51B5",
      sections: [
        { label: "Available", value: 0, backgroundColor: "#3F51B5" },
        { label: "GST - Filed", value: 0, backgroundColor: "#1A237E" },
        {
          label: "Pending to File",
          value: 0,
          backgroundColor: "#3F51B5",
          variant: "light",
        },
      ],
    },
    {
      title: "All Invoices",
      backgroundColor: "#9C27B0",
      sections: [
        { label: "Available", value: 0, backgroundColor: "#9C27B0" },
        { label: "GST - Filed", value: 0, backgroundColor: "#4A148C" },
        {
          label: "Pending to File",
          value: 0,
          backgroundColor: "#9C27B0",
          variant: "light",
        },
      ],
    },
    {
      title: "Net Claimable Amount(INR)",
      backgroundColor: "#F44336",
      sections: [
        { label: "Airlines", value: 0, backgroundColor: "#F44336" },
        { label: "All", value: 0, backgroundColor: "#C62828" },
      ],
    },
  ];

  // Chart data - base data for all invoices
  const baseInvoiceStatusData = [
    {
      month: "Apr",
      Submitted: 180,
      "Pending to File": 40,
      "Invoice Missing": 20,
      "Additional in GSTR -2A": 10,
    },
    {
      month: "May",
      Submitted: 200,
      "Pending to File": 35,
      "Invoice Missing": 25,
      "Additional in GSTR -2A": 15,
    },
    {
      month: "Jun",
      Submitted: 220,
      "Pending to File": 30,
      "Invoice Missing": 30,
      "Additional in GSTR -2A": 20,
    },
    {
      month: "Jul",
      Submitted: 190,
      "Pending to File": 45,
      "Invoice Missing": 15,
      "Additional in GSTR -2A": 25,
    },
    {
      month: "Aug",
      Submitted: 210,
      "Pending to File": 25,
      "Invoice Missing": 35,
      "Additional in GSTR -2A": 10,
    },
    {
      month: "Sep",
      Submitted: 180,
      "Pending to File": 50,
      "Invoice Missing": 20,
      "Additional in GSTR -2A": 30,
    },
    {
      month: "Oct",
      Submitted: 240,
      "Pending to File": 20,
      "Invoice Missing": 25,
      "Additional in GSTR -2A": 15,
    },
    {
      month: "Nov",
      Submitted: 200,
      "Pending to File": 40,
      "Invoice Missing": 30,
      "Additional in GSTR -2A": 20,
    },
    {
      month: "Dec",
      Submitted: 220,
      "Pending to File": 35,
      "Invoice Missing": 20,
      "Additional in GSTR -2A": 25,
    },
    {
      month: "Jan",
      Submitted: 190,
      "Pending to File": 30,
      "Invoice Missing": 40,
      "Additional in GSTR -2A": 15,
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

  // Airlines-only data (reduced values to simulate airline-specific data)
  const airlinesInvoiceStatusData = [
    {
      month: "Apr",
      Submitted: 120,
      "Pending to File": 28,
      "Invoice Missing": 14,
      "Additional in GSTR -2A": 7,
    },
    {
      month: "May",
      Submitted: 140,
      "Pending to File": 25,
      "Invoice Missing": 18,
      "Additional in GSTR -2A": 10,
    },
    {
      month: "Jun",
      Submitted: 154,
      "Pending to File": 21,
      "Invoice Missing": 21,
      "Additional in GSTR -2A": 14,
    },
    {
      month: "Jul",
      Submitted: 133,
      "Pending to File": 32,
      "Invoice Missing": 11,
      "Additional in GSTR -2A": 18,
    },
    {
      month: "Aug",
      Submitted: 147,
      "Pending to File": 18,
      "Invoice Missing": 25,
      "Additional in GSTR -2A": 7,
    },
    {
      month: "Sep",
      Submitted: 126,
      "Pending to File": 35,
      "Invoice Missing": 14,
      "Additional in GSTR -2A": 21,
    },
    {
      month: "Oct",
      Submitted: 168,
      "Pending to File": 14,
      "Invoice Missing": 18,
      "Additional in GSTR -2A": 11,
    },
    {
      month: "Nov",
      Submitted: 140,
      "Pending to File": 28,
      "Invoice Missing": 21,
      "Additional in GSTR -2A": 14,
    },
    {
      month: "Dec",
      Submitted: 154,
      "Pending to File": 25,
      "Invoice Missing": 14,
      "Additional in GSTR -2A": 18,
    },
    {
      month: "Jan",
      Submitted: 133,
      "Pending to File": 21,
      "Invoice Missing": 28,
      "Additional in GSTR -2A": 11,
    },
    {
      month: "Feb",
      Submitted: 147,
      "Pending to File": 32,
      "Invoice Missing": 18,
      "Additional in GSTR -2A": 14,
    },
    {
      month: "Mar",
      Submitted: 126,
      "Pending to File": 18,
      "Invoice Missing": 25,
      "Additional in GSTR -2A": 21,
    },
  ];

  // Get filtered data based on invoice tab and type
  const getInvoiceStatusData = () => {
    const rawData =
      invoiceTab === "all" ? baseInvoiceStatusData : airlinesInvoiceStatusData;

    if (invoiceType === "amount") {
      // Convert to amount values (multiply by approximate amount per invoice)
      return rawData.map((item) => ({
        month: item.month,
        Submitted: item.Submitted * 5000,
        "Pending to File": item["Pending to File"] * 5000,
        "Invoice Missing": item["Invoice Missing"] * 5000,
        "Additional in GSTR -2A": item["Additional in GSTR -2A"] * 5000,
      }));
    }

    return rawData;
  };

  const invoiceStatusData = getInvoiceStatusData();

  // Recent failures data
  const recentFailures = [];

  // Airline data
  const airlineData = [
    {
      key: "1",
      airline: "SG",
      code: "6132",
      bookings: "1024 tickets",
      cancellations: "11364",
      amount: "INR -5232",
      color: "#ff4d4f",
    },
    {
      key: "2",
      airline: "AI",
      code: "324",
      bookings: "324 tickets",
      cancellations: "1032",
      amount: "INR -708",
      color: "#722ed1",
    },
    {
      key: "3",
      airline: "6E",
      code: "529",
      bookings: "529 tickets",
      cancellations: "1356",
      amount: "INR -1428",
      color: "#1890ff",
    },
    {
      key: "4",
      airline: "UK",
      code: "168",
      bookings: "168 tickets",
      cancellations: "312",
      amount: "INR -144",
      color: "#fa8c16",
    },
  ];

  const airlineColumns = [
    {
      title: "Airline code",
      dataIndex: "airline",
      key: "airline",
      render: (text: string, record: any) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 16,
              height: 16,
              backgroundColor: record.color,
              borderRadius: 2,
            }}
          />
          <Text strong>{text}</Text>
        </div>
      ),
    },
    {
      title: "Bookings/Claim",
      dataIndex: "code",
      key: "code",
      render: (text: string, record: any) => (
        <div>
          <div style={{ fontWeight: 600 }}>{text}</div>
          <div style={{ fontSize: 12, color: "#666" }}>{record.bookings}</div>
        </div>
      ),
    },
    {
      title: "Cancellations/Claim",
      dataIndex: "cancellations",
      key: "cancellations",
      render: (text: string) => (
        <div>
          <div style={{ fontWeight: 600 }}>{text}</div>
          <div style={{ fontSize: 12, color: "#666" }}>1356 tickets</div>
        </div>
      ),
    },
    {
      title: "Net Claimable",
      dataIndex: "amount",
      key: "amount",
      render: (text: string) => (
        <Text
          style={{
            fontWeight: 600,
            color: text.includes("-") ? "#ff4d4f" : "#52c41a",
          }}
        >
          {text}
        </Text>
      ),
    },
  ];

  // Pending files data - base data for all airlines
  const basePendingFilesData = [
    { month: "SG", value: 8 },
    { month: "IN", value: 10 },
    { month: "FZ", value: 4 },
    { month: "AI", value: 6 },
    { month: "6E", value: 12 },
    { month: "UK", value: 3 },
  ];

  // Get filtered pending files data
  const getPendingFilesData = () => {
    let filteredData =
      pendingFilesAirline === "all"
        ? basePendingFilesData
        : basePendingFilesData.filter(
            (item) =>
              item.month.toLowerCase() === pendingFilesAirline.toLowerCase(),
          );

    if (pendingFilesType === "amount") {
      return filteredData.map((item) => ({
        ...item,
        value: item.value * 2500, // Convert to amount
      }));
    }

    return filteredData;
  };

  const pendingFilesData = getPendingFilesData();

  return (
    <div className="slide-up cls-dashboard-container">
      {/* Header */}
      <div className="cls-dashboard-header">
        <Title level={3} className="cls-dashboard-title">
          {translate("dashboard")}
        </Title>
      </div>

      {/* Filter Section */}
      <Card className="cls-filter-section">
        <Row gutter={[16, 16]} align="middle">
          <Col>
            <div className="cls-filter-item">
              <Text className="cls-filter-label">Time Period:</Text>
              <Select
                value={timePeriod}
                onChange={setTimePeriod}
                style={{ width: 150 }}
                placeholder="Select"
              >
                <Option value="fy-2016-2017">FY 2016-2017</Option>
                <Option value="fy-2017-2018">FY 2017-2018</Option>
                <Option value="fy-2018-2019">FY 2018-2019</Option>
                <Option value="fy-2019-2020">FY 2019-2020</Option>
                <Option value="fy-2020-2021">FY 2020-2021</Option>
              </Select>
            </div>
          </Col>
          <Col>
            <div className="cls-filter-item">
              <Text className="cls-filter-label">Month:</Text>
              <Select
                value={month}
                onChange={setMonth}
                style={{ width: 120 }}
                placeholder="Select"
              >
                <Option value="apr">Apr</Option>
                <Option value="may">May</Option>
                <Option value="jun">Jun</Option>
                <Option value="jul">Jul</Option>
                <Option value="aug">Aug</Option>
                <Option value="sep">Sep</Option>
                <Option value="oct">Oct</Option>
                <Option value="nov">Nov</Option>
                <Option value="dec">Dec</Option>
                <Option value="jan">Jan</Option>
                <Option value="feb">Feb</Option>
                <Option value="mar">Mar</Option>
              </Select>
            </div>
          </Col>
          <Col>
            <div className="cls-filter-item">
              <Text className="cls-filter-label">Travel Vendors:</Text>
              <Select
                value={travelVendor}
                onChange={setTravelVendor}
                style={{ width: 150 }}
                placeholder="Select"
              >
                <Option value="atyourprice">AtYourPrice</Option>
                <Option value="sotc">SOTC</Option>
                <Option value="fcm">FCM</Option>
                <Option value="makemytrip">Make My Trip</Option>
                <Option value="cleartrip">ClearTrip</Option>
                <Option value="goibibo">Goibibo</Option>
              </Select>
            </div>
          </Col>
          <Col flex="auto" style={{ display: "flex", justifyContent: "end" }}>
            <Button type="primary" className="cls-apply-button">
              Apply →
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Overall Summary Section */}
      <div className="cls-overall-summary">
        <Title level={4} className="cls-summary-title">
          {translate("overallSummary")}
        </Title>
        <Row gutter={[16, 16]} className="cls-overview-grid">
          {overviewData.map((item, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <div className="cls-overview-card">
                {/* Header */}
                <div className="cls-card-header">
                  <Text className="cls-card-title">
                    {item.title}
                    {(item.title.includes("Amount") ||
                      item.title.includes("Airlines")) && (
                      <InfoCircleOutlined className="cls-info-icon" />
                    )}
                  </Text>
                </div>

                {/* Sections */}
                <div className="cls-card-sections">
                  {item.sections.map((section, sectionIndex) => (
                    <div
                      key={sectionIndex}
                      className={`cls-card-section ${section.variant === "light" ? "cls-light-variant" : ""}`}
                      style={{
                        backgroundColor:
                          section.variant === "light"
                            ? `#57c796`
                            : section.backgroundColor,
                        color:
                          section.variant === "light"
                            ? section.backgroundColor
                            : "white",
                      }}
                    >
                      <div className="cls-section-content">
                        <Text className="cls-section-label">
                          {section.label}
                        </Text>
                        <Text className="cls-section-value">
                          {section.value}
                        </Text>
                      </div>
                      {sectionIndex < item.sections.length - 1 && (
                        <div className="cls-section-divider"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Recent failures section */}
      {/* <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col xs={24} lg={16}>
          <Card 
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 600 }}>{translate('recentFailures')}</Text>
                <Button type="link" icon={<EyeOutlined />} style={{ color: '#1890ff' }}>
                  {translate('viewAllFailures')}
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
                <Text style={{ fontSize: 16, color: '#999' }}>{translate('noDataAvailable')}</Text>
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
                <Text style={{ fontSize: 16, fontWeight: 600 }}>{translate('topSentNotifications')}</Text>
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
                <Text style={{ fontSize: 14, color: '#666' }}>{translate('aiMailAgent')}</Text>
              </div>
              <Button type="primary" style={{ marginBottom: 20 }}>
                {translate('pushNotification')}
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
      </Row> */}

      <Row gutter={[24, 24]}>
        {/* Invoice Status Chart */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{translate("invoiceStatus")}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      background: "#f0f0f0",
                      borderRadius: "6px",
                      padding: "4px",
                      gap: "2px",
                    }}
                  >
                    <Button
                      size="small"
                      type={invoiceTab === "all" ? "primary" : "text"}
                      onClick={() => setInvoiceTab("all")}
                      style={{
                        borderRadius: "4px",
                        border: "none",
                        background:
                          invoiceTab === "all" ? "#1890ff" : "transparent",
                        color: invoiceTab === "all" ? "white" : "#666",
                        minWidth: "50px",
                      }}
                    >
                      All
                    </Button>
                    <Button
                      size="small"
                      type={invoiceTab === "airlines" ? "primary" : "text"}
                      onClick={() => setInvoiceTab("airlines")}
                      style={{
                        borderRadius: "4px",
                        border: "none",
                        background:
                          invoiceTab === "airlines" ? "#1890ff" : "transparent",
                        color: invoiceTab === "airlines" ? "white" : "#666",
                        minWidth: "60px",
                      }}
                    >
                      Airlines
                    </Button>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
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
              </div>
            }
            style={{
              borderRadius: 12,
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: 400,
            }}
          >
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={invoiceStatusData}>
                <defs>
                  <linearGradient
                    id="submittedGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#1890ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1890ff" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient
                    id="pendingGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#52c41a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#52c41a" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="1 1" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#666" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#666" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e8e8e8",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <ReferenceLine
                  y={200}
                  stroke="#52c41a"
                  strokeDasharray="3 3"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="Submitted"
                  stroke="#1890ff"
                  strokeWidth={3}
                  dot={{ fill: "#1890ff", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#1890ff" }}
                />
                <Line
                  type="monotone"
                  dataKey="Pending to File"
                  stroke="#52c41a"
                  strokeWidth={3}
                  dot={{ fill: "#52c41a", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#52c41a" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Airline wise claimable amount */}
        <Col xs={24} lg={12}>
          <Card
            title={translate("airlineWiseClaimable")}
            extra={
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Text style={{ fontSize: "12px" }}>Airline:</Text>
                <Select
                  value={airlineFilter}
                  onChange={setAirlineFilter}
                  size="small"
                  style={{ width: 100 }}
                >
                  <Option value="all">All</Option>
                  <Option value="sg">SG</Option>
                  <Option value="ai">AI</Option>
                  <Option value="6e">6E</Option>
                  <Option value="uk">UK</Option>
                </Select>
              </div>
            }
            style={{
              borderRadius: 12,
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: 400,
            }}
          >
            <Table
              columns={airlineColumns}
              dataSource={
                airlineFilter === "all"
                  ? airlineData
                  : airlineData.filter(
                      (item) =>
                        item.airline.toLowerCase() ===
                        airlineFilter.toLowerCase(),
                    )
              }
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        {/* Airlines pending files to GST */}
        <Col xs={24}>
          <Card
            title={translate("airlinesPendingFiles")}
            extra={
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Text>Type:</Text>
                <Select
                  value={pendingFilesType}
                  onChange={setPendingFilesType}
                  size="small"
                  style={{ width: 120 }}
                >
                  <Option value="invoices-count">Invoices Count</Option>
                  <Option value="amount">Amount</Option>
                </Select>
                <Text>Airlines:</Text>
                <Select
                  value={pendingFilesAirline}
                  onChange={setPendingFilesAirline}
                  size="small"
                  style={{ width: 80 }}
                >
                  <Option value="all">All</Option>
                  <Option value="sg">SG</Option>
                  <Option value="ai">AI</Option>
                  <Option value="6e">6E</Option>
                  <Option value="uk">UK</Option>
                </Select>
              </div>
            }
            style={{
              borderRadius: 12,
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: 300,
            }}
          >
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={pendingFilesData}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1890ff" stopOpacity={0.4} />
                    <stop offset="25%" stopColor="#1890ff" stopOpacity={0.3} />
                    <stop offset="75%" stopColor="#1890ff" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1890ff" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="1 1" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#666" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#666" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e8e8e8",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#1890ff"
                  strokeWidth={3}
                  fill="url(#areaGradient)"
                  dot={{ fill: "#1890ff", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#1890ff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
