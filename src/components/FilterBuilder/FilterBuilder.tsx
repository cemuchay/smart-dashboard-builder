import type { Rule, LogicGate } from "../../types/filter";
import FilterRow from "./FilterRow";
import { Plus,} from "lucide-react";

interface FilterBuilderProps {
  rules: Rule[];
  logic: LogicGate;
  onChange: (rules: Rule[], logic: LogicGate) => void;
}

export default function FilterBuilder({ rules, logic, onChange }: FilterBuilderProps) {
  const addRule = () => {
    const newRule: Rule = {
      id: crypto.randomUUID(), // Standard browser API for unique IDs
      field: "name",
      operator: "contains",
      value: "",
    };
    onChange([...rules, newRule], logic);
  };

  const updateRule = (id: string, updates: Partial<Rule>) => {
    const newRules = rules.map((r) => (r.id === id ? { ...r, ...updates } : r));
    onChange(newRules, logic);
  };

  const deleteRule = (id: string) => {
    const newRules = rules.filter((r) => r.id !== id);
    onChange(newRules, logic);
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white p-1 border border-gray-200 rounded-lg">
          {(["AND", "OR"] as LogicGate[]).map((gate) => (
            <button
              key={gate}
              onClick={() => onChange(rules, gate)}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${logic === gate
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {gate}
            </button>
          ))}
        </div>

        <button
          onClick={addRule}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-blue-400 text-blue-600 rounded-lg text-sm font-semibold transition-all shadow-sm"
        >
          <Plus size={18} />
          <span>Add Rule</span>
        </button>
      </div>

      <div className="space-y-3">
        {rules.length === 0 ? (
          <p className="text-center py-4 text-sm text-gray-400 italic">
            No active filters. Showing all data.
          </p>
        ) : (
          rules.map((rule) => (
            <FilterRow
              key={rule.id}
              rule={rule}
              onUpdate={updateRule}
              onDelete={deleteRule}
            />
          ))
        )}
      </div>
    </div>
  );
}