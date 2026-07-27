"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { apiFetch } from "@/lib/api/client";
import { Trophy, Medal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Ranking {
  userId: string; name: string; avatar?: string; points: number;
}

interface DeptLeaderboard {
  department: string; slug: string; rankings: Ranking[];
}

export default function LeaderboardPage() {
  const [data, setData] = useState<DeptLeaderboard[]>([]);
  useEffect(() => { apiFetch<DeptLeaderboard[]>("/leaderboard").then(setData).catch(console.error); }, []);

  const medalColor = ["text-yellow-400", "text-gray-300", "text-amber-600"];

  return (
    <div className="page-stack">
      <PageHeader title="Leaderboard" subtitle="Weekly points ranking by department" showClock />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {data.map((dept) => (
          <div key={dept.slug} className="panel-card">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-emerald-400" />
              <h3 className="font-semibold text-white">{dept.department}</h3>
            </div>
            <div className="space-y-3">
              {dept.rankings.slice(0, 5).map((r, i) => (
                <div key={r.userId} className="flex items-center gap-3">
                  <span className={`w-6 text-center font-bold ${medalColor[i] || "text-white/40"}`}>
                    {i < 3 ? <Medal className="h-5 w-5 mx-auto" /> : i + 1}
                  </span>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={r.avatar} />
                    <AvatarFallback>{r.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="flex-1 text-sm text-white">{r.name}</span>
                  <span className="text-sm font-bold text-emerald-400">+{r.points}</span>
                </div>
              ))}
              {dept.rankings.length === 0 && <p className="text-white/50 text-sm">No data yet</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
