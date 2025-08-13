import React, { useState, useEffect } from "react";
import { Row, Col,
  Card,
  Select,
  Button,
  Table,
  Typography,
} from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/Dashboard.scss";
import Filter from '../components/Filters/Filters'

const { Title, Text } = Typography;
// const { Option } = Select;

const Dashboard: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState("fy-2023-2024");
  const [month, setMonth] = useState("apr");
  const [travelVendor, setTravelVendor] = useState("makemytrip");
  const [invoiceType, setInvoiceType] = useState("invoices-count");
  const [invoiceTab, setInvoiceTab] = useState("all");
  const [airlineFilter, setAirlineFilter] = useState("all");
  const [pendingFilesType, setPendingFilesType] = useState("invoices-count");
  const [pendingFilesAirline, setPendingFilesAirline] = useState("all");

  // Dynamic filter change handler
  const handleFilterChange = (values: Record<string, any>) => {
    Object.keys(values).forEach(key => {
      switch (key) {
        case "Time period":
          setTimePeriod(values[key]);
          break;
        case "Month":
          setMonth(values[key]);
          break;
        case "vendorName":
          setTravelVendor(values[key]);
          break;
        case "Type":
          setInvoiceType(values[key]);
          break;
        case "Airline":
          setAirlineFilter(values[key]);
          break;
      }
    });
  };

  // Separate handler for pending files filters
  const handlePendingFilesFilterChange = (values: Record<string, any>) => {
    Object.keys(values).forEach(key => {
      switch (key) {
        case "Type":
          setPendingFilesType(values[key]);
          break;
        case "Airline":
          setPendingFilesAirline(values[key]);
          break;
      }
    });
  };
  const { translate } = useTheme();
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
        { label: "Bookings", value: 1000, backgroundColor: "#6366F1" },
        { label: "Cancellations", value: 2000, backgroundColor: "#4F46E5" },
      ],
      class: "cls-travel-history"
    },
    {
      title: "Airline Invoices",
      backgroundColor: "#06B6D4",
      carouselKey: "airlineInvoices",
      sections: [
        { label: "Available", value: 3000, backgroundColor: "#06B6D4" },
        { label: "GST Filed", value: 6000, backgroundColor: "#0891B2" },
        {
          label: "Pending File",
          value: 40,
          backgroundColor: "#06B6D4",
          variant: "light",
        },
      ],
      class: "cls-airline-invoice"
    },
    {
      title: "All Invoices",
      backgroundColor: "#8B5CF6",
      carouselKey: "allInvoices",
      sections: [
        { label: "Available", value: 80000, backgroundColor: "#8B5CF6" },
        { label: "GST - Filed", value: 6000, backgroundColor: "#7C3AED" },
        {
          label: "Pending File",
          value: 50,
          backgroundColor: "#8B5CF6",
          variant: "light",
        },
      ],
      class: "cls-invoices"
    },
    {
      title: "Net Claimable Amount(INR)",
      backgroundColor: "#F59E0B",
      carouselKey: "netClaimable",
      sections: [
        { label: "Airlines", value: 90000, backgroundColor: "#F59E0B" },
        { label: "All", value: 3000, backgroundColor: "#D97706" },
      ],
      class: "cls-netClaim"
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

    if (invoiceType === "Amount" || invoiceType === "amount") {
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

  // Airline data
  const airlineData = [
    {
      key: "1",
      airline: "https://ui.cltpstatic.com/images/logos/air-logos/SG.png",
      airlineCode: 'SG',
      code: "6132",
      bookings: "1024 tickets",
      cancellations: "11364",
      amount: "₹ 5232",
      color: "#ff4d4f",
    },
    {
      key: "2",
      airline: "https://ui.cltpstatic.com/images/logos/air-logos/AI.png",
      airlineCode: 'AI',
      code: "324",
      bookings: "324 tickets",
      cancellations: "1032",
      amount: "₹ 708",
      color: "#722ed1",
    },
    {
      key: "3",
      airline: "https://ui.cltpstatic.com/images/logos/air-logos/6E.png",
      airlineCode: '6E',
      code: "529",
      bookings: "529 tickets",
      cancellations: "1356",
      amount: "₹ 1428",
      color: "#1890ff",
    },
    {
      key: "4",
      airline: "https://ui.cltpstatic.com/images/logos/air-logos/UK.png",
      airlineCode: 'UK',
      code: "168",
      bookings: "168 tickets",
      cancellations: "312",
      amount: "₹ 144",
      color: "#fa8c16",
    },
  ];

  const airlineColumns = [
    {
      title: "Airline code",
      dataIndex: "airline",
      key: "airline",
      render: (text: string, record: any) => (
        <div className="cls-airline-logo">
          <img
            src={record.airline}
            alt={record.airlineCode}
            title={record.airlineCode}
            className="cls-airline-img"
          />
          <Text strong>{record.airlineCode}</Text>
        </div>
      ),
    },
    {
      title: "Bookings/Claim",
      dataIndex: "code",
      key: "code",
      render: (text: string, record: any) => (
        <div className="cls-table-cell">
          <div className="cls-cell-value">{text}</div>
          <div className="cls-cell-subtitle">{record.bookings}</div>
        </div>
      ),
    },
    {
      title: "Cancellations/Claim",
      dataIndex: "cancellations",
      key: "cancellations",
      render: (text: string) => (
        <div className="cls-table-cell">
          <div className="cls-cell-value">{text}</div>
          <div className="cls-cell-subtitle">1356 tickets</div>
        </div>
      ),
    },
    {
      title: "Net Claimable",
      dataIndex: "amount",
      key: "amount",
      render: (text: string) => (
        <Text className={`cls-amount ${text.includes("-") ? "cls-negative" : "cls-positive"}`}>
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
      pendingFilesAirline === "All" || pendingFilesAirline === "all"
        ? basePendingFilesData
        : basePendingFilesData.filter(
          (item) =>
            item.month.toLowerCase() === pendingFilesAirline.toLowerCase(),
        );

    if (pendingFilesType === "Amount" || pendingFilesType === "amount") {
      return filteredData.map((item) => ({
        ...item,
        value: item.value * 2500, // Convert to amount
      }));
    }

    return filteredData;
  };

  const pendingFilesData = getPendingFilesData();
  // Define a type for filter field
  type FilterField = {
    key: string;
    type: string;
    label: string;
    options?: { label: string; value: string }[];
    defaultValue?: string;
    placeholder?: string;
  };
  // Function to get icons for card items
  const getCardIcon = (label: string) => {
    const iconStyle = { fontSize: '16px' };
    
    switch (label.toLowerCase()) {
      case 'bookings':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10V12H17V10H7Z"/>
          </svg>
        );
      case 'cancellations':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
          </svg>
        );
      case 'available':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/>
          </svg>
        );
      case 'gst filed':
      case 'gst - filed':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"/>
          </svg>
        );
      case 'pending file':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
          </svg>
        );
      case 'airlines':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"/>
          </svg>
        );
      case 'all':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13H5V18H10V20H3V13ZM3 6H21V8H3V6ZM21 13V20H19V18H14V16H19V13H21ZM15 9H17V11H22V13H17V15H15V13H10V11H15V9Z"/>
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17L12 12L2 17Z"/>
          </svg>
        );
    }
  };

  const filterFields: FilterField[] = [
    {
      key: "Time period",
      type: "select",
      label: "Time period",
      options: [
        { label: "FY 2016-2017", value: "FY 2016-2017" },
        { label: "FY 2017-2018", value: "FY 2017-2018" },
        { label: "FY 2018-2019", value: "FY 2018-2019" },
      ],
      defaultValue: "FY 2016-2017"
    },
    {
      key: "Month",
      type: "select",
      label: "Month",
      options: [
        { label: "Jan", value: "Jan" },
        { label: "Feb", value: "Feb" },
        { label: "Mar", value: "Mar" },
        { label: "Apr", value: "Apr" },
        { label: "May", value: "May" },
        { label: "Jun", value: "Jun" },
        { label: "Jul", value: "Jul" },
        { label: "Aug", value: "Aug" },
        { label: "Sep", value: "Sep" },
        { label: "Oct", value: "Oct" },
        { label: "Nov", value: "Nov" },
        { label: "Dec", value: "Dec" },

      ],
      defaultValue: "Jan"
    },
    {
      key: "vendorName",
      type: "select",
      label: "Vendor Name",
      options: [
        { label: "MakemyTrip", value: "MakemyTrip" },
        { label: "Cleartrip", value: "Cleartrip" },
        { label: "AtYourPrice", value: "AtYourPrice" },
        { label: "Goibibo", value: "Goibibo" }
      ],
      placeholder: "Enter vendor name",
      defaultValue: "MakemyTrip"
    },
    {
      key: "Type",
      type: "select",
      label: "Type :",
      options: [
        { label: "Invoice count", value: "Invoice count" },
        { label: "Amount", value: "Amount" },
      ],
      defaultValue: "Invoice count"
    },
    {
      key: "Airline",
      type: "select",
      label: "Airline",
      options: [
        { label: "All", value: "All" },
        { label: "SG", value: "SG" },
        { label: "6E", value: "6E" },
        { label: "AI", value: "AI" },
        { label: "UK", value: "UK" },
      ],
      defaultValue: "All"
    }
  ]
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
            <div className="cls-filter-con">
              <Filter
                fields={
                  filterFields
                    .filter(f => f.key === "Time period" || f.key === "Month" || f.key === "vendorName")
                    .map(field => ({
                      ...field,
                      type: "select" as const, // Explicit type
                    }))
                }
                pathname="/dashboard"
                showButtons={false}
                onChange={handleFilterChange}
              />
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
            console.log(item);

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
                  <div className={`cls-new-card ${item.class}`}>
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
                          className={`cls-new-card-item cls-${item.class.replace('cls-', '')}`}
                        >
                          <div className="cls-new-item-content">
                            <div className="cls-item-icon">
                              {getCardIcon(section.label)}
                            </div>
                            <div className="cls-item-text">
                              <Text className="cls-new-item-label">
                                {section.label}
                              </Text>
                              <Text className="cls-new-item-value">
                                {section.value}
                              </Text>
                            </div>
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

      <Row gutter={[24, 24]}>
        {/* Invoice Status Chart */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div className="cls-chart-header">
                <span>{translate("invoiceStatus")}</span>
                <div className="cls-chart-controls">
                  <div className="cls-tab-toggle">
                    <Button
                      size="small"
                      type={invoiceTab === "all" ? "primary" : "text"}
                      onClick={() => setInvoiceTab("all")}
                      className={`cls-tab-btn ${invoiceTab === "all" ? "cls-active" : ""}`}
                    >
                      All
                    </Button>
                    <Button
                      size="small"
                      type={invoiceTab === "airlines" ? "primary" : "text"}
                      onClick={() => setInvoiceTab("airlines")}
                      className={`cls-tab-btn ${invoiceTab === "airlines" ? "cls-active" : ""}`}
                    >
                      Airlines
                    </Button>
                  </div>
                  <div className="cls-filter-controls">
                    <Filter
                      fields={[
                        {
                          ...filterFields.find(f => f.key === "Type")!,
                          type: "select" as "select", // Explicitly cast type
                          label: ""
                        }
                      ]}
                      pathname="/dashboard"
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>
            }
            className="cls-invoice-status-card"
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
              <div className="cls-airline-filter">
                <Filter
                  fields={[
                    {
                      ...filterFields.find(f => f.key === "Airline")!,
                      type: "select" as "select", // Explicitly cast type
                      label: ""
                    }
                  ]}
                  pathname="/dashboard"
                  onChange={handleFilterChange}
                />
              </div>
            }
            className="cls-invoice-status-card"
          >
            <Table
              columns={airlineColumns}
              className="cls-price"
              dataSource={
                airlineFilter === "All" || airlineFilter === "all"
                  ? airlineData
                  : airlineData.filter(
                    (item) =>
                      item.airlineCode.toLowerCase() ===
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
              <div className="cls-pending-files-filter">
                <Filter
                  fields={
                    filterFields
                      .filter(f => f.key === "Type" || f.key === "Airline")
                      .map(field => ({
                        ...field,
                        type: "select" as const, // Explicit type
                        label: "",               // Hide label
                      }))
                  }
                  pathname="/dashboard"
                  onChange={handlePendingFilesFilterChange}
                />
              </div>
            }
            className="cls-invoice-status-card"
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