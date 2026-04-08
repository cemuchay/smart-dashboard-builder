import type { User } from "../types/user";
import type { Rule, LogicGate } from "../types/filter";

/**
 * The core engine that handles multi-rule filtering
 */
export function applyFilters(
   data: User[],
   rules: Rule[],
   logic: LogicGate
): User[] {
   // If no rules are set, show everything
   if (rules.length === 0) return data;

   return data.filter((item) => {
      const results = rules.map((rule) => {
         const fieldValue = item[rule.field as keyof User];
         const filterValue = rule.value;

         // Handle null or undefined data gracefully
         if (fieldValue === undefined || fieldValue === null) return false;

         switch (rule.operator) {
            case "equals":
               return (
                  String(fieldValue).toLowerCase() ===
                  String(filterValue).toLowerCase()
               );

            case "contains":
               return String(fieldValue)
                  .toLowerCase()
                  .includes(String(filterValue).toLowerCase());

            case "gt":
               return Number(fieldValue) > Number(filterValue);

            case "lt":
               return Number(fieldValue) < Number(filterValue);

            default:
               return true;
         }
      });

      // Apply AND (all must be true) or OR (at least one must be true)
      return logic === "AND"
         ? results.every((res) => res === true)
         : results.some((res) => res === true);
   });
}
