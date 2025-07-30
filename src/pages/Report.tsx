import React, { useState } from "react";
import {
  Card,
  Button,
  DatePicker,
  Checkbox,
  Modal,
  Input,
  Form,
  message,
  Row,
  Col,
  Space,
  Typography,
  Radio,
  Divider,
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

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const Report: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [reportType, setReportType] = useState("DSR");
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

  const reportTypes = ["DSR", "Ledger", "Commission", "Top-up", "Sales"];

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
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            padding: "0",
          }}
        >
          <Text
            strong
            style={{ color: isDarkMode ? "#fff" : "#1a1a1a", fontSize: "16px" }}
          >
            {categoryName}
          </Text>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
            onClick={() => handleSelectAllFields(categoryKey, fields)}
          >
            <Checkbox
              checked={allSelected}
              onChange={() => handleSelectAllFields(categoryKey, fields)}
              style={{
                transform: "scale(1.2)",
              }}
            />
            <Text
              style={{
                color: "#5A4FCF",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Select all
            </Text>
          </div>
        </div>
        <Row gutter={[12, 12]}>
          {fields.map((field) => (
            <Col span={8} key={field.key}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 0",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleFieldSelection(
                    categoryKey,
                    field.key,
                    !selectedFields[categoryKey].includes(field.key),
                  )
                }
              >
                <Checkbox
                  checked={selectedFields[categoryKey].includes(field.key)}
                  onChange={(e) =>
                    handleFieldSelection(
                      categoryKey,
                      field.key,
                      e.target.checked,
                    )
                  }
                  style={{
                    transform: "scale(1.2)",
                  }}
                />
                <Text
                  style={{
                    color: selectedFields[categoryKey].includes(field.key)
                      ? "#1a1a1a"
                      : isDarkMode
                        ? "#fff"
                        : "#1a1a1a",
                    fontSize: "14px",
                    fontWeight: selectedFields[categoryKey].includes(field.key)
                      ? "500"
                      : "400",
                    cursor: "pointer",
                  }}
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
          <div style={{ padding: "24px" }}>
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
          <div style={{ padding: "24px" }}>
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                  padding: "0",
                }}
              >
                <Text
                  strong
                  style={{
                    color: isDarkMode ? "#fff" : "#1a1a1a",
                    fontSize: "16px",
                  }}
                >
                  Condition Details
                </Text>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    availableConditions.forEach((condition) => {
                      handleConditionSelection(
                        condition.key,
                        !allConditionsSelected,
                      );
                    });
                  }}
                >
                  <Checkbox
                    checked={allConditionsSelected}
                    onChange={() => {
                      availableConditions.forEach((condition) => {
                        handleConditionSelection(
                          condition.key,
                          !allConditionsSelected,
                        );
                      });
                    }}
                  />
                  <Text
                    style={{
                      color: "#5A4FCF",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    Select all
                  </Text>
                </div>
              </div>
              <Row gutter={[16, 16]}>
                {availableConditions.map((condition) => (
                  <Col span={8} key={condition.key}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleConditionSelection(
                          condition.key,
                          !selectedConditions.includes(condition.key),
                        )
                      }
                    >
                      <Checkbox
                        checked={selectedConditions.includes(condition.key)}
                        onChange={(e) =>
                          handleConditionSelection(
                            condition.key,
                            e.target.checked,
                          )
                        }
                      />
                      <Text
                        style={{
                          color: selectedConditions.includes(condition.key)
                            ? "#1a1a1a"
                            : isDarkMode
                              ? "#fff"
                              : "#1a1a1a",
                          fontSize: "14px",
                          fontWeight: selectedConditions.includes(condition.key)
                            ? "500"
                            : "400",
                        }}
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

        return (
          <div style={{ padding: "24px" }}>
            {/* Selected Fields Section */}
            {hasSelectedFields && (
              <div style={{ marginBottom: "32px" }}>
                <Text
                  strong
                  style={{
                    color: isDarkMode ? "#fff" : "#1a1a1a",
                    fontSize: "16px",
                    display: "block",
                    marginBottom: "16px",
                  }}
                >
                  Selected fields
                </Text>

                {Object.entries(selectedFields).map(([category, fields]) => {
                  if (fields.length === 0) return null;

                  const categoryData =
                    reportData.reportFields[
                      reportType as keyof typeof reportData.reportFields
                    ];
                  const categoryFields =
                    categoryData?.[category as keyof typeof categoryData] || [];

                  return (
                    <div key={category} style={{ marginBottom: "16px" }}>
                      <Text
                        strong
                        style={{
                          color: isDarkMode ? "#fff" : "#1a1a1a",
                          fontSize: "16px",
                        }}
                      >
                        {categoryNames[category as keyof typeof categoryNames]}
                      </Text>
                      <div
                        style={{
                          marginTop: "8px",
                          color: isDarkMode ? "#a6a6a6" : "#666",
                          fontSize: "14px",
                        }}
                      >
                        {fields
                          .map((fieldKey) => {
                            const field = categoryFields.find(
                              (f: any) => f.key === fieldKey,
                            );
                            return field?.label;
                          })
                          .filter(Boolean)
                          .join(", ")}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Condition Details Section */}
            {(hasDateRange || hasAgency) && (
              <div style={{ marginBottom: "32px" }}>
                <Text
                  strong
                  style={{
                    color: isDarkMode ? "#fff" : "#1a1a1a",
                    fontSize: "16px",
                    display: "block",
                    marginBottom: "16px",
                  }}
                >
                  Condition Details
                </Text>

                <div style={{ marginBottom: "24px" }}>
                  <Radio.Group
                    value={dateRangeRadioValue}
                    onChange={(e) => setDateRangeRadioValue(e.target.value)}
                    style={{ width: "100%" }}
                  >
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Radio value="invoiced" style={{ fontSize: "14px" }}>
                          <Text
                            style={{
                              color: isDarkMode ? "#fff" : "#1a1a1a",
                              fontSize: "14px",
                              fontWeight:
                                dateRangeRadioValue === "invoiced"
                                  ? "500"
                                  : "400",
                            }}
                          >
                            Invoiced date range
                          </Text>
                        </Radio>
                      </Col>
                      <Col span={12}>
                        <Radio value="departure" style={{ fontSize: "14px" }}>
                          <Text
                            style={{
                              color: isDarkMode ? "#fff" : "#1a1a1a",
                              fontSize: "14px",
                              fontWeight:
                                dateRangeRadioValue === "departure"
                                  ? "500"
                                  : "400",
                            }}
                          >
                            Departure date range
                          </Text>
                        </Radio>
                      </Col>
                    </Row>
                  </Radio.Group>
                </div>

                {/* Date Range Selection */}
                {hasDateRange && (
                  <div style={{ marginBottom: "24px" }}>
                    <Text
                      strong
                      style={{
                        color: isDarkMode ? "#fff" : "#1a1a1a",
                        fontSize: "14px",
                        display: "block",
                        marginBottom: "12px",
                      }}
                    >
                      Select{" "}
                      {dateRangeRadioValue === "invoiced"
                        ? "Invoiced"
                        : "Departure"}{" "}
                      date range
                    </Text>

                    <div style={{ marginBottom: "16px", maxWidth: "300px" }}>
                      <select
                        value={
                          dateRangeRadioValue === "invoiced"
                            ? invoicedDateRange
                            : dateRangeType
                        }
                        onChange={(e) => {
                          if (dateRangeRadioValue === "invoiced") {
                            setInvoicedDateRange(e.target.value);
                          } else {
                            setDateRangeType(e.target.value);
                          }
                        }}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          border: "1px solid #d9d9d9",
                          borderRadius: "6px",
                          background: isDarkMode ? "#1f1f1f" : "#fff",
                          color: isDarkMode ? "#fff" : "#1a1a1a",
                          fontSize: "14px",
                        }}
                      >
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="last7days">Last 7 Days</option>
                        <option value="thismonth">This Month</option>
                        <option value="lastmonth">Last Month</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>

                    {/* Custom Date Range Picker - Appears when Custom is selected */}
                    {((dateRangeRadioValue === "invoiced" &&
                      invoicedDateRange === "custom") ||
                      (dateRangeRadioValue === "departure" &&
                        dateRangeType === "custom")) && (
                      <div style={{ marginTop: "16px", maxWidth: "300px" }}>
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
                          style={{ width: "100%" }}
                          placeholder={["Start Date", "End Date"]}
                        />
                      </div>
                    )}
                  </div>
                )}
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
      style={{
        background: isDarkMode ? "#141414" : "#f5f5f5",
        minHeight: "calc(100vh - 128px)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Title
            level={2}
            style={{ margin: 0, color: "#5A4FCF", fontSize: "24px" }}
          >
            Create custom report
          </Title>
        </div>
        <Space>
          <Button
            icon={<FileTextOutlined />}
            onClick={() => navigate("/saved-reports")}
          >
            Saved reports
          </Button>
          <Button
            icon={<UnorderedListOutlined />}
            onClick={() => navigate("/queued-reports")}
          >
            Queued reports
          </Button>
        </Space>
      </div>

      <div style={{ display: "flex", gap: "24px" }}>
        {/* Left Sidebar - Report Types */}
        <div
          style={{
            width: "200px",
            position: "sticky",
            top: "50px",
            height: "fit-content",
          }}
        >
          <Card
            style={{
              background: isDarkMode ? "#1f1f1f" : "#fff",
              padding: "8px",
            }}
          >
            {reportTypes.map((type, index) => (
              <div
                key={type}
                style={{
                  padding: "12px 16px",
                  marginBottom: "4px",
                  background: reportType === type ? "#5A4FCF" : "transparent",
                  color:
                    reportType === type
                      ? "#fff"
                      : isDarkMode
                        ? "#fff"
                        : "#1a1a1a",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: reportType === type ? "500" : "400",
                  fontSize: "14px",
                  transition: "all 0.2s ease",
                }}
                onClick={() => setReportType(type)}
              >
                {type}
              </div>
            ))}
          </Card>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {/* Steps */}
          <Card
            style={{
              background: isDarkMode ? "#1f1f1f" : "#fff",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "32px",
              }}
            >
              {stepTitles.map((title, index) => (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: index <= currentStep ? "#5A4FCF" : "#f0f0f0",
                      color: index <= currentStep ? "#fff" : "#999",
                      marginRight: "12px",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {index + 1}
                  </div>
                  <Text
                    style={{
                      color:
                        index === currentStep
                          ? "#1a1a1a"
                          : isDarkMode
                            ? "#fff"
                            : "#1a1a1a",
                      fontWeight: index === currentStep ? "500" : "400",
                      marginRight: index < stepTitles.length - 1 ? "32px" : "0",
                    }}
                  >
                    {title}
                  </Text>
                  {index < stepTitles.length - 1 && (
                    <div
                      style={{
                        width: "40px",
                        height: "2px",
                        background: index < currentStep ? "#5A4FCF" : "#f0f0f0",
                        margin: "0 24px",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {renderStepContent()}

            {/* Action Buttons */}
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                gap: "15px",
                alignItems: "center",
              }}
            >
              <Button onClick={handleBack} disabled={currentStep === 0}>
                Back
              </Button>

              <Space>
                {currentStep === 2 ? (
                  <>
                    <Button
                      icon={<DownloadOutlined />}
                      onClick={handleDownload}
                      style={{
                        background: "#52c41a",
                        borderColor: "#52c41a",
                        color: "#fff",
                      }}
                    >
                      Download
                    </Button>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={handleSaveReport}
                      style={{ background: "#5A4FCF", borderColor: "#5A4FCF" }}
                    >
                      Save report
                    </Button>
                  </>
                ) : (
                  <Button
                    type="primary"
                    onClick={handleContinue}
                    disabled={!canContinue()}
                    style={{
                      background: canContinue() ? "#5A4FCF" : "#d9d9d9",
                      borderColor: canContinue() ? "#5A4FCF" : "#d9d9d9",
                      cursor: canContinue() ? "pointer" : "not-allowed",
                    }}
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
