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
} from "antd";
import {
  InboxOutlined,
  CloseOutlined,
  FileOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { RootState } from "../store/store";
import {
  setUploadType,
  setSubOption,
  addFiles,
  removeFile,
  updateFileStatus,
  clearFiles,
} from "../store/slices/uploadSlice";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/Upload.scss";

const { Dragger } = AntUpload;
const { Text } = Typography;

const Upload: React.FC = () => {
  const dispatch = useDispatch();
  const { files, uploadType, subOption, loading } = useSelector(
    (state: RootState) => state.upload,
  );
  const { translate } = useTheme();
  const [dragOver, setDragOver] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [activeTab, setActiveTab] = useState("non-ayp");

  const handleUploadTypeChange = (e: any) => {
    dispatch(setUploadType(e.target.value));
  };

  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});

  const uploadProps = {
    name: "file",
    multiple: true,
    accept: ".csv,.xls,.xlsx,.pdf,.doc,.docx",
    showUploadList: false,
    beforeUpload: (file: File) => {
      const isValidType =
        file.type === "text/csv" ||
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      if (!isValidType) {
        message.error("You can only upload CSV, Excel, PDF, or Word files!");
        return false;
      }

      const isValidSize = file.size / 1024 / 1024 < 50;
      if (!isValidSize) {
        message.error("File must be smaller than 50MB!");
        return false;
      }

      const newFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading" as const,
      };

      dispatch(addFiles([newFile]));

      // Simulate upload progress with real-time updates
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5; // More consistent progress increments
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadProgress((prev) => ({ ...prev, [newFile.id]: progress }));
          dispatch(updateFileStatus({ id: newFile.id, status: "success" }));
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

  const handleRemoveFile = (fileId: string) => {
    dispatch(removeFile(fileId));
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
            onChange={setActiveTab}
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
                You can upload bookings of any other travel agency. Kindly
                upload the booking data in given sample format.
              </div>
              <div className="cls-upload-center">
                <div className="cls-upload-icon-border">
                  <div className="cls-upload-icon">
                    <PlusOutlined />
                  </div>
                </div>
                <div className="cls-upload-main-text">
                  Drag & drop your file here
                </div>
                {/* File Type and Limit Info */}
                <div className="cls-file-info">
                  <div>
                    Supported Files: <strong>CSV, XLS</strong>
                  </div>
                  <div>Upload up to 3 file. Each max file size 5MB</div>
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
                          onClick={() => handleRemoveFile(file.id)}
                        />
                      </div>
                    </div>

                    {file.status === "uploading" && (
                      <div className="cls-progress-section">
                        <div className="cls-upload-spinner">
                          <div className="cls-spinner"></div>
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#666",
                              marginLeft: 8,
                            }}
                          >
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
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#52c41a",
                            marginLeft: 8,
                          }}
                        >
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