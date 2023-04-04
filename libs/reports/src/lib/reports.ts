export interface ReportSettings {
  name: string;
  attributes: string[];
  intervalMs: number;
  sendEmail: boolean;
}

export interface ReportDataAttribute {
  id: string;
  device: string;
  name: string;
}
export interface ReportData {
  id: string;
  name: string;
  attributes: ReportDataAttribute[];
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
