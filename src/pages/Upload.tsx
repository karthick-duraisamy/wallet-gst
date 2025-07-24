
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Radio, Button, Upload as AntUpload, message, Progress, Tabs } from 'antd';
import { InboxOutlined, DownloadOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { RootState } from '../store/store';
import { 
  setUploadType, 
  setSubOption, 
  addFiles, 
  removeFile, 
  updateFileStatus,
  clearFiles 
} from '../store/slices/uploadSlice';

const { Dragger } = AntUpload;
const { TabPane } = Tabs;

const Upload: React.FC = () => {
  const dispatch = useDispatch();
  const { files, uploadType, subOption, loading } = useSelector((state: RootState) => state.upload);

  const handleUploadTypeChange = (e: any) => {
    dispatch(setUploadType(e.target.value));
  };

  const handleSubOptionChange = (key: string) => {
    dispatch(setSubOption(key as 'non-ayp' | 'gstr-2a'));
  };

  const uploadProps = {
    name: 'file',
    multiple: true,
    accept: '.csv,.xls,.xlsx',
    beforeUpload: (file: File) => {
      const isValidType = file.type === 'text/csv' || 
                         file.type === 'application/vnd.ms-excel' ||
                         file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      
      if (!isValidType) {
        message.error('You can only upload CSV or Excel files!');
        return false;
      }

      const isValidSize = file.size / 1024 / 1024 < 5;
      if (!isValidSize) {
        message.error('File must be smaller than 5MB!');
        return false;
      }

      if (files.length >= 3) {
        message.error('You can only upload maximum 3 files!');
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

      // Simulate upload
      setTimeout(() => {
        dispatch(updateFileStatus({ id: newFile.id, status: 'success' }));
        message.success(`${file.name} uploaded successfully!`);
      }, 2000);

      return false; // Prevent default upload
    },
  };

  const handleRemoveFile = (fileId: string) => {
    dispatch(removeFile(fileId));
  };

  const handleDownloadSample = (type: string) => {
    message.info(`Downloading ${type} sample file...`);
    // In a real app, this would trigger a file download
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="slide-up">
      <Card className="content-card">
        <div className="upload-page-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <h2 className="upload-title" style={{ margin: 0 }}>Upload</h2>
            <div style={{ display: 'flex', gap: 24, fontSize: 16 }}>
              <span style={{ color: '#1890ff', borderBottom: '2px solid #1890ff', paddingBottom: 4 }}>Upload</span>
              <span style={{ color: '#666' }}>Reconciliation</span>
            </div>
          </div>
          
          {/* Upload Type Selection */}
          <div className="upload-type-section">
            <Radio.Group 
              value={uploadType} 
              onChange={handleUploadTypeChange}
              size="large"
            >
              <Radio value="agency">Agency</Radio>
              <Radio value="airline">Airline</Radio>
            </Radio.Group>
          </div>

          {/* Upload Tabs */}
          <div className="upload-tabs-container">
            <Tabs
              activeKey={subOption}
              onChange={handleSubOptionChange}
              className="upload-tabs"
              items={[
                {
                  key: 'non-ayp',
                  label: 'Non-AYP Bookings',
                  children:
                <div className="upload-tab-content">
                      <div className="upload-info">
                        <div className="info-icon">ℹ️</div>
                        <span className="info-text">
                          You can upload bookings of any other travel agency. Kindly upload the booking data in given sample format.
                        </span>
                      </div>

                      <div className="upload-section-main">
                        <div className="upload-header">
                          <span className="supported-files">Supported Files: CSV, XLS</span>
                          <span className="file-limit">Upload up to 3 file. Each max file size 5MB</span>
                        </div>

                        <Dragger {...uploadProps} className="upload-area-main">
                          <div className="upload-icon-container">
                            <PlusOutlined className="upload-plus-icon" />
                          </div>
                          <p className="upload-main-text">
                            Drag & drop your file here
                          </p>
                          <p className="upload-or-text">or</p>
                          <Button type="link" className="select-file-btn">
                            Select File
                          </Button>
                        </Dragger>

                        <div className="sample-file-section">
                          <Button 
                            type="primary"
                            className="sample-file-btn"
                            icon={<DownloadOutlined />}
                            onClick={() => handleDownloadSample('Non-AYP Bookings')}
                          >
                            Sample file
                          </Button>
                        </div>
                      </div>
                    </div>
                },
                {
                  key: 'gstr-2a',
                  label: 'GSTR-2A',
                  children: (
                    <div className="upload-tab-content">
                      <div className="upload-info">
                        <div className="info-icon">ℹ️</div>
                        <span className="info-text">
                          You can upload GSTR-2A data for reconciliation. Kindly upload the data in given sample format.
                        </span>
                      </div>

                      <div className="upload-section-main">
                        <div className="upload-header">
                          <span className="supported-files">Supported Files: CSV, XLS</span>
                          <span className="file-limit">Upload up to 3 file. Each max file size 5MB</span>
                        </div>

                        <Dragger {...uploadProps} className="upload-area-main">
                          <div className="upload-icon-container">
                            <PlusOutlined className="upload-plus-icon" />
                          </div>
                          <p className="upload-main-text">
                            Drag & drop your file here
                          </p>
                          <p className="upload-or-text">or</p>
                          <Button type="link" className="select-file-btn">
                            Select File
                          </Button>
                        </Dragger>

                        <div className="sample-file-section">
                          <Button 
                            type="primary"
                            className="sample-file-btn"
                            icon={<DownloadOutlined />}
                            onClick={() => handleDownloadSample('GSTR-2A')}
                          >
                            Sample file
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                }
              ]}
            />
          </div>

          {files.length > 0 && (
            <div className="file-list">
              <h4 className="mb-16">Uploaded Files ({files.length}/3)</h4>
              {files.map((file) => (
                <div key={file.id} className="file-item">
                  <div className="file-info">
                    <div>
                      <div className="file-name">{file.name}</div>
                      <div className="file-size">{formatFileSize(file.size)}</div>
                    </div>
                    {file.status === 'uploading' && (
                      <Progress percent={60} size="small" status="active" />
                    )}
                    {file.status === 'success' && (
                      <span style={{ color: '#52c41a', fontSize: 12 }}>✓ Uploaded</span>
                    )}
                  </div>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveFile(file.id)}
                  />
                </div>
              ))}
              
              <div className="submit-section" style={{ textAlign: 'center', marginTop: 24 }}>
                <Button 
                  type="primary" 
                  size="large"
                  disabled={files.some(f => f.status === 'uploading')}
                  loading={loading}
                  style={{
                    backgroundColor: '#1890ff',
                    borderRadius: '6px',
                    height: '40px',
                    paddingLeft: '32px',
                    paddingRight: '32px',
                    fontWeight: 500
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}

          <div className="submit-section" style={{ textAlign: 'center', marginTop: 32 }}>
            <Button 
              type="primary" 
              size="large"
              disabled={files.length === 0 || files.some(f => f.status === 'uploading')}
              loading={loading}
              style={{
                backgroundColor: files.length > 0 && !files.some(f => f.status === 'uploading') ? '#1890ff' : undefined,
                borderRadius: '6px',
                height: '40px',
                paddingLeft: '32px',
                paddingRight: '32px',
                fontWeight: 500
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Upload;
