import React, { useState } from "react";
import { Select, DatePicker, Input } from "antd";
// import dayjs from "dayjs";

const { Option } = Select;
const { RangePicker } = DatePicker;

export interface IField {
  key: string;
  type: "select" | "dateRange" | "input" | "dropdown" | "date";
  label: string;
  options?: { label: string; value: string }[]; // only for select/dropdown
  defaultValue?: string;
  placeholder?: string;
  showButtons: Boolean
}

interface IProps {
  fields: IField[];
  pathname: string;
  onChange: (values: Record<string, any>) => void;
}

const Filter: React.FC<IProps> = ({ fields, pathname, onChange }) => {
  const [values, setValues] = useState<Record<string, any>>({});

  const handleChange = (key: string, value: any) => {
    const updated = { ...values, [key]: value };
    setValues(updated);
    onChange(updated);
  };

  const renderField = (field: IField) => {
    switch (field.type) {
      case "select":
        return (
          <Select
            defaultValue={field.defaultValue}
            style={{ width: 120 }}
            onChange={(val) => handleChange(field.key, val)}
          >
            {field.options?.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        );

      case "input":
        return (
          <Input
            placeholder={field.placeholder}
            style={{ width: 120 }}
            onChange={(e) => handleChange(field.key, e.target.value)}
          />
        );

      case "date":
        return (
          <DatePicker
            style={{ width: 120 }}
            onChange={(date) => handleChange(field.key, date)}
          />
        );

      case "dateRange":
        return (
          <RangePicker
            style={{ width: 200 }}
            onChange={(dates) => handleChange(field.key, dates)}
          />
        );

      default:
        return null;
    }
  };

  // Optional: filter fields based on pathname
  const visibleFields = fields.filter((f) => {
    if (pathname.includes("reconciliation")) return true; // example
    return true;
  });

  // Determine if any field has showButtons set to true
  const showButtons = fields.some((field) => field.showButtons);
  // console.log(showButtons, fields);
  

  return (
    <div  className="cls-customFilter" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "end", 
    justifyContent: 'space-between'}}>
        <div  style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "end" }}>
            {visibleFields.map((field) => (
                <div key={field.key} style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: 4 }}>{field.label}</label>
                {renderField(field)}
                </div>
            ))}
        </div>
        {/* {showButtons && ( */}
            {/* <div  style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "end" }}>
                <Button type="primary" onClick={() => console.log(values)}>
                    Submit
                </Button>
                <Button onClick={() => console.log(values)}>
                    Reset All
                </Button>
            </div> */}
        {/* )} */}
    </div>
  );
};

export default Filter;
