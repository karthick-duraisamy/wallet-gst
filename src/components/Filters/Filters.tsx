import React, { useState } from "react";
import { Select, DatePicker, Input } from "antd";
import '../../styles/Filters.scss';
import {cleanObject} from '../../Utils/commonFunctions'

const { Option } = Select;
const { RangePicker } = DatePicker;

export interface IField {
  key: string;
  type: "select" | "dateRange" | "input" | "dropdown" | "date";
  label: string;
  options?: { label: string; value: string; optionId?: number }[]; // only for select/dropdown
  defaultValue?: string;
  placeholder?: string;
  showButtons?: boolean;
  errorMsg?: string;          
}

interface IProps {
  fields: IField[];
  pathname: string;
  onChange: (values: Record<string, any>) => void;
  showButtons?: boolean;
  filterData?: 
  { 
    // page?: number | null,
    // page_size?: number | null,
    category?: string | null,
    status?: number | null; 
    type?: number | null;
    travelvendor?: number | null;
    start?:string | null;
    end?:string | null;
    airline?: number | null;
    typeId?: number | string | null;
    PNRno?:string | null;
    Ticketno?:string | null;
    InvoiceNo?:string | null;
    PNR?:string | null;
    travelMode?: number | null; 
  };
  setReconciliationData?: (data: any[]) => void;
  setCumulativeData?: (data: any[]) => void;
  category: string;
  onReset?: () => void; // <-- add this
  apiservice: (payload: any) => { unwrap: () =>Promise<any>};
}
const Filter: React.FC<IProps> = ({ fields, pathname, onChange, showButtons = false, filterData, setReconciliationData, setCumulativeData, onReset, category, apiservice}:IProps) => {
  const [submitAttempted, setSubmitAttempted] = useState(false);
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
    console.log(key,value);
    const updated = { ...values, [key]: value };
    setValues(updated);
    onChange(updated);
  };

  const isEmpty = (val: any) => {
    if (val === null || val === undefined || val === "" || val === "Select") {
      return true;
    }
  };


  const handleSubmit = async () => {
  setSubmitAttempted(true);
  try {
    let payloadFilter: Record<string, any> = {};

    if (pathname === "/reconciliation") {
      payloadFilter = {
        category: filterData?.category ?? null,
        status: filterData?.status ?? null,
        type: filterData?.type ?? null,
        travelvendor: filterData?.travelvendor ?? null,
        start: filterData?.start ?? null,
        end: filterData?.end ?? null,
        ...(category === "airline" && { airline: filterData?.airline ?? null }),
      };
    } else if (pathname === "/cumulative") {
      payloadFilter = {
        category: filterData?.category ?? null,
        typeId: filterData?.typeId ?? null,
        PNRno: filterData?.PNRno ?? null,
        Ticketno: filterData?.Ticketno ?? null,
        InvoiceNo: filterData?.InvoiceNo ?? null,
        PNR: filterData?.PNR ?? null,
        travelMode: filterData?.travelMode ?? null,
        start: filterData?.start ?? null,
        end: filterData?.end ?? null,
      };
    }

    console.log("Raw PayloadFilter:", payloadFilter);

    if (pathname === "/reconciliation") {
      //Keep validation here
      const hasEmptyRequired = Object.entries(payloadFilter).some(
        ([, value]) => isEmpty(value)
      );
      if (hasEmptyRequired) {
        console.warn("Some required fields are empty:", payloadFilter);
        return; // stop submission
      }
    }

    // Clean payload (remove null/empty/"Select") for both
    const payload = cleanObject(payloadFilter || {});
    console.log("Final Payload before API:", payload);

    const result = await apiservice(payload).unwrap();
    setReconciliationData?.(
      (result as any)?.response?.data?.results?.list_body ?? []
    );
    setCumulativeData?.(
      (result as any)?.response?.data?.results?.list_body ?? []
    );
  } catch (err) {
    console.error("Error in submit:", err);
  }
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
    onReset?.(); 
  };
  
  const renderField = (field: IField) => {
    switch (field.type) {
      case "select":
        return (
          <>
            <Select
              value={values[field.key]}
              className="cls-select-field"
              onChange={(val) => handleChange(field.key, val)}
            >
              {field.options?.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
            {/* Only show error if submit was attempted and field is empty */}
            {submitAttempted && isEmpty(values[field.key]) && field.errorMsg && (
              <div className="cls-error-msg">{field.errorMsg}</div>
            )}
          </>
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
          <>
            <RangePicker
              className="cls-dateRange-field"
              value={values[field.key] || null}
              onChange={(dates) => handleChange(field.key, dates)}
            />
            {submitAttempted && isEmpty(values[field.key]) && field.errorMsg && (
              <div className="cls-error-msg">{field.errorMsg}</div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  // Optional: filter fields based on pathname
  const visibleFields = fields.filter(() => {
    if (pathname.includes("reconciliation")) return true;
    return true;
  });

  return (
    <div
      className="cls-customFilter"
      style={{
        justifyContent: showButtons ? 'space-between' : 'flex-start',
      }}
    >
      <div className="cls-filters-cond">
        {visibleFields.map((field) => (
          <div
            key={field.key}
            className={`cls-field ${field.key}`}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {field.label && <label className="cls-label">{field.label}</label>}
            {renderField(field)}
          </div>
        ))}
      </div>

      {showButtons && (
        <div className="cls-btnItems">
          <button className="cls-submitBtn" onClick={handleSubmit}>
            Submit
          </button>
          <button className="cls-resetBtn" onClick={handleReset}>
            Reset All
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
