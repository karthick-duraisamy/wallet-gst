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
  DatePicker,
  Dropdown,
  MenuProps
} from 'antd';
import { SearchOutlined, DownloadOutlined, CalendarOutlined, FilterOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const CumulativeInvoice: React.FC = () => {
  const { translate, isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadType, setUploadType] = useState('pnr');
  const [dateRange, setDateRange] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState('all');
  const [travelMode, setTravelMode] = useState('flight');

  // Mock data for the table
  const mockData = [
    {
      key: '1',
      supplierName: 'Air India',
      pnrTicketNumber: 'AI123456',
      invoiceNumber: 'INV001',
      invoiceDate: '2024-01-15',
      type: 'Tax Invoice',
      taxClaimable: '₹5,000',
      status: 'New',
      airlines: 'Air India',
      placeOfSupply: 'Mumbai',
    },
    {
      key: '2',
      supplierName: 'IndiGo',
      pnrTicketNumber: '6E789012',
      invoiceNumber: 'INV002',
      invoiceDate: '2024-01-16',
      type: 'Credit Note',
      taxClaimable: '₹3,500',
      status: 'Matched',
      airlines: 'IndiGo',
      placeOfSupply: 'Delhi',
    },
  ];

  // Initialize visible columns state with all columns visible by default
  const [visibleColumns, setVisibleColumns] = useState({
    supplierName: true,
    pnrTicketNumber: true,
    invoiceNumber: true,
    invoiceDate: true,
    type: true,
    taxClaimable: true,
    status: true,
    airlines: true,
    placeOfSupply: true,
  });
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);

  // Define all available columns
  const allColumnsDefinition = [
    {
      title: translate('supplierName'),
      dataIndex: 'supplierName',
      key: 'supplierName',
    },
    {
      title: translate('pnrTicketNumber'),
      dataIndex: 'pnrTicketNumber',
      key: 'pnrTicketNumber',
    },
    {
      title: translate('invoiceNumber'),
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: translate('invoiceDate'),
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
    },
    {
      title: translate('type'),
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: translate('taxClaimable'),
      dataIndex: 'taxClaimable',
      key: 'taxClaimable',
    },
    {
      title: translate('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusColors = {
          'New': 'blue',
          'Matched': 'green',
          'Pending to file': 'orange',
          'Invoice missing': 'red',
          'Additional in GSTR-2A': 'purple',
          'Invoice received': 'cyan',
        };
        return <Tag color={statusColors[status as keyof typeof statusColors]}>{status}</Tag>;
      },
    },
    {
      title: translate('airlines'),
      dataIndex: 'airlines',
      key: 'airlines',
    },
    {
      title: translate('placeOfSupply'),
      dataIndex: 'placeOfSupply',
      key: 'placeOfSupply',
    },
    {
      title: '',
      key: 'filter',
      width: 50,
      render: () => null,
    },
  ];

  // Filter visible columns
  const visibleColumnsData = allColumnsDefinition.filter(col => 
    col.key === 'filter' || visibleColumns[col.key as keyof typeof visibleColumns]
  );

  // Add filter icon to the last column
  const columnsWithFilter = [...visibleColumnsData];
  if (columnsWithFilter.length > 0) {
    const lastColumnIndex = columnsWithFilter.length - 1;
    columnsWithFilter[lastColumnIndex] = {
      ...columnsWithFilter[lastColumnIndex],
      title: (
        <Dropdown
          open={filterDropdownVisible}
          onOpenChange={setFilterDropdownVisible}
          trigger={['click']}
          dropdownRender={() => (
            <div style={{ 
              padding: '12px', 
              background: isDarkMode ? '#262626' : '#ffffff',
              border: `1px solid ${isDarkMode ? '#424242' : '#d9d9d9'}`,
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              minWidth: '200px'
            }}>
              <div style={{ marginBottom: '8px', fontWeight: 600, color: isDarkMode ? '#ffffff' : '#000000' }}>
                Show/Hide Columns
              </div>
              {allColumnsDefinition
                .filter(col => col.key !== 'filter')
                .map(col => (
                  <div key={col.key} style={{ marginBottom: '8px' }}>
                    <Checkbox
                      checked={visibleColumns[col.key as keyof typeof visibleColumns]}
                      onChange={(e) => {
                        setVisibleColumns(prev => ({
                          ...prev,
                          [col.key]: e.target.checked
                        }));
                      }}
                      style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                    >
                      {col.title}
                    </Checkbox>
                  </div>
                ))}
            </div>
          )}
        >
          <Button
            type="text"
            icon={<FilterOutlined />}
            style={{ 
              border: 'none', 
              boxShadow: 'none',
              color: isDarkMode ? '#ffffff' : '#000000'
            }}
          />
        </Dropdown>
      ),
    };
  }

  const airlines = ['Air India', 'IndiGo', 'SpiceJet', 'GoAir', 'Vistara'];
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const handleSearch = () => {
    console.log('Search triggered');
  };

  const handleReset = () => {
    setSearchText('');
    setSelectedAirlines([]);
    setSelectedState('all');
    setDateRange(null);
  };

  const handleExport = () => {
    console.log('Export triggered');
  };

  const tabItems = [
    {
      key: 'upload',
      label: 'Upload',
      children: (
        <div style={{ padding: '24px 0' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Upload Type Selection */}
            <div>
              <Text strong style={{ display: 'block', marginBottom: '12px' }}>
                {translate('uploadPNRTicket')}
              </Text>
              <Radio.Group 
                value={uploadType} 
                onChange={(e) => setUploadType(e.target.value)}
                style={{ width: '100%' }}
              >
                <Radio value="pnr">{translate('uploadPNRTicket')}</Radio>
                <Radio value="invoice">{translate('uploadInvoiceNo')}</Radio>
              </Radio.Group>
            </div>

            {/* Text Area for Input */}
            <div>
              <Text strong style={{ display: 'block', marginBottom: '12px' }}>
                {uploadType === 'pnr' ? translate('uploadMultiplePNR') : translate('uploadMultipleInvoice')}
              </Text>
              <TextArea
                rows={4}
                placeholder={uploadType === 'pnr' ? translate('enterPNRTicket') : 'Enter Invoice numbers...'}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            {/* Search Button */}
            <Button 
              type="primary" 
              icon={<SearchOutlined />}
              onClick={handleSearch}
              size="large"
            >
              Search
            </Button>
          </Space>
        </div>
      ),
    },
    {
      key: 'results',
      label: 'Results',
      children: (
        <div style={{ padding: '24px 0' }}>
          {/* Filters */}
          <div style={{ 
            background: isDarkMode ? '#262626' : '#fafafa', 
            padding: '20px', 
            borderRadius: '8px', 
            marginBottom: '24px' 
          }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  {translate('airlines')}
                </Text>
                <Select
                  mode="multiple"
                  placeholder="Select airlines"
                  style={{ width: '100%' }}
                  value={selectedAirlines}
                  onChange={setSelectedAirlines}
                >
                  {airlines.map(airline => (
                    <Option key={airline} value={airline}>{airline}</Option>
                  ))}
                </Select>
              </div>

              <div>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  {translate('placeOfSupply')}
                </Text>
                <Select
                  placeholder="Select state"
                  style={{ width: '100%' }}
                  value={selectedState}
                  onChange={setSelectedState}
                >
                  <Option value="all">{translate('allStates')}</Option>
                  {states.map(state => (
                    <Option key={state} value={state}>{state}</Option>
                  ))}
                </Select>
              </div>

              <div>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  {translate('travelMode')}
                </Text>
                <Select
                  placeholder="Select travel mode"
                  style={{ width: '100%' }}
                  value={travelMode}
                  onChange={setTravelMode}
                >
                  <Option value="flight">{translate('flight')}</Option>
                  <Option value="train">{translate('train')}</Option>
                </Select>
              </div>

              <div>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  {translate('startEndDateRequired')}
                </Text>
                <RangePicker
                  style={{ width: '100%' }}
                  value={dateRange}
                  onChange={setDateRange}
                  placeholder={[translate('startDate'), translate('endDate')]}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button onClick={handleReset}>
                {translate('resetAll')}
              </Button>
              <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                Search
              </Button>
              <Button icon={<DownloadOutlined />} onClick={handleExport}>
                Export
              </Button>
            </div>
          </div>

          {/* Table */}
          <div style={{ 
            background: isDarkMode ? '#1f1f1f' : '#ffffff',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <Table
              columns={columnsWithFilter}
              dataSource={mockData}
              pagination={{
                total: mockData.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${translate('displaying')} ${range[0]}-${range[1]} ${translate('outOf')} ${total}`,
              }}
              scroll={{ x: 'max-content' }}
              className="custom-table"
              style={{
                background: isDarkMode ? '#1f1f1f' : '#ffffff',
              }}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, color: isDarkMode ? '#ffffff' : '#000000' }}>
          {translate('cumulativeInvoice')}
        </Title>
      </div>

      <Card style={{ 
        background: isDarkMode ? '#1f1f1f' : '#ffffff',
        border: isDarkMode ? '1px solid #424242' : '1px solid #d9d9d9'
      }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          style={{
            '--antd-tabs-tab-color': isDarkMode ? '#ffffff' : '#000000',
          } as React.CSSProperties}
        />
      </Card>
    </div>
  );
};

export default CumulativeInvoice;
