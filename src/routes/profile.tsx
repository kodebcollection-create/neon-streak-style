import { createFileRoute, useRouter } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { profilePosts } from "@/lib/mock";
import { ArrowLeft, BadgeCheck, MapPin, Calendar, Pencil, Share2, Flame, Trophy, Shirt, Heart, MessageCircle, MoreHorizontal, LayoutGrid, Bookmark, Tag } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — FitStreak" }] }),
  component: ProfilePage,
});

function StatCard({ icon: Icon, color, label, value, sub }: any) {
  return (
    <div className="panel p-5">
      <div className="text-sm font-medium mb-3">{label}</div>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl grid place-items-center ${color}`}>
          <Icon size={20} fill="currentColor" />
        </div>
        <div className="text-3xl font-bold">{value}</div>
        <span className="text-xs text-muted-foreground self-end mb-1">{sub}</span>
      </div>
    </div>
  );
}

function ProfilePage() {
  const router = useRouter();
  const [tab, setTab] = useState("Outfits");
  const tabs = [
    { name: "Outfits", icon: LayoutGrid },
    { name: "Saved", icon: Bookmark },
    { name: "Liked", icon: Heart },
    { name: "Tagged", icon: Tag },
  ];

  return (
    <AppLayout>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.history.back()} className="p-2 rounded-lg hover:bg-muted"><ArrowLeft size={18}/></button>
        <h1 className="text-xl font-bold">My Profile</h1>
      </div>

      <div className="panel p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-primary/30 to-transparent grid place-items-center">
          <div className="text-5xl lg:text-6xl font-black text-primary/40 italic tracking-tighter leading-none text-center pr-6">
            KEEP<br/>YOUR<br/>STREAK
          </div>
        </div>
        <div className="relative flex flex-col lg:flex-row gap-6 items-start">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-zinc-700 to-black ring-4 ring-background" />
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary grid place-items-center"><Pencil size={14} className="text-white"/></button>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">Dafy</h2>
              <BadgeCheck className="text-primary" size={20} fill="currentColor"/>
            </div>
            <p className="text-muted-foreground text-sm">@dafy</p>
            <p className="mt-2 text-sm">Outfits speak louder than words.</p>
            <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin size={12}/>Nairobi, Kenya</span>
              <span className="flex items-center gap-1"><Calendar size={12}/>Joined March 2024</span>
            </div>
            <div className="flex gap-6 mt-5">
              {[["37","Posts"],["1.2K","Followers"],["320","Following"],["4.8K","Likes Received"]].map(([v,l])=>(
                <div key={l}><div className="text-xl font-bold">{v}</div><div className="text-xs text-muted-foreground">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 self-start">
            <button className="panel px-4 py-2 text-sm flex items-center gap-2 hover:bg-muted"><Pencil size={14}/>Edit Profile</button>
            <button className="panel p-2 hover:bg-muted"><Share2 size={16}/></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard icon={Flame} color="bg-primary/20 text-primary" label="Current Streak" value="12" sub="days" />
        <StatCard icon={Trophy} color="bg-yellow-500/20 text-yellow-400" label="Longest Streak" value="15" sub="days" />
        <StatCard icon={Shirt} color="bg-primary/20 text-primary" label="Total Outfits" value="37" sub="Looks Posted" />
        <StatCard icon={Heart} color="bg-red-500/20 text-red-400" label="Total Likes" value="4.8K" sub="Likes Received" />
      </div>

      <div className="flex gap-6 mt-8 border-b border-border">
        {tabs.map(t => (
          <button key={t.name} onClick={()=>setTab(t.name)}
            className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 ${tab===t.name?"text-primary border-primary":"text-muted-foreground border-transparent"}`}>
            <t.icon size={16}/>{t.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {profilePosts.map((p,i)=>(
          <article key={i} className="panel overflow-hidden">
            <div className={`aspect-[3/4] bg-gradient-to-br ${p.bg} relative`}>
              <div className="absolute top-3 right-3 flame-badge text-xs"><Flame size={12} fill="currentColor"/>{p.fire}</div>
            </div>
            <div className="p-3">
              <div className="font-semibold text-sm">{p.title}</div>
              <div className="text-xs text-muted-foreground">{p.time}</div>
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><Heart size={14} className="text-primary" fill="currentColor"/>{p.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle size={14}/>{p.comments}</span>
                </div>
                <MoreHorizontal size={16}/>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AppLayout>
  );
}
