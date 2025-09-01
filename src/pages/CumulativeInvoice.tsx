import React, { useState, useEffect } from "react";
import { Card, Radio, Tabs, Input, Button, Select, Typography, Table, Checkbox } from "antd";
import { SearchOutlined, DownloadOutlined, FilterOutlined } from "@ant-design/icons";
import { useCumulativeFilterMutation } from '../services/variables/variables'
import { useTheme } from "../contexts/ThemeContext";
import "../styles/CumulativeInvoice.scss";
import { downloadCSV, downloadXLS } from '../Utils/commonFunctions'
import Filter from "../components/Filters/Filters";
import {TableSkeleton, PaginationSkeleton} from '../components/SkeletonLoader/skeletonLoader';
import dayjs from 'dayjs';


const { Title } = Typography;
const { TextArea } = Input;


const CumulativeInvoice: React.FC = () => {
  const [activeTab, setActiveTab] = useState("upload-pnr");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [goToPageValue, setGoToPageValue] = useState("");
  const [searchText, setSearchText] = useState("");
  const [dateRangeCond, setDateRangeCond] = useState(false);
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null)

  const { translate } = useTheme();

  // Form states
  const [isInvoiceExpanded, setIsInvoiceExpanded] = useState(false);
  const [invoiceText, setInvoiceText] = useState("");
  const [isPnrDropdownOpen, setIsPnrDropdownOpen] = useState(false);
  const [pnrTicketType, setPnrTicketType] = useState("pnr");
  const [pnrTicketText, setPnrTicketText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  
  const handleInvoiceToggle = () => {
    setIsInvoiceExpanded(!isInvoiceExpanded);
  };

  const handleInvoiceSubmit = () => {
    setIsInvoiceExpanded(false);
  };

  const handlePnrDropdownClick = () => {
    setIsPnrDropdownOpen(!isPnrDropdownOpen);
  };

  const handlePnrDropdownSubmit = () => {
    // Process the pnrTicketText data here
    // console.log("PNR/Ticket data:", pnrTicketText);
    setIsPnrDropdownOpen(false);
  };

  const tabItems = [
    {
      key: "upload-pnr",
      label: translate("uploadPNRTicket"),
    },
    {
      key: "upload-invoice",
      label: translate("uploadInvoiceNo"),
    },
    {
      key: "pnr-ticket",
      label: translate("pnrTicket"),
    },
    {
      key: "tax-invoice-range",
      label: translate("showOnTaxInvoiceRange"),
    },
  ];

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    AirlineName: true,
    pnrTicketNo: true,
    invoiceNo: true,
    invoiceDate: true,
    type: true,
    travelVendor: true,
    action: true,
  });

  // Column configuration with disabled flags
  const columnConfig = {
    AirlineName: { disabled: true },
    pnrTicketNo: { disabled: true },
    invoiceNo: { disabled: true },
    invoiceDate: { disabled: true },
    type: { disabled: false },
    travelVendor: { disabled: false },
    action: { disabled: false },
  };
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const filterDropdownRef = React.useRef(null);

  // Configuration for fixed columns (non-scrollable)
  const fixedColumnsConfig = {
    action: true,
    filter: true,
    // Add other columns that should be fixed here
    // pnrTicketNo: true, // Example: uncomment to make PNR non-scrollable
  };

  // Column mapping for display titles
  const columnTitleMapping = {
    AirlineName: translate("Airline name"),
    pnrTicketNo: translate("pnrTicketNumber"),
    invoiceNo: translate("invoiceNumber"),
    invoiceDate: translate("invoiceDate"),
    type: translate("type"),
    travelVendor: translate("travelVendor"),
    action: "Action",
  };
  const [cummulativeService, { data, isLoading}] = useCumulativeFilterMutation();
  // console.log(data?.response?.data?.results,'cumulative data');
  const info = data?.response?.data?.results;
  const header = info?.list_header.list_header;
  const allColumns = (header ?? []).map((h: any) => ({
    title: h.headerName,
    dataIndex: h.template,
    key: h.template,
    render: (text: string) => text || "-",
  }));
  // console.log(header,'header');
  const listBody = info?.list_body ?? [];
  // console.log(listBody,'listBody');
  const category: "agency" | "airline" = "agency";
  const filteredData = listBody.filter((item:any) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
  )
  );

  // console.log(filteredData,'filteredData');
  const sortedData = [...filteredData].sort((a, b) => {
    if (!a?.invoice_date) return 1;   // put a at the end
    if (!b?.invoice_date) return -1;  // put b at the end
    // console.log(a, b);
    return a.invoice_date.localeCompare(b.invoice_date);
    
  });
  // console.log(sortedData,'sortedData');

const handleDownload = async (
format: "csv" | "xls",
start: string,
end: string
) => {
  const response = await cummulativeService({
    page:currentPage,
    page_size:pageSize,
    category,
    start:start??undefined,
    end:end??undefined,
  }).unwrap();

  if (format === "csv") {
    downloadCSV(response, "invoices.csv");
  } else if (format === "xls") {
    downloadXLS(response, "doc.xls");
  }
};
  // passing param and display date range
  const downloadFile = () => {
    setDateRangeCond(true);
    // handleDownload(format, start, end);
  };

  // filter submit btn func
  const handleSubmit = () => {
     cummulativeService({ 
      page: currentPage,
      page_size: pageSize,
      category,   // or "airline"
      pnrno: pnrTicketText || undefined,
      // Type: "All",pnrno: pnrTicketTe
    });
  };
  
  const [totalRecords, setTotalRecords] = useState(0);

  // Define a type for filter field
  type FilterField = {
    key: string;
    type: string;
    label: string;
    options?: { label: string; value: string }[];
    defaultValue?: string;
    placeholder?: string;
  };

  const filterFields: FilterField[] = [
    {
      key: "airline",
      type: "select",
      label: "Airline",
      options: [
        { label: "All", value: "all" },
        { label: "IndiGo", value: "indigo" },
        { label: "Air India", value: "air-india" }
      ],
      defaultValue: "all"
    },
    {
      key: "Type",
      type: "select",
      label: "Type",
      options: [
        { label: "All", value: "All" },
        { label: "Tax invoice", value: "Tax invoice" },
        { label: "credit note", value: "credit note" },
      ],
      placeholder: "Enter vendor name",
      defaultValue: "All"
    },
    {
      key: "TravelMode",
      type: "select",
      label: "Travel mode",
      options: [
        { label: "All", value: "All" },
        { label: "Flight", value: "Flight" },
        { label: "train", value: "Train" },
      ],
      placeholder: "Enter travel mode",
      defaultValue: "All"
    },
    {
      key: "PlaceOfSupply",
      type: "select",
      label: "Place of supply",
      options: [
        { label: "All states", value: "All states" },
        { label: "Delhi", value: "Delhi" },
        { label: "Mumbai", value: "Cleartrip" },
      ],
      placeholder: "Enter vendor name",
      defaultValue: "MakemyTrip"
    },
    {
      key: "travelDate",
      type: "dateRange",
      label: "Travel Date"
    },
  ];
  const handleDateRange = (values: any) => {
    console.log(values, 'value');
    const range = Object.values(values)[0]; // take the first entry
    if (Array.isArray(range) && range.length === 2) {
      const [start, end] = range;
      setDateRange([
        dayjs(start).format("YYYY-MM-DD"),
        dayjs(end).format("YYYY-MM-DD"),
      ]);
      console.log(start.format("YYYY-MM-DD"),end);
    }
  };
  const handleFilterChange = ()=>{
    
  };

  useEffect(() => {
    cummulativeService({ page: currentPage, page_size: pageSize, category: "agency"});
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (info) {
      setTotalRecords(data?.response?.data?.count);
    }
  }, [data]);
    useEffect(() => {
    // set default only once when category data arrives
    if (!selectedCategory && info?.category && info?.category?.length > 0) {
      setSelectedCategory(info?.category[0].name.toLowerCase());
    }
  }, [info?.category, selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      cummulativeService({
        page: currentPage,
        page_size: pageSize,
        category,
      });
    }
  }, [selectedCategory]);

  const totalPages = Math.ceil(totalRecords / pageSize);

  const handleGoToPage = () => {
    const page = Number(goToPageValue);
    const totalPages = Math.ceil(totalRecords / pageSize);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setGoToPageValue("");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "upload-pnr":
        return (
          <div className="cls-tab-content-area">
            <div className="cls-tab-content-layout">
              <div className="cls-sprt">
                <div>
                  <Button
                    onClick={handlePnrDropdownClick}
                    className="cls-upload-button"
                  >
                    <span>{translate("uploadMultiplePNR")}</span>
                    <span
                      className={
                        isPnrDropdownOpen ? "cls-expanded" : "cls-collapsed"
                      }
                    >
                      ▲
                    </span>
                  </Button>

                  {/* Count display below button */}
                  <div className="cls-count-display">
                    <span>60 Ticket No Submitted</span>
                    <span className="cls-info-icon">i</span>
                  </div>
                  {/* Expanding content below */}
                  {isPnrDropdownOpen && (
                    <div className="cls-dropdown-content">
                      {/* Close button */}
                      <Button
                        type="text"
                        onClick={() => setIsPnrDropdownOpen(false)}
                        className="cls-close-button"
                      >
                        ×
                      </Button>

                      <div className="cls-radio-section">
                        <Radio.Group
                          value={pnrTicketType}
                          onChange={(e) => setPnrTicketType(e.target.value)}
                        >
                          <Radio value="pnr">PNR</Radio>
                          <Radio value="ticket">Ticket Number</Radio>
                        </Radio.Group>
                      </div>

                      <div className="cls-textarea-section">
                        <div className="cls-textarea-label">
                          Enter Multiple Ticket No
                        </div>
                        <TextArea
                          value={pnrTicketText}
                          onChange={(e) => setPnrTicketText(e.target.value)}
                          placeholder=""
                          rows={6}
                        />
                      </div>

                      <div className="cls-example-section">
                        <div className="cls-example-box">
                          <span className="cls-example-label">Example : </span>
                          123456,123456
                        </div>
                      </div>

                      <div className="cls-action-buttons">
                        <Button onClick={() => setIsPnrDropdownOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          type="primary"
                          onClick={handlePnrDropdownSubmit}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <Filter
                  fields={[
                    {
                      ...filterFields.find(f => f.key === "Type")!,
                      type: "select" as "select", // Explicitly cast type
                      label: ""
                    }
                  ]}
                  pathname="/cumulative"
                  onChange={handleFilterChange}
                />
              </div>
              <div style={{ display: "flex", gap: 15 }} className="cls-btnItems">
                <Button onClick={handleSubmit} className="cls-submitBtn">
                  Submit
                </Button>
                <Button className="cls-resetBtn">
                  Reset all
                </Button>
              </div>
            </div>
          </div>
        );

      case "upload-invoice":
        return (
          <div
            style={{
              backgroundColor: "#f8f9fa",
              border: "1px solid #e9ecef",
              borderRadius: 6,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div className="cls-sprt">
                <div>
                  <Button
                    onClick={handleInvoiceToggle}
                    style={{
                      width: "100%",
                      height: 40,
                      textAlign: "left",
                      border: "none",
                      background: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      boxShadow: "none",
                      borderRadius: 6,
                    }}
                  >
                    <span style={{ color: "#4f46e5", fontWeight: 500 }}>
                      {translate("uploadMultipleInvoice")}
                    </span>
                    <span
                      style={{
                        transform: isInvoiceExpanded
                          ? "rotate(0deg)"
                          : "rotate(180deg)",
                        transition: "transform 0.3s ease",
                        color: "#4f46e5",
                      }}
                    >
                      ▲
                    </span>
                  </Button>

                  {/* Count display below button */}
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#8B949E",
                      marginTop: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span>60 Ticket No Submitted</span>
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "#8B949E",
                        color: "white",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      i
                    </span>
                  </div>

                  {/* Expanding content below */}
                  {isInvoiceExpanded && (
                    <div
                      style={{
                        marginTop: 20,
                        background: "white",
                        border: "1px solid #e1e5e9",
                        borderRadius: 8,
                        padding: 20,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        position: "absolute",
                        width: "300px",
                        zIndex: 1001,
                      }}
                    >
                      {/* Close button */}
                      <Button
                        type="text"
                        onClick={() => setIsInvoiceExpanded(false)}
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          color: "#ff4d4f",
                          fontSize: "18px",
                          width: 24,
                          height: 24,
                          padding: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "none",
                          background: "transparent",
                        }}
                      >
                        ×
                      </Button>

                      <div style={{ marginBottom: 20, marginTop: 8 }}>
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: 500,
                            marginBottom: 12,
                            color: "#24292f",
                          }}
                        >
                          Enter Invoice No
                        </div>
                        <TextArea
                          value={invoiceText}
                          onChange={(e) => setInvoiceText(e.target.value)}
                          placeholder=""
                          rows={6}
                          style={{
                            resize: "none",
                            borderRadius: 6,
                            border: "1px solid #d0d7de",
                            fontSize: "14px",
                          }}
                        />
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#656d76",
                            padding: "12px 16px",
                            background: "#f6f8fa",
                            borderRadius: 6,
                            border: "1px solid #d0d7de",
                          }}
                        >
                          <span style={{ fontWeight: 600, color: "#24292f" }}>
                            Example :{" "}
                          </span>
                          123456,123456
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: 12,
                        }}
                      >
                        <Button
                          onClick={() => setIsInvoiceExpanded(false)}
                          style={{
                            borderRadius: 6,
                            height: 36,
                            paddingLeft: 16,
                            paddingRight: 16,
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="primary"
                          onClick={handleInvoiceSubmit}
                          style={{
                            backgroundColor: "#4f46e5",
                            borderColor: "#4f46e5",
                            borderRadius: 6,
                            height: 36,
                            paddingLeft: 16,
                            paddingRight: 16,
                            fontWeight: 500,
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <Filter
                  fields={[
                    {
                      ...filterFields.find(f => f.key === "Type")!,
                      type: "select" as "select", // Explicitly cast type
                      label: ""
                    }
                  ]}
                  pathname="/cumulative"
                  onChange={handleFilterChange}
                />
              </div>
              <div style={{ display: "flex", gap: 15 }} className="cls-btnItems">
                <Button onClick={handleSubmit} className="cls-submitBtn">
                  Submit
                </Button>
                <Button className="cls-resetBtn">
                  Reset all
                </Button>
              </div>
            </div>
          </div>
        );

      case "pnr-ticket":
        return (
          <div
            style={{
              backgroundColor: "#f8f9fa",
              border: "1px solid #e9ecef",
              borderRadius: 6,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                marginBottom: 16,
                justifyContent: "space-between",
              }}
            >
              <div className="cls-sprt">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: "12px", color: "#666" }}>
                    PNR / Ticket no
                  </span>
                  <Input
                    placeholder="Enter PNR / Ticket no"
                    style={{ width: 200 }}
                    size="large"
                  />
                </div>
                <Filter
                  fields={[
                    {
                      ...filterFields.find(f => f.key === "Type")!,
                      type: "select" as "select", // Explicitly cast type
                      label: ""
                    }
                  ]}
                  pathname="/cumulative"
                  onChange={handleFilterChange}
                />
              </div>
              <div style={{ display: "flex", gap: 15 }} className="cls-btnItems">
                <Button onClick={handleSubmit} className="cls-submitBtn">
                  Submit
                </Button>
                <Button className="cls-resetBtn">
                  Reset all
                </Button>
              </div>
            </div>
          </div>
        );

      case "tax-invoice-range":
        return (
          <div
            style={{
              backgroundColor: "#f8f9fa",
              border: "1px solid #e9ecef",
              borderRadius: 6,
              padding: 16,
              marginBottom: 24,
            }}
              className="cls-invoiceRange"
          >

            <Filter
              fields={filterFields}
              pathname="/cumulative"
              showButtons={true}
              onChange={handleFilterChange}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="slide-up cls-cumulative-container">
      {/* Breadcrumb
      <div style={{ marginBottom: 16 }}>
        <Text style={{ color: '#666' }}>{translate('home')} » {translate('cumulativeInvoice')}</Text>
      </div> */}

      {/* Title */}
      <Title level={3} className="cls-cumulative-title">
        {translate("cumulativeInvoice")}
      </Title>

      {/* Entity Type Selection */}
        <div className="cls-entity-type-section">
          <Radio.Group
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <Radio value="agency">{translate("agency")}</Radio>
            <Radio value="airline">{translate("airline")}</Radio>
          </Radio.Group>
        </div>

      {/* Tabs */}
      <div className="cls-tabs-section">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          type="line"
        />
      </div>

      {/* Dynamic Tab Content */}
      {renderTabContent()}

      {/* Data Table Section */}
      <div>
        {/* Export Buttons and Search */}


        {/* Data Table */}
        <Card className="cls-data-table">
          <div className="cls-table-container">
            <div className="cls-table-head">
              <div className="cls-export-section">
                <Input
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                  className="cls-search-input"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                />
              </div>
              <div className="cls-table-header-actions">

                <FilterOutlined
                  className="cls-external-filter-icon"
                  onClick={() => setFilterDropdownVisible(!filterDropdownVisible)}
                />
                <Button
                  icon={<DownloadOutlined />}
                  className="cls-export-button cls-xls" onClick={() => downloadFile()}
                >
                  XLS
                </Button>
                <Button
                  icon={<DownloadOutlined />}
                  className="cls-export-button cls-csv"  onClick={() => downloadFile()}
                >
                  CSV
                </Button>
                {dateRangeCond && (
                <>
                  <Filter
                  fields={[
                    {
                      ...filterFields.find(f => f.key === "dateRange")!,
                      type: "dateRange", // Explicitly cast type
                      label: ""
                    }
                  ]}
                  pathname="/cumulative"
                  onChange={handleDateRange} /> 
                  <button
                      className="cls-download"
                       onClick={() => {
                          if (startDate && endDate) {
                            handleDownload("csv", startDate, endDate);
                          } else {
                            alert("Please select both start and end dates");
                          }
                        }}
                    >
                      File <DownloadOutlined />
                  </button>
                  
                </>
                )}

                {filterDropdownVisible && (
                  <div className="cls-filter-dropdown" ref={filterDropdownRef}>
                    <div className="cls-filter-header">
                      <span className="cls-filter-title">Show/Hide Columns</span>
                      <Button
                        type="text"
                        onClick={() => setFilterDropdownVisible(false)}
                        style={{
                          position: "absolute",
                          top: "15px",
                          right: "10px",
                          color: "red",
                          fontSize: "22px",
                          padding: 0,
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        ×
                      </Button>
                    </div>
                    <div className="cls-filter-content">
                      {Object.keys(visibleColumns).map((key) => (
                        <div key={key} className="cls-filter-option">
                          <Checkbox
                            checked={
                              visibleColumns[key as keyof typeof visibleColumns]
                            }
                            disabled={
                              columnConfig[key as keyof typeof columnConfig]
                                ?.disabled || false
                            }
                            onChange={(e) =>
                              setVisibleColumns((prev) => ({
                                ...prev,
                                [key]: e.target.checked,
                              }))
                            }
                          >
                            {columnTitleMapping[
                              key as keyof typeof columnTitleMapping
                            ] || key}
                          </Checkbox>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {isLoading ? <TableSkeleton/> : 
            <Table
              columns={allColumns}
              dataSource={sortedData}
              pagination={false}
              size="middle"
              bordered={false}
              className="custom-table"
              scroll={{ x: 1200 }}
              tableLayout="fixed"
              rowKey="invoice_number"
            /> }
          </div>

          {/* Custom Pagination Footer */}
          {isLoading ? <PaginationSkeleton/> : 
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
              paddingTop: 16,
              borderTop: "1px solid #f0f0f0",
            }}
            className="cls-pagination-footer"
          >
            {/* Left side - Displaying info with page size selector */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }} >
              <span style={{ fontSize: "14px" }}>Displaying</span>

              <Select
                value={pageSize}
                onChange={(value) => {
                  setPageSize(value);
                  setCurrentPage(1); // Reset to page 1 when size changes
                }}
                style={{ width: 60 }}
                size="small"
                options={[
                  { value: 6, label: "6" },
                  { value: 12, label: "12" },
                  { value: 30, label: "30" },
                  { value: 60, label: "60" },
                  { value: 100, label: "100" },
                ]}
              />

              <span style={{ fontSize: "14px" }}>
                Out of {totalRecords}
              </span>
            </div>


            {/* Center - Page navigation */}
            <div className="page" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Button
                icon="<"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #d9d9d9",
                }}
              />

              {/* Page numbers */}
              {(() => {
                const pages = [];
                const maxVisible = 5;
                let start = Math.max(
                  1,
                  currentPage - Math.floor(maxVisible / 2),
                );
                let end = Math.min(totalPages, start + maxVisible - 1);

                if (end - start < maxVisible - 1) {
                  start = Math.max(1, end - maxVisible + 1);
                }

                for (let i = start; i <= end; i++) {
                  pages.push(
                    <Button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:
                          i === currentPage ? "#4f46e5" : "white",
                        borderColor: i === currentPage ? "#4f46e5" : "#d9d9d9",
                        color: i === currentPage ? "white" : "#000",
                      }}
                    >
                      {i}
                    </Button>,
                  );
                }

                // Add ellipsis and last page if needed
                if (end < totalPages) {
                  if (end < totalPages - 1) {
                    pages.push(
                      <span key="ellipsis" style={{ margin: "0 8px" }}>
                        ...
                      </span>,
                    );
                  }
                  pages.push(
                    <Button
                      key={totalPages}
                      onClick={() => setCurrentPage(totalPages)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:
                          totalPages === currentPage ? "#4f46e5" : "white",
                        borderColor:
                          totalPages === currentPage ? "#4f46e5" : "#d9d9d9",
                        color: totalPages === currentPage ? "white" : "#000",
                      }}
                    >
                      {totalPages}
                    </Button>,
                  );
                }

                return pages;
              })()}

              <Button
                icon=">"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #d9d9d9",
                }}
              />
            </div>

            {/* Right side - Go to page */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "14px" }}>Go to Page</span>
              <Input
                style={{ width: 60 }}
                value={goToPageValue}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only numbers
                  if (/^\d*$/.test(value)) {
                    const numericValue = Number(value);
                    if (numericValue <= totalPages) {
                      setGoToPageValue(value);
                    } else if (value === "") {
                      setGoToPageValue("");
                    }
                  }
                }}
                onPressEnter={handleGoToPage}
                placeholder={`1-${totalPages}`}
                size="small"
              />

              <Button
                type="primary"
                style={{ backgroundColor: "#4f46e5", borderRadius: "16px" }}
                onClick={handleGoToPage}
                size="small"
              >
                Go
              </Button>
            </div>
          </div> }
        </Card>
      </div>
         {/* <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Download CSV
          </button> */}
    </div>
  );
};

export default CumulativeInvoice;
