
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Radio, Button, Upload as AntUpload, message, Progress } from 'antd';
import { InboxOutlined, CloseOutlined, FileOutlined, DownloadOutlined, InfoCircleOutlined } from '@ant-design/icons';
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
                         file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                         file.type === 'application/pdf' ||
                         file.type === 'application/msword' ||
                         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

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
          message.success(`${file.name} uploaded successfully!`);
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

  return (
    <div className="slide-up" style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: 16, fontSize: '14px', color: '#666' }}>
        <span>{translate('home')}</span>
        <span style={{ margin: '0 8px' }}>»</span>
        <span>{translate('upload')}</span>
      </div>

      {/* Page Title */}
      <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#722ed1', marginBottom: 24 }}>
        {translate('uploadFiles')}
      </h2>

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

      {/* Upload Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: 24 }}>
        {/* Non-AYP Bookings Section */}
        <Card 
          style={{ 
            borderRadius: 12, 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            background: '#fff9f0'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#333', marginBottom: 8 }}>
              {translate('nonAYPBookings')}
            </h3>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
              <InfoCircleOutlined style={{ color: '#1890ff', fontSize: '16px', marginTop: 2 }} />
              <span style={{ color: '#666', fontSize: '14px', textAlign: 'left' }}>
                {translate('nonAYPInfo')}
              </span>
            </div>
            <div style={{ color: '#666', fontSize: '13px', marginBottom: 4 }}>
              {translate('supportedFilesCSVXLS')}
            </div>
            <div style={{ color: '#666', fontSize: '13px', marginBottom: 16 }}>
              {translate('uploadLimit')}
            </div>
          </div>

          <Dragger 
            {...uploadProps}
            style={{ 
              background: '#fafafa',
              border: '2px dashed #d9d9d9',
              borderRadius: 8,
              minHeight: 160
            }}
          >
            <div style={{ padding: '20px' }}>
              <InboxOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: 16 }} />
              <p style={{ fontSize: '16px', color: '#333', marginBottom: 8 }}>
                {translate('dragDropFileHere')}
              </p>
              <p style={{ color: '#666', marginBottom: 8 }}>{translate('or')}</p>
              <Button type="link" style={{ color: '#1890ff', fontWeight: 500, padding: 0 }}>
                {translate('selectFile')}
              </Button>
            </div>
          </Dragger>

          <div style={{ textAlign: 'right', marginTop: 16 }}>
            <Button 
              style={{ 
                background: '#52c41a', 
                borderColor: '#52c41a', 
                color: 'white',
                borderRadius: 6,
                fontWeight: 500
              }}
            >
              {translate('sampleFile')}
            </Button>
          </div>
        </Card>

        {/* GSTR-2A Section */}
        <Card 
          style={{ 
            borderRadius: 12, 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            background: '#f0f9ff'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#333', marginBottom: 8 }}>
              {translate('gstr2A')}
            </h3>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
              <InfoCircleOutlined style={{ color: '#1890ff', fontSize: '16px', marginTop: 2 }} />
              <span style={{ color: '#666', fontSize: '14px', textAlign: 'left' }}>
                {translate('gstr2AInfo')}
              </span>
            </div>
            <div style={{ color: '#666', fontSize: '13px', marginBottom: 4 }}>
              {translate('supportedFilesCSVXLS')}
            </div>
            <div style={{ color: '#666', fontSize: '13px', marginBottom: 16 }}>
              {translate('uploadLimit')}
            </div>
          </div>

          <Dragger 
            {...uploadProps}
            style={{ 
              background: '#fafafa',
              border: '2px dashed #d9d9d9',
              borderRadius: 8,
              minHeight: 160
            }}
          >
            <div style={{ padding: '20px' }}>
              <InboxOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: 16 }} />
              <p style={{ fontSize: '16px', color: '#333', marginBottom: 8 }}>
                {translate('dragDropFileHere')}
              </p>
              <p style={{ color: '#666', marginBottom: 8 }}>{translate('or')}</p>
              <Button type="link" style={{ color: '#1890ff', fontWeight: 500, padding: 0 }}>
                {translate('selectFile')}
              </Button>
            </div>
          </Dragger>

          <div style={{ textAlign: 'right', marginTop: 16 }}>
            <Button 
              style={{ 
                background: '#52c41a', 
                borderColor: '#52c41a', 
                color: 'white',
                borderRadius: 6,
                fontWeight: 500
              }}
            >
              {translate('sampleFile')}
            </Button>
          </div>
        </Card>
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <Card 
          title={translate('uploadedFiles')} 
          style={{ 
            borderRadius: 12, 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: 24
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {files.map((file, index) => (
              <div 
                key={file.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: '#fafafa',
                  borderRadius: 8,
                  border: '1px solid #f0f0f0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <FileOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
                  <div>
                    <div style={{ fontWeight: 500, color: '#333' }}>{file.name}</div>
                    <div style={{ color: '#666', fontSize: '12px' }}>{formatFileSize(file.size)}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {file.status === 'uploading' && (
                    <Progress 
                      percent={Math.floor(Math.random() * 100)} 
                      size="small"
                      style={{ width: 100 }}
                    />
                  )}
                  {file.status === 'success' && (
                    <Progress 
                      percent={100} 
                      size="small"
                      status="success"
                      style={{ width: 100 }}
                    />
                  )}
                  <CloseOutlined 
                    style={{ color: '#ff4d4f', cursor: 'pointer' }}
                    onClick={() => handleRemoveFile(file.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Submit Section */}
      <div style={{ textAlign: 'center' }}>
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
  );
};

export default Upload;
