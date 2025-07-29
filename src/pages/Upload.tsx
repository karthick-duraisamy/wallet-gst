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
} from "antd";
import {
  InboxOutlined,
  CloseOutlined,
  FileOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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

const { Dragger } = AntUpload;

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
      label: "Non-AYP Bookings",
      children: (
        <div
          style={{
            textAlign: "left",
            color: "#666",
            fontSize: "14px",
            marginTop: 24,
            marginBottom: 24,
            margin: "25px 15px",
            padding: "8px 14px",
            background: "#e6f3ff",
            borderRadius: "8px",
            border: "1px solid #91d5ff",
          }}
        >
          <InfoCircleOutlined style={{ color: "#1890ff", marginRight: 8 }} />
          Kindly upload the file downloaded from GSTR-2A of respective travel
          agencies for reconciliation of the booking fees.
        </div>
      ),
    },
    {
      key: "gstr-2a",
      label: "GSTR-2A",
      children: (
        <div
          style={{
            textAlign: "left",
            color: "#666",
            fontSize: "14px",
            marginTop: 16,
            marginBottom: 16,
            margin: "25px 15px",
            padding: "8px 14px",
            background: "#e6f3ff",
            borderRadius: "8px",
            border: "1px solid #91d5ff",
          }}
        >
          <InfoCircleOutlined style={{ color: "#1890ff", marginRight: 8 }} />
          Upload GSTR-2A data for tax reconciliation purposes.
        </div>
      ),
    },
  ];

  return (
    <div
      className="slide-up"
      style={{
        padding: "24px",
        background: "#f5f5f5",
        minHeight: "100vh",
        paddingTop: "0px",
      }}
    >
      {/* Page Title */}
      <h2
        style={{
          fontSize: "24px",
          fontWeight: 600,
          color: "#722ed1",
          marginBottom: 24,
        }}
      >
        {translate("uploadFiles")}
      </h2>

      {/* Success Message */}
      {successMessage && (
        <Alert
          message={successMessage}
          type="success"
          showIcon
          closable
          onClose={() => setSuccessMessage("")}
          style={{
            marginBottom: 24,
            borderRadius: 8,
            animation: "slideInDown 0.5s ease-out",
          }}
        />
      )}

      {/* Type Selection */}
      <div style={{ marginBottom: 24 }}>
        <Radio.Group
          value={uploadType}
          onChange={handleUploadTypeChange}
          size="large"
        >
          <Radio value="agency" style={{ fontWeight: 500 }}>
            {translate("agency")}
          </Radio>
          <Radio value="airline" style={{ fontWeight: 500 }}>
            {translate("airline")}
          </Radio>
        </Radio.Group>
      </div>

      {/* Single Upload Card with Tabs */}
      <Card
        style={{
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          marginBottom: 24,
          overflow: "hidden",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          style={{
            ".ant-tabs-nav": {
              margin: 0,
              background: "#fafafa",
              borderBottom: "1px solid #f0f0f0",
            },
          }}
          tabBarStyle={{
            margin: 0,
            background: "#fafafa",
          }}
        />

        <div style={{ padding: "24px", paddingTop: "0px" }}>
          {/* Main Upload Section with Side-by-side Layout */}
          <div
            style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}
          >
            {/* Upload Area - Left Side */}
            <Dragger
              {...uploadProps}
              className="upload-area-hover"
              style={{
                border: `2px dashed ${dragOver ? "#4f46e5" : "#d9d9d9"}`,
                borderRadius: 8,
                background: dragOver ? "#f8f9ff" : "#fafafa",
                marginBottom: 16,
                minHeight: 240,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease-in-out",
                cursor: "pointer",
                flex: 1,
                paddingTop: 15,
                width: 700,
                transform: dragOver ? "translateY(-2px)" : "translateY(0)",
                boxShadow: dragOver
                  ? "0 8px 24px rgba(79, 70, 229, 0.15)"
                  : "none",
              }}
            >
              {/* File Type and Limit Info */}
              <div
                style={{
                  textAlign: "center",
                  marginBottom: 24,
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                <div style={{ marginBottom: 4 }}>
                  Supported Files: <strong>CSV, XLS</strong>
                </div>
                <div>Upload up to 3 file. Each max file size 5MB</div>
              </div>

              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  minHeight: "120px",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: "#1890ff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                    transition: "all 0.3s ease",
                  }}
                >
                  <PlusOutlined style={{ color: "white", fontSize: 20 }} />
                </div>

                <div
                  style={{ fontSize: "16px", color: "#333", marginBottom: 8 }}
                >
                  Drag & drop your file here
                </div>

                <div
                  style={{ fontSize: "14px", color: "#666", marginBottom: 12 }}
                >
                  or
                </div>

                <Button
                  type="link"
                  style={{
                    color: "#1890ff",
                    fontWeight: 500,
                    fontSize: "14px",
                    textDecoration: "underline",
                  }}
                >
                  Select File
                </Button>
              </div>

              {/* Sample File Button */}
              <Button
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  background: "#52c41a",
                  borderColor: "#52c41a",
                  color: "white",
                  borderRadius: "20px 0px 0px 0px",
                  fontWeight: 500,
                  fontSize: "14px",
                  height: 45,
                  padding: "15px",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <DownloadOutlined style={{ fontSize: 16 }} />
                Sample file
              </Button>
            </Dragger>

            {/* Files Display - Right Side */}
            {files.length > 0 && (
              <div
                style={{
                  width: "280px",
                  borderRadius: "12px",
                  padding: "20px",
                  minHeight: "240px",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#333",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {files.some((file) => file.status === "uploading")
                    ? "Files are uploading ..."
                    : ""}
                </div>

                {files.map((file) => (
                  <div
                    key={file.id}
                    style={{
                      marginBottom: "12px",
                      background: "white",
                      borderRadius: "8px",
                      padding: "12px",
                      border: "1px solid #e9ecef",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          flex: 1,
                        }}
                      >
                        <div
                          style={{
                            width: "24px",
                            height: "24px",
                            background: "#1890ff",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FileOutlined
                            style={{ color: "white", fontSize: "12px" }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: 500,
                              color: "#333",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              width:'110px'
                            }}
                          >
                            {file.name}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#666",
                          }}
                        >
                          {formatFileSize(file.size)}
                        </span>
                        <CloseOutlined
                          style={{
                            color: "#999",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                          onClick={() => handleRemoveFile(file.id)}
                        />
                      </div>
                    </div>

                    {file.status === "uploading" && (
                      <div style={{ marginTop: "8px" }}>
                        <Progress
                          percent={Math.floor(uploadProgress[file.id] || 0)}
                          size="small"
                          strokeColor="#1890ff"
                          showInfo={false}
                          style={{ margin: 0 }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Section */}
          <div style={{ textAlign: "right" }}>
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              style={{
                minWidth: 120,
                height: 40,
                borderRadius: 6,
                fontWeight: 500,
                backgroundColor: "#4f46e5",
                borderColor: "#4f46e5",
              }}
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