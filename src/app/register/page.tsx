"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Timer, Mail, Lock, Loader2, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PasswordInput } from "@/components/ui/password-input";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState<{ _id: string; name: string }[]>([]);
  const [departmentsLoading, setDepartmentsLoading] = useState(true);
  const [departmentsError, setDepartmentsError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/departments")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load departments");
        const data: { _id: string; name: string }[] = await res.json();
        setDepartments(
          data.map((d) => ({
            _id: String(d._id),
            name: d.name,
          }))
        );
      })
      .catch(() => {
        setDepartments([]);
        setDepartmentsError("Could not load departments. You can register without one.");
      })
      .finally(() => setDepartmentsLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await register(
        name,
        email,
        password,
        designation || undefined,
        departmentId || undefined
      );
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
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
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="mt-1 text-white/50">Join WorkTrack as an employee</p>
        </div>

        <form onSubmit={handleSubmit} className="panel-card space-y-4 border border-white/10 bg-[#0F172A] p-6">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/70">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white"
                placeholder="Your name"
                required
              />
            </div>
          </div>

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
            <label className="text-xs font-medium text-white/70">Designation (optional)</label>
            <Input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="bg-white/5 border-white/10 text-white"
              placeholder="e.g. UI/UX Designer"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/70">Department (optional)</label>
            <Select
              value={departmentId || null}
              onValueChange={(value) => setDepartmentId(value ?? "")}
              items={departments.map((d) => ({ value: d._id, label: d.name }))}
            >
              <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
                <SelectValue placeholder={departmentsLoading ? "Loading departments..." : "Select department"} />
              </SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d._id} value={d._id}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!departmentsLoading && departmentsError && (
              <p className="text-xs text-amber-400/80">{departmentsError}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/70">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-white/40" />
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white"
                placeholder="At least 6 characters"
                minLength={6}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/70">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-white/40" />
              <PasswordInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white"
                placeholder="Repeat password"
                minLength={6}
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
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
          </Button>

          <p className="text-center text-sm text-white/50">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-emerald-400 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
