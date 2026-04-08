import { useState, useEffect, useMemo, useCallback } from "react";
import { Filter, TableProperties, LayoutDashboard, Download, Loader2, RotateCw, Share2 } from "lucide-react";

// Components
import FilterBuilder from "./components/FilterBuilder/FilterBuilder";
import Table from "./components/DataTable/Table";
import StatsBar from "./components/DataTable/StatsBar";

// Utilities & Logic
import { applyFilters } from "./utils/filterEngine";
import { exportToCSV } from "./utils/export";
import { mockUsers } from "./data/mockData"; // Keeping this as a fallback

// Types
import type { User } from "./types/user";
import type { Rule, LogicGate } from "./types/filter";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Priority State Logic: URL > LocalStorage > Default
  const [rules, setRules] = useState<Rule[]>(() => {
    const params = new URLSearchParams(window.location.search);
    const urlRules = params.get("rules");
    if (urlRules) {
      try { return JSON.parse(atob(urlRules)); } catch { return []; }
    }
    const saved = localStorage.getItem("smart-dash-rules");
    return saved ? JSON.parse(saved) : [];
  });

  const [logic, setLogic] = useState<LogicGate>(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLogic = params.get("logic") as LogicGate;
    if (urlLogic === "AND" || urlLogic === "OR") return urlLogic;
    
    const savedLogic = localStorage.getItem("smart-dash-logic") as LogicGate;
    return (savedLogic === "AND" || savedLogic === "OR") ? savedLogic : "AND";
  });

  // 2. Data Fetching
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      
      const enrichedData: User[] = data.map((u: User) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        age: Math.floor(Math.random() * 40) + 20,
        spend: Math.floor(Math.random() * 5000) + 100,
        status: Math.random() > 0.3 ? "active" : "inactive",
      }));
      setUsers(enrichedData);
    } catch (error) {
      console.error("API Error, using fallback:", error);
      setUsers(mockUsers); // Fallback to our local data if API fails
    } finally {
      setTimeout(() => setLoading(false), 500); 
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // 3. Sync State back to URL and LocalStorage
  useEffect(() => {
    localStorage.setItem("smart-dash-rules", JSON.stringify(rules));
    localStorage.setItem("smart-dash-logic", logic);

    const params = new URLSearchParams();
    if (rules.length > 0) params.set("rules", btoa(JSON.stringify(rules)));
    params.set("logic", logic);
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl); // replaceState prevents bloating history
  }, [rules, logic]);

  const filteredData = useMemo(() => applyFilters(users, rules, logic), [users, rules, logic]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Shareable link copied!");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">

        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="flex items-center gap-3 text-4xl font-black text-gray-900 tracking-tight">
              <div className="p-2 bg-blue-600 rounded-lg shadow-blue-200 shadow-lg">
                <LayoutDashboard className="text-white" size={28} />
              </div>
              Smart Dashboard
            </h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={fetchData} disabled={loading} className="p-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-lg shadow-sm transition-all disabled:opacity-50">
              <RotateCw size={20} className={loading ? "animate-spin" : ""} />
            </button>

            <button onClick={copyLink} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-bold shadow-sm">
              <Share2 size={16} />
              Share
            </button>

            <button onClick={() => exportToCSV(filteredData)} disabled={filteredData.length === 0} className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-sm font-bold shadow-md transition-all disabled:opacity-50">
              <Download size={16} />
              Export
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="text-blue-600 animate-spin" size={48} />
            <p className="text-gray-400 font-medium">Syncing live data...</p>
          </div>
        ) : (
          <>
            <StatsBar data={filteredData} />
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                <Filter size={14} strokeWidth={3} className="text-blue-500" />
                Query Engine
              </div>
              <FilterBuilder rules={rules} logic={logic} onChange={(r, l) => { setRules(r); setLogic(l); }} />
            </section>
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                <TableProperties size={14} strokeWidth={3} className="text-blue-500" />
                Results ({filteredData.length})
              </div>
              <Table data={filteredData} />
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default App;