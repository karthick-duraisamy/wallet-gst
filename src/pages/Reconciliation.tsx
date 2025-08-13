import React, { useState, useRef, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { Card,Table,Button,Select,DatePicker,Input,Tag,Radio,Checkbox} from "antd";
import {SearchOutlined,DownloadOutlined,FilterOutlined} from "@ant-design/icons";
// import { setFilters } from "../store/slices/reconciliationSlice";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/Reconciliation.scss";
import { downloadCSV, downloadXLS } from '../Utils/commonFunctions'
import  Filter  from '../components/Filters/Filters'


const Reconciliation: React.FC = () => {
  // const { RangePicker } = DatePicker;
  // const { Option } = Select;
  
  // const { records, filters, loading, pagination } = useSelector(
  //   (state: RootState) => state.reconciliation,
  // );
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [goToPageValue, setGoToPageValue] = useState("");
  const [searchText, setSearchText] = useState("");
  // const [travelVendor, setTravelVendor] = useState<string>("all");
  // const [status, setStatus] = useState<string>("all");
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

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
    key: "Status",
    type: "select",
    label: "Status",
     options: [
      { label: "All", value: "All" },
      { label: "Matched", value: "Matched" },
      { label: "Pending file", value: "Pending file" },
      { label: "Invoice missing", value: "Invoice missing" },
      { label: "Additional in GSTR-2A", value: "Additional in GSTR-2A" },
      { label: "Invoice received", value: "Invoice received" }
    ],
    placeholder: "Enter vendor name",
    defaultValue: "All"
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
    key: "travelDate",
    type: "dateRange",
    label: "Travel Date"
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
  }
];

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setFilterDropdownVisible(false);
      }
    };

    if (filterDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterDropdownVisible]);

  // Column configuration with disabled flags
  const columnConfig = {
    supplierName: { disabled: true },
    pnrTicketNumber: { disabled: true },
    invoiceNumber: { disabled: true },
    invoiceDate: { disabled: true },
    type: { disabled: false },
    taxClaimable: { disabled: false },
    status: { disabled: false },
  };

  const handleFilterChange = (values: Record<string, any>) => {
    // dispatch(setFilters(values));
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(goToPageValue);
    const totalPages = Math.ceil(mockData.length / pageSize);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setGoToPageValue("");
    }
  };
  // Status counts for display below form
  const statusCounts = {
    new: 10,
    matched: 20,
    pendingToFile: 30,
    invoiceMissing: 40,
    additionalInGSTR2A: 917,
    invoiceReceived: 50,
  };

  const [visibleColumns, setVisibleColumns] = useState({
    supplierName: true,
    pnrTicketNumber: true,
    invoiceNumber: true,
    invoiceDate: true,
    type: true,
    taxClaimable: true,
    status: true,
  });

  const allColumns = [
    {
      title: translate("supplierName"),
      dataIndex: "supplierName",
      key: "supplierName",
      render: (text: string) => text || "Spice Jet",
    },
    {
      title: translate("pnrTicketNumber"),
      dataIndex: "pnrTicketNumber",
      key: "pnrTicketNumber",
      render: (text: string) => text || "ADA123",
    },
    {
      title: translate("invoiceNumber"),
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      render: (text: string) => text || "INV0BET333738",
    },
    {
      title: translate("invoiceDate"),
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      render: (text: string) => text || "31-Jan-2020",
    },
    {
      title: translate("type"),
      dataIndex: "type",
      key: "type",
      render: (type: string) => type || translate("taxInvoice"),
    },
    {
      title: translate("taxClaimable"),
      dataIndex: "taxClaimable",
      key: "taxClaimable",
      align: "right" as const,
      render: (amount: number) => (
        <span className="cls-tax-claimable-amount">
          ₹ {amount ? amount.toLocaleString() : "2,627"}
        </span>
      ),
    },
    {
      title: translate("status"),
      dataIndex: "status",
      key: "status",
      width: 150,
      fixed: "right" as const,
      render: (status: string) => (
        <Tag color="#722ed1" style={{ borderRadius: "12px" }}>
          {translate("additionalInGSTR2A")}
        </Tag>
      ),
    },
  ];

  const visibleColumnsData = allColumns.filter(
    (col) => visibleColumns[col.key as keyof typeof visibleColumns],
  );

  const mockData = [
    {
      key: "1",
      supplierName: "Spice Jet",
      pnrTicketNumber: "ADA123",
      invoiceNumber: "INV0BET333738",
      invoiceDate: "31-Jan-2020",
      type: "Tax invoice",
      taxClaimable: 2627.12,
      status: "Additional in GSTR-2A",
    },
    {
      key: "2",
      supplierName: "IndiGo",
      pnrTicketNumber: "BCD456",
      invoiceNumber: "INV1215645",
      invoiceDate: "10-Jan-2020",
      type: "Tax invoice",
      taxClaimable: 19500.0,
      status: "Additional in GSTR-2A",
    },
    {
      key: "3",
      supplierName: "Air India",
      pnrTicketNumber: "EFG789",
      invoiceNumber: "DL1212290AT85932",
      invoiceDate: "08-Oct-2021",
      type: "Tax invoice",
      taxClaimable: 4593.0,
      status: "Additional in GSTR-2A",
    },
    {
      key: "4",
      supplierName: "Vistara",
      pnrTicketNumber: "HIJ012",
      invoiceNumber: "DL1212290AU77270",
      invoiceDate: "13-Oct-2021",
      type: "Tax invoice",
      taxClaimable: 5586.0,
      status: "Additional in GSTR-2A",
    },
    {
      key: "5",
      supplierName: "GoAir",
      pnrTicketNumber: "KLM345",
      invoiceNumber: "DL1212290AU02058",
      invoiceDate: "09-Oct-2021",
      type: "Tax invoice",
      taxClaimable: 4445.0,
      status: "Additional in GSTR-2A",
    },
    {
      key: "6",
      supplierName: "Spice Jet",
      pnrTicketNumber: "XYZ123",
      invoiceNumber: "INV0BET456789",
      invoiceDate: "15-Feb-2020",
      type: "Tax invoice",
      taxClaimable: 3200.5,
      status: "Additional in GSTR-2A",
    },
    {
      key: "7",
      supplierName: "IndiGo",
      pnrTicketNumber: "ABC789",
      invoiceNumber: "INV1234567",
      invoiceDate: "20-Mar-2020",
      type: "Tax invoice",
      taxClaimable: 15750.0,
      status: "Additional in GSTR-2A",
    },
    {
      key: "8",
      supplierName: "Air India",
      pnrTicketNumber: "DEF456",
      invoiceNumber: "DL1212290AT12345",
      invoiceDate: "25-Apr-2021",
      type: "Tax invoice",
      taxClaimable: 6789.0,
      status: "Additional in GSTR-2A",
    },
    {
      key: "9",
      supplierName: "Vistara",
      pnrTicketNumber: "GHI789",
      invoiceNumber: "DL1212290AU98765",
      invoiceDate: "30-May-2021",
      type: "Tax invoice",
      taxClaimable: 8900.0,
      status: "Additional in GSTR-2A",
    },
    {
      key: "10",
      supplierName: "Alliance Air",
      pnrTicketNumber: "JKL012",
      invoiceNumber: "DL1212290AU54321",
      invoiceDate: "15-Jun-2021",
      type: "Tax invoice",
      taxClaimable: 5432.0,
      status: "Additional in GSTR-2A",
    },
    {
      key: "11",
      supplierName: "AirAsia India",
      pnrTicketNumber: "MNO345",
      invoiceNumber: "INV987654321",
      invoiceDate: "20-Jul-2021",
      type: "Tax invoice",
      taxClaimable: 7500.0,
      status: "Additional in GSTR-2A",
    },
    {
      key: "12",
      supplierName: "Spice Jet",
      pnrTicketNumber: "PQR678",
      invoiceNumber: "INV0BET999888",
      invoiceDate: "25-Aug-2021",
      type: "Tax invoice",
      taxClaimable: 4200.75,
      status: "Additional in GSTR-2A",
    },
    {
      key: "13",
      supplierName: "IndiGo",
      pnrTicketNumber: "STU901",
      invoiceNumber: "INV555666777",
      invoiceDate: "30-Sep-2021",
      type: "Tax invoice",
      taxClaimable: 12000.0,
      status: "Additional in GSTR-2A",
    },
    {
      key: "14",
      supplierName: "Air India",
      pnrTicketNumber: "VWX234",
      invoiceNumber: "DL1212290AT99999",
      invoiceDate: "15-Oct-2021",
      type: "Tax invoice",
      taxClaimable: 9800.5,
      status: "Additional in GSTR-2A",
    },
    {
      key: "15",
      supplierName: "Vistara",
      pnrTicketNumber: "YZA567",
      invoiceNumber: "DL1212290AU11111",
      invoiceDate: "20-Nov-2021",
      type: "Tax invoice",
      taxClaimable: 6750.25,
      status: "Additional in GSTR-2A",
    },
    {
      key: "16",
      supplierName: "GoAir",
      pnrTicketNumber: "BCD890",
      invoiceNumber: "DL1212290AU22222",
      invoiceDate: "25-Dec-2021",
      type: "Tax invoice",
      taxClaimable: 5100.0,
      status: "Additional in GSTR-2A",
    },
    {
      key: "17",
      supplierName: "Alliance Air",
      pnrTicketNumber: "EFG123",
      invoiceNumber: "DL1212290AU33333",
      invoiceDate: "10-Jan-2022",
      type: "Tax invoice",
      taxClaimable: 3800.75,
      status: "Additional in GSTR-2A",
    },
    {
      key: "18",
      supplierName: "AirAsia India",
      pnrTicketNumber: "HIJ456",
      invoiceNumber: "INV444555666",
      invoiceDate: "15-Feb-2022",
      type: "Tax invoice",
      taxClaimable: 8200.0,
      status: "Additional in GSTR-2A",
    },
    {
      key: "19",
      supplierName: "Spice Jet",
      pnrTicketNumber: "KLM789",
      invoiceNumber: "INV0BET777888",
      invoiceDate: "20-Mar-2022",
      type: "Tax invoice",
      taxClaimable: 4900.5,
      status: "Additional in GSTR-2A",
    },
    {
      key: "20",
      supplierName: "IndiGo",
      pnrTicketNumber: "NOP012",
      invoiceNumber: "INV333444555",
      invoiceDate: "25-Apr-2022",
      type: "Tax invoice",
      taxClaimable: 11500.0,
      status: "Additional in GSTR-2A",
    },
  ];

  const filteredData = mockData.filter((item) => {
    const searchTerm = searchText.toLowerCase();
    return (
      item.supplierName.toLowerCase().includes(searchTerm) ||
      item.pnrTicketNumber.toLowerCase().includes(searchTerm) ||
      item.invoiceNumber.toLowerCase().includes(searchTerm) ||
      item.invoiceDate.toLowerCase().includes(searchTerm) ||
      item.type.toLowerCase().includes(searchTerm) ||
      item.taxClaimable.toString().includes(searchTerm) ||
      item.status.toLowerCase().includes(searchTerm)
    );
  });

  // Calculate pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="slide-up cls-reconciliation-container">
      {/* Breadcrumb */}
      {/* Page Title */}
      <h2 className="cls-reconciliation-title">
        {translate("reconciliationHistory")}
      </h2>

      {/* Type Selection */}
      <div className="cls-type-selection">
        <Radio.Group defaultValue="airline" size="large">
          <Radio value="agency">{translate("agency")}</Radio>
          <Radio value="airline">{translate("airline")}</Radio>
        </Radio.Group>
      </div>

      {/* Filters */}
      <Filter  
        fields={filterFields}
        pathname="/reconciliation"
        showButtons={true}
        onChange={handleFilterChange}
        />

      {/* Status Count Display */}
      <div className="cls-status-counts">
        <div className="cls-status">
          <div className="cls-status-item">
            <span className="cls-status-label">New :</span>
            <span className="cls-status-value">{statusCounts.new}</span>
          </div>
          <div className="cls-status-item">
            <span className="cls-status-label">Matched :</span>
            <span className="cls-status-value">{statusCounts.matched}</span>
          </div>
          <div className="cls-status-item">
            <span className="cls-status-label">Pending to file :</span>
            <span className="cls-status-value">
              {statusCounts.pendingToFile}
            </span>
          </div>
          <div className="cls-status-item">
            <span className="cls-status-label">Invoice missing :</span>
            <span className="cls-status-value">
              {statusCounts.invoiceMissing}
            </span>
          </div>
          <div className="cls-status-item">
            <span className="cls-status-label">Additional in GSTR-2A :</span>
            <span className="cls-status-value">
              {statusCounts.additionalInGSTR2A}
            </span>
          </div>
          <div className="cls-status-item">
            <span className="cls-status-label">Invoice received :</span>
            <span className="cls-status-value"> 
              {statusCounts.invoiceReceived}
            </span>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <Card className="cls-data-table-card">
        <div className="cls-table-container">
          <div className="cls-table-head">
          {/* Export Buttons */}
          <div className="cls-export-controls">
            <Input
              placeholder="search"
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
            className="cls-export-btn cls-xls" onClick={() => downloadXLS()}
          >
            XLS
          </Button>
          <Button
            icon={<DownloadOutlined />}
            className="cls-export-btn cls-csv" onClick={() => downloadCSV()}
          >
            CSV
          </Button>
            {filterDropdownVisible && (
              <div className="cls-filter-dropdown" ref={filterDropdownRef}>
                <div className="cls-filter-header">
                  <span className="cls-filter-title">Show/Hide Columns</span>
                  <Button
                    type="text"
                    onClick={() => setFilterDropdownVisible(false)}
                    style={{
                      position: "absolute",
                      top: "14px",
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
                        {translate(
                          key
                            .replace(/([A-Z])/g, " $1")
                            .toLowerCase()
                            .trim(),
                        )}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          </div>
          <Table
            columns={visibleColumnsData}
            dataSource={paginatedData}
            pagination={false}
            size="middle"
            bordered={false}
            className="custom-table"
            scroll={{ x: 1200 }}
            tableLayout="fixed"
          />

          {/* Custom Pagination Footer */}
          <div className="cls-pagination-footer">
            {/* Left side - Displaying info with page size selector */}
            <div className="cls-pagination-info">
              <span className="cls-pagination-text">Displaying</span>
              <Select
                value={pageSize}
                onChange={(value) => {
                  setPageSize(value);
                  setCurrentPage(1);
                }}
                className="cls-page-size-select"
                size="small"
                options={[
                  { value: 5, label: "5" },
                  { value: 10, label: "10" },
                  { value: 20, label: "20" },
                  { value: 30, label: "30" },
                  { value: 50, label: "50" },
                ]}
              />
              <span className="cls-pagination-text">
                Out of {filteredData.length}
              </span>
            </div>

            {/* Center - Page navigation */}
            <div className="cls-pagination-center">
              <Button
                icon="<"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="cls-pagination-nav-button"
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
                      className={`cls-pagination-number-button ${i === currentPage ? "cls-active" : ""}`}
                    >
                      {i}
                    </Button>,
                  );
                }

                // Add ellipsis and last page if needed
                if (end < totalPages) {
                  if (end < totalPages - 1) {
                    pages.push(
                      <span key="ellipsis" className="cls-pagination-ellipsis">
                        ...
                      </span>,
                    );
                  }
                  pages.push(
                    <Button
                      key={totalPages}
                      onClick={() => setCurrentPage(totalPages)}
                      className={`cls-pagination-number-button ${totalPages === currentPage ? "cls-active" : ""}`}
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
                className="cls-pagination-nav-button"
              />
            </div>

            {/* Right side - Go to page */}
            <div className="cls-go-to-page-section">
              <span className="cls-pagination-text">Go to Page</span>
             <Input
                  className="cls-go-to-page-input"
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
                className="cls-go-to-page-button"
                onClick={handleGoToPage}
                size="small"
              >
                Go
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Reconciliation;
