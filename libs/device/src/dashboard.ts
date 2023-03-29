import { Warning } from './warning';

export interface DashboardCountStats {
  devices: number;
  attributes: number;
  records: number;
  warnings: number;
}

export interface DeviceDashboardData {
  stats: DashboardCountStats;
  warnings: Warning[];
}
