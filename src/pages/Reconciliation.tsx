
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table, Button, Select, DatePicker, Input, Space, Tag, Radio, Badge, Checkbox } from 'antd';
import { SearchOutlined, DownloadOutlined, FilterOutlined, CalendarOutlined } from '@ant-design/icons';
import { RootState } from '../store/store';
import { setFilters, clearFilters } from '../store/slices/reconciliationSlice';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Reconciliation: React.FC = () => {
  const dispatch = useDispatch();
  const { records, filters, loading, pagination } = useSelector((state: RootState) => state.reconciliation);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleFilterChange = (key: string, value: any) => {
    dispatch(setFilters({ [key]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const statusBadges = [
    { label: 'New', count: 0, color: '#1890ff' },
    { label: 'Matched', count: 0, color: '#52c41a' },
    { label: 'Pending to file', count: 0, color: '#faad14' },
    { label: 'Invoice missing', count: 0, color: '#ff4d4f' },
    { label: 'Additional in GSTR-2A', count: 917, color: '#722ed1' },
    { label: 'Invoice received', count: 0, color: '#13c2c2' },
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
      title: 'Supplier name',
      dataIndex: 'supplierName',
      key: 'supplierName',
      sorter: true,
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'PNR / Ticket no',
      dataIndex: 'pnrTicketNumber',
      key: 'pnrTicketNumber',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Invoice/Credit note no',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Invoice date',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
      sorter: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => type || 'Tax invoice',
    },
    {
      title: 'Tax claimable',
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color="#722ed1" style={{ borderRadius: '12px' }}>
          Additional in GS...
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
    <div className="slide-up" style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: 16, fontSize: '14px', color: '#666' }}>
        <span>Home</span>
        <span style={{ margin: '0 8px' }}>»</span>
        <span>Reconciliation history</span>
      </div>

      {/* Page Title */}
      <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#722ed1', marginBottom: 24 }}>
        Reconciliation history (Airline)
      </h2>

      {/* Type Selection */}
      <div style={{ marginBottom: 24 }}>
        <Radio.Group 
          defaultValue="airline" 
          size="large"
        >
          <Radio value="agency" style={{ fontWeight: 500 }}>Agency</Radio>
          <Radio value="airline" style={{ fontWeight: 500 }}>Airline</Radio>
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
          <label style={{ display: 'block', marginBottom: 4, fontSize: '14px' }}>Airline</label>
          <Select
            placeholder="All"
            style={{ width: 120 }}
            defaultValue="all"
          >
            <Option value="all">All</Option>
            <Option value="indigo">IndiGo</Option>
            <Option value="airindia">Air India</Option>
          </Select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '14px' }}>Status</label>
          <Select
            placeholder="All"
            style={{ width: 120 }}
            defaultValue="all"
          >
            <Option value="all">All</Option>
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
          </Select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '14px' }}>Type</label>
          <Select
            placeholder="All"
            style={{ width: 120 }}
            defaultValue="all"
          >
            <Option value="all">All</Option>
            <Option value="tax-invoice">Tax Invoice</Option>
            <Option value="credit-note">Credit Note</Option>
          </Select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '14px' }}>Start / End Date</label>
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
          <label style={{ display: 'block', marginBottom: 4, fontSize: '14px' }}>Travel Vendor</label>
          <Select
            placeholder="All"
            style={{ width: 120 }}
            defaultValue="all"
          >
            <Option value="all">All</Option>
          </Select>
        </div>

        <Button type="primary" style={{ backgroundColor: '#4f46e5' }}>
          Submit
        </Button>
        <Button onClick={handleClearFilters}>
          Reset All
        </Button>
      </div>

      {/* Status Badges */}
      <div style={{ 
        display: 'flex', 
        gap: 24, 
        marginBottom: 24,
        flexWrap: 'wrap'
      }}>
        {statusBadges.map((badge, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '14px' }}>{badge.label}:</span>
            <Badge 
              count={badge.count} 
              style={{ 
                backgroundColor: badge.color,
                fontSize: '12px',
                fontWeight: 600
              }}
            />
          </div>
        ))}
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
  );
};

export default Reconciliation;
