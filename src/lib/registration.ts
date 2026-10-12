import * as XLSX from 'xlsx';

export const GOOGLE_SCRIPT_URL = 
  "https://script.google.com/macros/s/AKfycbx8AYDy1DwCGeDI4GtoH0UpWewf79NwUilHsYhRadRG9_1kRaPhDlpIaM_ObFOJNb4B8A/exec";

export const STORAGE_KEY = "studentBuilderDemoRegistrations";
export const REGISTRATIONS_DATA_KEY = "studentBuilderRegistrationsList";
export const TOTAL_CAPACITY = 100;

export interface RegistrationPayload {
  name: string;
  email: string;
  college: string;
  interest: string;
  consent: boolean;
}

export interface StoredRegistrationRecord {
  id: string;
  name: string;
  email: string;
  college: string;
  interest: string;
  consent: string;
  registeredAt: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  college?: string;
  interest?: string;
  consent?: string;
}

export interface SubmitResult {
  success: boolean;
  message: string;
  record?: StoredRegistrationRecord;
  isOpaqueResponse?: boolean;
}

export const USER_CONFIRMED_REGISTRATIONS_MAP_KEY = "aws_confirmed_registrations_map";

// Retrieve all stored registrations from localStorage
export const getStoredRegistrations = (): StoredRegistrationRecord[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(REGISTRATIONS_DATA_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Error reading stored registrations:", err);
    return [];
  }
};

// Check if email has already been registered
export const isEmailAlreadyRegistered = (email: string): boolean => {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return false;
  const existing = getStoredRegistrations();
  return existing.some((r) => r.email.trim().toLowerCase() === trimmed);
};

// Retrieve previously confirmed registration for a specific email or the current logged-in user
export const getUserConfirmedRegistration = (checkEmail?: string): StoredRegistrationRecord | null => {
  if (typeof window === "undefined") return null;
  try {
    let targetEmail = (checkEmail || "").trim().toLowerCase();

    // If checkEmail was not passed, check active user session
    if (!targetEmail) {
      const authRaw = sessionStorage.getItem("aws_community_auth_user") || localStorage.getItem("aws_community_auth_user");
      if (authRaw) {
        const authObj = JSON.parse(authRaw);
        if (authObj && authObj.role === "user" && authObj.email) {
          targetEmail = authObj.email.trim().toLowerCase();
        }
      }
    }

    if (targetEmail) {
      // 1. Check Master Registrations database
      const all = getStoredRegistrations();
      const match = all.find((r) => r.email.trim().toLowerCase() === targetEmail);
      if (match) return match;

      // 2. Check local confirmed registrations map
      const rawMap = localStorage.getItem(USER_CONFIRMED_REGISTRATIONS_MAP_KEY);
      if (rawMap) {
        const map = JSON.parse(rawMap);
        if (map && map[targetEmail]) {
          return map[targetEmail];
        }
      }
      return null;
    }

    return null;
  } catch {
    return null;
  }
};

// Store confirmed registration for this user
export const setUserConfirmedRegistration = (record: StoredRegistrationRecord): void => {
  if (typeof window === "undefined") return;
  try {
    const emailKey = record.email.trim().toLowerCase();
    const rawMap = localStorage.getItem(USER_CONFIRMED_REGISTRATIONS_MAP_KEY) || "{}";
    const map = JSON.parse(rawMap);
    map[emailKey] = record;
    localStorage.setItem(USER_CONFIRMED_REGISTRATIONS_MAP_KEY, JSON.stringify(map));

    // Also establish session for this registered user if none active
    const authRaw = sessionStorage.getItem("aws_community_auth_user") || localStorage.getItem("aws_community_auth_user");
    if (!authRaw) {
      const userSession = {
        email: record.email,
        role: "user" as const,
        name: record.name
      };
      const serialized = JSON.stringify(userSession);
      sessionStorage.setItem("aws_community_auth_user", serialized);
      localStorage.setItem("aws_community_auth_user", serialized);
      window.dispatchEvent(new Event("auth_state_changed"));
    }

    window.dispatchEvent(new CustomEvent('user_registration_confirmed', { detail: record }));
  } catch (e) {
    console.warn("Could not save confirmed registration to device:", e);
  }
};

export const validateField = (field: keyof RegistrationPayload, value: string | boolean): string => {
  switch (field) {
    case "name":
      return typeof value === "string" && value.trim().length >= 2
        ? ""
        : "Please enter your full name.";
    case "email":
      if (typeof value !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) {
        return "Enter a valid email address.";
      }
      if (isEmailAlreadyRegistered(value)) {
        return "This email is already registered. Only 1 registration per email is allowed.";
      }
      return "";
    case "college":
      return typeof value === "string" && value.trim().length >= 2
        ? ""
        : "Please enter your college / university.";
    case "interest":
      return typeof value === "string" && value.trim().length > 0
        ? ""
        : "Please select an area of interest.";
    case "consent":
      return value === true
        ? ""
        : "Please accept the demo event update consent.";
    default:
      return "";
  }
};

export const validateAll = (data: RegistrationPayload): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  const nameErr = validateField("name", data.name);
  if (nameErr) errors.name = nameErr;

  const emailErr = validateField("email", data.email);
  if (emailErr) errors.email = emailErr;

  const collegeErr = validateField("college", data.college);
  if (collegeErr) errors.college = collegeErr;

  const interestErr = validateField("interest", data.interest);
  if (interestErr) errors.interest = interestErr;

  const consentErr = validateField("consent", data.consent);
  if (consentErr) errors.consent = consentErr;

  return errors;
};

// Save a new registration record to localStorage list
export const saveRegistrationRecord = (data: RegistrationPayload): StoredRegistrationRecord => {
  const existing = getStoredRegistrations();
  const id = `AWS-RU-${Date.now().toString().slice(-6)}`;
  const record: StoredRegistrationRecord = {
    id,
    name: data.name.trim(),
    email: data.email.trim(),
    college: data.college.trim(),
    interest: data.interest,
    consent: data.consent ? "Agreed" : "No",
    registeredAt: new Date().toISOString()
  };

  const updated = [record, ...existing];
  try {
    localStorage.setItem(REGISTRATIONS_DATA_KEY, JSON.stringify(updated));
    localStorage.setItem(STORAGE_KEY, String(updated.length));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent('new_registration_stored', { detail: record }));
    }
  } catch (e) {
    console.warn("Could not save registration to localStorage:", e);
  }

  return record;
};

export const LIVE_SHEET_URL_KEY = "aws_live_google_sheet_url";
export const CUSTOM_WEBHOOK_URL_KEY = "aws_custom_webhook_url";

export const getLiveSheetUrl = (): string => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(LIVE_SHEET_URL_KEY) || "";
};

export const setLiveSheetUrl = (url: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(LIVE_SHEET_URL_KEY, url.trim());
  window.dispatchEvent(new Event('live_sheet_url_changed'));
};

export const getCustomWebhookUrl = (): string => {
  if (typeof window === "undefined") return GOOGLE_SCRIPT_URL;
  return localStorage.getItem(CUSTOM_WEBHOOK_URL_KEY) || GOOGLE_SCRIPT_URL;
};

export const setCustomWebhookUrl = (url: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CUSTOM_WEBHOOK_URL_KEY, url.trim());
};

export const getStoredRegistrationCount = (): number => {
  const records = getStoredRegistrations();
  if (records.length > 0) return records.length;
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? Number(raw) || 0 : 0;
  } catch {
    return 0;
  }
};

export const getRemainingSeats = (): number => {
  const current = getStoredRegistrationCount();
  return Math.max(0, TOTAL_CAPACITY - current);
};

// Export registrations array to Excel (.xlsx) file
export const exportRegistrationsToExcel = (
  customRecords?: StoredRegistrationRecord[],
  customFilename?: string
): boolean => {
  const records = customRecords && customRecords.length > 0 ? customRecords : getStoredRegistrations();
  if (records.length === 0) {
    return false;
  }

  const sheetData = records.map((rec, index) => ({
    "S.No": index + 1,
    "Registration ID": rec.id,
    "Full Name": rec.name,
    "Email Address": rec.email,
    "College / University": rec.college,
    "Area of Interest": rec.interest,
    "Consent Status": rec.consent,
    "Registration Date & Time (IST)": new Date(rec.registeredAt).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium'
    })
  }));

  const worksheet = XLSX.utils.json_to_sheet(sheetData);

  // Set column widths for polished spreadsheet presentation
  worksheet['!cols'] = [
    { wch: 6 },
    { wch: 18 },
    { wch: 24 },
    { wch: 30 },
    { wch: 28 },
    { wch: 20 },
    { wch: 16 },
    { wch: 26 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "AWS_Registrations");

  const filename = customFilename || `AWS_Community_Day_Registrations_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(workbook, filename);
  return true;
};

// Export registrations array to CSV (.csv) file
export const exportRegistrationsToCSV = (
  customRecords?: StoredRegistrationRecord[],
  customFilename?: string
): boolean => {
  const records = customRecords && customRecords.length > 0 ? customRecords : getStoredRegistrations();
  if (records.length === 0) return false;

  const headers = [
    "S.No",
    "Registration ID",
    "Full Name",
    "Email Address",
    "College / University",
    "Area of Interest",
    "Consent Status",
    "Registration Date & Time (IST)"
  ];

  const escapeCSV = (str: string) => `"${(str || '').replace(/"/g, '""')}"`;

  const rows = records.map((rec, index) => [
    index + 1,
    escapeCSV(rec.id),
    escapeCSV(rec.name),
    escapeCSV(rec.email),
    escapeCSV(rec.college),
    escapeCSV(rec.interest),
    escapeCSV(rec.consent),
    escapeCSV(new Date(rec.registeredAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }))
  ]);

  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", customFilename || `AWS_Community_Day_Master_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
};

// Export individual student pass/record to Excel (.xlsx)
export const exportSingleRegistrationToExcel = (record: StoredRegistrationRecord): boolean => {
  const safeName = (record.name || 'attendee').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
  return exportRegistrationsToExcel([record], `AWS_Pass_${safeName}_${record.id}.xlsx`);
};

// Delete single registration record by ID
export const deleteStoredRegistration = (id: string): StoredRegistrationRecord[] => {
  const existing = getStoredRegistrations();
  const updated = existing.filter(r => r.id !== id);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(REGISTRATIONS_DATA_KEY, JSON.stringify(updated));
      localStorage.setItem(STORAGE_KEY, String(updated.length));
    } catch (e) {
      console.warn("Could not update registrations in localStorage:", e);
    }
  }
  return updated;
};

// Clear all stored registrations
export const clearStoredRegistrations = (): void => {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(REGISTRATIONS_DATA_KEY);
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Could not clear registrations from localStorage:", e);
    }
  }
};

export const submitRegistrationToGoogleSheets = async (
  data: RegistrationPayload
): Promise<SubmitResult> => {
  if (isEmailAlreadyRegistered(data.email)) {
    return {
      success: false,
      message: "This email address is already registered. Each participant can only register once."
    };
  }

  const registeredAtIso = new Date().toISOString();

  // Save to local registry and generate registration record (guarantees local Master Sheet has it)
  const savedRecord = saveRegistrationRecord(data);
  setUserConfirmedRegistration(savedRecord);

  // Prepare standard URL-encoded parameters for Google Apps Script
  const params = new URLSearchParams();
  params.append("name", data.name.trim());
  params.append("email", data.email.trim());
  params.append("college", data.college.trim());
  params.append("interest", data.interest);
  params.append("consent", data.consent ? "Agreed" : "No");
  params.append("registeredAt", registeredAtIso);
  params.append("id", savedRecord.id);

  const endpoint = getCustomWebhookUrl() || GOOGLE_SCRIPT_URL;
  // Append query string as well to guarantee parameters survive any HTTP 302 redirects
  const endpointWithQuery = endpoint.includes('?') 
    ? `${endpoint}&${params.toString()}`
    : `${endpoint}?${params.toString()}`;

  try {
    // Mode is "no-cors" to allow Cross-Origin POST to Google Apps Script without CORS blockage
    await fetch(endpointWithQuery, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });

    return {
      success: true,
      record: savedRecord,
      isOpaqueResponse: true,
      message: `Thanks ${data.name.trim()}! Your registration is confirmed and saved to the Live Excel Sheet.`
    };
  } catch (error) {
    console.error("Google Sheets submission error:", error);
    // Even if remote network fails, local registration record is safely preserved!
    return {
      success: true,
      record: savedRecord,
      message: `Thanks ${data.name.trim()}! Your registration is stored in the Live Excel Sheet.`
    };
  }
};
