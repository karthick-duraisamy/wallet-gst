
import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Typography, 
  Space,
  Steps,
  Checkbox,
  Radio,
  Modal,
  Input,
  Select,
  DatePicker,
  message
} from 'antd';
import { useNavigate } from 'react-router-dom';
import '../styles/Report.scss';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Sample data from the JSON response
const reportData = {
  "top_menu": [
    {"id": 1, "name": "Available fields"},
    {"id": 2, "name": "Available conditions"},
    {"id": 3, "name": "Review & Save"}
  ],
  "menu_data": [
    {"id": "1", "name": "DSR", "status": "y", "default": true, "transaction_code": "DSR"},
    {"id": "3", "name": "Ledger", "status": "y", "default": false, "transaction_code": "LG"},
    {"id": "6", "name": "Commission", "status": "y", "default": false, "transaction_code": "CMS"},
    {"id": "6", "name": "Top-up", "status": "y", "default": false, "transaction_code": "TU"},
    {"id": "8", "name": "Sales", "status": "y", "default": false, "transaction_code": "SALES"}
  ],
  "checkbox_data": [
    {
      "head": "Itinerary details",
      "checkbox": [
        {"id": "7", "name": "Booking reference id", "status": "n", "default": true, "selectValue": "bookingReferenceId", "visible_status": "y"},
        {"id": "7", "name": "SBA id", "status": "n", "default": true, "selectValue": "sbaID", "visible_status": "y"},
        {"id": "1", "name": "Agency name", "status": "y", "default": true, "selectValue": "corporateName", "visible_status": "y"},
        {"id": "1", "name": "Invoice number", "status": "n", "default": true, "selectValue": "invoiceNumber", "visible_status": "y"},
        {"id": "2", "name": "Reference invoice number", "status": "n", "selectValue": "referenceInvoiceNumber", "visible_status": "y"},
        {"id": "3", "name": "Invoice date", "status": "n", "default": true, "selectValue": "invoiceDate", "visible_status": "y"},
        {"id": "4", "name": "Invoice time", "status": "n", "default": true, "selectValue": "invoiceTime", "visible_status": "y"},
        {"id": "1", "name": "Sector", "status": "n", "selectValue": "sector", "visible_status": "y"},
        {"id": "5", "name": "Origin", "status": "n", "selectValue": "origin", "visible_status": "y"},
        {"id": "6", "name": "Destination", "status": "n", "selectValue": "destination", "visible_status": "y"}
      ]
    },
    {
      "head": "Passenger details", 
      "checkbox": [
        {"id": "12", "name": "Passenger Name", "status": "y", "selectValue": "passengerName", "visible_status": "y"},
        {"id": "13", "name": "Pax Type", "status": "n", "selectValue": "paxType", "visible_status": "y"},
        {"id": "15", "name": "Ticket Number", "status": "n", "selectValue": "ticketNumber", "visible_status": "y"}
      ]
    },
    {
      "head": "Fare Details",
      "checkbox": [
        {"id": "1", "name": "Currency Type", "status": "n", "selectValue": "currencyType", "visible_status": "y"},
        {"id": "2", "name": "Base Fare", "status": "n", "selectValue": "baseFare", "visible_status": "y"},
        {"id": "3", "name": "Total Tax", "status": "n", "selectValue": "totalTax", "visible_status": "y"},
        {"id": "7", "name": "GST", "status": "n", "selectValue": "gst", "visible_status": "y"}
      ]
    },
    {
      "head": "Commission Details",
      "checkbox": [
        {"id": "1", "name": "Commission Name", "status": "n", "selectValue": "commissionName", "visible_status": "y"},
        {"id": "1", "name": "Management Fee", "status": "n", "selectValue": "managementFee", "visible_status": "y"},
        {"id": "7", "name": "Commission Amount", "status": "n", "selectValue": "commissionAmount", "visible_status": "y"}
      ]
    },
    {
      "head": "Airline Details",
      "checkbox": [
        {"id": "1", "name": "Airline Code", "status": "n", "selectValue": "airlineCode", "visible_status": "y"},
        {"id": "1", "name": "Airline Name", "status": "n", "selectValue": "airlineName", "visible_status": "y"},
        {"id": "2", "name": "Flight Number", "status": "n", "selectValue": "flightNumber", "visible_status": "y"}
      ]
    },
    {
      "head": "Agency Details",
      "checkbox": [
        {"id": "2", "name": "Agent Name", "status": "n", "selectValue": "userName", "visible_status": "y"},
        {"id": "3", "name": "Bill To", "status": "n", "selectValue": "billTo", "visible_status": "y"},
        {"id": "4", "name": "Account Code", "status": "n", "selectValue": "accountCode", "visible_status": "y"}
      ]
    }
  ],
  "condition": {
    "head": "Condition Details",
    "checkbox": [
      {
        "id": "1",
        "data": [
          {"id": "TD", "value": "Today"},
          {"id": "YD", "value": "Yesterday"},
          {"id": "LD_7", "value": "Last 7 days"},
          {"id": "TM", "value": "This month"},
          {"id": "LM", "value": "Last month"},
          {"id": "custom", "value": "Custom"}
        ],
        "name": "Date Range",
        "type": "date",
        "status": "y",
        "default": true,
        "template": "date_range",
        "visible_status": "y"
      },
      {
        "id": "corporate",
        "data": [],
        "name": "Agency",
        "type": "corporate",
        "label": "Select agency",
        "format": "agencyName",
        "status": "n",
        "template": "corporate",
        "field_type": "email",
        "visible_status": "y"
      }
    ]
  }
};

const Report: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedReportType, setSelectedReportType] = useState('DSR');
  const [selectedFields, setSelectedFields] = useState<{[key: string]: string[]}>({});
  const [selectedConditions, setSelectedConditions] = useState<string[]>(['Date Range']);
  const [dateRange, setDateRange] = useState('Today');
  const [customDateRange, setCustomDateRange] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reportName, setReportName] = useState('');
  const [reportDescription, setReportDescription] = useState('');

  const steps = [
    {
      title: 'Available fields',
      content: 'first-content',
    },
    {
      title: 'Available conditions',
      content: 'second-content',
    },
    {
      title: 'Review & Save',
      content: 'last-content',
    },
  ];

  const handleFieldSelection = (groupName: string, fieldName: string, checked: boolean) => {
    setSelectedFields(prev => {
      const newFields = { ...prev };
      if (!newFields[groupName]) {
        newFields[groupName] = [];
      }
      if (checked) {
        newFields[groupName] = [...newFields[groupName], fieldName];
      } else {
        newFields[groupName] = newFields[groupName].filter(field => field !== fieldName);
      }
      return newFields;
    });
  };

  const handleSelectAll = (groupName: string, checked: boolean) => {
    const group = reportData.checkbox_data.find(g => g.head === groupName);
    if (group) {
      const allFields = group.checkbox.map(cb => cb.name);
      setSelectedFields(prev => ({
        ...prev,
        [groupName]: checked ? allFields : []
      }));
    }
  };

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleDownload = () => {
    message.success('Report downloaded successfully!');
  };

  const handleSaveReport = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    // Save report logic here
    message.success('Report saved successfully!');
    setIsModalVisible(false);
    setReportName('');
    setReportDescription('');
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setReportName('');
    setReportDescription('');
  };

  const renderAvailableFields = () => {
    return (
      <div className="cls-available-fields">
        {reportData.checkbox_data.map((group, index) => (
          <div key={index} className="cls-field-group">
            <div className="cls-group-header">
              <Text strong>{group.head}</Text>
              <Checkbox
                onChange={(e) => handleSelectAll(group.head, e.target.checked)}
                className="cls-select-all"
              >
                Select all
              </Checkbox>
            </div>
            <div className="cls-checkbox-grid">
              {group.checkbox.map((checkbox, cbIndex) => (
                <Checkbox
                  key={cbIndex}
                  checked={selectedFields[group.head]?.includes(checkbox.name) || false}
                  onChange={(e) => handleFieldSelection(group.head, checkbox.name, e.target.checked)}
                  className={checkbox.status === 'y' ? 'cls-checked-orange' : ''}
                >
                  {checkbox.name}
                </Checkbox>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAvailableConditions = () => {
    return (
      <div className="cls-available-conditions">
        <div className="cls-condition-group">
          <Text strong>Condition Details</Text>
          <Checkbox
            className="cls-select-all"
          >
            Select all
          </Checkbox>
        </div>
        <div className="cls-condition-checkboxes">
          <Checkbox
            checked={selectedConditions.includes('Date Range')}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedConditions([...selectedConditions, 'Date Range']);
              } else {
                setSelectedConditions(selectedConditions.filter(c => c !== 'Date Range'));
              }
            }}
            className="cls-checked-orange"
          >
            Date Range
          </Checkbox>
          <Checkbox
            checked={selectedConditions.includes('Agency')}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedConditions([...selectedConditions, 'Agency']);
              } else {
                setSelectedConditions(selectedConditions.filter(c => c !== 'Agency'));
              }
            }}
          >
            Agency
          </Checkbox>
        </div>
      </div>
    );
  };

  const renderReviewAndSave = () => {
    const getSelectedFieldsText = () => {
      const allSelected: string[] = [];
      Object.entries(selectedFields).forEach(([group, fields]) => {
        allSelected.push(...fields);
      });
      return allSelected.join(', ');
    };

    return (
      <div className="cls-review-save">
        <div className="cls-selected-fields">
          <Title level={4}>Selected fields</Title>
          {Object.entries(selectedFields).map(([group, fields]) => (
            fields.length > 0 && (
              <div key={group} className="cls-selected-group">
                <Text strong>Selected {group.toLowerCase()}</Text>
                <Text>{fields.join(', ')}</Text>
              </div>
            )
          ))}
          
          <div className="cls-selected-group">
            <Text strong>Selected condition details</Text>
            <Text>{selectedConditions.join(', ')}</Text>
          </div>
        </div>

        <div className="cls-selected-conditions">
          <Title level={4}>Selected conditions</Title>
          <Radio.Group value="invoiceDateRange" className="cls-condition-radio">
            <Radio value="invoiceDateRange">Invoiced date range</Radio>
            <Radio value="departureDateRange">Departure date range</Radio>
          </Radio.Group>
          
          <div className="cls-date-selector">
            <Select
              value={dateRange}
              onChange={setDateRange}
              className="cls-date-select"
              placeholder="Select invoiced date range"
            >
              <Option value="Today">Today</Option>
              <Option value="Yesterday">Yesterday</Option>
              <Option value="Last 7 days">Last 7 days</Option>
              <Option value="This month">This month</Option>
              <Option value="Last month">Last month</Option>
              <Option value="Custom">Custom</Option>
            </Select>
          </div>
        </div>

        <div className="cls-action-buttons">
          <Button 
            type="primary" 
            size="large"
            onClick={handleDownload}
            className="cls-download-btn"
          >
            Download
          </Button>
          <Button 
            type="primary" 
            size="large"
            onClick={handleSaveReport}
            className="cls-save-btn"
          >
            Save report
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="cls-report-page">
      <div className="cls-report-header">
        <div className="cls-breadcrumb">
          <Text>Home » Create custom report</Text>
        </div>
        <Title level={3} className="cls-report-title">Create custom report</Title>
        <div className="cls-header-buttons">
          <Button 
            icon={<span>📊</span>}
            onClick={() => navigate('/report/saved')}
          >
            Saved reports
          </Button>
          <Button 
            icon={<span>⏳</span>}
            onClick={() => navigate('/report/queued')}
          >
            Queued reports
          </Button>
        </div>
      </div>

      <Card className="cls-report-card">
        <div className="cls-report-content">
          <div className="cls-sidebar">
            <div className="cls-report-types">
              {reportData.menu_data.filter(item => item.status === 'y').map((reportType) => (
                <div
                  key={reportType.id}
                  className={`cls-report-type ${selectedReportType === reportType.name ? 'cls-active' : ''}`}
                  onClick={() => setSelectedReportType(reportType.name)}
                >
                  {reportType.name}
                </div>
              ))}
            </div>
          </div>

          <div className="cls-main-content">
            <Steps 
              current={currentStep} 
              className="cls-steps"
              items={steps.map((step, index) => ({
                title: step.title,
                status: currentStep === index ? 'process' : currentStep > index ? 'finish' : 'wait'
              }))}
            />

            <div className="cls-step-content">
              {currentStep === 0 && renderAvailableFields()}
              {currentStep === 1 && renderAvailableConditions()}
              {currentStep === 2 && renderReviewAndSave()}
            </div>

            {currentStep < 2 && (
              <div className="cls-continue-section">
                <Button 
                  type="primary" 
                  size="large"
                  onClick={handleContinue}
                  className="cls-continue-btn"
                >
                  Continue
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Modal
        title="Save report"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Okay"
        cancelButtonProps={{ style: { display: 'none' } }}
        className="cls-save-modal"
      >
        <div className="cls-modal-content">
          <div className="cls-form-field">
            <Text>Report name</Text>
            <Input
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              placeholder="Enter report name"
            />
          </div>
          <div className="cls-form-field">
            <Text>Description</Text>
            <TextArea
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              placeholder="Enter description"
              rows={4}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Report;
