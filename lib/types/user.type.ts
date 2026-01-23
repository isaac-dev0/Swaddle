import { Role } from "@/lib/enums/role.enum";

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  organisation: string;
  job_role: string;
  role: Role;
  is_active?: boolean;
  last_login?: Date;
  is_onboarded: boolean;
  created_at?: Date;
  updated_at?: Date;
};
