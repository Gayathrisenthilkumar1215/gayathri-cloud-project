
export interface CloudFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: string;
}

export enum Page {
  LOGIN = 'login',
  DASHBOARD = 'dashboard',
  UPLOAD = 'upload'
}
