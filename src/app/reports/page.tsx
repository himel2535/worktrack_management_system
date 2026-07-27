"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiDownload } from "@/lib/api/client";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { useState } from "react";

export default function ReportsPage() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [loading, setLoading] = useState("");

  const download = async (type: string, format: string, filename: string) => {
    setLoading(type + format);
    try {
      await apiDownload(`/reports/${type}?month=${month}&format=${format}`, filename);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="page-stack">
      <PageHeader title="Reports & Export" subtitle="Download attendance, performance and task reports" showClock />
      <div className="panel-card max-w-md">
        <label className="text-xs text-white/70">Report Month</label>
        <Input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="mt-1 bg-white/5 border-white/10 text-white" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { title: "Attendance Report", type: "attendance", formats: [{ f: "xlsx", icon: FileSpreadsheet, label: "Excel" }, { f: "pdf", icon: FileText, label: "PDF" }] },
          { title: "Performance Report", type: "performance", formats: [{ f: "xlsx", icon: FileSpreadsheet, label: "Excel" }] },
          { title: "Task Progress", type: "tasks", formats: [{ f: "xlsx", icon: FileSpreadsheet, label: "Excel" }] },
        ].map((report) => (
          <div key={report.type} className="panel-card">
            <h3 className="font-semibold text-white mb-3">{report.title}</h3>
            <div className="flex gap-2">
              {report.formats.map(({ f, icon: Icon, label }) => (
                <Button key={f} variant="glass" size="sm" disabled={!!loading}
                  onClick={() => download(report.type, f, `${report.type}-${month}.${f}`)}>
                  <Icon className="h-4 w-4 mr-1" />
                  {loading === report.type + f ? "..." : label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
