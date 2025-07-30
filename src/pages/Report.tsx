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
  Steps,
  Radio,
  Divider,
} from "antd";
import {
  CalendarOutlined,
  DownloadOutlined,
  SaveOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import reportData from "../data/reportData.json";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Step } = Steps;

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

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDownload = () => {
    message.success("Report downloaded successfully!");
  };

  const handleSaveReport = () => {
    setSaveModalVisible(true);
  };

  const handleSaveModalOk = () => {
    form.validateFields().then((values) => {
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
        const allConditionsSelected = reportData.conditionDetails.every(
          (condition) => selectedConditions.includes(condition.key),
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
                    reportData.conditionDetails.forEach((condition) => {
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
                      reportData.conditionDetails.forEach((condition) => {
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
                {reportData.conditionDetails.map((condition) => (
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
        return (
          <div style={{ padding: "24px" }}>
            <div style={{ marginBottom: "24px" }}>
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
                        fontSize: "14px",
                      }}
                    >
                      Selected{" "}
                      {category.replace(/([A-Z])/g, " $1").toLowerCase()}
                    </Text>
                    <div
                      style={{
                        marginTop: "8px",
                        color: isDarkMode ? "#a6a6a6" : "#666",
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

              <div style={{ marginTop: "24px" }}>
                <Text
                  strong
                  style={{
                    color: isDarkMode ? "#fff" : "#1a1a1a",
                    fontSize: "14px",
                  }}
                >
                  Selected condition details
                </Text>
                <div
                  style={{
                    marginTop: "8px",
                    color: isDarkMode ? "#a6a6a6" : "#666",
                  }}
                >
                  {selectedConditions
                    .map((conditionKey) => {
                      const condition = reportData.conditionDetails.find(
                        (c) => c.key === conditionKey,
                      );
                      return condition?.label;
                    })
                    .filter(Boolean)
                    .join(", ")}
                </div>
              </div>
            </div>

            <div style={{ marginTop: "32px" }}>
              <Text
                strong
                style={{
                  color: isDarkMode ? "#fff" : "#1a1a1a",
                  fontSize: "16px",
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                Selected conditions
              </Text>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div
                    style={{
                      padding: "16px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      background: isDarkMode ? "#1f1f1f" : "#fff",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          background: "#5A4FCF",
                        }}
                      />
                      <Text
                        style={{
                          color: isDarkMode ? "#fff" : "#1a1a1a",
                          fontWeight: "500",
                        }}
                      >
                        Invoiced date range
                      </Text>
                    </div>
                    <Text
                      style={{
                        color: isDarkMode ? "#a6a6a6" : "#666",
                        fontSize: "12px",
                      }}
                    >
                      Select invoiced date range
                    </Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    style={{
                      padding: "16px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      background: isDarkMode ? "#1f1f1f" : "#fff",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          background: "#fff",
                          border: "1px solid #d9d9d9",
                        }}
                      />
                      <Text
                        style={{
                          color: isDarkMode ? "#fff" : "#1a1a1a",
                          fontWeight: "500",
                        }}
                      >
                        Departure date range
                      </Text>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
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
          <Title level={2} style={{ margin: 0, color: "#5A4FCF" }}>
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
            width: "295px",
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
                  textAlign: "center",
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
                gap: '15px',
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
                    style={{ background: "#5A4FCF", borderColor: "#5A4FCF" }}
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