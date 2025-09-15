import React, { useState } from "react";
import { DownloadOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Checkbox, Modal } from "antd";
// import dayjs from "dayjs";
import { useTheme } from "../contexts/ThemeContext";
import { downloadCSV, downloadXLS, cleanObject } from "../Utils/commonFunctions";

import "../styles/CumulativeInvoice.scss";
import "../styles/Reconciliation.scss";

type FileDownloadProps = {
  service: (payload: any) => { unwrap: () =>Promise<any>};
  fileName?: string;
  filterData?: 
  { 
    category?: string | null,
    status?: number | null; 
    type?: number | null;
    travelVendor?: number | null;
    start?:string | null;
    end?:string | null;
    airline?: number | null;
  }
};

const FileDownload: React.FC<FileDownloadProps> = ({ service, fileName = "invoice", filterData }) => {
  const { translate } = useTheme();
  // Modal ok button functionality
  const handleOk = async () => {
   if(!exportFormat) return;
    const payload = {
    ...cleanObject(filterData || {}),
    download: true,
  };
  const response = await service(payload).unwrap?.();
    
    if (exportFormat  === "csv") {
      downloadCSV(response, `${fileName}.csv`);
    } else if (exportFormat  === "xls") {
      downloadXLS(response, `${fileName}.xls`);
    }
    setIsModalOpen(false);
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
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const filterDropdownRef = React.useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"csv" | "xls" | null>(null);

  const showModal = (type:"csv" | "xls") => {
    setExportFormat(type);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cls-table-header-actions">
      <FilterOutlined
        className="cls-external-filter-icon"
        onClick={() => setFilterDropdownVisible(!filterDropdownVisible)}
      />
      <Button
        icon={<DownloadOutlined />}
        className="cls-export-button cls-xls"
        // onClick={downloadFile}
        onClick={()=>showModal('xls')}
      >
        XLS
      </Button>
      <Button
        icon={<DownloadOutlined />}
        className="cls-export-button cls-csv"
        // onClick={downloadFile}
        onClick={()=>showModal('csv')}
      >
        CSV
      </Button>
      {/* Modal design  */}
        <>
          <Modal
            title="Confirmation Alert"
            open={isModalOpen} 
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Ok"
            cancelText="Cancel"
            className="cls-modal-popup"
          >
            <p>Are you sure, you want to download the file!</p>
          </Modal>
        </>

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
