"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Timer, Mail, Lock, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B1120] p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30">
            <Timer className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">WorkTrack</h1>
          <p className="mt-1 text-white/50">Work Smart, Every Hour.</p>
        </div>

        <form onSubmit={handleSubmit} className="panel-card space-y-4 border border-white/10 bg-[#0F172A] p-6">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/70">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white"
                placeholder="you@worktrack.com"
                required
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/70">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-white/40" />
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
          </Button>

          <p className="text-center text-sm text-white/50">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-emerald-400 hover:underline">
              Create an account
            </Link>
          </p>

          <div className="border-t border-white/10 pt-4 text-xs text-white/40 space-y-1">
            <p>Demo accounts (password: password123):</p>
            <p>Admin: admin@worktrack.com</p>
            <p>Manager: manager.dev@worktrack.com</p>
            <p>Employee: himel@worktrack.com</p>
          </div>
        </form>
      </div>
    </div>
  );
}
