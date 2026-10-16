import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import {
  Search,
  UserPlus,
  MessageCircle,
  MoreHorizontal,
  Check,
  X,
  Users,
  ChevronDown,
  Plus,
  BadgeCheck,
  Heart,
} from "lucide-react";

const stories = [
  { name: "Mercy", grad: "from-amber-700 to-amber-900" },
  { name: "Brian", grad: "from-slate-700 to-slate-900" },
  { name: "Sarah", grad: "from-rose-600 to-rose-900" },
  { name: "David", grad: "from-zinc-700 to-zinc-900" },
  { name: "Kelvin", grad: "from-stone-700 to-stone-900" },
  { name: "Amina", grad: "from-pink-600 to-purple-800" },
  { name: "Tasha", grad: "from-fuchsia-700 to-violet-900" },
];

const friends = [
  {
    name: "Mercy Wanjiku",
    handle: "@mercy_w",
    status: "Online",
    grad: "from-amber-600 to-rose-700",
    online: true,
  },
  {
    name: "Brian Otieno",
    handle: "@brian_o",
    status: "Online",
    grad: "from-slate-600 to-slate-900",
    online: true,
  },
  {
    name: "Sarah Kimani",
    handle: "@sarah_k",
    status: "Active 5m ago",
    grad: "from-rose-500 to-pink-700",
  },
  {
    name: "David Mwangi",
    handle: "@david_m",
    status: "Active 1h ago",
    grad: "from-zinc-600 to-zinc-900",
  },
  {
    name: "Kelvin Mutiso",
    handle: "@kelvin_m",
    status: "Active 2h ago",
    grad: "from-stone-600 to-stone-900",
  },
  {
    name: "Amina Hassan",
    handle: "@amina_h",
    status: "Active 3h ago",
    grad: "from-pink-500 to-purple-700",
  },
  {
    name: "Tasha Ali",
    handle: "@tasha_a",
    status: "Active 1d ago",
    grad: "from-fuchsia-600 to-violet-800",
  },
];

const requests = [
  { name: "James K.", handle: "@james_k", grad: "from-blue-700 to-slate-900" },
  { name: "Winny A.", handle: "@winny_a", grad: "from-rose-600 to-purple-800" },
];

const suggestions = [
  { name: "Eric Omondi", handle: "@eric_o", grad: "from-amber-700 to-stone-900" },
  { name: "Vanessa M.", handle: "@vanessa_m", grad: "from-pink-600 to-rose-800" },
  { name: "Mike Johnson", handle: "@mike_j", grad: "from-blue-600 to-slate-900" },
  { name: "Lilian Kerubo", handle: "@lilian_k", grad: "from-fuchsia-600 to-purple-800" },
];

const topFriends = [
  { n: "Mercy W.", score: "1.2K", grad: "from-amber-600 to-rose-700" },
  { n: "Brian O.", score: "980", grad: "from-slate-600 to-slate-900" },
  { n: "Sarah K.", score: "870", grad: "from-rose-500 to-pink-700" },
  { n: "David M.", score: "760", grad: "from-zinc-600 to-zinc-900" },
  { n: "Kelvin M.", score: "650", grad: "from-stone-600 to-stone-900" },
];

const tabs = ["All", "Online", "Suggestions", "Requests"];

function FriendsPage() {
  return (
    <AppLayout>
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold">Friends</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Connect, share and grow together <span className="text-primary">♥</span>
              </p>
            </div>
            <button className="btn-pink flex items-center gap-2 text-sm">
              <UserPlus size={16} /> Add Friend
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input placeholder="Search friends..." className="input-dark text-sm" />
            </div>
            <div className="panel p-1 flex items-center gap-1">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${i === 0 ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {t === "Online" && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5" />
                  )}
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="panel p-4 flex gap-4 overflow-x-auto">
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div className="w-16 h-16 rounded-full bg-panel-2 ring-2 ring-primary grid place-items-center relative">
                <div className="w-6 h-6 rounded-full bg-primary grid place-items-center">
                  <Plus size={14} />
                </div>
              </div>
              <span className="text-xs">Add Story</span>
            </div>
            {stories.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-1 shrink-0">
                <div className="relative">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${s.grad} ring-2 ring-primary`}
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-background" />
                </div>
                <span className="text-xs">{s.name}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <h2 className="font-semibold">
              My Friends <span className="text-muted-foreground font-normal">(158)</span>
            </h2>
            <button className="text-xs text-muted-foreground flex items-center gap-1">
              Sort by: <span className="text-foreground">Recent</span> <ChevronDown size={12} />
            </button>
          </div>

          <div className="space-y-2">
            {friends.map((f) => (
              <div key={f.handle} className="panel p-3 flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${f.grad} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold truncate">{f.name}</span>
                    <BadgeCheck size={14} className="text-primary fill-primary stroke-background" />
                  </div>
                  <div className="text-xs text-muted-foreground">{f.handle}</div>
                  <div className="text-xs mt-0.5 flex items-center gap-1">
                    {f.online && <span className="w-1.5 h-1.5 rounded-full bg-green-400" />}
                    <span className={f.online ? "text-green-400" : "text-muted-foreground"}>
                      {f.status}
                    </span>
                  </div>
                </div>
                <button className="w-9 h-9 rounded-full bg-muted grid place-items-center">
                  <MessageCircle size={16} />
                </button>
                <button className="w-9 h-9 rounded-full bg-primary text-white grid place-items-center">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            ))}
          </div>

          <button className="panel w-full py-3 text-sm flex items-center justify-center gap-2 hover:bg-panel-2">
            View more friends <ChevronDown size={14} />
          </button>
        </div>

        <aside className="space-y-4">
          <div className="panel p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Friend Requests</h3>
              <span className="bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 grid place-items-center">
                2
              </span>
            </div>
            <div className="space-y-3">
              {requests.map((r) => (
                <div key={r.handle} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${r.grad}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.handle}</div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-primary text-white grid place-items-center">
                    <Check size={14} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-muted grid place-items-center">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full text-center text-xs text-primary font-medium mt-3">
              View all requests
            </button>
          </div>

          <div className="panel p-4">
            <h3 className="font-semibold mb-3">People You May Know</h3>
            <div className="space-y-3">
              {suggestions.map((s) => (
                <div key={s.handle} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${s.grad}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.handle}</div>
                  </div>
                  <button className="text-xs text-primary border border-primary rounded-full px-3 py-1">
                    Follow
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full text-center text-xs text-primary font-medium mt-3">
              See more
            </button>
          </div>

          <div className="panel p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Top Friends</h3>
              <Users size={16} className="text-primary" />
            </div>
            <div className="space-y-2.5">
              {topFriends.map((t, i) => (
                <div key={t.n} className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground w-3">{i + 1}</span>
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.grad}`} />
                  <span className="flex-1">{t.n}</span>
                  <span className="text-muted-foreground text-xs">{t.score}</span>
                  <Heart size={14} className="text-primary fill-primary" />
                </div>
              ))}
            </div>
            <button className="w-full text-center text-xs text-primary font-medium mt-3">
              See full leaderboard
            </button>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}

export const Route = createFileRoute("/friends")({ component: FriendsPage });
