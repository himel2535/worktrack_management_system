import { PageHeader } from "@/components/layout/PageHeader";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences."
        showClock
      />
      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-white py-20 shadow-sm">
        <Settings className="mb-4 h-12 w-12 text-slate-300" />
        <h3 className="text-lg font-semibold text-slate-700">Settings Coming Soon</h3>
        <p className="mt-1 text-sm text-slate-500">Account settings and preferences will be available here.</p>
      </div>
    </>
  );
}
