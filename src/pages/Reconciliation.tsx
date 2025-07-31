import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table, Button, Select, DatePicker, Input, Space, Tag, Radio, Badge, Checkbox } from 'antd';
import { SearchOutlined, DownloadOutlined, FilterOutlined, CalendarOutlined } from '@ant-design/icons';
import { RootState } from '../store/store';
import { setFilters, clearFilters } from '../store/slices/reconciliationSlice';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Reconciliation.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Reconciliation: React.FC = () => {
  const dispatch = useDispatch();
  const { records, filters, loading, pagination } = useSelector((state: RootState) => state.reconciliation);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [goToPageValue, setGoToPageValue] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleFilterChange = (key: string, value: any) => {
    dispatch(setFilters({ [key]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size && size !== pageSize) {
      setPageSize(size);
    }
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setCurrentPage(1);
    setPageSize(size);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(goToPageValue);
    const totalPages = Math.ceil(mockData.length / pageSize);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setGoToPageValue('');
    }
  };

  const statusOptions = [
    { label: 'All', count: 76 },
    { label: 'New', count: 0 },
    { label: 'Matched', count: 0 },
    { label: 'Pending to file', count: 0 },
    { label: 'Invoice missing', count: 0 },
    { label: 'Additional in GSTR-2A', count: 917 },
    { label: 'Invoice received', count: 0 },
  ];

  const [visibleColumns, setVisibleColumns] = useState({
    supplierName: true,
    pnrTicketNumber: true,
    invoiceNumber: true,
    invoiceDate: true,
    type: true,
    taxClaimable: true,
    status: true,
  });
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);

  const allColumns = [
    {
      title: translate('supplierName'),
      dataIndex: 'supplierName',
      key: 'supplierName',
      render: (text: string) => text || 'Spice Jet',
    },
    {
      title: translate('pnrTicketNumber'),
      dataIndex: 'pnrTicketNumber',
      key: 'pnrTicketNumber',
      render: (text: string) => text || 'ADA123',
    },
    {
      title: translate('invoiceNumber'),
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      render: (text: string) => text || 'INV0BET333738',
    },
    {
      title: translate('invoiceDate'),
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
      render: (text: string) => text || '31-Jan-2020',
    },
    {
      title: translate('type'),
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => type || translate('taxInvoice'),
    },
    {
      title: translate('taxClaimable'),
      dataIndex: 'taxClaimable',
      key: 'taxClaimable',
      align: 'right' as const,
      render: (amount: number) => (
        <span style={{ color: '#52c41a', fontWeight: 600 }}>
          ₹ {amount ? amount.toLocaleString() : '2,627'}
        </span>
      ),
    },
    {
      title: translate('status'),
      dataIndex: 'status',
      key: 'status',
      width: 150,
      fixed: 'right' as const,
      render: (status: string) => (
        <Tag color="#722ed1" style={{ borderRadius: '12px' }}>
          {translate('additionalInGSTR2A')}
        </Tag>
      ),
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
                    {translate(key.replace(/([A-Z])/g, ' $1').toLowerCase().trim())}
                  </Checkbox>
                </div>
              ))}
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

  const visibleColumnsData = allColumns.filter(col => 
    col.key === 'filter' || visibleColumns[col.key as keyof typeof visibleColumns]
  );

  const mockData = [
    {
      key: '1',
      supplierName: 'Spice Jet',
      pnrTicketNumber: 'ADA123',
      invoiceNumber: 'INV0BET333738',
      invoiceDate: '31-Jan-2020',
      type: 'Tax invoice',
      taxClaimable: 2627.12,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '2',
      supplierName: 'IndiGo',
      pnrTicketNumber: 'BCD456',
      invoiceNumber: 'INV1215645',
      invoiceDate: '10-Jan-2020',
      type: 'Tax invoice',
      taxClaimable: 19500.00,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '3',
      supplierName: 'Air India',
      pnrTicketNumber: 'EFG789',
      invoiceNumber: 'DL1212290AT85932',
      invoiceDate: '08-Oct-2021',
      type: 'Tax invoice',
      taxClaimable: 4593.00,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '4',
      supplierName: 'Vistara',
      pnrTicketNumber: 'HIJ012',
      invoiceNumber: 'DL1212290AU77270',
      invoiceDate: '13-Oct-2021',
      type: 'Tax invoice',
      taxClaimable: 5586.00,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '5',
      supplierName: 'GoAir',
      pnrTicketNumber: 'KLM345',
      invoiceNumber: 'DL1212290AU02058',
      invoiceDate: '09-Oct-2021',
      type: 'Tax invoice',
      taxClaimable: 4445.00,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '6',
      supplierName: 'Spice Jet',
      pnrTicketNumber: 'XYZ123',
      invoiceNumber: 'INV0BET456789',
      invoiceDate: '15-Feb-2020',
      type: 'Tax invoice',
      taxClaimable: 3200.50,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '7',
      supplierName: 'IndiGo',
      pnrTicketNumber: 'ABC789',
      invoiceNumber: 'INV1234567',
      invoiceDate: '20-Mar-2020',
      type: 'Tax invoice',
      taxClaimable: 15750.00,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '8',
      supplierName: 'Air India',
      pnrTicketNumber: 'DEF456',
      invoiceNumber: 'DL1212290AT12345',
      invoiceDate: '25-Apr-2021',
      type: 'Tax invoice',
      taxClaimable: 6789.00,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '9',
      supplierName: 'Vistara',
      pnrTicketNumber: 'GHI789',
      invoiceNumber: 'DL1212290AU98765',
      invoiceDate: '30-May-2021',
      type: 'Tax invoice',
      taxClaimable: 8900.00,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '10',
      supplierName: 'Alliance Air',
      pnrTicketNumber: 'JKL012',
      invoiceNumber: 'DL1212290AU54321',
      invoiceDate: '15-Jun-2021',
      type: 'Tax invoice',
      taxClaimable: 5432.00,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '11',
      supplierName: 'AirAsia India',
      pnrTicketNumber: 'MNO345',
      invoiceNumber: 'INV987654321',
      invoiceDate: '20-Jul-2021',
      type: 'Tax invoice',
      taxClaimable: 7500.00,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '12',
      supplierName: 'Spice Jet',
      pnrTicketNumber: 'PQR678',
      invoiceNumber: 'INV0BET999888',
      invoiceDate: '25-Aug-2021',
      type: 'Tax invoice',
      taxClaimable: 4200.75,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '13',
      supplierName: 'IndiGo',
      pnrTicketNumber: 'STU901',
      invoiceNumber: 'INV555666777',
      invoiceDate: '30-Sep-2021',
      type: 'Tax invoice',
      taxClaimable: 12000.00,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '14',
      supplierName: 'Air India',
      pnrTicketNumber: 'VWX234',
      invoiceNumber: 'DL1212290AT99999',
      invoiceDate: '15-Oct-2021',
      type: 'Tax invoice',
      taxClaimable: 9800.50,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '15',
      supplierName: 'Vistara',
      pnrTicketNumber: 'YZA567',
      invoiceNumber: 'DL1212290AU11111',
      invoiceDate: '20-Nov-2021',
      type: 'Tax invoice',
      taxClaimable: 6750.25,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '16',
      supplierName: 'GoAir',
      pnrTicketNumber: 'BCD890',
      invoiceNumber: 'DL1212290AU22222',
      invoiceDate: '25-Dec-2021',
      type: 'Tax invoice',
      taxClaimable: 5100.00,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '17',
      supplierName: 'Alliance Air',
      pnrTicketNumber: 'EFG123',
      invoiceNumber: 'DL1212290AU33333',
      invoiceDate: '10-Jan-2022',
      type: 'Tax invoice',
      taxClaimable: 3800.75,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '18',
      supplierName: 'AirAsia India',
      pnrTicketNumber: 'HIJ456',
      invoiceNumber: 'INV444555666',
      invoiceDate: '15-Feb-2022',
      type: 'Tax invoice',
      taxClaimable: 8200.00,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '19',
      supplierName: 'Spice Jet',
      pnrTicketNumber: 'KLM789',
      invoiceNumber: 'INV0BET777888',
      invoiceDate: '20-Mar-2022',
      type: 'Tax invoice',
      taxClaimable: 4900.50,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '20',
      supplierName: 'IndiGo',
      pnrTicketNumber: 'NOP012',
      invoiceNumber: 'INV333444555',
      invoiceDate: '25-Apr-2022',
      type: 'Tax invoice',
      taxClaimable: 11500.00,
      status: 'Additional in GSTR-2A',
    },
  ];

  const filteredData = mockData.filter(item => {
    const searchTerm = searchText.toLowerCase();
    return (
      item.supplierName.toLowerCase().includes(searchTerm) ||
      item.pnrTicketNumber.toLowerCase().includes(searchTerm) ||
      item.invoiceNumber.toLowerCase().includes(searchTerm) ||
      item.invoiceDate.toLowerCase().includes(searchTerm) ||
      item.type.toLowerCase().includes(searchTerm) ||
      item.taxClaimable.toString().includes(searchTerm) ||
      item.status.toLowerCase().includes(searchTerm)
    );
  });

  // Calculate pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <div className="slide-up cls-reconciliation-container">
      {/* Breadcrumb */}
      {/* <div style={{ marginBottom: 16, fontSize: '14px', color: '#666' }}>
        <span>Home</span>
        <span style={{ margin: '0 8px' }}>»</span>
        <span>Reconciliation history</span>
      </div> */}

      {/* Page Title */}
      <h2 className="cls-reconciliation-title">
        {translate('reconciliationHistory')}
      </h2>

      {/* Type Selection */}
      <div className="cls-type-selection">
        <Radio.Group 
          defaultValue="airline" 
          size="large"
        >
          <Radio value="agency">{translate('agency')}</Radio>
          <Radio value="airline">{translate('airline')}</Radio>
        </Radio.Group>
      </div>

      {/* Filters */}
      <div className="cls-filters-section">
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '14px' }}>{translate('airline')}</label>
          <Select
            placeholder={translate('all')}
            style={{ width: 120 }}
            defaultValue="all"
          >
            <Option value="all">{translate('all')}</Option>
            <Option value="indigo">IndiGo</Option>
            <Option value="airindia">Air India</Option>
          </Select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '14px' }}>{translate('status')}</label>
          <Select
            placeholder="All"
            style={{ width: 200 }}
            defaultValue="all"
          >
            {statusOptions.map((status, index) => (
              <Option key={index} value={status.label.toLowerCase().replace(/\s+/g, '-')}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{status.label}</span>
                  <span style={{ color: '#666', fontSize: '12px' }}>{status.count}</span>
                </div>
              </Option>
            ))}
          </Select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '14px' }}>{translate('type')}</label>
          <Select
            placeholder={translate('all')}
            style={{ width: 120 }}
            defaultValue="all"
          >
            <Option value="all">{translate('all')}</Option>
            <Option value="tax-invoice">{translate('taxInvoice')}</Option>
            <Option value="credit-note">{translate('creditNote')}</Option>
          </Select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '14px' }}>{translate('startEndDate')}</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <DatePicker 
              placeholder="Start Date" 
              suffixIcon={<CalendarOutlined />}
              style={{ width: 110 }}
            />
            <span>to</span>
            <DatePicker 
              placeholder="End Date" 
              suffixIcon={<CalendarOutlined />}
              style={{ width: 110 }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '14px' }}>{translate('travelVendor')}</label>
          <Select
            placeholder={translate('all')}
            style={{ width: 120 }}
            defaultValue="all"
          >
            <Option value="all">{translate('all')}</Option>
          </Select>
        </div>

        <Button type="primary" style={{ backgroundColor: '#4f46e5' }}>
          {translate('submit')}
        </Button>
        <Button onClick={handleClearFilters} style={{
              border: 'unset',
              background: 'unset',
              color: '#734cce',
              textDecoration: 'underline',
              padding: '0px',
              boxShadow: 'unset',
        }}  >
          {translate('resetAll')}
        </Button>
      </div>



      {/* Export Buttons */}
      <div className="cls-export-controls">
        <Button 
          icon={<DownloadOutlined />}
          className="cls-export-btn cls-xls"
        >
          XLS
        </Button>
        <Button 
          icon={<DownloadOutlined />}
          className="cls-export-btn cls-csv"
        >
          CSV
        </Button>
        <Input 
            placeholder="search" 
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
      <Card className="cls-data-table-card">
        <Table
          columns={visibleColumnsData}
          dataSource={paginatedData}
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
  );
};

export default Reconciliation;