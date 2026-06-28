import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Home, Compass, PlusSquare, Bell, Users, MessageCircle, User, Settings,
  Flame, Search, ChevronDown, Moon, Award, Crown, Star, Plus
} from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/post", label: "Post Outfit", icon: PlusSquare, highlight: true },
  { to: "/notifications", label: "Notifications", icon: Bell, badge: 3 },
  { to: "/friends", label: "Friends", icon: Users },
  { to: "/messages", label: "Messages", icon: MessageCircle },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Logo() {
  return (
    <Link to="/home" className="flex items-center gap-2">
      <div className="grid place-items-center w-9 h-9 rounded-lg bg-primary/20 text-primary">
        <Flame size={20} fill="currentColor" />
      </div>
      <span className="text-xl font-bold">
        Fit<span className="text-primary">Streak</span>
      </span>
    </Link>
  );
}

function StreakWidget() {
  const navigate = useNavigate();
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="panel p-4">
      <h3 className="font-semibold mb-3">Your Streak</h3>
      <div className="relative w-28 h-28 mx-auto grid place-items-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="var(--border)" strokeWidth="6" />
          <circle cx="50" cy="50" r="44" fill="none" stroke="var(--primary)"
            strokeWidth="6" strokeDasharray="276" strokeDashoffset="40" strokeLinecap="round" />
        </svg>
        <div className="text-center">
          <Flame className="mx-auto text-primary" fill="currentColor" size={22} />
          <div className="text-2xl font-bold leading-none mt-1">12</div>
          <div className="text-[10px] text-muted-foreground">days</div>
        </div>
      </div>
      <div className="flex justify-between mt-3 px-1">
        {days.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={`w-5 h-5 rounded-full grid place-items-center text-[10px] ${
              i < 6 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            }`}>{i < 6 ? "✓" : ""}</div>
            <span className="text-[10px] text-muted-foreground">{d}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-3">Best Streak: 15 days</p>
      <button onClick={() => navigate({ to: "/streak" })} className="btn-pink w-full mt-3 text-sm">View Streak</button>
    </div>
  );
}

function BadgesWidget() {
  const badges = [
    { icon: Flame, label: "On Fire!", sub: "10 day streak", color: "text-primary" },
    { icon: Crown, label: "Consistent", sub: "7 day streak", color: "text-yellow-400" },
    { icon: Star, label: "Trend Setter", sub: "50 likes on a post", color: "text-yellow-300" },
  ];
  return (
    <div className="panel p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Recent Badges</h3>
        <button className="text-xs text-primary font-medium">View all</button>
      </div>
      <div className="space-y-3">
        {badges.map((b, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted grid place-items-center">
              <b.icon size={18} className={b.color} fill="currentColor" />
            </div>
            <div>
              <div className="text-sm font-semibold">{b.label}</div>
              <div className="text-xs text-muted-foreground">{b.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = useRouterState({ select: s => s.location.pathname });
  return (
    <aside className="hidden lg:flex flex-col w-72 shrink-0 h-screen sticky top-0 p-4 gap-4 overflow-y-auto border-r border-border bg-background">
      <Logo />
      <nav className="flex flex-col gap-1 mt-2">
        {navItems.map(item => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return (
            <Link key={item.to} to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                active || item.highlight
                  ? "bg-primary text-white shadow-[0_8px_24px_-12px_var(--primary)]"
                  : "text-foreground/80 hover:bg-muted"
              }`}>
              <Icon size={20} />
              <span className="text-sm font-medium flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 grid place-items-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <StreakWidget />
      <BadgesWidget />
      <div className="panel p-3 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2"><Moon size={16} /><span className="text-sm">Dark Mode</span></div>
        <div className="w-10 h-6 bg-primary rounded-full relative">
          <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
        </div>
      </div>
    </aside>
  );
}

export function TopBar() {
  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b border-border px-4 lg:px-6 py-3 flex items-center gap-3">
      <div className="flex-1 max-w-xl relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input placeholder="Search outfits, people..." className="input-dark text-sm" />
      </div>
      <div className="flame-badge"><Flame size={14} fill="currentColor" />12</div>
      <button className="relative p-2 rounded-lg hover:bg-muted">
        <Bell size={18} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
      </button>
      <button className="flex items-center gap-2 p-1 pr-2 rounded-lg hover:bg-muted">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500" />
        <span className="text-sm font-medium hidden sm:block">Steve</span>
        <ChevronDown size={14} />
      </button>
    </header>
  );
}

export function BottomNav() {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const items = [
    { to: "/home", icon: Home, label: "Home" },
    { to: "/explore", icon: Compass, label: "Explore" },
    { to: "/friends", icon: Users, label: "Friends" },
    { to: "/profile", icon: User, label: "Profile" },
  ];
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-panel border-t border-border px-2 py-2 flex items-center justify-around">
      {items.slice(0, 2).map(i => {
        const active = pathname === i.to;
        return (
          <Link key={i.to} to={i.to} className={`flex flex-col items-center gap-0.5 px-3 py-1 ${active ? "text-primary" : "text-muted-foreground"}`}>
            <i.icon size={20} /><span className="text-[10px]">{i.label}</span>
          </Link>
        );
      })}
      <Link to="/post" className="w-12 h-12 -mt-6 rounded-full bg-primary grid place-items-center shadow-glow text-white">
        <Plus size={24} />
      </Link>
      {items.slice(2).map(i => {
        const active = pathname === i.to;
        return (
          <Link key={i.to} to={i.to} className={`flex flex-col items-center gap-0.5 px-3 py-1 ${active ? "text-primary" : "text-muted-foreground"}`}>
            <i.icon size={20} /><span className="text-[10px]">{i.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col pb-20 lg:pb-0">
        <TopBar />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}

export { Award };
