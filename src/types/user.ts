export interface User {
  id: number;
  name: string;
  age: number;
  status: "active" | "inactive";
  spend: number;
  email: string;
}