import React, { useState, useEffect } from "react";
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
  LeftOutlined,
  RightOutlined,
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
  const [useNewCards, setUseNewCards] = useState(() => {
    const saved = localStorage.getItem("dashboardCardDesign");
    // Default to old design if no value is set
    if (saved === null) {
      localStorage.setItem("dashboardCardDesign", "old");
      return false;
    }
    return saved === "old";
  });

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("dashboardCardDesign");
      setUseNewCards(saved === "new");
    };

    window.addEventListener("storage", handleStorageChange);

    // Also check for manual updates within the same tab
    const checkInterval = setInterval(() => {
      const saved = localStorage.getItem("dashboardCardDesign");
      const currentSetting = saved === "new";
      if (currentSetting !== useNewCards) {
        setUseNewCards(currentSetting);
      }
    }, 100);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(checkInterval);
    };
  }, [useNewCards]);

  // Overview summary data
  const overviewData = [
    {
      title: "All Travel History",
      backgroundColor: "#6366F1",
      carouselKey: "travelHistory",
      sections: [
        { label: "Bookings", value: 10, backgroundColor: "#6366F1" },
        { label: "Cancellations", value: 2, backgroundColor: "#4F46E5" },
      ],
    },
    {
      title: "Airline Invoices",
      backgroundColor: "#06B6D4",
      carouselKey: "airlineInvoices",
      sections: [
        { label: "Available", value: 100, backgroundColor: "#06B6D4" },
        { label: "GST Filed", value: 60, backgroundColor: "#0891B2" },
        {
          label: "Pending File",
          value: 40,
          backgroundColor: "#06B6D4",
          variant: "light",
        },
      ],
    },
    {
      title: "All Invoices",
      backgroundColor: "#8B5CF6",
      carouselKey: "allInvoices",
      sections: [
        { label: "Available", value: 80, backgroundColor: "#8B5CF6" },
        { label: "GST - Filed", value: 60, backgroundColor: "#7C3AED" },
        {
          label: "Pending File",
          value: 50,
          backgroundColor: "#8B5CF6",
          variant: "light",
        },
      ],
    },
    {
      title: "Net Claimable Amount(INR)",
      backgroundColor: "#F59E0B",
      carouselKey: "netClaimable",
      sections: [
        { label: "Airlines", value: 60, backgroundColor: "#F59E0B" },
        { label: "All", value: 30, backgroundColor: "#D97706" },
      ],
    },
  ];

  const initialCarouselStates: { [key: string]: number } = {};
  overviewData.forEach((item) => {
    initialCarouselStates[item.carouselKey] = 0;
  });

  const [carouselStates, setCarouselStates] = useState(initialCarouselStates);

  const handleCarouselNext = (carouselKey: string, sectionLength: number) => {
    setCarouselStates((prev) => ({
      ...prev,
      [carouselKey]: Math.min((prev[carouselKey] || 0) + 1, sectionLength - 1),
    }));
  };

  const handleCarouselPrev = (carouselKey: string, sectionLength: number) => {
    setCarouselStates((prev) => ({
      ...prev,
      [carouselKey]: Math.max((prev[carouselKey] || 0) - 1, 0),
    }));
  };

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

  // Calculate visible items for carousel (max 3)
  const getVisibleItems = (sections: any[]) => Math.min(3, sections.length);

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
          {overviewData.map((item, index) => {
            const currentIndex =
              carouselStates[item.carouselKey as keyof typeof carouselStates] ||
              0;
            const visibleItems = getVisibleItems(item.sections);
            const startIndex = Math.max(
              0,
              Math.min(currentIndex, item.sections.length - visibleItems),
            );
            const visibleSections = item.sections.slice(
              startIndex,
              startIndex + visibleItems,
            );

            return (
              <Col xs={24} sm={12} lg={6} key={index}>
                {useNewCards ? (
                  // New Card Design
                  <div className="cls-new-card">
                    {/* Header */}
                    <div className="cls-new-card-header">
                      <Text className="cls-new-card-title">
                        {item.title}
                        {(item.title.includes("Amount") ||
                          item.title.includes("Airlines")) && (
                          <InfoCircleOutlined className="cls-info-icon" />
                        )}
                      </Text>
                    </div>

                    {/* Card Content */}
                    <div className="cls-new-card-content">
                      {visibleSections.map((section, sectionIndex) => (
                        <div
                          key={sectionIndex}
                          className="cls-new-card-item"
                          style={{
                            backgroundColor: `rgba(
                                ${parseInt(section.backgroundColor.slice(1, 3), 16)},
                                ${parseInt(section.backgroundColor.slice(3, 5), 16)},
                                ${parseInt(section.backgroundColor.slice(5, 7), 16)},
                                0.08
                              )`, // Light, soft background for all variants
                            color: section.backgroundColor, // Keep text color from original
                          }}
                        >
                          <div className="cls-new-item-content">
                            <Text className="cls-new-item-label">
                              {section.label}
                            </Text>
                            <Text className="cls-new-item-value">
                              {section.value}
                            </Text>
                          </div>
                        </div>
                      ))}

                      {/* Navigation Arrows */}
                      {item.sections.length > visibleItems && (
                        <div className="cls-new-card-navigation">
                          {startIndex > 0 && (
                            <button
                              className="cls-new-nav-arrow cls-nav-left"
                              onClick={() =>
                                handleCarouselPrev(
                                  item.carouselKey,
                                  item.sections.length,
                                )
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="15,18 9,12 15,6"></polyline>
                              </svg>
                            </button>
                          )}

                          {startIndex + visibleItems < item.sections.length && (
                            <button
                              className="cls-new-nav-arrow cls-nav-right"
                              onClick={() =>
                                handleCarouselNext(
                                  item.carouselKey,
                                  item.sections.length,
                                )
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="9,18 15,12 9,6"></polyline>
                              </svg>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  // Old Card Design (like reference image)
                  <div className="cls-old-overview-card">
                    {/* Header */}
                    <div className="cls-old-card-header">
                      <Text className="cls-old-card-title">
                        {item.title}
                        {(item.title.includes("Amount") ||
                          item.title.includes("Airlines")) && (
                          <InfoCircleOutlined className="cls-info-icon" />
                        )}
                      </Text>
                    </div>

                    {/* Card Sections Display */}
                    <div className="cls-old-card-sections">
                      {item.sections.map((section, sectionIndex) => (
                        <div
                          key={sectionIndex}
                          className="cls-old-card-section"
                          style={{
                            backgroundColor: section.backgroundColor,
                            flex: 1,
                          }}
                        >
                          <div className="cls-old-section-content">
                            <Text className="cls-old-section-label">
                              {section.label}
                            </Text>
                            <Text className="cls-old-section-value">
                              {section.value}
                            </Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Col>
            );
          })}
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
                          invoiceTab === "all" ? "#4c1d95" : "transparent",
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
                          invoiceTab === "airlines" ? "#4c1d95" : "transparent",
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
              <BarChart data={invoiceStatusData} barCategoryGap="20%">
                <CartesianGrid
                  strokeDasharray="1 1"
                  stroke="#f0f0f0"
                  vertical={false}
                />
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
                <Bar
                  dataKey="Submitted"
                  fill="#1890ff"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="Pending to File"
                  fill="#52c41a"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="Invoice Missing"
                  fill="#fa8c16"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="Additional in GSTR -2A"
                  fill="#f5222d"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
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
              <BarChart data={pendingFilesData}>
                <CartesianGrid
                  strokeDasharray="1 1"
                  stroke="#f0f0f0"
                  vertical={false}
                />
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
                <Bar
                  dataKey="value"
                  fill="#1890ff"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
