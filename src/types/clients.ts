export type ClientsInterface = {
  created_at: string;
  email: string;
  external_id: string;
  name: string;
  role: "coach" | "client";
  user_id: string;
  username: string;
} | null;
