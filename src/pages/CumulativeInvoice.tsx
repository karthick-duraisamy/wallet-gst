
import React, { useState } from 'react';
import { 
  Card, 
  Radio, 
  Tabs, 
  Input, 
  Button, 
  Select, 
  Typography, 
  Space,
  Empty
} from 'antd';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const CumulativeInvoice: React.FC = () => {
  const [entityType, setEntityType] = useState('agency');
  const [activeTab, setActiveTab] = useState('upload-pnr');
  const [uploadType, setUploadType] = useState('pnr');
  const [pnrInput, setPnrInput] = useState('');
  const [invoiceType, setInvoiceType] = useState('all');

  const handleSubmit = () => {
    console.log('Submit clicked');
  };

  const handleResetAll = () => {
    setPnrInput('');
    setInvoiceType('all');
    setUploadType('pnr');
  };

  const tabItems = [
    {
      key: 'upload-pnr',
      label: 'Upload PNR / Ticket No',
    },
    {
      key: 'upload-invoice',
      label: 'Upload Invoice No',
    },
    {
      key: 'pnr-ticket',
      label: 'PNR / Ticket No',
    },
    {
      key: 'tax-invoice-range',
      label: 'Show on Tax Invoice Date Range',
    },
  ];

  return (
    <div className="slide-up" style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: 16 }}>
        <Text style={{ color: '#666' }}>Home » Cumulative invoice</Text>
      </div>

      {/* Title */}
      <Title level={3} style={{ margin: '0 0 24px 0', color: '#7c4dff' }}>
        Cumulative Invoices
      </Title>

      {/* Entity Type Selection */}
      <div style={{ marginBottom: 24 }}>
        <Radio.Group 
          value={entityType} 
          onChange={(e) => setEntityType(e.target.value)}
          size="large"
        >
          <Radio value="agency" style={{ fontWeight: 500 }}>Agency</Radio>
          <Radio value="airline" style={{ fontWeight: 500 }}>Airline</Radio>
        </Radio.Group>
      </div>

      {/* Tabs */}
      <Tabs 
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        type="card"
        style={{ marginBottom: 24 }}
      />

      <div style={{ display: 'flex', gap: 24 }}>
        {/* Left Side - Form */}
        <div style={{ flex: 1, maxWidth: 400 }}>
          <Card style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 16 }}>
              <Select
                value="upload-multiple-pnr"
                style={{ width: '100%' }}
                size="large"
              >
                <Option value="upload-multiple-pnr">Upload Multiple PNR / Ticket No</Option>
              </Select>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Select
                value={invoiceType}
                onChange={setInvoiceType}
                style={{ width: '100%' }}
                size="large"
              >
                <Option value="all">All</Option>
                <Option value="tax-invoice">Tax Invoice</Option>
                <Option value="credit-note">Credit Note</Option>
                <Option value="debit-note">Debit Note</Option>
              </Select>
            </div>

            <div style={{ backgroundColor: '#fff', border: '1px solid #d9d9d9', borderRadius: 6, padding: 16, marginBottom: 16 }}>
              <div style={{ marginBottom: 16 }}>
                <Radio.Group 
                  value={uploadType} 
                  onChange={(e) => setUploadType(e.target.value)}
                >
                  <Radio value="pnr">PNR</Radio>
                  <Radio value="ticket">Ticket Number</Radio>
                </Radio.Group>
              </div>

              <div style={{ marginBottom: 16 }}>
                <Text strong>Enter PNR No</Text>
                <TextArea
                  value={pnrInput}
                  onChange={(e) => setPnrInput(e.target.value)}
                  placeholder="Enter PNR numbers..."
                  rows={6}
                  style={{ marginTop: 8 }}
                />
              </div>

              <div style={{ color: '#666', fontSize: 12, marginBottom: 16 }}>
                <Text>Example : D3456,D23456</Text>
              </div>

              <Button 
                type="primary"
                onClick={handleSubmit}
                style={{ width: '100%', marginBottom: 8 }}
              >
                Submit
              </Button>
            </div>
          </Card>

          <Space>
            <Button 
              type="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button onClick={handleResetAll}>
              Reset All
            </Button>
          </Space>
        </div>

        {/* Right Side - Empty State */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: 120, 
              height: 80, 
              border: '2px dashed #d9d9d9', 
              borderRadius: 8, 
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: '#e6f7ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: '#1890ff', fontSize: 18 }}>📄</span>
              </div>
              <div style={{
                position: 'absolute',
                bottom: -10,
                right: 10,
                width: 30,
                height: 30,
                borderRadius: '50%',
                backgroundColor: '#fff',
                border: '2px solid #e6f7ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: '#52c41a', fontSize: 14 }}>😊</span>
              </div>
            </div>
            <Title level={4} style={{ color: '#666', fontWeight: 'normal' }}>
              No Data Found !
            </Title>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CumulativeInvoice;
