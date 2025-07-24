import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Tabs, Input, Button, Select, Table, Tag, Space } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { RootState } from '../store/store';
import { setSearchType, setSearchFilters } from '../store/slices/invoiceSlice';

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const CumulativeInvoice: React.FC = () => {
  const dispatch = useDispatch();
  const { records, searchType, searchFilters, loading } = useSelector((state: RootState) => state.invoice);
  const [pnrInput, setPnrInput] = React.useState('');
  const [invoiceInput, setInvoiceInput] = React.useState('');

  const handleSearchTypeChange = (key: string) => {
    dispatch(setSearchType(key as 'pnr' | 'invoice'));
  };

  const handleFilterChange = (key: string, value: any) => {
    dispatch(setSearchFilters({ ...searchFilters, [key]: value }));
  };

  const handlePnrSearch = () => {
    console.log('Searching for PNRs:', pnrInput);
    // In a real app, this would trigger API call
  };

  const handleInvoiceSearch = () => {
    console.log('Searching for Invoice:', invoiceInput);
    // In a real app, this would trigger API call
  };

  const columns = [
    {
      title: 'PNR/Ticket Number',
      dataIndex: 'pnrTicketNumber',
      key: 'pnrTicketNumber',
      render: (text: string) => text || '-',
    },
    {
      title: 'Invoice Number',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: 'Supplier Name',
      dataIndex: 'supplierName',
      key: 'supplierName',
    },
    {
      title: 'Invoice Date',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
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
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `₹${amount.toLocaleString()}`,
    },
    {
      title: 'Tax Amount',
      dataIndex: 'taxAmount',
      key: 'taxAmount',
      render: (amount: number) => `₹${amount.toLocaleString()}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: Record<string, string> = {
          'Active': 'success',
          'Cancelled': 'error',
        };
        return <Tag color={colors[status]}>{status}</Tag>;
      },
    },
  ];

  return (
    <div className="slide-up">
      <Card className="content-card">
        <div className="card-header">
          <h2 className="card-title">Cumulative Invoice Management</h2>
          <p className="card-description">
            Search and manage invoices by PNR/Ticket numbers or Invoice numbers
          </p>
        </div>

        <div className="card-content">
          <Tabs activeKey={searchType} onChange={handleSearchTypeChange} type="card">
            <TabPane tab="Upload PNR / Ticket Number" key="pnr">
              <div className="mb-24">
                <h4 className="mb-16">Enter Multiple PNRs or Ticket Numbers</h4>
                <p className="mb-16" style={{ color: '#666' }}>
                  Enter multiple PNRs or Ticket Numbers separated by commas
                </p>
                
                <div className="mb-16">
                  <TextArea
                    rows={4}
                    placeholder="Enter PNRs or Ticket Numbers (comma-separated)&#10;Example: ABC123, DEF456, GHI789"
                    value={pnrInput}
                    onChange={(e) => setPnrInput(e.target.value)}
                  />
                </div>

                <div className="flex-between mb-24">
                  <div>
                    <label>Type Filter:</label>
                    <Select
                      placeholder="All Types"
                      allowClear
                      style={{ width: 200, marginLeft: 8 }}
                      onChange={(value) => handleFilterChange('type', value)}
                      value={searchFilters.type}
                    >
                      <Option value="tax-invoice">Tax Invoice</Option>
                      <Option value="credit-note">Credit Note</Option>
                      <Option value="debit-note">Debit Note</Option>
                    </Select>
                  </div>
                  
                  <Button 
                    type="primary" 
                    icon={<SearchOutlined />}
                    onClick={handlePnrSearch}
                    disabled={!pnrInput.trim()}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </TabPane>

            <TabPane tab="Upload Invoice Number" key="invoice">
              <div className="mb-24">
                <h4 className="mb-16">Enter Invoice Number</h4>
                <p className="mb-16" style={{ color: '#666' }}>
                  Enter the specific invoice number to search
                </p>
                
                <div className="mb-16">
                  <Input
                    placeholder="Enter Invoice Number (e.g., INV-2024-001)"
                    value={invoiceInput}
                    onChange={(e) => setInvoiceInput(e.target.value)}
                    prefix={<SearchOutlined />}
                  />
                </div>

                <div className="flex-between mb-24">
                  <div>
                    <label>Type Filter:</label>
                    <Select
                      placeholder="All Types"
                      allowClear
                      style={{ width: 200, marginLeft: 8 }}
                      onChange={(value) => handleFilterChange('type', value)}
                      value={searchFilters.type}
                    >
                      <Option value="tax-invoice">Tax Invoice</Option>
                      <Option value="credit-note">Credit Note</Option>
                      <Option value="debit-note">Debit Note</Option>
                    </Select>
                  </div>
                  
                  <Button 
                    type="primary" 
                    icon={<SearchOutlined />}
                    onClick={handleInvoiceSearch}
                    disabled={!invoiceInput.trim()}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </TabPane>
          </Tabs>

          <Card className="data-table">
            <div className="table-header">
              <h4>Invoice Details</h4>
              <Space>
                <Button icon={<FilterOutlined />}>Advanced Filters</Button>
              </Space>
            </div>
            
            <Table
              columns={columns}
              dataSource={records}
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} of ${total} items`,
              }}
              scroll={{ x: 1000 }}
            />
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default CumulativeInvoice;