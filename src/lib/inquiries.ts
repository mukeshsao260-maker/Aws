import * as XLSX from 'xlsx';

export const INQUIRIES_STORAGE_KEY = 'aws_contact_inquiries_list';

export interface InquiryPayload {
  name: string;
  email: string;
  topic?: string;
  message: string;
}

export interface StoredInquiryRecord {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  submittedAt: string;
  status: 'NEW' | 'IN_REVIEW' | 'RESOLVED';
}

// Default sample inquiry for immediate realistic preview if storage is empty
const DEFAULT_INITIAL_INQUIRIES: StoredInquiryRecord[] = [
  {
    id: 'INQ-2026-9041',
    name: 'Priya Verma',
    email: 'priya.verma@rungta.ac.in',
    topic: 'Workshop & Cloud Credentials',
    message: 'Will temporary AWS console credentials or credit vouchers be provided for personal laptops during the hands-on lab?',
    submittedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'NEW'
  },
  {
    id: 'INQ-2026-8812',
    name: 'Aman Dewangan',
    email: 'aman.d@csvtu.ac.in',
    topic: 'Transport & Campus Transit',
    message: 'Is there a scheduled shuttle service from Durg Junction station to Kurud Road campus in the morning?',
    submittedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: 'RESOLVED'
  }
];

// Retrieve all stored inquiries
export const getStoredInquiries = (): StoredInquiryRecord[] => {
  if (typeof window === 'undefined') return DEFAULT_INITIAL_INQUIRIES;
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(DEFAULT_INITIAL_INQUIRIES));
      return DEFAULT_INITIAL_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading stored inquiries:', err);
    return DEFAULT_INITIAL_INQUIRIES;
  }
};

// Save a new contact inquiry record
export const saveInquiryRecord = (data: InquiryPayload): StoredInquiryRecord => {
  const existing = getStoredInquiries();
  const id = `INQ-2026-${Date.now().toString().slice(-4)}`;
  const record: StoredInquiryRecord = {
    id,
    name: data.name.trim(),
    email: data.email.trim(),
    topic: data.topic?.trim() || 'General Event Inquiry',
    message: data.message.trim(),
    submittedAt: new Date().toISOString(),
    status: 'NEW'
  };

  const updated = [record, ...existing];
  try {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('new_inquiry_stored', { detail: record }));
      window.dispatchEvent(new Event('storage'));
    }
  } catch (e) {
    console.warn('Could not save inquiry to localStorage:', e);
  }

  return record;
};

// Update inquiry resolution status
export const updateInquiryStatus = (
  id: string,
  status: 'NEW' | 'IN_REVIEW' | 'RESOLVED'
): StoredInquiryRecord[] => {
  const existing = getStoredInquiries();
  const updated = existing.map((inq) => (inq.id === id ? { ...inq, status } : inq));
  try {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('new_inquiry_stored'));
    }
  } catch (e) {
    console.warn('Could not update inquiry status:', e);
  }
  return updated;
};

// Delete single inquiry record by ID
export const deleteStoredInquiry = (id: string): StoredInquiryRecord[] => {
  const existing = getStoredInquiries();
  const updated = existing.filter((inq) => inq.id !== id);
  try {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('new_inquiry_stored'));
    }
  } catch (e) {
    console.warn('Could not delete inquiry:', e);
  }
  return updated;
};

// Clear all stored inquiries
export const clearStoredInquiries = (): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(INQUIRIES_STORAGE_KEY);
      window.dispatchEvent(new Event('new_inquiry_stored'));
    } catch (e) {
      console.warn('Could not clear inquiries:', e);
    }
  }
};

// Export inquiries to Excel (.xlsx) file
export const exportInquiriesToExcel = (
  customRecords?: StoredInquiryRecord[],
  customFilename?: string
): boolean => {
  const records = customRecords && customRecords.length > 0 ? customRecords : getStoredInquiries();
  if (records.length === 0) return false;

  const sheetData = records.map((rec, index) => ({
    'S.No': index + 1,
    'Inquiry ID': rec.id,
    'Sender Name': rec.name,
    'Email Address': rec.email,
    'Topic / Subject': rec.topic,
    'Inquiry Message': rec.message,
    'Status': rec.status,
    'Submitted At (IST)': new Date(rec.submittedAt).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium'
    })
  }));

  const worksheet = XLSX.utils.json_to_sheet(sheetData);

  worksheet['!cols'] = [
    { wch: 6 },
    { wch: 16 },
    { wch: 22 },
    { wch: 28 },
    { wch: 26 },
    { wch: 45 },
    { wch: 14 },
    { wch: 22 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Contact Inquiries');

  const now = new Date();
  const dateStamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const filename = customFilename || `AWS_Community_Day_Contact_Inquiries_${dateStamp}.xlsx`;

  XLSX.writeFile(workbook, filename);
  return true;
};

// Export inquiries to CSV
export const exportInquiriesToCSV = (customRecords?: StoredInquiryRecord[]): boolean => {
  const records = customRecords && customRecords.length > 0 ? customRecords : getStoredInquiries();
  if (records.length === 0) return false;

  const headers = ['S.No', 'Inquiry ID', 'Sender Name', 'Email Address', 'Topic', 'Message', 'Status', 'Submitted At (IST)'];
  const rows = records.map((r, i) => [
    i + 1,
    `"${r.id}"`,
    `"${r.name.replace(/"/g, '""')}"`,
    `"${r.email.replace(/"/g, '""')}"`,
    `"${r.topic.replace(/"/g, '""')}"`,
    `"${r.message.replace(/"/g, '""')}"`,
    `"${r.status}"`,
    `"${new Date(r.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `AWS_Community_Day_Contact_Inquiries_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return true;
};
