export type Operator = "equals" | "contains" | "gt" | "lt";

export type LogicGate = "AND" | "OR";

export interface Rule {
  id: string; // Unique ID for React keys and deletion
  field: string;
  operator: Operator;
  value: string | number;
}