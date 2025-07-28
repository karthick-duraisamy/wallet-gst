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
import { useTheme } from '../contexts/ThemeContext';

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
  const { translate } = useTheme();

  // Form states
  const [isInvoiceExpanded, setIsInvoiceExpanded] = useState(false);
  const [invoiceText, setInvoiceText] = useState('');
  const [isPnrDropdownOpen, setIsPnrDropdownOpen] = useState(false);
  const [pnrTicketType, setPnrTicketType] = useState('pnr');
  const [pnrTicketText, setPnrTicketText] = useState('');

  const handleSubmit = () => {
    console.log('Submit clicked');
  };

  const handleResetAll = () => {
    setPnrInput('');
    setInvoiceType('all');
    setUploadType('pnr');
  };

  const handleInvoiceToggle = () => {
    setIsInvoiceExpanded(!isInvoiceExpanded);
  };

  const handleInvoiceSubmit = () => {
    // Process the invoiceText data here
    console.log('Invoice data:', invoiceText);
    setIsInvoiceExpanded(false);
  };

  const handlePnrDropdownClick = () => {
    setIsPnrDropdownOpen(!isPnrDropdownOpen);
  };

  const handlePnrDropdownSubmit = () => {
    // Process the pnrTicketText data here
    console.log('PNR/Ticket data:', pnrTicketText);
    setIsPnrDropdownOpen(false);
  };

  const tabItems = [
    {
      key: 'upload-pnr',
      label: translate('uploadPNRTicket'),
    },
    {
      key: 'upload-invoice',
      label: translate('uploadInvoiceNo'),
    },
    {
      key: 'pnr-ticket',
      label: translate('pnrTicket'),
    },
    {
      key: 'tax-invoice-range',
      label: translate('showOnTaxInvoiceRange'),
    },
  ];

  // Table columns
  const columns = [
    {
      title: translate('supplierName'),
      dataIndex: 'supplierName',
      key: 'supplierName',
      width: 140,
      ellipsis: true,
      render: (text: string) => text || 'Spice Jet',
    },
    {
      title: translate('pnrTicketNumber'),
      dataIndex: 'pnrTicketNo',
      key: 'pnrTicketNo',
      width: 120,
      ellipsis: true,
      render: (text: string) => text || 'ADA',
    },
    {
      title: translate('invoiceNumber'),
      dataIndex: 'invoiceNo',
      key: 'invoiceNo',
      width: 130,
      ellipsis: true,
      render: (text: string) => text || 'N/A',
    },
    {
      title: translate('invoiceDate'),
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
      width: 110,
      render: (text: string) => text || 'N/A',
    },
    {
      title: translate('type'),
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (text: string) => text || 'Invoice',
    },
    {
      title: translate('travelVendor'),
      dataIndex: 'travelVendor',
      key: 'travelVendor',
      width: 120,
      ellipsis: true,
      render: (text: string) => text || 'AtYourPrice',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 80,
      align: 'center' as const,
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
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ minWidth: 250 }}>
                <Button
                  onClick={handlePnrDropdownClick}
                  style={{ 
                    width: 250,
                    height: 40,
                    textAlign: 'left',
                    border: '1px solid #d9d9d9',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{translate('uploadMultiplePNR')}</span>
                  <span style={{ 
                    transform: isPnrDropdownOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                    transition: 'transform 0.3s ease'
                  }}>▲</span>
                </Button>
                
                {/* Count display below button */}
                <div style={{ 
                  fontSize: '12px', 
                  color: '#666', 
                  marginTop: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}>
                  <span>60 Ticket No Submitted</span>
                  <span style={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    background: '#666',
                    color: 'white',
                    fontSize: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}>i</span>
                </div>
                
                {/* Expanding content below */}
                {isPnrDropdownOpen && (
                  <div style={{
                    marginTop: 16,
                    background: 'white',
                    border: '1px solid #d9d9d9',
                    borderRadius: 6,
                    padding: 16,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ marginBottom: 16 }}>
                      <Radio.Group 
                        value={pnrTicketType} 
                        onChange={(e) => setPnrTicketType(e.target.value)}
                        style={{ display: 'flex', gap: 16 }}
                      >
                        <Radio value="pnr">PNR</Radio>
                        <Radio value="ticket">Ticket Number</Radio>
                      </Radio.Group>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <div style={{ 
                        fontSize: '14px', 
                        fontWeight: 500, 
                        marginBottom: 8,
                        color: '#333'
                      }}>
                        Enter Multiple Ticket No
                      </div>
                      <Input.TextArea
                        value={pnrTicketText}
                        onChange={(e) => setPnrTicketText(e.target.value)}
                        placeholder="Enter ticket numbers..."
                        rows={4}
                        style={{ 
                          resize: 'none',
                          borderRadius: 6
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#666',
                        padding: '8px 12px',
                        background: '#f5f5f5',
                        borderRadius: 4,
                        border: '1px solid #e0e0e0'
                      }}>
                        <strong>Example:</strong> 123456,123456
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                      <Button onClick={() => setIsPnrDropdownOpen(false)}>
                        Cancel
                      </Button>
                      <Button 
                        type="primary" 
                        onClick={handlePnrDropdownSubmit}
                        style={{ 
                          backgroundColor: '#4f46e5',
                          borderColor: '#4f46e5'
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <Select
                value={invoiceType}
                onChange={setInvoiceType}
                style={{ width: 120 }}
                size="large"
              >
                <Option value="all">{translate('all')}</Option>
                <Option value="tax-invoice">{translate('taxInvoice')}</Option>
                <Option value="credit-note">{translate('creditNote')}</Option>
                <Option value="debit-note">{translate('debitNote')}</Option>
              </Select>
              <Button 
                type="primary"
                onClick={handleSubmit}
                size="large"
              >
                {translate('submit')}
              </Button>
              <Button 
                onClick={handleResetAll}
                size="large"
              >
                {translate('resetAll')}
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
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ minWidth: 250, position: 'relative' }}>
                <Button
                  onClick={handleInvoiceToggle}
                  style={{ 
                    width: 250,
                    height: 40,
                    textAlign: 'left',
                    border: '1px solid #d9d9d9',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>Upload Multiple Invoice No</span>
                  <span style={{ 
                    transform: isInvoiceExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}>▲</span>
                </Button>
                
                {invoiceText && !isInvoiceExpanded && (
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#666', 
                    marginTop: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}>
                    <span>{invoiceText.split(',').filter(item => item.trim()).length} Ticket No Submitted</span>
                    <span style={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      background: '#666',
                      color: 'white',
                      fontSize: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>i</span>
                  </div>
                )}

                {/* Modal-like overlay when expanded */}
                {isInvoiceExpanded && (
                  <>
                    {/* Backdrop */}
                    <div 
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.45)',
                        zIndex: 1000
                      }}
                      onClick={() => setIsInvoiceExpanded(false)}
                    />
                    
                    {/* Modal Card */}
                    <div style={{
                      position: 'fixed',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'white',
                      borderRadius: 8,
                      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
                      width: 432,
                      maxHeight: '80vh',
                      overflow: 'auto',
                      zIndex: 1001
                    }}>
                      {/* Header with close button */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        padding: '16px 16px 0 16px'
                      }}>
                        <Button 
                          type="text"
                          onClick={() => setIsInvoiceExpanded(false)}
                          style={{
                            color: '#999',
                            fontSize: '16px',
                            width: 24,
                            height: 24,
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          ×
                        </Button>
                      </div>

                      {/* Content */}
                      <div style={{ padding: '0 24px 24px 24px' }}>
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ 
                            fontSize: '16px', 
                            fontWeight: 500, 
                            marginBottom: 16,
                            color: '#000'
                          }}>
                            Enter Invoice No
                          </div>
                          <Input.TextArea
                            value={invoiceText}
                            onChange={(e) => setInvoiceText(e.target.value)}
                            placeholder=""
                            rows={6}
                            style={{ 
                              resize: 'none',
                              borderRadius: 6,
                              fontSize: '14px'
                            }}
                          />
                        </div>

                        <div style={{ marginBottom: 24 }}>
                          <div style={{ 
                            fontSize: '14px', 
                            color: '#666',
                            padding: '12px',
                            background: '#f8f9fa',
                            borderRadius: 6,
                            border: '1px solid #e9ecef'
                          }}>
                            <span style={{ fontWeight: 600, color: '#000' }}>Example : </span>
                            123456,123456
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Button 
                            type="primary" 
                            onClick={handleInvoiceSubmit}
                            style={{ 
                              backgroundColor: '#4f46e5',
                              borderColor: '#4f46e5',
                              borderRadius: 6,
                              fontWeight: 500,
                              height: 40,
                              paddingLeft: 24,
                              paddingRight: 24
                            }}
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
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
      <div style={{ marginBottom: 16 }}>
        <Text style={{ color: '#666' }}>{translate('home')} » {translate('cumulativeInvoice')}</Text>
      </div>

      {/* Title */}
      <Title level={3} style={{ margin: '0 0 24px 0', color: '#7c4dff' }}>
        {translate('cumulativeInvoice')}
      </Title>

      {/* Entity Type Selection */}
      <div style={{ marginBottom: 24 }}>
        <Radio.Group 
          value={entityType} 
          onChange={(e) => setEntityType(e.target.value)}
          size="large"
        >
          <Radio value="agency" style={{ fontWeight: 500 }}>{translate('agency')}</Radio>
          <Radio value="airline" style={{ fontWeight: 500 }}>{translate('airline')}</Radio>
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
            scroll={{ x: 900, y: 400 }}
            size="middle"
            bordered={false}
            className="custom-table"
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