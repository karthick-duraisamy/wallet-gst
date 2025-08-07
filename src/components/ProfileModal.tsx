
import React from 'react';
import { Modal, Form, Input, Button, DatePicker, Select, Row, Col } from 'antd';
import { useTheme } from '../contexts/ThemeContext';
import dayjs from 'dayjs';

const { Option } = Select;

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose }) => {
  const { isDarkMode } = useTheme();
  const [form] = Form.useForm();

  const handleUpdate = () => {
    form.validateFields().then(values => {
      console.log('Profile updated:', values);
      // Handle update logic here
      onClose();
    });
  };

  const initialValues = {
    employeeCode: 'ISS-427',
    dateOfBirth: dayjs('1990-01-01'),
    title: 'Mr.',
    firstName: 'John',
    lastName: 'Doe',
    emailId: 'john.doe@example.com',
    mobileNumber: '+1234567890',
    timezone: 'UTC+05:30',
    userType: 'Admin'
  };

  return (
    <Modal
      title={
        <div style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: isDarkMode ? '#ffffff' : '#333',
          borderLeft: '4px solid #4f46e5',
          paddingLeft: '12px'
        }}>
          Profile details
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      styles={{
        body: {
          background: isDarkMode ? '#1f1f1f' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#333'
        },
        header: {
          background: isDarkMode ? '#1f1f1f' : '#ffffff',
          borderBottom: isDarkMode ? '1px solid #424242' : '1px solid #f0f0f0'
        }
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        style={{ marginTop: '20px' }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: isDarkMode ? '#ffffff' : '#333', fontWeight: '500' }}>Employee code</span>}
              name="employeeCode"
            >
              <Input 
                disabled 
                style={{ 
                  background: isDarkMode ? '#2f2f2f' : '#f5f5f5',
                  border: isDarkMode ? '1px solid #424242' : '1px solid #d9d9d9',
                  color: isDarkMode ? '#a6a6a6' : '#999'
                }} 
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: isDarkMode ? '#ffffff' : '#333', fontWeight: '500' }}>Date of birth</span>}
              name="dateOfBirth"
            >
              <DatePicker 
                style={{ 
                  width: '100%',
                  background: isDarkMode ? '#262626' : '#ffffff',
                  borderColor: isDarkMode ? '#424242' : '#d9d9d9'
                }} 
                placeholder="Select date"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label={<span style={{ color: isDarkMode ? '#ffffff' : '#333', fontWeight: '500' }}>Title</span>}
              name="title"
            >
              <Select
                style={{ 
                  background: isDarkMode ? '#262626' : '#ffffff'
                }}
              >
                <Option value="Mr.">Mr.</Option>
                <Option value="Ms.">Ms.</Option>
                <Option value="Mrs.">Mrs.</Option>
                <Option value="Dr.">Dr.</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<span style={{ color: isDarkMode ? '#ffffff' : '#333', fontWeight: '500' }}>First name</span>}
              name="firstName"
            >
              <Input 
                style={{ 
                  background: isDarkMode ? '#262626' : '#ffffff',
                  borderColor: isDarkMode ? '#424242' : '#d9d9d9',
                  color: isDarkMode ? '#ffffff' : '#333'
                }} 
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<span style={{ color: isDarkMode ? '#ffffff' : '#333', fontWeight: '500' }}>Last name</span>}
              name="lastName"
            >
              <Input 
                style={{ 
                  background: isDarkMode ? '#262626' : '#ffffff',
                  borderColor: isDarkMode ? '#424242' : '#d9d9d9',
                  color: isDarkMode ? '#ffffff' : '#333'
                }} 
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label={<span style={{ color: isDarkMode ? '#ffffff' : '#333', fontWeight: '500' }}>Email id</span>}
              name="emailId"
            >
              <Input 
                style={{ 
                  background: isDarkMode ? '#262626' : '#ffffff',
                  borderColor: isDarkMode ? '#424242' : '#d9d9d9',
                  color: isDarkMode ? '#ffffff' : '#333'
                }} 
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<span style={{ color: isDarkMode ? '#ffffff' : '#333', fontWeight: '500' }}>Mobile number</span>}
              name="mobileNumber"
            >
              <Input 
                style={{ 
                  background: isDarkMode ? '#262626' : '#ffffff',
                  borderColor: isDarkMode ? '#424242' : '#d9d9d9',
                  color: isDarkMode ? '#ffffff' : '#333'
                }} 
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<span style={{ color: isDarkMode ? '#ffffff' : '#333', fontWeight: '500' }}>Timezone</span>}
              name="timezone"
            >
              <Select
                style={{ 
                  background: isDarkMode ? '#262626' : '#ffffff'
                }}
              >
                <Option value="UTC+05:30">UTC+05:30</Option>
                <Option value="UTC+00:00">UTC+00:00</Option>
                <Option value="UTC-05:00">UTC-05:00</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={<span style={{ color: isDarkMode ? '#ffffff' : '#333', fontWeight: '500' }}>User type</span>}
          name="userType"
        >
          <Input 
            disabled 
            style={{ 
              background: isDarkMode ? '#2f2f2f' : '#f5f5f5',
              border: isDarkMode ? '1px solid #424242' : '1px solid #d9d9d9',
              color: isDarkMode ? '#a6a6a6' : '#999',
              width: '200px'
            }} 
          />
        </Form.Item>

        <div style={{ 
          marginTop: '30px', 
          display: 'flex', 
          gap: '12px',
          justifyContent: 'flex-start'
        }}>
          <Button 
            type="primary" 
            onClick={handleUpdate}
            style={{
              background: '#4f46e5',
              borderColor: '#4f46e5',
              fontWeight: '500',
              height: '40px',
              borderRadius: '8px',
              paddingLeft: '24px',
              paddingRight: '24px',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3b36d1';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#4f46e5';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(79, 70, 229, 0.2)';
            }}
          >
            Update
          </Button>
          <Button 
            onClick={onClose}
            style={{
              background: isDarkMode ? '#2f2f2f' : '#f5f5f5',
              border: `1px solid ${isDarkMode ? '#424242' : '#d9d9d9'}`,
              color: isDarkMode ? '#ffffff' : '#333',
              fontWeight: '500',
              height: '40px',
              borderRadius: '8px',
              paddingLeft: '20px',
              paddingRight: '20px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#1890ff';
              e.currentTarget.style.color = '#1890ff';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(24, 144, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = isDarkMode ? '#424242' : '#d9d9d9';
              e.currentTarget.style.color = isDarkMode ? '#ffffff' : '#333';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProfileModal;
