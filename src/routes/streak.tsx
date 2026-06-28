import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Flame, Trophy, Calendar, ChevronLeft, ChevronRight, Share2, Crown, Dumbbell, Zap, Award, Clock, ArrowLeft, X } from "lucide-react";

const weeks: (number | null)[][] = [
  [29, 30, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 1, 2],
];
const active = new Set([1, 2, 3, 4, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24]);
const otherMonth = new Set<string>(["0-0", "0-1", "4-5", "4-6"]);

const badges = [
  { icon: Flame, label: "On Fire!", sub: "10 day streak", color: "text-primary", border: "border-primary", active: true },
  { icon: Crown, label: "Consistent", sub: "7 day streak", color: "text-yellow-400", border: "border-yellow-400/60" },
  { icon: Dumbbell, label: "Dedicated", sub: "30 day streak", color: "text-yellow-300", border: "border-yellow-300/40" },
  { icon: Zap, label: "Unstoppable", sub: "60 day streak", color: "text-muted-foreground", border: "border-border" },
  { icon: Trophy, label: "Legend", sub: "100 day streak", color: "text-muted-foreground", border: "border-border" },
];

const insightBars = [40, 55, 70, 60, 90, 35, 50];

function StreakPage() {
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-5">
        <Link to="/profile" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} /> Back
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">Your Streak <Flame className="text-primary" fill="currentColor" size={24} /></h1>
            <p className="text-muted-foreground text-sm mt-1">Keep showing up. You're building something great! <span className="text-primary">🔥</span></p>
          </div>
          <button className="border border-primary text-primary rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Share2 size={14} /> Share Streak
          </button>
        </div>

        {/* Current streak hero */}
        <div className="panel p-6 bg-gradient-to-br from-primary/10 to-transparent">
          <div className="flex flex-wrap items-center gap-8">
            <div className="relative w-40 h-40 grid place-items-center">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="var(--border)" strokeWidth="5" />
                <circle cx="50" cy="50" r="44" fill="none" stroke="var(--primary)" strokeWidth="5" strokeDasharray="276" strokeDashoffset="60" strokeLinecap="round" />
              </svg>
              <div className="text-center">
                <Flame className="mx-auto text-primary" fill="currentColor" size={28} />
                <div className="text-4xl font-bold mt-1">12</div>
                <div className="text-xs text-muted-foreground">days</div>
              </div>
            </div>
            <div className="flex-1 min-w-[240px]">
              <h2 className="text-primary text-xl font-bold">Current Streak</h2>
              <p className="text-sm text-muted-foreground mt-1">You're on fire! Keep it going! 🔥</p>
              <div className="grid grid-cols-3 gap-4 mt-5">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Trophy size={14} className="text-yellow-400" /> Best Streak</div>
                  <div className="text-2xl font-bold mt-1">15</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar size={14} className="text-primary" /> Best Month</div>
                  <div className="text-2xl font-bold mt-1">May 2024</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Flame size={14} className="text-primary" /> Total Days</div>
                  <div className="text-2xl font-bold mt-1">37</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h3 className="font-semibold">May 2024</h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-primary" /> Active Day</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full border border-border" /> Missed Day</span>
              <button className="w-7 h-7 rounded-full bg-muted grid place-items-center"><ChevronLeft size={14} /></button>
              <button className="w-7 h-7 rounded-full bg-muted grid place-items-center"><ChevronRight size={14} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground mb-2">
            {["MON","TUE","WED","THU","FRI","SAT","SUN"].map(d => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weeks.flatMap((row, wi) =>
              row.map((d, di) => {
                const isOther = otherMonth.has(`${wi}-${di}`);
                const isActive = !isOther && d != null && active.has(d);
                return (
                  <div key={`${wi}-${di}`} className="aspect-square grid place-items-center">
                    <div className={`w-full h-full max-w-12 max-h-12 rounded-full grid place-items-center text-sm font-medium ${
                      isOther ? "text-muted-foreground/40" :
                      isActive ? "bg-primary text-white shadow-glow" : "border border-border text-muted-foreground"
                    }`}>{d}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Insights + Stats */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="panel p-5">
            <h3 className="font-semibold mb-3">Streak Insights</h3>
            <div className="flex items-end justify-between gap-2 h-32">
              {insightBars.map((h, i) => (
                <div key={i} className="flex-1 bg-primary/80 rounded-t-md" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="grid grid-cols-7 text-center text-xs text-muted-foreground mt-2">
              {["M","T","W","T","F","S","S"].map((d, i) => <div key={i}>{d}</div>)}
            </div>
            <p className="text-sm mt-3">You're most active on <span className="text-primary font-semibold">Fridays!</span></p>
            <p className="text-xs text-muted-foreground">Keep it up and beat your record! 💪</p>
          </div>

          <div className="panel p-5">
            <h3 className="font-semibold mb-4">Streak Stats</h3>
            <div className="space-y-3.5 text-sm">
              {[
                { icon: Flame, label: "Total Active Days", val: "37" },
                { icon: Flame, label: "Current Streak", val: "12 days", hi: true },
                { icon: Flame, label: "Best Streak", val: "15 days" },
                { icon: Calendar, label: "Longest Month", val: "May 2024" },
                { icon: Clock, label: "Last Active", val: "Today" },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <Icon size={16} className="text-primary" />
                    <span className="flex-1 text-muted-foreground">{s.label}</span>
                    <span className={`font-semibold ${s.hi ? "text-primary" : ""}`}>{s.val}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Streak Badges */}
        <div className="panel p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Streak Badges</h3>
            <button className="text-xs text-primary font-medium">View All</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {badges.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="text-center">
                  <div className={`relative w-20 h-20 mx-auto`}>
                    <div className={`absolute inset-0 ${b.active ? "bg-primary/15" : "bg-muted/40"}`}
                      style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
                    <div className={`absolute inset-[2px] border-2 ${b.border}`}
                      style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
                    <Icon size={28} className={`absolute inset-0 m-auto ${b.color}`} fill={b.active ? "currentColor" : "none"} />
                  </div>
                  <div className={`text-sm font-semibold mt-2 ${b.active ? "text-primary" : ""}`}>{b.label}</div>
                  <div className="text-xs text-muted-foreground">{b.sub}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pro tip */}
        <div className="panel p-4 flex items-center gap-4 bg-gradient-to-r from-primary/10 to-transparent">
          <div className="w-10 h-10 rounded-full bg-primary/20 text-primary grid place-items-center shrink-0">
            <Trophy size={18} />
          </div>
          <div className="flex-1">
            <div className="text-primary font-semibold text-sm">Pro Tip</div>
            <div className="text-xs text-muted-foreground">Stay consistent, engage with your community and post regularly to keep your streak alive!</div>
          </div>
          <button className="text-muted-foreground"><X size={16} /></button>
        </div>
      </div>
    </AppLayout>
  );
}

export const Route = createFileRoute("/streak")({ component: StreakPage });
