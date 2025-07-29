
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Radio, Button, Upload as AntUpload, message, Progress, Alert, Tabs } from 'antd';
import { InboxOutlined, CloseOutlined, FileOutlined, DownloadOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { RootState } from '../store/store';
import { 
  setUploadType, 
  setSubOption, 
  addFiles, 
  removeFile, 
  updateFileStatus,
  clearFiles 
} from '../store/slices/uploadSlice';
import { useTheme } from '../contexts/ThemeContext';

const { Dragger } = AntUpload;

const Upload: React.FC = () => {
  const dispatch = useDispatch();
  const { files, uploadType, subOption, loading } = useSelector((state: RootState) => state.upload);
  const { translate } = useTheme();
  const [dragOver, setDragOver] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('non-ayp');

  const handleUploadTypeChange = (e: any) => {
    dispatch(setUploadType(e.target.value));
  };

  const uploadProps = {
    name: 'file',
    multiple: true,
    accept: '.csv,.xls,.xlsx,.pdf,.doc,.docx',
    showUploadList: false,
    beforeUpload: (file: File) => {
      const isValidType = file.type === 'text/csv' || 
                         file.type === 'application/vnd.ms-excel' ||
                         file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

      if (!isValidType) {
        message.error('You can only upload CSV, Excel, PDF, or Word files!');
        return false;
      }

      const isValidSize = file.size / 1024 / 1024 < 50;
      if (!isValidSize) {
        message.error('File must be smaller than 50MB!');
        return false;
      }

      const newFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading' as const,
      };

      dispatch(addFiles([newFile]));

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          dispatch(updateFileStatus({ id: newFile.id, status: 'success' }));
          setSuccessMessage('Uploaded successfully!');
          setTimeout(() => setSuccessMessage(''), 5000);
        }
      }, 500);

      return false;
    },
    onDragEnter: () => setDragOver(true),
    onDragLeave: () => setDragOver(false),
    onDrop: () => setDragOver(false),
  };

  const handleRemoveFile = (fileId: string) => {
    dispatch(removeFile(fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(0)) + ' ' + sizes[i];
  };

  const handleSubmit = () => {
    message.success('Files submitted successfully!');
  };

  const tabItems = [
    {
      key: 'non-ayp',
      label: 'Non-AYP Bookings',
      children: (
        <div style={{ 
          textAlign: 'left', 
          color: '#666', 
          fontSize: '14px', 
          marginTop: 24,
          marginBottom: 24,
          margin: '25px 15px',
          padding: '8px 14px',
          background: '#e6f3ff',
          borderRadius: '8px',
          border: '1px solid #91d5ff',
        }}>
          <InfoCircleOutlined style={{ color: '#1890ff', marginRight: 8 }} />
          Kindly upload the file downloaded from GSTR-2A of respective travel agencies for reconciliation of the booking fees.
        </div>
      )
    },
    {
      key: 'gstr-2a',
      label: 'GSTR-2A',
      children: (
        <div style={{ 
          textAlign: 'left', 
          color: '#666', 
          fontSize: '14px', 
          marginTop: 16,
          marginBottom: 16,
          margin: '25px 15px',
          padding: '8px 14px',
          background: '#e6f3ff',
          borderRadius: '8px',
          border: '1px solid #91d5ff'
        }}>
          <InfoCircleOutlined style={{ color: '#1890ff', marginRight: 8 }} />
          Upload GSTR-2A data for tax reconciliation purposes.
        </div>
      )
    }
  ];

  return (
    <div className="slide-up" style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh', paddingTop: '0px'}}>
      {/* Page Title */}
      <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#722ed1', marginBottom: 24 }}>
        {translate('uploadFiles')}
      </h2>

      {/* Success Message */}
      {successMessage && (
        <Alert
          message={successMessage}
          type="success"
          showIcon
          closable
          onClose={() => setSuccessMessage('')}
          style={{
            marginBottom: 24,
            borderRadius: 8,
            animation: 'slideInDown 0.5s ease-out'
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
          <Radio value="agency" style={{ fontWeight: 500 }}>{translate('agency')}</Radio>
          <Radio value="airline" style={{ fontWeight: 500 }}>{translate('airline')}</Radio>
        </Radio.Group>
      </div>

      {/* Single Upload Card with Tabs */}
      <Card 
        style={{ 
          borderRadius: 12, 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: 24,
          overflow: 'hidden'
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Tabs 
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          style={{ 
            '.ant-tabs-nav': { 
              margin: 0,
              background: '#fafafa',
              borderBottom: '1px solid #f0f0f0'
            }
          }}
          tabBarStyle={{
            margin: 0,
            padding: '0 24px',
            background: '#fafafa'
          }}
        />
        
        <div style={{ padding: '24px', paddingTop: '0px' }}>
         
          {/* Upload Area */}
          <div 
            className="upload-area-hover"
            style={{
              border: '2px dashed #d9d9d9',
              borderRadius: 8,
              background: '#fafafa',
              marginBottom: 16,
              minHeight: 120,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease-in-out',
              cursor: 'pointer',
              width: '600px',
              paddingTop: 15
            }}
           onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#4f46e5';
              e.currentTarget.style.background = '#f8f9ff';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(79, 70, 229, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#d9d9d9';
              e.currentTarget.style.background = '#fafafa';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.  style.boxShadow = 'none';
            }}
          >
             {/* File Type and Limit Info */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: 16,
            fontSize: '14px',
            color: '#666'
          }}>
            <div style={{ marginBottom: 4 }}>
              Supported Files: <strong>CSV, XLS</strong>
            </div>
            <div>
              Upload up to 3 file. Each max file size 5MB
            </div>
          </div>

            <div style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: 48,
                height: 48,
                background: '#1890ff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
                transition: 'all 0.3s ease'
              }}>
                <PlusOutlined style={{ color: 'white', fontSize: 20 }} />
              </div>
              
              <div style={{ fontSize: '16px', color: '#333', marginBottom: 8 }}>
                Drag & drop your file here
              </div>
              
              <div style={{ fontSize: '14px', color: '#666', marginBottom: 12 }}>
                or
              </div>
              
              <Dragger {...uploadProps} style={{ background: 'transparent', border: 'none', padding: 0 }}>
                <Button 
                  type="link" 
                  style={{ 
                    color: '#1890ff', 
                    fontWeight: 500,
                    fontSize: '14px',
                    textDecoration: 'underline'
                  }}
                >
                  Select File
                </Button>
              </Dragger>

              {/* Sample File Button inside upload area */}
              <Button 
                style={{ 
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  background: '#52c41a', 
                  borderColor: '#52c41a', 
                  color: 'white',
                  borderRadius: '20px 0px 0px 0px',
                  fontWeight: 500,
                  fontSize: '14px',
                  height: 45,
                  padding: '15px',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <DownloadOutlined style={{ fontSize: 16 }} />
                Sample file
              </Button>
            </div>

            {/* Inline file display */}
            {files.length > 0 && (
              <div style={{
                borderTop: '1px solid #e8e8e8',
                background: 'white',
                padding: '16px 20px'
              }}>
                {files.map((file) => (
                  <div 
                    key={file.id}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      marginBottom: files.length > 1 ? 12 : 0
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        background: '#1890ff',
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <FileOutlined style={{ color: 'white', fontSize: 14 }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontWeight: 500, 
                          color: '#333',
                          fontSize: '14px',
                          marginBottom: 4
                        }}>
                          {file.name}
                        </div>
                        <div style={{ 
                          color: '#666', 
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8
                        }}>
                          {formatFileSize(file.size)}
                          {file.status === 'success' && (
                            <span style={{ color: '#52c41a', fontWeight: 500 }}>
                              Upload Successful!
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {file.status === 'uploading' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Progress 
                            percent={Math.floor(Math.random() * 100)} 
                            size="small"
                            style={{ width: 100 }}
                            showInfo={false}
                          />
                          <span style={{ fontSize: '12px', fontWeight: 500, color: '#666', minWidth: '35px' }}>
                            {Math.floor(Math.random() * 100)}%
                          </span>
                        </div>
                      )}
                      {file.status === 'success' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Progress 
                            percent={100} 
                            size="small"
                            status="success"
                            style={{ width: 100 }}
                            showInfo={false}
                          />
                          <span style={{ fontSize: '12px', fontWeight: 500, color: '#52c41a', minWidth: '35px' }}>
                            100%
                          </span>
                        </div>
                      )}
                      <CloseOutlined 
                        style={{ color: '#ff4d4f', cursor: 'pointer', fontSize: 12 }}
                        onClick={() => handleRemoveFile(file.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        {/* Submit Section */}
        <div style={{ textAlign: 'right' }}>
          <Button 
            type="primary" 
            size="large"
            onClick={handleSubmit}
            style={{ 
              minWidth: 120,
              height: 40,
              borderRadius: 6,
              fontWeight: 500,
              backgroundColor: '#4f46e5',
              borderColor: '#4f46e5'
            }}
          >
            {translate('submit')}
          </Button>
        </div>
          
        </div>
      </Card>
    </div>
  );
};

export default Upload;
