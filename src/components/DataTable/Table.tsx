import type { User } from "../../types/user";


interface TableProps {
  data: User[];
}

export default function Table({ data }: TableProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <p className="text-gray-500 font-medium">No results match your filters.</p>
        <p className="text-sm text-gray-400">Try adjusting your rules to see more data.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Name</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Email</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Status</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Age</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Spend</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((user) => (
            <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
              <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
              <td className="px-6 py-4 text-gray-600">{user.email}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-600">{user.age}</td>
              <td className="px-6 py-4 text-gray-900 font-semibold">
                ${user.spend.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}