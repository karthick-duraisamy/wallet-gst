import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';
import { MailOutlined, CheckCircleOutlined, FileTextOutlined, QuestionCircleOutlined } from '@ant-design/icons';

interface ForgotPasswordForm {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [submitted, setSubmitted] = React.useState(false);

  const onFinish = async (values: ForgotPasswordForm) => {
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="auth-card">
        <div className="floating-elements">
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
        </div>
        
        <div className="auth-left">
          <div className="auth-brand">
            <div className="auth-brand-icon success-animation">
              <FileTextOutlined />
            </div>
            <h1>GST Claim Tool</h1>
            <p>We've sent you a secure password reset link. Check your email and follow the instructions to regain access to your account.</p>
          </div>
          <div className="auth-illustration">
            <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="emailGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
              </defs>
              
              <circle cx="200" cy="150" r="120" fill="url(#emailGlow)" />
              
              {/* Email Envelope */}
              <rect x="120" y="120" width="160" height="100" rx="12" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
              <path d="M120 130 L200 170 L280 130" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none"/>
              
              {/* Success Checkmark */}
              <circle cx="250" cy="100" r="20" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
              <path d="M240 100 L248 108 L260 92" stroke="rgba(255,255,255,0.9)" strokeWidth="3" 
                    fill="none" strokeLinecap="round" strokeLinejoin="round">
                <animate attributeName="stroke-dasharray" values="0,30;20,0" dur="1s" fill="freeze"/>
                <animate attributeName="stroke-dashoffset" values="20;0" dur="1s" fill="freeze"/>
              </path>
              
              {/* Flying Email Animation */}
              <rect x="80" y="80" width="40" height="25" rx="4" fill="rgba(255,255,255,0.5)">
                <animateTransform attributeName="transform" type="translate" 
                                values="0,0; 20,-10; 0,0" dur="4s" repeatCount="indefinite"/>
              </rect>
              <path d="M80 87 L100 97 L120 87" stroke="rgba(255,255,255,0.7)" strokeWidth="1" fill="none">
                <animateTransform attributeName="transform" type="translate" 
                                values="0,0; 20,-10; 0,0" dur="4s" repeatCount="indefinite"/>
              </path>
              
              {/* Floating particles */}
              <circle cx="150" cy="80" r="3" fill="rgba(255,255,255,0.6)">
                <animate attributeName="cy" values="80;70;80" dur="3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="320" cy="180" r="4" fill="rgba(255,255,255,0.5)">
                <animate attributeName="cy" values="180;170;180" dur="2.5s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
        </div>
        
        <div className="auth-right">
          <div className="auth-header">
            <CheckCircleOutlined className="success-animation" style={{ fontSize: 64, color: '#52c41a', marginBottom: 24, display: 'block' }} />
            <h1>Check Your Email</h1>
            <p>We've sent password reset instructions to your email address</p>
          </div>
          <div className="auth-form">
            <Alert
              message="If an account exists with the provided email address, you will receive password reset instructions within a few minutes."
              type="info"
              showIcon
            />
            <div className="auth-links mt-16">
              <Link to="/auth/login">← Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <div className="floating-elements">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
      </div>
      
      <div className="auth-left">
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <QuestionCircleOutlined />
          </div>
          <h1>Forgot Password?</h1>
          <p>Don't worry, it happens to everyone. Enter your email address and we'll send you a link to reset your password and regain access to your account.</p>
        </div>
        <div className="auth-illustration">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="questionGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            
            <circle cx="200" cy="150" r="100" fill="url(#questionGlow)" />
            
            {/* Email Envelope */}
            <rect x="140" y="130" width="120" height="80" rx="10" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
            <path d="M140 140 L200 170 L260 140" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none"/>
            
            {/* Question Mark */}
            <circle cx="200" cy="100" r="25" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
            <path d="M190 90 Q200 85 210 90 Q215 95 210 100 Q205 105 200 105 M200 115 L200 120" 
                  stroke="rgba(255,255,255,0.9)" strokeWidth="3" fill="none" strokeLinecap="round"/>
            
            {/* Floating Elements */}
            <circle cx="120" cy="80" r="6" fill="rgba(255,255,255,0.5)">
              <animate attributeName="cy" values="80;75;80" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="280" cy="100" r="8" fill="rgba(255,255,255,0.4)">
              <animate attributeName="cy" values="100;95;100" dur="4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="100" cy="220" r="5" fill="rgba(255,255,255,0.6)">
              <animate attributeName="cy" values="220;215;220" dur="2.5s" repeatCount="indefinite"/>
            </circle>
            
            {/* Key Icon */}
            <rect x="300" y="180" width="30" height="6" rx="3" fill="rgba(255,255,255,0.4)"/>
            <circle cx="295" cy="183" r="8" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
            <rect x="325" y="181" width="6" height="3" rx="1" fill="rgba(255,255,255,0.4)"/>
            <rect x="325" y="185" width="4" height="3" rx="1" fill="rgba(255,255,255,0.4)"/>
          </svg>
        </div>
      </div>
      
      <div className="auth-right">
        <div className="auth-header">
          <h1>Reset Password</h1>
          <p>Enter your email address to receive reset instructions</p>
        </div>
        
        <div className="auth-form">
          <Form
            name="forgotPassword"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter your registered email"
                type="email"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Send Reset Link
              </Button>
            </Form.Item>
          </Form>

          <div className="auth-links">
            <Link to="/auth/login">← Remember your password? Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;