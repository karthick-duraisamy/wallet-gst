import React, { createContext, useContext, useState, useEffect } from "react";
import { ConfigProvider, theme } from "antd";
import enUS from "antd/lib/locale/en_US";
import { Locale } from "antd/lib/locale-provider";

interface ThemeContextType {
  isDarkMode: boolean;
  language: "en" | "hi";
  menuLayout: "horizontal" | "vertical";
  toggleTheme: () => void;
  setLanguage: (lang: "en" | "hi") => void;
  setMenuLayout: (layout: "horizontal" | "vertical") => void;
  translate: (key: string) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Comprehensive translations object
const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    upload: "Upload",
    reconciliation: "Reconciliation",
    cumulative: "Cumulative",
    home: "Home",
    settings: "Settings",

    // User menu
    profile: "Profile",
    logout: "Logout",

    // Theme settings
    themeSettings: "Theme settings",
    theme: "Theme",
    default: "Default",
    dark: "Dark",
    sideMenu: "Side Menu",
    menuLayout: "Menu layout",

    // Common
    english: "English",
    hindi: "हिंदी",
    superadmin: "Superadmin",

    // Login
    login: "Login",
    email: "Email Address",
    password: "Password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",

    // Dashboard
    overallSummary: "Overall summary",
    recentFailures: "Recent failures",

    // Upload
    uploadFiles: "Upload Files",
    selectFiles: "Select Files",

    // Footer
    poweredBy: "@Powered by Infinitisoftware Solution.",

    // Menu Layout
    horizontal: "Horizontal",
    vertical: "Vertical",
    topHorizontal: "Top Horizontal",
    sideVertical: "Side Vertical",

    // Dashboard specific
    emailService: "Email",
    pushNotification: "Push Notification",
    whatsapp: "Whatsapp",
    total: "Total",
    sent: "Sent",
    queue: "Queue",
    notSent: "Not - Sent",
    aiMailAgent: "AI Mail Agent",
    totalMail: "Total mail",
    aiResponse: "AI Response",
    manual: "Manual",
    topSentNotifications: "Top sent notifications",
    recentFailures: "Recent failures",
    viewAllFailures: "View all failures",
    noDataAvailable: "No data available",
    invoiceStatus: "Invoice status",
    airlineWiseClaimable: "Airline wise claimable Amount(INR)",
    airlinesPendingFiles: "Airlines pending files to GST",
    thisMonth: "This month",
    lastMonth: "Last month",
    thisYear: "This year",

    // Upload specific
    clickDragFiles: "Click or drag files to this area to upload",
    uploadHint:
      "Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.",
    nonAYPBookings: "Non-AYP Bookings",
    gstr2A: "GSTR-2A",
    nonAYPInfo: "Upload Non-AYP bookings data for reconciliation",
    gstr2AInfo: "Upload GSTR-2A data for tax reconciliation",
    supportedFilesCSVXLS: "Supported files: CSV, XLS, XLSX",
    uploadLimit: "Max 3 files, 5MB each",
    dragDropFileHere: "Drag & drop file here",
    or: "or",
    selectFile: "Select File",
    sampleFile: "Sample File",
    uploadedFiles: "Uploaded Files",
    uploaded: "Uploaded",
    submit: "Submit",
    agency: "Agency",
    airline: "Airline",

    // Reconciliation specific
    reconciliationHistory: "Reconciliation history (Airline)",
    supplierName: "Supplier name",
    pnrTicketNumber: "PNR / Ticket no",
    invoiceNumber: "Invoice/Credit note no",
    invoiceDate: "Invoice date",
    type: "Type",
    taxClaimable: "Tax claimable",
    status: "Status",
    all: "All",
    new: "New",
    matched: "Matched",
    pendingToFile: "Pending to file",
    invoiceMissing: "Invoice missing",
    additionalInGSTR2A: "Additional in GSTR-2A",
    invoiceReceived: "Invoice received",
    startEndDate: "Start / End Date",
    travelVendor: "Travel Vendor",
    resetAll: "Reset All",
    goToPage: "Go to Page",
    go: "Go",
    displaying: "Displaying",
    outOf: "Out of",

    // Cumulative Invoice specific
    cumulativeInvoice: "Cumulative Invoice (Airline)",
    uploadPNRTicket: "Upload PNR / Ticket no",
    uploadInvoiceNo: "Upload Invoice no",
    pnrTicket: "PNR / Ticket no",
    showOnTaxInvoiceRange: "Show on Tax Invoice date range",
    uploadMultiplePNR: "Upload multiple PNR / Ticket no",
    uploadMultipleInvoice: "Upload multiple Invoice no",
    enterPNRTicket: "Enter PNR / Ticket no",
    airlines: "Airlines",
    placeOfSupply: "Place of supply",
    allStates: "All states",
    travelMode: "Travel mode",
    flight: "Flight",
    train: "Train",
    startEndDateRequired: "Start / end date *",
    startDate: "Start date",
    endDate: "End date",
    to: "to",
    taxInvoice: "Tax Invoice",
    creditNote: "Credit Note",
    debitNote: "Debit Note",
  },
  hi: {
    // Navigation
    dashboard: "डैशबोर्ड",
    upload: "अपलोड",
    reconciliation: "सुलह",
    cumulative: "संचयी",
    home: "होम",
    settings: "सेटिंग्स",

    // User menu
    profile: "प्रोफ़ाइल",
    logout: "लॉग आउट",

    // Theme settings
    themeSettings: "थीम सेटिंग्स",
    theme: "थीम",
    default: "डिफ़ॉल्ट",
    dark: "डार्क",
    sideMenu: "साइड मेन्यू",
    menuLayout: "मेन्यू लेआउट",

    // Common
    english: "English",
    hindi: "हिंदी",
    superadmin: "सुपरएडमिन",

    // Login
    login: "लॉगिन",
    email: "ईमेल पता",
    password: "पासवर्ड",
    rememberMe: "मुझे याद रखें",
    forgotPassword: "पासवर्ड भूल गए?",

    // Dashboard
    overallSummary: "समग्र सारांश",
    recentFailures: "हाल की असफलताएं",

    // Upload
    uploadFiles: "फ़ाइलें अपलोड करें",
    selectFiles: "फ़ाइलें चुनें",

    // Footer
    poweredBy: "@इन्फिनिटिसॉफ्टवेयर सोल्यूशन द्वारा संचालित।",

    // Menu Layout
    horizontal: "क्षैतिज",
    vertical: "खड़ा",
    topHorizontal: "शीर्ष क्षैतिज",
    sideVertical: "साइड वर्टिकल",

    // Dashboard specific
    emailService: "ईमेल",
    pushNotification: "पुश सूचना",
    whatsapp: "व्हाट्सएप",
    total: "कुल",
    sent: "भेजा गया",
    queue: "कतार",
    notSent: "नहीं भेजा गया",
    aiMailAgent: "एआई मेल एजेंट",
    totalMail: "कुल मेल",
    aiResponse: "एआई प्रतिक्रिया",
    manual: "मैनुअल",
    topSentNotifications: "शीर्ष भेजी गई सूचनाएं",
    recentFailures: "हाल की असफलताएं",
    viewAllFailures: "सभी असफलताएं देखें",
    noDataAvailable: "कोई डेटा उपलब्ध नहीं",
    invoiceStatus: "चालान स्थिति",
    airlineWiseClaimable: "एयरलाइन वार दावा योग्य राशि(INR)",
    airlinesPendingFiles: "एयरलाइनों की जीएसटी में लंबित फाइलें",
    thisMonth: "इस महीने",
    lastMonth: "पिछले महीने",
    thisYear: "इस साल",

    // Upload specific
    clickDragFiles:
      "अपलोड करने के लिए इस क्षेत्र में फ़ाइलों को क्लिक करें या खींचें",
    uploadHint:
      "एकल या बल्क अपलोड के लिए समर्थन। कंपनी डेटा या अन्य प्रतिबंधित फ़ाइलों को अपलोड करना सख्त वर्जित है।",
    nonAYPBookings: "गैर-AYP बुकिंग",
    gstr2A: "GSTR-2A",
    nonAYPInfo: "सुलह के लिए गैर-AYP बुकिंग डेटा अपलोड करें",
    gstr2AInfo: "कर सुलह के लिए GSTR-2A डेटा अपलोड करें",
    supportedFilesCSVXLS: "समर्थित फाइलें: CSV, XLS, XLSX",
    uploadLimit: "अधिकतम 3 फाइलें, प्रत्येक 5MB",
    dragDropFileHere: "फ़ाइल को यहाँ खींचें और छोड़ें",
    or: "या",
    selectFile: "फ़ाइल चुनें",
    sampleFile: "नमूना फ़ाइल",
    uploadedFiles: "अपलोड की गई फाइलें",
    uploaded: "अपलोड किया गया",
    submit: "जमा करें",
    agency: "एजेंसी",
    airline: "एयरलाइन",

    // Reconciliation specific
    reconciliationHistory: "सुलह इतिहास (एयरलाइन)",
    supplierName: "आपूर्तिकर्ता का नाम",
    pnrTicketNumber: "PNR / टिकट नंबर",
    invoiceNumber: "चालान/क्रेडिट नोट नंबर",
    invoiceDate: "चालान दिनांक",
    type: "प्रकार",
    taxClaimable: "कर दावा योग्य",
    status: "स्थिति",
    all: "सभी",
    new: "नया",
    matched: "मिलान",
    pendingToFile: "फाइल करने के लिए लंबित",
    invoiceMissing: "चालान गुम",
    additionalInGSTR2A: "GSTR-2A में अतिरिक्त",
    invoiceReceived: "चालान प्राप्त",
    startEndDate: "प्रारंभ / समाप्ति तिथि",
    travelVendor: "यात्रा विक्रेता",
    resetAll: "सभी रीसेट करें",
    goToPage: "पृष्ठ पर जाएं",
    go: "जाएं",
    displaying: "प्रदर्शित कर रहा है",
    outOf: "में से",

    // Cumulative Invoice specific
    cumulativeInvoice: "संचयी चालान (एयरलाइन)",
    uploadPNRTicket: "PNR / टिकट नंबर अपलोड करें",
    uploadInvoiceNo: "चालान नंबर अपलोड करें",
    pnrTicket: "PNR / टिकट नंबर",
    showOnTaxInvoiceRange: "कर चालान दिनांक सीमा पर दिखाएं",
    uploadMultiplePNR: "एकाधिक PNR / टिकट नंबर अपलोड करें",
    uploadMultipleInvoice: "एकाधिक चालान नंबर अपलोड करें",
    enterPNRTicket: "PNR / टिकट नंबर दर्ज करें",
    airlines: "एयरलाइनें",
    placeOfSupply: "आपूर्ति का स्थान",
    allStates: "सभी राज्य",
    travelMode: "यात्रा मोड",
    flight: "फ्लाइट",
    train: "ट्रेन",
    startEndDateRequired: "प्रारंभ / समाप्ति तिथि *",
    startDate: "प्रारंभ तिथि",
    endDate: "समाप्ति तिथि",
    to: "से",
    taxInvoice: "कर चालान",
    creditNote: "क्रेडिट नोट",
    debitNote: "डेबिट नोट",
  },
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguageState] = useState<"en" | "hi">("en");
  const [menuLayout, setMenuLayoutState] = useState<"horizontal" | "vertical">(
    "vertical",
  );

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("gst_theme");
    const savedLanguage = localStorage.getItem("gst_language");
    const savedMenuLayout = localStorage.getItem("gst_menu_layout");

    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }

    if (savedLanguage) {
      setLanguageState(savedLanguage as "en" | "hi");
    }

    if (savedMenuLayout) {
      setMenuLayoutState(savedMenuLayout as "horizontal" | "vertical");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("gst_theme", newTheme ? "dark" : "light");
  };

  const setLanguage = (lang: "en" | "hi") => {
    setLanguageState(lang);
    localStorage.setItem("gst_language", lang);
  };

  const setMenuLayout = (layout: "horizontal" | "vertical") => {
    setMenuLayoutState(layout);
    localStorage.setItem("gst_menu_layout", layout);
  };

  // Translation helper function
  const translate = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  const antdTheme = {
    token: {
      colorPrimary: "#6B46C1",
      colorSuccess: "#52c41a",
      colorWarning: "#faad14",
      colorError: "#ff4d4f",
      borderRadius: 8,
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      colorBgContainer: isDarkMode ? "#1f1f1f" : "#ffffff",
      colorBgElevated: isDarkMode ? "#262626" : "#ffffff",
      colorBgLayout: isDarkMode ? "#141414" : "#f5f5f5",
      colorText: isDarkMode ? "#ffffff" : "#000000",
      colorTextSecondary: isDarkMode ? "#a6a6a6" : "#666666",
      colorBorder: isDarkMode ? "#424242" : "#d9d9d9",
    },
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };

  // Simple locale mapping (in real app, you'd use proper i18n)
  const locale: Locale = enUS;

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        language,
        menuLayout,
        toggleTheme,
        setLanguage,
        setMenuLayout,
        translate,
      }}
    >
      <ConfigProvider theme={antdTheme} locale={locale}>
        <div className={isDarkMode ? "dark-theme" : "light-theme"}>
          {children}
        </div>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};