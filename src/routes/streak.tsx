import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useFitStreakStore } from "@/lib/store";
import {
  Flame,
  Trophy,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Share2,
  Crown,
  Dumbbell,
  Zap,
  Award,
  Clock,
  ArrowLeft,
  Snowflake,
  ShieldCheck,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/streak")({
  head: () => ({ meta: [{ title: "Streak Hub — FitStreak" }] }),
  component: StreakPage,
});

const weeks: (number | null)[][] = [
  [29, 30, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 1, 2],
];
const otherMonth = new Set<string>(["0-0", "0-1", "4-5", "4-6"]);

function StreakPage() {
  const { streak, user, activateStreakFreeze } = useFitStreakStore();

  const badges = [
    {
      icon: Flame,
      label: "Ignition",
      sub: "3 day streak",
      color: "text-orange-400",
      threshold: 3,
      unlocked: streak.currentStreak >= 3,
    },
    {
      icon: Crown,
      label: "Consistent",
      sub: "7 day streak",
      color: "text-yellow-400",
      threshold: 7,
      unlocked: streak.currentStreak >= 7,
    },
    {
      icon: Flame,
      label: "On Fire!",
      sub: "10 day streak",
      color: "text-primary",
      threshold: 10,
      unlocked: streak.currentStreak >= 10,
    },
    {
      icon: Dumbbell,
      label: "Dedicated",
      sub: "30 day streak",
      color: "text-emerald-400",
      threshold: 30,
      unlocked: streak.currentStreak >= 30,
    },
    {
      icon: Zap,
      label: "Unstoppable",
      sub: "60 day streak",
      color: "text-cyan-400",
      threshold: 60,
      unlocked: streak.currentStreak >= 60,
    },
    {
      icon: Trophy,
      label: "Style Legend",
      sub: "100 day streak",
      color: "text-purple-400",
      threshold: 100,
      unlocked: streak.currentStreak >= 100,
    },
  ];

  const insightBars = [40, 55, 70, 60, 90, 85, streak.hasPostedToday ? 95 : 30];

  const handleShare = () => {
    const text = `🔥 FitStreak Check: I'm currently on a ${streak.currentStreak}-day outfit streak on FitStreak! Follow my streetwear journey: fitstreak.style/@${user.username}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success("Streak card copied to clipboard! Share it with friends 🔥");
    } else {
      toast.info(`Your streak is ${streak.currentStreak} days!`);
    }
  };

  const handleFreeze = () => {
    if (streak.freezesAvailable <= 0) {
      toast.error("You don't have any streak freeze tokens left.");
      return;
    }
    const ok = activateStreakFreeze();
    if (ok) {
      toast.success("Streak Freeze activated for today! Your streak is protected ❄️");
    }
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <Link
          to="/profile"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} /> Back to Profile
        </Link>

        {/* Title & Share CTA */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Streak Hub <Flame className="text-primary" fill="currentColor" size={26} />
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Timezone: <span className="text-foreground font-medium">{streak.timezone}</span> •
              Protect and grow your flame.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleFreeze}
              disabled={streak.freezesAvailable <= 0}
              className="border border-cyan-500/50 bg-cyan-950/20 text-cyan-400 hover:bg-cyan-900/30 rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2 transition disabled:opacity-40"
            >
              <Snowflake size={15} /> Freeze ({streak.freezesAvailable})
            </button>
            <button
              onClick={handleShare}
              className="btn-pink rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2"
            >
              <Share2 size={15} /> Share Streak
            </button>
          </div>
        </div>

        {/* Current Streak Hero */}
        <div className="panel p-6 bg-gradient-to-br from-primary/15 via-panel to-panel border-primary/30">
          <div className="flex flex-wrap items-center gap-8">
            <div className="relative w-40 h-40 grid place-items-center">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="var(--border)" strokeWidth="6" />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="6"
                  strokeDasharray="276"
                  strokeDashoffset={Math.max(20, 276 - (streak.currentStreak / 30) * 256)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-center">
                <Flame className="mx-auto text-primary" fill="currentColor" size={32} />
                <div className="text-4xl font-extrabold mt-1">{streak.currentStreak}</div>
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                  days
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-[240px]">
              <div className="flex items-center gap-2">
                <h2 className="text-primary text-2xl font-bold">Current Active Streak</h2>
                {streak.hasPostedToday ? (
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    <Check size={12} /> Logged today
                  </span>
                ) : (
                  <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                    Pending outfit today
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                You're building an unstoppable fashion routine. Post daily before midnight to
                maintain your badge multiplier! 🔥
              </p>

              <div className="grid grid-cols-3 gap-4 mt-5">
                <div className="panel p-3 bg-background/50">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Trophy size={14} className="text-yellow-400" /> Best Streak
                  </div>
                  <div className="text-2xl font-bold mt-1 text-foreground">
                    {streak.longestStreak} days
                  </div>
                </div>
                <div className="panel p-3 bg-background/50">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar size={14} className="text-primary" /> Total Outfits
                  </div>
                  <div className="text-2xl font-bold mt-1 text-foreground">
                    {streak.totalOutfits} fits
                  </div>
                </div>
                <div className="panel p-3 bg-background/50">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Snowflake size={14} className="text-cyan-400" /> Freezes Left
                  </div>
                  <div className="text-2xl font-bold mt-1 text-foreground">
                    {streak.freezesAvailable} tokens
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Badges */}
        <div className="panel p-5">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Award className="text-primary" size={20} /> Milestone Badges
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {badges.map((b) => (
              <div
                key={b.label}
                className={`panel p-4 text-center rounded-2xl transition border ${
                  b.unlocked
                    ? "border-primary/50 bg-primary/5 shadow-glow"
                    : "border-border/50 opacity-40 grayscale"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl mx-auto grid place-items-center mb-2.5 ${
                    b.unlocked ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <b.icon size={22} fill="currentColor" />
                </div>
                <div className="font-bold text-xs truncate text-foreground">{b.label}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{b.sub}</div>
                <div className="mt-2 text-[10px] font-semibold text-primary">
                  {b.unlocked ? "✓ Unlocked" : `Need ${b.threshold}d`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Activity Grid */}
        <div className="panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold text-base">Monthly Activity Calendar</h3>
              <p className="text-xs text-muted-foreground">October 2026</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-primary" /> Active Day
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-cyan-400" /> Frozen Day
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full border border-border" /> Missed
              </span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-muted-foreground mb-2">
            {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weeks.flatMap((row, wi) =>
              row.map((d, di) => {
                const isOther = otherMonth.has(`${wi}-${di}`);
                const dateKey = `2026-10-${String(d).padStart(2, "0")}`;
                const status = !isOther && d != null ? streak.history[dateKey] : null;
                const isFrozen = status === "frozen" || (!isOther && d === 10);
                const isActive =
                  status === "posted" || (!isOther && d != null && d <= 16 && d !== 10);

                return (
                  <div key={`${wi}-${di}`} className="aspect-square grid place-items-center">
                    <div
                      className={`w-full h-full max-w-11 max-h-11 rounded-full grid place-items-center text-xs font-bold transition ${
                        isOther
                          ? "text-muted-foreground/30"
                          : isFrozen
                            ? "bg-cyan-500 text-black shadow-md"
                            : isActive
                              ? "bg-primary text-white shadow-glow"
                              : "border border-border text-muted-foreground"
                      }`}
                    >
                      {d}
                    </div>
                  </div>
                );
              }),
            )}
          </div>
        </div>

        {/* Streak Insights */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="panel p-5">
            <h3 className="font-semibold mb-3">Weekly Outfit Momentum</h3>
            <div className="flex items-end justify-between gap-2 h-32 pt-4">
              {insightBars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-primary to-pink-400 rounded-t-md hover:brightness-125 transition"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="grid grid-cols-7 text-center text-xs text-muted-foreground mt-2">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          </div>

          <div className="panel p-5 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold mb-2">Streak Protection System</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                FitStreak automatically synchronizes with your device's local timezone. If you
                travel across timezones, the Streak Engine adjusts your 24-hour cutoff so you never
                lose progress due to flight delays or jet lag.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Current Safeguard Status:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck size={14} /> Active & Monitored
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
