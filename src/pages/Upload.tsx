import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Radio,
  Button,
  Upload as AntUpload,
  message,
  Progress,
  Alert,
  Tabs,
  Typography,
  UploadFile
} from "antd";
import {
  CloseOutlined,
  FileOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { RootState } from "../store/store";
// type SubOption = 'non-ayp' | 'gstr-2a';
import {
  setUploadType,
  addFiles,
  removeFile,
  updateFileStatus,
  setSubOption, SubOption
} from "../store/slices/uploadSlice";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/Upload.scss";

const { Dragger } = AntUpload;
const { Text } = Typography;

const Upload: React.FC = () => {
  const dispatch = useDispatch();
    const activeTab = useSelector((state: RootState) => state.upload.subOption);
  const allFiles = useSelector((state: RootState) => state.upload.files);
  const files = allFiles[activeTab];
  const uploadType = useSelector((state: RootState) => state.upload.uploadType);
  const { translate } = useTheme();
  const [dragOver, setDragOver] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleUploadTypeChange = (e: any) => {
    dispatch(setUploadType(e.target.value));
  };

  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});

  const uploadProps = {
    name: "file",
    multiple: true,
    accept: ".csv,.xls,.xlsx",
    showUploadList: false,
    disabled: files.length >= 3,
    beforeUpload: (file: File) => {
      // Check file limit first
      if (files.length >= 3) {
        message.error("Maximum 3 files allowed. Remove existing files to upload new ones.", 5);
        return false;
      }

      const isValidType =
        file.type === "text/csv" ||
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.name.toLowerCase().endsWith('.csv') ||
        file.name.toLowerCase().endsWith('.xls') ||
        file.name.toLowerCase().endsWith('.xlsx');

      if (!isValidType) {
        message.error("You can only upload CSV and Excel (.xls, .xlsx) files!");
        return false;
      }

      const isValidSize = file.size / 1024 / 1024 < 5;
      if (!isValidSize) {
        message.error("File must be smaller than 5MB!");
        return false;
      }

      const newFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading" as const,
      };

      dispatch(addFiles({ tabKey: activeTab, files: [newFile] }));

      // Simulate upload progress with real-time updates
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5; // More consistent progress increments
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadProgress((prev) => ({ ...prev, [newFile.id]: progress }));
          dispatch(updateFileStatus({ tabKey: activeTab, id: newFile.id, status: "success" }));
        } else {
          setUploadProgress((prev) => ({ ...prev, [newFile.id]: progress }));
        }
      }, 300);

      return false;
    },
    onDragEnter: (e: any) => {
      e.preventDefault();
      setDragOver(true);
    },
    onDragLeave: (e: any) => {
      e.preventDefault();
      setDragOver(false);
    },
    onDragOver: (e: any) => {
      e.preventDefault();
      setDragOver(true);
    },
    onDrop: (e: any) => {
      e.preventDefault();
      setDragOver(false);
    },
  };

  const handleRemoveFile = (file: UploadFile) => {
    dispatch(removeFile({ tabKey: activeTab, fileId: file.id }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(0)) + " " + sizes[i];
  };

  const handleSubmit = () => {
    message.success("Files submitted successfully!");
  };

  const tabItems = [
    {
      key: "non-ayp",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>Non-AYP Bookings</span>
        </div>
      ),
      children: (
        <div className="cls-tab-content">
          <InfoCircleOutlined />
          Non-AYP bookings are reservations made outside the approved AYP
          program or policy.
        </div>
      ),
    },
    {
      key: "gstr-2a",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>GSTR-2A</span>
        </div>
      ),
      children: (
        <div className="cls-tab-content">
          <InfoCircleOutlined />
          It is an auto-drafted purchase return statement showing inward
          supplies from your suppliers as per their GSTR-1 filings
        </div>
      ),
    },
  ];

  return (
    <div className="slide-up cls-upload-container">
      {/* Page Title */}
      <h2 className="cls-page-title">{translate("uploadFiles")}</h2>

      {/* Success Message */}
      {successMessage && (
        <Alert
          message={successMessage}
          type="success"
          showIcon
          closable
          onClose={() => setSuccessMessage("")}
          className="cls-success-alert"
        />
      )}

      {/* Type Selection */}
      <div className="cls-upload-type-section">
        <Radio.Group
          value={uploadType}
          onChange={handleUploadTypeChange}
          size="large"
        >
          <Radio value="agency">{translate("agency")}</Radio>
          <Radio value="airline">{translate("airline")}</Radio>
        </Radio.Group>
      </div>

      {/* Single Upload Card with Tabs */}
      <Card className="cls-upload-card">
        <div className="cls-tabs-container">
          <Tabs
            activeKey={activeTab}
            onChange={(key) => dispatch(setSubOption(key as SubOption))}
            items={tabItems}
          />
        </div>

        <div className="cls-upload-content">
          {/* Main Upload Section with Side-by-side Layout */}
          <div className="cls-upload-layout">
            {/* Upload Area - Left Side */}
            <Dragger
              {...uploadProps}
              className={`cls-upload-area ${dragOver ? "cls-drag-over" : ""}`}
            >
              <div className="cls-info">
                <InfoCircleOutlined />
                {activeTab === "non-ayp" 
                  ? "You can upload bookings of any other travel agency. Kindly upload the booking data in the given sample format."
                  : "GSTR-2A is an auto-drafted purchase return statement showing inward supplies from your suppliers as per their GSTR-1 filings."
                }
              </div>
              <div className="cls-upload-center">
                <div className="cls-upload-icon-border">
                  <div className="cls-upload-icon cls-animated-upload">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      <path className="cls-upload-arrow" d="M12,19L8,15H10.5V10H13.5V15H16L12,19Z" />
                    </svg>
                  </div>
                </div>
                <div className="cls-upload-main-text">
                  Drag & drop your file here
                </div>
                {/* File Type and Limit Info */}
                <div className="cls-file-info">
                  <div>
                    Supported Files: <strong>CSV, XLS, XLSX</strong>
                  </div>
                  <div>Upload up to 3 files. Each max file size 5MB</div>
                  {files.length > 0 && (
                    <div className={`cls-file-count-status ${files.length >= 3 ? "cls-limit-reached" : "cls-normal"}`}>
                      {files.length}/3 files uploaded
                      {files.length >= 3 && ' - Limit reached'}
                    </div>
                  )}
                </div>

                {/* <div className="cls-upload-or-text">or</div>

                <Button type="link" className="cls-select-file-btn">
                  Select File
                </Button> */}
              </div>

              {/* Sample File Button */}
              <Button className="cls-sample-file-btn">
                <DownloadOutlined />
                Sample file
              </Button>
            </Dragger>

            {/* Files Display - Right Side */}
            {files.length > 0 && (
              <div className="cls-files-display">
                <div className="cls-files-header">
                  {files.some((file) => file.status === "uploading")
                    ? "Files are uploading ..."
                    : ""}
                </div>

                {files.map((file) => (
                  <div key={file.id} className="cls-file-item">
                    <div className="cls-file-header">
                      <div className="cls-file-info-section">
                        <div className="cls-file-icon">
                          <FileOutlined />
                        </div>
                        <div className="cls-file-details">
                          <div className="cls-file-name">{file.name}</div>
                        </div>
                      </div>

                      <div className="cls-file-actions">
                        <span className="cls-file-size">
                          {formatFileSize(file.size)}
                        </span>
                        <CloseOutlined
                          className="cls-remove-file"
                          onClick={() => handleRemoveFile(file)}
                        />
                      </div>
                    </div>

                    {file.status === "uploading" && (
                      <div className="cls-progress-section">
                        <div className="cls-upload-spinner">
                          <div className="cls-spinner"></div>
                          <Text className="cls-upload-spinner-text">
                            Uploading...
                          </Text>
                        </div>
                        <Progress
                          percent={Math.floor(uploadProgress[file.id] || 0)}
                          size="small"
                          strokeColor="#1890ff"
                          showInfo={false}
                        />
                      </div>
                    )}

                    {file.status === "success" && (
                      <div className="cls-success-indicator">
                        <div className="cls-success-tick">✓</div>
                        <Text className="cls-upload-success-text">
                          Upload completed
                        </Text>
                      </div>
                    )}
                  </div>
                ))}

              </div>
            )}
          </div>

          {/* Submit Section */}
          <div className="cls-submit-section">
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              className="cls-submit-btn"
            >
              {translate("submit")}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Upload;
