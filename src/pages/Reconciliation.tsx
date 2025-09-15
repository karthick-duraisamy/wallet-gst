import React, { useState, useRef, useEffect } from "react";
import { Card,Table,Button,Select,Input,Radio} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/Reconciliation.scss";
import  Filter  from '../components/Filters/Filters'
import {useReconcilFilterMutation} from '../services/variables/variables'
import {FilterSkeleton, TableSkeleton, PaginationSkeleton, StatusCountSkeleton} from '../components/SkeletonLoader/skeletonLoader';
import FileDownload from "../components/FileDownload";
import StatusCount from "../components/StatusCount/StatusCount";
import dayjs from "dayjs";

const Reconciliation: React.FC = () => {
  const [reconcilService, {data, isLoading}] = useReconcilFilterMutation(); //Calling reconcilation service
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState<"agency" | "airline">("agency");
  const [statusId, setStatusId] = useState<number | null>(null);
  const [typeId, setTypeId] = useState<number | null>(null);
  const [travelvendorId, setTravelVendorId] = useState<number | null>(null);
  const [airlineId, setAirlineId] = useState<number |null> (null);
  const [reconciliationData, setReconciliationData] = useState<any[]>([]); //State for list update.
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const { translate } = useTheme();
  const [goToPageValue, setGoToPageValue] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // useEffect(()=>{
  //   reconcilService({page: currentPage, page_size: pageSize, category: selectedCategory}); //Trigering the service
    
  // },[currentPage, pageSize, reconcilService, ]);
  useEffect(() => {
    if (selectedCategory) {
      reconcilService({
        page: currentPage,
        page_size: pageSize,
        category:selectedCategory,
      });
    }
  }, [selectedCategory]);

  const headers = (data as any)?.response?.data?.results?.list_header?.list_header || []; 
  const listBody = (data as any)?.response?.data?.results?.list_body || [];
  useEffect(() => {
    if ((data as any)?.response?.data?.results?.list_body) {
      setReconciliationData(
        (data as any).response.data.results.list_body
      );
    }
  }, [data]);
  const statusCountData = (data as any)?.response?.data?.results?.statusCount;
  const keys = listBody.length > 0 ? Object.keys(listBody[0]) : [];
  const matchedHeaders = headers.filter((h: any) => keys.includes(h.template));
  const count = (data as any)?.response?.data?.count;
  const menuFilters = (data as any)?.response?.data?.results?.filter;
  const filteredData = reconciliationData.filter((item:any) =>
  Object.values(item).some((val) =>
    String(val).toLowerCase().includes(searchText.toLowerCase())
  )
);
// Step 2: Sort the filtered list (example: by invoice_date)
const sortedData = [...filteredData].sort((a, b) => 
  (a.invoice_date ?? "").localeCompare(b.invoice_date ?? "")
);
// Table data source: use reconciliationData if it has items, else sortedData

const tableData = reconciliationData.length > 0 ? reconciliationData : sortedData;

// Define a type for filter field
type FilterField = {
  key: string;
  type: string | number | null;
  label: string;
  options?: { label: string; value: string }[];
  defaultValue?: string;
  placeholder?: string;
};

const filterFields: FilterField[] = [];

menuFilters?.forEach((fieldType: any) => {
  let fieldConfig: any = {
    key: fieldType.id || fieldType.label?.toLowerCase(),
    label: fieldType.label,
    placeholder: fieldType.placeholder || "",
    errorMsg: fieldType.error_msg,
  };

  if (fieldType.type === "dropdown") {
    fieldConfig = {
      ...fieldConfig,
      type: (fieldType.type === "dropdown" ? "select" : "dropdown"),
      options: fieldType.dropdown?.map((opt: any) => ({
        label: opt.label || opt.value || opt.airline_name,
        value: opt.value || opt.label || opt.airline_name,
        optionId: opt.id || opt.airline_id
      })) || [],
      defaultValue: fieldType.value || (fieldType.dropdown?.[0]?.value ?? ""),
    };
    
  } else if (fieldType.type === "calendar") {
    fieldConfig = {
      ...fieldConfig,
      type: "dateRange", // frontend knows it's a range
    keyStart: fieldType.id || fieldType.formcontrol || "start",
    keyEnd: fieldType.id1 || "end",
    placeholderStart: fieldType.placeholder || "Start date",
    placeholderEnd: fieldType.placeholder1 || "End date",
    errorMsg: fieldType.error_msg || "",
    };
  } else {
    // fallback (e.g. text, number, etc.)
    fieldConfig = {
      ...fieldConfig,
      type: fieldType.type || "text",
      defaultValue: fieldType.value || "",
    };
  }

  filterFields.push(fieldConfig);
});

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
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
  // const columnConfig = {
  //   supplierName: { disabled: true },
  //   pnrTicketNumber: { disabled: true },
  //   invoiceNumber: { disabled: true },
  //   invoiceDate: { disabled: true },
  //   type: { disabled: false },
  //   taxClaimable: { disabled: false },
  //   status: { disabled: false },
  // };


const handleChange = (values: Record<string, any>) => {  
  Object.entries(values).forEach(([key, val]) => {
    const field = filterFields.find(f => f.key === key);

    if (field?.options) {
      const selectedOption = field.options.find((opt: any) => opt.value === val);      
      switch (key) {
        case "status":
          setStatusId((selectedOption as any)?.optionId ?? null);
          break;
        case "type":
          setTypeId((selectedOption as any)?.optionId ?? null);
          break;
        case "travlevendor":
          setTravelVendorId((selectedOption as any)?.optionId ?? null);
          break;
          case "airlineFilter":
            setAirlineId((selectedOption as any)?.optionId ?? null);
            break;
        default:
          break;
      }
    }
  });
  const range = values.start;
    if (Array.isArray(range) && range.length === 2) {
    const [start, end] = range;
    const startDate = dayjs(start).format("YYYY-MM-DD");
    const endDate = dayjs(end).format("YYYY-MM-DD");
    setStartDate(startDate);
    setEndDate(endDate);
  }
};
const selectedOptionIds = {
  category: selectedCategory,
  status: statusId,
  type: typeId,
  travelvendor: travelvendorId,
  start:startDate,
  end: endDate,
  airline: airlineId,
};
  const totalPages = Math.ceil(count / pageSize); // calculate total pages

  const handleGoToPage = () => {
    const pageNumber = parseInt(goToPageValue);

    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber); // triggers API call via useEffect
      setGoToPageValue("");
    }
  };

  const allColumns = matchedHeaders.map((h: any) => ({
    title: h.headerName,
    dataIndex: h.template,
    key: h.template,
    render: (text: string) => text || "-",
  }));
;

  return (
    <div className="slide-up cls-reconciliation-container">
      {/* Breadcrumb */}
      {/* Page Title */}
      <h2 className="cls-reconciliation-title">
        {translate("reconciliationHistory")} <span>{selectedCategory}</span>
      </h2>

      {/* Type Selection */}
      <div className="cls-type-selection">
        <Radio.Group defaultValue="agency" size="large" onChange={(e) => setSelectedCategory(e.target.value)}>
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
          filterData={selectedOptionIds}
          setReconciliationData={setReconciliationData}
          category= {selectedCategory}
          apiservice= {reconcilService}
          onChange={(values) => {
            handleChange(values);
          }}
          onReset={() => reconcilService({ page: currentPage, page_size: pageSize, category: selectedCategory })}
        />)
        }
        
      {isLoading ? <StatusCountSkeleton/> : <StatusCount statusApi={statusCountData ?? []}/> }

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
          <FileDownload service={reconcilService} fileName="reconciliation" filterData={selectedOptionIds}/>
          </div>
          {isLoading ? <TableSkeleton/> : 
          <Table
            columns={allColumns}
            dataSource={tableData}
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
