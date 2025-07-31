
import React, { useState, useCallback } from 'react';
import { 
  Card, 
  Upload as AntUpload, 
  Button, 
  Typography, 
  Space, 
  Alert,
  message,
  Progress,
  List,
  Tag,
  Row,
  Col
} from 'antd';
import { 
  InboxOutlined, 
  UploadOutlined, 
  DeleteOutlined,
  DownloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import '../styles/Upload.scss';

const { Title, Text } = Typography;
const { Dragger } = AntUpload;

interface UploadedFile {
  uid: string;
  name: string;
  status: 'uploading' | 'done' | 'error';
  size: number;
  type: string;
  progress?: number;
}

const Upload: React.FC = () => {
  const { isDarkMode, translate } = useTheme();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const MAX_FILES = 3;

  // Create and download sample XLS file
  const downloadSampleFile = () => {
    // Create sample data
    const sampleData = [
      ['Invoice Number', 'Date', 'Amount', 'Vendor', 'Status'],
      ['INV001', '2024-01-15', '15000', 'SpiceJet', 'Pending'],
      ['INV002', '2024-01-16', '25000', 'IndiGo', 'Processed'],
      ['INV003', '2024-01-17', '18500', 'Air India', 'Pending'],
      ['INV004', '2024-01-18', '32000', 'Vistara', 'Processed'],
      ['INV005', '2024-01-19', '12500', 'GoAir', 'Pending']
    ];

    // Convert to CSV format (simpler than XLS)
    const csvContent = sampleData.map(row => row.join(',')).join('\n');
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'sample_invoice_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    message.success('Sample file downloaded successfully!');
  };

  const isValidFileType = (file: File) => {
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    const validExtensions = ['.csv', '.xls', '.xlsx'];
    
    return validTypes.includes(file.type) || 
           validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
  };

  const beforeUpload = (file: File) => {
    // Check file type
    if (!isValidFileType(file)) {
      message.error('Only CSV and XLS/XLSX files are allowed!');
      return false;
    }

    // Check file count limit
    if (uploadedFiles.length >= MAX_FILES) {
      message.error(`Maximum ${MAX_FILES} files allowed!`);
      return false;
    }

    // Check file size (limit to 10MB)
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('File must be smaller than 10MB!');
      return false;
    }

    return true;
  };

  const handleUpload = (info: any) => {
    const { file, fileList } = info;
    
    if (file.status === 'uploading') {
      const newFile: UploadedFile = {
        uid: file.uid,
        name: file.name,
        status: 'uploading',
        size: file.size,
        type: file.type,
        progress: 0
      };
      
      setUploadedFiles(prev => {
        const existing = prev.find(f => f.uid === file.uid);
        if (existing) {
          return prev.map(f => f.uid === file.uid ? { ...f, progress: file.percent } : f);
        }
        return [...prev, newFile];
      });
    }
    
    if (file.status === 'done') {
      setUploadedFiles(prev => 
        prev.map(f => f.uid === file.uid ? { ...f, status: 'done', progress: 100 } : f)
      );
      message.success(`${file.name} uploaded successfully!`);
    }
    
    if (file.status === 'error') {
      setUploadedFiles(prev => 
        prev.map(f => f.uid === file.uid ? { ...f, status: 'error' } : f)
      );
      message.error(`${file.name} upload failed!`);
    }
  };

  const removeFile = (uid: string) => {
    setUploadedFiles(prev => prev.filter(file => file.uid !== uid));
    message.success('File removed successfully');
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'xls':
      case 'xlsx':
        return <FileExcelOutlined style={{ color: '#52c41a' }} />;
      case 'csv':
        return <FileTextOutlined style={{ color: '#1890ff' }} />;
      default:
        return <FileTextOutlined style={{ color: '#666' }} />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    beforeUpload,
    onChange: handleUpload,
    disabled: uploadedFiles.length >= MAX_FILES,
    accept: '.csv,.xls,.xlsx'
  };

  return (
    <div style={{ 
      background: isDarkMode ? '#141414' : '#f5f5f5',
      minHeight: 'calc(100vh - 128px)',
      padding: '24px'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ color: '#5A4FCF', marginBottom: '8px' }}>
          Upload Files
        </Title>
        <Text style={{ color: '#666' }}>
          Upload your invoice and reconciliation files
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* Upload Section */}
        <Col xs={24} lg={16}>
          <Card 
            style={{ 
              background: isDarkMode ? '#1f1f1f' : '#fff',
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button 
                  type="primary" 
                  icon={<DownloadOutlined />}
                  onClick={downloadSampleFile}
                  style={{ 
                    backgroundColor: '#52c41a',
                    borderColor: '#52c41a'
                  }}
                >
                  Download Sample
                </Button>
                <Text style={{ color: '#666', fontSize: '12px' }}>
                  Download sample file format
                </Text>
              </Space>
            </div>

            <Dragger 
              {...uploadProps}
              style={{ 
                background: uploadedFiles.length >= MAX_FILES ? '#f5f5f5' : 'transparent',
                border: uploadedFiles.length >= MAX_FILES ? '2px dashed #d9d9d9' : '2px dashed #d9d9d9'
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ 
                  color: uploadedFiles.length >= MAX_FILES ? '#ccc' : '#5A4FCF' 
                }} />
              </p>
              <p className="ant-upload-text" style={{ 
                color: uploadedFiles.length >= MAX_FILES ? '#ccc' : undefined 
              }}>
                {uploadedFiles.length >= MAX_FILES 
                  ? 'Maximum file limit reached' 
                  : 'Click or drag files to this area to upload'
                }
              </p>
              <p className="ant-upload-hint" style={{ 
                color: uploadedFiles.length >= MAX_FILES ? '#ccc' : '#666' 
              }}>
                Only CSV and XLS/XLSX files are supported. Maximum {MAX_FILES} files allowed.
              </p>
            </Dragger>

            {uploadedFiles.length >= MAX_FILES && (
              <Alert
                message="File Limit Reached"
                description={`You have reached the maximum limit of ${MAX_FILES} files. Remove some files to upload more.`}
                type="warning"
                showIcon
                style={{ marginTop: '16px' }}
              />
            )}
          </Card>
        </Col>

        {/* Instructions */}
        <Col xs={24} lg={8}>
          <Card 
            title="Upload Instructions"
            style={{ 
              background: isDarkMode ? '#1f1f1f' : '#fff',
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <List
              size="small"
              dataSource={[
                'Only CSV and XLS/XLSX files are accepted',
                `Maximum ${MAX_FILES} files can be uploaded`,
                'File size should be less than 10MB',
                'Download sample file for correct format',
                'Ensure data is properly formatted',
                'Remove files to upload new ones if limit reached'
              ]}
              renderItem={(item, index) => (
                <List.Item>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ 
                      color: '#5A4FCF', 
                      fontWeight: 'bold',
                      minWidth: '20px'
                    }}>
                      {index + 1}.
                    </span>
                    <span style={{ fontSize: '14px' }}>{item}</span>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Card 
          title={`Uploaded Files (${uploadedFiles.length}/${MAX_FILES})`}
          style={{ 
            marginTop: '24px',
            background: isDarkMode ? '#1f1f1f' : '#fff',
            borderRadius: '12px',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <List
            dataSource={uploadedFiles}
            renderItem={(file) => (
              <List.Item
                actions={[
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />}
                    onClick={() => removeFile(file.uid)}
                  >
                    Remove
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={getFileIcon(file.name)}
                  title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{file.name}</span>
                      <Tag color={
                        file.status === 'done' ? 'green' : 
                        file.status === 'error' ? 'red' : 'blue'
                      }>
                        {file.status === 'done' ? 'Uploaded' : 
                         file.status === 'error' ? 'Failed' : 'Uploading'}
                      </Tag>
                    </div>
                  }
                  description={
                    <div>
                      <div style={{ marginBottom: '4px' }}>
                        Size: {formatFileSize(file.size)}
                      </div>
                      {file.status === 'uploading' && (
                        <Progress 
                          percent={file.progress || 0} 
                          size="small" 
                          status="active"
                        />
                      )}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      )}
    </div>
  );
};

export default Upload;
