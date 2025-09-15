import React, { useState, useEffect } from "react";
import { Card, Radio, Tabs, Input, Button, Select, Typography, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useCummulativeServiceMutation as useInvoiceService  } from '../services/variables/variables'
import { useTheme } from "../contexts/ThemeContext";
import "../styles/CumulativeInvoice.scss";
import Filter from "../components/Filters/Filters";
import {TableSkeleton, PaginationSkeleton, StatusCountSkeleton} from '../components/SkeletonLoader/skeletonLoader';
import FileDownload from "../components/FileDownload";
import {CumulativeTabsSkeleton, CumulativeFilterskeleton} from "../components/SkeletonLoader/skeletonLoader";
import StatusCount from "../components/StatusCount/StatusCount";
import dayjs from "dayjs";

const { Title } = Typography;
const { TextArea } = Input;


const CumulativeInvoice: React.FC = () => {
  const [activeTab, setActiveTab] = useState("uploadpnr");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [goToPageValue, setGoToPageValue] = useState("");
  const [searchText, setSearchText] = useState("");
  const { translate } = useTheme();
  // Form states
  const [isInvoiceExpanded, setIsInvoiceExpanded] = useState(false);
  const [getAirlineInvoiceno, setInvoiceText] = useState("");
  const [isPnrDropdownOpen, setIsPnrDropdownOpen] = useState(false);
  const [pnrTicketType, setPnrTicketType] = useState("pnr");
  const [getPNRno, setgetPNRno] = useState("");
  const [pnrno, setpnrno] = useState("");
  const [typeId, settypeId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"agency" | "airline">("agency");
  const [getTicketno, setgetTicketno] = useState("");
  const [travelMode, settravelMode] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [CumulativeData, setCumulativeData] = useState<any[]>([]); //State for list update.


  
  const handleInvoiceToggle = () => {
    setIsInvoiceExpanded(!isInvoiceExpanded);
  };


  const handlePnrDropdownClick = () => {
    setIsPnrDropdownOpen(!isPnrDropdownOpen);
  };

  const [cummulativeService, { data, isLoading}] = useInvoiceService ();

  //Tab responese and data set
  const tabHeader = (data as any)?.response?.data?.results?.jsonTab?.data || [];
  
  const tabItems = tabHeader.map((item: any) => ({
    key: item.id,
    label: item.name,
  }));
  // Prepare common data outside JSX
  const tabData = tabHeader.map((tab: any) => {
    const numericKeys = Object.keys(tab).filter(k => !isNaN(Number(k)));

    return numericKeys.map((key) => {
      const fields = tab[key] || [];
      const fieldWithTitle = fields.find((f: any) => f.title);
      
      return {
        key,
        tabName: tab.name,
        title: fieldWithTitle?.title || '',
        label: fieldWithTitle?.label,
        submitCount: fieldWithTitle?.submit_count || "",
        ticketFields: fields // all fields (PNR / Ticket) if needed
      };
    });
  });
  
  // After creating tabData, you can access the ticketFields
  const allTicketFields = tabData.flatMap((tabArray:any) => 
    tabArray.flatMap((item:any) => item.ticketFields)
  );

  // List header and body data set
  const info = (data as any)?.response?.data?.results;
  const header = info?.list_header.list_header;
  const allColumns = (header ?? []).map((h: any) => ({
    title: h.headerName,
    dataIndex: h.template,
    key: h.template,
    render: (text: string) => text || "-",
  }));
  // const listBody = info?.list_body ?? [];
  useEffect(() => {
    if ((data as any)?.response?.data?.results?.list_body) {
      setCumulativeData(
        (data as any).response.data.results.list_body
      );
    }
  }, [data]);
  //Status count api data
  const statusCountData = (data as any)?.response?.data?.results?.statusCount;
  
  const filteredData = CumulativeData.filter((item:any) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
  )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!a?.invoice_date) return 1;   // put a at the end
    if (!b?.invoice_date) return -1;  // put b at the end
    return a.invoice_date.localeCompare(b.invoice_date);
    
  });
const tableData = CumulativeData.length > 0 ? CumulativeData : sortedData;

  
  const [totalRecords, setTotalRecords] = useState(0);
  type FieldType = "select" | "dropdown" | "text";
  // Define a type for filter field
  type FilterField = {
    key: string;
    type: FieldType;
    label: string;
    options?: { label: string; value: string}[];
    optionId?:number
    defaultValue?: string;
    placeholder?: string;
  };
  

const taxInvoiceTab = tabData?.[3];

const taxInvoiceFieldsRaw = taxInvoiceTab?.[0]?.ticketFields || [];

const filterFields: FilterField[] =
  (taxInvoiceFieldsRaw
    .map((field: any) => {
      if (!field) return null;

      if (field.format === "dropdown") {
        return {
          key: field.formcontrol,
          type: "select" ,
          label: field.label,
          errorMsg: field.error_msg,
          options: field.dropdownData?.map((opt: any) => ({
            label: opt.label || opt.value,
            value: opt.value || opt.label || opt.airline_name,
            optionId : opt.id
          })) || [],
          placeholder: field.placeholder || "",
          defaultValue: field.value || (field.dropdown?.[0]?.value ?? ""),
        };
      }
      if (field.format === "calendar") {
        return {
          key: field.formcontrol,
          keyEnd: field.formcontrol1 || null,
          type: "dateRange",
          label: field.label,
          placeholderStart: field.placeholder || "",
          placeholderEnd: field.placeholder1 || ""
        };
      }

      return null;
    })
    .filter(Boolean) as FilterField[]) || [];

  const handleFilterChange = (values: Record<string, any>) => {
    
    Object.entries(values).forEach(([key, val]) => {
      const field = filterFields.find((f) => f.key === key);
      if (field?.options) {
        const selectedOption = field.options.find((opt) => opt.value === val);
        switch (key) {
          case "travelmode":
            settravelMode((selectedOption as any)?.optionId ?? null);
            break;
          case "tax_type":
            settypeId((selectedOption as any)?.optionId ?? null);
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
  const handleTabChange = (key: string) => {
    setActiveTab(key);

    const defaultVal = filterFields.find((f: any) =>{
      return f.key === 'tax_type';
    } );
    
    if(defaultVal?.defaultValue){
      
      const selectedOption = defaultVal?.defaultValue;
      
      settypeId((selectedOption as any)  ?? null);
      settravelMode((selectedOption as any) ?? null);
    }
    // Always reset user inputs
    setgetPNRno("");
    setgetTicketno("");
    setInvoiceText("");
    setStartDate(null);
    setEndDate(null);
    setgetPNRno("");
    setpnrno("");
};

  const selectedOptionIds = {
    category: selectedCategory,
    typeId: typeId,
    PNRno: getPNRno,
    Ticketno: getTicketno,
    InvoiceNo: getAirlineInvoiceno,
    PNR:pnrno,
    travelMode:travelMode,
    start: startDate,
    end: endDate
  };

  // useEffect(() => {
  //    if (selectedCategory) {
  //      cummulativeService({ page: currentPage, page_size: pageSize, category: selectedCategory});
  //    }
  // }, [currentPage, pageSize]);

  useEffect(() => {
    if (info) {
      setTotalRecords((data as any)?.response?.data?.count);
    }
  }, [data]);

  useEffect(() => {
    if (selectedCategory) {
      cummulativeService({
        page: currentPage,
        page_size: pageSize,
        category:selectedCategory,
      });
    }
  }, [currentPage, pageSize, selectedCategory]);

  const totalPages = Math.ceil(totalRecords / pageSize);

  const handleGoToPage = () => {
    const page = Number(goToPageValue);
    const totalPages = Math.ceil(totalRecords / pageSize);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setGoToPageValue("");
    }
  };

// Optional: If you want to set it based on available options
// Set up radio state
useEffect(() => {
  if (!allTicketFields || pnrTicketType) return; // 👈 don’t reset if user already chose

  const hasPNR = allTicketFields.some((item: any) =>
    item.ticket_details?.some((ticket: any) =>
      ticket.name?.toLowerCase().includes("pnr")
    )
  );

  if (hasPNR) {
    setPnrTicketType("pnr");
  } else {
    setPnrTicketType("ticket");
  }
}, [allTicketFields]); // no [pnrTicketType] here

  const renderTabContent = () => {
  switch (activeTab) {
    case "uploadpnr":
    case "uploadticket":
      return (
        <div className="cls-tab-content-area">
          {isLoading ? <CumulativeFilterskeleton/> : 

          <div className="cls-tab-content-layout">
            <div className="cls-sprt">
              {tabData[0]?.[0] && (
                <div>
                  <Button
                    onClick={handlePnrDropdownClick}
                    className="cls-upload-button"
                  >
                    <span>{tabData[0][0].title}</span>
                    <span className={isPnrDropdownOpen ? "cls-expanded" : "cls-collapsed"}>
                      ▲
                    </span>
                  </Button>

                  {/* Count display */}
                  <div className="cls-count-display">
                    <span>{tabData[0][0].submitCount}</span>
                    <span className="cls-info-icon">i</span>
                  </div>

                  {isPnrDropdownOpen && (
                    <div className="cls-dropdown-content">
                      <Button
                        type="text"
                        onClick={() => setIsPnrDropdownOpen(false)}
                        className="cls-close-button"
                      >
                        ×
                      </Button>

                      {/* Radio Section */}
                      <div className="cls-radio-section">
                        <Radio.Group
                          value={pnrTicketType}
                          onChange={(e) => setPnrTicketType(e.target.value)}
                        >
                          {allTicketFields?.map((item: any) =>
                            item.ticket_details?.map((ticket: any) => {
                              const normalizedValue = ticket.name?.toLowerCase().includes("pnr")
                                ? "pnr"
                                : "ticket";
                              return (
                                <Radio key={ticket.ticket_id} value={normalizedValue}>
                                  {ticket.name}
                                </Radio>
                              );
                            })
                          )}
                        </Radio.Group>
                      </div>

                      {/* Textarea Section */}
                      <div className="cls-textarea-section">
                        <div className="cls-textarea-label">
                          {pnrTicketType === "pnr" ? "Enter PNR No" : "Enter Ticket Number"}
                        </div>
                        <TextArea
                          value={pnrTicketType === "pnr" ? getPNRno : getTicketno}
                          onChange={(e) => {
                            if (pnrTicketType === "pnr") {
                              setgetPNRno(e.target.value);
                            } else {
                              setgetTicketno(e.target.value);
                            }
                          }}
                          placeholder={
                            pnrTicketType === "pnr"
                              ? "Enter PNR number"
                              : "Enter ticket number"
                          }
                          rows={6}
                        />
                      </div>

                      <div className="cls-example-section">
                        <div className="cls-example-box">
                          <span className="cls-example-label">Example : </span>
                          123456,123456
                        </div>
                      </div>

                      {/* <div className="cls-action-buttons">
                        <Button onClick={() => setIsPnrDropdownOpen(false)}>Cancel</Button>
                        <Button type="primary" onClick={handlePnrDropdownSubmit}>
                          Submit
                        </Button>
                      </div> */}
                    </div>
                  )}
                </div>
              )}
              <Filter
                key={activeTab}
                fields={filterFields.filter(f => f.label === "Type")}
                pathname="/cumulative"
                apiservice= {cummulativeService}
                // category= {selectedCategory}
                setCumulativeData={setCumulativeData}
                onChange={handleFilterChange}
                filterData={selectedOptionIds}
                showButtons={true}
                onReset={() => cummulativeService({ page: currentPage, page_size: pageSize, category: selectedCategory })}
              />
          </div>
          </div>
          }
        </div>
      );

    case "uploadinvoice":
    case "upload_invoice":
      return (
        <div className="cls-wrapper">
          <div className="cls-header">
            <div className="cls-sprt">
              {tabData[1]?.[0] && (
                <div>
                  <Button
                    onClick={handleInvoiceToggle}
                    className="cls-toggle-btn"
                  >
                    <span className="cls-toggle-text">{tabData[1][0].title}</span>
                    <span
                      className={`cls-toggle-icon ${isInvoiceExpanded ? "expanded" : "collapsed"}`}
                    >
                      ▲
                    </span>
                  </Button>

                  {/* Corrected Count display */}
                  <div className="cls-count">
                    <span>{tabData[1][0].submitCount}</span>
                    <span className="cls-count-info">i</span>
                  </div>

                  {isInvoiceExpanded && (
                    <div className="cls-expand-box">
                      <Button
                        type="text"
                        onClick={() => setIsInvoiceExpanded(false)}
                        className="cls-close-btn"
                      >
                        ×
                      </Button>

                      <div className="cls-expand-section">
                        <div className="cls-expand-title">Enter Invoice No</div>
                        <TextArea
                          value={getAirlineInvoiceno}
                          onChange={(e) => setInvoiceText(e.target.value)}
                          rows={6}
                          className="cls-textarea"
                          placeholder="Enter Invoice Number"
                        />
                      </div>

                      <div className="cls-example-box">
                        <span className="cls-example-label">Example : </span>
                        123456,123456
                      </div>

                      {/* <div className="cls-expand-actions">
                        <Button
                          onClick={() => setIsInvoiceExpanded(false)}
                          className="cls-cancel-btn"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="primary"
                          onClick={handleInvoiceSubmit}
                          className="cls-submit-btn"
                        >
                          Submit
                        </Button>
                      </div> */}
                    </div>
                  )}
                </div>
              )}

              <Filter
                key={activeTab}
                fields={filterFields.filter(f => f.label === "Type")}
                pathname="/cumulative"
                apiservice= {cummulativeService}
                setCumulativeData={setCumulativeData}
                // category= {selectedCategory}
                onChange={handleFilterChange}
                filterData={selectedOptionIds}
                showButtons={true}
                onReset={() => cummulativeService({ page: currentPage, page_size: pageSize, category: selectedCategory })}
              />
            </div>

            {/* <div className="cls-btnItems qw">
              <Button onClick={handleSubmit} className="cls-submitBtn">
                Submit
              </Button>
              <Button className="cls-resetBtn">Reset all</Button>
            </div> */}
          </div>
        </div>
      );

    case "ticketno":
    case "ticket_no":
      return (
        <div className="cls-container">
          <div className="cls-header">
            <div className="cls-sprt">
              {tabData[2]?.[0] && (
                <div key={tabData[1][0].id} className={`cls-inputGroup`}>
                  <label className="cls-label">{tabData[2][0].tabName}</label>
                  <Input
                    placeholder={tabData[2][0].ticketFields.map((place: any) => place.placeholder || '').join(', ')}
                    className="cls-input"
                    size="large"
                    value={pnrno}
                    onChange={(e) => setpnrno(e.target.value)}
                  />
                </div>
              )}

              <Filter
                fields={filterFields.filter(f => f.label === "Type")}
                pathname="/cumulative"
                apiservice= {cummulativeService}
                setCumulativeData={setCumulativeData}
                // category= {selectedCategory}
                onChange={handleFilterChange}
                filterData={selectedOptionIds}
                showButtons={true}
                onReset={() => cummulativeService({ page: currentPage, page_size: pageSize, category: selectedCategory })}
              />
            </div>

            {/* <div className="cls-btnItems ">
              <Button onClick={handleSubmit} className="cls-submitBtn">
                Submit
              </Button>
              <Button className="cls-resetBtn">Reset all</Button>
            </div> */}
          </div>
        </div>
      );

    case "taxinvoicedate":
    case "tax_invoicedate":
      return (
        <div className="cls-invoiceRange">
          <Filter
            fields={filterFields} 
            pathname="/cumulative"
            showButtons={true}
            onChange={handleFilterChange}
            apiservice= {cummulativeService}
            setCumulativeData={setCumulativeData}
            // category= {selectedCategory}
            filterData={selectedOptionIds}
            onReset={() => cummulativeService({ page: currentPage, page_size: pageSize, category: selectedCategory })}
          />
        </div>
      );

    default:
    return null;
  }
  };

  return (

    <div className="slide-up cls-cumulative-container">

      {/* Title */}
      <Title level={3} className="cls-cumulative-title">
        {translate("cumulativeInvoice")} <span>{selectedCategory}</span>
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
      {isLoading ? <CumulativeTabsSkeleton/> : 
      <div className="cls-tabs-section">
         {/* <CumulativeTabsSkeleton/> */}
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          items={tabItems}
          type="line"
        />
      </div>}
      {renderTabContent()}
      <div>
        {isLoading ? <StatusCountSkeleton/> : <StatusCount statusApi={statusCountData}/> }
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

              <FileDownload service={cummulativeService} fileName="cumulative_invoices" filterData={selectedOptionIds}/>
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
              rowKey={(record) => record.id}
            /> }
          </div>

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
                    setCurrentPage(1);
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

                <span className="pagination-text">Out of {totalRecords}</span>
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
                        className={`pagination-btn ${
                          i === currentPage ? "active" : ""
                        }`}
                      >
                        {i}
                      </Button>
                    );
                  }

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
                        className={`pagination-btn ${
                          totalPages === currentPage ? "active" : ""
                        }`}
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
