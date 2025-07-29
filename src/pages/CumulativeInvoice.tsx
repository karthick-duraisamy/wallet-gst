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
import { SearchOutlined, DownloadOutlined, CalendarOutlined, FilterOutlined } from '@ant-design/icons';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [goToPageValue, setGoToPageValue] = useState('');
  const [searchText, setSearchText] = useState('');
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

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    supplierName: true,
    pnrTicketNo: true,
    invoiceNo: true,
    invoiceDate: true,
    type: true,
    travelVendor: true,
    action: true,
  });
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);

  // All available columns - defined as a function to avoid initialization issues
  const getAllColumns = () => [
    {
      title: translate('supplierName'),
      dataIndex: 'supplierName',
      key: 'supplierName',
      render: (text: string) => text || 'Spice Jet',
    },
    {
      title: translate('pnrTicketNumber'),
      dataIndex: 'pnrTicketNo',
      key: 'pnrTicketNo',
      render: (text: string) => text || 'ADA123',
    },
    {
      title: translate('invoiceNumber'),
      dataIndex: 'invoiceNo',
      key: 'invoiceNo',
      render: (text: string) => text || 'INV123456',
    },
    {
      title: translate('invoiceDate'),
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
      render: (text: string) => text || '15-Jan-2024',
    },
    {
      title: translate('type'),
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => text || 'Invoice',
    },
    {
      title: translate('travelVendor'),
      dataIndex: 'travelVendor',
      key: 'travelVendor',
      render: (text: string) => text || 'AtYourPrice',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center' as const,
      render: () => 'Edit',
    },
    {
      title: (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            type="text"
            icon={<FilterOutlined />}
            onClick={() => setFilterDropdownVisible(!filterDropdownVisible)}
            style={{ border: 'none', padding: 0, background: 'transparent' }}
          />
          {filterDropdownVisible && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              background: 'white',
              border: '1px solid #d9d9d9',
              borderRadius: 6,
              padding: 16,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 1000,
              minWidth: 200
            }}>
              <div style={{ marginBottom: 8, fontWeight: 600 }}>Show/Hide Columns</div>
              {Object.keys(visibleColumns).map((key) => (
                <div key={key} style={{ marginBottom: 8 }}>
                  <Checkbox
                    checked={visibleColumns[key as keyof typeof visibleColumns]}
                    onChange={(e) => setVisibleColumns(prev => ({
                      ...prev,
                      [key]: e.target.checked
                    }))}
                  >
                    {allColumns.find(col => col.key === key)?.title}
                  </Checkbox>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
      key: 'filter',
      width: 60,
      render: () => null,
    },
  ];

  // Get all columns
  const allColumns = getAllColumns();

  // Filter visible columns
  const visibleColumnsData = allColumns.filter(col => 
    col.key === 'filter' || visibleColumns[col.key as keyof typeof visibleColumns]
  );

  const mockData = [
    {
      key: '1',
      supplierName: 'Spice Jet',
      pnrTicketNo: 'ADA123',
      invoiceNo: 'INV001234',
      invoiceDate: '15-Jan-2024',
      type: 'Invoice',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '2',
      supplierName: 'IndiGo',
      pnrTicketNo: 'BCD456',
      invoiceNo: 'CNT002345',
      invoiceDate: '16-Jan-2024',
      type: 'Credit note',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '3',
      supplierName: 'Air India',
      pnrTicketNo: 'ASSA789',
      invoiceNo: 'INV003456',
      invoiceDate: '17-Jan-2024',
      type: 'Invoice',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '4',
      supplierName: 'Vistara',
      pnrTicketNo: 'ASAS012',
      invoiceNo: 'INV004567',
      invoiceDate: '18-Jan-2024',
      type: 'Invoice',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '5',
      supplierName: 'GoAir',
      pnrTicketNo: 'WXYZ345',
      invoiceNo: 'INV005678',
      invoiceDate: '19-Jan-2024',
      type: 'Invoice',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '6',
      supplierName: 'Alliance Air',
      pnrTicketNo: 'ASSA789',
      invoiceNo: 'INV006789',
      invoiceDate: '20-Jan-2024',
      type: 'Invoice',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '7',
      supplierName: 'Air Asia',
      pnrTicketNo: 'QWER456',
      invoiceNo: 'INV007890',
      invoiceDate: '21-Jan-2024',
      type: 'Credit Note',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '8',
      supplierName: 'Spice Jet',
      pnrTicketNo: 'ZXCV123',
      invoiceNo: 'INV008901',
      invoiceDate: '22-Jan-2024',
      type: 'Invoice',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '9',
      supplierName: 'IndiGo',
      pnrTicketNo: 'TYUI567',
      invoiceNo: 'INV009012',
      invoiceDate: '23-Jan-2024',
      type: 'Invoice',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '10',
      supplierName: 'Air India',
      pnrTicketNo: 'GHJK234',
      invoiceNo: 'INV010123',
      invoiceDate: '24-Jan-2024',
      type: 'Debit Note',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '11',
      supplierName: 'Vistara',
      pnrTicketNo: 'BNMS890',
      invoiceNo: 'INV011234',
      invoiceDate: '25-Jan-2024',
      type: 'Invoice',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '12',
      supplierName: 'GoAir',
      pnrTicketNo: 'LKJH567',
      invoiceNo: 'INV012345',
      invoiceDate: '26-Jan-2024',
      type: 'Invoice',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '13',
      supplierName: 'Alliance Air',
      pnrTicketNo: 'POIU234',
      invoiceNo: 'INV013456',
      invoiceDate: '27-Jan-2024',
      type: 'Credit Note',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '14',
      supplierName: 'Air Asia',
      pnrTicketNo: 'ASDF890',
      invoiceNo: 'INV014567',
      invoiceDate: '28-Jan-2024',
      type: 'Invoice',
      travelVendor: 'AtYourPrice',
    },
    {
      key: '15',
      supplierName: 'Spice Jet',
      pnrTicketNo: 'MNBV567',
      invoiceNo: 'INV015678',
      invoiceDate: '29-Jan-2024',
      type: 'Debit Note',
      travelVendor: 'AtYourPrice',
    }
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  // Filter data based on search text
  const filteredData = mockData.filter(item => 
    Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  // Calculate pagination for table data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTableData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setCurrentPage(1);
    setPageSize(size);
  };

  const handleGoToPage = () => {
    const page = Number(goToPageValue);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
    setGoToPageValue('');
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
              <div>
                <Button
                  onClick={handlePnrDropdownClick}
                  style={{ 
                    width: '100%',
                    height: 40,
                    textAlign: 'left',
                    border: 'none',
                    background: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: 'none',
                    borderRadius: 6
                  }}
                >
                  <span style={{ color: '#4f46e5', fontWeight: 500 }}>{translate('uploadMultiplePNR')}</span>
                  <span style={{ 
                    transform: isPnrDropdownOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                    transition: 'transform 0.3s ease',
                    color: '#4f46e5'
                  }}>▲</span>
                </Button>

                {/* Count display below button */}
                <div style={{ 
                  fontSize: '14px', 
                  color: '#8B949E', 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}>
                  <span>60 Ticket No Submitted</span>
                  <span style={{ 
                    width: 18, 
                    height: 18, 
                    borderRadius: '50%', 
                    background: '#8B949E',
                    color: 'white',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}>i</span>
                </div>

                {/* Expanding content below */}
                {isPnrDropdownOpen && (
                  <div style={{
                    marginTop: 20,
                    background: 'white',
                    border: '1px solid #e1e5e9',
                    borderRadius: 8,
                    padding: 20,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    position: 'relative',
                    width: '300px'
                  }}>
                    {/* Close button */}
                    <Button 
                      type="text"
                      onClick={() => setIsPnrDropdownOpen(false)}
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        color: '#8B949E',
                        fontSize: '18px',
                        width: 24,
                        height: 24,
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        background: 'transparent'
                      }}
                    >
                      ×
                    </Button>

                    <div style={{ marginBottom: 20, marginTop: 8 }}>
                      <Radio.Group 
                        value={pnrTicketType} 
                        onChange={(e) => setPnrTicketType(e.target.value)}
                        style={{ display: 'flex', gap: 20 }}
                      >
                        <Radio value="pnr" style={{ fontSize: '14px' }}>PNR</Radio>
                        <Radio value="ticket" style={{ fontSize: '14px' }}>Ticket Number</Radio>
                      </Radio.Group>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <div style={{ 
                        fontSize: '16px', 
                        fontWeight: 500, 
                        marginBottom: 12,
                        color: '#24292f'
                      }}>
                        Enter Multiple Ticket No
                      </div>
                      <TextArea
                        value={pnrTicketText}
                        onChange={(e) => setPnrTicketText(e.target.value)}
                        placeholder=""
                        rows={6}
                        style={{ 
                          resize: 'none',
                          borderRadius: 6,
                          border: '1px solid #d0d7de',
                          fontSize: '14px'
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <div style={{ 
                        fontSize: '14px', 
                        color: '#656d76',
                        padding: '12px 16px',
                        background: '#f6f8fa',
                        borderRadius: 6,
                        border: '1px solid #d0d7de'
                      }}>
                        <span style={{ fontWeight: 600, color: '#24292f' }}>Example : </span>
                        123456,123456
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                      <Button 
                        onClick={() => setIsPnrDropdownOpen(false)}
                        style={{
                          borderRadius: 6,
                          height: 36,
                          paddingLeft: 16,
                          paddingRight: 16
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="primary" 
                        onClick={handlePnrDropdownSubmit}
                        style={{ 
                          backgroundColor: '#4f46e5',
                          borderColor: '#4f46e5',
                          borderRadius: 6,
                          height: 36,
                          paddingLeft: 16,
                          paddingRight: 16,
                          fontWeight: 500
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
              <div>
                <Button
                  onClick={handleInvoiceToggle}
                  style={{ 
                    width: '100%',
                    height: 40,
                    textAlign: 'left',
                    border: 'none',
                    background: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: 'none',
                    borderRadius: 6
                  }}
                >
                  <span style={{ color: '#4f46e5', fontWeight: 500 }}>{translate('uploadMultipleInvoice')}</span>
                  <span style={{ 
                    transform: isInvoiceExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
                    transition: 'transform 0.3s ease',
                    color: '#4f46e5'
                  }}>▲</span>
                </Button>

                {/* Count display below button */}
                <div style={{ 
                  fontSize: '14px', 
                  color: '#8B949E', 
                  marginTop: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}>
                  <span>60 Ticket No Submitted</span>
                  <span style={{ 
                    width: 18, 
                    height: 18, 
                    borderRadius: '50%', 
                    background: '#8B949E',
                    color: 'white',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}>i</span>
                </div>

                {/* Expanding content below */}
                {isInvoiceExpanded && (
                  <div style={{
                    marginTop: 20,
                    background: 'white',
                    border: '1px solid #e1e5e9',
                    borderRadius: 8,
                    padding: 20,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    position: 'relative',
                    width: '300px'
                  }}>
                    {/* Close button */}
                    <Button 
                      type="text"
                      onClick={() => setIsInvoiceExpanded(false)}
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        color: '#ff4d4f',
                        fontSize: '18px',
                        width: 24,
                        height: 24,
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        background: 'transparent'
                      }}
                    >
                      ×
                    </Button>

                    <div style={{ marginBottom: 20, marginTop: 8 }}>
                      <div style={{ 
                        fontSize: '16px', 
                        fontWeight: 500, 
                        marginBottom: 12,
                        color: '#24292f'
                      }}>
                        Enter Invoice No
                      </div>
                      <TextArea
                        value={invoiceText}
                        onChange={(e) => setInvoiceText(e.target.value)}
                        placeholder=""
                        rows={6}
                        style={{ 
                          resize: 'none',
                          borderRadius: 6,
                          border: '1px solid #d0d7de',
                          fontSize: '14px'
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <div style={{ 
                        fontSize: '14px', 
                        color: '#656d76',
                        padding: '12px 16px',
                        background: '#f6f8fa',
                        borderRadius: 6,
                        border: '1px solid #d0d7de'
                      }}>
                        <span style={{ fontWeight: 600, color: '#24292f' }}>Example : </span>
                        123456,123456
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                      <Button 
                        onClick={() => setIsInvoiceExpanded(false)}
                        style={{
                          borderRadius: 6,
                          height: 36,
                          paddingLeft: 16,
                          paddingRight: 16
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="primary" 
                        onClick={handleInvoiceSubmit}
                        style={{ 
                          backgroundColor: '#4f46e5',
                          borderColor: '#4f46e5',
                          borderRadius: 6,
                          height: 36,
                          paddingLeft: 16,
                          paddingRight: 16,
                          fontWeight: 500
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
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
          />
        </div>

        {/* Data Table */}
        <Card style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Table
            columns={visibleColumnsData}
            dataSource={paginatedTableData}
            pagination={false}
            size="middle"
            bordered={false}
            className="custom-table"
            tableLayout="fixed"
          />

          {/* Custom Pagination Footer */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginTop: 16,
            paddingTop: 16,
            borderTop: '1px solid #f0f0f0'
          }}>
            {/* Left side - Displaying info with page size selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '14px' }}>Displaying</span>
              <Select
                value={pageSize}
                onChange={(value) => {
                  setPageSize(value);
                  setCurrentPage(1);
                }}
                style={{ width: 60 }}
                size="small"
                options={[
                  { value: 5, label: '5' },
                  { value: 10, label: '10' },
                  { value: 20, label: '20' },
                  { value: 30, label: '30' },
                  { value: 50, label: '50' },
                ]}
              />
              <span style={{ fontSize: '14px' }}>Out of {filteredData.length}</span>
            </div>

            {/* Center - Page navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Button
                icon="<"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #d9d9d9'
                }}
              />
              
              {/* Page numbers */}
              {(() => {
                const pages = [];
                const maxVisible = 5;
                let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                let end = Math.min(totalPages, start + maxVisible - 1);
                
                if (end - start < maxVisible - 1) {
                  start = Math.max(1, end - maxVisible + 1);
                }

                for (let i = start; i <= end; i++) {
                  pages.push(
                    <Button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: i === currentPage ? '#4f46e5' : 'white',
                        borderColor: i === currentPage ? '#4f46e5' : '#d9d9d9',
                        color: i === currentPage ? 'white' : '#000'
                      }}
                    >
                      {i}
                    </Button>
                  );
                }

                // Add ellipsis and last page if needed
                if (end < totalPages) {
                  if (end < totalPages - 1) {
                    pages.push(<span key="ellipsis" style={{ margin: '0 8px' }}>...</span>);
                  }
                  pages.push(
                    <Button
                      key={totalPages}
                      onClick={() => setCurrentPage(totalPages)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: totalPages === currentPage ? '#4f46e5' : 'white',
                        borderColor: totalPages === currentPage ? '#4f46e5' : '#d9d9d9',
                        color: totalPages === currentPage ? 'white' : '#000'
                      }}
                    >
                      {totalPages}
                    </Button>
                  );
                }

                return pages;
              })()}

              <Button
                icon=">"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #d9d9d9'
                }}
              />
            </div>

            {/* Right side - Go to page */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '14px' }}>Go to Page</span>
              <Input 
                style={{ width: 60 }} 
                value={goToPageValue}
                onChange={(e) => setGoToPageValue(e.target.value)}
                onPressEnter={handleGoToPage}
                placeholder={`1-${totalPages}`}
                size="small"
              />
              <Button 
                type="primary" 
                style={{ backgroundColor: '#4f46e5', borderRadius: '16px' }}
                onClick={handleGoToPage}
                size="small"
              >
                Go
              </Button>
            </div>
          </div>
        </Card>
      </div>


    </div>
  );
};

export default CumulativeInvoice;