
import React from 'react';
import { Modal, Select, Switch, Typography, Space, Divider } from 'antd';
import { MoonOutlined, SunOutlined, GlobalOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';

const { Title, Text } = Typography;
const { Option } = Select;

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  const { isDarkMode, language, toggleTheme, setLanguage } = useTheme();

  const translations = {
    en: {
      settings: 'Settings',
      theme: 'Theme',
      language: 'Language',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      english: 'English',
      hindi: 'Hindi',
      themeDescription: 'Choose your preferred theme',
      languageDescription: 'Select your preferred language',
    },
    hi: {
      settings: 'सेटिंग्स',
      theme: 'थीम',
      language: 'भाषा',
      darkMode: 'डार्क मोड',
      lightMode: 'लाइट मोड',
      english: 'अंग्रेजी',
      hindi: 'हिंदी',
      themeDescription: 'अपनी पसंदीदा थीम चुनें',
      languageDescription: 'अपनी पसंदीदा भाषा चुनें',
    },
  };

  const t = translations[language];

  return (
    <Modal
      title={t.settings}
      open={open}
      onCancel={onClose}
      footer={null}
      width={500}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Theme Settings */}
        <div>
          <Space align="center" style={{ marginBottom: 12 }}>
            {isDarkMode ? <MoonOutlined /> : <SunOutlined />}
            <Title level={5} style={{ margin: 0 }}>{t.theme}</Title>
          </Space>
          <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
            {t.themeDescription}
          </Text>
          <Space align="center">
            <Text>{t.lightMode}</Text>
            <Switch
              checked={isDarkMode}
              onChange={toggleTheme}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
            />
            <Text>{t.darkMode}</Text>
          </Space>
        </div>

        <Divider />

        {/* Language Settings */}
        <div>
          <Space align="center" style={{ marginBottom: 12 }}>
            <GlobalOutlined />
            <Title level={5} style={{ margin: 0 }}>{t.language}</Title>
          </Space>
          <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
            {t.languageDescription}
          </Text>
          <Select
            value={language}
            onChange={setLanguage}
            style={{ width: '100%' }}
            size="large"
          >
            <Option value="en">{t.english}</Option>
            <Option value="hi">{t.hindi}</Option>
          </Select>
        </div>
      </Space>
    </Modal>
  );
};

export default SettingsModal;
