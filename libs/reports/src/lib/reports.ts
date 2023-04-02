export interface ReportSettings {
  id: string;
  name: string;
  attributes: string[];
  intervalMs: number;
  sendEmail: boolean;
}

export interface ReportData {
  id: string;
  name: string;
  attributes: {
    id: string;
    device: string;
    name: string;
  }[];
  intervalMs: number;
  sendEmail: boolean;
}

export interface AttributeData {
  device: string;
  attribute: string;
  min: number;
  max: number;
  avg: number;
  records: number;
}

export interface ReportPreviewData {
  attributes: AttributeData[];
}
