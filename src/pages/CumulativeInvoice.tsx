
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
  Empty,
  Table,
  Checkbox,
  Tag
} from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const CumulativeInvoice: React.FC = () => {
  const [entityType, setEntityType] = useState('agency');
  const [activeTab, setActiveTab] = useState('upload-pnr');
  const [uploadType, setUploadType] = useState('pnr');
  const [pnrInput, setPnrInput] = useState('');
  const [invoiceType, setInvoiceType] = useState('all');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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

  // Table columns
  const columns = [
    {
      title: '',
      dataIndex: 'checkbox',
      key: 'checkbox',
      width: 40,
      render: () => <Checkbox />,
    },
    {
      title: 'Sl',
      dataIndex: 'sl',
      key: 'sl',
      width: 60,
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: 'Invoice No',
      dataIndex: 'invoiceNo',
      key: 'invoiceNo',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Invoice Date',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => text || 'Invoice',
    },
    {
      title: 'Travel Vendor',
      dataIndex: 'travelVendor',
      key: 'travelVendor',
      render: (text: string) => text || 'AtYourPrice',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: () => '-',
    },
  ];

  // Mock data for the table
  const mockData = [
    {
      key: '1',
      invoiceNo: 'N/A',
      invoiceDate: 'N/A',
      type: 'Invoice',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '2',
      invoiceNo: 'N/A',
      invoiceDate: 'N/A',
      type: 'Credit note',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '3',
      invoiceNo: 'N/A',
      invoiceDate: 'N/A',
      type: 'Invoice',
      travelVendor: 'AtYourPrice',
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

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

        {/* Right Side - Data Table */}
        <div style={{ flex: 2 }}>
          {/* Export Buttons and Search */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: 12, 
            marginBottom: 16,
            alignItems: 'center'
          }}>
            <Button 
              icon={<DownloadOutlined />}
              style={{ 
                backgroundColor: '#1d4ed8', 
                color: 'white', 
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              XLS
            </Button>
            <Button 
              icon={<DownloadOutlined />}
              style={{ 
                backgroundColor: '#059669', 
                color: 'white', 
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              CSV
            </Button>
            <Input 
              placeholder="Search" 
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />
          </div>

          {/* Data Table */}
          <Card style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Table
              columns={columns}
              dataSource={mockData}
              rowSelection={rowSelection}
              pagination={{
                current: 1,
                pageSize: 5,
                total: 3,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `Displaying ${range[0]} Out of ${total}`,
                itemRender: (current, type, originalElement) => {
                  if (type === 'page') {
                    return (
                      <Button 
                        type={current === 1 ? 'primary' : 'default'}
                        style={{
                          backgroundColor: current === 1 ? '#4f46e5' : 'white',
                          borderColor: current === 1 ? '#4f46e5' : '#d9d9d9',
                          color: current === 1 ? 'white' : '#000',
                          borderRadius: '50%',
                          width: 32,
                          height: 32,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {current}
                      </Button>
                    );
                  }
                  return originalElement;
                },
              }}
              scroll={{ x: 800 }}
              style={{ 
                '& .ant-table-thead > tr > th': {
                  backgroundColor: '#f8fafc',
                  fontWeight: 600,
                  fontSize: '14px'
                }
              }}
            />
            
            {/* Custom Pagination Footer */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              alignItems: 'center', 
              gap: 16,
              marginTop: 16,
              paddingTop: 16,
              borderTop: '1px solid #f0f0f0'
            }}>
              <span style={{ fontSize: '14px' }}>Go to Page</span>
              <Input style={{ width: 60 }} />
              <Button 
                type="primary" 
                style={{ backgroundColor: '#4f46e5', borderRadius: '16px' }}
              >
                Go
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CumulativeInvoice;
