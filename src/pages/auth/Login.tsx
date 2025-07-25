import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Alert, Checkbox } from 'antd';
import { MailOutlined, LockOutlined, EyeInvisibleOutlined, FileTextOutlined } from '@ant-design/icons';
import { RootState } from '../../store/store';
import { loginStart, loginSuccess, loginFailure, clearError } from '../../store/slices/authSlice';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [form] = Form.useForm();
  const [rememberMe, setRememberMe] = React.useState(false);

  // Load saved credentials on component mount
  React.useEffect(() => {
    const savedCredentials = localStorage.getItem('gst_saved_credentials');
    if (savedCredentials) {
      const { email, password, remember } = JSON.parse(savedCredentials);
      form.setFieldsValue({ email, password });
      setRememberMe(remember);
      
      // Auto-login if remember me was checked
      if (remember) {
        onFinish({ email, password });
      }
    }
  }, [form]);

  const onFinish = async (values: LoginForm) => {
    dispatch(loginStart());
    dispatch(clearError());

    // Save credentials to localStorage if remember me is checked
    if (rememberMe) {
      localStorage.setItem('gst_saved_credentials', JSON.stringify({
        email: values.email,
        password: values.password,
        remember: true
      }));
    } else {
      localStorage.removeItem('gst_saved_credentials');
    }

    // Simulate API call
    setTimeout(() => {
      if (values.email === 'superadmin@infiniti.com' && values.password === 'Infi@123') {
        dispatch(loginSuccess({
          email: values.email,
          name: 'Super Admin',
        }));
        navigate('/dashboard');
      } else {
        dispatch(loginFailure('Invalid email or password'));
      }
    }, 1000);
  };

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
            <FileTextOutlined />
          </div>
          <h1>GST Claim Tool</h1>
          <p>Streamline your GST claim process with our comprehensive management system. Track, reconcile, and manage all your tax claims efficiently.</p>
        </div>
        <div className="auth-illustration">
          <svg viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background Glow */}
            <defs>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
              <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.7)" />
              </linearGradient>
            </defs>
            
            <circle cx="250" cy="175" r="150" fill="url(#glow)" />
            
            {/* Main Computer */}
            <rect x="120" y="100" width="260" height="160" rx="16" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
            <rect x="130" y="110" width="240" height="140" rx="12" fill="url(#screenGrad)" />
            
            {/* Monitor Stand */}
            <rect x="230" y="260" width="40" height="40" rx="8" fill="rgba(255,255,255,0.3)"/>
            <rect x="200" y="300" width="100" height="12" rx="6" fill="rgba(255,255,255,0.4)"/>
            
            {/* Screen Content */}
            <rect x="145" y="125" width="80" height="8" rx="4" fill="rgba(102,126,234,0.8)"/>
            <rect x="145" y="140" width="100" height="6" rx="3" fill="rgba(255,255,255,0.6)"/>
            <rect x="145" y="152" width="90" height="6" rx="3" fill="rgba(255,255,255,0.6)"/>
            
            {/* Dashboard Charts */}
            <rect x="280" y="140" width="15" height="50" rx="3" fill="rgba(102,126,234,0.7)"/>
            <rect x="300" y="130" width="15" height="60" rx="3" fill="rgba(118,75,162,0.7)"/>
            <rect x="320" y="125" width="15" height="65" rx="3" fill="rgba(255,255,255,0.8)"/>
            <rect x="340" y="135" width="15" height="55" rx="3" fill="rgba(102,126,234,0.6)"/>
            
            {/* Floating Documents */}
            <rect x="50" y="80" width="60" height="80" rx="8" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
            <rect x="60" y="90" width="40" height="4" rx="2" fill="rgba(255,255,255,0.7)"/>
            <rect x="60" y="100" width="35" height="3" rx="1.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="60" y="108" width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.5)"/>
            
            <rect x="390" y="200" width="60" height="80" rx="8" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
            <rect x="400" y="210" width="40" height="4" rx="2" fill="rgba(255,255,255,0.7)"/>
            <rect x="400" y="220" width="35" height="3" rx="1.5" fill="rgba(255,255,255,0.5)"/>
            
            {/* Animated Elements */}
            <circle cx="80" cy="50" r="6" fill="rgba(255,255,255,0.6)">
              <animate attributeName="cy" values="50;45;50" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="420" cy="70" r="8" fill="rgba(255,255,255,0.4)">
              <animate attributeName="cy" values="70;65;70" dur="4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="60" cy="280" r="5" fill="rgba(255,255,255,0.7)">
              <animate attributeName="cy" values="280;275;280" dur="2.5s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
      </div>
      
      <div className="auth-right">
        <div className="auth-header">
          <h1>Login</h1>
          <p>Enter your credentials to access your dashboard</p>
        </div>
        
        <div className="auth-form">
          {error && (
            <Alert
              message={error}
              type="error"
              closable
              onClose={() => dispatch(clearError())}
              className="mb-24"
            />
          )}
          
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter your email address"
                type="email"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
                iconRender={(visible) => (visible ? <EyeInvisibleOutlined /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>

            <div className="remember-forgot">
              <Checkbox 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              >
                Remember me
              </Checkbox>
              <Link to="/auth/forgot-password">Forgot password?</Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
        
        <div className="footer-text">
          Powered by Infiniti Software Solutions
        </div>
      </div>
    </div>
  );
};

export default Login;