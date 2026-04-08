import type { Rule, Operator } from "../../types/filter";
import { Trash2 } from "lucide-react";

interface FilterRowProps {
  rule: Rule;
  onUpdate: (id: string, updates: Partial<Rule>) => void;
  onDelete: (id: string) => void;
}

const FIELDS = ["name", "age", "status", "spend"];
const OPERATORS: Operator[] = ["equals", "contains", "gt", "lt"];

export default function FilterRow({ rule, onUpdate, onDelete }: FilterRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm group">
      {/* Field Select */}
      <select
        value={rule.field}
        onChange={(e) => onUpdate(rule.id, { field: e.target.value })}
        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none capitalize"
      >
        {FIELDS.map((f) => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>

      {/* Operator Select */}
      <select
        value={rule.operator}
        onChange={(e) => onUpdate(rule.id, { operator: e.target.value as Operator })}
        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      >
        {OPERATORS.map((op) => (
          <option key={op} value={op}>{op}</option>
        ))}
      </select>

      {/* Value Input */}
      <input
        type="text"
        value={rule.value}
        placeholder="Value..."
        onChange={(e) => onUpdate(rule.id, { value: e.target.value })}
        className="flex-1 min-w-[150px] px-3 py-2 border bg-white text-black border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {/* Delete Button */}
      <button
        onClick={() => onDelete(rule.id)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
        title="Delete Rule"
      >
     <Trash2 size={18} />
      </button>
    </div>
  );
}