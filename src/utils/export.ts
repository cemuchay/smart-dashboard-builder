import type { User } from "../types/user";

export function exportToCSV(data: User[], filename: string = "dashboard-export.csv") {
  if (data.length === 0) return;

  // 1. Define headers
  const headers = ["Name", "Email", "Status", "Age", "Spend"];
  
  // 2. Map data to rows
  const rows = data.map(user => [
    user.name,
    user.email,
    user.status,
    user.age,
    user.spend
  ]);

  // 3. Combine into a single string
  const csvContent = [
    headers.join(","), 
    ...rows.map(row => row.join(","))
  ].join("\n");

  // 4. Create a blob and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}