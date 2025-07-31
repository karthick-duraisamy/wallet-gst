import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Select, 
  Space, 
  Typography, 
  Tag, 
  Input,
  DatePicker,
  Row,
  Col
} from 'antd';
import { 
  SearchOutlined, 
  DownloadOutlined, 
  FilterOutlined,
  CalendarOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import '../styles/Reconciliation.scss';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface ReconciliationData {
  key: string;
  supplierName: string;
  pnrTicketNumber: string;
  invoiceNumber: string;
  invoiceDate: string;
  type: string;
  taxClaimable: number;
  status: string;
}

const Reconciliation: React.FC = () => {
  const { isDarkMode, translate } = useTheme();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  const [dateRange, setDateRange] = useState<any>(null);
  const [filteredData, setFilteredData] = useState<ReconciliationData[]>([]);

  // Status counts
  const [statusCounts, setStatusCounts] = useState({
    submitted: 245,
    pendingToFile: 89,
    invoiceMissing: 34,
    additionalInGSTR: 67
  });

  const mockData: ReconciliationData[] = [
    {
      key: '1',
      supplierName: 'SpiceJet',
      pnrTicketNumber: 'SG123',
      invoiceNumber: 'INV1234567',
      invoiceDate: '15-Jan-2024',
      type: 'Tax invoice',
      taxClaimable: 12500.75,
      status: 'Submitted',
    },
    {
      key: '2',
      supplierName: 'IndiGo',
      pnrTicketNumber: 'ABC789',
      invoiceNumber: 'INV1234567',
      invoiceDate: '20-Mar-2020',
      type: 'Tax invoice',
      taxClaimable: 15750.00,
      status: 'Pending to File',
    },
    {
      key: '3',
      supplierName: 'Air India',
      pnrTicketNumber: 'DEF456',
      invoiceNumber: 'DL1212290AT12345',
      invoiceDate: '25-Apr-2021',
      type: 'Tax invoice',
      taxClaimable: 6789.00,
      status: 'Invoice Missing',
    },
    {
      key: '4',
      supplierName: 'Vistara',
      pnrTicketNumber: 'GHI789',
      invoiceNumber: 'DL1212290AU98765',
      invoiceDate: '30-May-2021',
      type: 'Tax invoice',
      taxClaimable: 8900.00,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '5',
      supplierName: 'Alliance Air',
      pnrTicketNumber: 'JKL012',
      invoiceNumber: 'DL1212290AU54321',
      invoiceDate: '15-Jun-2021',
      type: 'Tax invoice',
      taxClaimable: 5432.00,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '6',
      supplierName: 'AirAsia India',
      pnrTicketNumber: 'MNO345',
      invoiceNumber: 'INV987654321',
      invoiceDate: '20-Jul-2021',
      type: 'Tax invoice',
      taxClaimable: 7500.00,
      status: 'Additional in GSTR-2A',
    },
    {
      key: '7',
      supplierName: 'Spice Jet',
      pnrTicketNumber: 'PQR678',
      invoiceNumber: 'INV0BET999888',
      invoiceDate: '25-Aug-2021',
      type: 'Credit note',
      taxClaimable: 3200.50,
      status: 'Additional in GSTR-2A',
    }
  ];

  useEffect(() => {
    applyFilters();
  }, [searchText, selectedSupplier, selectedType, selectedStatus, selectedVendor, dateRange]);

  const applyFilters = () => {
    let filtered = mockData;

    // Search filter
    if (searchText) {
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }

    // Supplier filter
    if (selectedSupplier !== 'all') {
      filtered = filtered.filter(item => item.supplierName === selectedSupplier);
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(item => item.status === selectedStatus);
    }

    // Date range filter
    if (dateRange && dateRange.length === 2) {
      filtered = filtered.filter(item => {
        const itemDate = dayjs(item.invoiceDate, 'DD-MMM-YYYY');
        return itemDate.isAfter(dateRange[0]) && itemDate.isBefore(dateRange[1]);
      });
    }

    setFilteredData(filtered);
  };

  const handleResetAll = () => {
    setSearchText('');
    setSelectedSupplier('all');
    setSelectedType('all');
    setSelectedStatus('all');
    setSelectedVendor('all');
    setDateRange(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted': return 'green';
      case 'Pending to File': return 'orange';
      case 'Invoice Missing': return 'red';
      case 'Additional in GSTR-2A': return 'blue';
      default: return 'default';
    }
  };

  const columns: ColumnsType<ReconciliationData> = [
    {
      title: 'Supplier Name',
      dataIndex: 'supplierName',
      key: 'supplierName',
      sorter: (a, b) => a.supplierName.localeCompare(b.supplierName),
    },
    {
      title: 'PNR/Ticket Number',
      dataIndex: 'pnrTicketNumber',
      key: 'pnrTicketNumber',
    },
    {
      title: 'Invoice Number',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: 'Invoice Date',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
      sorter: (a, b) => dayjs(a.invoiceDate, 'DD-MMM-YYYY').valueOf() - dayjs(b.invoiceDate, 'DD-MMM-YYYY').valueOf(),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Tax invoice', value: 'Tax invoice' },
        { text: 'Credit note', value: 'Credit note' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Tax Claimable (₹)',
      dataIndex: 'taxClaimable',
      key: 'taxClaimable',
      render: (amount: number) => `₹${amount.toLocaleString()}`,
      sorter: (a, b) => a.taxClaimable - b.taxClaimable,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      ),
      filters: [
        { text: 'Submitted', value: 'Submitted' },
        { text: 'Pending to File', value: 'Pending to File' },
        { text: 'Invoice Missing', value: 'Invoice Missing' },
        { text: 'Additional in GSTR-2A', value: 'Additional in GSTR-2A' },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  return (
    <div style={{ 
      background: isDarkMode ? '#141414' : '#f5f5f5',
      minHeight: 'calc(100vh - 128px)',
      padding: '24px'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ color: '#5A4FCF', marginBottom: '8px' }}>
          Reconciliation History (Airline)
        </Title>
        <Text style={{ color: '#666' }}>
          View and manage reconciliation data for airline invoices
        </Text>
      </div>

      {/* Filters */}
      <Card 
        style={{ 
          marginBottom: '24px',
          background: isDarkMode ? '#1f1f1f' : '#fff',
          borderRadius: '12px',
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <div>
              <Text style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                Date Range
              </Text>
              <RangePicker
                value={dateRange}
                onChange={setDateRange}
                style={{ width: '100%' }}
                placeholder={['Start Date', 'End Date']}
                suffixIcon={<CalendarOutlined />}
              />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div>
              <Text style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                Supplier
              </Text>
              <Select
                value={selectedSupplier}
                onChange={setSelectedSupplier}
                style={{ width: '100%' }}
                placeholder="Select Supplier"
              >
                <Option value="all">All Suppliers</Option>
                <Option value="SpiceJet">SpiceJet</Option>
                <Option value="IndiGo">IndiGo</Option>
                <Option value="Air India">Air India</Option>
                <Option value="Vistara">Vistara</Option>
                <Option value="Alliance Air">Alliance Air</Option>
                <Option value="AirAsia India">AirAsia India</Option>
              </Select>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div>
              <Text style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                Travel Vendor
              </Text>
              <Select
                value={selectedVendor}
                onChange={setSelectedVendor}
                style={{ width: '100%' }}
                placeholder="Select Travel Vendor"
              >
                <Option value="all">All Vendors</Option>
                <Option value="ClearTrip">ClearTrip</Option>
                <Option value="MakeMyTrip">MakeMyTrip</Option>
                <Option value="Goibibo">Goibibo</Option>
                <Option value="Yatra">Yatra</Option>
              </Select>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div>
              <Text style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                Type
              </Text>
              <Select
                value={selectedType}
                onChange={setSelectedType}
                style={{ width: '100%' }}
                placeholder="Select Type"
              >
                <Option value="all">All Types</Option>
                <Option value="Tax invoice">Tax Invoice</Option>
                <Option value="Credit note">Credit Note</Option>
              </Select>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div>
              <Text style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                Status
              </Text>
              <Select
                value={selectedStatus}
                onChange={setSelectedStatus}
                style={{ width: '100%' }}
                placeholder="Select Status"
              >
                <Option value="all">All Status</Option>
                <Option value="Submitted">Submitted</Option>
                <Option value="Pending to File">Pending to File</Option>
                <Option value="Invoice Missing">Invoice Missing</Option>
                <Option value="Additional in GSTR-2A">Additional in GSTR-2A</Option>
              </Select>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div>
              <Text style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                Search
              </Text>
              <Input
                placeholder="Search records..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </Col>

          <Col xs={24} sm={12} md={12}>
            <div style={{ paddingTop: '18px' }}>
              <Space>
                <Button 
                  type="primary" 
                  style={{ backgroundColor: '#5A4FCF', borderColor: '#5A4FCF' }}
                >
                  Apply Filters
                </Button>
                <Button 
                  icon={<ReloadOutlined />}
                  onClick={handleResetAll}
                >
                  Reset All
                </Button>
                <Button 
                  icon={<DownloadOutlined />}
                  style={{ backgroundColor: '#52c41a', borderColor: '#52c41a', color: 'white' }}
                >
                  Export
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Status Counts */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={12} sm={6}>
          <Card style={{ 
            textAlign: 'center',
            background: isDarkMode ? '#1f1f1f' : '#fff',
            borderRadius: '8px',
            border: '1px solid #52c41a'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
              {statusCounts.submitted}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Submitted</div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card style={{ 
            textAlign: 'center',
            background: isDarkMode ? '#1f1f1f' : '#fff',
            borderRadius: '8px',
            border: '1px solid #faad14'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#faad14' }}>
              {statusCounts.pendingToFile}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Pending to File</div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card style={{ 
            textAlign: 'center',
            background: isDarkMode ? '#1f1f1f' : '#fff',
            borderRadius: '8px',
            border: '1px solid #f5222d'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f5222d' }}>
              {statusCounts.invoiceMissing}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Invoice Missing</div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card style={{ 
            textAlign: 'center',
            background: isDarkMode ? '#1f1f1f' : '#fff',
            borderRadius: '8px',
            border: '1px solid #1890ff'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
              {statusCounts.additionalInGSTR}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Additional in GSTR-2A</div>
          </Card>
        </Col>
      </Row>

      {/* Data Table */}
      <Card 
        style={{ 
          background: isDarkMode ? '#1f1f1f' : '#fff',
          borderRadius: '12px',
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          scroll={{ x: 1200 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          style={{ 
            '.ant-table-filter-dropdown': {
              zIndex: 9999
            }
          }}
        />
      </Card>
    </div>
  );
};

export default Reconciliation;