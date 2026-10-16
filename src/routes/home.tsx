import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useFitStreakStore, type Post } from "@/lib/store";
import {
  Image as ImageIcon,
  Smile,
  MapPin,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Flame,
  Snowflake,
  Shirt,
  Check,
  Bookmark,
  Share2,
} from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home Feed — FitStreak" }] }),
  component: HomePage,
});

function Composer() {
  const navigate = useNavigate();
  const { addPost } = useFitStreakStore();
  const [caption, setCaption] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuickPost = () => {
    if (!caption.trim() && !previewImage) {
      toast.error("Please add an outfit photo or describe what you're wearing!");
      return;
    }

    addPost({
      title: caption.trim() || "Daily fit check ✨",
      tags: ["#streetwear", "#dailyfit"],
      category: "Streetwear",
      imageUrl: previewImage || undefined,
    });

    setCaption("");
    setPreviewImage(null);
    toast.success("Outfit posted! Your daily streak has been updated 🔥");
  };

  return (
    <div className="panel p-5">
      <h2 className="font-semibold mb-4 flex items-center gap-2">
        Share your outfit today <Flame size={16} className="text-primary" fill="currentColor" />
      </h2>

      <div className="flex gap-4">
        {/* Photo Upload Box */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-28 h-28 shrink-0 rounded-xl border-2 border-dashed border-primary/60 bg-primary/10 grid place-items-center text-primary relative overflow-hidden group transition hover:border-primary"
        >
          {previewImage ? (
            <img src={previewImage} alt="Upload preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-primary text-white grid place-items-center mx-auto mb-1 group-hover:scale-110 transition">
                ＋
              </div>
              <span className="text-xs font-medium">Add Photo</span>
            </div>
          )}
        </button>

        <div className="flex-1 flex flex-col justify-between">
          <input
            className="input-dark-plain mb-3"
            placeholder="What are you wearing today? (e.g. Leather bomber & vintage cargos)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleQuickPost();
            }}
          />

          <div className="flex items-center justify-between mt-auto">
            <div className="flex gap-2 text-muted-foreground">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 hover:bg-muted rounded-lg transition"
                title="Upload Photo"
              >
                <ImageIcon size={16} />
              </button>
              <button
                type="button"
                onClick={() => navigate({ to: "/post" })}
                className="p-2 hover:bg-muted rounded-lg transition"
                title="Tag Garments & Full Editor"
              >
                <Shirt size={16} />
              </button>
              <button
                type="button"
                onClick={() => toast.info("Location tagged: New York, NY")}
                className="p-2 hover:bg-muted rounded-lg transition"
                title="Add Location"
              >
                <MapPin size={16} />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => navigate({ to: "/post" })}
                className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg border border-border"
              >
                Full Editor
              </button>
              <button onClick={handleQuickPost} className="btn-pink text-sm px-4">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedTabs({ active, setActive }: { active: string; setActive: (t: string) => void }) {
  return (
    <div className="flex items-center justify-between mt-6 mb-4">
      <h2 className="font-bold text-lg">Friends Feed</h2>
      <div className="flex gap-1 bg-panel rounded-full p-1 border border-border">
        {["All", "Friends", "Following"].map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              active === t
                ? "bg-primary text-white shadow-glow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const { toggleLikePost, toggleSavePost, savedIds } = useFitStreakStore();
  const isSaved = savedIds.includes(post.id);

  return (
    <article className="panel overflow-hidden border-border flex flex-col justify-between group">
      <div>
        <div className="p-3.5 flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${post.avatar}`} />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{post.user}</div>
            <div className="text-[11px] text-muted-foreground">{post.time}</div>
          </div>
          <button
            onClick={() => toast.info("Post options menu")}
            className="text-muted-foreground hover:text-foreground"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* Media / Outfit Box */}
        <div className="aspect-[3/4] bg-muted relative overflow-hidden">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${
                post.bg || "from-slate-700 via-slate-800 to-black"
              } group-hover:scale-105 transition-transform duration-500`}
            />
          )}

          {/* Streak Flame Badge */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1 border border-primary/30">
            <Flame size={12} fill="currentColor" /> {post.fire || post.streak}d
          </div>

          {/* Tagged Items Pills */}
          {post.items && post.items.length > 0 && (
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-white flex items-center gap-1 border border-white/20">
              <Shirt size={10} className="text-primary" /> {post.items.length} tagged pieces
            </div>
          )}
        </div>

        <div className="p-3.5">
          <div className="font-semibold text-sm line-clamp-2">{post.title}</div>
          <div className="text-xs text-primary mt-1.5 font-medium flex flex-wrap gap-1">
            {post.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3.5 pt-0">
        <div className="flex items-center justify-between text-muted-foreground text-xs pt-3 border-t border-border/50">
          <div className="flex gap-4">
            <button
              onClick={() => toggleLikePost(post.id)}
              className={`flex items-center gap-1 transition ${
                post.liked ? "text-primary font-bold" : "hover:text-foreground"
              }`}
            >
              <Heart size={15} fill={post.liked ? "currentColor" : "none"} />
              <span>{post.likes}</span>
            </button>
            <span className="flex items-center gap-1">
              <MessageCircle size={15} />
              <span>{post.comments}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSavePost(post.id)}
              className={`transition ${isSaved ? "text-primary" : "hover:text-foreground"}`}
              title="Save outfit"
            >
              <Bookmark size={15} fill={isSaved ? "currentColor" : "none"} />
            </button>
            <span className="flame-badge text-[10px] py-0.5 px-2">
              <Flame size={10} fill="currentColor" /> {post.streak} day streak
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function RightSidebar() {
  const { streak, activateStreakFreeze } = useFitStreakStore();
  const friends = [
    { rank: 1, name: "Daisy", streak: 18, c: "from-pink-400 to-orange-400" },
    { rank: 2, name: "Brian", streak: 12, c: "from-blue-400 to-cyan-400" },
    { rank: 3, name: "Mike", streak: 9, c: "from-amber-400 to-red-400" },
    { rank: 4, name: "Dafy (You)", streak: streak.currentStreak, c: "from-purple-400 to-pink-400" },
  ];
  const lb = [
    { rank: 1, name: "Daisy", xp: 320 },
    { rank: 2, name: "Dafy (You)", xp: 240 },
    { rank: 3, name: "Brian", xp: 180 },
    { rank: 4, name: "Mike", xp: 150 },
  ];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const handleUseFreeze = () => {
    if (streak.freezesAvailable <= 0) {
      toast.error("No Streak Freezes remaining in inventory.");
      return;
    }
    const success = activateStreakFreeze();
    if (success) {
      toast.success("Streak Freeze activated! Today's streak is safeguarded ❄️");
    }
  };

  return (
    <aside className="hidden xl:flex flex-col w-80 shrink-0 gap-4">
      {/* Your Streak Card */}
      <div className="panel p-5">
        <h3 className="font-semibold mb-3">Your Streak</h3>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/20 grid place-items-center">
            <Flame size={26} className="text-primary" fill="currentColor" />
          </div>
          <div>
            <div className="text-3xl font-bold">
              {streak.currentStreak}{" "}
              <span className="text-sm font-normal text-muted-foreground">day streak</span>
            </div>
            <div className="text-xs text-primary font-medium mt-0.5">
              {streak.hasPostedToday ? "✓ Kept alive today!" : "⚠️ Post before midnight to keep!"}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          {days.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`w-7 h-7 rounded-full grid place-items-center text-xs font-bold ${
                  i < 6
                    ? "bg-primary text-white shadow-sm"
                    : streak.hasPostedToday
                      ? "bg-primary text-white"
                      : "border-2 border-border text-muted-foreground"
                }`}
              >
                {i < 6 || streak.hasPostedToday ? "✓" : ""}
              </div>
              <span className="text-[10px] text-muted-foreground">{d}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Best Streak: {streak.longestStreak} days
        </p>
      </div>

      {/* Top Friends */}
      <div className="panel p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Top Friends</h3>
          <Link to="/friends" className="text-xs text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {friends.map((f) => (
            <div key={f.rank} className="flex items-center gap-3">
              <span className="w-5 h-5 grid place-items-center text-xs text-muted-foreground">
                {f.rank}
              </span>
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${f.c}`} />
              <span className="flex-1 text-sm font-medium">{f.name}</span>
              <span className="text-sm font-semibold flex items-center gap-1">
                {f.streak}
                <Flame size={12} className="text-primary" fill="currentColor" />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="panel p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Leaderboard</h3>
          <span className="text-xs text-primary font-semibold">This Week ▾</span>
        </div>
        <div className="space-y-3">
          {lb.map((l) => (
            <div
              key={l.rank}
              className={`flex items-center gap-3 ${
                l.name.includes("You")
                  ? "bg-primary/10 -mx-2 px-2 py-1.5 rounded-lg border border-primary/30"
                  : ""
              }`}
            >
              <span className="w-5 h-5 grid place-items-center text-xs text-muted-foreground">
                {l.rank}
              </span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500" />
              <span className="flex-1 text-sm font-medium">{l.name}</span>
              <span className="text-sm font-semibold text-primary">{l.xp} XP 💎</span>
            </div>
          ))}
        </div>
      </div>

      {/* Streak Freeze Card */}
      <div className="panel p-5 border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 to-transparent">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 grid place-items-center">
            <Snowflake size={22} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Streak Freeze</h3>
            <p className="text-xs text-muted-foreground">
              {streak.freezesAvailable} freeze token(s) available
            </p>
          </div>
        </div>
        <button
          onClick={handleUseFreeze}
          disabled={streak.freezesAvailable <= 0}
          className="w-full py-2 rounded-xl text-xs font-bold border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 transition disabled:opacity-40"
        >
          Use Freeze Protection
        </button>
      </div>
    </aside>
  );
}

function HomePage() {
  const { posts } = useFitStreakStore();
  const [filter, setFilter] = useState("All");

  const displayedPosts = posts.filter((p) => {
    if (filter === "Friends") return p.user === "Daisy" || p.user === "Mike" || p.user === "Brian";
    if (filter === "Following") return p.user !== "Dafy";
    return true;
  });

  return (
    <AppLayout>
      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
          <Composer />
          <FeedTabs active={filter} setActive={setFilter} />
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {displayedPosts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>

        <RightSidebar />
      </div>
    </AppLayout>
  );
}
