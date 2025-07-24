import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Radio, Tabs, Button, Upload as AntUpload, message, Progress } from 'antd';
import { InboxOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
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
        <div className="card-header">
          <h2 className="card-title">Upload Booking Details</h2>
          <p className="card-description">
            Upload your booking data in CSV or Excel format. Maximum 3 files, each up to 5MB.
          </p>
        </div>

        <div className="card-content">
          <div className="upload-section">
            <div className="upload-toggle">
              <Radio.Group 
                value={uploadType} 
                onChange={handleUploadTypeChange}
                size="large"
              >
                <Radio.Button value="agency">Agency</Radio.Button>
                <Radio.Button value="airline">Airline</Radio.Button>
              </Radio.Group>
            </div>

            <Tabs
              activeKey={subOption}
              onChange={handleSubOptionChange}
              type="card"
            >
              <TabPane tab="Non-AYP Bookings" key="non-ayp">
                <div className="mb-24">
                  <div className="flex-between mb-16">
                    <h3>Upload Regular Booking Data</h3>
                    <Button 
                      icon={<DownloadOutlined />}
                      onClick={() => handleDownloadSample('Non-AYP Bookings')}
                    >
                      Download Sample
                    </Button>
                  </div>
                  
                  <Dragger {...uploadProps} className="upload-area">
                    <p className="upload-icon">
                      <InboxOutlined />
                    </p>
                    <p className="upload-text">
                      Click or drag files to upload
                    </p>
                    <p className="upload-hint">
                      Support CSV, XLS, XLSX files up to 5MB each (Max 3 files)
                    </p>
                  </Dragger>
                </div>
              </TabPane>

              <TabPane tab="GSTR-2A" key="gstr-2a">
                <div className="mb-24">
                  <div className="flex-between mb-16">
                    <h3>Upload Travel Agency Details</h3>
                    <Button 
                      icon={<DownloadOutlined />}
                      onClick={() => handleDownloadSample('GSTR-2A')}
                    >
                      Download Sample
                    </Button>
                  </div>
                  
                  <Dragger {...uploadProps} className="upload-area">
                    <p className="upload-icon">
                      <InboxOutlined />
                    </p>
                    <p className="upload-text">
                      Click or drag files to upload
                    </p>
                    <p className="upload-hint">
                      Support CSV, XLS, XLSX files up to 5MB each (Max 3 files)
                    </p>
                  </Dragger>
                </div>
              </TabPane>
            </Tabs>

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
                
                <div className="mt-16">
                  <Button 
                    type="primary" 
                    disabled={files.some(f => f.status === 'uploading')}
                    loading={loading}
                  >
                    Process Files
                  </Button>
                  <Button 
                    style={{ marginLeft: 8 }} 
                    onClick={() => dispatch(clearFiles())}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Upload;