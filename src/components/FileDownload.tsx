import React, { useState } from "react";
import { DownloadOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Checkbox } from "antd";
import dayjs from "dayjs";
import { useTheme } from "../contexts/ThemeContext";
import { downloadCSV, downloadXLS } from "../Utils/commonFunctions";
import Filter from "../components/Filters/Filters";
import "../styles/CumulativeInvoice.scss";
import "../styles/Reconciliation.scss";

type FileDownloadProps = {
  service: (param: any) => Promise<any>; // correct typing
  fileName?: string;
};

const FileDownload: React.FC<FileDownloadProps> = ({ service, fileName = "invoice" }) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [dateRangeCond, setDateRangeCond] = useState(false);
  const { translate } = useTheme();
  const category: "agency" | "airline" = "agency";

  const handleDownload = async (format: "csv" | "xls") => {
    if (!startDate || !endDate) {
      console.warn("Please select both start and end dates");
      return;
    }

    const response = await service({
      start: startDate ?? undefined,
      end: endDate ?? undefined,
      category,
      Download: true,
    }).unwrap?.(); // if using RTK mutation, `.unwrap()` is available

    if (format === "csv") {
      downloadCSV(response, `${fileName}.csv`);
    } else if (format === "xls") {
      downloadXLS(response, `${fileName}.xls`);
    }
  };

  // rest of your component unchanged ...
  const columnConfig = {
    AirlineName: { disabled: true },
    pnrTicketNo: { disabled: true },
    invoiceNo: { disabled: true },
    invoiceDate: { disabled: true },
    type: { disabled: false },
    travelVendor: { disabled: false },
    action: { disabled: false },
  };

  const columnTitleMapping = {
    AirlineName: translate("Airline name"),
    pnrTicketNo: translate("pnrTicketNumber"),
    invoiceNo: translate("invoiceNumber"),
    invoiceDate: translate("invoiceDate"),
    type: translate("type"),
    travelVendor: translate("travelVendor"),
    action: "Action",
  };

  type FilterField = {
    key: string;
    type: string;
    label: string;
  };

  const filterFields: FilterField[] = [
    {
      key: "travelDate",
      type: "dateRange",
      label: "Travel Date",
    },
  ];

  const [visibleColumns, setVisibleColumns] = useState({
    AirlineName: true,
    pnrTicketNo: true,
    invoiceNo: true,
    invoiceDate: true,
    type: true,
    travelVendor: true,
    action: true,
  });

  const downloadFile = () => {
    setDateRangeCond(true);
  };

  const handleDateRange = (values: any) => {
    const range = Object.values(values)[0];
    if (Array.isArray(range) && range.length === 2) {
      const [start, end] = range;
      setStartDate(dayjs(start).format("YYYY-MM-DD"));
      setEndDate(dayjs(end).format("YYYY-MM-DD"));
    }
  };

  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const filterDropdownRef = React.useRef(null);

  return (
    <div className="cls-table-header-actions">
      <FilterOutlined
        className="cls-external-filter-icon"
        onClick={() => setFilterDropdownVisible(!filterDropdownVisible)}
      />
      <Button
        icon={<DownloadOutlined />}
        className="cls-export-button cls-xls"
        onClick={downloadFile}
      >
        XLS
      </Button>
      <Button
        icon={<DownloadOutlined />}
        className="cls-export-button cls-csv"
        onClick={downloadFile}
      >
        CSV
      </Button>
      {dateRangeCond && (
        <>
          <Filter
            fields={[
              {
                ...filterFields.find((f) => f.key === "travelDate")!,
                type: "dateRange",
                label: "",
              },
            ]}
            pathname="/cumulative"
            onChange={handleDateRange}
          />

          <button className="cls-download" onClick={() => handleDownload("csv")}>
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
              className="cls-filter-closeBtn"
            >
              ×
            </Button>
          </div>
          <div className="cls-filter-content">
            {Object.keys(visibleColumns).map((key) => (
              <div key={key} className="cls-filter-option">
                <Checkbox
                  checked={visibleColumns[key as keyof typeof visibleColumns]}
                  disabled={
                    columnConfig[key as keyof typeof columnConfig]?.disabled || false
                  }
                  onChange={(e) =>
                    setVisibleColumns((prev) => ({
                      ...prev,
                      [key]: e.target.checked,
                    }))
                  }
                >
                  {columnTitleMapping[key as keyof typeof columnTitleMapping] || key}
                </Checkbox>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDownload;
