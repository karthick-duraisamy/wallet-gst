import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Radio, Button, Upload as AntUpload, message, Progress } from 'antd';
import { InboxOutlined, CloseOutlined, FileOutlined, StarOutlined } from '@ant-design/icons';
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

  const handleCancel = () => {
    dispatch(clearFiles());
  };

  const handleAttachFiles = () => {
    message.success('Files attached successfully!');
    // Handle file attachment logic here
  };

  return (
    <div className="upload-page-container">
      <div className="upload-main-card">
        <div className="upload-card-header">
          <div className="upload-title-section">
            <h2 className="upload-title">Upload and attach files</h2>
            <StarOutlined className="upload-star-icon" />
          </div>
          <p className="upload-subtitle">Upload and attach files to this project.</p>
        </div>

        <div className="upload-content">
          <Dragger 
            {...uploadProps} 
            className={`upload-drag-area ${dragOver ? 'drag-over' : ''}`}
          >
            <div className="upload-drag-content">
              <div className="upload-icon-container">
                <InboxOutlined className="upload-icon" />
              </div>
              <div className="upload-text-section">
                <p className="upload-main-text">
                  <span className="upload-link">Click to upload</span> or drag and drop
                </p>
                <p className="upload-limit-text">Maximum file size 50 MB.</p>
              </div>
            </div>
          </Dragger>

          {/* Files being uploaded */}
          {files.length > 0 && (
            <div className="upload-files-list">
              {files.map((file, index) => (
                <div key={file.id} className="upload-file-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="upload-file-info">
                    <FileOutlined className="upload-file-icon" />
                    <div className="upload-file-details">
                      <div className="upload-file-name">{file.name}</div>
                      <div className="upload-file-size">{formatFileSize(file.size)}</div>
                    </div>
                  </div>
                  <div className="upload-file-actions">
                    <CloseOutlined 
                      className="upload-remove-icon" 
                      onClick={() => handleRemoveFile(file.id)}
                    />
                  </div>
                  {file.status === 'uploading' && (
                    <div className="upload-progress-section">
                      <Progress 
                        percent={Math.floor(Math.random() * 100)} 
                        showInfo={true}
                        size="small"
                        className="upload-progress-bar"
                      />
                    </div>
                  )}
                  {file.status === 'success' && (
                    <div className="upload-progress-section">
                      <Progress 
                        percent={100} 
                        showInfo={true}
                        size="small"
                        className="upload-progress-bar"
                        status="success"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* File tags (simulated) */}
          <div className="upload-file-tags">
            <div className="upload-tag">Prototype recording 03.mp4</div>
            <div className="upload-tag">Prototype recording 04.mp4</div>
            <div className="upload-tag">Prototype recording 05.mp4</div>
          </div>
        </div>

        <div className="upload-actions">
          <Button 
            size="large" 
            className="upload-cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button 
            type="primary" 
            size="large"
            className="upload-attach-btn"
            onClick={handleAttachFiles}
            disabled={files.length === 0}
          >
            Attach files
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Upload;