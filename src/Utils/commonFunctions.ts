import * as XLSX from "xlsx";

// Download CSV file function
export const downloadCSV = (apiResponse: any, filename = "data.csv") => {
    const results = apiResponse?.response?.data?.results;

    if (!results) {
        console.warn("No results found in API response");
        return;
    }

    const headers: string[] = results.list_header?.list_header?.map((h: any) => h.headerName) || [];
    const templates: string[] = results.list_header?.list_header?.map((h: any) => h.template) || [];
    const list: any[] = results.list_body || [];

    const rows = list.map((row) => 
    templates.map((template) => {
        const value = template === "date" ? row["invoice_date"] : row[template];
        return JSON.stringify(value ?? "");
    }).join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Download XLSX file function
export const downloadXLS = (apiResponse: any, filename = "data.xlsx") => {
  const results = apiResponse?.response?.data?.results;

  if (!results) {
    console.warn("No results found in API response");
    return;
  }

  const headers: string[] = results.list_header?.list_header?.map((h: any) => h.headerName) || [];
  const templates: string[] = results.list_header?.list_header?.map((h: any) => h.template) || [];
  const list: any[] = results.list_body || [];

  if (!headers.length || !list.length) {
    console.warn("No headers or list data found");
    return;
  }

  // Convert list_body into a table format with headers
  const data = list.map((row) =>
    templates.map((template) => {
      return template === "date" ? row["invoice_date"] ?? "" : row[template] ?? "";
    })
  );

  // Add headers as first row
  const worksheetData = [headers, ...data];

  // Create worksheet & workbook
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Export as XLSX
  XLSX.writeFile(workbook, filename);
};

// clean the undefined, null or empty object
export const cleanObject = <T extends Record<string, any>>(obj: T): Partial<T> => {
  const cleaned: Partial<T> = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && value !== "Select") {
      cleaned[key as keyof T] = value;
    }
  });
  return cleaned;
};
