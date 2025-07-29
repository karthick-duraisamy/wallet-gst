import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Upload,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Space,
  Radio,
  Tabs,
  Table,
  Input,
  Select,
  Tag,
} from "antd";
import {
  InboxOutlined,
  StarFilled,
  DownloadOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { RootState } from "../store/store";
import { setFiles, removeFile } from "../store/slices/uploadSlice";

const { Title, Text } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

const Upload_Page: React.FC = () => {
  const dispatch = useDispatch();
  const { files } = useSelector((state: RootState) => state.upload);
  const [uploadType, setUploadType] = useState<string>("single");
  const [activeTab, setActiveTab] = useState<string>("upload");

  const uploadProps = {
    name: "file",
    multiple: true,
    showUploadList: false,
    beforeUpload: (file: any) => {
      dispatch(setFiles([...files, file]));
      return false;
    },
  };

  const handleRemoveFile = (index: number) => {
    dispatch(removeFile(index));
  };

  const columns = [
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      fixed: "left" as const,
      width: 150,
    },
    {
      title: "Invoice Date",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      width: 120,
    },
    {
      title: "Supplier Name",
      dataIndex: "supplierName",
      key: "supplierName",
      width: 200,
    },
    {
      title: "GSTIN",
      dataIndex: "gstin",
      key: "gstin",
      width: 150,
    },
    {
      title: "Taxable Value",
      dataIndex: "taxableValue",
      key: "taxableValue",
      width: 130,
    },
    {
      title: "CGST",
      dataIndex: "cgst",
      key: "cgst",
      width: 100,
    },
    {
      title: "SGST",
      dataIndex: "sgst",
      key: "sgst",
      width: 100,
    },
    {
      title: "IGST",
      dataIndex: "igst",
      key: "igst",
      width: 100,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 130,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      fixed: "right" as const,
      width: 100,
      render: (status: string) => (
        <Tag color={status === "Valid" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Filter",
      dataIndex: "filter",
      key: "filter",
      fixed: "right" as const,
      width: 80,
      render: () => (
        <Button type="link" size="small">
          Filter
        </Button>
      ),
    },
  ];

  const mockData = [
    {
      key: "1",
      invoiceNumber: "INV-001",
      invoiceDate: "2024-01-15",
      supplierName: "ABC Corp",
      gstin: "29ABCDE1234F1Z5",
      taxableValue: "10000",
      cgst: "900",
      sgst: "900",
      igst: "0",
      totalAmount: "11800",
      status: "Valid",
    },
    {
      key: "2",
      invoiceNumber: "INV-002",
      invoiceDate: "2024-01-16",
      supplierName: "XYZ Ltd",
      gstin: "27PQRST5678G2A1",
      taxableValue: "15000",
      cgst: "1350",
      sgst: "1350",
      igst: "0",
      totalAmount: "17700",
      status: "Invalid",
    },
  ];

  return (
    <div className="upload-page-container">
      <Card className="upload-main-card">
        <div className="upload-card-header">
          <div className="upload-title-section">
            <Title level={2} className="upload-title">
              Upload GST Files
            </Title>
            <StarFilled className="upload-star-icon" />
          </div>
          <Text type="secondary">
            Upload your GST files for processing and reconciliation
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <div className="upload-section">
              <div className="upload-radio-section">
                <Radio.Group
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value)}
                  className="upload-radio-group"
                >
                  <Radio value="single">Single File Upload</Radio>
                  <Radio value="bulk">Bulk File Upload</Radio>
                </Radio.Group>
              </div>

              <Dragger {...uploadProps} className="upload-area-main">
                <div className="upload-icon-container">
                  <InboxOutlined className="upload-plus-icon" />
                </div>
                <p className="upload-main-text">
                  Click or drag file to this area to upload
                </p>
                <p className="upload-or-text">or</p>
                <Button type="link" className="select-file-btn">
                  Select Files
                </Button>
              </Dragger>

              <div className="sample-file-section">
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  className="sample-file-btn"
                >
                  Download Sample File
                </Button>
              </div>

              {files.length > 0 && (
                <div className="upload-file-list">
                  <Title level={4} className="upload-file-list-title">
                    Uploaded Files ({files.length})
                  </Title>
                  {files.map((file, index) => (
                    <div key={index} className="upload-file-item">
                      <div className="upload-file-info">
                        <div>
                          <div className="upload-file-name">{file.name}</div>
                          <div className="upload-file-size">
                            {(file.size / 1024).toFixed(2)} KB
                          </div>
                          <div className="upload-file-success">
                            <CheckCircleOutlined /> Uploaded successfully
                          </div>
                        </div>
                      </div>
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveFile(index)}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="upload-submit-section">
                <Button
                  type="primary"
                  size="large"
                  className="upload-submit-btn"
                  disabled={files.length === 0}
                >
                  Process Files
                </Button>
              </div>
            </div>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Upload Guidelines" size="small">
              <Space direction="vertical" size="small">
                <Text>• Accepted formats: .xlsx, .csv, .pdf</Text>
                <Text>• Maximum file size: 10MB</Text>
                <Text>• Ensure proper GST format</Text>
                <Text>• Check data completeness</Text>
              </Space>
            </Card>

            <Card title="Recent Uploads" size="small" style={{ marginTop: 16 }}>
              <Space direction="vertical" size="small">
                <Text>• GST_Returns_Jan2024.xlsx</Text>
                <Text>• Purchase_Register_Q4.csv</Text>
                <Text>• Invoice_Data_Dec2023.xlsx</Text>
              </Space>
            </Card>
          </Col>
        </Row>

        <div style={{ marginTop: 32 }}>
          <Table
            columns={columns}
            dataSource={mockData}
            className="custom-table"
            scroll={{ x: 1200 }}
            pagination={false}
          />
        </div>
      </Card>
    </div>
  );
};

export default Upload_Page;