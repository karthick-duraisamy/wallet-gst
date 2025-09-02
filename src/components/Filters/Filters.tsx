import React, { useState } from "react";
import { Select, DatePicker, Input } from "antd";
// import dayjs from "dayjs";
import '../../styles/Filters.scss'
const { Option } = Select;
const { RangePicker } = DatePicker;


export interface IField {
  key: string;
  type: "select" | "dateRange" | "input" | "dropdown" | "date";
  label: string;
  options?: { label: string; value: string }[]; // only for select/dropdown
  defaultValue?: string;
  placeholder?: string;
  showButtons?: boolean;
}

interface IProps {
  fields: IField[];
  pathname: string;
  onChange: (values: Record<string, any>) => void;
  showButtons?: boolean;
}

const Filter: React.FC<IProps> = ({ fields, pathname, onChange, showButtons = false }) => {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const initialValues: Record<string, any> = {};
    fields.forEach(field => {
      if (field.defaultValue) {
        initialValues[field.key] = field.defaultValue;
      }
    });
    return initialValues;
  });

  const handleChange = (key: string, value: any) => {
    const updated = { ...values, [key]: value };
    setValues(updated);
    onChange(updated);
  };

  const handleReset = () => {
    const resetValues: Record<string, any> = {};
    fields.forEach(field => {
      if (field.defaultValue) {
        resetValues[field.key] = field.defaultValue;
      }
    });
    setValues(resetValues);
    onChange(resetValues);
  };

  const renderField = (field: IField) => {
    switch (field.type) {
      case "select":
        return (
          <Select
            value={values[field.key] || field.defaultValue}
            className="cls-select-field"
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
            className="cls-input-field"
            value={values[field.key] || ''}
            onChange={(e) => handleChange(field.key, e.target.value)}
          />
        );

      case "date":
        return (
          <DatePicker
            className="cls-date-field"
            value={values[field.key]}
            onChange={(date) => handleChange(field.key, date)}
          />
        );

      case "dateRange":
        return (
          <RangePicker
            className="cls-dateRange-field"
            value={values[field.key]}
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

  return (
    <div className="cls-customFilter" style={{ 
      justifyContent: showButtons ? 'space-between' : 'flex-start',
    }}>
      <div className="cls-filters-cond" >
        {visibleFields.map((field) => (
          <div key={field.key} className={field.key} style={{ display: "flex", flexDirection: "column" }}>
            {field.label && <label className="cls-label">{field.label}</label>}
            {renderField(field)}
          </div>
        ))}
      </div>
      {showButtons && (
        <div className="cls-btnItems">
          <button className="cls-submitBtn"
            onClick={() => console.log('Submit:', values)}
          >
            Submit
          </button>
          <button className="cls-resetBtn"
            onClick={handleReset}
          >
            Reset All
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
