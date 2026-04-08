import type { User } from "../../types/user";
import { DollarSign, Users, Activity, Target } from "lucide-react";

interface StatsBarProps {
  data: User[];
}

export default function StatsBar({ data }: StatsBarProps) {
  const totalSpend = data.reduce((acc, user) => acc + user.spend, 0);
  const avgAge = data.length > 0 
    ? Math.round(data.reduce((acc, user) => acc + user.age, 0) / data.length) 
    : 0;
  const activeCount = data.filter(u => u.status === 'active').length;
  const activePercentage = data.length > 0 
    ? Math.round((activeCount / data.length) * 100) 
    : 0;

  const stats = [
    { label: "Filtered Users", value: data.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Spend", value: `$${totalSpend.toLocaleString()}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
    { label: "Average Age", value: `${avgAge} yrs`, icon: Target, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Active Status", value: `${activePercentage}%`, icon: Activity, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className={`${stat.bg} p-3 rounded-lg`}>
            <stat.icon className={stat.color} size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}