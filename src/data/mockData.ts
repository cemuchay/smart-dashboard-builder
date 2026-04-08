import type { User } from "../types/user";

export const mockUsers: User[] = [
  { id: 1, name: "John Doe", age: 28, status: "active", spend: 1200, email: "john@example.com" },
  { id: 2, name: "Jane Smith", age: 34, status: "inactive", spend: 450, email: "jane@example.com" },
  { id: 3, name: "Mike Ross", age: 22, status: "active", spend: 890, email: "mike@example.com" },
  { id: 4, name: "Rachel Zane", age: 29, status: "active", spend: 2100, email: "rachel@example.com" },
  { id: 5, name: "Harvey Specter", age: 45, status: "inactive", spend: 5000, email: "harvey@example.com" },
  { id: 6, name: "Louis Litt", age: 42, status: "active", spend: 150, email: "louis@example.com" },
];