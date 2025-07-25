
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
  Tag,
  DatePicker
} from 'antd';
import { SearchOutlined, DownloadOutlined, CalendarOutlined } from '@ant-design/icons';

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
      label: 'Upload PNR / Ticket no',
    },
    {
      key: 'upload-invoice',
      label: 'Upload Invoice no',
    },
    {
      key: 'pnr-ticket',
      label: 'PNR / Ticket no',
    },
    {
      key: 'tax-invoice-range',
      label: 'Show on Tax Invoice date range',
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
      title: 'Supplier Name',
      dataIndex: 'supplierName',
      key: 'supplierName',
      render: (text: string) => text || 'Spice Jet',
    },
    {
      title: 'PNR / Ticket no',
      dataIndex: 'pnrTicketNo',
      key: 'pnrTicketNo',
      render: (text: string) => text || 'ADA',
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
      supplierName: 'Spice Jet',
      pnrTicketNo: 'ADA',
      invoiceNo: 'N/A',
      invoiceDate: 'N/A',
      type: 'Invoice',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '2',
      supplierName: 'Spice Jet',
      pnrTicketNo: 'N/A',
      invoiceNo: 'N/A',
      invoiceDate: 'N/A',
      type: 'Credit note',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '3',
      supplierName: 'Spice Jet',
      pnrTicketNo: 'ASSA',
      invoiceNo: 'N/A',
      invoiceDate: 'N/A',
      type: 'Invoice',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '4',
      supplierName: 'Spice Jet',
      pnrTicketNo: 'ASAS',
      invoiceNo: 'N/A',
      invoiceDate: 'N/A',
      type: 'Invoice',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '5',
      supplierName: 'Vistara',
      pnrTicketNo: 'ASAS',
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'upload-pnr':
        return (
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            border: '1px solid #e9ecef', 
            borderRadius: 6, 
            padding: 16, 
            marginBottom: 24 
          }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
              <Select
                value="upload-multiple-pnr"
                style={{ width: 250 }}
                size="large"
              >
                <Option value="upload-multiple-pnr">Upload multiple PNR / Ticket no</Option>
              </Select>
              <Select
                value={invoiceType}
                onChange={setInvoiceType}
                style={{ width: 120 }}
                size="large"
              >
                <Option value="all">All</Option>
                <Option value="tax-invoice">Tax Invoice</Option>
                <Option value="credit-note">Credit Note</Option>
                <Option value="debit-note">Debit Note</Option>
              </Select>
              <Button 
                type="primary"
                onClick={handleSubmit}
                size="large"
              >
                Submit
              </Button>
              <Button 
                onClick={handleResetAll}
                size="large"
              >
                Reset all
              </Button>
            </div>
          </div>
        );
      
      case 'upload-invoice':
        return (
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            border: '1px solid #e9ecef', 
            borderRadius: 6, 
            padding: 16, 
            marginBottom: 24 
          }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
              <Select
                value="upload-multiple-invoice"
                style={{ width: 250 }}
                size="large"
              >
                <Option value="upload-multiple-invoice">Upload multiple Invoice no</Option>
              </Select>
              <Select
                value={invoiceType}
                onChange={setInvoiceType}
                style={{ width: 120 }}
                size="large"
              >
                <Option value="all">All</Option>
                <Option value="tax-invoice">Tax Invoice</Option>
                <Option value="credit-note">Credit Note</Option>
                <Option value="debit-note">Debit Note</Option>
              </Select>
              <Button 
                type="primary"
                onClick={handleSubmit}
                size="large"
              >
                Submit
              </Button>
              <Button 
                onClick={handleResetAll}
                size="large"
              >
                Reset all
              </Button>
            </div>
          </div>
        );
      
      case 'pnr-ticket':
        return (
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            border: '1px solid #e9ecef', 
            borderRadius: 6, 
            padding: 16, 
            marginBottom: 24 
          }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '12px', color: '#666' }}>PNR / Ticket no</span>
                <Input
                  placeholder="Enter PNR / Ticket no"
                  style={{ width: 200 }}
                  size="large"
                />
              </div>
              <Select
                value={invoiceType}
                onChange={setInvoiceType}
                style={{ width: 120 }}
                size="large"
              >
                <Option value="all">All</Option>
                <Option value="tax-invoice">Tax Invoice</Option>
                <Option value="credit-note">Credit Note</Option>
                <Option value="debit-note">Debit Note</Option>
              </Select>
              <Button 
                type="primary"
                onClick={handleSubmit}
                size="large"
              >
                Submit
              </Button>
              <Button 
                onClick={handleResetAll}
                size="large"
              >
                Reset all
              </Button>
            </div>
          </div>
        );
      
      case 'tax-invoice-range':
        return (
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            border: '1px solid #e9ecef', 
            borderRadius: 6, 
            padding: 16, 
            marginBottom: 24 
          }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: 4 }}>Airlines</span>
                <Select
                  defaultValue="all"
                  style={{ width: 120 }}
                  size="large"
                >
                  <Option value="all">All</Option>
                  <Option value="spicejet">SpiceJet</Option>
                  <Option value="indigo">IndiGo</Option>
                </Select>
              </div>
              
              <div>
                <span style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: 4 }}>Type</span>
                <Select
                  value={invoiceType}
                  onChange={setInvoiceType}
                  style={{ width: 120 }}
                  size="large"
                >
                  <Option value="all">All</Option>
                  <Option value="tax-invoice">Tax Invoice</Option>
                  <Option value="credit-note">Credit Note</Option>
                </Select>
              </div>
              
              <div>
                <span style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: 4 }}>Travel mode</span>
                <Select
                  defaultValue="all"
                  style={{ width: 120 }}
                  size="large"
                >
                  <Option value="all">All</Option>
                  <Option value="flight">Flight</Option>
                  <Option value="train">Train</Option>
                </Select>
              </div>
              
              <div>
                <span style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: 4 }}>Place of supply</span>
                <Select
                  defaultValue="all-states"
                  style={{ width: 120 }}
                  size="large"
                >
                  <Option value="all-states">All states</Option>
                  <Option value="delhi">Delhi</Option>
                  <Option value="mumbai">Mumbai</Option>
                </Select>
              </div>
              
              <div>
                <span style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: 4 }}>Start / end date *</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <DatePicker 
                    placeholder="Start date" 
                    suffixIcon={<CalendarOutlined />}
                    style={{ width: 100 }}
                    size="large"
                  />
                  <span style={{ fontSize: '12px' }}>to</span>
                  <DatePicker 
                    placeholder="End date" 
                    suffixIcon={<CalendarOutlined />}
                    style={{ width: 100 }}
                    size="large"
                  />
                </div>
              </div>
              
              <div style={{ alignSelf: 'flex-end' }}>
                <Button 
                  type="primary"
                  onClick={handleSubmit}
                  size="large"
                >
                  Submit
                </Button>
              </div>
              
              <div style={{ alignSelf: 'flex-end' }}>
                <Button 
                  onClick={handleResetAll}
                  size="large"
                >
                  Reset all
                </Button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="slide-up" style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      {/* <div style={{ marginBottom: 16 }}>
        <Text style={{ color: '#666' }}>Home » Cumulative Invoice (Airline)</Text>
      </div> */}

      {/* Title */}
      <Title level={3} style={{ margin: '0 0 24px 0', color: '#7c4dff' }}>
        Cumulative Invoice (Airline)
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
        type="line"
        style={{ marginBottom: 24 }}
      />

      {/* Dynamic Tab Content */}
      {renderTabContent()}

      {/* Data Table Section */}
      <div>
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
              total: 489,
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
            <span style={{ fontSize: '14px' }}>Go to page</span>
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
  );
};

export default CumulativeInvoice;
