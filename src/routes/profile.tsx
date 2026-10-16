import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useFitStreakStore, type Post } from "@/lib/store";
import {
  ArrowLeft,
  BadgeCheck,
  MapPin,
  Calendar,
  Pencil,
  Share2,
  Flame,
  Trophy,
  Shirt,
  Heart,
  MessageCircle,
  MoreHorizontal,
  LayoutGrid,
  Bookmark,
  Tag,
  X,
  Check,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "My Profile — FitStreak" }] }),
  component: ProfilePage,
});

function StatCard({
  icon: Icon,
  color,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ size?: number; fill?: string; className?: string }>;
  color: string;
  label: string;
  value: string | number;
  sub: string;
}) {
  return (
    <div className="panel p-5 border-border">
      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
        {label}
      </div>
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-xl grid place-items-center ${color}`}>
          <Icon size={22} fill="currentColor" />
        </div>
        <div>
          <div className="text-3xl font-extrabold text-foreground">{value}</div>
          <span className="text-[11px] text-muted-foreground">{sub}</span>
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  const router = useRouter();
  const { user, streak, posts, savedIds, saveUser, toggleLikePost, toggleSavePost } =
    useFitStreakStore();
  const [tab, setTab] = useState("Outfits");
  const [isEditing, setIsEditing] = useState(false);

  const [editName, setEditName] = useState(user.displayName);
  const [editBio, setEditBio] = useState(user.bio);
  const [editLocation, setEditLocation] = useState(user.location);

  const tabs = [
    { name: "Outfits", icon: LayoutGrid },
    { name: "Saved", icon: Bookmark },
    { name: "Liked", icon: Heart },
    { name: "Tagged", icon: Tag },
  ];

  // User posts
  const myPosts = posts.filter((p) => p.user === user.displayName || p.user === "Dafy");
  const savedPosts = posts.filter((p) => savedIds.includes(p.id));
  const likedPosts = posts.filter((p) => p.liked);

  const displayedPosts =
    tab === "Saved" ? savedPosts : tab === "Liked" ? likedPosts : tab === "Tagged" ? [] : myPosts;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveUser({
      ...user,
      displayName: editName.trim() || user.displayName,
      bio: editBio.trim() || user.bio,
      location: editLocation.trim() || user.location,
    });
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleShareProfile = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Check out my FitStreak wardrobe: fitstreak.style/@${user.username}`,
      );
      toast.success("Profile link copied to clipboard!");
    }
  };

  return (
    <AppLayout>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.history.back()}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl font-bold">My Profile</h1>
      </div>

      {/* Hero Profile Banner */}
      <div className="panel p-6 relative overflow-hidden border-border bg-gradient-to-br from-panel via-panel to-panel/80">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-primary/25 to-transparent grid place-items-center pointer-events-none">
          <div className="text-5xl lg:text-6xl font-black text-primary/30 italic tracking-tighter leading-none text-center pr-6 select-none">
            KEEP
            <br />
            YOUR
            <br />
            STREAK
          </div>
        </div>

        <div className="relative flex flex-col lg:flex-row gap-6 items-start">
          <div className="relative">
            <div
              className={`w-28 h-28 rounded-full bg-gradient-to-br ${user.avatar} ring-4 ring-background shadow-xl`}
            />
            <button
              onClick={() => setIsEditing(true)}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary grid place-items-center shadow-glow text-white hover:scale-105 transition"
            >
              <Pencil size={14} />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{user.displayName}</h2>
              {user.verified && (
                <BadgeCheck className="text-primary" size={20} fill="currentColor" />
              )}
              <span className="text-xs bg-primary/20 text-primary px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                <Flame size={12} fill="currentColor" /> {streak.currentStreak}d Streak
              </span>
            </div>

            <p className="text-muted-foreground text-sm mt-0.5">@{user.username}</p>
            <p className="mt-2 text-sm text-foreground/90 max-w-lg leading-relaxed">{user.bio}</p>

            <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-primary" />
                {user.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-primary" />
                Joined {user.joinDate}
              </span>
            </div>

            <div className="flex gap-6 mt-5 pt-4 border-t border-border/40">
              {[
                [streak.totalOutfits, "Posts"],
                ["1.2K", "Followers"],
                ["320", "Following"],
                [streak.totalLikes, "Likes Received"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="text-xl font-bold text-foreground">{v}</div>
                  <div className="text-xs text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 self-start">
            <button
              onClick={() => setIsEditing(true)}
              className="panel px-4 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-muted transition"
            >
              <Pencil size={14} /> Edit Profile
            </button>
            <button
              onClick={handleShareProfile}
              className="panel p-2 hover:bg-muted transition"
              title="Share profile"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Streak Highlight Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Link to="/streak" className="block hover:scale-[1.02] transition-transform">
          <StatCard
            icon={Flame}
            color="bg-primary/20 text-primary"
            label="Current Streak"
            value={streak.currentStreak}
            sub="Active Days 🔥"
          />
        </Link>
        <Link to="/streak" className="block hover:scale-[1.02] transition-transform">
          <StatCard
            icon={Trophy}
            color="bg-yellow-500/20 text-yellow-400"
            label="Longest Streak"
            value={streak.longestStreak}
            sub="Personal Best"
          />
        </Link>
        <StatCard
          icon={Shirt}
          color="bg-primary/20 text-primary"
          label="Total Outfits"
          value={streak.totalOutfits}
          sub="Looks Shared"
        />
        <StatCard
          icon={Heart}
          color="bg-red-500/20 text-red-400"
          label="Total Likes"
          value={streak.totalLikes}
          sub="Likes Received"
        />
      </div>

      {/* Content Tabs */}
      <div className="flex gap-6 mt-8 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.name}
            onClick={() => setTab(t.name)}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition ${
              tab === t.name
                ? "text-primary border-primary shadow-glow"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            <t.icon size={16} />
            {t.name}
            {t.name === "Saved" && savedPosts.length > 0 && (
              <span className="text-[10px] bg-primary/20 px-1.5 py-0.2 rounded-full">
                {savedPosts.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid of posts */}
      {displayedPosts.length === 0 ? (
        <div className="panel p-12 text-center mt-6">
          <Shirt size={36} className="mx-auto text-muted-foreground mb-3 opacity-40" />
          <h4 className="font-bold text-foreground">No {tab.toLowerCase()} outfits yet</h4>
          <p className="text-xs text-muted-foreground mt-1">
            {tab === "Saved"
              ? "Save outfits from the feed or explore page to view them here."
              : "Post your first outfit today to start filling your wardrobe portfolio!"}
          </p>
          {tab === "Outfits" && (
            <Link
              to="/post"
              className="btn-pink text-xs px-4 py-2 mt-4 inline-flex items-center gap-1.5"
            >
              <Flame size={14} fill="currentColor" /> Post Outfit
            </Link>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {displayedPosts.map((p) => {
            const isSaved = savedIds.includes(p.id);
            return (
              <article
                key={p.id}
                className="panel overflow-hidden border-border group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div
                        className={`w-full h-full bg-gradient-to-br ${
                          p.bg || "from-slate-700 via-slate-800 to-black"
                        } group-hover:scale-105 transition-transform duration-500`}
                      />
                    )}
                    <div className="absolute top-3 right-3 flame-badge text-xs">
                      <Flame size={12} fill="currentColor" />
                      {p.fire || p.streak}
                    </div>
                    {p.items && p.items.length > 0 && (
                      <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur px-2 py-0.5 rounded text-[10px] text-white flex items-center gap-1">
                        <Shirt size={10} className="text-primary" /> {p.items.length} pieces
                      </div>
                    )}
                  </div>
                  <div className="p-3.5">
                    <div className="font-semibold text-sm line-clamp-1">{p.title}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{p.time}</div>
                  </div>
                </div>

                <div className="p-3.5 pt-0">
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/40">
                    <div className="flex gap-4">
                      <button
                        onClick={() => toggleLikePost(p.id)}
                        className={`flex items-center gap-1 transition ${
                          p.liked ? "text-primary font-bold" : "hover:text-foreground"
                        }`}
                      >
                        <Heart size={14} fill={p.liked ? "currentColor" : "none"} />
                        <span>{p.likes}</span>
                      </button>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={14} />
                        <span>{p.comments}</span>
                      </span>
                    </div>
                    <button
                      onClick={() => toggleSavePost(p.id)}
                      className={`transition ${isSaved ? "text-primary" : "hover:text-foreground"}`}
                    >
                      <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditing && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsEditing(false)}
        >
          <form
            onSubmit={handleSaveProfile}
            className="bg-card border border-border rounded-2xl max-w-md w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Edit Profile</h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Display Name
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="input-dark-plain text-sm mt-1"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Bio
              </label>
              <textarea
                rows={3}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="w-full bg-background border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary resize-none mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Location
              </label>
              <input
                type="text"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                className="input-dark-plain text-sm mt-1"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground transition"
              >
                Cancel
              </button>
              <button type="submit" className="btn-pink px-5 py-2 text-xs font-bold shadow-glow">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </AppLayout>
  );
}
