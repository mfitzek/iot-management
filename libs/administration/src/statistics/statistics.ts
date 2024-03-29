export type Statistics = {
  users: number;
  devices: number;
  records: number;
  currentSizeMB: number;
  maxSizeMB: number;
  cache: {
    cacheWrites: number;
    databaseWrites: number;
  };
};
