import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert, Row, Col } from 'antd';
import * as AntdIcons from '@ant-design/icons';

interface ResetPasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [success, setSuccess] = React.useState(false);

  const onFinish = async (values: ResetPasswordForm) => {
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    }, 1000);
  };

  if (success) {
    return (
      <Row className="auth-card" justify="center" align="middle">
        <Col span={24} md={12} lg={8}>
          <div className="floating-elements">
            <div className="floating-circle"></div>
            <div className="floating-circle"></div>
            <div className="floating-circle"></div>
            <div className="floating-circle"></div>
          </div>
          <Row justify="center" align="middle">
            <Col span={24}>
              <div className="auth-left">
                <div className="auth-brand">
                  <div className="auth-brand-icon success-animation">
                    <AntdIcons.FileTextOutlined />
                  </div>
                  <h1>GST Claim Tool</h1>
                  <p>Your password has been successfully updated. Your account security is now enhanced with your new credentials.</p>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className="auth-illustration">
                <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="successGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </radialGradient>
                  </defs>
                  <circle cx="200" cy="150" r="120" fill="url(#successGlow)" />
                  {/* Success Shield */}
                  <path d="M200 80 L240 100 L240 180 Q240 200 200 220 Q160 200 160 180 L160 100 Z" 
                        fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
                  {/* Checkmark */}
                  <path d="M180 150 L195 165 L220 135" stroke="rgba(255,255,255,0.9)" strokeWidth="4" 
                        fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <animate attributeName="stroke-dasharray" values="0,100;50,0" dur="1s" fill="freeze"/>
                    <animate attributeName="stroke-dashoffset" values="50;0" dur="1s" fill="freeze"/>
                  </path>
                  {/* Floating particles */}
                  <circle cx="150" cy="100" r="3" fill="rgba(255,255,255,0.7)">
                    <animate attributeName="cy" values="100;90;100" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="250" cy="120" r="4" fill="rgba(255,255,255,0.5)">
                    <animate attributeName="cy" values="120;110;120" dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="170" cy="200" r="2" fill="rgba(255,255,255,0.8)">
                    <animate attributeName="cy" values="200;190;200" dur="2.5s" repeatCount="indefinite"/>
                  </circle>
                </svg>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={24} md={12} lg={8}>
          <div className="auth-right">
            <div className="auth-header">
              <AntdIcons.CheckCircleOutlined className="success-animation" style={{ fontSize: 64, color: '#52c41a', marginBottom: 24, display: 'block' }} />
              <h1>Password Updated</h1>
              <p>Your password has been successfully updated. You will be redirected to the login page shortly.</p>
            </div>
            <div className="auth-form">
              <Alert
                message="Success! Redirecting to login page in a few seconds..."
                type="success"
                showIcon
              />
              <div className="auth-links mt-16">
                <Link to="/auth/login">Continue to Login</Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }

  return (
    <Row className="auth-card" justify="center" align="middle">
      <Col span={24} md={12} lg={8}>
        <div className="floating-elements">
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
        </div>
        <Row justify="center" align="middle">
          <Col span={24}>
            <div className="auth-left">
              <div className="auth-brand">
                <div className="auth-brand-icon">
                  <AntdIcons.SecurityScanOutlined />
                </div>
                <h1>Reset Password</h1>
                <p>Enhance your account security by creating a strong, unique password. Keep your GST claim data protected with updated credentials.</p>
              </div>
            </div>
          </Col>
          <Col span={24}>
            <div className="auth-illustration">
              <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="lockGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </radialGradient>
                </defs>
                <circle cx="200" cy="150" r="100" fill="url(#lockGlow)" />
                {/* Main Lock */}
                <rect x="160" y="140" width="80" height="60" rx="12" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
                <circle cx="200" cy="120" r="25" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3"/>
                {/* Lock Details */}
                <circle cx="200" cy="165" r="8" fill="rgba(255,255,255,0.6)"/>
                <rect x="196" y="165" width="8" height="15" rx="2" fill="rgba(255,255,255,0.6)"/>
                {/* Key */}
                <rect x="120" y="180" width="40" height="8" rx="4" fill="rgba(255,255,255,0.4)"/>
                <rect x="115" y="175" width="15" height="18" rx="7" fill="rgba(255,255,255,0.4)"/>
                <rect x="155" y="182" width="8" height="4" rx="2" fill="rgba(255,255,255,0.4)"/>
                <rect x="155" y="188" width="6" height="4" rx="2" fill="rgba(255,255,255,0.4)"/>
                {/* Floating Security Elements */}
                <circle cx="120" cy="80" r="6" fill="rgba(255,255,255,0.5)">
                  <animate attributeName="cy" values="80;75;80" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="280" cy="100" r="8" fill="rgba(255,255,255,0.4)">
                  <animate attributeName="cy" values="100;95;100" dur="4s" repeatCount="indefinite"/>
                </circle>
                <circle cx="100" cy="220" r="5" fill="rgba(255,255,255,0.6)">
                  <animate attributeName="cy" values="220;215;220" dur="2.5s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
          </Col>
        </Row>
      </Col>
      <Col span={24} md={12} lg={8}>
        <div className="auth-right">
          <div className="auth-header">
            <h1>Update Password</h1>
            <p>Create a new secure password for your account</p>
          </div>
          <div className="auth-form">
            <Form
              form={form}
              name="resetPassword"
              onFinish={onFinish}
              autoComplete="off"
              size="large"
            >
              <Form.Item
                name="currentPassword"
                rules={[{ required: true, message: 'Please input your current password!' }]}
              >
                <Input.Password
                  prefix={<AntdIcons.LockOutlined />}
                  placeholder="Enter current password"
                />
              </Form.Item>

              <Form.Item
                name="newPassword"
                rules={[
                  { required: true, message: 'Please input your new password!' },
                  { min: 6, message: 'Password must be at least 6 characters!' },
                ]}
              >
                <Input.Password
                  prefix={<AntdIcons.LockOutlined />}
                  placeholder="Enter new password"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm your new password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<AntdIcons.LockOutlined />}
                  placeholder="Confirm new password"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update Password
                </Button>
              </Form.Item>
            </Form>
            <div className="auth-links">
              <Link to="/auth/login">← Back to Login</Link>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ResetPassword;
