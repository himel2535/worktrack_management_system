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
      <div className="flex flex-col items-center justify-center panel-card py-20">
        <Settings className="mb-4 h-12 w-12 text-white/30" />
        <h3 className="text-lg font-semibold text-white/80">Settings Coming Soon</h3>
        <p className="mt-1 text-sm text-white/50">Account settings and preferences will be available here.</p>
      </div>
    </>
  );
}
