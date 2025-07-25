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
import { useTheme } from '../contexts/ThemeContext';

const { Dragger } = AntUpload;
const { TabPane } = Tabs;

const Upload: React.FC = () => {
  const dispatch = useDispatch();
  const { files, uploadType, subOption, loading } = useSelector((state: RootState) => state.upload);
  const { translate } = useTheme();

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
    <div className="upload-page">
      <div className="upload-container">
        {/* Header */}
        <div className="upload-header-section">
          <h1 className="upload-main-title">{translate('upload')}</h1>
          <div className="upload-nav-tabs">
            <span className="upload-nav-active">{translate('upload')}</span>
            <span className="upload-nav-inactive">{translate('reconciliation')}</span>
          </div>
        </div>

        {/* Radio Selection */}
        <div className="upload-radio-section">
          <Radio.Group 
            value={uploadType} 
            onChange={handleUploadTypeChange}
            className="upload-radio-group"
          >
            <Radio value="agency" className="upload-radio-item">{translate('agency')}</Radio>
            <Radio value="airline" className="upload-radio-item">{translate('airline')}</Radio>
          </Radio.Group>
        </div>

        {/* Tabs */}
        <div className="upload-content-wrapper">
          <Tabs
            activeKey={subOption}
            onChange={handleSubOptionChange}
            className="upload-content-tabs"
            items={[
              {
                key: 'non-ayp',
                label: translate('nonAYPBookings'),
                children: (
                  <div className="upload-tab-panel">
                    {/* Info Banner */}
                    <div className="upload-info-banner">
                      <span className="upload-info-icon">ℹ️</span>
                      <span className="upload-info-text">
                        {translate('nonAYPInfo')}
                      </span>
                    </div>

                    {/* Upload Card */}
                    <div className="upload-card">
                      <div className="upload-card-header">
                        <span className="upload-file-types">{translate('supportedFilesCSVXLS')}</span>
                        <span className="upload-file-limit">{translate('uploadLimit')}</span>
                      </div>

                      <Dragger {...uploadProps} className="upload-dragger">
                        <div className="upload-dragger-content">
                          <div className="upload-icon-wrapper">
                            <PlusOutlined className="upload-icon" />
                          </div>
                          <p className="upload-text-main">
                            {translate('dragDropFileHere')}
                          </p>
                          <p className="upload-text-or">{translate('or')}</p>
                          <Button type="link" className="upload-select-btn">
                            {translate('selectFile')}
                          </Button>
                        </div>
                      </Dragger>

                      <div className="upload-sample-section">
                        <Button 
                          type="primary"
                          className="upload-sample-btn"
                          icon={<DownloadOutlined />}
                          onClick={() => handleDownloadSample('Non-AYP Bookings')}
                        >
                          {translate('sampleFile')}
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                key: 'gstr-2a',
                label: translate('gstr2A'),
                children: (
                  <div className="upload-tab-panel">
                    {/* Info Banner */}
                    <div className="upload-info-banner">
                      <span className="upload-info-icon">ℹ️</span>
                      <span className="upload-info-text">
                        {translate('gstr2AInfo')}
                      </span>
                    </div>

                    {/* Upload Card */}
                    <div className="upload-card">
                      <div className="upload-card-header">
                        <span className="upload-file-types">{translate('supportedFilesCSVXLS')}</span>
                        <span className="upload-file-limit">{translate('uploadLimit')}</span>
                      </div>

                      <Dragger {...uploadProps} className="upload-dragger">
                        <div className="upload-dragger-content">
                          <div className="upload-icon-wrapper">
                            <PlusOutlined className="upload-icon" />
                          </div>
                          <p className="upload-text-main">
                            {translate('dragDropFileHere')}
                          </p>
                          <p className="upload-text-or">{translate('or')}</p>
                          <Button type="link" className="upload-select-btn">
                            {translate('selectFile')}
                          </Button>
                        </div>
                      </Dragger>

                      <div className="upload-sample-section">
                        <Button 
                          type="primary"
                          className="upload-sample-btn"
                          icon={<DownloadOutlined />}
                          onClick={() => handleDownloadSample('GSTR-2A')}
                        >
                          {translate('sampleFile')}
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              }
            ]}
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="upload-file-list">
            <h4 className="upload-file-list-title">{translate('uploadedFiles')} ({files.length}/3)</h4>
            {files.map((file) => (
              <div key={file.id} className="upload-file-item">
                <div className="upload-file-info">
                  <div>
                    <div className="upload-file-name">{file.name}</div>
                    <div className="upload-file-size">{formatFileSize(file.size)}</div>
                  </div>
                  {file.status === 'uploading' && (
                    <Progress percent={60} size="small" status="active" />
                  )}
                  {file.status === 'success' && (
                    <span className="upload-file-success">{translate('uploaded')}</span>
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
          </div>
        )}

        {/* Submit Button */}
        <div className="upload-submit-section">
          <Button 
            type="primary" 
            size="large"
            disabled={files.length === 0 || files.some(f => f.status === 'uploading')}
            loading={loading}
            className="upload-submit-btn"
          >
            {translate('submit')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Upload;