import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table, Button, Select, DatePicker, Input, Space, Tag, Radio, Badge, Checkbox } from 'antd';
import { SearchOutlined, DownloadOutlined, FilterOutlined, CalendarOutlined } from '@ant-design/icons';
import { RootState } from '../store/store';
import { setFilters, clearFilters } from '../store/slices/reconciliationSlice';
import { useTheme } from '../contexts/ThemeContext';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Reconciliation: React.FC = () => {
  const dispatch = useDispatch();
  const { records, filters, loading, pagination } = useSelector((state: RootState) => state.reconciliation);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate } = useTheme();

  const handleFilterChange = (key: string, value: any) => {
    dispatch(setFilters({ [key]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
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

  const columns = [
    {
      title: '',
      dataIndex: 'checkbox',
      key: 'checkbox',
      width: 40,
      render: () => <Checkbox />,
    },
    {
      title: translate('supplierName'),
      dataIndex: 'supplierName',
      key: 'supplierName',
      sorter: true,
      render: (text: string) => text || 'N/A',
    },
    {
      title: translate('pnrTicketNumber'),
      dataIndex: 'pnrTicketNumber',
      key: 'pnrTicketNumber',
      render: (text: string) => text || 'N/A',
    },
    {
      title: translate('invoiceNumber'),
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      render: (text: string) => text || 'N/A',
    },
    {
      title: translate('invoiceDate'),
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
      sorter: true,
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
      render: (amount: number) => (
        <span style={{ color: '#52c41a', fontWeight: 600 }}>
          ₹ {amount ? amount.toLocaleString() : '0'}
        </span>
      ),
      sorter: true,
    },
    {
      title: translate('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color="#722ed1" style={{ borderRadius: '12px' }}>
          {translate('additionalInGSTR2A')}
        </Tag>
      ),
    },
  ];

  const mockData = [
    {
      key: '1',
      supplierName: 'N/A',
      pnrTicketNumber: 'N/A',
      invoiceNumber: 'INV0BET333738',
      invoiceDate: '31-Jan-2020',
      type: 'Tax invoice',
      taxClaimable: 2627.12,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '2',
      supplierName: 'N/A',
      pnrTicketNumber: 'N/A',
      invoiceNumber: 'INV1215645',
      invoiceDate: '10-Jan-2020',
      type: 'Tax invoice',
      taxClaimable: 19500.00,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '3',
      supplierName: 'N/A',
      pnrTicketNumber: 'N/A',
      invoiceNumber: 'DL1212290AT85932',
      invoiceDate: '08-Oct-2021',
      type: 'Tax invoice',
      taxClaimable: 4593.00,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '4',
      supplierName: 'N/A',
      pnrTicketNumber: 'N/A',
      invoiceNumber: 'DL1212290AU77270',
      invoiceDate: '13-Oct-2021',
      type: 'Tax invoice',
      taxClaimable: 5586.00,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '5',
      supplierName: 'N/A',
      pnrTicketNumber: 'N/A',
      invoiceNumber: 'DL1212290AU02058',
      invoiceDate: '09-Oct-2021',
      type: 'Tax invoice',
      taxClaimable: 4445.00,
      status: 'Additional in GSTR-2A',
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <div className="slide-up" style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh',paddingTop: '0px' }}>
      {/* Breadcrumb */}
      {/* <div style={{ marginBottom: 16, fontSize: '14px', color: '#666' }}>
        <span>Home</span>
        <span style={{ margin: '0 8px' }}>»</span>
        <span>Reconciliation history</span>
      </div> */}

      {/* Page Title */}
      <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#722ed1', marginBottom: 24 }}>
        {translate('reconciliationHistory')}
      </h2>

      {/* Type Selection */}
      <div style={{ marginBottom: 24 }}>
        <Radio.Group 
          defaultValue="airline" 
          size="large"
        >
          <Radio value="agency" style={{ fontWeight: 500 }}>{translate('agency')}</Radio>
          <Radio value="airline" style={{ fontWeight: 500 }}>{translate('airline')}</Radio>
        </Radio.Group>
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'flex', 
        gap: 16, 
        marginBottom: 24, 
        alignItems: 'flex-end',
        flexWrap: 'wrap'
      }}>
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
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        gap: 12, 
        marginBottom: 16 
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
          placeholder="search" 
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
            total: 917,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${translate('displaying')} ${range[0]} ${translate('outOf')} ${total}`,
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
          scroll={{ x: 1000 }}
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
          <span style={{ fontSize: '14px' }}>{translate('goToPage')}</span>
          <Input style={{ width: 60 }} />
          <Button 
            type="primary" 
            style={{ backgroundColor: '#4f46e5', borderRadius: '16px' }}
          >
            {translate('go')}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Reconciliation;
