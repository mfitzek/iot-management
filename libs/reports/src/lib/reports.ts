export interface ReportSettings {
  id: string;
  name: string;
  attributes: string[];
  intervalMs: number;
  sendEmail: boolean;
}
