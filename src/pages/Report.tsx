import React, { useState } from "react";
import {
  Card,
  Button,
  Radio,
  DatePicker,
  Checkbox,
  Input,
  Steps,
  Form,
  Row,
  Col,
  Typography,
  Alert,
  Space,
  Divider,
  message,
  Tag,
  Tooltip,
  AutoComplete,
  Select,
  Modal,
} from "antd";
import * as XLSX from "xlsx";
import {
  CalendarOutlined,
  DownloadOutlined,
  SaveOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  UnorderedListOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import reportData from "../data/reportData.json";
import '../styles/Report.scss'

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const Report: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [reportType, setReportType] = useState(() => {
    return localStorage.getItem('selectedReportType') || "Net claimable";
  });

  // Save report type to localStorage when it changes
  const handleReportTypeChange = (type: string) => {
    setReportType(type);
    localStorage.setItem('selectedReportType', type);
  };
  const [selectedFields, setSelectedFields] = useState<{
    [key: string]: string[];
  }>({
    itineraryDetails: [],
    passengerDetails: [],
    fareDetails: [],
    commissionDetails: [],
    airlineDetails: [],
    agencyDetails: [],
  });
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [dateRangeType, setDateRangeType] = useState("today");
  const [customDateRange, setCustomDateRange] = useState<any>(null);
  const [invoicedDateRange, setInvoicedDateRange] = useState("today");
  const [customInvoicedDateRange, setCustomInvoicedDateRange] =
    useState<any>(null);
  const [dateRangeRadioValue, setDateRangeRadioValue] = useState("invoiced");
  const [form] = Form.useForm();

  const reportTypes = ["Net claimable", "Tax invoices Pending to file", "Invoice missing ", "Additional invoices in GSTR-2A", "Booking data not reconciled", "Tax invoice recieved report", "MIS for corporate", "Airline contact details", "Offline airline invoices"];

  const handleFieldSelection = (
    category: string,
    field: string,
    checked: boolean,
  ) => {
    setSelectedFields((prev) => ({
      ...prev,
      [category]: checked
        ? [...prev[category], field]
        : prev[category].filter((f) => f !== field),
    }));
  };

  const handleSelectAllFields = (category: string, fields: any[]) => {
    const allSelected = fields.every((field) =>
      selectedFields[category].includes(field.key),
    );
    setSelectedFields((prev) => ({
      ...prev,
      [category]: allSelected ? [] : fields.map((field) => field.key),
    }));
  };

  const handleConditionSelection = (condition: string, checked: boolean) => {
    if (checked) {
      setSelectedConditions([...selectedConditions, condition]);
    } else {
      setSelectedConditions(selectedConditions.filter((c) => c !== condition));
    }
  };

  const handleContinue = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const canContinue = () => {
    if (currentStep === 0) {
      return Object.values(selectedFields).some((fields) => fields.length > 0);
    }
    if (currentStep === 1) {
      return selectedConditions.length > 0;
    }
    return true;
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateXLSData = () => {
    // Sample data structure based on selected fields
    const data = [];
    const headers = [];

    // Build headers based on selected fields
    Object.entries(selectedFields).forEach(([category, fields]) => {
      if (fields.length > 0) {
        const categoryData =
          reportData.reportFields[
            reportType as keyof typeof reportData.reportFields
          ];
        const categoryFields =
          categoryData?.[category as keyof typeof categoryData] || [];

        fields.forEach((fieldKey) => {
          const field = categoryFields.find((f: any) => f.key === fieldKey);
          if (field) {
            headers.push(field.label);
          }
        });
      }
    });

    // Add sample rows (in real implementation, this would come from API)
    for (let i = 0; i < 100; i++) {
      const row: any = {};
      headers.forEach((header) => {
        row[header] = `Sample ${header} ${i + 1}`;
      });
      data.push(row);
    }

    return { headers, data };
  };

  const handleDownload = () => {
    const { headers, data } = generateXLSData();
    const fileSize = JSON.stringify(data).length; // Rough size estimation
    const sizeThreshold = 500000; // 500KB threshold for demo purposes

    if (fileSize > sizeThreshold) {
      // Add to queued reports
      const queuedReport = {
        key: Date.now().toString(),
        name: `${reportType} Report - ${new Date().toLocaleDateString()}`,
        type: reportType,
        status: "Queued",
        progress: 0,
        queueTime: new Date().toLocaleString(),
        estimatedCompletion: new Date(
          Date.now() + 30 * 60 * 1000,
        ).toLocaleString(),
        priority: "Medium",
      };

      const existingQueued = JSON.parse(
        localStorage.getItem("queuedReports") || "[]",
      );
      existingQueued.push(queuedReport);
      localStorage.setItem("queuedReports", JSON.stringify(existingQueued));

      message.info(
        "Report is large and has been added to the queue for processing.",
      );
      return;
    }

    // Create workbook and worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, reportType);

    // Generate filename with timestamp
    const filename = `${reportType}_Report_${Date.now()}.xlsx`;

    // Download the file
    XLSX.writeFile(wb, filename);

    message.success("Report downloaded successfully!");
  };

  const handleSaveReport = () => {
    setSaveModalVisible(true);
  };

  const handleSaveModalOk = () => {
    form.validateFields().then((values) => {
      const savedReport = {
        key: Date.now().toString(),
        name: values.reportName,
        type: reportType,
        description: values.description || "",
        createdDate: new Date().toLocaleDateString(),
        lastRun: new Date().toLocaleDateString(),
        frequency: values.frequency || "once",
        status: "Active",
      };

      const existingSaved = JSON.parse(
        localStorage.getItem("savedReports") || "[]",
      );
      existingSaved.push(savedReport);
      localStorage.setItem("savedReports", JSON.stringify(existingSaved));

      message.success("Report saved successfully!");
      setSaveModalVisible(false);
      form.resetFields();
    });
  };

  const stepTitles = [
    "Available fields",
    "Available conditions",
    "Review & Save",
  ];

  const renderFieldCategory = (
    categoryName: string,
    categoryKey: string,
    fields: any[],
  ) => {
    const allSelected = fields.every((field) =>
      selectedFields[categoryKey].includes(field.key),
    );

    return (
      <div className="cls-report-sec">
        <div className="cls-report-sub">
          <Text
            strong
            className={`cls-category-title ${isDarkMode ? "cls-dark" : "cls-light"}`}
          >
            {categoryName}
          </Text>

          <div className="cls-checkBox" onClick={() => handleSelectAllFields(categoryKey, fields)}>
            <Checkbox
              checked={allSelected}
              className="cls-check"
              onChange={() => handleSelectAllFields(categoryKey, fields)}
            />
            <Text className="cls-repoText">Select all</Text>
          </div>
        </div>

        <Row gutter={[12, 12]}>
          {fields.map((field) => (
            <Col span={8} key={field.key}>
              <div
                className="cls-field-item"
                onClick={() =>
                  handleFieldSelection(
                    categoryKey,
                    field.key,
                    !selectedFields[categoryKey].includes(field.key)
                  )
                }
              >
                <Checkbox
                  checked={selectedFields[categoryKey].includes(field.key)}
                  onChange={(e) =>
                    handleFieldSelection(categoryKey, field.key, e.target.checked)
                  }
                  className="cls-field-checkbox"
                />
                <Text
                  className={`cls-field-label 
                    ${selectedFields[categoryKey].includes(field.key) ? "cls-selected" : ""} 
                    ${isDarkMode ? "cls-dark" : ""}`}
                >
                  {field.label}
                </Text>
              </div>
            </Col>
          ))}
        </Row>
      </div>

    );
  };

  // Move all hook-dependent logic outside the render function
  const getSelectedFieldsData = React.useMemo(() => {
    const selectedData: { [key: string]: any[] } = {};

    if (reportData.reportFields) {
      Object.entries(reportData.reportFields).forEach(
        ([reportTypeKey, reportTypeData]) => {
          if (reportTypeKey === reportType) {
            Object.entries(reportTypeData).forEach(
              ([groupKey, group]: [string, any]) => {
                if (Array.isArray(group)) {
                  const selectedInGroup = group.filter((field) =>
                    selectedFields[groupKey].includes(field.key),
                  );
                  if (selectedInGroup.length > 0) {
                    selectedData[groupKey] = selectedInGroup;
                  }
                }
              },
            );
          }
        },
      );
    }

    return selectedData;
  }, [reportType, selectedFields]);

  const getSelectedConditionsData = React.useMemo(() => {
    return (reportData.reportConditions || []).filter((condition) =>
      selectedConditions.includes(condition.key),
    );
  }, [selectedConditions]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="cls-step-content">
            {reportData.reportFields[
              reportType as keyof typeof reportData.reportFields
            ] && (
              <>
                {renderFieldCategory(
                  "Itinerary details",
                  "itineraryDetails",
                  reportData.reportFields[
                    reportType as keyof typeof reportData.reportFields
                  ].itineraryDetails,
                )}
                {renderFieldCategory(
                  "Passenger details",
                  "passengerDetails",
                  reportData.reportFields[
                    reportType as keyof typeof reportData.reportFields
                  ].passengerDetails,
                )}
                {renderFieldCategory(
                  "Fare details",
                  "fareDetails",
                  reportData.reportFields[
                    reportType as keyof typeof reportData.reportFields
                  ].fareDetails,
                )}
                {renderFieldCategory(
                  "Commission details",
                  "commissionDetails",
                  reportData.reportFields[
                    reportType as keyof typeof reportData.reportFields
                  ].commissionDetails,
                )}
                {renderFieldCategory(
                  "Airline details",
                  "airlineDetails",
                  reportData.reportFields[
                    reportType as keyof typeof reportData.reportFields
                  ].airlineDetails,
                )}
                {renderFieldCategory(
                  "Agency details",
                  "agencyDetails",
                  reportData.reportFields[
                    reportType as keyof typeof reportData.reportFields
                  ].agencyDetails,
                )}
              </>
            )}
          </div>
        );

      case 1:
        const availableConditions = [
          { key: "date_range", label: "Date Range" },
          { key: "agency", label: "Agency" },
        ];

        const allConditionsSelected = availableConditions.every((condition) =>
          selectedConditions.includes(condition.key),
        );

        return (
          <div className="cls-step-content">
            <div className="condition-section">
              <div className="condition-header">
                <Text
                  strong
                  className={`condition-title ${isDarkMode ? "cls-dark" : "cls-light"}`}
                >
                  Condition Details
                </Text>

                <div
                  className="select-all-container"
                  onClick={() => {
                    availableConditions.forEach((condition) => {
                      handleConditionSelection(condition.key, !allConditionsSelected);
                    });
                  }}
                >
                  <Checkbox
                    checked={allConditionsSelected}
                    onChange={() => {
                      availableConditions.forEach((condition) => {
                        handleConditionSelection(condition.key, !allConditionsSelected);
                      });
                    }}
                  />
                  <Text className="select-all-text">Select all</Text>
                </div>
              </div>

              <Row gutter={[16, 16]}>
                {availableConditions.map((condition) => (
                  <Col span={8} key={condition.key}>
                    <div
                      className="condition-item"
                      onClick={() =>
                        handleConditionSelection(
                          condition.key,
                          !selectedConditions.includes(condition.key)
                        )
                      }
                    >
                      <Checkbox
                        checked={selectedConditions.includes(condition.key)}
                        onChange={(e) =>
                          handleConditionSelection(condition.key, e.target.checked)
                        }
                      />
                      <Text
                        className={`condition-label 
                          ${selectedConditions.includes(condition.key) ? "cls-selected" : ""} 
                          ${isDarkMode ? "cls-dark" : ""}`}
                      >
                        {condition.label}
                      </Text>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        );


      case 2:
        const categoryNames = {
          itineraryDetails: "Itinerary Details",
          passengerDetails: "Passenger Details",
          fareDetails: "Fare Details",
          commissionDetails: "Commission Details",
          airlineDetails: "Airline Details",
          agencyDetails: "Agency Details",
        };

        const hasSelectedFields = Object.values(selectedFields).some(
          (fields) => fields.length > 0,
        );
        const hasDateRange = selectedConditions.includes("date_range");
        const hasAgency = selectedConditions.includes("agency");

        // Agency options for autocomplete
        const agencyOptions = [
          { value: "atyourprice", label: "AtYourPrice" },
          { value: "makemytrip", label: "MakeMyTrip" },
          { value: "cleartrip", label: "Cleartrip" },
          { value: "goibibo", label: "Goibibo" },
          { value: "yatra", label: "Yatra" },
          { value: "easemytrip", label: "EaseMyTrip" },
        ];

        return (
          <div className="cls-step-content">
            {/* Selected Fields Section */}
            {hasSelectedFields && (
              <div className="section-wrapper">
                <div className={`section-box ${isDarkMode ? "dark-mode" : "light-mode"}`}>
                  <Text className="section-title">Selected Fields</Text>

                  <div className="selected-fields-grid cls-SelectedChecks">
                    {Object.entries(selectedFields).map(([category, fields]) => {
                      if (fields.length === 0) return null;

                      const categoryData =
                        reportData.reportFields[reportType as keyof typeof reportData.reportFields];
                      const categoryFields =
                        categoryData?.[category as keyof typeof categoryData] || [];

                      return (
                        <div
                          key={category}
                          className={`category-box ${isDarkMode ? "dark-mode" : "light-mode"}`}
                        >
                          <Text className="category-title">
                            {categoryNames[category as keyof typeof categoryNames]}
                          </Text>
                          <div className="fields-wrapper">
                            {fields.map((fieldKey) => {
                              const field = categoryFields.find((f: any) => f.key === fieldKey);
                              return field ? (
                                <span key={fieldKey} className="field-badge">
                                  {field.label}
                                </span>
                              ) : null;
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Condition Details Section */}
            {(hasDateRange || hasAgency) && (
              <div className="section-wrapper">
                <div className={`section-box ${isDarkMode ? "dark-mode" : "light-mode"}`}>
                  <Text className="section-title">Condition Details</Text>

                  {/* Date Range */}
                  {hasDateRange && (
                    <div className="condition-section">
                      <div className={`condition-box ${isDarkMode ? "dark-mode" : "light-mode"}`}>
                        <Text className="condition-title">Date Range Type</Text>
                        <Radio.Group
                          value={dateRangeRadioValue}
                          onChange={(e) => setDateRangeRadioValue(e.target.value)}
                          className="radio-group"
                        >
                          <Row gutter={[16, 16]}>
                            <Col span={12}>
                              <Radio value="invoiced">
                                <Text
                                  className={`radio-label ${
                                    dateRangeRadioValue === "invoiced" ? "selected" : ""
                                  } ${isDarkMode ? "dark-mode" : ""}`}
                                >
                                  Invoiced date range
                                </Text>
                              </Radio>
                            </Col>
                            <Col span={12}>
                              <Radio value="departure">
                                <Text
                                  className={`radio-label ${
                                    dateRangeRadioValue === "departure" ? "selected" : ""
                                  } ${isDarkMode ? "dark-mode" : ""}`}
                                >
                                  Departure date range
                                </Text>
                              </Radio>
                            </Col>
                          </Row>
                        </Radio.Group>
                      </div>

                      <div className={`condition-box ${isDarkMode ? "dark-mode" : "light-mode"}`}>
                        <Text className="condition-title">
                          Select{" "}
                          {dateRangeRadioValue === "invoiced" ? "Invoiced" : "Departure"} Date Range
                        </Text>
                        <div className="select-wrapper">
                          <select
                            value={
                              dateRangeRadioValue === "invoiced" ? invoicedDateRange : dateRangeType
                            }
                            onChange={(e) => {
                              if (dateRangeRadioValue === "invoiced") {
                                setInvoicedDateRange(e.target.value);
                              } else {
                                setDateRangeType(e.target.value);
                              }
                            }}
                            className={`select-input ${isDarkMode ? "dark-mode" : ""}`}
                          >
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="last7days">Last 7 Days</option>
                            <option value="thismonth">This Month</option>
                            <option value="lastmonth">Last Month</option>
                            <option value="custom">Custom</option>
                          </select>
                        </div>

                        {/* Custom Date Range Picker */}
                        {((dateRangeRadioValue === "invoiced" && invoicedDateRange === "custom") ||
                          (dateRangeRadioValue === "departure" && dateRangeType === "custom")) && (
                          <div className="range-picker-wrapper">
                            <RangePicker
                              value={
                                dateRangeRadioValue === "invoiced"
                                  ? customInvoicedDateRange
                                  : customDateRange
                              }
                              onChange={(dates) => {
                                if (dateRangeRadioValue === "invoiced") {
                                  setCustomInvoicedDateRange(dates);
                                } else {
                                  setCustomDateRange(dates);
                                }
                              }}
                              className="custom-range-picker"
                              placeholder={["Start Date", "End Date"]}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Agency */}
                  {hasAgency && (
                    <div className={`condition-box ${isDarkMode ? "dark-mode" : "light-mode"}`}>
                      <Text className="condition-title">Select Agency</Text>
                      <Select
                        mode="multiple"
                        placeholder="Select agencies"
                        className="agency-select"
                        options={agencyOptions}
                        filterOption={(input, option) =>
                          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                        }
                        showSearch
                        allowClear
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        );

      default:
        return null;
    }
  };

  return (
    <div
    className="cls-report-page"
      style={{
        background: isDarkMode ? "#141414" : "#f5f5f5",
      }}
    >
      {/* Header */}
      <div className="cls-reportHeading">
        <div className="cls-head">
          <Title
            level={2} className="cls-report-title"
          >
            Create custom report
          </Title>
        </div>
        <Space className="cls-report-nav-buttons">
          <Button
            icon={<FileTextOutlined />}
            onClick={() => navigate("/saved-reports")}
            className="cls-nav-button"
          >
            Saved reports
          </Button>
          <Button
            icon={<UnorderedListOutlined />}
            onClick={() => navigate("/queued-reports")}
            className="cls-nav-button"
          >
            Queued reports
          </Button>
        </Space>
      </div>
      <div className="cls-report-container">
        {/* Left Sidebar - Report Types */}
        <div className="cls-report-sideBar">
          <Card className={`cls-report-types-card ${isDarkMode ? "cls-dark" : ""}`}>
            {reportTypes.map((type) => (
              <div
                key={type}
                className={`cls-report-type-item ${
                  reportType === type ? "cls-selected" : ""
                } ${isDarkMode ? "cls-dark" : ""}`}
                onClick={() => handleReportTypeChange(type)}
              >
                {type}
              </div>
            ))}
          </Card>
        </div>

        {/* Main Content */}
        <div className="cls-report-main">
          {/* Steps */}
          <Card className={`cls-steps-card ${isDarkMode ? "cls-dark" : ""}`}>
            <div className="cls-report-titles">
              {stepTitles.map((title, index) => (
                <div key={index} className="cls-step-item">
                  <div
                    className={`cls-step-circle ${
                      index <= currentStep ? "cls-active" : ""
                    }`}
                  >
                    {index + 1}
                  </div>
                  <Text
                    className={`cls-step-title ${
                      index === currentStep ? "cls-current" : ""
                    } ${isDarkMode ? "cls-dark" : ""}`}
                  >
                    {title}
                  </Text>
                  {index < stepTitles.length - 1 && (
                    <div
                      className={`cls-step-line ${
                        index < currentStep ? "cls-active" : ""
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {renderStepContent()}

            {/* Action Buttons */}
            <Divider />
            <div className="cls-action-buttons">
              <Button onClick={handleBack} disabled={currentStep === 0}>
                Back
              </Button>

              <Space>
                {currentStep === 2 ? (
                  <>
                    <Button
                      icon={<DownloadOutlined />}
                      onClick={handleDownload}
                      className="cls-download-btn"
                    >
                      Download
                    </Button>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={handleSaveReport}
                      className="cls-save-btn"
                    >
                      Save report
                    </Button>
                  </>
                ) : (
                  <Button
                    type="primary"
                    onClick={handleContinue}
                    disabled={!canContinue()}
                    className={`cls-continue-btn ${
                      canContinue() ? "cls-active" : "cls-disabled"
                    }`}
                  >
                    Continue
                  </Button>
                )}
              </Space>
            </div>
          </Card>
        </div>
      </div>

      {/* Save Report Modal */}
      <Modal
        title="Save Report"
        open={saveModalVisible}
        onOk={handleSaveModalOk}
        onCancel={() => setSaveModalVisible(false)}
        okText="Save"
        cancelText="Cancel"
        okButtonProps={{
          style: { background: "#5A4FCF", borderColor: "#5A4FCF" },
        }}
        styles={{
          header: { background: isDarkMode ? "#1f1f1f" : "#fff" },
          body: { background: isDarkMode ? "#1f1f1f" : "#fff" },
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="reportName"
            label="Report Name"
            rules={[{ required: true, message: "Please enter report name" }]}
          >
            <Input placeholder="Enter report name" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea
              placeholder="Enter description (optional)"
              rows={3}
            />
          </Form.Item>
          <Form.Item name="frequency" label="Schedule Frequency">
            <Radio.Group>
              <Radio value="once">One Time</Radio>
              <Radio value="daily">Daily</Radio>
              <Radio value="weekly">Weekly</Radio>
              <Radio value="monthly">Monthly</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Report;