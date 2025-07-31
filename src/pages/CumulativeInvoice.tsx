
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
import '../styles/CumulativeInvoice.scss';

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

  // Configuration for fixed columns (non-scrollable)
  const fixedColumnsConfig = {
    action: true,
    filter: true,
    // Add other columns that should be fixed here
    // pnrTicketNo: true, // Example: uncomment to make PNR non-scrollable
  };

  // Column mapping for display titles
  const columnTitleMapping = {
    supplierName: translate('supplierName'),
    pnrTicketNo: translate('pnrTicketNumber'),
    invoiceNo: translate('invoiceNumber'),
    invoiceDate: translate('invoiceDate'),
    type: translate('type'),
    travelVendor: translate('travelVendor'),
    action: 'Action',
  };

  // Define all columns directly
  const allColumns = [
    {
      title: translate('supplierName'),
      dataIndex: 'supplierName',
      key: 'supplierName',
      render: (text: string) => text || 'Spice Jet',
      ...(fixedColumnsConfig.supplierName && { fixed: 'left' as const }),
    },
    {
      title: translate('pnrTicketNumber'),
      dataIndex: 'pnrTicketNo',
      key: 'pnrTicketNo',
      render: (text: string) => text || 'ADA123',
      ...(fixedColumnsConfig.pnrTicketNo && { fixed: 'left' as const }),
    },
    {
      title: translate('invoiceNumber'),
      dataIndex: 'invoiceNo',
      key: 'invoiceNo',
      render: (text: string) => text || 'INV123456',
      ...(fixedColumnsConfig.invoiceNo && { fixed: 'left' as const }),
    },
    {
      title: translate('invoiceDate'),
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
      render: (text: string) => text || '15-Jan-2024',
      ...(fixedColumnsConfig.invoiceDate && { fixed: 'left' as const }),
    },
    {
      title: translate('type'),
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => text || 'Invoice',
      ...(fixedColumnsConfig.type && { fixed: 'left' as const }),
    },
    {
      title: translate('travelVendor'),
      dataIndex: 'travelVendor',
      key: 'travelVendor',
      render: (text: string) => text || 'AtYourPrice',
      ...(fixedColumnsConfig.travelVendor && { fixed: 'left' as const }),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 80,
      fixed: 'right' as const,
      align: 'center' as const,
      render: () => 'Edit',
    },
    {
      title: (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <Button
            type="text"
            icon={<FilterOutlined />}
            onClick={() => setFilterDropdownVisible(!filterDropdownVisible)}
            style={{ 
              border: 'none', 
              padding: 0, 
              background: 'transparent',
              color: '#1890ff',
              fontSize: '16px'
            }}
          />
          {filterDropdownVisible && (
            <div className="cls-filter-dropdown">
              <div className="cls-filter-header">
                <span className="cls-filter-title">Show/Hide Columns</span>
                <Button
                  type="text"
                  onClick={() => setFilterDropdownVisible(false)}
                  style={{ 
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    color: '#999',
                    fontSize: '16px',
                    padding: 0,
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ×
                </Button>
              </div>
              <div className="cls-filter-content">
                {Object.keys(visibleColumns).map((key) => (
                  <div key={key} className="cls-filter-option">
                    <Checkbox
                      checked={visibleColumns[key as keyof typeof visibleColumns]}
                      onChange={(e) => setVisibleColumns(prev => ({
                        ...prev,
                        [key]: e.target.checked
                      }))}
                    >
                      {columnTitleMapping[key as keyof typeof columnTitleMapping] || key}
                    </Checkbox>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
      key: 'filter',
      width: 60,
      fixed: 'right' as const,
      render: () => null,
    },
  ];

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
          <div className="cls-tab-content-area">
            <div className="cls-tab-content-layout">
              <div className='cls-sprt'>
                <Button
                  onClick={handlePnrDropdownClick}
                  className="cls-upload-button"
                >
                  <span>{translate('uploadMultiplePNR')}</span>
                  <span className={isPnrDropdownOpen ? 'cls-expanded' : 'cls-collapsed'}>▲</span>
                </Button>

                {/* Count display below button */}
                <div className="cls-count-display">
                  <span>60 Ticket No Submitted</span>
                  <span className="cls-info-icon">i</span>
                </div>

                {/* Expanding content below */}
                {isPnrDropdownOpen && (
                  <div className="cls-dropdown-content">
                    {/* Close button */}
                    <Button 
                      type="text"
                      onClick={() => setIsPnrDropdownOpen(false)}
                      className="cls-close-button"
                    >
                      ×
                    </Button>

                    <div className="cls-radio-section">
                      <Radio.Group 
                        value={pnrTicketType} 
                        onChange={(e) => setPnrTicketType(e.target.value)}
                      >
                        <Radio value="pnr">PNR</Radio>
                        <Radio value="ticket">Ticket Number</Radio>
                      </Radio.Group>
                    </div>

                    <div className="cls-textarea-section">
                      <div className="cls-textarea-label">
                        Enter Multiple Ticket No
                      </div>
                      <TextArea
                        value={pnrTicketText}
                        onChange={(e) => setPnrTicketText(e.target.value)}
                        placeholder=""
                        rows={6}
                      />
                    </div>

                    <div className="cls-example-section">
                      <div className="cls-example-box">
                        <span className="cls-example-label">Example : </span>
                        123456,123456
                      </div>
                    </div>

                    <div className="cls-action-buttons">
                      <Button 
                        onClick={() => setIsPnrDropdownOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="primary" 
                        onClick={handlePnrDropdownSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                )}
              

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
              </div>
              <div className='cls-button'>
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
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start',justifyContent:'space-between', marginBottom: 16 }}>
              <div className='cls-sprt'>
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
              </div>
              <div style={{display:'flex', gap: 15}}>
                <Button 
                  type="primary"
                  onClick={handleSubmit}
                  size="large"
                >
                  Submit
                </Button>
                <Button 
                  onClick={handleResetAll}
                  size="large">
                  Reset all
                </Button>
              </div>
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
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16, justifyContent: 'space-between'}}>
             <div className='cls-sprt'>
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
             </div>
              <div className='cls-button'>
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
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <div className='cls-sprt'>

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
              </div>

              <div className='cls-button'>
                <Button 
                  type="primary"
                  onClick={handleSubmit}
                  size="large"
                >
                  Submit
                </Button>
              {/* </div> */}

              {/* <div style={{ alignSelf: 'flex-end' }}> */}
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
    <div className="slide-up cls-cumulative-container">
      {/* Breadcrumb
      <div style={{ marginBottom: 16 }}>
        <Text style={{ color: '#666' }}>{translate('home')} » {translate('cumulativeInvoice')}</Text>
      </div> */}

      {/* Title */}
      <Title level={3} className="cls-cumulative-title">
        {translate('cumulativeInvoice')}
      </Title>

      {/* Entity Type Selection */}
      <div className="cls-entity-type-section">
        <Radio.Group 
          value={entityType} 
          onChange={(e) => setEntityType(e.target.value)}
          size="large"
        >
          <Radio value="agency">{translate('agency')}</Radio>
          <Radio value="airline">{translate('airline')}</Radio>
        </Radio.Group>
      </div>

      {/* Tabs */}
      <div className="cls-tabs-section">
        <Tabs 
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          type="line"
        />
      </div>

      {/* Dynamic Tab Content */}
      {renderTabContent()}

      {/* Data Table Section */}
      <div>
        {/* Export Buttons and Search */}
        <div className="cls-export-section">
          <Button 
            icon={<DownloadOutlined />}
            className="cls-export-button cls-xls"
          >
            XLS
          </Button>
          <Button 
            icon={<DownloadOutlined />}
            className="cls-export-button cls-csv"
          >
            CSV
          </Button>
          <Input 
            placeholder="Search" 
            prefix={<SearchOutlined />}
            className="cls-search-input"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
          />
        </div>

        {/* Data Table */}
        <Card className="cls-data-table">
          <Table
            columns={visibleColumnsData}
            dataSource={paginatedTableData}
            pagination={false}
            size="middle"
            bordered={false}
            className="custom-table"
            scroll={{ x: 1200 }}
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
