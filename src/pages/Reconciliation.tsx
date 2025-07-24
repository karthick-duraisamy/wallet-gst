import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table, Button, Select, DatePicker, Input, Space, Tag } from 'antd';
import { SearchOutlined, DownloadOutlined, FilterOutlined } from '@ant-design/icons';
import { RootState } from '../store/store';
import { setFilters, clearFilters } from '../store/slices/reconciliationSlice';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Reconciliation: React.FC = () => {
  const dispatch = useDispatch();
  const { records, filters, loading, pagination } = useSelector((state: RootState) => state.reconciliation);

  const handleFilterChange = (key: string, value: any) => {
    dispatch(setFilters({ [key]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleExport = (format: 'csv' | 'xls') => {
    console.log(`Exporting as ${format}`);
    // In a real app, this would trigger file download
  };

  const columns = [
    {
      title: 'Supplier Name',
      dataIndex: 'supplierName',
      key: 'supplierName',
      sorter: true,
    },
    {
      title: 'PNR/Ticket Number',
      dataIndex: 'pnrTicketNumber',
      key: 'pnrTicketNumber',
    },
    {
      title: 'Invoice/Credit Note Number',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: 'Invoice Date',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
      sorter: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const colors: Record<string, string> = {
          'Tax Invoice': 'blue',
          'Credit Note': 'green',
          'Debit Note': 'orange',
        };
        return <Tag color={colors[type]}>{type}</Tag>;
      },
    },
    {
      title: 'Tax Claimable',
      dataIndex: 'taxClaimable',
      key: 'taxClaimable',
      render: (amount: number) => `₹${amount.toLocaleString()}`,
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: Record<string, string> = {
          'Approved': 'success',
          'Pending': 'warning',
          'Processing': 'processing',
          'Rejected': 'error',
        };
        return <Tag color={colors[status]}>{status}</Tag>;
      },
    },
  ];

  return (
    <div className="slide-up">
      <Card className="filter-section">
        <h3 className="mb-24">Filters</h3>
        <div className="filter-grid">
          <div>
            <label>Airline</label>
            <Select
              placeholder="Select Airline"
              allowClear
              onChange={(value) => handleFilterChange('airline', value)}
              value={filters.airline}
            >
              <Option value="indigo">IndiGo Airlines</Option>
              <Option value="airindia">Air India</Option>
              <Option value="spicejet">SpiceJet</Option>
              <Option value="vistara">Vistara</Option>
            </Select>
          </div>
          
          <div>
            <label>Status</label>
            <Select
              placeholder="Select Status"
              allowClear
              onChange={(value) => handleFilterChange('status', value)}
              value={filters.status}
            >
              <Option value="approved">Approved</Option>
              <Option value="pending">Pending</Option>
              <Option value="processing">Processing</Option>
              <Option value="rejected">Rejected</Option>
            </Select>
          </div>
          
          <div>
            <label>Type</label>
            <Select
              placeholder="Select Type"
              allowClear
              onChange={(value) => handleFilterChange('type', value)}
              value={filters.type}
            >
              <Option value="tax-invoice">Tax Invoice</Option>
              <Option value="credit-note">Credit Note</Option>
              <Option value="debit-note">Debit Note</Option>
            </Select>
          </div>
          
          <div>
            <label>Travel Vendor</label>
            <Input
              placeholder="Enter Travel Vendor"
              prefix={<SearchOutlined />}
              onChange={(e) => handleFilterChange('travelVendor', e.target.value)}
              value={filters.travelVendor}
            />
          </div>
          
          <div style={{ gridColumn: 'span 2' }}>
            <label>Date Range</label>
            <RangePicker
              style={{ width: '100%' }}
              onChange={(dates, dateStrings) => {
                handleFilterChange('startDate', dateStrings[0]);
                handleFilterChange('endDate', dateStrings[1]);
              }}
            />
          </div>
        </div>
        
        <div className="filter-actions">
          <Button onClick={handleClearFilters}>Clear Filters</Button>
          <Button type="primary" icon={<FilterOutlined />}>Apply Filters</Button>
        </div>
      </Card>

      <Card className="data-table">
        <div className="table-header">
          <h3>Reconciliation Data</h3>
          <div className="table-actions">
            <Space>
              <Button 
                icon={<DownloadOutlined />}
                onClick={() => handleExport('csv')}
              >
                CSV
              </Button>
              <Button 
                icon={<DownloadOutlined />}
                onClick={() => handleExport('xls')}
              >
                Excel
              </Button>
            </Space>
          </div>
        </div>
        
        <Table
          columns={columns}
          dataSource={records}
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default Reconciliation;