
import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Select, 
  DatePicker, 
  Table, 
  Checkbox, 
  Modal, 
  Input, 
  Form, 
  message,
  Row,
  Col,
  Space,
  Typography,
  Steps,
  Radio,
  Divider
} from 'antd';
import { 
  CalendarOutlined, 
  DownloadOutlined, 
  SaveOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Step } = Steps;

const Report: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [reportType, setReportType] = useState('DSR');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [conditions, setConditions] = useState<any>({});
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Sample data for report fields
  const reportFields = {
    DSR: [
      { key: 'date', label: 'Date', type: 'date' },
      { key: 'pnr', label: 'PNR', type: 'text' },
      { key: 'airline', label: 'Airline', type: 'select' },
      { key: 'amount', label: 'Amount', type: 'number' },
      { key: 'gst', label: 'GST', type: 'number' },
      { key: 'commission', label: 'Commission', type: 'number' },
      { key: 'status', label: 'Status', type: 'select' }
    ],
    Ledger: [
      { key: 'transaction_date', label: 'Transaction Date', type: 'date' },
      { key: 'description', label: 'Description', type: 'text' },
      { key: 'debit', label: 'Debit', type: 'number' },
      { key: 'credit', label: 'Credit', type: 'number' },
      { key: 'balance', label: 'Balance', type: 'number' }
    ],
    Commission: [
      { key: 'booking_date', label: 'Booking Date', type: 'date' },
      { key: 'agent', label: 'Agent', type: 'text' },
      { key: 'commission_rate', label: 'Commission Rate', type: 'number' },
      { key: 'commission_amount', label: 'Commission Amount', type: 'number' }
    ],
    'Top-up': [
      { key: 'topup_date', label: 'Top-up Date', type: 'date' },
      { key: 'amount', label: 'Amount', type: 'number' },
      { key: 'reference', label: 'Reference', type: 'text' },
      { key: 'status', label: 'Status', type: 'select' }
    ],
    Sales: [
      { key: 'sale_date', label: 'Sale Date', type: 'date' },
      { key: 'product', label: 'Product', type: 'text' },
      { key: 'quantity', label: 'Quantity', type: 'number' },
      { key: 'unit_price', label: 'Unit Price', type: 'number' },
      { key: 'total', label: 'Total', type: 'number' }
    ]
  };

  const handleFieldSelection = (field: string, checked: boolean) => {
    if (checked) {
      setSelectedFields([...selectedFields, field]);
    } else {
      setSelectedFields(selectedFields.filter(f => f !== field));
    }
  };

  const handleContinue = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDownload = () => {
    message.success('Report downloaded successfully!');
  };

  const handleSaveReport = () => {
    setSaveModalVisible(true);
  };

  const handleSaveModalOk = () => {
    form.validateFields().then(values => {
      message.success('Report saved successfully!');
      setSaveModalVisible(false);
      form.resetFields();
    });
  };

  const stepTitles = ['Available Fields', 'Available Conditions', 'Review & Save'];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div style={{ padding: '24px' }}>
            <Title level={4} style={{ color: isDarkMode ? '#fff' : '#1a1a1a', marginBottom: '24px' }}>
              Select Available Fields
            </Title>
            <Row gutter={[16, 16]}>
              {reportFields[reportType as keyof typeof reportFields]?.map((field) => (
                <Col span={8} key={field.key}>
                  <Card 
                    size="small" 
                    style={{ 
                      background: isDarkMode ? '#262626' : '#fff',
                      border: `1px solid ${selectedFields.includes(field.key) ? '#5A4FCF' : '#d9d9d9'}`,
                      cursor: 'pointer'
                    }}
                    onClick={() => handleFieldSelection(field.key, !selectedFields.includes(field.key))}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Checkbox 
                        checked={selectedFields.includes(field.key)}
                        onChange={(e) => handleFieldSelection(field.key, e.target.checked)}
                      />
                      <Text style={{ color: isDarkMode ? '#fff' : '#1a1a1a' }}>{field.label}</Text>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        );

      case 1:
        return (
          <div style={{ padding: '24px' }}>
            <Title level={4} style={{ color: isDarkMode ? '#fff' : '#1a1a1a', marginBottom: '24px' }}>
              Set Conditions
            </Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text style={{ color: isDarkMode ? '#fff' : '#1a1a1a', display: 'block', marginBottom: '8px' }}>
                  Date Range
                </Text>
                <RangePicker 
                  style={{ width: '100%' }}
                  onChange={(dates) => setConditions({...conditions, dateRange: dates})}
                />
              </Col>
              <Col span={12}>
                <Text style={{ color: isDarkMode ? '#fff' : '#1a1a1a', display: 'block', marginBottom: '8px' }}>
                  Status Filter
                </Text>
                <Select 
                  style={{ width: '100%' }}
                  placeholder="Select status"
                  onChange={(value) => setConditions({...conditions, status: value})}
                >
                  <Option value="active">Active</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="completed">Completed</Option>
                </Select>
              </Col>
              <Col span={12}>
                <Text style={{ color: isDarkMode ? '#fff' : '#1a1a1a', display: 'block', marginBottom: '8px' }}>
                  Amount Range
                </Text>
                <Input.Group compact>
                  <Input 
                    style={{ width: '50%' }} 
                    placeholder="Min"
                    onChange={(e) => setConditions({...conditions, minAmount: e.target.value})}
                  />
                  <Input 
                    style={{ width: '50%' }} 
                    placeholder="Max"
                    onChange={(e) => setConditions({...conditions, maxAmount: e.target.value})}
                  />
                </Input.Group>
              </Col>
              <Col span={12}>
                <Text style={{ color: isDarkMode ? '#fff' : '#1a1a1a', display: 'block', marginBottom: '8px' }}>
                  Group By
                </Text>
                <Select 
                  style={{ width: '100%' }}
                  placeholder="Select grouping"
                  onChange={(value) => setConditions({...conditions, groupBy: value})}
                >
                  <Option value="date">Date</Option>
                  <Option value="airline">Airline</Option>
                  <Option value="agent">Agent</Option>
                </Select>
              </Col>
            </Row>
          </div>
        );

      case 2:
        return (
          <div style={{ padding: '24px' }}>
            <Title level={4} style={{ color: isDarkMode ? '#fff' : '#1a1a1a', marginBottom: '24px' }}>
              Review & Save Report
            </Title>
            <Card style={{ background: isDarkMode ? '#262626' : '#f8f9fa', marginBottom: '24px' }}>
              <Title level={5} style={{ color: isDarkMode ? '#fff' : '#1a1a1a' }}>Report Summary</Title>
              <Row gutter={[16, 8]}>
                <Col span={8}>
                  <Text strong style={{ color: isDarkMode ? '#fff' : '#1a1a1a' }}>Report Type:</Text>
                  <div style={{ color: isDarkMode ? '#a6a6a6' : '#666' }}>{reportType}</div>
                </Col>
                <Col span={8}>
                  <Text strong style={{ color: isDarkMode ? '#fff' : '#1a1a1a' }}>Selected Fields:</Text>
                  <div style={{ color: isDarkMode ? '#a6a6a6' : '#666' }}>{selectedFields.length} fields</div>
                </Col>
                <Col span={8}>
                  <Text strong style={{ color: isDarkMode ? '#fff' : '#1a1a1a' }}>Conditions:</Text>
                  <div style={{ color: isDarkMode ? '#a6a6a6' : '#666' }}>{Object.keys(conditions).length} applied</div>
                </Col>
              </Row>
            </Card>
            
            <Title level={5} style={{ color: isDarkMode ? '#fff' : '#1a1a1a', marginBottom: '16px' }}>
              Preview Data
            </Title>
            <Table
              size="small"
              dataSource={[
                { key: 1, field: 'Sample Data 1', value: 'Value 1' },
                { key: 2, field: 'Sample Data 2', value: 'Value 2' },
                { key: 3, field: 'Sample Data 3', value: 'Value 3' }
              ]}
              columns={[
                { title: 'Field', dataIndex: 'field', key: 'field' },
                { title: 'Value', dataIndex: 'value', key: 'value' }
              ]}
              pagination={false}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ 
      padding: '24px', 
      background: isDarkMode ? '#141414' : '#f5f5f5',
      minHeight: 'calc(100vh - 128px)' 
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/dashboard')}
            style={{ border: 'none', background: 'transparent' }}
          />
          <Title level={2} style={{ margin: 0, color: isDarkMode ? '#fff' : '#1a1a1a' }}>
            Reports
          </Title>
        </div>
        <Space>
          <Button onClick={() => navigate('/saved-reports')}>
            Saved Reports
          </Button>
          <Button onClick={() => navigate('/queued-reports')}>
            Queued Reports
          </Button>
        </Space>
      </div>

      {/* Report Type Selection */}
      <Card style={{ marginBottom: '24px', background: isDarkMode ? '#1f1f1f' : '#fff' }}>
        <Title level={4} style={{ color: isDarkMode ? '#fff' : '#1a1a1a', marginBottom: '16px' }}>
          Select Report Type
        </Title>
        <Radio.Group 
          value={reportType} 
          onChange={(e) => setReportType(e.target.value)}
          style={{ width: '100%' }}
        >
          <Row gutter={[16, 16]}>
            {['DSR', 'Ledger', 'Commission', 'Top-up', 'Sales'].map(type => (
              <Col span={4} key={type}>
                <Card 
                  size="small"
                  style={{ 
                    cursor: 'pointer',
                    background: reportType === type ? '#5A4FCF' : (isDarkMode ? '#262626' : '#f8f9fa'),
                    color: reportType === type ? '#fff' : (isDarkMode ? '#fff' : '#1a1a1a'),
                    border: `1px solid ${reportType === type ? '#5A4FCF' : '#d9d9d9'}`,
                    textAlign: 'center'
                  }}
                  onClick={() => setReportType(type)}
                >
                  <Radio value={type} style={{ display: 'none' }} />
                  <Text style={{ 
                    color: reportType === type ? '#fff' : (isDarkMode ? '#fff' : '#1a1a1a'),
                    fontWeight: '500' 
                  }}>
                    {type}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Radio.Group>
      </Card>

      {/* Steps */}
      <Card style={{ background: isDarkMode ? '#1f1f1f' : '#fff' }}>
        <Steps 
          current={currentStep} 
          style={{ marginBottom: '32px' }}
          items={stepTitles.map((title, index) => ({
            title,
            status: index === currentStep ? 'process' : index < currentStep ? 'finish' : 'wait',
            icon: index < currentStep ? <CheckCircleOutlined /> : undefined
          }))}
        />

        {renderStepContent()}

        {/* Action Buttons */}
        <Divider />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button 
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          
          <Space>
            {currentStep === 2 ? (
              <>
                <Button 
                  icon={<DownloadOutlined />}
                  onClick={handleDownload}
                  style={{ background: '#52c41a', borderColor: '#52c41a', color: '#fff' }}
                >
                  Download
                </Button>
                <Button 
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={handleSaveReport}
                  style={{ background: '#5A4FCF', borderColor: '#5A4FCF' }}
                >
                  Save Report
                </Button>
              </>
            ) : (
              <Button 
                type="primary"
                onClick={handleContinue}
                disabled={currentStep === 0 && selectedFields.length === 0}
                style={{ background: '#5A4FCF', borderColor: '#5A4FCF' }}
              >
                Continue
              </Button>
            )}
          </Space>
        </div>
      </Card>

      {/* Save Report Modal */}
      <Modal
        title="Save Report"
        open={saveModalVisible}
        onOk={handleSaveModalOk}
        onCancel={() => setSaveModalVisible(false)}
        okText="Save"
        cancelText="Cancel"
        okButtonProps={{ style: { background: '#5A4FCF', borderColor: '#5A4FCF' } }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="reportName"
            label="Report Name"
            rules={[{ required: true, message: 'Please enter report name' }]}
          >
            <Input placeholder="Enter report name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea placeholder="Enter description (optional)" rows={3} />
          </Form.Item>
          <Form.Item
            name="frequency"
            label="Schedule Frequency"
          >
            <Select placeholder="Select frequency">
              <Option value="once">One Time</Option>
              <Option value="daily">Daily</Option>
              <Option value="weekly">Weekly</Option>
              <Option value="monthly">Monthly</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Report;
