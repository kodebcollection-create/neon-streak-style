import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { feedPosts } from "@/lib/mock";
import { Image, Smile, MapPin, MoreHorizontal, Heart, MessageCircle, Flame, Snowflake } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home — FitStreak" }] }),
  component: HomePage,
});

function Composer() {
  return (
    <div className="panel p-5">
      <h2 className="font-semibold mb-4 flex items-center gap-2">Share your outfit today <Flame size={16} className="text-primary" fill="currentColor"/></h2>
      <div className="flex gap-4">
        <button className="w-28 h-28 shrink-0 rounded-xl border-2 border-dashed border-primary/60 bg-primary/10 grid place-items-center text-primary">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-primary text-white grid place-items-center mx-auto mb-1">＋</div>
            <span className="text-xs font-medium">Add Photo</span>
          </div>
        </button>
        <div className="flex-1 flex flex-col">
          <input className="input-dark-plain mb-3" placeholder="What are you wearing today?" />
          <div className="flex items-center justify-between mt-auto">
            <div className="flex gap-2 text-muted-foreground">
              <button className="p-2 hover:bg-muted rounded-lg"><Image size={16}/></button>
              <button className="p-2 hover:bg-muted rounded-lg"><Smile size={16}/></button>
              <button className="p-2 hover:bg-muted rounded-lg"><MapPin size={16}/></button>
            </div>
            <button className="btn-pink text-sm">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedTabs() {
  const [active, setActive] = useState("All");
  return (
    <div className="flex items-center justify-between mt-6 mb-4">
      <h2 className="font-bold text-lg">Friends Feed</h2>
      <div className="flex gap-1 bg-panel rounded-full p-1">
        {["All","Friends","Following"].map(t => (
          <button key={t} onClick={()=>setActive(t)} className={`px-4 py-1.5 rounded-full text-xs font-medium ${active===t?"bg-primary text-white":"text-muted-foreground"}`}>{t}</button>
        ))}
      </div>
    </div>
  );
}

function PostCard({ post }: { post: typeof feedPosts[number] }) {
  return (
    <article className="panel overflow-hidden">
      <div className="p-3 flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${post.avatar}`} />
        <div className="flex-1">
          <div className="text-sm font-semibold">{post.user}</div>
          <div className="text-xs text-muted-foreground">{post.time}</div>
        </div>
        <button className="text-muted-foreground"><MoreHorizontal size={18}/></button>
      </div>
      <div className={`aspect-[3/4] bg-gradient-to-br ${post.bg} relative`}>
        <div className="absolute top-3 left-3 flame-badge text-xs"><Flame size={12} fill="currentColor"/>{post.fire}</div>
      </div>
      <div className="p-3">
        <div className="font-semibold text-sm">{post.title}</div>
        <div className="text-xs text-primary mt-1">{post.tags.join(" ")}</div>
        <div className="flex items-center justify-between mt-3 text-muted-foreground text-xs">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Heart size={14} className="text-primary" fill="currentColor"/>{post.likes}</span>
            <span className="flex items-center gap-1"><MessageCircle size={14}/>{post.comments}</span>
          </div>
          <span className="flame-badge text-[10px] py-0.5 px-2"><Flame size={10} fill="currentColor"/>{post.streak} day streak</span>
        </div>
      </div>
    </article>
  );
}

function RightSidebar() {
  const friends = [
    { rank: 1, name: "Daisy", streak: 15, c: "from-pink-400 to-orange-400" },
    { rank: 2, name: "Brian", streak: 12, c: "from-blue-400 to-cyan-400" },
    { rank: 3, name: "Mike", streak: 10, c: "from-amber-400 to-red-400" },
    { rank: 4, name: "Steve (You)", streak: 8, c: "from-purple-400 to-pink-400" },
  ];
  const lb = [
    { rank: 1, name: "Daisy", xp: 250 },
    { rank: 2, name: "Brian", xp: 180 },
    { rank: 3, name: "Mike", xp: 150 },
    { rank: 4, name: "Steve (You)", xp: 120 },
  ];
  const days = ["M","T","W","T","F","S","S"];
  return (
    <aside className="hidden xl:flex flex-col w-80 shrink-0 gap-4">
      <div className="panel p-5">
        <h3 className="font-semibold mb-4">Your Streak</h3>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/20 grid place-items-center">
            <Flame size={26} className="text-primary" fill="currentColor"/>
          </div>
          <div>
            <div className="text-3xl font-bold">12 <span className="text-sm font-normal text-muted-foreground">day streak</span></div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          {days.map((d,i)=>(
            <div key={i} className="flex flex-col items-center gap-1">
              <div className={`w-7 h-7 rounded-full grid place-items-center text-xs ${i<6?"bg-primary text-white":"border-2 border-border text-muted-foreground"}`}>{i<6?"✓":""}</div>
              <span className="text-[10px] text-muted-foreground">{d}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">Best Streak: 15 days</p>
      </div>

      <div className="panel p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Top Friends</h3>
          <button className="text-xs text-primary">View all</button>
        </div>
        <div className="space-y-3">
          {friends.map(f => (
            <div key={f.rank} className="flex items-center gap-3">
              <span className="w-5 h-5 grid place-items-center text-xs text-muted-foreground">{f.rank}</span>
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${f.c}`} />
              <span className="flex-1 text-sm">{f.name}</span>
              <span className="text-sm font-semibold flex items-center gap-1">{f.streak}<Flame size={12} className="text-primary" fill="currentColor"/></span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Leaderboard</h3>
          <span className="text-xs text-primary">This Week ▾</span>
        </div>
        <div className="space-y-3">
          {lb.map(l => (
            <div key={l.rank} className={`flex items-center gap-3 ${l.rank===2?"bg-primary/10 -mx-2 px-2 py-1 rounded-lg":""}`}>
              <span className="w-5 h-5 grid place-items-center text-xs text-muted-foreground">{l.rank}</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500" />
              <span className="flex-1 text-sm">{l.name}</span>
              <span className="text-sm font-semibold">{l.xp} XP 💎</span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel p-5">
        <div className="flex items-center gap-3 mb-3">
          <Snowflake size={22} className="text-cyan-400" />
          <div>
            <h3 className="font-semibold text-sm">Streak Freeze</h3>
            <p className="text-xs text-muted-foreground">Protect your streak if you miss a day.</p>
          </div>
        </div>
        <button className="btn-pink w-full text-sm">Use Freeze</button>
      </div>
    </aside>
  );
}

function HomePage() {
  return (
    <AppLayout>
      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
          <Composer />
          <FeedTabs />
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {feedPosts.map(p => <PostCard key={p.id} post={p} />)}
          </div>
          <div className="text-center mt-6">
            <button className="panel px-6 py-2 text-sm text-muted-foreground hover:text-foreground">Load more ▾</button>
          </div>
        </div>
        <RightSidebar />
      </div>
    </AppLayout>
  );
}
