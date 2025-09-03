import React, { useState, useRef, useEffect } from "react";
import { Card,Table,Button,Select,Input,Radio,Checkbox} from "antd";
import {SearchOutlined,DownloadOutlined,FilterOutlined} from "@ant-design/icons";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/Reconciliation.scss";
import { downloadCSV } from '../Utils/commonFunctions'
import  Filter  from '../components/Filters/Filters'
import {useReconcilFilterMutation} from '../services/variables/variables'
import {FilterSkeleton, TableSkeleton, PaginationSkeleton} from '../components/SkeletonLoader/skeletonLoader';
import FileDownload from "../components/FileDownload";


const Reconciliation: React.FC = () => {
  const [reconcilService, {data, isLoading}] = useReconcilFilterMutation(); //Calling reconcilation service
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
    
  useEffect(()=>{
    reconcilService({page: currentPage, page_size: pageSize}); //Trigering the service
    
  },[currentPage, pageSize, reconcilService]);
  useEffect(()=>{
    console.log(data); //After triggering the service log the API data
  })
  const headers = (data as any)?.response?.data?.results?.list_header?.list_header || []; 
  const listBody = data?.response?.data?.results?.list_body || [];
  const keys = listBody.length > 0 ? Object.keys(listBody[0]) : [];
  const matchedHeaders = headers.filter((h: any) => keys.includes(h.template));
  const count = data?.response?.data?.count;
  const menuFilters = data?.response?.data?.results?.filter;

  const { translate } = useTheme();
  const [goToPageValue, setGoToPageValue] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);


  const filteredData = listBody.filter((item:any) =>
  Object.values(item).some((val) =>
    String(val).toLowerCase().includes(searchText.toLowerCase())
  )
);
// Step 2: Sort the filtered list (example: by invoice_date)
const sortedData = [...filteredData].sort((a, b) =>
  a.invoice_date.localeCompare(b.invoice_date) // ascending
);

// Define a type for filter field
type FilterField = {
  key: string;
  type: string;
  label: string;
  options?: { label: string; value: string }[];
  defaultValue?: string;
  placeholder?: string;
};

const filterFields: FilterField[] = [];
  menuFilters?.forEach((fieldType: any) => {
    console.log(fieldType,'fieldType');
    
    filterFields.push({
      key: fieldType.id || fieldType.label?.toLowerCase(),
      type: fieldType.type === "dropdown" || "text" ? "select" : fieldType.type,
      label: fieldType.label,
      options: fieldType.dropdown?.map((opt: any) => ({
        label: opt.value,
        value: opt.value,
      })) || [],
      defaultValue: fieldType.value || (fieldType.dropdown?.[0]?.value ?? ""),
      placeholder: fieldType.placeholder || "",
    });
  }); 


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
  const totalPages = Math.ceil(count / pageSize); // calculate total pages

  const handleGoToPage = () => {
    const pageNumber = parseInt(goToPageValue);

    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber); // triggers API call via useEffect
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

  const allColumns = matchedHeaders.map((h: any) => ({
    title: h.headerName,
    dataIndex: h.template,
    key: h.template,
    render: (text: string) => text || "-",
  }));
  console.log(allColumns,'allColumns');

  const [visibleColumns, setVisibleColumns] = useState({
    headerName:true
  });

  
  // const visibleColumnsData = allColumns.filter(
  //   (col:any) => visibleColumns[col.key as keyof typeof visibleColumns],
  // );

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
      {isLoading ? (<FilterSkeleton/>) :
      (<Filter  
        fields={filterFields}
        pathname="/reconciliation"
        showButtons={true}
        onChange={handleFilterChange}
        />)
        }

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
          <FileDownload service={reconcilService} fileName="reconciliation" />
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
          />}

         
          {/* Custom Pagination Footer */}
        {isLoading ? (
          <PaginationSkeleton />
        ) : (
          <div className="cls-pagination-footer">
            {/* Left side - Displaying info with page size selector */}
            <div className="pagination-left">
              <span className="pagination-text">Displaying</span>

              <Select
                value={pageSize}
                onChange={(value) => {
                  setPageSize(value);
                  setCurrentPage(1); // Reset to page 1
                }}
                className="pagination-select"
                size="small"
                options={[
                  { value: 6, label: "6" },
                  { value: 12, label: "12" },
                  { value: 30, label: "30" },
                  { value: 60, label: "60" },
                  { value: 100, label: "100" },
                ]}
              />

              <span className="pagination-text">Out of {count}</span>
            </div>

            {/* Center - Page navigation */}
            <div className="pagination-center">
              <Button
                icon="<"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="pagination-btn"
              />

              {/* Page numbers */}
              {(() => {
                const pages = [];
                const maxVisible = 5;
                let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                let end = Math.min(totalPages, start + maxVisible - 1);

                if (end - start < maxVisible - 1) {
                  start = Math.max(1, end - maxVisible + 1);
                }

                for (let i = start; i <= end; i++) {
                  pages.push(
                    <Button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`pagination-btn ${i === currentPage ? "active" : ""}`}
                    >
                      {i}
                    </Button>
                  );
                }

                // Ellipsis and last page
                if (end < totalPages) {
                  if (end < totalPages - 1) {
                    pages.push(
                      <span key="ellipsis" className="pagination-ellipsis">
                        ...
                      </span>
                    );
                  }
                  pages.push(
                    <Button
                      key={totalPages}
                      onClick={() => setCurrentPage(totalPages)}
                      className={`pagination-btn ${totalPages === currentPage ? "active" : ""}`}
                    >
                      {totalPages}
                    </Button>
                  );
                }

                return pages;
              })()}

              <Button
                icon=">"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="pagination-btn"
              />
            </div>

            {/* Right side - Go to page */}
            <div className="pagination-right">
              <span className="pagination-text">Go to Page</span>
              <Input
                className="pagination-input"
                value={goToPageValue}
                onChange={(e) => {
                  const value = e.target.value;
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
                className="pagination-go-btn"
                onClick={handleGoToPage}
                size="small"
              >
                Go
              </Button>
            </div>
          </div>
        )}
        </div>
      </Card>
    </div>
  );
};

export default Reconciliation;
