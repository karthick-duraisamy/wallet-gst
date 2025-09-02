import React from 'react';
import { Drawer, Switch, Typography, Space, Divider, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/SettingsModal.scss'

const { Title, Text } = Typography;

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  const { isDarkMode, toggleTheme, menuLayout, setMenuLayout, translate } = useTheme();

  return (
    <Drawer
      title={
        <div className='cls-modal-layout'>
          <div className='cls-modal'>
            <span className='cls-contrast'></span>
            <span>{translate('themeSettings')}</span>
          </div>
          <CloseOutlined
            onClick={onClose}
            className='cls-close'
            style={{
              color: isDarkMode ? '#a6a6a6' : '#666'
            }}
          />
        </div>
      }
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
      width={400}
      styles={{
        header: {
          background: isDarkMode ? '#1f1f1f' : '#ffffff',
          borderBottom: isDarkMode ? '1px solid #424242' : '1px solid #f0f0f0',
          color: isDarkMode ? '#ffffff' : '#000000',
        },
        body: {
          background: isDarkMode ? '#1f1f1f' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#000000',
        },
      }}
    >
      <Space direction="vertical" size="large" className='cls-theme-settings'>
        {/* Theme Settings */}
        <div>
          <Title level={5} className='cls-headings' style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
            {translate('theme')}
          </Title>



          {/* Theme Toggle Cards */}
          <div className='cls-toggleCard'>
            <div
              onClick={() => !isDarkMode || toggleTheme()}
              className='cls-cards'
              style={{
                border: !isDarkMode ? '2px solid #52c41a' : `1px solid ${isDarkMode ? '#424242' : '#d9d9d9'}`,
              }}
            >
              {!isDarkMode && (
                <div className="cls-dark-cards">
                  <span className='cls-tick'>✓</span>
                </div>
              )}
              <div className='cls-themeSettings'>
                <div className='cls-themes' style={{
                  background: 'linear-gradient(135deg, #f0f2f5 0%, #ffffff 100%)'  }}>
                  <div className='cls-themeCards'></div>
                  <div className='cls-cardLayouts'>
                    <div className='cls-cards'></div>
                    <div className='cls-card-layouts'></div>
                  </div>
                </div>
              </div>
            </div>

            <div
              onClick={() => isDarkMode || toggleTheme()}
              className='cls-toggledark'
              style={{
                border: isDarkMode ? '2px solid #52c41a' : `1px solid ${isDarkMode ? '#424242' : '#d9d9d9'}`,
              }}
            >
             {isDarkMode && (
                <div className="cls-darkmode-indicator">
                  <span className="cls-darkmode-check">✓</span>
                </div>
              )}
              <div className="cls-card-wrapper">
                <div className="cls-card-container">
                  <div className="cls-card-header"></div>
                  <div className="cls-card-body">
                    <div className="cls-card-sidebar"></div>
                    <div className="cls-card-content"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Layout */}
        <div>
          <Title level={5} className="cls-menu-title">
            Menu layout
          </Title>

          <div className="cls-menu-options">
            {/* Side Vertical Layout */}
            <div
              onClick={() => setMenuLayout("vertical")}
              className={`cls-menu-card ${menuLayout === "vertical" ? "active" : ""} ${
                isDarkMode ? "dark-mode" : ""
              }`}
            >
              {menuLayout === "vertical" && (
                <div className="cls-check-indicator">
                  <span className="cls-checkmark">✓</span>
                </div>
              )}
              <div className="cls-menu-preview">
                <div className="cls-preview-vertical">
                  <div className="cls-vertical-sidebar"></div>
                  <div className="cls-vertical-content">
                    <div className="cls-vertical-line"></div>
                    <div className="cls-vertical-line"></div>
                    <div className="cls-vertical-line"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Horizontal Layout */}
            <div
              onClick={() => setMenuLayout("horizontal")}
              className={`cls-menu-card ${menuLayout === "horizontal" ? "active" : ""} ${
                isDarkMode ? "dark-mode" : ""
              }`}
            >
              {menuLayout === "horizontal" && (
                <div className="cls-check-indicator">
                  <span className="cls-checkmark">✓</span>
                </div>
              )}
              <div className="cls-menu-preview">
                <div className="cls-preview-horizontal">
                  <div className="cls-horizontal-header">
                    <div className="cls-horizontal-item"></div>
                    <div className="cls-horizontal-item"></div>
                    <div className="cls-horizontal-item"></div>
                  </div>
                  <div className="cls-horizontal-content"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Space>
    </Drawer>
  );
};

export default SettingsModal;