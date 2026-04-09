import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  Download, 
  Calendar, 
  ChevronRight, 
  FileSpreadsheet, 
  FileText, 
  ArrowUpRight,
  TrendingUp,
  History
} from "lucide-react";

export default function Reports() {
  // Report Categories
  const reportTypes = [
    { 
      title: "Sales Analytics", 
      desc: "Daily, weekly, and monthly revenue breakdown.", 
      icon: <BarChart3 size={22} />, 
      color: "bg-blue-50 text-blue-600" 
    },
    { 
      title: "Inventory Value", 
      desc: "Total value of current stock and asset holding.", 
      icon: <PieChart size={22} />, 
      color: "bg-teal-50 text-teal-600" 
    },
    { 
      title: "Expiry Forecast", 
      desc: "Predictive report of products expiring in 90 days.", 
      icon: <History size={22} />, 
      color: "bg-amber-50 text-amber-600" 
    },
    { 
      title: "Profit & Loss", 
      desc: "Compare income vs expenses for net margins.", 
      icon: <LineChart size={22} />, 
      color: "bg-emerald-50 text-emerald-600" 
    }
  ];

  const recentReports = [
    { name: "Monthly_Sales_March_2026.pdf", date: "01 Apr 2026", size: "2.4 MB", type: "PDF" },
    { name: "Inventory_Audit_Q1.xlsx", date: "31 Mar 2026", size: "1.1 MB", type: "Excel" },
    { name: "Tax_Compliance_Report.pdf", date: "15 Mar 2026", size: "850 KB", type: "PDF" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Business Reports</h1>
          {/* Use &apos; here to prevent the single quote from breaking the JSX parser */}
          <p className="text-sm text-slate-500">Generate and download detailed pharmacy&apos;s performance insights.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
          <button className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-all italic">
            Last 30 Days
          </button>
          <div className="w-px h-4 bg-slate-200"></div>
          <button className="px-4 py-2 text-xs font-bold text-teal-600 bg-teal-50 rounded-lg flex items-center gap-2">
            <Calendar size={14} /> Custom Range
          </button>
        </div>
      </div>

      {/* Main Report Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report, index) => (
          <button 
            key={index} 
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-teal-500 hover:shadow-md transition-all text-left flex items-start justify-between"
          >
            <div className="flex gap-4">
              <div className={`p-4 rounded-xl ${report.color} transition-colors group-hover:bg-teal-600 group-hover:text-white`}>
                {report.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{report.title}</h3>
                <p className="text-sm text-slate-500 max-w-[200px] mt-1">{report.desc}</p>
              </div>
            </div>
            <div className="text-slate-300 group-hover:text-teal-600 transition-colors pt-2">
              <ChevronRight size={20} />
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Performance Visualization Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={18} className="text-teal-600" />
              Year-to-Date Growth
            </h3>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Live Update</span>
          </div>
          <div className="p-8 space-y-6">
            <div className="flex justify-around text-center">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Gross Profit</p>
                <h4 className="text-3xl font-black text-slate-800 mt-1">KSh 4.2M</h4>
                <p className="text-xs font-bold text-emerald-500 mt-1 flex items-center justify-center gap-1">
                  <ArrowUpRight size={14} /> +18.4%
                </p>
              </div>
              <div className="w-px bg-slate-100"></div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Average Ticket</p>
                <h4 className="text-3xl font-black text-slate-800 mt-1">KSh 1,850</h4>
                <p className="text-xs font-bold text-emerald-500 mt-1 flex items-center justify-center gap-1">
                  <ArrowUpRight size={14} /> +5.2%
                </p>
              </div>
            </div>
            <div className="h-40 w-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center">
              <p className="text-slate-400 text-sm font-medium italic">Visualization Data Loading...</p>
            </div>
          </div>
        </div>

        {/* Recently Generated Downloads */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800">Generated Reports</h3>
          </div>
          <div className="p-4 flex-1 space-y-15 overflow-y-auto">
            {recentReports.map((file, index) => (
              <div key={index} className="group p-3 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${file.type === 'PDF' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {file.type === 'PDF' ? <FileText size={18} /> : <FileSpreadsheet size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 truncate w-32 md:w-full">{file.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{file.date} • {file.size}</p>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors">
                  <Download size={18} />
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-50 rounded-b-2xl border-t border-slate-100">
            <button className="w-full py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all uppercase tracking-widest">
              View All Archives
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}