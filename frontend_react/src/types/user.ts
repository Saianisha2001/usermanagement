export type User = {
  id: number;
  name: string;
  email: string;
  location: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  roleName?: string;
  role?: string;
  createdBy?: number;
};
