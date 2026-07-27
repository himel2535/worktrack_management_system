"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, User, Settings, LogOut, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  DEMO_USERS,
  defaultRouteForRole,
  getRoleLabel,
  isDemoModeEnabled,
  sortDemoUsersByRole,
} from "@/lib/demoUsers";

interface UserMenuProps {
  theme?: "glass" | "light";
}

export function UserMenu({ theme = "glass" }: UserMenuProps) {
  const { user, logout, switchDemoUser } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [switchingEmail, setSwitchingEmail] = useState<string | null>(null);

  const isGlass = theme === "glass";
  const demoUsers = sortDemoUsersByRole(DEMO_USERS);
  const showDemoSwitch = isDemoModeEnabled();

  const handleSwitch = async (email: string, role: typeof DEMO_USERS[0]["role"]) => {
    if (!user || email.toLowerCase() === user.email.toLowerCase()) return;
    setSwitchingEmail(email);
    try {
      await switchDemoUser(email);
      setOpen(false);
      router.push(defaultRouteForRole(role));
    } catch {
      // login errors surface via api client
    } finally {
      setSwitchingEmail(null);
    }
  };

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    router.push("/login");
  };

  if (!user) return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-2 rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400/40",
          isGlass ? "hover:bg-white/10 px-1 py-1" : "hover:bg-slate-100 px-1 py-1"
        )}
      >
        <Avatar
          className={cn(
            "h-8 w-8 border-2 sm:h-9 sm:w-9",
            isGlass ? "border-white/20" : "border-white shadow-sm"
          )}
        >
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="hidden text-left sm:block">
          <p className={cn("text-sm font-medium", isGlass ? "text-white" : "text-slate-800")}>
            {user.name}
          </p>
          <p className={cn("text-xs capitalize", isGlass ? "text-white/50" : "text-slate-500")}>
            {user.designation || user.role}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "hidden h-4 w-4 sm:block",
            isGlass ? "text-white/40" : "text-slate-400",
            open && "rotate-180"
          )}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-80 border-white/10 bg-[#0F172A] p-0 text-white shadow-xl ring-1 ring-white/10"
      >
        <div className="border-b border-white/10 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-white/20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{user.name}</p>
              <p className="truncate text-xs text-white/50">{user.email}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
                  {getRoleLabel(user.role)}
                </span>
                {user.designation && (
                  <span className="text-[11px] text-white/45">{user.designation}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-1">
          <DropdownMenuItem
            className="cursor-pointer text-white/80 focus:bg-white/10 focus:text-white"
            onClick={() => {
              setOpen(false);
              router.push("/profile");
            }}
          >
            <User className="h-4 w-4 text-emerald-400" />
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-white/80 focus:bg-white/10 focus:text-white"
            onClick={() => {
              setOpen(false);
              router.push("/settings");
            }}
          >
            <Settings className="h-4 w-4 text-emerald-400" />
            Settings
          </DropdownMenuItem>
        </div>

        {showDemoSwitch && (
          <>
            <DropdownMenuSeparator className="bg-white/10" />
            <div className="px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                Switch user (demo)
              </p>
            </div>
            <div className="max-h-52 overflow-y-auto px-2 pb-2">
              {demoUsers.map((demoUser) => {
                const isActive = demoUser.email.toLowerCase() === user.email.toLowerCase();
                const isSwitching = switchingEmail === demoUser.email;
                return (
                  <button
                    key={demoUser.email}
                    type="button"
                    disabled={isActive || isSwitching}
                    onClick={() => handleSwitch(demoUser.email, demoUser.role)}
                    className={cn(
                      "demo-user-card mb-1 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors",
                      isActive && "is-active-user",
                      !isActive && !isSwitching && "hover:bg-white/8"
                    )}
                  >
                    <Avatar className="h-8 w-8 shrink-0 border border-white/10">
                      <AvatarImage src={demoUser.avatar} alt={demoUser.name} />
                      <AvatarFallback className="text-[10px]">
                        {demoUser.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-white">{demoUser.name}</p>
                      <p className="truncate text-[10px] text-white/45">
                        {getRoleLabel(demoUser.role)} · {demoUser.designation}
                      </p>
                    </div>
                    {isSwitching && (
                      <Loader2 className="h-4 w-4 shrink-0 animate-spin text-emerald-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}

        <DropdownMenuSeparator className="bg-white/10" />
        <div className="p-1">
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer focus:bg-red-500/10 focus:text-red-400"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
